/**
 * 로컬-V — 정적 파일 + OpenAI 챗봇 프록시
 * API 키는 절대 프론트에 넣지 말고 OPENAI_API_KEY 환경 변수만 사용합니다.
 */
require("dotenv").config();

const fs = require("fs/promises");
const path = require("path");
const express = require("express");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const BOARD_PATH = path.join(ROOT, "private", "vmaker-board.json");
const STORE_REVIEWS_PATH = path.join(ROOT, "private", "store-reviews.json");

const DEFAULT_BOARD = {
  posts: [
    {
      id: "seed-1",
      category: "notice",
      title: "[상권 활성화] 로컬-V 프로젝트 시작 선언",
      author: "팀장",
      body:
        "비봉면 상권 활성화를 위한 로컬-V 프로젝트를 시작합니다. 동아리원 참여와 안전 수칙을 준수해 주세요.",
      createdAt: "2026-05-02T09:00:00.000Z",
      views: 0,
      comments: [],
    },
    {
      id: "seed-2",
      category: "log",
      title: "AI 에이전트를 활용한 비봉면 맛집 데이터 수집 시도",
      author: "이영희",
      body: "공개 데이터와 AI 보조를 활용해 맛집 정보를 정리하는 테스트를 진행했습니다.",
      createdAt: "2026-05-02T15:30:00.000Z",
      views: 0,
      comments: [],
    },
  ],
};

async function ensureBoardFile() {
  try {
    await fs.access(BOARD_PATH);
  } catch {
    await fs.mkdir(path.dirname(BOARD_PATH), { recursive: true });
    await fs.writeFile(BOARD_PATH, JSON.stringify(DEFAULT_BOARD, null, 2), "utf8");
  }
}

async function readBoard() {
  await ensureBoardFile();
  const raw = await fs.readFile(BOARD_PATH, "utf8");
  const data = JSON.parse(raw);
  if (Array.isArray(data.posts)) {
    data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  return data;
}

async function writeBoard(data) {
  await fs.writeFile(BOARD_PATH, JSON.stringify(data, null, 2), "utf8");
}

function newId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

const STORE_ID_RE = /^[a-z0-9-]{1,80}$/;

async function ensureStoreReviewsFile() {
  try {
    await fs.access(STORE_REVIEWS_PATH);
  } catch {
    await fs.mkdir(path.dirname(STORE_REVIEWS_PATH), { recursive: true });
    await fs.writeFile(STORE_REVIEWS_PATH, JSON.stringify({ byStore: {} }, null, 2), "utf8");
  }
}

async function readStoreReviews() {
  await ensureStoreReviewsFile();
  const raw = await fs.readFile(STORE_REVIEWS_PATH, "utf8");
  const data = JSON.parse(raw);
  if (!data.byStore || typeof data.byStore !== "object") data.byStore = {};
  return data;
}

async function writeStoreReviews(data) {
  await fs.writeFile(STORE_REVIEWS_PATH, JSON.stringify(data, null, 2), "utf8");
}

const SYSTEM_PROMPT = `당신은 경기도 화성시 비봉면 상권 프로젝트 "로컬-V"의 안내 도우미입니다.
비봉고등학교 창업동아리 브이메이커가 운영하는 비공식 안내 챗봇입니다.

역할:
- 비봉면·학교 주변 식사·카페 탐색, 프로젝트 취지(소상공인 디지털 전환, QR·쿠폰 계획 등)를 친절히 설명합니다.
- 웹에 실린 점포 정보를 우선하되, 영업시간·가격·휴무는 변동될 수 있으므로 반드시 매장에 확인하라고 안내합니다.
- 확실하지 않은 사실은 추측하지 말고, 방문 전 전화·현장 확인을 권합니다.
- 짧고 읽기 쉬운 한국어로 답합니다. 불필요하게 길게 쓰지 않습니다.`;

app.use(express.json({ limit: "120kb" }));

app.post("/api/chat", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error:
        "서버에 OpenAI API 키가 없습니다. 프로젝트 폴더에 .env 파일을 만들고 OPENAI_API_KEY 를 설정한 뒤 npm start 로 다시 실행하세요.",
    });
  }

  const { messages, pageContext } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages 배열이 필요합니다." });
  }

  let system = SYSTEM_PROMPT;
  if (typeof pageContext === "string" && pageContext.trim()) {
    system += `\n\n[현재 사용자 화면 맥락]\n${pageContext.trim()}`;
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: system }, ...messages.slice(-24)],
        max_tokens: 1024,
        temperature: 0.65,
      }),
    });

    const data = await openaiRes.json();
    if (!openaiRes.ok) {
      const msg = data.error?.message || "OpenAI API 오류";
      console.error("OpenAI error:", data);
      return res.status(502).json({ error: msg });
    }

    const reply = data.choices?.[0]?.message?.content ?? "";
    return res.json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요." });
  }
});

/** 브이메이커 게시판 — JSON 파일(private/, URL로는 접근 불가) */
app.get("/api/vmaker-board", async (_req, res) => {
  try {
    const data = await readBoard();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "게시판을 불러오지 못했습니다." });
  }
});

app.post("/api/vmaker-board/posts", async (req, res) => {
  try {
    const { category, title, body, author } = req.body || {};
    const cat = category === "notice" ? "notice" : category === "log" ? "log" : null;
    const t = typeof title === "string" ? title.trim() : "";
    const a = typeof author === "string" ? author.trim() : "";
    const b = typeof body === "string" ? body.trim() : "";
    if (!cat) return res.status(400).json({ error: "구분은 공지(notice) 또는 활동일지(log)만 가능합니다." });
    if (!t || t.length > 300) return res.status(400).json({ error: "제목은 1~300자로 입력해 주세요." });
    if (!a || a.length > 40) return res.status(400).json({ error: "작성자는 1~40자로 입력해 주세요." });
    if (b.length > 8000) return res.status(400).json({ error: "본문은 8000자 이하로 입력해 주세요." });

    const data = await readBoard();
    const post = {
      id: newId("p"),
      category: cat,
      title: t,
      author: a,
      body: b,
      createdAt: new Date().toISOString(),
      views: 0,
      comments: [],
    };
    data.posts.unshift(post);
    await writeBoard(data);
    res.json({ post });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "글 저장에 실패했습니다." });
  }
});

app.delete("/api/vmaker-board/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readBoard();
    const idx = data.posts.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "글을 찾을 수 없습니다." });
    data.posts.splice(idx, 1);
    await writeBoard(data);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "글 삭제에 실패했습니다." });
  }
});

/** 점포별 학생 후기 — JSON 파일(private/) */
app.get("/api/store-reviews", async (req, res) => {
  try {
    const storeId = typeof req.query.storeId === "string" ? req.query.storeId.trim() : "";
    if (!STORE_ID_RE.test(storeId)) {
      return res.status(400).json({ error: "storeId 가 필요합니다." });
    }
    const data = await readStoreReviews();
    const list = data.byStore[storeId];
    const reviews = Array.isArray(list) ? [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
    res.json({ reviews });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "후기를 불러오지 못했습니다." });
  }
});

app.post("/api/store-reviews", async (req, res) => {
  try {
    const { storeId, author, body } = req.body || {};
    const sid = typeof storeId === "string" ? storeId.trim() : "";
    const a = typeof author === "string" ? author.trim() : "";
    const b = typeof body === "string" ? body.trim() : "";
    if (!STORE_ID_RE.test(sid)) return res.status(400).json({ error: "점포 id 가 올바르지 않습니다." });
    if (!a || a.length > 24) return res.status(400).json({ error: "닉네임은 1~24자로 입력해 주세요." });
    if (!b || b.length > 800) return res.status(400).json({ error: "후기는 1~800자로 입력해 주세요." });

    const data = await readStoreReviews();
    if (!Array.isArray(data.byStore[sid])) data.byStore[sid] = [];
    const review = {
      id: newId("rv"),
      author: a,
      body: b,
      createdAt: new Date().toISOString(),
    };
    data.byStore[sid].unshift(review);
    await writeStoreReviews(data);
    res.json({ review });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "후기 저장에 실패했습니다." });
  }
});

app.post("/api/vmaker-board/posts/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { author, body } = req.body || {};
    const a = typeof author === "string" ? author.trim() : "";
    const b = typeof body === "string" ? body.trim() : "";
    if (!a || a.length > 40) return res.status(400).json({ error: "작성자는 1~40자로 입력해 주세요." });
    if (!b || b.length > 2000) return res.status(400).json({ error: "댓글은 1~2000자로 입력해 주세요." });

    const data = await readBoard();
    const post = data.posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ error: "글을 찾을 수 없습니다." });
    if (!Array.isArray(post.comments)) post.comments = [];

    const comment = {
      id: newId("c"),
      author: a,
      body: b,
      createdAt: new Date().toISOString(),
    };
    post.comments.push(comment);
    await writeBoard(data);
    res.json({ comment, postId: id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "댓글 저장에 실패했습니다." });
  }
});

/** private 폴더는 웹에서 직접 열리지 않게(정적 서빙 전에 차단) */
app.use((req, res, next) => {
  if (req.path === "/private" || req.path.startsWith("/private/")) {
    return res.status(404).end();
  }
  next();
});

app.use(express.static(ROOT));

ensureBoardFile().catch((err) => console.error("vmaker board init:", err));
ensureStoreReviewsFile().catch((err) => console.error("store reviews init:", err));

app.listen(PORT, () => {
  console.log(`로컬-V 서버: http://localhost:${PORT}`);
  console.log(`챗봇 사용: .env 에 OPENAI_API_KEY 설정 후 같은 주소로 접속`);
  console.log(`동아리 게시판 API: GET/POST/DELETE /api/vmaker-board …`);
  console.log(`점포 후기 API: GET/POST /api/store-reviews?storeId=…`);
});

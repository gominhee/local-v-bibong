/**
 * Netlify Functions — 로컬-V API (게시판·점포후기·챗봇)
 * 정적 배포에서는 Express(server.js)가 없으므로, 이 함수가 /api/* 를 처리합니다.
 * 데이터는 Netlify Blobs(사이트 스토어)에 저장됩니다.
 */
import { getStore } from "@netlify/blobs";

const STORE_NAME = "local-v-app";
const BOARD_KEY = "vmaker-board-v1";
const REVIEWS_KEY = "store-reviews-v1";

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

const STORE_ID_RE = /^[a-z0-9-]{1,80}$/;

const SYSTEM_PROMPT = `당신은 경기도 화성시 비봉면 상권 프로젝트 "로컬-V"의 안내 도우미입니다.
비봉고등학교 창업동아리 브이메이커가 운영하는 비공식 안내 챗봇입니다.

역할:
- 비봉면·학교 주변 식사·카페 탐색, 프로젝트 취지(소상공인 디지털 전환, QR·쿠폰 계획 등)를 친절히 설명합니다.
- 웹에 실린 점포 정보를 우선하되, 영업시간·가격·휴무는 변동될 수 있으므로 반드시 매장에 확인하라고 안내합니다.
- 확실하지 않은 사실은 추측하지 말고, 방문 전 전화·현장 확인을 권합니다.
- 짧고 읽기 쉬운 한국어로 답합니다. 불필요하게 길게 쓰지 않습니다.`;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

/** netlify.toml 의 :splat 리다이렉트 → 실제 요청 pathname 복원 */
function resolveApiPathname(request) {
  const u = new URL(request.url);
  const pathname = u.pathname;
  const prefix = "/.netlify/functions/local-v-api/";
  if (pathname.startsWith(prefix)) {
    const rest = pathname.slice(prefix.length);
    return "/api/" + decodeURIComponent(rest);
  }
  if (pathname.startsWith("/api/")) return pathname;
  return pathname;
}

function newId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

async function readBoard(store) {
  let data = await store.get(BOARD_KEY, { type: "json" });
  if (!data || !Array.isArray(data.posts)) {
    data = structuredClone(DEFAULT_BOARD);
    await store.setJSON(BOARD_KEY, data);
  }
  data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return data;
}

async function writeBoard(store, data) {
  await store.setJSON(BOARD_KEY, data);
}

async function readStoreReviews(store) {
  let data = await store.get(REVIEWS_KEY, { type: "json" });
  if (!data || typeof data !== "object" || !data.byStore || typeof data.byStore !== "object") {
    data = { byStore: {} };
    await store.setJSON(REVIEWS_KEY, data);
  }
  return data;
}

async function writeStoreReviews(store, data) {
  await store.setJSON(REVIEWS_KEY, data);
}

export default async (request) => {
  const pathname = resolveApiPathname(request);
  const method = request.method;
  const url = new URL(request.url);
  const store = getStore(STORE_NAME);

  try {
    if (pathname === "/api/vmaker-board" && method === "GET") {
      const data = await readBoard(store);
      return json(data);
    }

    if (pathname === "/api/vmaker-board/posts" && method === "POST") {
      const body = await request.json().catch(() => ({}));
      const { category, title, body: postBody, author } = body || {};
      const cat = category === "notice" ? "notice" : category === "log" ? "log" : null;
      const t = typeof title === "string" ? title.trim() : "";
      const a = typeof author === "string" ? author.trim() : "";
      const b = typeof postBody === "string" ? postBody.trim() : "";
      if (!cat) return json({ error: "구분은 공지(notice) 또는 활동일지(log)만 가능합니다." }, 400);
      if (!t || t.length > 300) return json({ error: "제목은 1~300자로 입력해 주세요." }, 400);
      if (!a || a.length > 40) return json({ error: "작성자는 1~40자로 입력해 주세요." }, 400);
      if (b.length > 8000) return json({ error: "본문은 8000자 이하로 입력해 주세요." }, 400);

      const data = await readBoard(store);
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
      await writeBoard(store, data);
      return json({ post });
    }

    const delMatch = pathname.match(/^\/api\/vmaker-board\/posts\/([^/]+)$/);
    if (delMatch && method === "DELETE") {
      const id = delMatch[1];
      const data = await readBoard(store);
      const idx = data.posts.findIndex((p) => p.id === id);
      if (idx === -1) return json({ error: "글을 찾을 수 없습니다." }, 404);
      data.posts.splice(idx, 1);
      await writeBoard(store, data);
      return json({ ok: true });
    }

    const commentMatch = pathname.match(/^\/api\/vmaker-board\/posts\/([^/]+)\/comments$/);
    if (commentMatch && method === "POST") {
      const id = commentMatch[1];
      const body = await request.json().catch(() => ({}));
      const { author, body: cbody } = body || {};
      const a = typeof author === "string" ? author.trim() : "";
      const b = typeof cbody === "string" ? cbody.trim() : "";
      if (!a || a.length > 40) return json({ error: "작성자는 1~40자로 입력해 주세요." }, 400);
      if (!b || b.length > 2000) return json({ error: "댓글은 1~2000자로 입력해 주세요." }, 400);

      const data = await readBoard(store);
      const post = data.posts.find((p) => p.id === id);
      if (!post) return json({ error: "글을 찾을 수 없습니다." }, 404);
      if (!Array.isArray(post.comments)) post.comments = [];
      const comment = {
        id: newId("c"),
        author: a,
        body: b,
        createdAt: new Date().toISOString(),
      };
      post.comments.push(comment);
      await writeBoard(store, data);
      return json({ comment, postId: id });
    }

    if (pathname === "/api/store-reviews" && method === "GET") {
      const rawSid = url.searchParams.get("storeId");
      const storeId = typeof rawSid === "string" ? rawSid.trim() : "";
      if (!STORE_ID_RE.test(storeId)) {
        return json({ error: "storeId 가 필요합니다." }, 400);
      }
      const data = await readStoreReviews(store);
      const list = data.byStore[storeId];
      const reviews = Array.isArray(list)
        ? [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
      return json({ reviews });
    }

    if (pathname === "/api/store-reviews" && method === "POST") {
      const body = await request.json().catch(() => ({}));
      const { storeId, author, body: rvBody } = body || {};
      const sid = typeof storeId === "string" ? storeId.trim() : "";
      const a = typeof author === "string" ? author.trim() : "";
      const b = typeof rvBody === "string" ? rvBody.trim() : "";
      if (!STORE_ID_RE.test(sid)) return json({ error: "점포 id 가 올바르지 않습니다." }, 400);
      if (!a || a.length > 24) return json({ error: "닉네임은 1~24자로 입력해 주세요." }, 400);
      if (!b || b.length > 800) return json({ error: "후기는 1~800자로 입력해 주세요." }, 400);

      const data = await readStoreReviews(store);
      if (!Array.isArray(data.byStore[sid])) data.byStore[sid] = [];
      const review = {
        id: newId("rv"),
        author: a,
        body: b,
        createdAt: new Date().toISOString(),
      };
      data.byStore[sid].unshift(review);
      await writeStoreReviews(store, data);
      return json({ review });
    }

    if (pathname === "/api/chat" && method === "POST") {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        return json(
          {
            error:
              "Netlify 환경 변수 OPENAI_API_KEY 가 없습니다. 사이트 설정 → Environment variables 에 추가한 뒤 다시 배포하세요.",
          },
          503
        );
      }

      const body = await request.json().catch(() => ({}));
      const { messages, pageContext } = body || {};
      if (!Array.isArray(messages) || messages.length === 0) {
        return json({ error: "messages 배열이 필요합니다." }, 400);
      }

      let system = SYSTEM_PROMPT;
      if (typeof pageContext === "string" && pageContext.trim()) {
        system += `\n\n[현재 사용자 화면 맥락]\n${pageContext.trim()}`;
      }

      const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

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
        return json({ error: msg }, 502);
      }

      const reply = data.choices?.[0]?.message?.content ?? "";
      return json({ reply });
    }

    return json({ error: "지원하지 않는 API 경로입니다." }, 404);
  } catch (e) {
    console.error(e);
    return json({ error: "서버 처리 중 오류가 발생했습니다." }, 500);
  }
};

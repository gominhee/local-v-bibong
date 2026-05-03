(function () {
  const listEl = document.getElementById("vmaker-post-list");
  const errEl = document.getElementById("vmaker-board-error");
  const writePanel = document.getElementById("vmaker-write-panel");
  const openWriteBtn = document.getElementById("vmaker-open-write");
  const cancelWriteBtn = document.getElementById("vmaker-cancel-write");
  const writeForm = document.getElementById("vmaker-write-form");

  if (!listEl || !writeForm) return;

  let postsCache = [];
  let selectedPostId = null;

  function showError(msg) {
    if (!errEl) return;
    errEl.textContent = msg || "";
    errEl.hidden = !msg;
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString("ko-KR", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return iso;
    }
  }

  function categoryLabel(cat) {
    return cat === "notice" ? "공지" : "활동일지";
  }

  function categoryClass(cat) {
    return cat === "notice" ? "badge badge--notice" : "badge badge--log";
  }

  function getPostById(id) {
    return postsCache.find((p) => p.id === id) || null;
  }

  /** 상세 영역: 본문 + 댓글 + 댓글 폼 */
  function renderDetailInto(container, post) {
    container.innerHTML = "";

    const topActions = document.createElement("div");
    topActions.className = "vmaker-detail-top-actions";
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "vmaker-btn-danger";
    delBtn.textContent = "삭제";
    delBtn.setAttribute("aria-label", "이 글 삭제");
    delBtn.addEventListener("click", async () => {
      if (!confirm("이 글과 댓글을 모두 삭제할까요?")) return;
      delBtn.disabled = true;
      showError("");
      try {
        const res = await fetch("/api/vmaker-board/posts/" + encodeURIComponent(post.id), {
          method: "DELETE",
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "삭제에 실패했습니다.");
        selectedPostId = null;
        await loadBoard();
      } catch (err) {
        showError(err.message || "삭제에 실패했습니다.");
      } finally {
        delBtn.disabled = false;
      }
    });
    topActions.appendChild(delBtn);
    container.appendChild(topActions);

    const card = document.createElement("article");
    card.className = "vmaker-post-card vmaker-post-card--detail";

    const head = document.createElement("div");
    head.className = "vmaker-post-card__head";
    const badge = document.createElement("span");
    badge.className = categoryClass(post.category);
    badge.textContent = categoryLabel(post.category);
    const titleEl = document.createElement("h3");
    titleEl.className = "vmaker-post-card__title";
    titleEl.textContent = post.title || "";
    const meta = document.createElement("p");
    meta.className = "vmaker-post-card__meta";
    meta.textContent = (post.author || "") + " · " + formatDate(post.createdAt);
    head.appendChild(badge);
    head.appendChild(titleEl);
    head.appendChild(meta);

    const body = document.createElement("div");
    body.className = "vmaker-post-card__body";
    body.textContent = post.body || "(본문 없음)";

    const commentsWrap = document.createElement("div");
    commentsWrap.className = "vmaker-comments";

    const sub = document.createElement("h4");
    sub.className = "vmaker-comments__title";
    sub.textContent = "댓글";
    commentsWrap.appendChild(sub);

    const ul = document.createElement("ul");
    ul.className = "vmaker-comment-list";
    (post.comments || []).forEach((c) => {
      const li = document.createElement("li");
      li.className = "vmaker-comment-item";
      const cm = document.createElement("span");
      cm.className = "vmaker-comment-item__meta";
      cm.textContent = (c.author || "") + " · " + formatDate(c.createdAt);
      const cb = document.createElement("p");
      cb.className = "vmaker-comment-item__body";
      cb.textContent = c.body || "";
      li.appendChild(cm);
      li.appendChild(cb);
      ul.appendChild(li);
    });
    if (!(post.comments || []).length) {
      const empty = document.createElement("li");
      empty.className = "vmaker-comment-item vmaker-comment-item--empty";
      empty.textContent = "댓글이 없습니다.";
      ul.appendChild(empty);
    }
    commentsWrap.appendChild(ul);

    const cForm = document.createElement("form");
    cForm.className = "vmaker-comment-form";
    const labelA = document.createElement("label");
    labelA.className = "vmaker-sr-only";
    labelA.htmlFor = "vmaker-c-author-detail";
    labelA.textContent = "댓글 작성자";
    const inputA = document.createElement("input");
    inputA.type = "text";
    inputA.id = "vmaker-c-author-detail";
    inputA.name = "author";
    inputA.placeholder = "작성자";
    inputA.maxLength = 40;
    inputA.required = true;
    inputA.className = "vmaker-input vmaker-input--sm";
    const labelB = document.createElement("label");
    labelB.className = "vmaker-sr-only";
    labelB.htmlFor = "vmaker-c-body-detail";
    labelB.textContent = "댓글 내용";
    const ta = document.createElement("textarea");
    ta.id = "vmaker-c-body-detail";
    ta.name = "body";
    ta.rows = 3;
    ta.placeholder = "댓글을 입력하세요";
    ta.maxLength = 2000;
    ta.required = true;
    ta.className = "vmaker-input";
    const btnC = document.createElement("button");
    btnC.type = "submit";
    btnC.className = "vmaker-btn-secondary";
    btnC.textContent = "댓글 등록";
    cForm.appendChild(labelA);
    cForm.appendChild(inputA);
    cForm.appendChild(labelB);
    cForm.appendChild(ta);
    cForm.appendChild(btnC);

    cForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(cForm);
      const author = String(fd.get("author") || "").trim();
      const body = String(fd.get("body") || "").trim();
      if (!author || !body) return;
      const btn = cForm.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      try {
        const res = await fetch("/api/vmaker-board/posts/" + encodeURIComponent(post.id) + "/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ author, body }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "댓글 저장 실패");
        cForm.reset();
        selectedPostId = post.id;
        await loadBoard();
      } catch (err) {
        showError(err.message || "댓글 저장에 실패했습니다.");
      } finally {
        if (btn) btn.disabled = false;
      }
    });

    commentsWrap.appendChild(cForm);
    card.appendChild(head);
    card.appendChild(body);
    card.appendChild(commentsWrap);
    container.appendChild(card);
  }

  function showListPane() {
    const listPane = document.getElementById("vmaker-board-list-pane");
    const detailPane = document.getElementById("vmaker-board-detail-pane");
    if (listPane) listPane.hidden = false;
    if (detailPane) detailPane.hidden = true;
    selectedPostId = null;
  }

  function openDetail(postId) {
    const post = getPostById(postId);
    if (!post) return;
    selectedPostId = postId;
    const listPane = document.getElementById("vmaker-board-list-pane");
    const detailPane = document.getElementById("vmaker-board-detail-pane");
    const content = document.getElementById("vmaker-detail-content");
    if (!listPane || !detailPane || !content) return;
    listPane.hidden = true;
    detailPane.hidden = false;
    renderDetailInto(content, post);
  }

  function renderShell() {
    listEl.innerHTML = "";
    if (!postsCache.length) {
      const p = document.createElement("p");
      p.className = "vmaker-board-empty";
      p.textContent = "아직 글이 없습니다. 글쓰기로 첫 글을 남겨 보세요.";
      listEl.appendChild(p);
      return;
    }

    const shell = document.createElement("div");
    shell.className = "vmaker-board-shell";

    const listPane = document.createElement("div");
    listPane.id = "vmaker-board-list-pane";
    listPane.className = "vmaker-board-list-pane";

    const table = document.createElement("table");
    table.className = "vmaker-post-index-table";
    const thead = document.createElement("thead");
    thead.innerHTML =
      "<tr><th scope=\"col\">번호</th><th scope=\"col\">구분</th><th scope=\"col\">제목</th><th scope=\"col\">작성일</th><th scope=\"col\">작성자</th></tr>";
    const tbody = document.createElement("tbody");

    postsCache.forEach((post, idx) => {
      const num = postsCache.length - idx;
      const tr = document.createElement("tr");
      tr.className = "vmaker-post-row";
      tr.setAttribute("role", "button");
      tr.tabIndex = 0;
      tr.dataset.postId = post.id;
      tr.setAttribute("aria-label", "글 보기: " + (post.title || ""));

      const tdNum = document.createElement("td");
      tdNum.textContent = String(num);
      tdNum.setAttribute("data-label", "번호");

      const tdCat = document.createElement("td");
      tdCat.setAttribute("data-label", "구분");
      const badge = document.createElement("span");
      badge.className = categoryClass(post.category);
      badge.textContent = categoryLabel(post.category);
      tdCat.appendChild(badge);

      const tdTitle = document.createElement("td");
      tdTitle.className = "vmaker-post-row__title";
      tdTitle.textContent = post.title || "";
      tdTitle.setAttribute("data-label", "제목");

      const tdDate = document.createElement("td");
      tdDate.textContent = formatDate(post.createdAt);
      tdDate.setAttribute("data-label", "작성일");

      const tdAuthor = document.createElement("td");
      tdAuthor.textContent = post.author || "";
      tdAuthor.setAttribute("data-label", "작성자");

      tr.appendChild(tdNum);
      tr.appendChild(tdCat);
      tr.appendChild(tdTitle);
      tr.appendChild(tdDate);
      tr.appendChild(tdAuthor);

      function activate() {
        openDetail(post.id);
      }
      tr.addEventListener("click", activate);
      tr.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });

      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    listPane.appendChild(table);

    const detailPane = document.createElement("div");
    detailPane.id = "vmaker-board-detail-pane";
    detailPane.className = "vmaker-board-detail-pane";
    detailPane.hidden = true;

    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.id = "vmaker-back-list";
    backBtn.className = "vmaker-btn-ghost vmaker-back-list";
    backBtn.textContent = "← 목록으로";
    backBtn.addEventListener("click", showListPane);

    const detailContent = document.createElement("div");
    detailContent.id = "vmaker-detail-content";
    detailContent.className = "vmaker-detail-content";

    detailPane.appendChild(backBtn);
    detailPane.appendChild(detailContent);

    shell.appendChild(listPane);
    shell.appendChild(detailPane);
    listEl.appendChild(shell);
  }

  async function loadBoard() {
    showError("");
    const res = await fetch("/api/vmaker-board");
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      showError(data.error || "게시판을 불러오지 못했습니다. npm start 로 서버를 실행했는지 확인하세요.");
      return;
    }
    const keepDetail = selectedPostId;
    postsCache = data.posts || [];
    renderShell();
    if (keepDetail && getPostById(keepDetail)) {
      openDetail(keepDetail);
    }
  }

  if (openWriteBtn && writePanel) {
    openWriteBtn.addEventListener("click", () => {
      writePanel.hidden = !writePanel.hidden;
      openWriteBtn.setAttribute("aria-expanded", writePanel.hidden ? "false" : "true");
    });
  }
  if (cancelWriteBtn && writePanel) {
    cancelWriteBtn.addEventListener("click", () => {
      writePanel.hidden = true;
      if (openWriteBtn) openWriteBtn.setAttribute("aria-expanded", "false");
    });
  }

  writeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(writeForm);
    const category = String(fd.get("category") || "");
    const title = String(fd.get("title") || "").trim();
    const author = String(fd.get("author") || "").trim();
    const body = String(fd.get("body") || "").trim();
    const submitBtn = writeForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    showError("");
    try {
      const res = await fetch("/api/vmaker-board/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, title, author, body }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "글 등록 실패");
      writeForm.reset();
      if (writePanel) writePanel.hidden = true;
      if (openWriteBtn) openWriteBtn.setAttribute("aria-expanded", "false");
      selectedPostId = null;
      await loadBoard();
      if (data.post && data.post.id) {
        openDetail(data.post.id);
      }
    } catch (err) {
      showError(err.message || "글 등록에 실패했습니다.");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  loadBoard().catch((err) => {
    showError(err.message || "게시판을 불러오지 못했습니다.");
  });
})();

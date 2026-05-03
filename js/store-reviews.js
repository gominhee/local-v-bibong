(function () {
  const params = new URLSearchParams(window.location.search);
  const storeId = params.get("id");
  if (!storeId) return;

  const listEl = document.getElementById("store-reviews-list");
  const form = document.getElementById("store-review-form");
  const msgEl = document.getElementById("store-review-msg");
  const authorIn = document.getElementById("store-review-author");
  const bodyIn = document.getElementById("store-review-body");

  if (!listEl || !form) return;

  function esc(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function fmtDate(iso) {
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return "";
      return d.toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });
    } catch {
      return "";
    }
  }

  function renderReviews(reviews) {
    if (!Array.isArray(reviews) || reviews.length === 0) {
      listEl.innerHTML =
        '<p class="store-reviews-empty">아직 남겨진 후기가 없어요. 첫 후기를 남겨 보세요.</p>';
      return;
    }
    listEl.innerHTML = reviews
      .map(
        (r) => `<article class="store-review-card">
          <header class="store-review-card__head"><strong>${esc(r.author)}</strong><time datetime="${esc(r.createdAt)}">${esc(fmtDate(r.createdAt))}</time></header>
          <p class="store-review-card__body">${esc(r.body)}</p>
        </article>`
      )
      .join("");
  }

  async function load() {
    try {
      const res = await fetch(`/api/store-reviews?storeId=${encodeURIComponent(storeId)}`);
      const raw = await res.text();
      let data = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error(
          "서버가 후기 API 대신 다른 내용을 보냈습니다. 터미널에서 서버를 끄고(Ctrl+C) 프로젝트 폴더에서 npm start 로 다시 실행해 주세요."
        );
      }
      if (!res.ok) {
        throw new Error(
          data.error ||
            (res.status === 404
              ? "후기 API를 찾을 수 없습니다(404). server.js에 /api/store-reviews 가 있는지 확인한 뒤, 서버를 재시작하세요."
              : `후기 불러오기 실패(HTTP ${res.status}).`)
        );
      }
      if (!Array.isArray(data.reviews)) data.reviews = [];
      renderReviews(data.reviews);
    } catch (e) {
      listEl.innerHTML = `<p class="store-reviews-error" role="alert">${esc(
        e.message ||
          "후기를 불러오지 못했습니다. 주소가 http://localhost:3000/… 인지, npm start 로 서버가 켜져 있는지 확인해 주세요."
      )}</p>`;
    }
  }

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (msgEl) msgEl.textContent = "";
    const author = authorIn && authorIn.value.trim();
    const body = bodyIn && bodyIn.value.trim();
    if (!author || !body) return;

    try {
      const res = await fetch("/api/store-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeId, author, body }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "저장 실패");
      if (bodyIn) bodyIn.value = "";
      if (msgEl) msgEl.textContent = "후기가 등록되었습니다.";
      await load();
    } catch (e) {
      if (msgEl) msgEl.textContent = e.message || "저장에 실패했습니다.";
    }
  });

  load();
})();

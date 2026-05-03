(function () {
  const grid = document.getElementById("store-grid");
  if (!grid || !window.STORES) return;

  const initial = (name) => {
    const s = name.replace(/\s/g, "");
    return s.slice(0, 2) || "로";
  };

  window.STORES.forEach((s) => {
    const themeKey = s.theme.replace("theme-", "");
    const a = document.createElement("a");
    a.href = `store.html?id=${encodeURIComponent(s.id)}`;
    a.className = "store-card";
    a.innerHTML = `
      <div class="thumb thumb-${themeKey}">${initial(s.name)}</div>
      <div class="body">
        <span class="cat">${s.category}</span>
        <h2>${escapeHtml(s.name)}</h2>
        <p class="tagline">${escapeHtml(s.tagline)}</p>
        <span class="cta">상세 보기 →</span>
      </div>
    `;
    grid.appendChild(a);
  });

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }
})();

/** 음식 마퀴: 외부 이미지 일시 실패 시 1회 재시도, 그다음은 플레이스홀더 */
(function () {
  const svgFallback =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="260" height="160"><rect fill="#e2e8f0" width="100%" height="100%"/></svg>'
    );
  document.querySelectorAll(".food-marquee-row img").forEach((img) => {
    img.addEventListener("error", function onMarqueeImgError() {
      const step = img.dataset.marqueeErr || "0";
      if (step === "0") {
        img.dataset.marqueeErr = "1";
        const src = img.getAttribute("src");
        if (src && !src.startsWith("data:")) {
          try {
            const u = new URL(src);
            u.searchParams.set("_r", "1");
            img.src = u.href;
            return;
          } catch (_) {
            /* fall through */
          }
        }
      }
      img.src = svgFallback;
      img.removeEventListener("error", onMarqueeImgError);
    });
  });
})();

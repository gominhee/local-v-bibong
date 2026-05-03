(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const store = window.STORES && window.STORES.find((s) => s.id === id);

  if (!store) {
    document.body.innerHTML = `
      <div class="wrap" style="padding:3rem 1rem;text-align:center;">
        <h1 style="margin-bottom:0.5rem;">점포를 찾을 수 없어요</h1>
        <p style="opacity:0.8;margin-bottom:1.5rem;">링크가 올바른지 확인해 주세요.</p>
        <a href="index.html" class="nav-home">← 목록으로</a>
      </div>
    `;
    return;
  }

  document.body.classList.add(store.theme);
  document.title = `${store.name} | 로컬-V 비봉`;

  let chatCtx = `${store.name} (${store.category}) — 비봉면 협력 점포 소개 페이지`;
  if (Array.isArray(store.infoTable) && store.infoTable.length > 0) {
    chatCtx +=
      " 안내 표의 주소·전화·영업시간 등은 데모용 가상 데이터가 포함될 수 있으니 방문 전 매장 확인이 필요합니다.";
  }
  if (store.bossInterview && typeof store.bossInterview.content === "string") {
    chatCtx += " 사장님 인터뷰·사진은 웹 데모용 가상 구성일 수 있습니다.";
  }
  chatCtx += " 학생 후기는 로컬 서버에서 익명 닉네임으로 남길 수 있습니다.";
  window.CHAT_PAGE_CONTEXT = chatCtx;

  const set = (sel, html) => {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = html;
  };

  set("#store-badge", escapeHtml(store.category));
  set("#store-title", escapeHtml(store.name));
  set("#store-tagline", escapeHtml(store.tagline));
  set("#store-accent", escapeHtml(`「${store.accent}」`));

  const heroThumb = document.getElementById("store-hero-thumb");
  if (heroThumb) {
    if (typeof store.heroImage === "string" && store.heroImage.trim()) {
      heroThumb.src = store.heroImage.trim();
      heroThumb.alt = `${store.name} 가게 이미지(웹 스톡 사진 · 실제 매장과 다를 수 있음)`;
      heroThumb.hidden = false;
    } else {
      heroThumb.removeAttribute("src");
      heroThumb.alt = "";
      heroThumb.hidden = true;
    }
  }

  function phoneRowHtml() {
    const p = store.phone;
    if (p == null || p === "") {
      return `<dt>전화</dt><dd>현장 안내 또는 추후 업데이트</dd>`;
    }
    const compact = p.replace(/\s/g, "");
    const looksPlaceholder = /X{2,}|Y{2,}|Z{2,}|A{2,}|B{2,}|C{2,}|D{2,}|E{2,}|현장\s*확인|예정/i.test(String(p));
    if (looksPlaceholder) {
      return `<dt>전화</dt><dd>${escapeHtml(p)}</dd>`;
    }
    return `<dt>전화</dt><dd><a href="tel:${escapeAttr(compact)}">${escapeHtml(p)}</a></dd>`;
  }

  if (Array.isArray(store.infoTable) && store.infoTable.length > 0) {
    const rows = store.infoTable
      .map(
        (row) =>
          `<tr><th scope="row">${escapeHtml(row.label)}</th><td>${escapeHtml(row.value)}</td></tr>`
      )
      .join("");
    set("#panel-info", `<table class="store-info-table"><tbody>${rows}</tbody></table>`);
  } else {
    set(
      "#panel-info",
      `<dl>
    <dt>주소</dt><dd>${escapeHtml(store.address)}</dd>
    ${phoneRowHtml()}
    <dt>영업</dt><dd>${escapeHtml(store.hours)}</dd>
  </dl>`
    );
  }

  const heroBossStrip = document.getElementById("store-hero-boss-strip");
  if (heroBossStrip) {
    const bi = store.bossInterview;
    if (store.bossInterviewProminent && bi && typeof bi.content === "string" && bi.content.trim()) {
      const quote = escapeHtml(bi.content.trim());
      heroBossStrip.hidden = false;
      heroBossStrip.innerHTML = `
        <div class="store-hero-boss-strip__inner wrap">
          <p class="store-hero-boss-strip__label">사장님 인터뷰 <span class="store-fictional-badge">가상</span></p>
          <blockquote class="store-hero-boss-strip__quote" cite="가상 인터뷰">
            <span class="store-hero-boss-strip__qmark" aria-hidden="true">“</span>
            <p>${quote}</p>
            <span class="store-hero-boss-strip__qmark store-hero-boss-strip__qmark--end" aria-hidden="true">”</span>
          </blockquote>
        </div>`;
    } else {
      heroBossStrip.hidden = true;
      heroBossStrip.innerHTML = "";
    }
  }

  const bossEl = document.getElementById("panel-boss-interview");
  if (bossEl) {
    const bi = store.bossInterview;
    const skipPanel = !!(store.bossInterviewProminent && bi && typeof bi.content === "string" && bi.content.trim());
    if (skipPanel) {
      bossEl.hidden = true;
      bossEl.innerHTML = "";
    } else if (bi && typeof bi.content === "string" && bi.content.trim()) {
      const imgUrl = typeof bi.image === "string" && bi.image.trim() ? bi.image.trim() : "";
      const role = typeof bi.role === "string" && bi.role.trim() ? bi.role.trim() : "사장님";
      const fig = imgUrl
        ? `<figure class="store-boss-interview__fig">
             <img src="${escapeAttr(imgUrl)}" alt="${escapeAttr(`${role} 인터뷰 참고 이미지(웹 스톡 · 실제와 다를 수 있음)`)}" width="640" height="400" loading="lazy" decoding="async" />
             <figcaption>${escapeHtml(role)}</figcaption>
           </figure>`
        : "";
      const whaleMark =
        store.id === "gorae-bapsang"
          ? `<span class="store-boss-whale" aria-hidden="true"><svg class="store-boss-whale__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 64" width="52" height="28" focusable="false"><path fill="currentColor" d="M12 38c-6-12 6-28 24-30 10-16 36-20 52-8 14-10 36-6 44 8 8 4 12 28 2 40-8 10-26 14-40 10-16 10-38 10-54 2-12 8-30 6-38-8-2-4-2-10 0-14zm78-6a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM24 34c4 2 8-2 6-6s-8-4-10 0 0 6 4 6z"/></svg></span>`
          : "";
      const homeMark =
        store.id === "happy-home-pizza"
          ? `<span class="store-boss-home" aria-hidden="true"><svg class="store-boss-home__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34" focusable="false"><path fill="currentColor" d="M12 3 2 12h3v9h6v-6h4v6h6v-9h3L12 3z"/><path class="store-boss-home__heart" fill="#e07a5f" d="M17.2 6.5c-1.1 0-2.1.5-2.7 1.3-.6-.8-1.6-1.3-2.7-1.3-1.8 0-3.2 1.4-3.2 3.2 0 2.4 3.4 4.5 5.9 6.1 2.5-1.6 5.9-3.7 5.9-6.1 0-1.8-1.4-3.2-3.2-3.2z"/></svg></span>`
          : "";
      const titleGraphic = whaleMark || homeMark;
      const titleGraphicClass = whaleMark
        ? "store-boss-interview__title--with-whale"
        : homeMark
          ? "store-boss-interview__title--with-home"
          : "";
      const titleInner = titleGraphic
        ? `<h4 class="store-boss-interview__title ${titleGraphicClass}"><span class="store-boss-interview__title-row">${titleGraphic}<span>사장님 인터뷰 <span class="store-fictional-badge">가상</span></span></span></h4>`
        : `<h4 class="store-boss-interview__title">사장님 인터뷰 <span class="store-fictional-badge">가상</span></h4>`;
      bossEl.hidden = false;
      bossEl.innerHTML = `
        ${titleInner}
        <div class="store-boss-interview__inner">
          ${fig}
          <blockquote class="store-boss-interview__quote"><p>${escapeHtml(bi.content.trim())}</p></blockquote>
        </div>`;
    } else {
      bossEl.hidden = true;
      bossEl.innerHTML = "";
    }
  }

  const picksBlock = document.getElementById("store-picks-block");
  const picksInner = document.getElementById("store-picks-inner");
  if (picksBlock && picksInner) {
    if (Array.isArray(store.recommendPoints) && store.recommendPoints.length > 0) {
      picksInner.innerHTML = store.recommendPoints
        .map(
          (r) =>
            `<article class="store-point-card"><span class="store-point-tag">${escapeHtml(r.tag)}</span><p>${escapeHtml(r.text)}</p></article>`
        )
        .join("");
      picksBlock.hidden = false;
    } else if (Array.isArray(store.highlights) && store.highlights.length > 0) {
      picksInner.innerHTML = store.highlights.map((h) => `<span class="chip">${escapeHtml(h)}</span>`).join("");
      picksBlock.hidden = false;
    } else {
      picksInner.innerHTML = "";
      picksBlock.hidden = true;
    }
  }

  if (Array.isArray(store.menuItems) && store.menuItems.length > 0) {
    set(
      "#panel-menu",
      `<div class="store-menu-grid">${store.menuItems
        .map((m) => {
          const imgUrl = typeof m.image === "string" && m.image.trim() ? m.image.trim() : "";
          const media = imgUrl
            ? `<div class="store-menu-card__media"><img src="${escapeAttr(imgUrl)}" alt="${escapeAttr(`${m.name} 참고 이미지(웹 스톡)`)}" width="640" height="400" loading="lazy" decoding="async" /></div>`
            : "";
          return `<article class="store-menu-card${imgUrl ? " store-menu-card--has-image" : ""}">${media}<div class="store-menu-card__body"><h4>${escapeHtml(m.name)}</h4><p>${escapeHtml(m.description)}</p></div></article>`;
        })
        .join("")}</div>`
    );
  } else {
    set(
      "#panel-menu",
      store.signature.map((m) => `<span class="chip">${escapeHtml(m)}</span>`).join("")
    );
  }

  const interviewEl = document.getElementById("store-interview-block");
  if (interviewEl) {
    if (Array.isArray(store.interviewQuotes) && store.interviewQuotes.length > 0) {
      interviewEl.hidden = false;
      interviewEl.innerHTML = `
        <h3 class="store-section-title">학생 인터뷰 미리보기 <span class="store-fictional-badge">가상</span></h3>
        <div class="store-interview-grid">
          ${store.interviewQuotes
            .map((q) => `<blockquote class="store-interview-quote"><p>${escapeHtml(q)}</p></blockquote>`)
            .join("")}
        </div>`;
    } else {
      interviewEl.hidden = true;
      interviewEl.innerHTML = "";
    }
  }

  const refEl = document.getElementById("ref-block");
  if (refEl) {
    if (store.reference) {
      refEl.innerHTML = `<a class="ref-link" href="${escapeAttr(store.reference)}" target="_blank" rel="noopener noreferrer">참고 링크 (맛집 정보)</a>`;
    } else {
      refEl.innerHTML = `<span class="ref-link" style="opacity:0.7;">참고 링크는 인터뷰 후 추가 예정입니다.</span>`;
    }
  }

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();

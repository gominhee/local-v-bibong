/**
 * 로컬-V 챗봇 — POST /api/chat (Express 프록시)
 * window.CHAT_PAGE_CONTEXT 가 있으면 상세 페이지 맥락으로 전달됩니다.
 */
(function () {
  const panel = document.getElementById("chat-widget-panel");
  const toggle = document.getElementById("chat-widget-toggle");
  const closeBtn = document.getElementById("chat-widget-close");
  const messagesEl = document.getElementById("chat-widget-messages");
  const input = document.getElementById("chat-widget-input");
  const sendBtn = document.getElementById("chat-widget-send");
  const errorEl = document.getElementById("chat-widget-error");

  if (!panel || !toggle || !messagesEl || !input || !sendBtn) return;

  /** @type {{role: string, content: string}[]} */
  let history = [];

  function setOpen(open) {
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", () => setOpen(!panel.classList.contains("is-open")));
  closeBtn.addEventListener("click", () => setOpen(false));

  function showError(text) {
    if (!errorEl) return;
    errorEl.textContent = text || "";
    errorEl.hidden = !text;
  }

  function appendMessage(role, content) {
    const wrap = document.createElement("div");
    wrap.className = "chat-widget-msg " + (role === "user" ? "user" : "bot");
    const roleLabel = role === "user" ? "나" : "로컬-V 안내";
    wrap.innerHTML =
      '<div class="role">' +
      escapeHtml(roleLabel) +
      '</div><div class="bubble">' +
      escapeHtml(content) +
      "</div>";
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function setLoading(loading) {
    sendBtn.disabled = loading;
    input.disabled = loading;
    let typing = messagesEl.querySelector(".chat-widget-typing");
    if (loading) {
      if (!typing) {
        typing = document.createElement("div");
        typing.className = "chat-widget-typing";
        typing.textContent = "답변 작성 중…";
        messagesEl.appendChild(typing);
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }
    } else if (typing) {
      typing.remove();
    }
  }

  async function send() {
    const text = input.value.trim();
    if (!text) return;

    showError("");
    appendMessage("user", text);
    input.value = "";
    history.push({ role: "user", content: text });

    setLoading(true);
    try {
      const body = {
        messages: history.map((m) => ({ role: m.role, content: m.content })),
      };
      const ctx =
        typeof window.CHAT_PAGE_CONTEXT === "string" && window.CHAT_PAGE_CONTEXT.trim()
          ? window.CHAT_PAGE_CONTEXT.trim()
          : undefined;
      if (ctx) body.pageContext = ctx;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "요청에 실패했습니다.");
      }
      const reply = data.reply || "";
      history.push({ role: "assistant", content: reply });
      appendMessage("assistant", reply);
    } catch (e) {
      history.pop();
      showError(e.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });

  if (!messagesEl.querySelector(".chat-widget-msg")) {
    appendMessage(
      "assistant",
      "안녕하세요, 로컬-V 안내입니다. 비봉면 맛집·프로젝트에 대해 물어보세요. 영업시간·가격은 매장 확인이 가장 정확해요."
    );
  }
})();

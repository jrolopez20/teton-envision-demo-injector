chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.html) {
    const container = document.createElement("div");
    container.innerHTML = request.html;
    document.body.appendChild(container);
    sendResponse({ status: "HTML injected successfully" });
  }
});

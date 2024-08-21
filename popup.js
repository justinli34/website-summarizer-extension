const display = document.getElementById("summary");
const button = document.getElementById("summarize-button");

button.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extractText" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError);
      } else {
        chrome.runtime.sendMessage({ action: "summarize", content: response.pageText }, (response) => {
          display.innerText = response.summary;
        });
      }
    });
  });
});
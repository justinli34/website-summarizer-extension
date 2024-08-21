chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "extractText") {
    const pageText = document.body.innerText;
    console.log(pageText);
    sendResponse({ pageText });
    return true;
  }
});
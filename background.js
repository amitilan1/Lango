// Listening for messages
chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  // Showing the page action if the content script says to
  if (request.message === "show_page_action") {
    chrome.pageAction.show(sender.tab.id);
  }
}
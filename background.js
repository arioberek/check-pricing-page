let pricingPageExists = false;
let freePlanDetected = false;
let priceRange = null;

function updateBadge(tabId, state) {
  const badgeTextMap = {
    checking: "🔍",
    error: "❌",
    found: "✔️",
    notFound: "⚠️",
  };

  chrome.action.setBadgeText({
    tabId: tabId,
    text: badgeTextMap[state] || "",
  });

  chrome.action.setBadgeBackgroundColor({
    tabId: tabId,
    color: state === "error" ? "red" : "green",
  });
}

function checkPricingPage(tabId) {
  updateBadge(tabId, "checking");

  chrome.tabs.sendMessage(
    tabId,
    { action: "check_pricing_content" },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        updateBadge(tabId, "error");
        return;
      }

      pricingPageExists = response.pricingFound;
      freePlanDetected = response.freePlanDetected;
      priceRange = response.priceRange;

      updateBadge(tabId, pricingPageExists ? "found" : "notFound");
    }
  );
}

function checkPricingPage(tabId) {
  updateBadge(tabId, "checking");

  chrome.tabs.sendMessage(
    tabId,
    { action: "check_pricing_content" },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        updateBadge(tabId, "error");
        return;
      }

      pricingPageExists = response.pricingFound;
      freePlanDetected = response.freePlanDetected;

      updateBadge(tabId, pricingPageExists ? "found" : "notFound");
    }
  );
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    checkPricingPage(tabId);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "get_status") {
    sendResponse({
      pricingPageExists: pricingPageExists,
      freePlanDetected: freePlanDetected,
      priceRange: priceRange,
    });
  }
});

const pricingKeywords = [
  "pricing",
  "plans",
  "subscription",
  "premium",
  "pro plan",
  "paid plan",
];
const freeKeywords = [
  "free",
  "free plan",
  "no cost",
  "no charge",
  "free tier",
  "free version",
  "free subscription",
  "free account",
];

function detectPriceRange() {
  // This regex looks for numbers that might be prices, with or without currency symbols
  const priceRegex =
    /(?:(?:\$|USD|£|€|EUR)?\s?(\d+(?:\.\d{2})?))|(?:(\d+(?:\.\d{2})?)\s?(?:\$|USD|£|€|EUR))/gi;
  const prices = [];
  const textContent = document.body.innerText;
  let match;

  while ((match = priceRegex.exec(textContent)) !== null) {
    // The price could be in group 1 or 2, depending on the currency symbol position
    const price = parseFloat(match[1] || match[2]);
    if (!isNaN(price)) {
      prices.push(price);
    }
  }

  // Look for specific price mentions in the HTML
  const priceElements = document.querySelectorAll(
    '[class*="price"], [id*="price"]'
  );
  priceElements.forEach((element) => {
    const priceText = element.textContent.trim();
    const priceMatch = priceText.match(/\d+(?:\.\d{2})?/);
    if (priceMatch) {
      const price = parseFloat(priceMatch[0]);
      if (!isNaN(price)) {
        prices.push(price);
      }
    }
  });

  if (prices.length > 0) {
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return { min: minPrice, max: maxPrice };
  }

  return null;
}

function checkContent() {
  const bodyText = document.body.innerText.toLowerCase();
  const pricingFound = pricingKeywords.some((keyword) =>
    bodyText.includes(keyword)
  );
  const freePlanDetected = freeKeywords.some((keyword) =>
    bodyText.includes(keyword)
  );

  // Check for pricing sections or elements
  const pricingSections = document.querySelectorAll(
    '[id*="pricing"], [class*="pricing"], [id*="plan"], [class*="plan"]'
  );
  const hasPricingSection = pricingSections.length > 0;

  const priceRange = detectPriceRange();

  return {
    pricingFound: pricingFound || hasPricingSection,
    freePlanDetected: freePlanDetected,
    priceRange: priceRange,
  };
}

function checkUrlForPricing() {
  const url = window.location.href.toLowerCase();
  return pricingKeywords.some((keyword) => url.includes(keyword));
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "check_pricing_content") {
    const urlCheck = checkUrlForPricing();
    const contentCheck = checkContent();

    sendResponse({
      pricingFound: urlCheck || contentCheck.pricingFound,
      freePlanDetected: contentCheck.freePlanDetected,
      priceRange: contentCheck.priceRange,
    });
  }
});

// Initial check when the content script loads
const initialCheck = checkContent();
chrome.runtime.sendMessage({
  action: "initial_check",
  pricingFound: checkUrlForPricing() || initialCheck.pricingFound,
  freePlanDetected: initialCheck.freePlanDetected,
});

// Listen for SPA navigation events
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    const check = checkContent();
    chrome.runtime.sendMessage({
      action: "spa_navigation",
      pricingFound: checkUrlForPricing() || check.pricingFound,
      freePlanDetected: check.freePlanDetected,
    });
  }
}).observe(document, { subtree: true, childList: true });

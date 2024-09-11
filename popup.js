document.addEventListener("DOMContentLoaded", function () {
  const messageElement = document.getElementById("message");
  const freePlanStatusElement = document.getElementById("free-plan-status");
  const priceRangeElement = document.getElementById("price-range");
  const statusIcon = messageElement.querySelector(".status-icon");

  function updatePopup(response) {
    messageElement.classList.remove("loading");

    if (response && response.pricingPageExists) {
      statusIcon.classList.remove("checking");
      statusIcon.classList.add("found");
      messageElement.innerHTML = `<span class="status-icon found"></span>Pricing page found`;

      if (response.freePlanDetected) {
        freePlanStatusElement.textContent =
          "This website offers a free plan or free trial!";
      } else {
        freePlanStatusElement.textContent = "No free plan detected.";
      }

      if (response.priceRange) {
        priceRangeElement.textContent = `Price range: $${response.priceRange.min.toFixed(
          2
        )} - $${response.priceRange.max.toFixed(2)}`;
      } else {
        priceRangeElement.textContent = "Unable to detect price range.";
      }
    } else {
      statusIcon.classList.remove("checking");
      statusIcon.classList.add("not-found");
      messageElement.innerHTML = `<span class="status-icon not-found"></span>No pricing page found`;
      freePlanStatusElement.textContent = "";
      priceRangeElement.textContent = "";
    }
  }

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.runtime.sendMessage({ action: "get_status" }, function (response) {
      updatePopup(response);
    });
  });
});

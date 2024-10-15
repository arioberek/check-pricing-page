# 🌐 Chrome Extension: Pricing Page Detector

This project is a Chrome extension that helps users find out if a 🌍 website has a 💲 pricing page, offers a 🆓 plan, or provides pricing information. The extension works in the background, so users don't need to do anything directly.

## ✨ Features
- **Detects Pricing Pages**: Looks for keywords like "💲pricing," "📋plans," or "🔑subscription" to check if the current website has a pricing page.
- **🆓 Free Plan Detection**: Scans the website to see if there is a free plan or free tier available.
- **💰 Price Range Detection**: Tries to find and show the price range listed on the website.
- **🔔 Badge Notifications**: Shows an icon in the Chrome toolbar to indicate the detection status:
  - "🔍": Checking.
  - "❌": Error in detection.
  - "✔️": Pricing page found.
  - "⚠️": No pricing page found.

## 🔧 How It Works
1. When you load or navigate to a new page, the extension starts scanning for pricing keywords like "💲pricing," "📋plans," or "🔑subscription."
2. It checks the URL and content of the 🌍 website to see if there is pricing information.
3. If it finds a pricing page, the extension will check if there is a 🆓 plan mentioned and try to find a 💰 price range if possible.
4. The results are shown with a badge in the Chrome toolbar and can also be viewed in the popup.

## 🛠️ How to Install
Since this extension is not published in the Chrome Web Store, follow these steps to install it manually:

1. **Download the Code**
   - 📥 Clone this repository to your 🖥️ computer using Git:
     ```
     git clone https://github.com/arioberek/check-pricing-page.git
     ```
   - Alternatively, you can download the repository as a ZIP file and extract it to a folder on your computer.

2. **Load Extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`.
   - Turn on **Developer mode** in the top right corner.
   - Click **Load unpacked** and select the folder where you cloned or extracted this repository.

3. **Verify Installation**
   - The extension should now be installed and visible in your Chrome toolbar. You can pin it for easier access.

## 📄 Usage
- After installing, the extension will start analyzing the current tab automatically whenever you load a new page.
- The badge will change to show the detection status:
  - "🔍" means the extension is checking the page.
  - "❌" means there was an error during detection.
  - "✔️" means a pricing page was found.
  - "⚠️" means no pricing page was found.
- Click the extension icon to open a popup with more details, like whether a 🆓 plan is available and the 💰 price range.

## 📝 Code Overview
- **🗂️ Background Script**: Listens for tab updates and manages communication between the content script and the popup.
- **📄 Content Script**: Runs on the webpage to look for pricing keywords, price ranges, and 🆓 plan mentions.
- **🔳 Popup Script**: Displays the information collected by the background script, including the pricing status, 🆓 plan availability, and 💰 price range.

## ⚠️ Known Issues
- **SPA Navigation**: The extension uses a mutation observer to detect changes in single-page applications (SPAs), but it might still miss some content changes in certain frameworks.
- **False Positives/Negatives**: Since the extension looks for keywords, it might sometimes miss pricing pages or incorrectly flag them.

## 🤝 Contributing
Contributions are welcome! Feel free to open issues, submit pull requests, or suggest new features.

## 📜 License
This project is licensed under the MIT License.

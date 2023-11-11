// ==UserScript==
// @name         copy template at jooto
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Jootoのコピーボタンを押した時にコピーする内容を変更します
// @author       sizebook
// @match        https://app.jooto.com/boards*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jooto.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/hirotada-t/tampermonkey/main/jooto/copyTemplate.user.js
// ==/UserScript==


const copyTitleUrl = () => {
  setTimeout(() => {
    document
      .querySelector(".taskdetail__copy-icon")
      .addEventListener("click", () => {
        const hash = document.getElementById("task-list-info").innerText;
        const title = document.querySelector(
          "h3.taskdetail__header-title"
        ).innerText;
        const url = window.location.href;
        const copyText = `[info]${hash}\n${title}\n${url}[/info]`;
        navigator.clipboard.writeText(copyText);
      });
  }, 500);
};

(function () {
  "use strict";
  let href = location.href;
  const observer = new MutationObserver(function (mutations) {
    if (href !== location.href) {
      copyTitleUrl();
      href = location.href;
    }
  });
  observer.observe(document, { childList: true, subtree: true });
  copyTitleUrl();
})();

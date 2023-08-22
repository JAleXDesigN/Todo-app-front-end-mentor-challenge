(function () {
  const mode = localStorage.getItem("theme");
  const supportDarkMode =
    window.matchMedia("(prefers-color-scheme: dark)").matches === true;
  if (!mode && supportDarkMode)
    document.documentElement.setAttribute("data-theme", "dark");
  if (!mode) return;
  document.documentElement.setAttribute("data-theme", mode);
})();

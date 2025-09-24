(function(){
  const KEY = "prismThemeChoice";

  function q(selector){ return Array.from(document.querySelectorAll(selector)); }

  function applyTheme(value){
    const autoLight = q('link[data-prism-auto="light"]');
    const autoDark  = q('link[data-prism-auto="dark"]');
    const named = q('link[data-prism-theme]');

    if (value === "auto") {
      // enable auto light/dark
      autoLight.forEach(l => l.disabled = false);
      autoDark.forEach(l => l.disabled = false);
      // disable all named
      named.forEach(l => l.disabled = true);
    } else {
      // disable auto
      autoLight.forEach(l => l.disabled = true);
      autoDark.forEach(l => l.disabled = true);
      // enable only chosen named, disable others
      named.forEach(l => {
        l.disabled = (l.getAttribute('data-prism-theme') !== value);
      });
    }
  }

  function initPicker(){
    const sel = document.getElementById("prism-theme-select");
    if(!sel) return;
    const saved = localStorage.getItem(KEY) || "auto";
    sel.value = saved;
    applyTheme(saved);
    sel.addEventListener("change", () => {
      const v = sel.value;
      localStorage.setItem(KEY, v);
      applyTheme(v);
    });
  }

  document.addEventListener("DOMContentLoaded", initPicker);
})();
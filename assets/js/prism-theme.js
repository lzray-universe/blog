(function(){
  const THEMES = {
    "default-light": "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css",
    "coy": "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-coy.min.css",
    "solarizedlight": "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-solarizedlight.min.css",
    "okaidia": "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css",
    "tomorrow": "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
  };
  const KEY = "prismThemeChoice";
  function applyTheme(value){
    const link = document.getElementById("prism-theme-override");
    if(!link) return;
    if (value === "auto" || !THEMES[value]) {
      link.setAttribute("href", "");
      link.setAttribute("disabled", "disabled");
    } else {
      link.removeAttribute("disabled");
      link.setAttribute("href", THEMES[value]);
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
// Ensure line numbers and language labels are applied before Prism runs
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre > code').forEach(code => {
    const langClass = Array.from(code.classList).find(cls => cls.startsWith('language-'));
    if (langClass && code.parentElement) {
      const pre = code.parentElement;
      pre.dataset.lang = langClass.replace('language-', '');
      pre.classList.add(langClass, 'line-numbers');
    }
  });

  // Trigger Prism after classes are set so highlighting and line numbers render correctly
  if (window.Prism && typeof window.Prism.highlightAll === 'function') {
    window.Prism.highlightAll();
  }
});

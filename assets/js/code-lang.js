document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre > code').forEach(code => {
    const langClass = Array.from(code.classList).find(cls => cls.startsWith('language-'));
    if (langClass && code.parentElement) {
      const pre = code.parentElement;
      pre.dataset.lang = langClass.replace('language-', '');
      pre.classList.add(langClass, 'line-numbers');
    }
  });
});

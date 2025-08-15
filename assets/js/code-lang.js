document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre > code').forEach(code => {
    const langClass = Array.from(code.classList).find(cls => cls.startsWith('language-'));
    if (langClass && code.parentElement) {
      code.parentElement.dataset.lang = langClass.replace('language-', '');
    }
  });
});

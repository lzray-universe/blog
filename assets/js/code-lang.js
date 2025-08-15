document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.highlighter-rouge, .highlight').forEach(block => {
    let langClass = Array.from(block.classList).find(cls => cls.startsWith('language-'));
    if (!langClass) {
      const code = block.querySelector('code');
      if (code) {
        langClass = Array.from(code.classList).find(cls => cls.startsWith('language-'));
      }
    }
    if (langClass) {
      block.dataset.lang = langClass.replace('language-', '');
    }
  });
});

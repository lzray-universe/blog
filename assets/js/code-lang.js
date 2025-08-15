// Ensure line numbers and language labels are applied before Prism runs
document.addEventListener('DOMContentLoaded', () => {
  // Block code inside <pre>
  document.querySelectorAll('pre > code').forEach(code => {
    const langClass = Array.from(code.classList).find(cls => cls.startsWith('language-'));
    if (langClass && code.parentElement) {
      const pre = code.parentElement;
      pre.dataset.lang = langClass.replace('language-', '');
      pre.classList.add(langClass, 'line-numbers');
    }
  });

  // --- Inline code highlighting -------------------------------------------
  const guessInlineLang = (text) => {
    const t = text.trim();
    // Quick markers
    if (/^<!?DOCTYPE|<\/?[a-zA-Z]/.test(t)) return 'markup'; // HTML/XML-ish
    if (/^(SELECT|UPDATE|INSERT|DELETE|CREATE|DROP)\b/i.test(t)) return 'sql';
    if (/^#include|std::|int\s+main\s*\(/.test(t)) return 'cpp';
    if (/\b(def|import|from|lambda|print\()\b/.test(t)) return 'python';
    if (/\b(let|const|var|function|=>|console\.log|return|if|for|while)\b/.test(t)) return 'javascript';
    if (/^[\{\[][\s\S]*[\}\]]$/.test(t) && /[:,]/.test(t)) return 'json'; // very simple JSON-ish
    if (/(^|\s)(git|npm|pnpm|yarn|pip|python|node|cd|ls|cat|grep|curl|wget)(\s|$)/.test(t)) return 'bash';
    if (/\b([a-z-]+)\s*:\s*[^;]+;/.test(t)) return 'css'; // property: value;
    // Fallback: if it contains typical code punctuation, default to JS for some color
    if (/[(){};=+\-*/%<>|&]/.test(t)) return 'javascript';
    return null;
  };

  document.querySelectorAll(':not(pre) > code').forEach(code => {
    const classes = Array.from(code.classList);
    const hasRealLanguage = classes.some(cls => cls.startsWith('language-') && cls !== 'language-plaintext');
    if (hasRealLanguage) return;

    const txt = code.textContent || '';
    const lang = guessInlineLang(txt);
    if (lang) {
      // Clean up Rouge-related classes so Prism can take over
      code.classList.remove('highlighter-rouge');
      code.classList.remove('language-plaintext');
      code.classList.add('language-' + lang);
    }
  });

  // Configure autoloader path for cdnjs (extra safety)
  if (window.Prism && Prism.plugins && Prism.plugins.autoloader) {
    Prism.plugins.autoloader.languages_path = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/';
  }

  // Trigger Prism after classes are set so highlighting and line numbers render correctly
  if (window.Prism && typeof window.Prism.highlightAll === 'function') {
    window.Prism.highlightAll();
  } else if (window.Prism && typeof window.Prism.highlightElement === 'function') {
    document.querySelectorAll('code[class*="language-"]').forEach(el => Prism.highlightElement(el));
  }
});

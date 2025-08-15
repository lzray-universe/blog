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
  // Assign language classes to inline <code> (not inside <pre>).
  const guessInlineLang = (text) => {
    const t = text.trim();

    // Quick markers
    if (/^<!?DOCTYPE|<\/?[a-zA-Z]/.test(t)) return 'markup'; // HTML/XML
    if (/^(SELECT|UPDATE|INSERT|DELETE|CREATE|DROP)\b/i.test(t)) return 'sql';
    if (/^#include|std::|int\s+main\s*\(/.test(t)) return 'cpp';
    if (/(^|\s)(class|public|private|protected|new\s+[A-Z]|System\.out\.println)\b/.test(t)) return 'java';
    if (/\b(def|import|from|lambda|print\()/.test(t)) return 'python';
    if (/\b(let|const|var|function|=>|console\.log)\b/.test(t)) return 'javascript';
    if (/^[\{\[][\s\S]*[\}\]]$/.test(t) && /[:,]/.test(t)) return 'json'; // simple JSON-ish
    if (/(^|\s)(git|npm|pnpm|yarn|pip|python|node|cd|ls|cat|grep|curl|wget)(\s|$)/.test(t)) return 'bash';
    if (/\b([a-z-]+)\s*:\s*[^;]+;/.test(t)) return 'css'; // property: value;
    return 'clike'; // fallback for short/ambiguous snippets
  };

  document.querySelectorAll(':not(pre) > code').forEach(code => {
    // Skip if already has a Prism language
    if (Array.from(code.classList).some(cls => cls.startsWith('language-'))) return;

    const txt = code.textContent || '';
    const lang = guessInlineLang(txt);
    code.classList.add('language-' + lang);
  });

  // Trigger Prism after classes are set so highlighting and line numbers render correctly
  if (window.Prism && typeof window.Prism.highlightAll === 'function') {
    window.Prism.highlightAll();
  } else if (window.Prism && typeof window.Prism.highlightElement === 'function') {
    document.querySelectorAll('code[class*="language-"]').forEach(el => Prism.highlightElement(el));
  }
});

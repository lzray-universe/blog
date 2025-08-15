document.addEventListener('DOMContentLoaded', function () {
  const outline = document.getElementById('outline-panel');
  const content = document.getElementById('post-content');
  const btn = document.getElementById('floating-button');
  if (!outline || !content || !btn) return;

  const headings = content.querySelectorAll('h1, h2, h3');
  if (headings.length === 0) {
    outline.classList.add('hidden');
    btn.classList.add('hidden');
    return;
  }

  const ul = document.createElement('ul');
  headings.forEach(h => {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    }
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = h.textContent;
    a.href = '#' + h.id;
    li.appendChild(a);
    ul.appendChild(li);
  });
  outline.appendChild(ul);

  btn.addEventListener('click', function () {
    outline.classList.toggle('hidden');
  });
});

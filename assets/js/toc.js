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

  const root = document.createElement('ul');
  let currentLevel = 1;
  const stack = [root];

  headings.forEach(h => {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    }
    const level = parseInt(h.tagName[1]);
    while (level > currentLevel) {
      const newUl = document.createElement('ul');
      stack[stack.length - 1].lastElementChild.appendChild(newUl);
      stack.push(newUl);
      currentLevel++;
    }
    while (level < currentLevel) {
      stack.pop();
      currentLevel--;
    }
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = h.textContent;
    a.href = '#' + h.id;
    li.appendChild(a);
    stack[stack.length - 1].appendChild(li);
  });
  outline.appendChild(root);

  btn.addEventListener('click', function () {
    outline.classList.toggle('hidden');
  });
});

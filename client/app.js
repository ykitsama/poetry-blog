const API_URL = 'http://localhost:5000/api/poems';

async function fetchPoems() {
  const res = await fetch(API_URL);
  const poems = await res.json();
  displayPoems(poems);
}

function displayPoems(poems) {
  const container = document.getElementById('poems');
  container.innerHTML = '';
  poems.forEach(p => {
    const div = document.createElement('div');
    div.className = 'poem';
    div.innerHTML = `
      <h3>${p.title}</h3>
      <small>by ${p.author || 'Anonymous'} | Tags: ${p.tags.join(', ')}</small>
      ${p.imageUrl ? `<img src="${p.imageUrl}" alt="poem image">` : ""}
      <p>${p.content}</p>
    `;
    container.appendChild(div);
  });
}

document.getElementById('poem-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const content = document.getElementById('content').value;
  const tags = document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t);
  const imageUrl = document.getElementById('imageUrl').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, content, tags, imageUrl })
  });

  document.getElementById('poem-form').reset();
  fetchPoems();
});

// Initial load
fetchPoems();


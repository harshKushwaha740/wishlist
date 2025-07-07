// Load products from JSON and render on products.html
async function loadProducts() {
  const container = document.getElementById('product-list');
  if (!container) return;

  try {
    const response = await fetch('products.json');
    const products = await response.json();

    container.innerHTML = products.map(product => `
      <div class="product">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <a href="${product.affiliate_link}" target="_blank" class="button">Buy Now</a>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = '<p>Failed to load products.</p>';
    console.error(err);
  }
}

// Theme toggle and save preference in localStorage
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  loadProducts();

  const btn = document.getElementById('toggle-theme-btn');
  if (btn) btn.addEventListener('click', toggleTheme);
});

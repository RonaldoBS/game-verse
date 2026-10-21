// Gameverse - Catálogo Principal

// App State (PRODUCTS is loaded from products.js)
const cats = ["Todos", ...new Set(PRODUCTS.map(p => p.cat))];
let activeCat = "Todos";
let query = "";
let sortBy = "featured"; // "featured" | "price-asc" | "price-desc" | "rating"
let maxPrice = 4000;

// Cart State (Persisted in localStorage)
let cart = JSON.parse(localStorage.getItem('gv_cart') || '{}'); // { [productId]: quantity }

// Helpers
const fmt = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const $ = s => document.querySelector(s);
const escapeHtml = str => String(str).replace(/[&<>"']/g, m => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[m]));

const getInstallment = price => {
  const installments = price >= 1200 ? 10 : (price >= 300 ? 6 : 3);
  const val = price / installments;
  return `em até ${installments}x de ${fmt(val)} sem juros`;
};

// Debounce helper to optimize search input and slider events
function debounce(fn, delay = 200) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Render Categories Bar
function renderCats() {
  $('#cats').innerHTML = cats.map(c => `
    <button class="cat ${c === activeCat ? 'active' : ''}" data-cat="${escapeHtml(c)}" role="tab" aria-selected="${c === activeCat}">
      ${escapeHtml(c)}
    </button>
  `).join('');
}

// Render Catalog Grid with Filtering and Sorting
function render() {
  const q = query.trim().toLowerCase();

  // 1. Filter
  let list = PRODUCTS.filter(p => {
    const matchCat = activeCat === "Todos" || p.cat === activeCat;
    const matchQ = !q || [p.name, p.cat].join(' ').toLowerCase().includes(q);
    const matchPrice = p.price <= maxPrice;
    return matchCat && matchQ && matchPrice;
  });

  // 2. Sort
  if (sortBy === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    list.sort((a, b) => b.rating - a.rating || b.rev - a.rev);
  }

  // Update item counter
  const countEl = $('#catalogCount');
  if (countEl) {
    countEl.textContent = `${list.length} produto${list.length !== 1 ? 's' : ''}`;
  }

  $('#empty').style.display = list.length ? 'none' : 'block';

  // 3. Render
  $('#grid').innerHTML = list.map(p => {
    const tag = p.tag ? {
      hot: '<span class="tag hot">🔥 Em Alta</span>',
      sale: `<span class="tag sale">-${Math.round((1 - p.price / p.old) * 100)}%</span>`,
      new: '<span class="tag new">✨ Lançamento</span>'
    }[p.tag] : '';

    return `
    <article class="card" data-id="${p.id}" tabindex="0" role="link" style="cursor:pointer" title="Clique para ver detalhes de ${escapeHtml(p.name)}">
      <div class="thumb">
        <img src="${p.img}" alt="${escapeHtml(p.name)}" class="product-img" loading="lazy" onerror="this.src='assets/headset-gamer.jpg'">
        ${tag}
      </div>
      <div class="body">
        <div class="category">${escapeHtml(p.cat)}</div>
        <h3 class="name">${escapeHtml(p.name)}</h3>
        <div class="rating" aria-label="Avaliação: ${p.rating} de 5">★ ${p.rating} <span>(${p.rev.toLocaleString('pt-BR')})</span></div>
        <div class="price-row">
          <div>
            <div class="price">${fmt(p.price)}</div>
            ${p.old ? `<span class="old">${fmt(p.old)}</span>` : ''}
            <div class="installments">${getInstallment(p.price)}</div>
          </div>
        </div>
        <button class="add" data-id="${p.id}" aria-label="Adicionar ${escapeHtml(p.name)} ao carrinho">
          🛒 Adicionar
        </button>
      </div>
    </article>`;
  }).join('');
}

// Cart Logic
function addToCart(id, evt) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();

  const btn = evt.currentTarget;
  btn.classList.add('added');
  btn.textContent = '✓ Adicionado';
  setTimeout(() => {
    btn.classList.remove('added');
    btn.textContent = '🛒 Adicionar';
  }, 900);

  const product = PRODUCTS.find(p => p.id === id);
  showToast(`${product ? product.name : 'Produto'} adicionado ao carrinho!`);
}

function saveCart() {
  localStorage.setItem('gv_cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const ids = Object.keys(cart);
  const badge = $('#cartBadge');
  const totalQty = ids.reduce((s, id) => s + cart[id], 0);

  badge.textContent = totalQty;
  badge.classList.toggle('hidden', totalQty === 0);

  if (ids.length === 0) {
    $('#cartItems').innerHTML = `
      <div class="empty-cart">
        <span class="big">🛒</span>
        <p>Seu carrinho está vazio.</p>
        <small>Adicione produtos incríveis para começar!</small>
      </div>`;
    $('#total').textContent = fmt(0);
    return;
  }

  let total = 0;
  $('#cartItems').innerHTML = ids.map(id => {
    const p = PRODUCTS.find(x => x.id == id);
    if (!p) return '';
    total += p.price * cart[id];
    return `
    <div class="cart-item">
      <img src="${p.img}" alt="${escapeHtml(p.name)}" class="cart-thumb" loading="lazy">
      <div class="info">
        <div class="n">${escapeHtml(p.name)}</div>
        <div class="p">${fmt(p.price)}</div>
        <div class="qty">
          <button data-action="dec" data-id="${id}" aria-label="Diminuir quantidade">−</button>
          <span>${cart[id]}</span>
          <button data-action="inc" data-id="${id}" aria-label="Aumentar quantidade">+</button>
        </div>
      </div>
      <button class="rmv" data-action="remove" data-id="${id}" aria-label="Remover item">Remover</button>
    </div>`;
  }).join('');

  $('#total').textContent = fmt(total);
}

function changeQty(id, d) {
  cart[id] = (cart[id] || 0) + d;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
}

function removeItem(id) {
  delete cart[id];
  saveCart();
  showToast('Item removido do carrinho');
}

function toggleCart(open) {
  const drawer = $('#drawer');
  const overlay = $('#overlay');
  drawer.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';

  if (open) {
    $('#closeCart').focus();
  } else {
    $('#openCart').focus();
  }
}

function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 2200);
}

// Reset all filters to default state
function resetAllFilters() {
  activeCat = "Todos";
  query = "";
  sortBy = "featured";
  maxPrice = 4000;

  $('#search').value = "";
  $('#sortSelect').value = "featured";
  $('#priceRange').value = 4000;
  $('#priceVal').textContent = fmt(4000);

  renderCats();
  render();
  showToast('Filtros restaurados!');
}

// Event Listeners
$('#cats').addEventListener('click', e => {
  const btn = e.target.closest('.cat');
  if (!btn) return;
  activeCat = btn.dataset.cat;
  renderCats();
  render();
});

// Search input with debounce
$('#search').addEventListener('input', debounce(e => {
  query = e.target.value;
  render();
}, 200));

// Sort selector event
$('#sortSelect').addEventListener('change', e => {
  sortBy = e.target.value;
  render();
});

// Price range slider event
$('#priceRange').addEventListener('input', e => {
  maxPrice = Number(e.target.value);
  $('#priceVal').textContent = fmt(maxPrice);
  render();
});

// Reset filters button
const resetBtn = $('#resetFilters');
if (resetBtn) {
  resetBtn.addEventListener('click', resetAllFilters);
}

// Grid delegation: click card navigates to PDP, click add button adds to cart
$('#grid').addEventListener('click', e => {
  const btn = e.target.closest('.add');
  if (btn) {
    e.stopPropagation();
    addToCart(Number(btn.dataset.id), e);
    return;
  }
  const card = e.target.closest('.card');
  if (card && card.dataset.id) {
    window.location.href = `produto.html?id=${card.dataset.id}`;
  }
});

// Keyboard navigation (Enter key on card)
$('#grid').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const card = e.target.closest('.card');
    if (card && card.dataset.id && !e.target.classList.contains('add')) {
      window.location.href = `produto.html?id=${card.dataset.id}`;
    }
  }
});

// Cart item controls (inc, dec, remove)
$('#cartItems').addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const action = btn.dataset.action;
  if (action === 'inc') changeQty(id, 1);
  else if (action === 'dec') changeQty(id, -1);
  else if (action === 'remove') removeItem(id);
});

// Drawer toggling
$('#openCart').addEventListener('click', () => toggleCart(true));
$('#closeCart').addEventListener('click', () => toggleCart(false));
$('#overlay').addEventListener('click', () => toggleCart(false));

// Close drawer on ESC key
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && $('#drawer').classList.contains('open')) {
    toggleCart(false);
  }
});

// Checkout action
$('#checkout').addEventListener('click', () => {
  const totalQty = Object.values(cart).reduce((s, v) => s + v, 0);
  if (totalQty === 0) return showToast('Seu carrinho está vazio!');
  showToast('Compra finalizada com sucesso! 🎉 (demo)');
  cart = {};
  saveCart();
  toggleCart(false);
});

// Newsletter subscription
$('#newsForm').addEventListener('submit', e => {
  e.preventDefault();
  showToast('Obrigado! Você ganhou 10% de desconto. 🎁');
  e.target.reset();
});

// Check query param from URL (e.g. index.html?search=...)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('search')) {
  query = urlParams.get('search');
  $('#search').value = query;
}

// Initialize on load
renderCats();
render();
renderCart();

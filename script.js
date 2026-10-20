const PRODUCTS = [
  { id:1,  name:"Headset Gamer HyperX Cloud II",  cat:"Áudio",      price:499.90, old:699.90, emoji:"🎧", tag:"sale",  rating:4.8, rev:1240 },
  { id:2,  name:"Mouse Razer DeathAdder V3",      cat:"Periféricos",price:379.90, old:null,   emoji:"🖱️", tag:"hot",   rating:4.9, rev:890 },
  { id:3,  name:"Teclado Mecânico Redragon K552", cat:"Periféricos",price:249.90, old:329.90, emoji:"⌨️", tag:"sale",  rating:4.7, rev:1560 },
  { id:4,  name:"Monitor LG UltraGear 27\" 165Hz",cat:"Monitores",  price:1499.90,old:1799.90,emoji:"🖥️", tag:"hot",   rating:4.9, rev:320 },
  { id:5,  name:"Placa de Vídeo RTX 4070",         cat:"Hardware",   price:3899.90,old:null,   emoji:"🎮", tag:"hot",   rating:4.9, rev:210 },
  { id:6,  name:"Cadeira Gamer ThunderX3",         cat:"Móveis",     price:1199.90,old:1499.90,emoji:"🪑", tag:"new",   rating:4.6, rev:540 },
  { id:7,  name:"Mousepad XL Speed Surface",       cat:"Periféricos",price:89.90,  old:null,   emoji:"🟪", tag:null,   rating:4.5, rev:980 },
  { id:8,  name:"Controle DualSense PS5",          cat:"Consoles",   price:449.90, old:529.90, emoji:"🎮", tag:"sale",  rating:4.9, rev:1720 },
  { id:9,  name:"Webcam Logitech C920",            cat:"Streaming",  price:379.90, old:null,   emoji:"📷", tag:"new",   rating:4.7, rev:650 },
  { id:10, name:"Microfone HyperX QuadCast",       cat:"Streaming",  price:649.90, old:799.90, emoji:"🎙️", tag:"hot",   rating:4.8, rev:430 },
  { id:11, name:"SSD NVMe 1TB Samsung 980",        cat:"Hardware",   price:549.90, old:699.90, emoji:"💾", tag:"sale",  rating:4.9, rev:760 },
  { id:12, name:"Caixa de Som Gamer Redragon",     cat:"Áudio",      price:199.90, old:null,   emoji:"🔊", tag:"new",   rating:4.4, rev:310 },
];

const cats = ["Todos", ...new Set(PRODUCTS.map(p => p.cat))];
let activeCat = "Todos";
let query = "";

// ---- cart state ----
let cart = JSON.parse(localStorage.getItem('gv_cart') || '{}'); // {id: qty}

const fmt = v => v.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
const $ = s => document.querySelector(s);

function renderCats(){
  $('#cats').innerHTML = cats.map(c =>
    `<button class="cat ${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`
  ).join('');
}

function render(){
  const list = PRODUCTS.filter(p => {
    const matchCat = activeCat === "Todos" || p.cat === activeCat;
    const q = query.toLowerCase();
    const matchQ = !q || [p.name, p.cat].join(' ').toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  $('#empty').style.display = list.length ? 'none' : 'block';
  $('#grid').innerHTML = list.map(p => {
    const tag = p.tag ? {
      hot:'<span class="tag hot">🔥 Hot</span>',
      sale:'<span class="tag sale">-'+ Math.round((1 - p.price/p.old)*100) +'%</span>',
      new:'<span class="tag new">✨ Novo</span>'
    }[p.tag] : '';
    return `
    <div class="card">
      <div class="thumb" style="background:linear-gradient(135deg,rgba(124,77,255,.18),rgba(0,229,255,.10))">${p.emoji}${tag}</div>
      <div class="body">
        <div class="category">${p.cat}</div>
        <div class="name">${p.name}</div>
        <div class="rating">★ ${p.rating}<span>(${p.rev})</span></div>
        <div class="price-row">
          <span class="price">${fmt(p.price)}</span>
          ${p.old ? `<span class="old">${fmt(p.old)}</span>` : ''}
        </div>
        <button class="add" data-id="${p.id}">🛒 Adicionar</button>
      </div>
    </div>`;
  }).join('');
}

function addToCart(id, evt){
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  // visual feedback
  const btn = evt.currentTarget;
  btn.classList.add('added'); btn.textContent = '✓ Adicionado';
  setTimeout(() => { btn.classList.remove('added'); btn.textContent = '🛒 Adicionar'; }, 900);
  showToast('Produto adicionado ao carrinho!');
}

function saveCart(){
  localStorage.setItem('gv_cart', JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  const ids = Object.keys(cart);
  const badge = $('#cartBadge');
  const totalQty = ids.reduce((s,id)=>s+cart[id],0);
  badge.textContent = totalQty;
  badge.classList.toggle('hidden', totalQty === 0);

  if(ids.length === 0){
    $('#cartItems').innerHTML = `<div class="empty"><span class="big">🛒</span><p>Seu carrinho está vazio.</p></div>`;
    $('#total').textContent = fmt(0);
    return;
  }

  let total = 0;
  $('#cartItems').innerHTML = ids.map(id => {
    const p = PRODUCTS.find(x => x.id == id);
    if(!p) return '';
    total += p.price * cart[id];
    return `
    <div class="cart-item">
      <div class="emo">${p.emoji}</div>
      <div class="info">
        <div class="n">${p.name}</div>
        <div class="p">${fmt(p.price)}</div>
        <div class="qty">
          <button data-action="dec" data-id="${id}">−</button>
          <span>${cart[id]}</span>
          <button data-action="inc" data-id="${id}">+</button>
        </div>
      </div>
      <button class="rmv" data-action="remove" data-id="${id}">Remover</button>
    </div>`;
  }).join('');
  $('#total').textContent = fmt(total);
}

function changeQty(id, d){
  cart[id] = (cart[id] || 0) + d;
  if(cart[id] <= 0) delete cart[id];
  saveCart();
}
function removeItem(id){ delete cart[id]; saveCart(); }

function toggleCart(open){
  $('#drawer').classList.toggle('open', open);
  $('#overlay').classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function showToast(msg){
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>t.classList.remove('show'), 2000);
}

// ---- events ----
$('#cats').addEventListener('click', e=>{
  const btn = e.target.closest('.cat'); if(!btn) return;
  activeCat = btn.dataset.cat;
  renderCats(); render();
});

$('#search').addEventListener('input', e=>{ query = e.target.value; render(); });

// Delegate "add to cart" buttons on the product grid
$('#grid').addEventListener('click', e=>{
  const btn = e.target.closest('.add'); if(!btn) return;
  addToCart(Number(btn.dataset.id), e);
});

// Delegate qty +/- and remove actions inside the cart
$('#cartItems').addEventListener('click', e=>{
  const btn = e.target.closest('[data-action]'); if(!btn) return;
  const id = Number(btn.dataset.id);
  const action = btn.dataset.action;
  if(action === 'inc') changeQty(id, 1);
  else if(action === 'dec') changeQty(id, -1);
  else if(action === 'remove') removeItem(id);
});

$('#openCart').addEventListener('click', ()=>toggleCart(true));
$('#closeCart').addEventListener('click', ()=>toggleCart(false));
$('#overlay').addEventListener('click', ()=>toggleCart(false));

$('#checkout').addEventListener('click', ()=>{
  const totalQty = Object.values(cart).reduce((s,v)=>s+v,0);
  if(totalQty === 0) return showToast('Seu carrinho está vazio!');
  showToast('Compra finalizada com sucesso! 🎉 (demo)');
  cart = {}; saveCart(); toggleCart(false);
});

$('#newsForm').addEventListener('submit', e=>{
  e.preventDefault();
  showToast('Obrigado! Você ganhou 10% de desconto. 🎁');
  e.target.reset();
});

// init
renderCats();
render();
renderCart();

// Gameverse - Página de Detalhes do Produto (PDP)

// Helpers de formatação e DOM
const fmt = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const escapeHtml = str => String(str).replace(/[&<>"']/g, m => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[m]));

// Parse URL Product ID
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get('id')) || 1;
const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

// Cart State (Persisted)
let cart = JSON.parse(localStorage.getItem('gv_cart') || '{}');
let selectedQty = 1;

// Set document title & breadcrumbs
document.title = `${product.name} • GAMEVERSE`;
const bcCat = $('#bcCategory');
const bcNm = $('#bcName');
if (bcCat) bcCat.textContent = product.cat;
if (bcNm) bcNm.textContent = product.name;

// Render Main Product Hero
function renderProductHero() {
  const currentTotal = product.price * selectedQty;
  const pixPrice = currentTotal * 0.90;
  const installments = currentTotal >= 1200 ? 10 : (currentTotal >= 300 ? 6 : 3);
  const installmentVal = currentTotal / installments;

  const tagHtml = product.tag ? {
    hot: '<span class="tag hot">🔥 Em Alta</span>',
    sale: `<span class="tag sale">-${Math.round((1 - product.price / product.old) * 100)}%</span>`,
    new: '<span class="tag new">✨ Lançamento</span>'
  }[product.tag] : '';

  $('#pdpHero').innerHTML = `
    <div class="pdp-gallery">
      <div class="pdp-main-img-box">
        ${tagHtml}
        <img src="${product.img}" alt="${escapeHtml(product.name)}" id="pdpMainImg" class="pdp-main-img" onerror="this.src='assets/headset-gamer.jpg'">
      </div>
      <div class="pdp-trust-badges">
        <div class="trust-item">
          <span class="icon">🛡️</span>
          <div>
            <strong>Garantia Oficial</strong>
            <p>12 meses de cobertura total do fabricante</p>
          </div>
        </div>
        <div class="trust-item">
          <span class="icon">⚡</span>
          <div>
            <strong>Envio Imediato</strong>
            <p>Postagem em até 24h úteis com rastreio</p>
          </div>
        </div>
        <div class="trust-item">
          <span class="icon">📦</span>
          <div>
            <strong>100% Original</strong>
            <p>Produto lacrado com Nota Fiscal Eletrônica</p>
          </div>
        </div>
      </div>
    </div>

    <div class="pdp-info">
      <div class="pdp-cat-label">${escapeHtml(product.cat)}</div>
      <h1 class="pdp-title">${escapeHtml(product.name)}</h1>
      
      <div class="pdp-rating-row">
        <div class="stars">★★★★★</div>
        <span class="score">${product.rating}</span>
        <button class="reviews-link" id="jumpToReviews">(${product.rev.toLocaleString('pt-BR')} avaliações verificadas)</button>
        <span class="stock-badge">✓ Em Estoque</span>
      </div>

      <div class="pdp-price-card">
        <div class="pix-row">
          <span class="pix-price" id="pdpPixPrice">${fmt(pixPrice)}</span>
          <span class="pix-badge">10% OFF no Pix</span>
        </div>
        <div class="regular-price-row">
          <span class="regular-price" id="pdpRegularPrice">${fmt(currentTotal)}</span>
          ${product.old ? `<span class="old-price" id="pdpOldPrice">${fmt(product.old * selectedQty)}</span>` : ''}
          <span class="card-terms" id="pdpInstallments">em até <strong>${installments}x de ${fmt(installmentVal)}</strong> sem juros</span>
        </div>
      </div>

      <p class="pdp-short-desc">${escapeHtml(product.shortDesc || product.description.slice(0, 160) + '...')}</p>

      <!-- Purchase Controls -->
      <div class="pdp-actions">
        <div class="qty-selector">
          <button id="qtyDec" aria-label="Diminuir quantidade">−</button>
          <span id="qtyVal">1</span>
          <button id="qtyInc" aria-label="Aumentar quantidade">+</button>
        </div>
        <button class="btn-buy-now" id="buyNowBtn">⚡ Comprar Agora</button>
        <button class="btn-add-cart" id="addToCartBtn">🛒 Adicionar ao Carrinho</button>
      </div>

      <!-- Shipping Simulator -->
      <div class="pdp-shipping">
        <div class="shipping-head">
          <span class="icon">🚚</span>
          <strong>Calcular frete e prazo de entrega</strong>
        </div>
        <div class="shipping-form">
          <input type="text" id="cepInput" placeholder="00000-000" maxlength="9" aria-label="Digite seu CEP">
          <button id="calcShippingBtn">Calcular</button>
        </div>
        <div id="shippingResult" class="shipping-result" style="display:none"></div>
      </div>
    </div>
  `;

  setupHeroEvents();
}

// Atualização dinâmica dos preços ao alterar quantidade
function updateDynamicPrices() {
  const currentTotal = product.price * selectedQty;
  const pixPrice = currentTotal * 0.90;
  const installments = currentTotal >= 1200 ? 10 : (currentTotal >= 300 ? 6 : 3);
  const installmentVal = currentTotal / installments;

  const pixEl = $('#pdpPixPrice');
  const regEl = $('#pdpRegularPrice');
  const oldEl = $('#pdpOldPrice');
  const instEl = $('#pdpInstallments');

  if (pixEl) {
    pixEl.textContent = fmt(pixPrice);
    pixEl.classList.remove('price-pulse');
    void pixEl.offsetWidth; // Trigger reflow for restart animation
    pixEl.classList.add('price-pulse');
  }

  if (regEl) {
    regEl.textContent = fmt(currentTotal);
    regEl.classList.remove('price-pulse');
    void regEl.offsetWidth;
    regEl.classList.add('price-pulse');
  }

  if (oldEl && product.old) {
    oldEl.textContent = fmt(product.old * selectedQty);
  }

  if (instEl) {
    instEl.innerHTML = `em até <strong>${installments}x de ${fmt(installmentVal)}</strong> sem juros`;
  }

  // Mantém sincronizada também a aba "Formas de Pagamento"
  renderPayment();
}

function setupHeroEvents() {
  // Quantity buttons
  $('#qtyDec').addEventListener('click', () => {
    if (selectedQty > 1) {
      selectedQty--;
      $('#qtyVal').textContent = selectedQty;
      updateDynamicPrices();
    }
  });

  $('#qtyInc').addEventListener('click', () => {
    if (selectedQty < 10) {
      selectedQty++;
      $('#qtyVal').textContent = selectedQty;
      updateDynamicPrices();
    }
  });

  // Add to cart button
  $('#addToCartBtn').addEventListener('click', () => {
    cart[product.id] = (cart[product.id] || 0) + selectedQty;
    saveCart();
    
    const btn = $('#addToCartBtn');
    btn.textContent = '✓ Adicionado!';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = '🛒 Adicionar ao Carrinho';
      btn.classList.remove('added');
    }, 1200);

    showToast(`${selectedQty}x ${product.name} adicionado ao carrinho!`);
  });

  // Buy now button
  $('#buyNowBtn').addEventListener('click', () => {
    cart[product.id] = (cart[product.id] || 0) + selectedQty;
    saveCart();
    toggleCart(true);
  });

  // Jump to reviews tab
  $('#jumpToReviews').addEventListener('click', () => {
    switchTab('reviews');
    $('.pdp-details-section').scrollIntoView({ behavior: 'smooth' });
  });

  // Shipping calculator simulation
  $('#calcShippingBtn').addEventListener('click', calculateShipping);
  $('#cepInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') calculateShipping();
  });
}

function calculateShipping() {
  const cep = $('#cepInput').value.replace(/\D/g, '');
  const res = $('#shippingResult');

  if (cep.length !== 8) {
    res.style.display = 'block';
    res.innerHTML = `<span class="err">⚠️ Digite um CEP válido com 8 dígitos.</span>`;
    return;
  }

  const currentTotal = product.price * selectedQty;
  const freeShipping = currentTotal >= 250;
  res.style.display = 'block';
  res.innerHTML = `
    <div class="shipping-option">
      <div>
        <strong>Gameverse Express ⚡</strong>
        <span>Receba em até 1 a 2 dias úteis</span>
      </div>
      <span class="price">R$ 14,90</span>
    </div>
    <div class="shipping-option">
      <div>
        <strong>Sedex Correios 📦</strong>
        <span>Receba em até 2 a 3 dias úteis</span>
      </div>
      <span class="price">R$ 22,50</span>
    </div>
    <div class="shipping-option">
      <div>
        <strong>PAC Econômico 🚚</strong>
        <span>Receba em 4 a 6 dias úteis</span>
      </div>
      <span class="price ${freeShipping ? 'free' : ''}">${freeShipping ? 'GRÁTIS' : 'R$ 9,90'}</span>
    </div>
  `;
}

// Render Tab 1: Description
function renderDescription() {
  $('#descContent').innerHTML = `
    <div class="desc-box">
      <h3>Sobre o ${escapeHtml(product.name)}</h3>
      <p class="desc-paragraph">${escapeHtml(product.description)}</p>
      
      <div class="desc-features-grid">
        <div class="feature-card">
          <span class="feature-icon">⚡</span>
          <h4>Alta Performance Gamer</h4>
          <p>Componentes de grau de competição ajustados para tempo de resposta ultrarrápido e precisão milimétrica.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">🛡️</span>
          <h4>Durabilidade Reforçada</h4>
          <p>Materiais premium selecionados para resistir ao desgaste do uso diário intenso e de maratonas.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">🎮</span>
          <h4>Plug & Play Universal</h4>
          <p>Pronto para usar de fábrica com máxima compatibilidade entre plataformas e softwares modernos.</p>
        </div>
      </div>
    </div>
  `;
}

// Render Tab 2: Technical Specs
function renderSpecs() {
  const specs = product.specs || {};
  const entries = Object.entries(specs);

  if (entries.length === 0) {
    $('#specsContent').innerHTML = `<p class="empty-text">Especificações técnicas completas disponíveis no manual do fabricante.</p>`;
    return;
  }

  $('#specsContent').innerHTML = `
    <div class="specs-wrap">
      <h3>Ficha Técnica & Detalhes Técnicos</h3>
      <table class="specs-table">
        <tbody>
          ${entries.map(([key, val], idx) => `
            <tr class="${idx % 2 === 0 ? 'even' : 'odd'}">
              <th>${escapeHtml(key)}</th>
              <td>${escapeHtml(val)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// Render Tab 3: Payment Methods (dinâmico com selectedQty)
function renderPayment() {
  const currentTotal = product.price * selectedQty;
  const pixPrice = currentTotal * 0.90;
  const maxInterestFree = currentTotal >= 1200 ? 10 : (currentTotal >= 300 ? 6 : 3);
  
  let installmentsRows = '';
  for (let i = 1; i <= 10; i++) {
    const val = currentTotal / i;
    installmentsRows += `
      <div class="inst-row">
        <span>${i}x de ${fmt(val)}</span>
        <span class="highlight">${i <= maxInterestFree ? 'sem juros' : 'sem juros'}</span>
      </div>
    `;
  }

  const paymentEl = $('#paymentContent');
  if (!paymentEl) return;

  paymentEl.innerHTML = `
    <div class="payment-grid">
      <!-- Pix Card -->
      <div class="payment-card highlight-card">
        <div class="p-card-head">
          <span class="badge-pix">⚡ PIX (${selectedQty}x item${selectedQty > 1 ? 's' : ''})</span>
          <span class="discount-pill">10% DE DESCONTO</span>
        </div>
        <div class="p-card-price">${fmt(pixPrice)}</div>
        <ul class="p-card-benefits">
          <li>✓ Aprovação imediata do pedido</li>
          <li>✓ Separação prioritária no centro de distribuição</li>
          <li>✓ Economia de ${fmt(currentTotal * 0.10)} no pagamento instantâneo</li>
        </ul>
      </div>

      <!-- Credit Card -->
      <div class="payment-card">
        <div class="p-card-head">
          <strong>💳 Cartão de Crédito</strong>
        </div>
        <div class="p-card-price">${fmt(currentTotal)}</div>
        <p class="p-card-sub">Aceitamos as principais bandeiras:</p>
        <div class="card-flags">
          <span>Visa</span> • <span>Mastercard</span> • <span>Elo</span> • <span>Hipercard</span> • <span>Amex</span>
        </div>
        <div class="installments-box">
          ${installmentsRows}
        </div>
      </div>

      <!-- Boleto Card -->
      <div class="payment-card">
        <div class="p-card-head">
          <strong>📄 Boleto Bancário</strong>
        </div>
        <div class="p-card-price">${fmt(currentTotal)}</div>
        <ul class="p-card-benefits">
          <li>✓ Pagamento à vista em qualquer banco ou lotérica</li>
          <li>✓ Vencimento em até 3 dias úteis</li>
          <li>✓ Compensação bancária em até 48h úteis</li>
        </ul>
      </div>
    </div>
  `;
}

// Render Tab 4: Customer Reviews & Form Refatorado
function renderReviews() {
  const reviews = product.reviews || [];
  
  $('#reviewsContent').innerHTML = `
    <div class="reviews-wrap">
      <div class="reviews-summary-card">
        <div class="summary-score-box">
          <div class="big-score">${product.rating}</div>
          <div class="stars-gold">★★★★★</div>
          <span class="total-revs">${product.rev.toLocaleString('pt-BR')} avaliações</span>
        </div>
        <div class="summary-bars">
          <div class="bar-row"><span>5 estrelas</span><div class="bar"><div class="fill" style="width:84%"></div></div><span>84%</span></div>
          <div class="bar-row"><span>4 estrelas</span><div class="bar"><div class="fill" style="width:12%"></div></div><span>12%</span></div>
          <div class="bar-row"><span>3 estrelas</span><div class="bar"><div class="fill" style="width:3%"></div></div><span>3%</span></div>
          <div class="bar-row"><span>2 estrelas</span><div class="bar"><div class="fill" style="width:1%"></div></div><span>1%</span></div>
          <div class="bar-row"><span>1 estrela</span><div class="bar"><div class="fill" style="width:0%"></div></div><span>0%</span></div>
        </div>
        <div class="summary-action">
          <button class="btn-write-review" id="toggleReviewFormBtn">✍️ Escrever Avaliação</button>
        </div>
      </div>

      <!-- Review Form: Ordem Nome -> Título -> Detalhes da Avaliação -->
      <form class="new-review-form" id="newReviewForm" style="display:none">
        <div class="form-title-row">
          <h4>Escrever Avaliação para ${escapeHtml(product.name)}</h4>
          <span class="form-badge">Opinião Verificada</span>
        </div>

        <!-- 1. Nome -->
        <div class="form-group">
          <label for="revAuthor" class="form-label">
            <span>Nome</span>
            <small class="label-hint">Seu nome ou apelido público</small>
          </label>
          <input type="text" id="revAuthor" class="form-field-input" placeholder="Digite seu nome..." maxlength="80" required>
        </div>

        <!-- 2. Título -->
        <div class="form-group">
          <label for="revTitle" class="form-label">
            <span>Título</span>
            <small class="label-hint">Dê um resumo da sua experiência</small>
          </label>
          <input type="text" id="revTitle" class="form-field-input" placeholder="Ex: Produto excelente, superou as expectativas!" maxlength="120" required>
        </div>

        <!-- 3. Detalhes da Avaliação -->
        <div class="form-group">
          <label for="revComment" class="form-label">
            <span>Detalhes da Avaliação</span>
            <span class="char-count-pill" id="charCountPill"><span id="charCount">0</span> / 1000 caracteres</span>
          </label>
          <textarea id="revComment" class="form-field-input form-field-textarea" placeholder="Conte os detalhes da sua experiência com o produto..." maxlength="1000" rows="3" required></textarea>
        </div>

        <!-- Classificação por Estrelas -->
        <div class="form-group rating-picker-group">
          <label class="form-label">
            <span>Sua Nota</span>
            <span class="rating-label-text" id="ratingLabelText">5 estrelas (Excelente)</span>
          </label>
          <div class="star-picker" id="starPicker">
            <button type="button" class="star-btn active" data-val="1" aria-label="1 estrela">★</button>
            <button type="button" class="star-btn active" data-val="2" aria-label="2 estrelas">★</button>
            <button type="button" class="star-btn active" data-val="3" aria-label="3 estrelas">★</button>
            <button type="button" class="star-btn active" data-val="4" aria-label="4 estrelas">★</button>
            <button type="button" class="star-btn active" data-val="5" aria-label="5 estrelas">★</button>
          </div>
          <input type="hidden" id="revStars" value="5">
        </div>

        <!-- Ações do Formulário -->
        <div class="form-actions">
          <button type="submit" class="btn-submit-rev">🚀 Publicar Avaliação</button>
          <button type="button" class="btn-cancel-rev" id="cancelReviewBtn">Cancelar</button>
        </div>
      </form>

      <!-- Customer Reviews List -->
      <div class="reviews-list" id="reviewsList">
        ${reviews.map(r => `
          <div class="review-card">
            <div class="rev-header">
              <div>
                <strong>${escapeHtml(r.author)}</strong>
                <span class="verified-badge">✓ Comprador Verificado</span>
              </div>
              <span class="rev-date">${r.date}</span>
            </div>
            <div class="rev-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
            <h4 class="rev-title">${escapeHtml(r.title)}</h4>
            <p class="rev-comment">${escapeHtml(r.comment)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  setupReviewForm();
}

function setupReviewForm() {
  const commentInput = $('#revComment');
  const charCount = $('#charCount');
  const charPill = $('#charCountPill');

  // Adaptação dinâmica de altura do textarea conforme digitação e contador até 1000 caracteres
  if (commentInput) {
    const adjustHeight = () => {
      commentInput.style.height = 'auto';
      // Ajusta dinamicamente para o scrollHeight mantendo o limite mínimo
      commentInput.style.height = Math.max(85, commentInput.scrollHeight) + 'px';

      const len = commentInput.value.length;
      if (charCount) charCount.textContent = len;
      if (charPill) {
        charPill.classList.toggle('near-limit', len >= 900 && len < 990);
        charPill.classList.toggle('at-limit', len >= 990);
      }
    };

    commentInput.addEventListener('input', adjustHeight);
  }

  // Seletor interativo de estrelas
  const starBtns = $$('.star-btn');
  const starsInput = $('#revStars');
  const ratingLabel = $('#ratingLabelText');
  const starLabels = {
    1: '1 estrela (Ruim)',
    2: '2 estrelas (Regular)',
    3: '3 estrelas (Bom)',
    4: '4 estrelas (Muito bom)',
    5: '5 estrelas (Excelente)'
  };

  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = Number(btn.dataset.val);
      if (starsInput) starsInput.value = val;
      starBtns.forEach(b => {
        b.classList.toggle('active', Number(b.dataset.val) <= val);
      });
      if (ratingLabel) {
        ratingLabel.textContent = starLabels[val] || `${val} estrelas`;
      }
    });
  });

  // Toggle abrir/fechar formulário
  const toggleBtn = $('#toggleReviewFormBtn');
  const form = $('#newReviewForm');
  const cancelBtn = $('#cancelReviewBtn');

  if (toggleBtn && form) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = form.style.display === 'none' || !form.style.display;
      form.style.display = isHidden ? 'flex' : 'none';
      if (isHidden) {
        form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        $('#revAuthor')?.focus();
      }
    });
  }

  if (cancelBtn && form) {
    cancelBtn.addEventListener('click', () => {
      form.style.display = 'none';
    });
  }

  // Envio de nova avaliação
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const author = $('#revAuthor').value.trim();
      const title = $('#revTitle').value.trim();
      const comment = $('#revComment').value.trim();
      const rating = Number($('#revStars')?.value) || 5;

      if (!author || !title || !comment) {
        showToast('Por favor, preencha todos os campos da avaliação.');
        return;
      }

      if (!product.reviews) product.reviews = [];
      product.reviews.unshift({
        author,
        rating,
        title,
        comment,
        date: new Date().toLocaleDateString('pt-BR')
      });

      product.rev = (product.rev || 0) + 1;

      showToast('Obrigado! Sua avaliação foi publicada com sucesso.');
      renderReviews();
    });
  }
}

// Render Tab Related Products
function renderRelated() {
  const related = PRODUCTS.filter(p => p.id !== product.id && (p.cat === product.cat || Math.random() > 0.5)).slice(0, 4);
  
  $('#relatedGrid').innerHTML = related.map(p => `
    <article class="card" data-id="${p.id}" tabindex="0" role="link">
      <div class="thumb">
        <img src="${p.img}" alt="${escapeHtml(p.name)}" class="product-img" loading="lazy">
      </div>
      <div class="body">
        <div class="category">${escapeHtml(p.cat)}</div>
        <h3 class="name">${escapeHtml(p.name)}</h3>
        <div class="rating">★ ${p.rating} <span>(${p.rev})</span></div>
        <div class="price-row">
          <span class="price">${fmt(p.price)}</span>
        </div>
        <button class="add" data-id="${p.id}">🛒 Adicionar</button>
      </div>
    </article>
  `).join('');

  $('#relatedGrid').addEventListener('click', e => {
    const btn = e.target.closest('.add');
    if (btn) {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      cart[id] = (cart[id] || 0) + 1;
      saveCart();
      btn.textContent = '✓ Adicionado';
      setTimeout(() => btn.textContent = '🛒 Adicionar', 900);
      showToast('Produto adicionado ao carrinho!');
      return;
    }
    const card = e.target.closest('.card');
    if (card && card.dataset.id) {
      window.location.href = `produto.html?id=${card.dataset.id}`;
    }
  });
}

// Tab Switching
function switchTab(tabKey) {
  $$('.pdp-tab').forEach(b => {
    const active = b.dataset.tab === tabKey;
    b.classList.toggle('active', active);
    b.setAttribute('aria-selected', active);
  });
  $$('.pdp-tab-panel').forEach(p => {
    p.classList.toggle('active', p.id === `tab-${tabKey}`);
  });
}

$$('.pdp-tab').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Cart Drawer Handlers
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
  $('#drawer').classList.toggle('open', open);
  $('#overlay').classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 2200);
}

// Search bar navigation
$('#pdpSearch').addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const q = encodeURIComponent(e.target.value.trim());
    window.location.href = `index.html?search=${q}`;
  }
});

// Cart Controls
$('#openCart').addEventListener('click', () => toggleCart(true));
$('#closeCart').addEventListener('click', () => toggleCart(false));
$('#overlay').addEventListener('click', () => toggleCart(false));

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && $('#drawer').classList.contains('open')) {
    toggleCart(false);
  }
});

$('#cartItems').addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const action = btn.dataset.action;
  if (action === 'inc') changeQty(id, 1);
  else if (action === 'dec') changeQty(id, -1);
  else if (action === 'remove') removeItem(id);
});

$('#checkout').addEventListener('click', () => {
  const totalQty = Object.values(cart).reduce((s, v) => s + v, 0);
  if (totalQty === 0) return showToast('Seu carrinho está vazio!');
  showToast('Compra finalizada com sucesso! 🎉 (demo)');
  cart = {};
  saveCart();
  toggleCart(false);
});

// Initialize PDP
renderProductHero();
renderDescription();
renderSpecs();
renderPayment();
renderReviews();
renderRelated();
renderCart();

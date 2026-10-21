// Gameverse - Menu Lateral & Cadastro de Clientes
(function () {
  'use strict';

  // Helpers
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => ctx.querySelectorAll(s);
  const escapeHtml = str => String(str || '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));

  // Máscaras de formatação
  function maskCpf(val) {
    return val
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function maskPhone(val) {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }

  function maskEmail(email) {
    if (!email || !email.includes('@')) return email;
    const [user, domain] = email.split('@');
    const maskedUser = user.length > 2 ? user.slice(0, 2) + '***' : user + '***';
    return `${maskedUser}@${domain}`;
  }

  function maskCpfDisplay(cpf) {
    const d = cpf.replace(/\D/g, '');
    if (d.length !== 11) return cpf;
    return `***.***.${d.slice(6, 9)}-${d.slice(9, 11)}`;
  }

  // Toast centralizado
  function showToast(msg) {
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove('show'), 2400);
  }

  // Estado do Usuário no localStorage
  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('gv_user') || 'null');
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem('gv_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gv_user');
    }
    updateUserTriggerBadge();
    renderMenuBody();
  }

  function getAllRegisteredUsers() {
    try {
      return JSON.parse(localStorage.getItem('gv_users_db') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveRegisteredUser(user) {
    const users = getAllRegisteredUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem('gv_users_db', JSON.stringify(users));
  }

  // Alterna o Menu Lateral
  function toggleMenu(open) {
    const drawer = $('#menuDrawer');
    const overlay = $('#overlay');
    if (!drawer) return;

    // Se estiver abrindo o menu, fecha o carrinho se estiver aberto
    if (open) {
      const cartDrawer = $('#drawer');
      if (cartDrawer && cartDrawer.classList.contains('open')) {
        cartDrawer.classList.remove('open');
      }
    }

    drawer.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      renderMenuBody();
    }
  }

  // Atualiza badge visual no botão do menu lateral
  function updateUserTriggerBadge() {
    const btn = $('#openMenu');
    if (!btn) return;
    const user = getCurrentUser();
    btn.classList.toggle('logged-in', !!user);
    if (user) {
      btn.setAttribute('title', `Menu Gameverse: Logado como ${user.name}`);
    } else {
      btn.setAttribute('title', 'Menu Gameverse: Cadastre-se ou Acesse');
    }
  }

  // Renderiza o corpo do menu lateral (Cadastro vs Perfil)
  let activeTab = 'register'; // 'register' | 'login'

  function renderMenuBody() {
    const container = $('#menuDrawerBody');
    if (!container) return;

    const user = getCurrentUser();

    if (user) {
      renderUserProfile(container, user);
    } else {
      renderAuthForms(container);
    }
  }

  // Renderiza tela de perfil quando o cliente já é cadastrado
  function renderUserProfile(container, user) {
    const initials = user.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(p => p[0].toUpperCase())
      .join('') || 'GV';

    container.innerHTML = `
      <div class="user-profile-view">
        <!-- Header do Usuário -->
        <div class="profile-hero-card">
          <div class="profile-avatar-box">
            <div class="profile-avatar">${initials}</div>
            <span class="online-indicator" title="Sessão Ativa"></span>
          </div>
          <div class="profile-meta">
            <span class="user-rank-badge">⚡ VIP GAMER LEVEL 1</span>
            <h4 class="user-display-name">${escapeHtml(user.name)}</h4>
            <span class="user-email-text">${escapeHtml(maskEmail(user.email))}</span>
          </div>
        </div>

        <!-- Cupom Exclusivo de Boas-Vindas -->
        <div class="profile-coupon-box">
          <div class="coupon-tag">🎁 SEU CUPOM DE BOAS-VINDAS</div>
          <div class="coupon-code-row">
            <code class="coupon-code" id="userCouponCode">GAMEVIP10</code>
            <button class="btn-copy-coupon" id="btnCopyCoupon" title="Copiar código">Copiar</button>
          </div>
          <small class="coupon-desc">10% de desconto adicional na sua próxima compra!</small>
        </div>

        <!-- Informações Cadastrais Resumidas -->
        <div class="profile-info-section">
          <div class="info-item">
            <span class="info-icon">🆔</span>
            <div>
              <strong>CPF Cadastrado</strong>
              <p>${escapeHtml(maskCpfDisplay(user.cpf || 'Não informado'))}</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📱</span>
            <div>
              <strong>WhatsApp / Telefone</strong>
              <p>${escapeHtml(user.phone || 'Não informado')}</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📅</span>
            <div>
              <strong>Cliente desde</strong>
              <p>${escapeHtml(user.registeredAt || 'Outubro de 2026')}</p>
            </div>
          </div>
        </div>

        <!-- Atalhos Rápidos Gamer -->
        <div class="profile-shortcuts">
          <h5 class="section-mini-title">Minha Conta Gamer</h5>
          <a href="index.html" class="profile-nav-link" id="navToCatalog">
            <span class="link-icon">🎮</span>
            <span>Explorar Catálogo</span>
            <span class="arrow">→</span>
          </a>
          <button class="profile-nav-link" id="btnMyOrders">
            <span class="link-icon">📦</span>
            <span>Meus Pedidos</span>
            <span class="pill-info">Em breve</span>
          </button>
          <button class="profile-nav-link" id="btnEditProfile">
            <span class="link-icon">✏️</span>
            <span>Editar Meus Dados</span>
            <span class="arrow">→</span>
          </button>
          <button class="profile-nav-link" id="btnReplayCinematic">
            <span class="link-icon">🎬</span>
            <span>Ver Abertura Cinematic</span>
            <span class="arrow">▶</span>
          </button>
        </div>

        <!-- Botão de Sair -->
        <div class="profile-foot-actions">
          <button class="btn-logout" id="btnLogoutUser">
            🚪 Desconectar da Conta
          </button>
        </div>
      </div>
    `;

    // Eventos do Perfil
    const copyBtn = $('#btnCopyCoupon', container);
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('GAMEVIP10').then(() => {
          copyBtn.textContent = '✓ Copiado!';
          showToast('Cupom GAMEVIP10 copiado com sucesso! 🎉');
          setTimeout(() => (copyBtn.textContent = 'Copiar'), 2000);
        }).catch(() => {
          showToast('Código do cupom: GAMEVIP10');
        });
      });
    }

    const myOrdersBtn = $('#btnMyOrders', container);
    if (myOrdersBtn) {
      myOrdersBtn.addEventListener('click', () => {
        showToast('Nenhum pedido em andamento no momento.');
      });
    }

    const editProfileBtn = $('#btnEditProfile', container);
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', () => {
        renderEditProfileForm(container, user);
      });
    }

    const replayBtn = $('#btnReplayCinematic', container);
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        toggleMenu(false);
        if (window.GameverseCinematic) window.GameverseCinematic.play();
      });
    }

    const logoutBtn = $('#btnLogoutUser', container);
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        setCurrentUser(null);
        showToast('Você saiu da sua conta.');
      });
    }
  }

  // Renderiza formulário de Edição de Dados
  function renderEditProfileForm(container, user) {
    container.innerHTML = `
      <div class="auth-box">
        <div class="auth-header">
          <button class="btn-back-profile" id="btnBackToProfile">← Voltar ao Perfil</button>
          <h4>Editar Dados Cadastrais</h4>
          <p>Mantenha suas informações de contato e entrega sempre atualizadas.</p>
        </div>

        <form class="auth-form" id="editProfileForm">
          <div class="auth-field">
            <label for="editName">Nome Completo *</label>
            <input type="text" id="editName" class="auth-input" value="${escapeHtml(user.name)}" required>
          </div>

          <div class="auth-field">
            <label for="editEmail">E-mail *</label>
            <input type="email" id="editEmail" class="auth-input" value="${escapeHtml(user.email)}" required>
          </div>

          <div class="auth-field">
            <label for="editPhone">WhatsApp / Telefone *</label>
            <input type="tel" id="editPhone" class="auth-input" value="${escapeHtml(user.phone || '')}" maxlength="15" required>
          </div>

          <div class="auth-field">
            <label for="editCpf">CPF (Apenas visualização)</label>
            <input type="text" id="editCpf" class="auth-input disabled-input" value="${escapeHtml(user.cpf)}" disabled>
          </div>

          <div class="auth-actions">
            <button type="submit" class="btn-auth-primary">💾 Salvar Alterações</button>
            <button type="button" class="btn-auth-secondary" id="btnCancelEdit">Cancelar</button>
          </div>
        </form>
      </div>
    `;

    const phoneInput = $('#editPhone', container);
    if (phoneInput) {
      phoneInput.addEventListener('input', e => {
        e.target.value = maskPhone(e.target.value);
      });
    }

    $('#btnBackToProfile', container)?.addEventListener('click', () => renderMenuBody());
    $('#btnCancelEdit', container)?.addEventListener('click', () => renderMenuBody());

    $('#editProfileForm', container)?.addEventListener('submit', e => {
      e.preventDefault();
      const updatedUser = {
        ...user,
        name: $('#editName', container).value.trim(),
        email: $('#editEmail', container).value.trim(),
        phone: $('#editPhone', container).value.trim()
      };

      saveRegisteredUser(updatedUser);
      setCurrentUser(updatedUser);
      showToast('Dados cadastrais atualizados com sucesso!');
    });
  }

  // Renderiza formulários de Cadastro / Login para novo cliente
  function renderAuthForms(container) {
    container.innerHTML = `
      <div class="auth-box">
        <!-- Switcher de Abas Cadastro / Login -->
        <div class="auth-tabs" role="tablist">
          <button class="auth-tab ${activeTab === 'register' ? 'active' : ''}" id="tabBtnRegister">
            ✨ Criar Cadastro
          </button>
          <button class="auth-tab ${activeTab === 'login' ? 'active' : ''}" id="tabBtnLogin">
            🔑 Já sou Cliente
          </button>
        </div>

        <!-- ABA 1: CADASTRO DO CLIENTE -->
        <div class="auth-tab-panel ${activeTab === 'register' ? 'active' : ''}" id="panelRegister">
          <div class="auth-intro">
            <h4>Junte-se ao Universo Gameverse</h4>
            <p>Cadastre-se para acompanhar pedidos, desbloquear cupons exclusivos e garantir suporte prioritário.</p>
          </div>

          <form class="auth-form" id="registerForm">
            <!-- 1. Nome Completo -->
            <div class="auth-field">
              <label for="regName">Nome Completo *</label>
              <input type="text" id="regName" class="auth-input" placeholder="Ex: Lucas Gabriel Moreira" maxlength="80" required>
            </div>

            <!-- 2. E-mail -->
            <div class="auth-field">
              <label for="regEmail">E-mail *</label>
              <input type="email" id="regEmail" class="auth-input" placeholder="seuemail@exemplo.com" required>
            </div>

            <!-- 3. CPF & Telefone em linha -->
            <div class="auth-row-2">
              <div class="auth-field">
                <label for="regCpf">CPF *</label>
                <input type="text" id="regCpf" class="auth-input" placeholder="000.000.000-00" maxlength="14" required>
              </div>
              <div class="auth-field">
                <label for="regPhone">WhatsApp / Celular *</label>
                <input type="tel" id="regPhone" class="auth-input" placeholder="(00) 00000-0000" maxlength="15" required>
              </div>
            </div>

            <!-- 4. Senha e Confirmação -->
            <div class="auth-row-2">
              <div class="auth-field">
                <label for="regPassword">Criar Senha *</label>
                <div class="pass-box">
                  <input type="password" id="regPassword" class="auth-input" placeholder="Mínimo 6 dígitos" minlength="6" required>
                  <button type="button" class="btn-toggle-eye" data-target="regPassword" aria-label="Mostrar senha">👁️</button>
                </div>
              </div>
              <div class="auth-field">
                <label for="regPasswordConfirm">Confirmar Senha *</label>
                <div class="pass-box">
                  <input type="password" id="regPasswordConfirm" class="auth-input" placeholder="Repita a senha" minlength="6" required>
                  <button type="button" class="btn-toggle-eye" data-target="regPasswordConfirm" aria-label="Mostrar senha">👁️</button>
                </div>
              </div>
            </div>

            <!-- Termos e Condições -->
            <div class="auth-checks">
              <label class="custom-checkbox-label">
                <input type="checkbox" id="regTerms" required>
                <span>Li e concordo com os <strong>Termos de Uso</strong> e <strong>Política de Privacidade</strong> da Gameverse.</span>
              </label>
              <label class="custom-checkbox-label">
                <input type="checkbox" id="regOffers" checked>
                <span>Desejo receber cupons relâmpago e novidades gamer por e-mail e WhatsApp.</span>
              </label>
            </div>

            <button type="submit" class="btn-auth-primary">
              🚀 Finalizar Cadastro Gamer
            </button>
          </form>

          <div class="auth-footer-note">
            <span>Já tem uma conta cadastrada?</span>
            <button class="link-switch-auth" id="btnSwitchToLogin">Entrar agora →</button>
          </div>
        </div>

        <!-- ABA 2: LOGIN DO CLIENTE -->
        <div class="auth-tab-panel ${activeTab === 'login' ? 'active' : ''}" id="panelLogin">
          <div class="auth-intro">
            <h4>Acessar Minha Conta</h4>
            <p>Entre com seu e-mail cadastrado e senha para gerenciar seus pedidos e cupons.</p>
          </div>

          <form class="auth-form" id="loginForm">
            <div class="auth-field">
              <label for="loginEmail">E-mail Cadastrado *</label>
              <input type="email" id="loginEmail" class="auth-input" placeholder="seuemail@exemplo.com" required>
            </div>

            <div class="auth-field">
              <label for="loginPassword">Sua Senha *</label>
              <div class="pass-box">
                <input type="password" id="loginPassword" class="auth-input" placeholder="Digite sua senha..." required>
                <button type="button" class="btn-toggle-eye" data-target="loginPassword" aria-label="Mostrar senha">👁️</button>
              </div>
            </div>

            <button type="submit" class="btn-auth-primary">
              ⚡ Entrar na Conta
            </button>
          </form>

          <div class="auth-footer-note">
            <span>Novo na Gameverse?</span>
            <button class="link-switch-auth" id="btnSwitchToRegister">Criar meu cadastro →</button>
          </div>
        </div>

        <!-- Vantagens do Cliente Gameverse -->
        <div class="auth-perks-box">
          <div class="perk-item">
            <span>⚡</span>
            <div>
              <strong>Checkout em 1 Clique</strong>
              <p>Endereço salvo para compras rápidas</p>
            </div>
          </div>
          <div class="perk-item">
            <span>🛡️</span>
            <div>
              <strong>Garantia Estendida</strong>
              <p>Suporte direto com nosso time técnico</p>
            </div>
          </div>
          <div class="perk-item">
            <span>🎟️</span>
            <div>
              <strong>Cupom GAMEVIP10</strong>
              <p>10% de desconto imediato no cadastro</p>
            </div>
          </div>
          <div class="perk-item" style="cursor:pointer" id="btnReplayFromAuth" title="Clique para assistir a abertura">
            <span>🎬</span>
            <div>
              <strong>Abertura Gameverse</strong>
              <p style="color:var(--neon-2)">Clique para rever a animação estilo console ▶</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Eventos de Tab
    const tabReg = $('#tabBtnRegister', container);
    const tabLog = $('#tabBtnLogin', container);
    const switchLog = $('#btnSwitchToLogin', container);
    const switchReg = $('#btnSwitchToRegister', container);

    function switchAuthTab(tab) {
      activeTab = tab;
      renderAuthForms(container);
    }

    if (tabReg) tabReg.addEventListener('click', () => switchAuthTab('register'));
    if (tabLog) tabLog.addEventListener('click', () => switchAuthTab('login'));
    if (switchLog) switchLog.addEventListener('click', () => switchAuthTab('login'));
    if (switchReg) switchReg.addEventListener('click', () => switchAuthTab('register'));

    const replayAuthBtn = $('#btnReplayFromAuth', container);
    if (replayAuthBtn) {
      replayAuthBtn.addEventListener('click', () => {
        toggleMenu(false);
        if (window.GameverseCinematic) window.GameverseCinematic.play();
      });
    }

    // Máscaras de CPF e Telefone em tempo real
    const cpfInput = $('#regCpf', container);
    if (cpfInput) {
      cpfInput.addEventListener('input', e => {
        e.target.value = maskCpf(e.target.value);
      });
    }

    const phoneInput = $('#regPhone', container);
    if (phoneInput) {
      phoneInput.addEventListener('input', e => {
        e.target.value = maskPhone(e.target.value);
      });
    }

    // Toggle de visibilidade da senha (olho)
    $$('.btn-toggle-eye', container).forEach(eyeBtn => {
      eyeBtn.addEventListener('click', () => {
        const targetId = eyeBtn.dataset.target;
        const targetInput = $(`#${targetId}`, container);
        if (targetInput) {
          const isPass = targetInput.type === 'password';
          targetInput.type = isPass ? 'text' : 'password';
          eyeBtn.textContent = isPass ? '🙈' : '👁️';
        }
      });
    });

    // Envio do formulário de Cadastro
    const regForm = $('#registerForm', container);
    if (regForm) {
      regForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = $('#regName', container).value.trim();
        const email = $('#regEmail', container).value.trim().toLowerCase();
        const cpf = $('#regCpf', container).value.trim();
        const phone = $('#regPhone', container).value.trim();
        const pass = $('#regPassword', container).value;
        const passConf = $('#regPasswordConfirm', container).value;
        const termsChecked = $('#regTerms', container).checked;

        if (!termsChecked) {
          showToast('⚠️ Você precisa aceitar os termos para prosseguir.');
          return;
        }

        // Validação de CPF (deve ter 11 dígitos)
        const cpfDigits = cpf.replace(/\D/g, '');
        if (cpfDigits.length !== 11 || /^(\d)\1{10}$/.test(cpfDigits)) {
          showToast('⚠️ Por favor, digite um CPF válido com 11 dígitos.');
          $('#regCpf', container).focus();
          return;
        }

        // Validação de Senha
        if (pass.length < 6) {
          showToast('⚠️ A senha deve conter pelo menos 6 caracteres.');
          return;
        }

        if (pass !== passConf) {
          showToast('⚠️ As senhas digitadas não coincidem.');
          $('#regPasswordConfirm', container).focus();
          return;
        }

        // Novo objeto do cliente
        const newUser = {
          id: Date.now(),
          name,
          email,
          cpf,
          phone,
          password: pass,
          registeredAt: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
        };

        saveRegisteredUser(newUser);
        setCurrentUser(newUser);

        showToast(`🎮 Bem-vindo, ${name}! Seu cadastro foi concluído com sucesso.`);
      });
    }

    // Envio do formulário de Login
    const loginForm = $('#loginForm', container);
    if (loginForm) {
      loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = $('#loginEmail', container).value.trim().toLowerCase();
        const pass = $('#loginPassword', container).value;

        const users = getAllRegisteredUsers();
        const found = users.find(u => u.email.toLowerCase() === email && u.password === pass);

        if (found) {
          setCurrentUser(found);
          showToast(`⚡ Bem-vindo de volta, ${found.name}!`);
        } else {
          // Se for uma conta demo ou login de teste, permitimos se o usuário já cadastrou antes
          // Caso contrário, alertamos
          if (users.length === 0) {
            // Cria usuário direto para conveniência
            const demoUser = {
              id: Date.now(),
              name: email.split('@')[0],
              email,
              cpf: '123.456.789-00',
              phone: '(11) 98765-4321',
              password: pass,
              registeredAt: 'Recém cadastrado'
            };
            saveRegisteredUser(demoUser);
            setCurrentUser(demoUser);
            showToast(`🎮 Bem-vindo, ${demoUser.name}!`);
          } else {
            showToast('⚠️ E-mail ou senha incorretos. Verifique os dados ou crie seu cadastro.');
          }
        }
      });
    }
  }

  // Inicialização dos eventos globais do Menu Lateral
  function initMenu() {
    const openBtn = $('#openMenu');
    const closeBtn = $('#closeMenu');
    const overlay = $('#overlay');

    if (openBtn) {
      openBtn.addEventListener('click', () => toggleMenu(true));
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => toggleMenu(false));
    }

    // Se abrir o carrinho, fecha o menu lateral
    const openCartBtn = $('#openCart');
    if (openCartBtn) {
      openCartBtn.addEventListener('click', () => {
        const menuDrawer = $('#menuDrawer');
        if (menuDrawer && menuDrawer.classList.contains('open')) {
          toggleMenu(false);
        }
      });
    }

    // O overlay fecha qualquer drawer aberto (carrinho ou menu)
    if (overlay) {
      overlay.addEventListener('click', () => {
        toggleMenu(false);
      });
    }

    // Fecha ao pressionar ESC
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const menuDrawer = $('#menuDrawer');
        if (menuDrawer && menuDrawer.classList.contains('open')) {
          toggleMenu(false);
        }
      }
    });

    updateUserTriggerBadge();
  }

  // Auto-executa após carregamento do DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }

  // Expõe helpers caso necessário
  window.GameverseMenu = {
    toggle: toggleMenu,
    getUser: getCurrentUser,
    setUser: setCurrentUser
  };
})();

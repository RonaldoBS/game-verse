<div align="center">

# 🎮 GAMEVERSE • E-Commerce Gamer

**Plataforma de E-Commerce de Alta Performance para Setup, Hardware & Periféricos Gamer**

[![Versão](https://img.shields.io/badge/versão-v1.0.0-7c4dff.svg?style=for-the-badge)](https://github.com/RonaldoBS/game-verse)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-00e5ff.svg?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Cyberpunk%20Dark-7c4dff.svg?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![HTML5](https://img.shields.io/badge/HTML5-Semântico-00e676.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)

</div>

---

> [!NOTE]
> ### 📌 Contexto do Projeto
> Esta é a **Versão 1.0 (v1.0.0)** de uma solução de e-commerce desenvolvida originalmente como projeto de encomenda para um **antigo cliente** do segmento gamer. O objetivo foi criar uma loja virtual com identidade visual marcante (estética *Cyberpunk Neon / Dark Mode*), navegação ultrarrápida, funcionalidades avançadas de retenção e conversão de clientes, e arquitetura moderna em **Vanilla JavaScript** (sem dependências de frameworks pesados), garantindo máxima compatibilidade, leveza e fluidez.

---

## ⚡ Destaques e Funcionalidades do Projeto

### 🎬 1. Abertura Cinematográfica Estilo Console (PlayStation / Xbox)
* **Boot Audio Sintetizado (Web Audio API)**:
  * Trilha sonora de inicialização sintetizada diretamente no navegador sem dependência de arquivos de áudio externos.
  * Composto por 3 camadas sonoras harmônicas: *Sub-bass Drone* profundo (55Hz–110Hz), *Cosmic Shimmer Pad* no acorde etéreo Dmaj9, e o clássico *Crystal Glass Chime* no instante da convergência da logo.
  * Controle de áudio nativo (`🔊 Som` / `🔇 Mudo`) com persistência de preferência.
* **Efeitos Visuais de Alto Impacto (Canvas 60 FPS)**:
  * Campo de partículas cósmicas aceleradas com efeito de distorção *warp / hiperespaço*.
  * Chão em grade de perspectiva 3D (*Perspective Grid*) contínua.
  * Silhueta do controle gamer estilizado em roxo neon (`#7c4dff`) com ondas de choque radiais (*Shockwave rings*).
  * Feixe de *Lens Flare Laser* cortando horizontalmente a tipografia **GAMEVERSE** em gradiente elétrico azul e ciano (`#4f8cff` a `#00e5ff`).
* **Controles & Usabilidade Gamer**:
  * Pular a qualquer momento com as teclas **`ESC`**, **`Espaço`**, **`Enter`** ou clicando no botão *Pular*.
  * Controle de frequência via `sessionStorage`: executa na primeira visita da sessão e não interrompe a navegação entre páginas.
  * Opção de **Rever Abertura** a qualquer momento pelo menu lateral e pelo rodapé do site (`🎬 Abertura Gamer`).

---

### 🛒 2. Catálogo Interativo com Filtros Múltiplos
* **Busca em Tempo Real com Debounce**: Pesquisa instantânea por nome, marca e categoria sem travamento de digitação.
* **Filtros por Categorias**: Alternância dinâmica entre categorias (*Headsets, Mouses, Teclados, Monitores, Hardware, etc.*).
* **Filtro de Faixa de Preço (Slider Range)**: Ajuste interativo de valor máximo com atualização instantânea da grade.
* **Ordenação Múltipla**: Destaques, Menor Preço, Maior Preço e Melhores Avaliações.
* **Contador Dinâmico & Estado Vazio**: Exibe o total de produtos encontrados e tela informativa de busca sem resultados com botão de restauração de filtros.

---

### 🔍 3. Página de Detalhes do Produto (PDP - `produto.html`)
* **Galeria de Imagens de Alta Fidelidade**: Imagens de produtos estilizadas com iluminação ambiente dark gamer.
* **Badges de Confiança**: Garantia oficial de 12 meses, envio imediato em até 24h úteis e garantia de produto 100% original com Nota Fiscal Eletrônica.
* **Atualização Dinâmica de Preços e Parcelas**:
  * Ao ajustar a quantidade de compra `[-] [qty] [+]`, o sistema recalcula e anima dinamicamente:
    * Preço à vista no Pix com **10% de desconto**.
    * Valor e quantidade das parcelas sem juros no cartão (até 10x sem juros).
    * Preço regular total e preço antigo riscado com efeito visual de destaque (`.price-pulse`).
* **Simulador de Frete Realista**:
  * Validação de CEP de 8 dígitos.
  * Simulação de opções com prazos: *Gameverse Express (1 a 2 dias)*, *Sedex Correios (2 a 3 dias)* e *PAC Econômico*.
  * **Regra de Frete Grátis Inteligente**: Aplica automaticamente frete grátis para compras acima de R$ 250,00.

---

### 📑 4. Abas Especializadas de Conteúdo
* **📝 Descrição Detalhada**: Apresentação editorial com cards de atributos técnicos (*Alta Performance Gamer, Durabilidade Reforçada e Plug & Play Universal*).
* **⚙️ Especificações Técnicas**: Tabela completa com ficha técnica específica para cada item (Switches, DPI, Painel, Memória, Conexões, etc.).
* **💳 Formas de Pagamento Dinâmicas**: Tabela sincronizada de 1x a 10x sem juros no cartão, vantagens do pagamento Pix e boleto bancário.
* **⭐ Avaliações dos Clientes**:
  * Painel de pontuação média, estrelas e barras percentuais de satisfação de 1 a 5 estrelas.
  * Lista de depoimentos de compradores verificados com data e título.

---

### ✍️ 5. Formulário de Avaliação Refatorado
* **Sequência Lógica Estrita**:
  1. **Nome**: Identificação do cliente.
  2. **Título**: Resumo do comentário.
  3. **Detalhes da Avaliação**: Texto livre da experiência.
  4. **Sua Nota**: Seletor interativo de 1 a 5 estrelas.
* **Caixas de Texto com Tamanho Uniforme**: Todos os campos compartilham exatamente a mesma largura, bordas arredondadas e padding (`.form-field-input`).
* **Adaptação Dinâmica de Altura**: A caixa de *Detalhes da Avaliação* ajusta sua altura automaticamente com base no volume de texto digitado (`scrollHeight`).
* **Limite de 1.000 Caracteres**: Limitador estrito com contador em tempo real (`0 / 1000 caracteres`) e destaque visual de alerta.
* **Publicação Imediata**: As avaliações adicionadas são renderizadas instantaneamente no topo da lista.

---

### 👤 6. Menu Lateral & Central do Cliente (`menu.js`)
* **Acesso Rápido ao Lado da Marca**: Botão de menu hamburguer posicionado no cabeçalho imediatamente ao lado da logo **GAMEVERSE**.
* **Indicador de Status do Usuário**: Ponto verde neon no ícone do menu quando o cliente estiver autenticado.
* **Aba de Cadastro de Clientes**:
  * **Nome Completo**.
  * **E-mail**.
  * **CPF** com máscara dinâmica (`000.000.000-00`) e validação de 11 dígitos.
  * **WhatsApp / Telefone** com máscara automática (`(00) 00000-0000`).
  * **Criação e Confirmação de Senha** com botão de alternar visibilidade (olho 👁️/🙈).
  * Termos de Uso e opt-in para recebimento de promoções.
* **Aba de Login**: Alternância com um clique para clientes com conta existente.
* **Painel do Cliente Cadastrado (Perfil VIP)**:
  * Avatar com as iniciais do cliente e status online.
  * Tag de membro *VIP Gamer Level 1*.
  * **Cupom Exclusivo de Boas-Vindas**: Código `GAMEVIP10` (10% OFF adicional) com botão de cópia com 1 clique.
  * Dados cadastrais protegidos por mascaramento (`***.***.123-**`).
  * Formulário de **Edição de Dados Cadastrais**.
  * Botão de **Desconectar / Sair da Conta**.
* **Persistência Total**: Os dados do cliente ficam salvos no `localStorage`, compartilhados entre a página principal e a página de produto.

---

### 🛍️ 7. Carrinho de Compras Lateral (Drawer)
* Gaveta retrátil deslizante com contador de itens no cabeçalho (*badge* dinâmico).
* Incremento `[+]` e decremento `[-]` de quantidade e exclusão direta de itens.
* Cálculo do valor total em tempo real com persistência no `localStorage`.
* Simulação de finalização de pedido com notificações Toast personalizadas.

---

## 🎨 Identidade Visual & Design System

| Elemento | Especificação |
| :--- | :--- |
| **Paleta Primária** | `#0a0a12` (Void Black), `#12121f` (Dark Alt), `#15152a` (Card Surface) |
| **Acentos Neon** | `#7c4dff` (Purple Neon), `#00e5ff` (Cyan Glow), `#00e676` (Neon Green) |
| **Tipografia** | Segoe UI, System-UI, Roboto, Sans-Serif |
| **Responsividade** | Mobile-First com suporte a smartphones, tablets e desktops ultra-wide |
| **Acessibilidade** | Suporte a navegação por teclado (`Tab`, `Enter`, `ESC`), atributos ARIA e contraste otimizado |

---

## 📁 Estrutura de Arquivos

```text
gameverse/
├── assets/                       # Fotos de alta resolução e logotipo oficial
│   ├── cadeira-gamer.jpg
│   ├── caixa-som-gamer.jpg
│   ├── controle-gamer.jpg
│   ├── gpu-gamer.jpg
│   ├── headset-gamer.jpg
│   ├── logo.png                  # Logotipo original do cliente
│   ├── microfone-gamer.jpg
│   ├── monitor-gamer.jpg
│   ├── mouse-gamer.jpg
│   ├── mousepad-gamer.jpg
│   ├── ssd-gamer.jpg
│   ├── teclado-gamer.jpg
│   └── webcam-gamer.jpg
├── .gitignore                    # Exclusão estrita de variáveis, chaves e arquivos sensíveis
├── cinematic.js                  # Abertura estilo console (Web Audio API + Canvas 3D)
├── index.html                    # Página inicial e catálogo de produtos
├── menu.js                       # Menu lateral, cadastro/login de clientes e perfil VIP
├── products.js                   # Base de dados dos produtos com fichas técnicas e avaliações
├── produto.html                  # Página de Detalhes do Produto (PDP)
├── produto.js                    # Lógica da PDP (preços dinâmicos, abas, frete e avaliações)
├── README.md                     # Documentação técnica e comercial do projeto
├── script.js                     # Lógica da página principal (filtros, busca, carrinho)
└── style.css                     # Design System completo Cyberpunk Dark
```

---

## 🚀 Como Executar o Projeto Localmente

O projeto foi construído puramente com tecnologias web nativas (**HTML5, CSS3 e JavaScript ES6+**), sem exigir instalação de pacotes pesados ou compilação:

1. **Clone o repositório**:
   ```bash
   git clone git@github.com:RonaldoBS/game-verse.git
   cd game-verse
   ```

2. **Abra no seu navegador**:
   * Dê um duplo clique no arquivo `index.html`, **OU**
   * Utilize a extensão **Live Server** no VS Code / seu editor favorito, **OU**
   * Inicie um servidor local leve em Python ou Node:
     ```bash
     # Usando Python
     python -m http.server 3000

     # Usando Node (npx)
     npx serve .
     ```

3. Acesse `http://localhost:3000` e experimente a abertura cinematográfica, o catálogo e as páginas de produtos!

---

## 🔒 Segurança e Boas Práticas (.gitignore)

O arquivo `.gitignore` foi configurado para garantir a proteção de dados sensíveis e conformidade com as melhores práticas de desenvolvimento:
* Exclusão total de arquivos de ambiente (`.env`, `.env.*`, `*.env`).
* Bloqueio de certificados, chaves privadas (`*.pem`, `*.key`, `*.cert`, `id_rsa*`) e credenciais.
* Bloqueio de diretórios temporários, logs, arquivos de compilação e dependências de pacotes.

---

## 📄 Licença

Este projeto é disponibilizado para fins de portfólio e demonstração técnica. Todos os direitos reservados à sua concepção original.

<div align="center">
  <sub>Desenvolvido com excelência técnica para o universo gamer. 🎮⚡</sub>
</div>

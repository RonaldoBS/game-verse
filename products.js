// Catálogo Global Gameverse - Dados centralizados de produtos
const PRODUCTS = [
  {
    id: 1,
    name: "Headset Gamer HyperX Cloud II",
    cat: "Áudio",
    price: 499.90,
    old: 699.90,
    img: "assets/headset-gamer.jpg",
    tag: "sale",
    rating: 4.8,
    rev: 1240,
    shortDesc: "Áudio surround 7.1 virtual, drivers de 53mm e almofadas em espuma memory foam para conforto extremo em longas sessões.",
    description: "O HyperX Cloud II é um clássico absoluto entre streamers e jogadores competitivos de eSports. Equipado com drivers dinâmicos de 53mm ajustados com precisão, ele oferece graves potentes, médios cristalinos e agudos nítidos com áudio surround virtual 7.1 imersivo via placa de som USB. A estrutura de alumínio durável foi projetada para resistir ao uso diário intenso, enquanto as almofadas em espuma memory foam aveludada proporcionam isolamento passivo de ruído e conforto impecável durante maratonas de jogos.",
    specs: {
      "Drivers": "Dinâmicos de 53mm com ímãs de neodímio",
      "Resposta de Frequência": "15 Hz – 25.000 Hz",
      "Impedância Nominal": "60 Ω por sistema",
      "Tipo de Áudio": "Som Surround 7.1 Virtual com placa de som USB",
      "Microfone": "Condensador electret com cancelamento de ruído destacável",
      "Conexão": "P3 (3.5mm) de 4 polos + Módulo de controle de áudio USB",
      "Estrutura": "Alumínio de alta resistência e couro sintético respirável",
      "Compatibilidade": "PC, PS4, PS5, Xbox Series X/S, Nintendo Switch e Mobile",
      "Peso": "320g (com microfone e cabo)"
    },
    reviews: [
      {
        author: "Lucas Silveira",
        date: "14/10/2026",
        rating: 5,
        title: "O melhor headset da categoria, sem dúvidas!",
        comment: "Isolamento acústico absurdo e o som surround 7.1 ajuda demais a localizar passos no CS2 e no Valorant. O microfone destacável também tem uma clareza ótima."
      },
      {
        author: "Mariana Costa",
        date: "02/10/2026",
        rating: 5,
        title: "Conforto surreal para maratonas",
        comment: "Uso 8 horas seguidas no trabalho e na gameplay e não sinto pressão na cabeça nem dor nas orelhas. As espumas memory foam são de outro nível."
      },
      {
        author: "Gabriel Zanin",
        date: "25/09/2026",
        rating: 4,
        title: "Construção de metal e som muito equilibrado",
        comment: "Cabo longo, placa USB prática com controle de volume e botão mute físico. Valeu cada centavo."
      }
    ]
  },
  {
    id: 2,
    name: "Mouse Razer DeathAdder V3",
    cat: "Periféricos",
    price: 379.90,
    old: null,
    img: "assets/mouse-gamer.jpg",
    tag: "hot",
    rating: 4.9,
    rev: 890,
    shortDesc: "Design ergonômico ultraleve de 59g com sensor óptico Focus Pro 30K e switches ópticos de 3ª geração.",
    description: "Com o Razer DeathAdder V3, a vitória toma uma nova forma. Refinado com a colaboração dos maiores atletas de eSports do mundo, sua icônica forma ergonômica agora é mais de 25% mais leve que o antecessor, pesando apenas 59g. Equipado com o sensor óptico Razer Focus Pro 30K de precisão milimétrica e switches ópticos Gen-3 com ciclo de 90 milhões de cliques e atuação imediata de 0.2ms sem debounce delay.",
    specs: {
      "Sensor": "Óptico Razer Focus Pro 30K DPI",
      "Velocidade Máxima": "750 IPS",
      "Aceleração": "70 G",
      "Switches": "Ópticos Razer Gen-3 (até 90 milhões de cliques)",
      "Taxa de Polling": "Até 8000 Hz (com tecnologia HyperPolling)",
      "Peso": "59g (ultraleve sem furos externos)",
      "Cabo": "Razer Speedflex trançado de 1.8m flexível",
      "Pés": "100% PTFE virgem com bordas arredondadas",
      "Botões Programáveis": "6 botões independentes via Razer Synapse"
    },
    reviews: [
      {
        author: "Rafael Nogueira",
        date: "18/10/2026",
        rating: 5,
        title: "Leveza e precisão inacreditáveis",
        comment: "O sensor não perde nenhum rastreio mesmo em movimentos rápidos de flick. O peso de 59g sem buracos na carcaça é pura engenharia."
      },
      {
        author: "Thiago Mendes",
        date: "05/10/2026",
        rating: 5,
        title: "Ergonomia perfeita para pegada Palm",
        comment: "Tenho mão média para grande e o encaixe é perfeito. O clique é tátil, crocante e sem double-click por ser óptico."
      }
    ]
  },
  {
    id: 3,
    name: "Teclado Mecânico Redragon K552",
    cat: "Periféricos",
    price: 249.90,
    old: 329.90,
    img: "assets/teclado-gamer.jpg",
    tag: "sale",
    rating: 4.7,
    rev: 1560,
    shortDesc: "Formato TKL compacto, switches mecânicos Outemu Red com hot-swap e iluminação RGB com 18 modos.",
    description: "O Redragon Kumara K552 é construído como um tanque. Com chassi reforçado em alumínio e plástico ABS de grau aeroespacial, ele libera espaço precioso na sua mesa para movimentar o mouse com amplitude. Seus switches mecânicos lineares Outemu Red oferecem acionamento suave, rápido e silencioso, ideal para digitação e jogos de reflexo rápido. Sistema hot-swap de switches e teclas double-shot injection que nunca desgastam a gravação das letras.",
    specs: {
      "Formato": "Tenkeyless (TKL - 87 teclas)",
      "Switches": "Mecânicos Outemu Red (Linear, silencioso, 45g de força)",
      "Hot-Swap": "Sim, compatível com switches Outemu 3 pinos",
      "Teclas": "Double-Shot Injection em plástico ABS de alta densidade",
      "Anti-Ghosting": "100% N-Key Rollover em todas as teclas",
      "Iluminação": "RGB Chroma com 18 efeitos dinâmicos e controle de brilho",
      "Conexão": "USB 2.0 banhado a ouro",
      "Construção": "Estrutura interna metálica de alta rigidez",
      "Dimensões": "354 x 123 x 37 mm | Peso: 900g"
    },
    reviews: [
      {
        author: "Bruno Alcantara",
        date: "16/10/2026",
        rating: 5,
        title: "Durabilidade absurda pelo preço!",
        comment: "Teclado muito pesado e firme na mesa, não escorrega nada. Os switches vermelhos são ótimos e suaves, muito bom para FPS."
      },
      {
        author: "Camila Rocha",
        date: "28/09/2026",
        rating: 4,
        title: "Excelente custo-benefício",
        comment: "O RGB é brilhante e tem vários padrões legais direto no teclado sem precisar de software pesado. Vale a pena."
      }
    ]
  },
  {
    id: 4,
    name: "Monitor LG UltraGear 27\" 165Hz",
    cat: "Monitores",
    price: 1499.90,
    old: 1799.90,
    img: "assets/monitor-gamer.jpg",
    tag: "hot",
    rating: 4.9,
    rev: 320,
    shortDesc: "Tela IPS Full HD de 27\", taxa de atualização de 165Hz, 1ms MBR, suporte a HDR10 e AMD FreeSync Premium.",
    description: "Eleve o seu nível competitivo com o monitor LG UltraGear 27GN65R. A tecnologia IPS de alta gama combinada com a taxa de atualização ultrarrápida de 165Hz e 1ms MBR de tempo de resposta garante transições de quadros fluidas e sem rastros (ghosting). A compatibilidade com AMD FreeSync Premium e NVIDIA G-Sync Compatible elimina o screen tearing e stuttering, enquanto o suporte a HDR10 com 99% sRGB proporciona cores cinematográficas e vibrantes.",
    specs: {
      "Tamanho da Tela": "27 polegadas (68,5 cm diagonal)",
      "Tipo de Painel": "IPS com ângulo de visão de 178°/178°",
      "Resolução": "Full HD (1920 x 1080 pixels)",
      "Taxa de Atualização": "165 Hz nativos via DisplayPort / 144 Hz via HDMI",
      "Tempo de Resposta": "1ms MBR (Motion Blur Reduction)",
      "Gama de Cores": "sRGB 99% (CIE1931) com suporte HDR10",
      "Sincronização": "AMD FreeSync Premium e NVIDIA G-Sync Compatible",
      "Conectividade": "1x DisplayPort 1.4, 1x HDMI 2.0, 1x Saída de fone 3.5mm",
      "Ergonomia": "Ajuste de inclinação (-5° a +15°), rotação Pivot e ajuste de altura (110mm)",
      "Montagem": "Suporte padrão VESA 100 x 100 mm"
    },
    reviews: [
      {
        author: "Danilo Ferraz",
        date: "12/10/2026",
        rating: 5,
        title: "Cores vivas e fluidez absurda!",
        comment: "Sair de 60Hz para 165Hz no painel IPS é uma experiência da qual não dá mais para voltar. Imagem espetacular e a base ajusta em altura perfeitamente."
      },
      {
        author: "Fernanda Lima",
        date: "03/10/2026",
        rating: 5,
        title: "Perfeito para jogos e produtividade",
        comment: "Bordas finíssimas, visual gamer discreto e sem vazamento de luz visível. O painel IPS reproduz cores de maneira impecável."
      }
    ]
  },
  {
    id: 5,
    name: "Placa de Vídeo RTX 4070",
    cat: "Hardware",
    price: 3899.90,
    old: null,
    img: "assets/gpu-gamer.jpg",
    tag: "hot",
    rating: 4.9,
    rev: 210,
    shortDesc: "12GB GDDR6X, arquitetura NVIDIA Ada Lovelace, suporte a DLSS 3 Frame Generation e sistema de refrigeração Windforce.",
    description: "A GIGABYTE GeForce RTX 4070 Windforce OC 12G entrega desempenho estelar para jogar os títulos AAA mais exigentes em Quad HD (1440p) e 4K com Ray Tracing no máximo. Impulsionada pela eficiente arquitetura NVIDIA Ada Lovelace, ela traz a revolucionária tecnologia DLSS 3 com geração neural de quadros. Seu sistema de resfriamento Windforce conta com três fans de rotação alternada, tubos de calor de cobre composto e backplate de proteção em metal.",
    specs: {
      "GPU": "NVIDIA GeForce RTX 4070 (AD104-250)",
      "Núcleos CUDA": "5.888 núcleos",
      "Memória de Vídeo": "12 GB GDDR6X",
      "Barramento de Memória": "192-bit com largura de banda de 504 GB/s",
      "Clock Boost": "2.490 MHz (OC Edition)",
      "Tecnologias": "DLSS 3, Ray Tracing Cores 3ª Gen, Tensor Cores 4ª Gen, NVIDIA Reflex",
      "Saídas de Vídeo": "3x DisplayPort 1.4a, 1x HDMI 2.1a (suporta 4K 120Hz HDR)",
      "Consumo / Conector": "TDP de 200W | 1x conector de 8 pinos PCIe",
      "Fonte Recomendada": "650W ou superior com certificação 80 Plus",
      "Dimensões": "261 x 126 x 50 mm (2.5 slots)"
    },
    reviews: [
      {
        author: "Rodrigo Toledo",
        date: "15/10/2026",
        rating: 5,
        title: "Monstro em 1440p com consumo baixíssimo!",
        comment: "Cyberpunk 2077 com Ray Tracing Overdrive rodando a mais de 100 FPS graças ao DLSS 3. Placa fria, não passa de 63°C em estresse máximo."
      },
      {
        author: "Eduardo Paiva",
        date: "29/09/2026",
        rating: 5,
        title: "Silenciosa e muito potente",
        comment: "Os três fans da Gigabyte desligam quando não estou jogando. Construção de metal robusta e acabamento premium."
      }
    ]
  },
  {
    id: 6,
    name: "Cadeira Gamer ThunderX3",
    cat: "Móveis",
    price: 1199.90,
    old: 1499.90,
    img: "assets/cadeira-gamer.jpg",
    tag: "new",
    rating: 4.6,
    rev: 540,
    shortDesc: "Couro sintético premium com costura diamante, recline até 180°, almofadas lombar e cervical e pistão classe 4.",
    description: "A cadeira gamer ThunderX3 TC3 foi projetada meticulosamente para unir ergonomia avançada e design arrojado. O estofamento em espuma de alta densidade se molda à anatomia do seu corpo, proporcionando suporte lombar exemplar mesmo após longas horas de gameplay ou home office. O revestimento em couro sintético com tecnologia AIR Tech conta com microporos respiráveis que evitam o aquecimento. O encosto reclina suavemente até 180° para momentos de descanso.",
    specs: {
      "Revestimento": "Couro sintético premium com tecnologia respirável AIR Tech",
      "Densidade da Espuma": "Espuma moldada de alta densidade (50 kg/m³)",
      "Reclinação": "Ajuste de 90° até 180° com mecanismo de balanço",
      "Braços": "Apoios de braço bidirecionais (2D) ajustáveis em altura",
      "Mecanismo de Elevação": "Pistão a gás de Classe 4 certificado BIFMA",
      "Base": "Aço reforçado em estrela de 350mm com acabamento preto fosco",
      "Rodízios": "Nylon de 65mm silenciosos com deslizamento suave para qualquer piso",
      "Acessórios Inclusos": "Almofada para cabeça/cervical e almofada de suporte lombar",
      "Capacidade de Peso": "Suporta até 150 kg (Recomendado para usuários de até 125 kg)"
    },
    reviews: [
      {
        author: "Marcos Vinicius",
        date: "11/10/2026",
        rating: 5,
        title: "Minha postura e costas agradeceram!",
        comment: "Cadeira muito firme e não afunda com o tempo. A montagem foi super simples, levou 15 minutos com o manual e a chave que vem na caixa."
      },
      {
        author: "Beatriz Sampaio",
        date: "01/10/2026",
        rating: 4,
        title: "Muito confortável e bonita",
        comment: "O tecido respirável faz diferença nos dias quentes. A almofada lombar encaixa direitinho na coluna."
      }
    ]
  },
  {
    id: 7,
    name: "Mousepad XL Speed Surface",
    cat: "Periféricos",
    price: 89.90,
    old: null,
    img: "assets/mousepad-gamer.jpg",
    tag: null,
    rating: 4.5,
    rev: 980,
    shortDesc: "Superfície Speed XL 900x400mm com ilustração da Grande Onda, bordas costuradas em reforço e base emborrachada.",
    description: "O Mousepad Gamer XL Speed Surface transforma a sua mesa em uma verdadeira arena de jogo. Com dimensões generosas de 900 x 400 mm, ele acomoda com facilidade seu teclado e mouse, oferecendo espaço ininterrupto para miras de baixa sensibilidade. O tecido de microfibra de alta densidade reduz o atrito para deslizamentos rápidos e uniformes, enquanto a base de borracha texturizada antiderrapante garante estabilidade total durante os combates mais frenéticos.",
    specs: {
      "Dimensões": "900 mm (comprimento) x 400 mm (largura) x 3 mm (espessura)",
      "Superfície": "Tecido de microfibra de alta densidade tipo Speed",
      "Base": "Borracha natural antiderrapante com padrão em grade",
      "Bordas": "Costura reforçada de alta densidade anti-desfiamento",
      "Estampa": "A Grande Onda de Kanagawa em alta definição resistente à água",
      "Limpeza": "Superfície lavável com água e sabão neutro",
      "Compatibilidade": "Otimizado para mouses com sensores ópticos e a laser"
    },
    reviews: [
      {
        author: "Felipe Castilho",
        date: "17/10/2026",
        rating: 5,
        title: "Lindo demais na mesa!",
        comment: "A estampa da onda em traços brancos sobre preto dá um contraste elegante no setup. O mouse desliza com zero esforço."
      },
      {
        author: "Juliana Peixoto",
        date: "09/10/2026",
        rating: 5,
        title: "Costura impecável e tamanho perfeito",
        comment: "Cabe teclado full-size e ainda sobra um espaço gigante para mexer o mouse. Não desfiou nada nas bordas."
      }
    ]
  },
  {
    id: 8,
    name: "Controle DualSense PS5",
    cat: "Consoles",
    price: 449.90,
    old: 529.90,
    img: "assets/controle-gamer.jpg",
    tag: "sale",
    rating: 4.9,
    rev: 1720,
    shortDesc: "Resposta tátil imersiva, gatilhos adaptáveis dinâmicos, microfone integrado e design icônico em dois tons.",
    description: "Sinta cada impacto, aceleração e textura com o controle sem fio DualSense para PlayStation 5 e PC. Seus atuadores duplos substituem os motores de vibração tradicionais, reproduzindo desde a chuva caindo até o recuo de diferentes armas. Os gatilhos adaptáveis L2/R2 oferecem resistência física variável conforme você puxa a corda de um arco ou pisa no freio de um carro esportivo. Bateria recarregável integrada, touchpad multitoque e entrada para headset.",
    specs: {
      "Compatibilidade": "PlayStation 5, PC (Windows 10/11 via USB/Bluetooth), Mac, Android e iOS",
      "Conectividade": "Bluetooth 5.1 e USB Type-C (cabo de dados/recarregamento)",
      "Recursos Hápticos": "Resposta tátil de alta fidelidade e gatilhos adaptáveis dinâmicos",
      "Áudio": "Alto-falante embutido, microfone integrado e entrada 3.5mm para headset",
      "Bateria": "Íon de lítio recarregável de 1.560 mAh (até 12 horas de autonomia)",
      "Sensores": "Acelerômetro e giroscópio de 6 eixos de alta precisão",
      "Touchpad": "Touchpad capacitivo de 2 pontos com mecanismo de clique",
      "Dimensões": "160 x 66 x 106 mm | Peso: 280g"
    },
    reviews: [
      {
        author: "Guilherme Santos",
        date: "19/10/2026",
        rating: 5,
        title: "A melhor tecnologia de controle da história",
        comment: "Os gatilhos adaptáveis nos jogos compatíveis são de explodir a cabeça. Conectei no PC via cabo e no Steam funciona com todos os recursos."
      },
      {
        author: "Carla Pires",
        date: "06/10/2026",
        rating: 5,
        title: "Pegada perfeita e bateria excelente",
        comment: "Muito confortável nas mãos, botões super responsivos e o touchpad é super prático. Qualidade Sony indiscutível."
      }
    ]
  },
  {
    id: 9,
    name: "Webcam Logitech C920",
    cat: "Streaming",
    price: 379.90,
    old: null,
    img: "assets/webcam-gamer.jpg",
    tag: "new",
    rating: 4.7,
    rev: 650,
    shortDesc: "Vídeo Full HD 1080p a 30fps, lente de vidro Full HD com autofoco rápido e dois microfones estéreo integrados.",
    description: "A Logitech C920 HD Pro é o padrão ouro de câmeras para criadores de conteúdo, streamers da Twitch/YouTube e reuniões executivas. Com lente de vidro de cinco elementos e foco automático de alta precisão, ela captura imagens nítidas com cores fiéis. A correção automática de iluminação RightLight 2 ajusta o ganho em ambientes com pouca luz, garantindo que você esteja sempre visível e profissional.",
    specs: {
      "Resolução Máxima": "Full HD 1080p / 30 fps ou 720p / 60 fps",
      "Lente": "Vidro Full HD com 5 elementos de alta precisão",
      "Foco": "Foco automático (Autofocus) de alta velocidade",
      "Campo de Visão (FoV)": "78 graus diagonal",
      "Microfones": "Dois microfones estéreo omnidirecionais integrados",
      "Correção de Luz": "Logitech RightLight 2 com ajuste dinâmico em baixa luminosidade",
      "Clipe de Fixação": "Clipe universal ajustável para monitores, laptops e rosca para tripé 1/4\"",
      "Cabo": "USB 2.0 integrado de 1.5 metros de comprimento",
      "Software": "Suporte a Logitech G HUB e Logi Capture"
    },
    reviews: [
      {
        author: "Arthur Lemos",
        date: "13/10/2026",
        rating: 5,
        title: "Excelente para lives e gravações",
        comment: "A qualidade da imagem em 1080p é sensacional, o foco não fica caçando e ela prende com firmeza em cima do monitor."
      },
      {
        author: "Priscila Antunes",
        date: "27/09/2026",
        rating: 4,
        title: "Muito nítida mesmo com pouca luz",
        comment: "A correção de luz automática me surpreendeu. O microfone quebra um galho enorme caso você ainda não tenha um dedicado."
      }
    ]
  },
  {
    id: 10,
    name: "Microfone HyperX QuadCast",
    cat: "Streaming",
    price: 649.90,
    old: 799.90,
    img: "assets/microfone-gamer.jpg",
    tag: "hot",
    rating: 4.8,
    rev: 430,
    shortDesc: "Microfone condensador USB com 4 padrões polares, shock mount antivibração integrado, pop filter e sensor tap-to-mute.",
    description: "O HyperX QuadCast é o microfone autônomo ideal para streamers, podcasters e gamers que buscam áudio com qualidade de estúdio profissional. Ele conta com sua própria base shock mount com elásticos amortecedores para silenciar ruídos de digitação e batidas na mesa, além de pop filter interno embutido. Com o conveniente sensor Tap-to-Mute no topo, basta um toque suave para mutar, enquanto a iluminação LED vermelha indica o status ativo instantaneamente.",
    specs: {
      "Cápsulas": "3 condensadores de 14mm",
      "Padrões Polares": "Estéreo, Omnidirecional, Cardioide e Bidirecional",
      "Taxa de Amostragem": "48 kHz / 16-bit de resolução profissional",
      "Resposta de Frequência": "20 Hz – 20.000 Hz",
      "Sensibilidade": "-36dB (1V/Pa a 1kHz)",
      "Recursos Especiais": "Sensor Tap-to-Mute com indicador LED, seletor de ganho na base",
      "Isolamento": "Shock mount embutido com suspensão elástica",
      "Saída de Áudio": "Conector 3.5mm para monitoramento em tempo real sem latência",
      "Conexão": "USB Type-A para Mini-USB (cabo de 3m incluso)",
      "Compatibilidade": "PC, Mac e PS4/PS5 (Certificado Discord e TeamSpeak)"
    },
    reviews: [
      {
        author: "Henrique Duarte",
        date: "14/10/2026",
        rating: 5,
        title: "Qualidade de estúdio na sua mesa!",
        comment: "O som da voz fica encorpado e a função de mutar tocando em cima é genial, não faz aquele clique de botão no áudio de quem está ouvindo."
      },
      {
        author: "Larissa Bueno",
        date: "04/10/2026",
        rating: 5,
        title: "Design lindo e captação perfeita",
        comment: "O shock mount absorve todas as vibrações da mesa. Os 4 padrões polares ajudam muito para gravar podcasts com duas pessoas."
      }
    ]
  },
  {
    id: 11,
    name: "SSD NVMe 1TB Samsung 980",
    cat: "Hardware",
    price: 549.90,
    old: 699.90,
    img: "assets/ssd-gamer.jpg",
    tag: "sale",
    rating: 4.9,
    rev: 760,
    shortDesc: "Velocidades de leitura de até 7.000 MB/s, interface PCIe 4.0 NVMe M.2 2280 com controle térmico inteligente.",
    description: "Desbloqueie o potencial máximo do seu PC gamer ou PlayStation 5 com o SSD Samsung 980 PRO PCIe 4.0 NVMe. Alimentado pelo controlador interno Elpis e memória V-NAND de ponta da Samsung, ele atinge velocidades de leitura sequencial de até 7.000 MB/s, reduzindo drasticamente o tempo de carregamento de jogos e a renderização de texturas pesadas. O revestimento de níquel no controlador e o dissipador de calor térmico evitam o superaquecimento.",
    specs: {
      "Capacidade": "1 TB (1.000 GB)",
      "Formato": "M.2 2280 (80 x 22 x 2.38 mm)",
      "Interface": "PCIe Gen 4.0 x4, NVMe 1.3c (retrocompatível com PCIe 3.0)",
      "Leitura Sequencial": "Até 7.000 MB/s",
      "Gravação Sequencial": "Até 5.000 MB/s",
      "Leitura Aleatória (4KB, QD32)": "Até 1.000.000 IOPS",
      "Controlador": "Samsung In-House Elpis Controller revestido a níquel",
      "Memória Flash": "Samsung V-NAND 3-bit MLC",
      "Durabilidade": "600 TBW (Terabytes Gravados) ou 5 anos de garantia de fábrica",
      "Compatibilidade": "Desktop PC, Laptops compatíveis e Sony PlayStation 5"
    },
    reviews: [
      {
        author: "Vinicius Borges",
        date: "16/10/2026",
        rating: 5,
        title: "Instalei no PS5 e ficou perfeito!",
        comment: "Carrega jogos do PS5 e do PC em piscar de olhos. Velocidade medida no teste do console bateu 6.550 MB/s. Vale cada centavo."
      },
      {
        author: "Marcelo Dias",
        date: "08/10/2026",
        rating: 5,
        title: "Sem comparação em desempenho",
        comment: "O Windows inicia em 4 segundos e o carregamento do Forza Horizon 5 é instantâneo. Software Samsung Magician é muito completo."
      }
    ]
  },
  {
    id: 12,
    name: "Caixa de Som Gamer Redragon",
    cat: "Áudio",
    price: 199.90,
    old: null,
    img: "assets/caixa-som-gamer.jpg",
    tag: "new",
    rating: 4.4,
    rev: 310,
    shortDesc: "Sistema 2.0 estéreo com potência de 6W RMS, iluminação RGB com modos de cor e controle de volume integrado.",
    description: "As caixas de som Redragon Anvil GS520 elevam a ambientação do seu setup com som estéreo cristalino e iluminação RGB dinâmica. Com design angulado para direcionar o áudio diretamente aos ouvidos do usuário, seus alto-falantes aprimorados entregam graves encorpados e agudos definidos para jogos, filmes e músicas. Possui iluminação RGB em zigue-zague com múltiplos modos alternáveis por toque e alimentação USB prática plug & play.",
    specs: {
      "Potência Nominal": "6W RMS (2x 3W de alta eficiência acústica)",
      "Canais de Áudio": "2.0 Estéreo com drivers full-range",
      "Resposta de Frequência": "150 Hz – 20.000 Hz",
      "Relação Sinal-Ruído (SNR)": "≥ 65 dB",
      "Iluminação": "RGB Chroma dinâmico com modos de iluminação alternáveis",
      "Controles": "Botão de volume analógico frontal e botão de toque para controle de RGB",
      "Conexão de Áudio": "P2 (3.5mm) padrão estéreo",
      "Alimentação": "USB 5V (Plug & Play, sem necessidade de tomada externa)",
      "Dimensões": "82 x 96 x 180 mm por caixa | Peso: 820g (par)"
    },
    reviews: [
      {
        author: "Diego Farias",
        date: "12/10/2026",
        rating: 5,
        title: "Surpreendeu muito pelo tamanho!",
        comment: "Volume bem alto sem chiar e o efeito das luzes RGB na frente é muito estiloso. Fica linda ao lado do monitor."
      },
      {
        author: "Ana Beatriz",
        date: "02/10/2026",
        rating: 4,
        title: "Ótima para o dia a dia",
        comment: "Compacta, cabe certinho embaixo do monitor e não precisa de tomada, basta ligar na USB do PC. Muito prática."
      }
    ]
  }
];


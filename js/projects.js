/* ==========================================================================
   S & A — CATÁLOGO DE PROJETOS
   --------------------------------------------------------------------------
   Toda a área de Projetos (home, catálogo, filtros e páginas individuais) é
   gerada a partir desta lista. Para adicionar, editar ou remover um projeto,
   altere apenas este arquivo.

   ⚠ IMPORTANTE
   Os projetos abaixo são EXEMPLOS PROVISÓRIOS com fotografias de referência
   (Unsplash). Eles NÃO são trabalhos executados pela S & A e estão marcados
   com `provisorio: true`. Substitua pelos projetos reais assim que possível.

   COMO ADICIONAR UM PROJETO
   1. Copie um bloco { ... } inteiro e cole no fim da lista.
   2. Troque o `slug` (identificador da URL: só letras minúsculas, números e
      hífens, sem acentos). Ex.: 'cozinha-residencia-silva'
      A página ficará em: pages/projeto.html?p=cozinha-residencia-silva
   3. Escolha a `categoria` usando um dos ids de CATEGORIAS (abaixo).
   4. Coloque as fotos em assets/images/projetos/<slug>/ e informe o caminho
      a partir da raiz do site. Ex.: 'assets/images/projetos/cozinha-silva/01.webp'
   5. Remova `provisorio: true` quando o conteúdo for real.

   IMAGENS
   - `src` aceita:
       'assets/images/...'      → arquivo do próprio site (recomendado)
       'unsplash:<id-da-foto>'  → imagem provisória hospedada no Unsplash
   - `alt` descreve a imagem para acessibilidade e SEO. Sempre preencha.
   - A primeira imagem da galeria pode ser a mesma da capa, ou não.
   ========================================================================== */

/* ---------- Categorias (ordem = ordem dos filtros) ---------- */
window.CATEGORIAS = [
  { id: 'cozinhas',     nome: 'Cozinhas' },
  { id: 'dormitorios',  nome: 'Dormitórios' },
  { id: 'salas',        nome: 'Salas de estar' },
  { id: 'banheiros',    nome: 'Banheiros' },
  { id: 'closets',      nome: 'Closets' },
  { id: 'home-offices', nome: 'Home offices' },
  { id: 'comerciais',   nome: 'Ambientes comerciais' },
  { id: 'mobiliario',   nome: 'Mobiliário personalizado' }
];

/* ---------- Projetos ---------- */
window.PROJETOS = [
  {
    slug: 'cozinha-nogueira-e-pedra',
    titulo: 'Cozinha em nogueira e pedra',
    categoria: 'cozinhas',
    destaque: true,
    provisorio: true,
    local: 'Tangará da Serra, MT',
    resumo: 'Marcenaria em tom nogueira com frentes contínuas e bancada em pedra clara.',
    descricao: [
      'Armários em tom nogueira do piso ao teto organizam a cozinha em planos contínuos, com a bancada em pedra clara equilibrando o conjunto.',
      'Os eletros ficam integrados à marcenaria e um nicho iluminado sobre a bancada cria um ponto de apoio para o dia a dia.'
    ],
    materiais: ['MDF padrão amadeirado (nogueira)', 'Bancada em pedra clara', 'Puxadores embutidos'],
    detalhes: ['Frentes alinhadas do piso ao teto', 'Nicho iluminado sobre a bancada', 'Torre de eletros integrada'],
    capa: { src: 'unsplash:1765371515325-b6611765dfad', alt: 'Cozinha com armários em madeira nogueira e bancada de pedra clara' },
    galeria: [
      { src: 'unsplash:1765371515325-b6611765dfad', alt: 'Cozinha com armários em madeira nogueira e bancada de pedra clara' },
      { src: 'unsplash:1765371515651-faa86f08f0ae', alt: 'Detalhe da bancada com revestimento em mármore e armários em madeira' },
      { src: 'unsplash:1611600700192-d87eaeed4f81', alt: 'Textura de madeira com veios marcados' }
    ]
  },
  {
    slug: 'cozinha-ilha-carvalho',
    titulo: 'Cozinha com ilha em carvalho',
    categoria: 'cozinhas',
    destaque: true,
    provisorio: true,
    local: 'Tangará da Serra, MT',
    resumo: 'Ilha central com bancada clara, armários amadeirados e área de refeições integrada.',
    descricao: [
      'A ilha central concentra preparo e refeições rápidas, com banquetas e bancada clara em contraste com os armários amadeirados.',
      'Gavetões amplos guardam panelas e utensílios, e o painel da coifa mantém a leitura limpa das paredes.'
    ],
    materiais: ['MDF padrão carvalho', 'Bancada em superfície clara', 'Ferragens com amortecimento'],
    detalhes: ['Ilha com banquetas', 'Gavetões para panelas', 'Painel para coifa'],
    capa: { src: 'unsplash:1666003449012-61951d621555', alt: 'Cozinha com ilha branca, banquetas e armários em madeira clara' },
    galeria: [
      { src: 'unsplash:1666003449012-61951d621555', alt: 'Cozinha com ilha branca, banquetas e armários em madeira clara' },
      { src: 'unsplash:1631048835473-73c7aaf86096', alt: 'Armários de cozinha em madeira com cuba e bancada' },
      { src: 'unsplash:1502005097973-6a7082348e28', alt: 'Cozinha clara com ilha e armários próximos a uma porta de vidro' }
    ]
  },
  {
    slug: 'dormitorio-casal-painel-ripado',
    titulo: 'Dormitório de casal com painel em madeira',
    categoria: 'dormitorios',
    destaque: true,
    provisorio: true,
    local: 'Tangará da Serra, MT',
    resumo: 'Cabeceira em painel amadeirado, criados suspensos e marcenaria integrada à arquitetura.',
    descricao: [
      'O painel em madeira escura envolve a cabeceira de parede a parede e recebe criados-mudos suspensos.',
      'A iluminação embutida no painel cria uma luz indireta e acolhedora para o fim do dia.'
    ],
    materiais: ['MDF padrão amadeirado escuro', 'Laca fosca', 'Iluminação em LED'],
    detalhes: ['Painel de cabeceira de parede a parede', 'Criados-mudos suspensos', 'Fita de LED embutida'],
    capa: { src: 'unsplash:1789132782848-74945d8699a8', alt: 'Dormitório com painel de cabeceira em madeira escura e cama de casal' },
    galeria: [
      { src: 'unsplash:1789132782848-74945d8699a8', alt: 'Dormitório com painel de cabeceira em madeira escura e cama de casal' },
      { src: 'unsplash:1791140841972-0dd2ac12eb33', alt: 'Quarto com cama estofada escura e marcenaria em madeira' },
      { src: 'unsplash:1552558636-f6a8f071c2b3', alt: 'Cabeceira com planta e luz natural' }
    ]
  },
  {
    slug: 'sala-painel-tv-amadeirado',
    titulo: 'Sala com painel e rack amadeirados',
    categoria: 'salas',
    destaque: true,
    provisorio: true,
    local: 'Tangará da Serra, MT',
    resumo: 'Painel de TV em madeira com rack suspenso e linhas horizontais contínuas.',
    descricao: [
      'Um painel amadeirado organiza a parede da TV, com rack suspenso e fiação totalmente oculta.',
      'Portas com abertura por toque e prateleiras em balanço mantêm as linhas horizontais contínuas.'
    ],
    materiais: ['MDF padrão amadeirado', 'Rack suspenso', 'Passa-fios embutido'],
    detalhes: ['Fiação oculta', 'Portas com abertura por toque', 'Prateleiras em balanço'],
    capa: { src: 'unsplash:1587023705107-290e07a2355a', alt: 'Sala com painel de madeira escura e rack amadeirado claro' },
    galeria: [
      { src: 'unsplash:1587023705107-290e07a2355a', alt: 'Sala com painel de madeira escura e rack amadeirado claro' },
      { src: 'unsplash:1738168259543-d0c58e2b91ed', alt: 'Painel de televisão em madeira com detalhe ripado' },
      { src: 'unsplash:1772475329864-e30a2f1278c0', alt: 'Sala clara com sofá e marcenaria baixa' }
    ]
  },
  {
    slug: 'closet-aberto-iluminado',
    titulo: 'Closet aberto com iluminação embutida',
    categoria: 'closets',
    destaque: false,
    provisorio: true,
    local: 'Tangará da Serra, MT',
    resumo: 'Módulos abertos, gaveteiros e iluminação integrada às prateleiras.',
    descricao: [
      'Módulos abertos, gaveteiros e cabideiros distribuídos para que tudo fique à vista e ao alcance.',
      'Perfis de LED em cada prateleira valorizam as peças e facilitam o uso a qualquer hora.'
    ],
    materiais: ['MDF padrão amadeirado', 'Perfis de LED', 'Corrediças telescópicas'],
    detalhes: ['Iluminação por prateleira', 'Gaveteiro central', 'Espelho integrado'],
    capa: { src: 'unsplash:1672137233327-37b0c1049e77', alt: 'Closet com módulos abertos, espelho e iluminação embutida' },
    galeria: [
      { src: 'unsplash:1672137233327-37b0c1049e77', alt: 'Closet com módulos abertos, espelho e iluminação embutida' },
      { src: 'unsplash:1708397016786-8916880649b8', alt: 'Closet escuro com nichos iluminados' },
      { src: 'unsplash:1778731660196-1b57aa0f7ef5', alt: 'Prateleiras de closet com bolsas e organizadores' }
    ]
  },
  {
    slug: 'banheiro-gabinete-madeira',
    titulo: 'Banheiro com gabinete em madeira',
    categoria: 'banheiros',
    destaque: false,
    provisorio: true,
    local: 'Tangará da Serra, MT',
    resumo: 'Gabinete suspenso amadeirado com gavetas e bancada clara.',
    descricao: [
      'Gabinete suspenso em MDF resistente à umidade, com gavetas e puxadores em perfil escuro.',
      'A bancada clara e as linhas retas deixam o banheiro leve e fácil de manter.'
    ],
    materiais: ['MDF resistente à umidade', 'Puxadores verticais', 'Bancada clara'],
    detalhes: ['Gabinete suspenso', 'Gavetas com divisórias', 'Puxadores em perfil'],
    capa: { src: 'unsplash:1613849925580-8ef3bc1cf219', alt: 'Gabinete de banheiro em madeira com gavetas e puxadores pretos' },
    galeria: [
      { src: 'unsplash:1613849925580-8ef3bc1cf219', alt: 'Gabinete de banheiro em madeira com gavetas e puxadores pretos' },
      { src: 'unsplash:1712878696612-cca889b13e1d', alt: 'Banheiro com gabinete de madeira clara e duas cubas' }
    ]
  },
  {
    slug: 'cozinha-escura-detalhes-madeira',
    titulo: 'Cozinha escura com detalhes em madeira',
    categoria: 'cozinhas',
    destaque: false,
    provisorio: true,
    local: 'Tangará da Serra, MT',
    resumo: 'Contraste entre frentes escuras, madeira natural e iluminação pontual.',
    descricao: [
      'Frentes escuras e detalhes em madeira natural criam contraste e profundidade na cozinha.',
      'A iluminação pontual destaca os nichos e a bancada contínua.'
    ],
    materiais: ['MDF padrão escuro', 'MDF padrão amadeirado', 'Iluminação em LED'],
    detalhes: ['Nicho iluminado', 'Frentes sem puxador aparente', 'Bancada contínua'],
    capa: { src: 'unsplash:1771270731051-9cfbb7222946', alt: 'Cozinha moderna escura com detalhes em madeira' },
    galeria: [
      { src: 'unsplash:1771270731051-9cfbb7222946', alt: 'Cozinha moderna escura com detalhes em madeira' },
      { src: 'unsplash:1632583824020-937ae9564495', alt: 'Cozinha com balcão e bancos altos' }
    ]
  },
  {
    slug: 'home-office-estante-integrada',
    titulo: 'Home office com estante integrada',
    categoria: 'home-offices',
    destaque: false,
    provisorio: true,
    local: 'Tangará da Serra, MT',
    resumo: 'Bancada de trabalho e estante vazada em madeira clara.',
    descricao: [
      'Bancada de trabalho e estante vazada em madeira clara, pensadas para concentração e organização.',
      'Passa-cabos e gaveteiro sob a bancada mantêm a superfície livre.'
    ],
    materiais: ['MDF padrão amadeirado claro', 'Bancada em madeira', 'Passa-cabos'],
    detalhes: ['Estante vazada', 'Gaveteiro sob a bancada', 'Iluminação de apoio'],
    capa: { src: 'unsplash:1772797583328-f83bc3f94f80', alt: 'Ambiente com estante vazada em madeira clara e mesa de trabalho' },
    galeria: [
      { src: 'unsplash:1772797583328-f83bc3f94f80', alt: 'Ambiente com estante vazada em madeira clara e mesa de trabalho' },
      { src: 'unsplash:1678799192915-f11549dc13ec', alt: 'Mesa de trabalho em madeira com notebook' }
    ]
  },
  {
    slug: 'cafe-revestimento-ripado',
    titulo: 'Café com revestimento ripado',
    categoria: 'comerciais',
    destaque: false,
    provisorio: true,
    local: 'Tangará da Serra, MT',
    resumo: 'Painéis ripados, balcão de atendimento e mobiliário fixo para um ambiente comercial.',
    descricao: [
      'Painéis ripados, banco fixo e balcão de atendimento formam a identidade do ambiente comercial.',
      'Materiais de alta resistência garantem durabilidade para o uso intenso do dia a dia.'
    ],
    materiais: ['Painel ripado amadeirado', 'MDF de alta resistência', 'Laminado'],
    detalhes: ['Banco fixo estofado', 'Balcão de atendimento', 'Painéis acústicos'],
    capa: { src: 'unsplash:1565650839149-2c48a094196c', alt: 'Café com parede revestida em ripas de madeira e banco fixo' },
    galeria: [
      { src: 'unsplash:1565650839149-2c48a094196c', alt: 'Café com parede revestida em ripas de madeira e banco fixo' },
      { src: 'unsplash:1726835498689-b4f6dbcdbdfb', alt: 'Balcão comercial em madeira escura com iluminação pendente' }
    ]
  },
  {
    slug: 'aparador-sob-medida',
    titulo: 'Aparador sob medida',
    categoria: 'mobiliario',
    destaque: false,
    provisorio: true,
    local: 'Tangará da Serra, MT',
    resumo: 'Peça avulsa desenhada para o espaço, com portas ripadas e base recuada.',
    descricao: [
      'Aparador desenhado para o espaço, com portas ripadas e base recuada que dá leveza à peça.',
      'Prateleiras internas reguláveis e abertura por toque completam o desenho.'
    ],
    materiais: ['MDF padrão amadeirado', 'Lâmina natural', 'Base recuada'],
    detalhes: ['Portas ripadas', 'Prateleiras internas reguláveis', 'Abertura por toque'],
    capa: { src: 'unsplash:1594580701468-e5678582b8ce', alt: 'Aparador de madeira com vaso e planta' },
    galeria: [
      { src: 'unsplash:1594580701468-e5678582b8ce', alt: 'Aparador de madeira com vaso e planta' },
      { src: 'unsplash:1713810958247-01dbd76b4a61', alt: 'Detalhe de móvel em madeira com frente ripada' }
    ]
  }
];

# Imagens provisórias — lista para substituição

Todas as fotografias abaixo são **imagens de referência** do banco gratuito Unsplash (licença Unsplash: uso livre, inclusive comercial, sem necessidade de crédito).
Elas **não mostram trabalhos da S & A** e devem ser trocadas pelas fotos reais da empresa.

No site, cada uma aparece com a etiqueta "Imagem provisória" enquanto `mostrarMarcadoresProvisorios: true` em `js/config.js`.

Para ver qualquer imagem, abra: `https://images.unsplash.com/photo-<ID>?w=1600`

## Recomendações para as fotos definitivas

- Formato **WebP** (ou AVIF), qualidade 75–82. Ferramenta gratuita: https://squoosh.app
- Largura: **2400 px** para imagens grandes (hero, capas); **1600 px** para galerias; **1000 px** para materiais.
- Nomes descritivos, sem acentos e espaços: `cozinha-residencia-silva-01.webp`.
- Pastas: `assets/images/projetos/<slug-do-projeto>/`, `assets/images/materiais/`, `assets/images/sobre/`, `assets/images/marcas/`.

## 1. Imagens fixas nas páginas (HTML)

Para trocar: abra o arquivo indicado, procure o ID e substitua toda a tag `<img ...>` por, por exemplo:
`<img src="assets/images/sobre/oficina-01.webp" alt="Descrição da foto" loading="lazy" width="1600" height="2000">`
(nas páginas dentro de `pages/`, use `../assets/...`). Depois remova `data-provisorio="imagem"` do elemento pai.

| Arquivo | ID Unsplash | Uso / descrição |
|---|---|---|
| `index.html` | `1666003449012-61951d621555` | Cozinha planejada com ilha clara, banquetas e armários em madeira |
| `index.html` | `1512972972907-6d71529c5e92` | Ambiente minimalista com mobiliário baixo em madeira e luz natural |
| `index.html` | `1659930087003-2d64e33181f7` | Mãos trabalhando uma peça de madeira com plaina manual |
| `pages/sobre.html` | `1597960194599-22929afc25b1` | Oficina de marcenaria com bancadas, ferramentas e luz natural |
| `pages/sobre.html` | `1788296817269-8df0458ab799` | Oficina de marcenaria com peças de madeira em produção |
| `pages/sobre.html` | `1679797850019-3d0d8659a695` | Marceneiro ajustando uma peça de madeira na bancada |
| `pages/sobre.html` | `1497218770144-3fea6dbc33fe` | Formões e ferramentas de marcenaria sobre madeira clara |
| `pages/sobre.html` | `1590880795696-20c7dfadacde` | Ferramentas organizadas em uma oficina de marcenaria |

## 2. Imagens nos dados (projetos e materiais)

Troque `src: 'unsplash:ID'` por `src: 'assets/images/...'` no arquivo indicado.

| Arquivo | ID Unsplash | Descrição |
|---|---|---|
| `js/projects.js` | `1765371515325-b6611765dfad` | Cozinha com armários em madeira nogueira e bancada de pedra clara |
| `js/projects.js` | `1765371515325-b6611765dfad` | Cozinha com armários em madeira nogueira e bancada de pedra clara |
| `js/projects.js` | `1765371515651-faa86f08f0ae` | Detalhe da bancada com revestimento em mármore e armários em madeira |
| `js/projects.js` | `1611600700192-d87eaeed4f81` | Textura de madeira com veios marcados |
| `js/projects.js` | `1666003449012-61951d621555` | Cozinha com ilha branca, banquetas e armários em madeira clara |
| `js/projects.js` | `1666003449012-61951d621555` | Cozinha com ilha branca, banquetas e armários em madeira clara |
| `js/projects.js` | `1631048835473-73c7aaf86096` | Armários de cozinha em madeira com cuba e bancada |
| `js/projects.js` | `1502005097973-6a7082348e28` | Cozinha clara com ilha e armários próximos a uma porta de vidro |
| `js/projects.js` | `1789132782848-74945d8699a8` | Dormitório com painel de cabeceira em madeira escura e cama de casal |
| `js/projects.js` | `1789132782848-74945d8699a8` | Dormitório com painel de cabeceira em madeira escura e cama de casal |
| `js/projects.js` | `1791140841972-0dd2ac12eb33` | Quarto com cama estofada escura e marcenaria em madeira |
| `js/projects.js` | `1552558636-f6a8f071c2b3` | Cabeceira com planta e luz natural |
| `js/projects.js` | `1587023705107-290e07a2355a` | Sala com painel de madeira escura e rack amadeirado claro |
| `js/projects.js` | `1587023705107-290e07a2355a` | Sala com painel de madeira escura e rack amadeirado claro |
| `js/projects.js` | `1738168259543-d0c58e2b91ed` | Painel de televisão em madeira com detalhe ripado |
| `js/projects.js` | `1772475329864-e30a2f1278c0` | Sala clara com sofá e marcenaria baixa |
| `js/projects.js` | `1672137233327-37b0c1049e77` | Closet com módulos abertos, espelho e iluminação embutida |
| `js/projects.js` | `1672137233327-37b0c1049e77` | Closet com módulos abertos, espelho e iluminação embutida |
| `js/projects.js` | `1708397016786-8916880649b8` | Closet escuro com nichos iluminados |
| `js/projects.js` | `1778731660196-1b57aa0f7ef5` | Prateleiras de closet com bolsas e organizadores |
| `js/projects.js` | `1613849925580-8ef3bc1cf219` | Gabinete de banheiro em madeira com gavetas e puxadores pretos |
| `js/projects.js` | `1613849925580-8ef3bc1cf219` | Gabinete de banheiro em madeira com gavetas e puxadores pretos |
| `js/projects.js` | `1712878696612-cca889b13e1d` | Banheiro com gabinete de madeira clara e duas cubas |
| `js/projects.js` | `1771270731051-9cfbb7222946` | Cozinha moderna escura com detalhes em madeira |
| `js/projects.js` | `1771270731051-9cfbb7222946` | Cozinha moderna escura com detalhes em madeira |
| `js/projects.js` | `1632583824020-937ae9564495` | Cozinha com balcão e bancos altos |
| `js/projects.js` | `1772797583328-f83bc3f94f80` | Ambiente com estante vazada em madeira clara e mesa de trabalho |
| `js/projects.js` | `1772797583328-f83bc3f94f80` | Ambiente com estante vazada em madeira clara e mesa de trabalho |
| `js/projects.js` | `1678799192915-f11549dc13ec` | Mesa de trabalho em madeira com notebook |
| `js/projects.js` | `1565650839149-2c48a094196c` | Café com parede revestida em ripas de madeira e banco fixo |
| `js/projects.js` | `1565650839149-2c48a094196c` | Café com parede revestida em ripas de madeira e banco fixo |
| `js/projects.js` | `1726835498689-b4f6dbcdbdfb` | Balcão comercial em madeira escura com iluminação pendente |
| `js/projects.js` | `1594580701468-e5678582b8ce` | Aparador de madeira com vaso e planta |
| `js/projects.js` | `1594580701468-e5678582b8ce` | Aparador de madeira com vaso e planta |
| `js/projects.js` | `1713810958247-01dbd76b4a61` | Detalhe de móvel em madeira com frente ripada |
| `js/materials.js` | `1644931551533-02906718127f` | Textura de madeira clara com veio suave |
| `js/materials.js` | `1736506159776-22ca388780fa` | Textura de madeira em tom médio e quente |
| `js/materials.js` | `1546484396-fb3fc6f95f98` | Textura de madeira escura |
| `js/materials.js` | `1576092762791-dd9e2220abd1` | Tábuas de madeira em tons naturais |
| `js/materials.js` | `1611600700192-d87eaeed4f81` | Madeira com veios marcados e nós |
| `js/materials.js` | `1611072337226-1140ab367200` | Superfície de madeira natural clara |
| `js/materials.js` | `1566041510394-cf7c8fe21800` | Superfície de mármore branco com veios cinza |
| `js/materials.js` | `1787602525716-3c36be37d5fb` | Superfície de pedra cinza clara |
| `js/materials.js` | `1600422086908-72be2c8f5f3f` | Gaveta em madeira com puxador embutido |
| `js/materials.js` | `1789381565624-cf9c65b7c2ba` | Puxadores verticais pretos em porta de madeira clara |
| `js/materials.js` | `1693892985308-44965a6060d1` | Puxadores metálicos projetando sombra em porta de madeira |

## 3. Imagem de compartilhamento

- `assets/images/og-image.jpg` (1200 × 630) — gerada com a logo sobre a cor areia. Pode ser substituída por uma foto de projeto com a logo.

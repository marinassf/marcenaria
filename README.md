# S & A Móveis Planejados — Website

Site institucional e portfólio da S & A Móveis Planejados (Tangará da Serra — MT).
Feito em **HTML5, CSS3 e JavaScript puro** — sem frameworks, sem etapa de build.
Funciona em qualquer hospedagem estática.

---

## Estrutura

```
sa-moveis/
├── index.html                 Home
├── 404.html                   Página "não encontrada"
├── pages/
│   ├── projetos.html          Catálogo com filtros
│   ├── projeto.html           Página individual (projeto.html?p=slug)
│   ├── sobre.html
│   ├── materiais.html
│   └── contato.html           Orçamento e contato
├── css/
│   ├── fonts.css              Carregamento das fontes (@font-face)
│   └── style.css              Estilos, organizados por seções numeradas
├── js/
│   ├── config.js              ★ WhatsApp, Instagram, e-mail, formulário
│   ├── projects.js            ★ Projetos e categorias
│   ├── materials.js           ★ Marcas de MDF e padrões de exemplo
│   ├── script.js              Núcleo: header, menu, animações, contatos
│   ├── render.js              Catálogo, página de projeto, materiais, lightbox
│   └── form.js                Validação e envio do formulário
├── assets/
│   ├── logos/                 Logo vetorizada (escura e clara) + paleta
│   ├── fonts/                 Noka (inserir) + fontes secundárias
│   ├── icons/                 Favicon e ícones
│   ├── video/                 Vídeo do hero (hero.mp4)
│   └── images/                Fotos do site (projetos, materiais, sobre, marcas)
├── IMAGENS-PROVISORIAS.md     Lista de todas as imagens a substituir
├── sitemap.xml · robots.txt · site.webmanifest
└── .htaccess · _headers       Cabeçalhos de segurança (Apache / Netlify)
```

Arquivos marcados com ★ são os que você vai editar no dia a dia.

---

## 1. Abrir o projeto no computador

**Opção rápida:** dê dois cliques em `index.html`. O site abre no navegador.

**Recomendado (servidor local)** — evita qualquer restrição do navegador com arquivos locais:

```bash
# no Terminal, dentro da pasta sa-moveis
python3 -m http.server 8000
```

Depois acesse **http://localhost:8000**. Para parar, `Ctrl + C`.

Alternativa no VS Code: extensão **Live Server** → botão "Go Live".

> As imagens provisórias vêm do Unsplash pela internet. Sem conexão elas não aparecem.

---

## 2. Logo

A logo oficial foi **vetorizada (SVG) sem alterar o desenho**, a partir dos arquivos enviados:

| Arquivo | Uso |
|---|---|
| `assets/logos/logo-sa-horizontal.svg` | Header (fundo claro) |
| `assets/logos/logo-sa-horizontal-claro.svg` | Footer e menu mobile (fundo escuro) |
| `assets/logos/logo-sa-vertical(-claro).svg` | Versão empilhada |
| `assets/logos/logo-sa-monograma(-claro).svg` | Monograma S&A |

**Para trocar pela versão oficial em vetor** (recomendado, caso exista o arquivo original em .ai/.svg):
exporte em SVG e substitua os arquivos acima **mantendo os mesmos nomes**. Nada mais precisa mudar.
O favicon fica em `assets/icons/` (`favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`).

---

## 3. Tipografia Noka

A Noka (Blackletra) é uma fonte **comercial**: não pode ser baixada gratuitamente de forma legítima.
Ela está disponível na [Fontspring](https://www.fontspring.com/fonts/blackletra/noka) e no [Adobe Fonts](https://fonts.adobe.com/fonts/noka).
Verifique se a licença cobre uso em **website**.

O site já está configurado para a Noka. Enquanto os arquivos não forem inseridos, usa a reserva provisória *Urbanist*.

**Opção A — arquivos próprios (Fontspring ou similar)**
1. Coloque os arquivos em `assets/fonts/noka/` com estes nomes:
   `Noka-Light.woff2`, `Noka-Regular.woff2`, `Noka-Medium.woff2` (e `Noka-SemiBold.woff2`, opcional).
2. Se vierem em `.otf`/`.ttf`, converta para `.woff2` (ex.: cloudconvert.com) ou altere a extensão em `css/fonts.css`.
3. Pronto — recarregue o site.

**Opção B — Adobe Fonts (assinatura Creative Cloud)**
1. Em fonts.adobe.com, crie um *Web Project* com a Noka e copie o link do tipo
   `<link rel="stylesheet" href="https://use.typekit.net/xxxxxxx.css">`.
2. Cole esse link no `<head>` de todas as páginas, logo **antes** de `css/fonts.css`.
3. Confira no projeto da Adobe o nome da família (normalmente `"noka"`). Em `css/style.css`,
   na variável `--font-display`, deixe: `"noka", "Noka", "Noka Reserva", ...`.

**Fontes secundárias (já incluídas, licença livre OFL):**
*Instrument Sans* (textos, navegação, formulários). A *Instrument Serif* está incluída na pasta de fontes, mas não é usada nesta versão.

---

## 4. WhatsApp, Instagram, e-mail e localização

Tudo fica em **`js/config.js`**:

```js
whatsapp: '5565999998888',          // só números: 55 + DDD + número
whatsappMensagem: 'Olá! Conheci a S & A pelo site...',
instagram: 'https://instagram.com/seuperfil',
instagramUsuario: '@seuperfil',
email: 'contato@seudominio.com.br',
telefoneExibicao: '(65) 99999-8888',
endereco: '',  mapaUrl: '',  horario: '',
```

- Campos vazios ficam **ocultos** no site (nada é inventado).
- Enquanto o `whatsapp` estiver vazio, os botões de WhatsApp levam ao formulário de contato.
- Em cada página de projeto, o botão de WhatsApp já abre com uma mensagem citando o projeto.

---

## 5. Formulário de orçamento

O formulário valida os campos, aceita até 5 imagens de referência e está pronto para um serviço de envio.

1. Crie um formulário gratuito em um destes serviços: **Formspree** (formspree.io), Getform, Basin ou FormSubmit.
   Ative o recebimento de **arquivos anexos** se quiser receber as imagens (no Formspree, recurso dos planos pagos).
2. Copie o endereço do formulário (ex.: `https://formspree.io/f/abcdwxyz`).
3. Em `js/config.js`: `formEndpoint: 'https://formspree.io/f/abcdwxyz'`.

**Sem endpoint configurado**, o site **não simula o envio**: mostra "O envio pelo site ainda não está ativo"
e oferece WhatsApp/e-mail com os dados já preenchidos (quando esses contatos estiverem configurados).

Campos enviados: `nome`, `telefone`, `email`, `ambiente`, `descricao`, `dimensoes`, `referencia`, `consentimento`, `anexos[]`.

---

## 6. Projetos

Arquivo: **`js/projects.js`**. Toda a área de projetos (home, catálogo, filtros e páginas individuais) vem daqui.

> ⚠ Os 10 projetos atuais são **exemplos provisórios** com fotos de referência. Não representam trabalhos da S & A.

**Adicionar um projeto**
1. Salve as fotos em `assets/images/projetos/<slug>/` (ex.: `01.webp`, `02.webp`...).
2. Copie um bloco `{ ... }` em `PROJETOS` e edite:

```js
{
  slug: 'cozinha-residencia-silva',          // vira a URL: projeto.html?p=cozinha-residencia-silva
  titulo: 'Cozinha Residência Silva',
  categoria: 'cozinhas',                     // um dos ids de CATEGORIAS
  destaque: true,                            // aparece na home (até 4)
  local: 'Tangará da Serra — MT',
  resumo: 'Frase curta que resume o projeto.',
  descricao: ['Primeiro parágrafo.', 'Segundo parágrafo.'],
  materiais: ['MDF ...', 'Bancada ...'],
  detalhes: ['...', '...'],
  capa:    { src: 'assets/images/projetos/cozinha-residencia-silva/01.webp', alt: 'Descrição da foto' },
  galeria: [
    { src: 'assets/images/projetos/cozinha-residencia-silva/01.webp', alt: '...' },
    { src: 'assets/images/projetos/cozinha-residencia-silva/02.webp', alt: '...' }
  ]
}
```

3. Não inclua `provisorio: true` em projetos reais (essa marca exibe as etiquetas de conteúdo provisório).
4. Adicione a URL do novo projeto em `sitemap.xml`.

**Editar / remover:** altere ou apague o bloco correspondente. A ordem da lista é a ordem do catálogo,
e a navegação "anterior / próximo" segue essa mesma ordem.

**Categorias:** edite `CATEGORIAS` no topo de `js/projects.js`. O `id` é usado nos projetos e na URL
(`projetos.html?categoria=cozinhas`); o `nome` é o texto exibido. Filtros, contadores e o campo
"Tipo de ambiente" do formulário são atualizados automaticamente.

---

## 7. Marcas com que trabalhamos (página Marcas / materiais.html)

Arquivo: **`js/materials.js`**. A seção Materiais da home e a página de Materiais mostram
apenas as marcas de MDF com que a S & A trabalha e alguns padrões de exemplo de cada uma.

```js
window.MARCAS_MDF = [
  { nome: 'Guararapes', descricao: 'Painéis de MDF',
    padroes: ['Carvalho Natural', 'Ipê', 'Imbuia', 'Alecrim', 'Tijolo', 'Fulgê'] },
  { nome: 'Duratex', descricao: 'Painéis de MDF',
    padroes: ['Carvalho Hanover', 'Carvalho Berlim', 'Carvalho Avelã', 'Rovere Marsala', 'Pau Ferro Natural', 'Branco Diamante'] }
];
```

- Para outra marca, copie um bloco `{ ... }` e edite nome e padrões.
- Os padrões atuais vieram dos catálogos dos fabricantes: confira se continuam em linha
  e troque pelos que a S & A mais utiliza.

## 7.1 Vídeo do hero

A abertura da home toca um vídeo curto, sem som, em loop. Hoje é um vídeo **provisório**
(Mixkit #43033, licença gratuita), carregado direto do servidor do Mixkit.

Para usar o vídeo próprio: salve o arquivo como **`assets/video/hero.mp4`** — ele passa a ter
prioridade automaticamente. Recomendado: 8–15 s, MP4 (H.264), 1920 × 1080, até ~6 MB
(o HandBrake, gratuito, comprime com a predefinição "Web").
A imagem exibida enquanto o vídeo carrega é o atributo `poster` da tag `<video>` em `index.html`.
O vídeo tem botão Pausar/Reproduzir e não toca automaticamente para quem ativou "reduzir movimento".

## 8. Imagens provisórias

Consulte **`IMAGENS-PROVISORIAS.md`**: lista cada imagem de referência, onde está e como substituir.

- Imagens nos dados (projetos/materiais): troque `src: 'unsplash:ID'` por `src: 'assets/images/...'`.
- Imagens fixas no HTML (hero, sobre, home): substitua a tag `<img>` indicada.
- Formato recomendado: **WebP**, 1600–2400 px de largura (https://squoosh.app).
  Todas as imagens fora da primeira dobra já usam `loading="lazy"`.

**Etiquetas "Imagem provisória":** estão desligadas (`mostrarMarcadoresProvisorios: false` em `js/config.js`).
Para ver de novo quais imagens ainda são provisórias, mude para `true`.
Os trechos de texto provisório no HTML estão marcados com `data-provisorio="texto"` — procure por esse termo.

---

## 9. Textos

Os textos estão diretamente nos arquivos HTML. Trechos sem informação confirmada (histórico da empresa,
etapas do processo, fotos da produção) estão marcados como provisórios. **Não foram inventados números,
anos de experiência, depoimentos, certificações ou parcerias.**

---

## 10. Publicar o site

Antes de publicar:
1. Substitua `https://www.seudominio.com.br` pelo domínio real em **todos os arquivos**
   (busca e substituição no VS Code: `Cmd + Shift + H`): HTML, `sitemap.xml`, `robots.txt` e `js/config.js`.
2. Configure WhatsApp, Instagram, e-mail e o `formEndpoint` em `js/config.js`.

**Netlify (gratuito, mais simples):** app.netlify.com → *Add new site → Deploy manually* → arraste a pasta `sa-moveis`.
Depois, em *Domain settings*, conecte o domínio.

**Cloudflare Pages / Vercel / GitHub Pages:** suba a pasta como está; não há comando de build.

**Hospedagem tradicional (cPanel, Hostinger, HostGator, Locaweb):** envie **o conteúdo** da pasta
`sa-moveis` para `public_html/` via Gerenciador de Arquivos ou FTP. O `.htaccess` já configura a página 404 e o cache.

Depois de publicar: cadastre o site no **Google Search Console** e envie o `sitemap.xml`.
Vale também criar/atualizar o **Perfil da Empresa no Google** (Google Maps) com o link do site.

---

## Notas técnicas

- **Direção visual:** fundo café escuro, tipografia em grande escala, foto de tela cheia na abertura, texto que acende conforme a rolagem, imagem que se expande, cards em duas colunas desencontradas, filosofia em blocos de cor e rodapé terracota com a marca em tamanho grande. Cada seção define seu tema com `data-theme="dark | light | sand | clay"`; o header troca de cor sozinho sobre seções claras.

- **Acessibilidade:** HTML semântico, link "pular para o conteúdo", foco visível, menu com `aria-expanded`
  e retenção de foco, lightbox com teclado (← → Esc) e toque, campos com mensagens de erro associadas.
- **Movimento:** animações discretas; todas desativadas com `prefers-reduced-motion`.
- **Transição entre páginas:** View Transitions nativas (Chrome/Edge/Safari recentes) com alternativa em JS.
- **SEO:** título e descrição por página (e por projeto), Open Graph, `canonical`, dados estruturados
  de empresa local (`HomeAndConstructionBusiness`, apenas com informações confirmadas), `sitemap.xml`, `robots.txt`.
- **Segurança:** sem dependências externas de JavaScript; conteúdo dinâmico escapado; campo *honeypot*
  anti-spam no formulário; cabeçalhos de segurança em `.htaccess` / `_headers`.
- **Compatibilidade:** navegadores modernos (Chrome, Safari, Edge, Firefox — versões atuais).
# marcenaria
# marcenaria

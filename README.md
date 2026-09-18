# Tenurima™ – Landing page (Desafio Dev XMX · Etapa 2)

Landing page do suplemento **Tenurima (Blood Pressure Support)**, feita do zero a partir da descrição seção por seção de um layout de referência no Figma e dos assets exportados dele.

- **Stack:** HTML semântico · CSS puro (mobile-first, custom properties) · JavaScript vanilla
- **Sem dependências:** nada de framework, biblioteca de UI, jQuery nem build step
- **Responsivo** de 360px a 1920px, sem scroll horizontal
- **Sem erros no console**, **0 violações no axe-core** (WCAG 2 A/AA + best practices)

---

## Como rodar

Não precisa instalar nada. Clone o repositório e escolha uma opção:

```bash
# Opção 1: abrir o arquivo direto no navegador
start index.html          # Windows  (macOS: open index.html · Linux: xdg-open index.html)

# Opção 2 (recomendada): servidor estático local
python -m http.server 8080      # ou: npx serve .
# e acesse http://localhost:8080
```

### Scripts auxiliares (opcionais)

| Comando | O que faz |
| --- | --- |
| `node tools/check-links.mjs` | Confere **todos** os `href`/`src` locais de todas as páginas **e** as imagens usadas pelo `script.js`: se o arquivo existe (pega erros de digitação como `contact.hmtl`), se a âncora `#id` existe, se há `href` vazio ou `#` solto e se toda `<img>` tem `alt`. Sai com código 1 se achar algum problema. Precisa de Node 18+. |
| `python tools/optimize-images.py` | Gera as versões `.webp` dos `.png` em `assets/img/`. Precisa de Pillow. |
| `node tools/generate-assets.mjs` | Gera os dois SVGs que não vieram do Figma: ícone do logo e favicon. |

## Estrutura

```
├── index.html            # landing page (12 seções)
├── styles.css            # todo o CSS, organizado em seções numeradas
├── script.js             # menu mobile, marquee, accordion, carrossel
├── contact.html          # páginas de destino dos links do footer / garantia
├── terms.html · privacy.html · disclaimer.html · reference.html · refund.html · shipping.html
├── checkout.html         # destino placeholder dos 3 botões BUY NOW
├── assets/img/           # assets do Figma (.png + .webp) e SVGs pequenos
└── tools/                # verificador de links, otimizador de imagens, gerador de SVGs
```

---

## Assets do Figma

Usei os arquivos exportados do Figma diretamente, sem recriar à mão nada que já existia como imagem. **Renomeei os arquivos** porque espaços e parênteses em URL (`Mockup-Tenurima-1 (1).png`, `2148492240 1.png`) são frágeis: exigem `%20`, quebram em alguns servidores e são fáceis de digitar errado. Nada foi editado nas imagens.

| Arquivo original | Arquivo no repositório | Onde é usado |
| --- | --- | --- |
| `Mockup-Tenurima-1-1.png` (versão nítida) | `hero-bottle` | Hero |
| `Mockup-Tenurima-1 (1).png` (pacote anterior) | `bottle-basic` | Pote do About (caixa de 475,97px) e card BASIC (exibida 2x) |
| `produto.png` | `why-product-pedestal` | Centro da seção Why |
| `pote.png` | `pack-6-bottles` | Card MOST POPULAR |
| `pote (1).png` | `pack-3-bottles` | Card BUNDLE |
| `Frame 1707480045.png` | `about-composition` | About (composição pronta) |
| `2148492240 1.png` | `about-woman-capsule` | About: foto de apoio (960×640, opacity .6, luminosity), recortada pela máscara `about-photo-mask.png` |
| `Mask group.png` (about) | `about-mask.png` → `about-photo-mask.png` | O export do grupo já vem com máscara e opacidades aplicadas; a máscara usada no CSS é o alfa dele dividido pela opacidade da foto (.6), ou seja, o formato da máscara com os .4 do grupo |
| `2148729868 1.png` | `why-couple-running` | Fundo da seção Why |
| `ing-1.png` … `ing-6.png` | `ing-hawthorn`, `ing-garlic`, `ing-olive-leaf`, `ing-hibiscus`, `ing-vitamin-b6`, `ing-vitamin-b12` | Cards de ingredientes, na ordem pedida |
| `dep-1-tenurima 1.png` … `dep-tenurima-4 1.png` | `testimonial-michael`, `-susan`, `-walter`, `-diane` | Carrossel de depoimentos |
| `rotulo-tenurima.png` | `label-supplement-facts` | Rótulo abaixo do FAQ |
| `selo.svg` | `seal-guarantee.svg` | Selo da garantia |
| `check.svg` · `scroll.svg` | `icon-check-circle.svg` · `icon-scroll.svg` | Checks do card do hero · seta de rolagem |
| `shipping.png` · `made.png` | `seal-free-shipping.png` · `badge-made-in-usa.png` | Banner de frete · card do hero |
| `image 1.png` · `pck-cards 1.png` | `btn-buy-now.png` · `payment-cards.png` | Botão BUY NOW · bandeiras de pagamento (3 cards) |
| `b1.png`, `b3.svg`–`b6.svg` | `badge-heart.png`, `badge-capsule.svg`, `badge-gauge.svg`, `badge-circulation.svg`, `badge-lungs.svg` | Ícones das badges da seção Why |
| `pill.png` · `pill-1.png` | `hero-capsule-1.png` · `hero-capsule-2.png` | Cápsulas do hero (a nítida à esquerda do pote, a desfocada à direita) |
| `hero/Mockup-Tenurima-1.png` | `hero-bottle-back.png` | Pote de trás do hero (já vem desfocado e inclinado do Figma) |
| `Rectangle.png` | `about-blood-cell.png` | Glóbulo vermelho decorativo no About |
| `beneficios/30008 1.png` · `3146 1.png` · `2151847309 1.png` | `texture-heart-vessels.png` · `texture-vessels.png` · `texture-ecg-chest.png` | Texturas de fundo do hero (as duas últimas também em Why e no banner de frete) |
| `home/30008 1.png` | `texture-hero-vessels.png` | **Não usado.** Tem o mesmo nome do `30008` de benefícios, mas a textura que aparece na `Home.png` é a de benefícios (confirmado por correlação de imagem com o export) |
| `svg1494.png` | `icon-heart-small.png` | **Não usado** — ver nota abaixo |
| `Group 1.png` · `usa.png` | `logo-mark.png` · `badge-made-in-usa.png` | Logo (header e rodapé) · selo do card do hero |
| `divisor.png` | — | Não usei o arquivo: a mesma aba (870 → 744px de largura, 55px de altura no desktop) é feita com `clip-path` no hero, que acompanha qualquer largura |

- **WebP + fallback PNG:** cada imagem é servida com `<picture>`, tendo o `.webp` como fonte principal e o `.png` original como fallback. As imagens ficaram de **70% a 96% menores** (a foto do casal foi de 1 MB para 66 KB).
- **`loading="lazy"` em todas as imagens, menos no hero**, que tem `fetchpriority="high"` e `preload` do WebP. Toda imagem tem `width`/`height` para evitar layout shift.
- **`alt` descritivo e específico por imagem**, escrito olhando cada arquivo (ex.: "Bowl with green olives, olive leaves and a small bottle of olive oil"), e nunca repetido. As únicas exceções com `alt=""` são decorativas: o ícone do logo (o link já tem `aria-label`) e a **segunda cópia** do pote no card BASIC (a primeira descreve "Two bottles…").
- **WebP só acima de 30 KB:** ícones e selos pequenos ficam como estão, porque a conversão não compensa e evita duplicar arquivo à toa.
- **Texturas em alta:** as três texturas do hero, o logo e o selo "Made in the USA" foram reimportados da pasta `home` (resoluções maiores que as do primeiro pacote).
- **Não veio no pacote e continua gerado por script:** só o favicon.

### Camadas de fundo com as medidas da referência
As três texturas do hero e as duas da seção de benefícios usam **exatamente** as coordenadas, tamanhos, opacidades e `mix-blend-mode` do layout (ex.: `30008 1.png` em 1500×841, `top: -32`, `left: 947`, `opacity: .6`, `luminosity`), com `object-fit: cover` (o "Fill" do Figma).

Valores do Figma aplicados no hero: `2151847309 1.png` com 867×494,19 em top -1 / left 473, luminosity, dentro de um frame de 570×596 em top 51 / left 670 com opacidade 0,3 (o frame vira máscara na própria imagem, com as bordas dissolvidas porque a `Home.png` não mostra o contorno); `30008 1.png` com 1500×841 em top -32 / left 947, opacidade 0,6, luminosity e `backdrop-filter: blur(6px)`.

No hero a ordem é a do Figma: **gradiente (`--gradient-hero`) → texturas em `luminosity` → escurecimento vertical → conteúdo**. O contêiner das texturas não tem `z-index`, senão isolaria o blend e o `luminosity` não enxergaria o gradiente. O escurecimento (`.hero::after`) existe nos exports: a base do hero é `#150005` uniforme em toda a largura, cobrindo as texturas; as paradas dele foram medidas pixel a pixel na `Home.png` e na referência mobile. As bordas das texturas são dissolvidas com `mask-image`, porque na referência nenhuma mostra o contorno retangular.

As posições são calculadas a partir de um ponto de ancoragem da composição, não da borda esquerda da tela: no desktop, a borda direita do conteúdo (onde o pote se alinha), com escala acompanhando a coluna do pote; na coluna única (abaixo de 1024px), o centro do pote, que fica a uma distância fixa da base do hero.

### Três decisões sobre os assets que valem destaque
- **Falta o ícone `b2`.** A seção Why tem 6 badges e vieram 5 ícones (`b1`, `b3`–`b6`). Identificando cada um: `b1` coração com pulso, `b3` cápsula, `b4` medidor de pressão, `b5` circulação, `b6` pulmões — todos casam direto com 5 das frases. Sobrou "Helps maintain energy and overall wellness", e para ela **reutilizei o `b1` (coração/pulso)**, que é o mais próximo de energia e bem-estar geral. É a única repetição de ícone na página.
- **`Mockup-Tenurima-1.png` (628×628) é o pote de trás do hero**, e por isso já vem desfocado: no export os dois potes são arquivos diferentes, com inclinações próprias. O `Mockup-Tenurima-1-1.png` (650×650) é o pote da frente, já inclinado — nenhum dos dois recebe rotação ou filtro por CSS.
- **`svg1494.png` não é envelope nem carrinho:** é um **coração anatômico branco** de 24px. Cheguei a usá-lo no hero, mas os exports do Figma mostram "60 Day Money-Back Guarantee" como texto puro e o "Contact Us" com envelope, então ele ficou **sem uso**. O arquivo segue no repositório, caso o design confirme onde ele entra.

---

## Decisões tomadas (onde a descrição era omissa ou ambígua)

### Valores visuais
- **A paleta oficial do projeto está no topo do `styles.css`** (`:root`), com os nomes definidos no guia de identidade: `--color-wine-950`, `--color-red-900`, `--color-green-500`, `--color-yellow-600`, `--color-gray-*`, os off-whites e os gradientes da referência. Logo abaixo dela ficam apelidos semânticos (`--red-700`, `--wine-900`…) que o resto do CSS usa, então trocar um valor da paleta reflete na página inteira.
- **Layout medido contra os exports.** Tipografia, espaçamentos, larguras de container, tamanho dos botões e altura das seções foram ajustados comparando screenshot a screenshot com `Desktop.png` (1920px) e `Mobile.png` (360px). Depois do ajuste, a altura total ficou em 8.250px no desktop (referência: 8.108px) e 9.663px no mobile (referência: 8.426px — a diferença vem das 3 perguntas extras do FAQ, da transcrição do rótulo e do corpo de texto um pouco maior, itens listados abaixo).
- **Espaçamentos, tamanhos de fonte e raios continuam aproximados**, mas agora conferidos contra os **exports do Figma por seção** (Home, Sobre, Ingredientes, Benefícios, Depoimentos, Preço e FAQ), comparando screenshot a screenshot.
- **Fundo do hero:** `#150005` (valor do Figma) com o gradiente do `figma-spec-start.md` (`#80161A` → `#150005`). O spec indica 135deg, mas nos pixels do export o tom claro está no canto **superior direito**; com `45deg, #150005 → #80161A` o topo do export bate com diferença de poucos pontos por canal, então usei 45deg.
- **O gradiente da seção Why entra escurecido** (uma camada `rgb(21 0 5 / .84)` por cima, mais um brilho radial atrás do produto). Aplicados puros, eles ficavam muito mais claros que o Figma, onde as duas seções são quase pretas com um halo vermelho no produto.
- O hero usa **o mesmo container do resto da página** (1200px). Cheguei a alargar para 1440px, mas medindo o export de 1920px o conteúdo ocupa ~1200px — só a imagem do produto e o card avançam um pouco para fora.
- Fonte: **Montserrat** (400/500/600/700/800) em toda a página, via `<link>` do Google Fonts com `preconnect` e `display=swap`. Títulos de seção em 600 e 36px no desktop, como na especificação.
- **Dois ajustes de contraste dentro da paleta:** `#FF2D2D` como **texto** sobre branco dá 3,7:1 (abaixo dos 4,5:1 exigidos), então textos em vermelho usam o `#C1121F` da própria paleta e o `#FF2D2D` fica nos ícones e elementos gráficos. O mesmo vale para os textos pequenos em verde, que usam o `--green-dark` (`#116800`).
- Três tokens da paleta ficam no `:root` **só como referência**: `--gradient-seal`, `--gradient-save-badge` e `--gradient-yellow-btn`. Esses elementos (selo da garantia, badge "SAVE $X" e botão BUY NOW) já vêm prontos como imagem do Figma.

### Seção por seção
| Seção | Decisão | Por quê |
| --- | --- | --- |
| **Header** | **Fixo no topo na landing** (`.site-header--fixed`): transparente sobre o hero e com fundo `#150005` a 97% (mais sombra) depois de 8px de rolagem. As páginas internas mantêm o header no fluxo. | O pedido exige header fixo. O export só mostra o estado inicial, sobre o hero; sem fundo, o texto branco sumiria sobre as seções claras. `scroll-padding-top` igual à altura do header faz as âncoras pararem logo abaixo dele. |
| **Header** | **Menu hambúrguer abaixo de 1024px**, à direita do "Contact Us": abre um painel com os 4 links; fecha ao escolher um link, com Esc (o foco volta ao botão) ou clicando fora. Ao abrir, o foco vai para o primeiro link. Sem JS o botão não aparece. | O pedido exige hambúrguer; o `Mobile.png` não tem um (mostra só logo + "Contact Us"), então o botão e o painel são desenho meu, no estilo do header. |
| **Header** | Nav com **"Ingredientes"** (marcado com `lang="pt"`), entre "Price", "Testimonials" e "FAQ". | É o texto do export e do pedido. |
| **Hero** | A base do hero é uma **aba central** (laterais retas, formato do `divisor.png`) feita com `clip-path`; as medidas ficam em `--hero-cut-*` no `:root`. A seção seguinte sobe por baixo da aba, então os recortes mostram o `#F4F4F4` dela. | Resolve sem SVG extra e escala entre as medidas do mobile (31px de altura) e do desktop (55px). |
| **Hero** | **Composição com as coordenadas do export** (pote da frente 650px em x 791 / y 89; pote de trás, cápsulas, glóbulo e card posicionados em relação a ele) e uma única escala `--mu` para potes, card e texturas: 1 a partir de 1280px, .74 em 1024px, .7 e .6 nas faixas de tablet e .43 no mobile. | Mantém a composição inteira proporcional em qualquer largura, sem o card cobrir o pote nem sair da tela. |
| **Hero** | A mancha vermelha atrás do card é o **`Rectangle.png`** (glóbulo vermelho, o mesmo arquivo do About), que está na pasta do hero do Figma. | Antes era uma cápsula branca tingida por filtro CSS; o asset certo existia. |
| **Hero** | Checks do card **vazados**, em `#29EA02` (cor amostrada), desenhados como ícone SVG. | O `check.svg` exportado é um círculo preenchido, mas o `Desktop.png` mostra o contorno. |
| **Hero** | **Três camadas de textura** empilhadas sobre o gradiente, todas discretas: a foto com ECG cobrindo a seção (`.1`, `luminosity`), o coração/vasos concentrado atrás do produto (`.14`, com `mask` radial) e os vasos em zoom (`.16`) deslocados para a direita e girados `-8deg`. | No Figma as texturas são quase imperceptíveis e se acumulam no lado do produto; fortes demais competiam com o título. |
| **Hero** | O card de benefícios fica **à direita, escuro e translúcido** (`#00000033` + `backdrop-filter: blur(12px)`), com texto branco. | É o que o Figma mostra: vidro escuro sobre a foto, não um card branco sólido. |
| **Hero** | No mobile o card flutuante fica **abaixo da imagem, sobreposto em parte**. A partir de 768px ele flutua sobre a imagem. | Em 360px, sobre a imagem, ele cobriria o produto. |
| **About** | A **foto da senhora vai ao fundo, em tons de cinza** (`filter: grayscale(1)`, como descrito no layout), e a **composição pronta** (`Frame 1707480045.png`) fica sobreposta na base, com posições em %. | A arte escala proporcionalmente em qualquer largura. O cinza da foto destaca o vermelho do pote e do sistema circulatório. |
| **Ingredients** | 1 coluna < 600px · 2 colunas ≥ 600px · 3 colunas ≥ 1024px. Card cinza com **entalhe semicircular no topo**, feito com `mask-image: radial-gradient(...)` **num pseudo-elemento** (`::before`), e o ícone por cima. | É o formato do Figma. A máscara precisa ficar no pseudo-elemento: aplicada no card, ela recortava também o ícone. |
| **Ingredients** | O **ORDER NOW fica depois do grid**, e a seção Why não tem botão no topo. | É o que os exports mostram. O briefing pedia o botão no topo da Why; segui o design e o total de CTAs continua o mesmo. |
| **Why** | **No mobile a ordem é título → badges → produto** (no desktop, badges / produto / badges). | É a ordem do `Mobile.png`; antes eu colocava o produto antes das badges. |
| **Why** | Chanfro no **topo** da seção, espelhando o corte do hero, e eyebrow acima do título. | O export mostra os dois. No Figma o eyebrow diz "INGREDIENTS", o que parece erro de copiar/colar do design — usei **"BENEFITS"**, que é o conteúdo real da seção. |
| **Why choose** | No mobile, produto no topo e as 6 badges empilhadas (2 colunas a partir de 600px). No desktop, 3 colunas: badges / produto / badges. Foto do casal com baixa opacidade e `mix-blend-mode: luminosity` sobre o gradiente vinho. | Layout lateral não cabe em telas estreitas. O blend mantém a foto "desbotada" no tom da seção. |
| **Marquee** | **Velocidade constante de 50px/s** (a duração é calculada pela largura do conteúdo), easing `linear`, pausa no hover, parada com `prefers-reduced-motion`. | Com duração fixa, a velocidade mudaria conforme a tela. `linear` é o único easing que não "engasga" no reinício do loop. |
| **Marquee** | **Componente reutilizável:** a mesma marcação com `data-marquee` é inicializada por `initMarquee()` para cada ocorrência. O JS clona o grupo até cobrir a largura + 1 grupo e anima exatamente a largura de **um** grupo, então o loop não tem salto. Os clones têm `aria-hidden`. O container tem `overflow: hidden` + `width: 100%`, e ainda há `overflow-x: clip` no `body`. | Evita o vazamento para fora da viewport em telas largas. O recálculo usa `ResizeObserver` e `document.fonts.ready`, então vale também para 1920px+ e depois da troca de fonte. |
| **Testimonials** | **Exatamente 4 depoimentos** no array `TESTIMONIALS` (`script.js`), com as 4 fotos reais. **1 card por vez < 1024px e 2 por vez ≥ 1024px.** Avança **1 card por clique**, sem loop: a seta fica vermelha quando a ação está disponível e branca/desabilitada no fim. Também tem bolinhas de paginação, teclado (← →) e swipe. | O carrossel de fato passa pelos 4 (Michael+Susan → Susan+Walter → Walter+Diane). Sem loop, o usuário sabe quando viu todos. O número de cards por vez vem de `--per-view` no CSS, então o breakpoint fica num só lugar. |
| **Testimonials** | **1 por vez até 1024px** (e não só no mobile). **Sem autoplay.** | Em 768px dois cards com foto ao lado ficariam espremidos. Autoplay atrapalha a leitura e exigiria botão de pausa (WCAG 2.2.2). |
| **Testimonials** | **No mobile o card é vertical** (foto em cima, texto embaixo); a partir de 600px a foto vai para o lado. | É o formato do `Mobile.png`. |
| **Testimonials** | A foto fica **colada na borda do card** (sem respiro) e, a partir de 1280px, as **setas saem para as laterais** — a da esquerda branca com seta vermelha, a da direita vermelha. Abaixo disso elas voltam para baixo do carrossel, junto com as bolinhas. | É o layout do Figma. Abaixo de 1280px não há espaço fora do container: em 1024px as setas passavam da viewport (peguei isso no teste de overflow). |
| **Pricing** | Preço com os **centavos sobrescritos** (`$79` + `.98`), títulos em caixa alta e total no formato do Figma: `TOTAL: $358 $159.96` (valor cheio arredondado, sem casas). | Bate com o export; antes eu mostrava `$357.96`, que era o valor exato mas não o do layout. |
| **Pricing** | **BASIC:** o asset tem 1 pote só, então **exibo a mesma imagem duas vezes, levemente sobrepostas via CSS**, para representar "2 bottles". A segunda cópia é `aria-hidden` com `alt=""`. | Comunica a quantidade certa sem editar a imagem. A limitação é que os dois potes são idênticos. |
| **Pricing** | **MOST POPULAR e BUNDLE:** as imagens já trazem a faixa "FREE SHIPPING" e o selo "SAVE $…", então **não repeti esses elementos em HTML**. A informação continua acessível no `alt` e na lista de benefícios ("Fast & Free Shipping"). | Evita badge duplicado na tela. |
| **Pricing** | No mobile os cards ficam **em duas colunas internas** (imagem à esquerda; preço, benefícios, botão e total à direita) e na ordem **MOST POPULAR → BUNDLE → BASIC**. No desktop voltam a ser uma coluna centralizada, na ordem BASIC → MOST POPULAR (com `scale(1.06)`) → BUNDLE. | É o que o `Mobile.png` e o `Desktop.png` mostram. O layout em duas colunas usa `grid-template-areas`, com `min-width: 0` nos itens — sem isso o card passava da tela em 360px. |
| **Pricing** | Os **3 BUY NOW** apontam para `checkout.html?package=2-bottles` (ou `3-bottles` / `6-bottles`). O `checkout.html` mostra o pacote escolhido. Cada botão tem texto oculto para leitor de tela ("– 6 bottles for $299.88"). | Nenhum CTA sem destino. Em produção, basta trocar pela URL da plataforma de pagamento. |
| **Pricing** | Os **totais foram calculados**: preço cheio de **$178.98/pote**, que é o único valor que gera exatamente as economias dos selos ($774 no de 6 e $327 no de 3). | Consistência entre preço, total riscado e selo "SAVE". |
| **Guarantee** | Usa o **`selo.svg` do Figma via `<img>`** (não inline), com `alt` descritivo. | O SVG tem ~24 KB de paths; como `<img>` ele entra no cache e não pesa no HTML. |
| **Pricing** | O **BUY NOW é a imagem `image 1.png` dentro de um `<a href>` de verdade**, com `alt` que diz o pacote e o preço ("Buy now – 6 bottles of Tenurima for $299.88"), `:focus-visible` no link e o mesmo efeito de hover dos outros botões. | Usa o asset como pedido sem repetir o bug nº 1 do diagnóstico (imagem de botão sem link). O `alt` garante que o leitor de tela anuncie o destino. |
| **Texturas** | As três texturas entram como `<img>` decorativo (`alt=""`) em camada de fundo, com opacidade baixa e `mix-blend-mode` (`screen` no hero, `soft-light` na Why, `luminosity` no banner de frete). | Como `<img>` elas respeitam `loading="lazy"` e o `<picture>`/WebP; o blend integra a foto ao gradiente vinho em vez de "colar" um retângulo. |
| **Hero** | As duas cápsulas (`pill.png`, `pill-1.png`) flutuam com uma animação suave de 6s, desligada em `prefers-reduced-motion`. | Dá movimento sutil ao produto sem distrair de leitura. |
| **FAQ** | **8 perguntas:** as 5 pedidas + dosagem, efeitos colaterais e local de fabricação. Só um item aberto por vez, e dá para fechar todos. O primeiro começa aberto. A animação usa `grid-template-rows: 0fr → 1fr` (0.35s, `cubic-bezier(.22,.61,.36,1)`). Setas ↑ ↓, Home e End navegam entre as perguntas. | Animar `grid-template-rows` dá altura automática sem medir o conteúdo com JS. A resposta fechada fica com `visibility: hidden`, então sai da árvore de acessibilidade. |
| **FAQ** | Os listeners são anexados só depois de `DOMContentLoaded`, e o estado é sincronizado com o `aria-expanded` do HTML. **Sem JS, todas as respostas ficam visíveis** (classe `no-js`). | Evita FAQ "morto" por erro de binding. |
| **Rótulo** | `rotulo-tenurima.png` usado **como está**. Dois extras: **clicar abre a imagem em tamanho real** (em 360px o texto do rótulo fica pequeno demais) e um **`<details>` "Read the label as text"** com a transcrição (tabela semântica). | O `alt` resume a imagem, mas não dá para colocar um rótulo inteiro num `alt`. A transcrição fica recolhida, então não muda o visual. |
| **Footer / páginas** | As páginas legais, de contato e de checkout ficam **na raiz** (`contact.html` etc.), com layout próprio simples. | O enunciado pede exatamente `href="contact.html"`. Os nomes são conferidos por `tools/check-links.mjs`. |

### Conteúdo inventado ou completado (suposições)
- **Textos do hero, do About e dos cards de preço** são agora os **do Figma** (chegaram com os exports das seções e substituíram o que eu havia escrito).
- **Ingredientes:** as 6 descrições são agora **o texto real do layout** (as de hibisco, B6 e B12 chegaram depois, completas, e substituíram o texto que eu havia escrito enquanto estavam cortadas no print).
- **Depoimentos 3 e 4 são placeholder:** *Walter J., 71 – Georgia* e *Diane K., 58 – Arizona*, nome e fala, escolhidos para combinar com as fotos `dep-tenurima-3` e `dep-tenurima-4`. Michael R. e Susan L. usam os nomes e falas do briefing.
- **O texto da garantia e o disclaimer do rodapé** vieram dos exports (`Desktop.png` / `Mobile.png`) e substituíram os que eu havia escrito.
- **Textos das respostas do FAQ** (menos a primeira, que veio no enunciado) **e das páginas legais** foram escritos com base no rótulo do produto (ex.: "one capsule twice daily"). No Figma as respostas do FAQ estão como placeholder (`[produto] is a dietary supplement in [entregável] form…`), então escrevi respostas reais. As páginas legais têm um aviso de placeholder visível.
- **O FAQ tem 8 perguntas** (o Figma mostra 5). O briefing pedia "5+", e as três extras — dosagem, efeitos colaterais e local de fabricação — saem do rótulo.
- **Contato:** o e-mail `support@tenurima.com` é o que aparece no rótulo; o horário de atendimento é fictício.

---

## Bugs do diagnóstico (biogutex.com) e como esta página evita cada um

| # | Bug encontrado no site do nicho | Como foi tratado aqui |
| --- | --- | --- |
| 1 | CTA do plano mais vendido sem link (imagem sem `<a>`) | Os 3 BUY NOW são `<a class="btn">` com `href`. O `script.js` tem `auditCtas()`, que acusa no console qualquer `.btn` sem `href` ou com `#` solto, e o `check-links` falha nesse caso. |
| 2–3 | Links de checkout levando a 404 | Todo destino local é verificado por `tools/check-links.mjs` (arquivo existe + âncora existe). Os links de checkout apontam para `checkout.html`, que existe. |
| 4 | FAQ sem interação | Accordion com listeners anexados após `DOMContentLoaded`, testado clicando em navegador real. Sem JS, as respostas ficam abertas. |
| 5 | `contact.hmtl` (typo) | Todos os `href` são checados contra o sistema de arquivos pelo `check-links`. |
| 6 | Carrossel travado mostrando sempre os mesmos 2 | Carrossel com os 4 itens, testado avançando até o fim em 360px e 1440px, com a sequência de cards visíveis registrada. |
| 7 | Marquee vazando da viewport em telas largas | `overflow: hidden` + `width: 100%` no container, clones calculados pela largura real e teste de `scrollWidth === clientWidth` até 1920px. |
| Bônus | `alt` genérico repetido ("AlphaRock") | `alt` específico por imagem, escrito a partir do conteúdo de cada arquivo. |

---

## Como verifiquei

- **Navegador real (Chrome headless via DevTools Protocol)** em 360, 768, 1024, 1440 e 1920px:
  - `document.documentElement.scrollWidth === clientWidth` em todas as larguras, sem nenhum elemento passando da viewport;
  - nenhuma exceção, `console.error` ou `console.warn`;
  - carrossel: 4 slides; em 1440px a sequência visível foi Michael+Susan → Susan+Walter → Walter+Diane, e em 360px Michael → Susan → Walter → Diane, com a seta "próximo" desabilitando no fim e as 4 fotos carregando (WebP);
  - accordion: abrir um item fecha o anterior e o `aria-expanded` acompanha;
  - marquee: 3 grupos em 360px e 5 em 1920px, com a animação andando;
  - menu mobile abre e fecha, inclusive ao clicar num link;
  - transcrição do rótulo (`<details>`) abre e mostra a tabela.
- **axe-core 4.10** em 360 e 1440px: **1 violação conhecida e documentada** (o contraste da faixa vermelha no mobile, explicado na tabela acima). Antes dessa mudança de cor eram 0 violações (inclusive depois de trocar o botão BUY NOW por imagem e de aplicar a paleta oficial — foi o axe que pegou o `#FF2D2D` sem contraste como texto).
- **`tools/check-links.mjs`:** 9 páginas e 258 referências (HTML + `script.js`) sem problemas.
- Conferência visual por screenshots de página inteira e por seção em cada largura.

## Onde eu me afastei da referência (e por quê)

Cada item abaixo é uma decisão consciente, não um descuido:

| Ponto | Referência | O que fiz | Por quê |
| --- | --- | --- | --- |
| **Texto do botão verde** | Branco no `Desktop.png` | Mantive **branco** | O guia de cores pedia texto preto, mas a referência visual mostra branco, e a regra combinada é que a referência manda. |
| **Faixa vermelha (marquee)** | `#FF2D2D` com texto branco pequeno | Mantive a cor e o texto exatos | No mobile isso dá 3,7:1 de contraste (o mínimo é 4,5:1) e o axe acusa. Preferi a fidelidade numa faixa decorativa a inventar outra cor; levaria ao design a sugestão de escurecer para `#D20606`, que passa. É a **única** violação de contraste da página. |
| **Corpo de texto no mobile** | ~12,5px | **14px** | 12,5px num container de 360px fica no limite da legibilidade; 14px mantém a proporção do layout e a leitura. |
| **FAQ** | 5 perguntas | **8 perguntas** | O briefing pedia "5+"; as três extras (dosagem, efeitos colaterais, fabricação) saem do rótulo. |
| **Menu no mobile** | Só logo + "Contact Us" | Logo + "Contact Us" + **hambúrguer** | O pedido exige menu hambúrguer funcional; o botão é o único elemento do header que não está no export. |
| **Header fixo** | Estado inicial, sobre o hero | Fixo, com fundo ao rolar | Exigência do pedido; o estado rolado não existe no export. |
| **Avaliação** | "4.9/5 Customer Rating" | Igual à referência | O texto do pedido citava 4.85 e 4.92; mantive o que está no layout. |
| **Card do hero** | 3 benefícios + "Made in the USA" | Igual à referência | O texto do pedido listava 4 benefícios. |
| **Rosa do card "MOST POPULAR"** | `#F9E4E4` | Valor da especificação | — |
| **Divisor da seção de benefícios** | Retângulo branco 2761×92 | Chanfro em `clip-path` + faixa branca atrás | O recorte em ângulo é o que aparece no `Desktop.png`; a faixa branca atrás garante que o vão fique branco, como pede a especificação. |

## Limitações conhecidas

- **Contraste do botão verde:** o gradiente oficial `#35F60F → #1FA604` com texto branco fica abaixo do AA (4,5:1), mesmo com `text-shadow`. É como está na referência; o axe não acusa porque o texto é grande e em negrito, mas eu levaria ao design a sugestão de usar texto escuro.
- **BASIC com a mesma imagem duplicada:** os dois potes são idênticos; o ideal seria o Figma exportar uma imagem de 2 potes, como já existe para 3 e 6.
- **Os depoimentos são renderizados por JS**, então sem JavaScript o carrossel fica vazio (o resto da página funciona). Foi uma troca consciente para ter os dados num array só.
- A marcação do marquee se repete duas vezes no HTML, porque HTML estático não tem includes. O comportamento é um componente único no JS/CSS.
- As imagens foram exportadas em 1x; em telas retina algumas ficam levemente suaves.
- **O botão BUY NOW é uma imagem**, então o texto dele não escala com o zoom de fonte do navegador nem se adapta a outro idioma. Se fosse decisão minha, manteria o botão em HTML/CSS (como os "ORDER NOW" verdes) e usaria a imagem só como referência visual.

## O que eu faria com mais tempo

1. **Usar os valores reais do Figma** (Inspect/Dev Mode) para cores, tamanhos e espaçamentos, e exportar as imagens em **2x** para montar `srcset` com densidades (e AVIF).
2. Pedir ao design: uma **imagem de 2 potes** para o card BASIC, o **ícone `b2`** que falta e o **ícone do logo**.
3. **SCSS ou PostCSS** com parciais por seção, e **minificação** de CSS/JS num build simples (ex.: Vite).
4. **Includes** (ou um gerador estático) para header, footer e marquee, sem duplicar marcação entre as páginas.
5. **Testes automatizados** com Playwright: os mesmos testes de overflow, console e interações que rodei, mais axe e regressão visual por screenshot, rodando no **CI** (GitHub Actions) com o `check-links`.
6. **Integração real de checkout** e rastreamento dos cliques nos CTAs (analytics por pacote).
7. Revisar os pontos de contraste com o design e testar com leitores de tela reais (NVDA e VoiceOver).
8. SEO: dados estruturados `Product`/`FAQPage` (JSON-LD), Open Graph e `sitemap.xml`.

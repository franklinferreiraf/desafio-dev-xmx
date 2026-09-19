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
├── script.js             # marquee, accordion, carrossel
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
| `produto.png` | `why-product-pedestal` | Centro da seção Why: é o grupo exportado do Figma (brilho vermelho, anéis de fundo, pedestal e um pote menor), inteiro em 600×678 na posição medida no export; no desktop o `bottle-basic` (489,49px) vai por cima, como no layout final |
| `pote.png` | `pack-6-bottles` | Card MOST POPULAR |
| `pote (1).png` | `pack-3-bottles` | Card BUNDLE |
| `Frame 1707480045.png` | `about-composition` | About (composição pronta) |
| `2148492240 1.png` | `about-woman-capsule` | About: foto de apoio (960×640, opacity .6, luminosity), recortada pela máscara `about-photo-mask.png` |
| `Mask group.png` (about) | `about-mask.png` → `about-photo-mask.png` | O export do grupo já vem com máscara e opacidades aplicadas; a máscara usada no CSS é o alfa dele dividido pela opacidade da foto (.6), ou seja, o formato da máscara com os .4 do grupo |
| `2148729868 1.png` | `why-couple-running` | Fundo da seção Why: o export já é a foto recortada no frame da seção, com os .4 de opacidade no alfa (988,5×757 na origem); o grupo (opacity .3) é mascarado por um retângulo de 702×675 em 51/141 com blur de 236px, reproduzido em `why-couple-mask.png` (retângulo desfocado com σ = 118) |
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
| `beneficios/30008 1.png` · `3146 1.png` · `2151847309 1.png` | `texture-heart-vessels.png` · `texture-vessels.png` · `texture-ecg-chest.png` | Texturas de fundo do hero; o `30008` também é a textura da seção Why (1386×777 em left 556,95, luminosity, blur 5,54px; grupo mascarado por um retângulo de 702×675 em 1072/92 com blur de 236px, reproduzido em `why-texture-mask.png`; opacidade efetiva .3, medida no export) e o `2151847309` a do banner de frete |
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
- **Layout medido contra os exports.** Tipografia, espaçamentos, larguras de container, tamanho dos botões e altura das seções foram ajustados comparando screenshot a screenshot com `Desktop.png` (1920px) e `Mobile.png` (360px). Depois do ajuste, a altura total ficou em 8.250px no desktop (referência: 8.108px) e 9.663px no mobile (referência: 8.426px — a diferença vem da transcrição do rótulo e do corpo de texto um pouco maior, itens listados abaixo).
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
| **Header** | **Não é fixo:** na landing fica sobre o hero (`.site-header--overlay`, `position: absolute`), transparente, e rola junto com a página. As páginas internas mantêm o header no fluxo. | Definido na revisão do layout: o header acompanha o hero, como no export. |
| **Header** | **Sem menu mobile.** Abaixo de 1024px o header mostra só logo + "Contact Us"; os links Price / Ingredientes / Testimonials / FAQ aparecem a partir de 1024px. Os ids das seções continuam no HTML (as âncoras funcionam no desktop). | **Removido para seguir fielmente o `Mobile.png`, que não inclui navegação mobile** — decisão final, tomada após confirmação. No mobile a navegação depende da rolagem e dos CTAs (ORDER NOW / BUY NOW), sem menu de atalho para as seções. |
| **Header** | Nav com **"Ingredientes"** (marcado com `lang="pt"`), entre "Price", "Testimonials" e "FAQ". | É o texto do export e do pedido. |
| **Hero** | A base do hero é uma **aba central** (laterais retas, formato do `divisor.png`) feita com `clip-path`; as medidas ficam em `--hero-cut-*` no `:root`. A seção seguinte sobe por baixo da aba, então os recortes mostram o `#F4F4F4` dela. | Resolve sem SVG extra e escala entre as medidas do mobile (31px de altura) e do desktop (55px). |
| **Hero** | **Composição com as coordenadas do export** (pote da frente 650px em x 791 / y 89; pote de trás, cápsulas, glóbulo e card posicionados em relação a ele) e uma única escala `--mu` para potes, card e texturas: 1 a partir de 1280px, .74 em 1024px, .7 e .6 nas faixas de tablet e .43 no mobile. | Mantém a composição inteira proporcional em qualquer largura, sem o card cobrir o pote nem sair da tela. |
| **Hero** | A mancha vermelha atrás do card é o **`Rectangle.png`** (glóbulo vermelho, o mesmo arquivo do About), que está na pasta do hero do Figma. | Antes era uma cápsula branca tingida por filtro CSS; o asset certo existia. |
| **Hero** | Checks do card **vazados**, em `#29EA02` (cor amostrada), desenhados como ícone SVG. | O `check.svg` exportado é um círculo preenchido, mas o `Desktop.png` mostra o contorno. |
| **Hero** | **Três camadas de textura** sobre o gradiente, com os valores do Figma quando informados: `2151847309` (peito/ECG, `luminosity`, dentro de um frame de 570×596 com opacity .3), `30008` (coração + vasos, 1500×841, opacity .6, `luminosity`, blur 6px) e `3146` (glóbulos, `soft-light` a .12, ajustado contra o `hero-section-flat.png`). | Na referência as texturas são sutis e se concentram atrás dos frascos. |
| **Hero** | O card de benefícios fica **à direita, escuro e translúcido** (`#00000033` + `backdrop-filter: blur(12px)`), com texto branco. | É o que o Figma mostra: vidro escuro sobre a foto, não um card branco sólido. |
| **Hero** | Até 1023px (coluna única) o card fica **abaixo dos potes, sobreposto em parte**; a partir de 1024px vai para a posição do export, sobre a base do pote. | É o que o `Mobile.png` e o `Desktop.png` mostram; em coluna única, sobre o pote, ele cobriria o rótulo. |
| **About (mobile, até 1023px)** | **Mesma composição do desktop reduzida**, como no `Mobile.png` (0,487× em 360px): pote `bottle-basic` de 232px em x 11, corpo + coluna dos 4 círculos de vasos com 129px em x 184 (medidos por correlação no export), glóbulo à esquerda do pote. O bloco ocupa a **largura inteira da seção**; a foto da senhora começa fora da tela e se dissolve para a direita. Escala proporcional de 360 a 768px, fixa e centralizada até 1023px. A foto tem **mais presença que no desktop**: mesma máscara em intensidade total (`about-photo-mask-full.png`) e opacidade .7, calibrada pelo contraste do rosto no export (20 contra 20,2). | Antes a composição ficava presa à coluna de texto e a foto quase não aparecia (contraste 3× menor que o do export). |
| **About** | A partir de 1024px, **foto, pote, ilustração e glóbulo nas coordenadas do frame do Figma**, escalados por `--as` abaixo de ~1222px (o maior valor que deixa 16px entre a ilustração e o texto). A foto fica sem cor pelo `luminosity` sobre o cinza da seção. | Com as medidas fixas do desktop, em 1024px a ilustração cobria o título. |
| **Ingredients** | **Grid de linhas sutil no fundo** (linhas de 1px em `#F2F1F1`, feitas com dois `linear-gradient` em `background-image`): verticais a cada 200px no desktop e ~133,5px no mobile, horizontais na proporção 251/200, nas mesmas posições do `Desktop.png` (x 158…1758) e do `Mobile.png` (x 26 / 159,5 / 293), com espaçamento contínuo entre elas. | Estava no export e não tinha sido implementado; como fundo CSS não custa imagem nem requisição. |
| **Ingredients** | 1 coluna < 600px · 2 colunas ≥ 600px · 3 colunas ≥ 1024px. Card cinza com **entalhe semicircular no topo**, feito com `mask-image: radial-gradient(...)` **num pseudo-elemento** (`::before`), e o ícone por cima. | É o formato do Figma. A máscara precisa ficar no pseudo-elemento: aplicada no card, ela recortava também o ícone. |
| **Ingredients** | O **ORDER NOW fica depois do grid**, e a seção Why não tem botão no topo. | É o que os exports mostram. O briefing pedia o botão no topo da Why; segui o design e o total de CTAs continua o mesmo. |
| **Why** | **No mobile a ordem é título → badges → produto** (no desktop, badges / produto / badges). | É a ordem do `Mobile.png`; antes eu colocava o produto antes das badges. |
| **Why** | **Divisor do topo com os valores do Figma:** duas formas brancas de 1048,22 × 91,98 (raio 20px) em top -31, left -419 e left 1293,78 (girada 180°), com a ponta interna cortada em diagonal (medida no export). Na página, os 15px de cima do frame ficam sob a seção anterior; no mobile a aba ocupa a tela inteira e o topo fica reto, como no `Mobile.png`. Eyebrow acima do título. | O export mostra os dois. No Figma o eyebrow diz "INGREDIENTS", o que parece erro de copiar/colar do design — usei **"BENEFITS"**, que é o conteúdo real da seção. |
| **Why choose** | Mobile: 6 badges empilhadas, com espaçamento uniforme, e produto embaixo. **Tablet (600–1023px): as duas listas lado a lado (esquerda / direita), produto embaixo.** Desktop: badges / produto / badges, com o produto posicionado a partir do bloco dos cards. | Antes, no tablet, cada lista virava um grid de 2 colunas e ficava 2 + 1 badges. Ancorado no topo da seção, o pote cobria o título em 1024px. |
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
| **FAQ** | **As 5 perguntas da referência, na mesma ordem** (What is Tenurima? · When will my order arrive? · What's the refund policy? · Is it safe to buy online? · How is Tenurima different…). Só um item aberto por vez, e dá para fechar todos. O primeiro começa aberto. A animação usa `grid-template-rows: 0fr → 1fr` (0.35s, `cubic-bezier(.22,.61,.36,1)`). Setas ↑ ↓, Home e End navegam entre as perguntas. | Animar `grid-template-rows` dá altura automática sem medir o conteúdo com JS. A resposta fechada fica com `visibility: hidden`, então sai da árvore de acessibilidade. |
| **FAQ** | Os listeners são anexados só depois de `DOMContentLoaded`, e o estado é sincronizado com o `aria-expanded` do HTML. **Sem JS, todas as respostas ficam visíveis** (classe `no-js`). | Evita FAQ "morto" por erro de binding. |
| **Rótulo** | `rotulo-tenurima.png` usado **como está**, e clicar nele abre a imagem em tamanho real (em 360px o texto do rótulo fica pequeno demais). | Mesma imagem do Figma, sem edição. |
| **Rótulo — acréscimo de acessibilidade (fora do escopo do Figma)** | Abaixo da imagem há um **`<details>` "Read the label as text"** com a **transcrição do Supplement Facts em tabela semântica** (`<table>` com cabeçalhos). **Não existe no Figma.** | O rótulo é uma imagem com dezenas de valores (porção, ingredientes, quantidades, % VD). O `alt` só consegue resumir; sem a transcrição, quem usa leitor de tela (ou amplia o texto) não tem acesso a essa informação, o que fere o critério WCAG 1.1.1 (alternativa em texto para conteúdo não textual). Fica recolhido por padrão, então o visual da seção continua igual ao da referência. |
| **Footer / páginas** | As páginas legais, de contato e de checkout ficam **na raiz** (`contact.html` etc.), com layout próprio simples. | O enunciado pede exatamente `href="contact.html"`. Os nomes são conferidos por `tools/check-links.mjs`. |

### Conteúdo inventado ou completado (suposições)
- **Textos do hero, do About e dos cards de preço** são agora os **do Figma** (chegaram com os exports das seções e substituíram o que eu havia escrito).
- **Ingredientes:** as 6 descrições são agora **o texto real do layout** (as de hibisco, B6 e B12 chegaram depois, completas, e substituíram o texto que eu havia escrito enquanto estavam cortadas no print).
- **Depoimentos 3 e 4 são placeholder:** *Walter J., 71 – Georgia* e *Diane K., 58 – Arizona*, nome e fala, escolhidos para combinar com as fotos `dep-tenurima-3` e `dep-tenurima-4`. Michael R. e Susan L. usam os nomes e falas do briefing.
- **O texto da garantia e o disclaimer do rodapé** vieram dos exports (`Desktop.png` / `Mobile.png`) e substituíram os que eu havia escrito.
- **Textos das respostas do FAQ** (menos a primeira, que veio no enunciado) **e das páginas legais** foram escritos com base no rótulo do produto (ex.: "one capsule twice daily"). No Figma as respostas do FAQ estão como placeholder (`[produto] is a dietary supplement in [entregável] form…`), então escrevi respostas reais. As páginas legais têm um aviso de placeholder visível.
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

## Responsividade

### Tablet (768–1023px): o Figma não especifica, então segui o padrão mobile → desktop

A regra geral: **até 1023px a página usa a lógica do mobile (coluna única, ordem do `Mobile.png`), só mais larga; o layout em colunas do desktop começa em 1024px**, que é onde os blocos do desktop cabem sem apertar.

| Seção | Tablet (768–1023px) | Por quê |
| --- | --- | --- |
| Header | Logo + Contact Us, sem menu (nav visível a partir de 1024px) | Segue o `Mobile.png`; os 4 links + botão de 191px só cabem ao lado do logo a partir de 1024px. |
| Hero / About | Coluna única, composição do produto centralizada abaixo do texto | Mesma lógica do mobile, com a escala da composição maior. |
| Ingredients | **2 colunas** (3 a partir de 1024px) | Estado intermediário entre 1 e 3 colunas; 3 colunas em 768px deixariam o texto dos cards espremido. |
| Why | **Listas de badges lado a lado**, produto embaixo | Mantém a divisão esquerda/direita do desktop sem espremer o produto no meio. |
| Testimonials | 1 card por vez (2 a partir de 1024px) | Dois cards horizontais com foto ficariam estreitos demais. |
| Pricing | **Empilhados, na ordem do mobile, com até 520px** (3 colunas a partir de 1024px) | Entre 769 e 1023px as 3 colunas ficavam com 226–300px e cards de 733px de altura. |
| Guarantee | Selo acima do texto (lado a lado a partir de 1024px) | Ao lado do selo de 250px, a coluna do texto não comportava o botão de 396px ("ORDER / NOW"). |

### Media queries ajustadas na auditoria

| Breakpoint | Seletor | Motivo |
| --- | --- | --- |
| padrão (até 599px) | `.testimonial > picture` | Foto na proporção do `Mobile.png` (237/207), recorte no rosto; a faixa de 190px cortava a cabeça e as setas caíam sobre as estrelas. |
| `min-width: 600px` | `.testimonial > picture` | Volta à coluna de 170px do card horizontal. |
| padrão / `min-width: 600px` | `.why__stage` | Espaço entre as listas de badges igual ao dos badges. |
| `600px–1023px` | `.why__stage`, `.why__product` | Listas lado a lado, produto embaixo. |
| `600px–1023px` | `.pricing__grid`, `.price-card` | Cards empilhados até 520px. |
| `769px` → **`1024px`** | `.pricing__grid`, `.price-card__body`, destaque do MOST POPULAR | 3 colunas só quando cabem. |
| `max-width: 768px` → **`1023px`** | ordem dos cards de preço | Ordem do mobile em todo o tablet. |
| `768px` → **`1024px`** | `.guarantee__card` | Selo ao lado do texto só quando o botão cabe. |
| `min-width: 1024px` | `.about__media` (`--as`) e `.why__stage` (âncora do produto) | Composições do Figma sem cobrir os títulos entre 1024 e 1440px. |

### Pontos que ficaram como estão (decisões conscientes)

- **Coluna centralizada no mobile (como no `Mobile.png`):** a margem lateral é de 63px em 360px (coluna de ~234px, igual ao export) e diminui de forma contínua até 16px em 1024px (`--gutter` com `clamp`, sem degraus no redimensionamento). Logo + Contact Us, textos, botões verdes (na largura da coluna) e o card do hero seguem essa coluna. Duas exceções conscientes:
  - **cards de preço** podem ir até 16px da borda (continuam centralizados): no export eles têm ~235px com fontes bem menores, e com as fontes da página o conteúdo não cabia nessa largura;
  - **rating do hero** em 360px: o texto "4.9/5 Customer Rating" desce inteiro para a linha de baixo das estrelas. O export usa uma fonte mais estreita que a Montserrat; na mesma linha ele alargava a coluna.
- **Texturas do hero no mobile:** a camada de escurecimento foi recalibrada pixel a pixel contra o `Mobile.png` (depois da troca para o gradiente do spec ela tinha ficado escura demais e escondia as texturas). A faixa em que aparecem o coração e os vasos acompanha o topo do pote.
- **Prévia do próximo depoimento:** o `Mobile.png` mostra a borda do card seguinte; a página mostra 1 card inteiro, com setas, bolinhas e swipe.
- **Quebras que a auditoria marca, mas que são iguais ao Figma:** "(Pyridoxal-5- / Phosphate)", "(Cyanocobalamin)" e "GUARANTEED" em linha própria.

## Como verifiquei

- **Auditoria de responsividade (Chrome headless via DevTools Protocol)** nas **9 páginas × 6 larguras** (360, 414, 768, 1024, 1440, 1920): scroll horizontal, elementos passando da tela, texto vazando da caixa ou do botão, palavras partidas e órfãs em títulos e botões, sobreposições no fluxo, imagens com proporção diferente da natural e colunas de cada grid. Resultado final: **0 ocorrências** de scroll horizontal, overflow, texto fora de botão, imagem distorcida ou erro de console nas 54 combinações; os achados restantes foram conferidos um a um (iguais ao Figma, ou falsos positivos como a caixa de um texto em várias linhas).
- **Redimensionamento ao vivo:** a mesma página, sem recarregar, de 1920 a 320px e de volta, em passos de 8px (401 passos), verificando scroll horizontal, erros de JS, cards do carrossel cortados e o marquee: **0 problemas**.

- **Navegador real (Chrome headless via DevTools Protocol)** em 360, 768, 1024, 1440 e 1920px:
  - `document.documentElement.scrollWidth === clientWidth` em todas as larguras, sem nenhum elemento passando da viewport;
  - nenhuma exceção, `console.error` ou `console.warn`;
  - carrossel: 4 slides; em 1440px a sequência visível foi Michael+Susan → Susan+Walter → Walter+Diane, e em 360px Michael → Susan → Walter → Diane, com a seta "próximo" desabilitando no fim e as 4 fotos carregando (WebP);
  - accordion: abrir um item fecha o anterior e o `aria-expanded` acompanha;
  - marquee: 3 grupos em 360px e 5 em 1920px, com a animação andando;
  - transcrição do rótulo (`<details>`) abre e mostra a tabela.
- **axe-core 4.10** em 360 e 1440px: **1 violação conhecida e documentada** (o contraste da faixa vermelha no mobile, explicado na tabela acima). Antes dessa mudança de cor eram 0 violações (inclusive depois de trocar o botão BUY NOW por imagem e de aplicar a paleta oficial — foi o axe que pegou o `#FF2D2D` sem contraste como texto).
- **`tools/check-links.mjs`:** 9 páginas e 260 referências (HTML + `script.js`) sem problemas.
- Conferência visual por screenshots de página inteira e por seção em cada largura.

## Onde eu me afastei da referência (e por quê)

Cada item abaixo é uma decisão consciente, não um descuido:

| Ponto | Referência | O que fiz | Por quê |
| --- | --- | --- | --- |
| **Texto do botão verde** | Branco no `Desktop.png` | Mantive **branco** | O guia de cores pedia texto preto, mas a referência visual mostra branco, e a regra combinada é que a referência manda. |
| **Faixa vermelha (marquee)** | `#FF2D2D` com texto branco pequeno | Mantive a cor e o texto exatos | No mobile isso dá 3,7:1 de contraste (o mínimo é 4,5:1) e o axe acusa. Preferi a fidelidade numa faixa decorativa a inventar outra cor; levaria ao design a sugestão de escurecer para `#D20606`, que passa. É a **única** violação de contraste da página. |
| **Corpo de texto no mobile** | ~12,5px | **14px** | 12,5px fica no limite da legibilidade; com 14px na coluna de 234px os parágrafos ficam com algumas linhas a mais que no export. |
| **Transcrição do rótulo** | Só a imagem do Supplement Facts | Imagem + `<details>` "Read the label as text" com a transcrição em tabela | Acréscimo de acessibilidade (WCAG 1.1.1): o conteúdo do rótulo não cabe num `alt`. Recolhido por padrão, sem mudar o visual. |
| **Menu no mobile** | Só logo + "Contact Us" | **Igual à referência** (sem hambúrguer) | Um hambúrguer chegou a ser implementado e foi removido para seguir fielmente o `Mobile.png`. Consequência assumida: abaixo de 1024px não há atalho para as seções; a navegação é por rolagem e pelos CTAs. |
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
- **About:** o segundo glóbulo vermelho do export (`imagem.png`, 76×39 girado 38,98°) não veio nos assets e não foi adicionado.
- **Why (desktop):** o título, o eyebrow e a posição dos cards ainda diferem do `Beneficios.png`, e o brilho avermelhado do topo do frame não foi reproduzido (não há valores dessa camada).
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

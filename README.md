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
| `node tools/generate-assets.mjs` | Gera os SVGs pequenos que não vieram do Figma: ícone do logo, favicon e bandeiras de pagamento. |

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
| `Mockup-Tenurima-1.png` | `hero-bottle` | Hero |
| `Mockup-Tenurima-1 (1).png` | `bottle-basic` | Card BASIC (exibida 2x) |
| `produto.png` | `why-product-pedestal` | Centro da seção Why |
| `pote.png` | `pack-6-bottles` | Card MOST POPULAR |
| `pote (1).png` | `pack-3-bottles` | Card BUNDLE |
| `Frame 1707480045.png` | `about-composition` | About (composição pronta) |
| `2148492240 1.png` | `about-woman-capsule` | About (foto de apoio) |
| `2148729868 1.png` | `why-couple-running` | Fundo da seção Why |
| `ing-1.png` … `ing-6.png` | `ing-hawthorn`, `ing-garlic`, `ing-olive-leaf`, `ing-hibiscus`, `ing-vitamin-b6`, `ing-vitamin-b12` | Cards de ingredientes, na ordem pedida |
| `dep-1-tenurima 1.png` … `dep-tenurima-4 1.png` | `testimonial-michael`, `-susan`, `-walter`, `-diane` | Carrossel de depoimentos |
| `rotulo-tenurima.png` | `label-supplement-facts` | Rótulo abaixo do FAQ |
| `selo.svg` | `seal-guarantee.svg` | Selo da garantia |
| `check.svg` · `scroll.svg` | `icon-check-circle.svg` · `icon-scroll.svg` | Checks do card do hero · seta de rolagem |
| `shipping.png` · `made.png` | `seal-free-shipping.png` · `badge-made-in-usa.png` | Banner de frete · card do hero |
| `image 1.png` · `pck-cards 1.png` | `btn-buy-now.png` · `payment-cards.png` | Botão BUY NOW · bandeiras de pagamento (3 cards) |
| `b1.png`, `b3.svg`–`b6.svg` | `badge-heart.png`, `badge-capsule.svg`, `badge-gauge.svg`, `badge-circulation.svg`, `badge-lungs.svg` | Ícones das badges da seção Why |
| `pill.png` · `pill-1.png` | `hero-capsule-1.png` · `hero-capsule-2.png` | Cápsulas soltas decorativas do hero |
| `Rectangle.png` | `about-blood-cell.png` | Glóbulo vermelho decorativo no About |
| `30008 1.png` · `3146 1.png` · `2151847309 1.png` | `texture-heart-vessels.png` · `texture-vessels.png` · `texture-ecg-chest.png` | Texturas de fundo: hero · Why · banner de frete |
| `svg1494.png` | `icon-heart-small.png` | Hero, ao lado de "60 Day Money-Back Guarantee" |

- **WebP + fallback PNG:** cada imagem é servida com `<picture>`, tendo o `.webp` como fonte principal e o `.png` original como fallback. As imagens ficaram de **70% a 96% menores** (a foto do casal foi de 1 MB para 66 KB).
- **`loading="lazy"` em todas as imagens, menos no hero**, que tem `fetchpriority="high"` e `preload` do WebP. Toda imagem tem `width`/`height` para evitar layout shift.
- **`alt` descritivo e específico por imagem**, escrito olhando cada arquivo (ex.: "Bowl with green olives, olive leaves and a small bottle of olive oil"), e nunca repetido. As únicas exceções com `alt=""` são decorativas: o ícone do logo (o link já tem `aria-label`) e a **segunda cópia** do pote no card BASIC (a primeira descreve "Two bottles…").
- **WebP só acima de 30 KB:** ícones e selos pequenos ficam como estão, porque a conversão não compensa e evita duplicar arquivo à toa.
- **Não vieram no pacote e continuam gerados por script (SVG simples):** apenas o ícone de gota do logo e o favicon.

### Três decisões sobre os assets que valem destaque
- **Falta o ícone `b2`.** A seção Why tem 6 badges e vieram 5 ícones (`b1`, `b3`–`b6`). Identificando cada um: `b1` coração com pulso, `b3` cápsula, `b4` medidor de pressão, `b5` circulação, `b6` pulmões — todos casam direto com 5 das frases. Sobrou "Helps maintain energy and overall wellness", e para ela **reutilizei o `b1` (coração/pulso)**, que é o mais próximo de energia e bem-estar geral. É a única repetição de ícone na página.
- **`Mockup-Tenurima-1.png` (628×628) veio desfocado.** O `Mockup-Tenurima-1-1.png` (650×650) é a versão nítida do mesmo pote. Usei **a nítida no hero** e mantive no card BASIC o mockup menor do primeiro pacote. Vale pedir ao design um novo export nítido.
- **`svg1494.png` não é envelope nem carrinho:** é um **coração anatômico branco** de 24px. Como no header o ícone pedido era um envelope, deixei o envelope do sprite no "Contact Us" e usei o coração no hero, ao lado da garantia de 60 dias, onde ele faz sentido.

---

## Decisões tomadas (onde a descrição era omissa ou ambígua)

### Valores visuais
- **Cores e fontes são aproximações visuais** feitas a partir de screenshots, **não valores exatos do Inspect do Figma**. Ficam centralizadas em custom properties no topo do `styles.css` (`:root`), então dá para trocar pelos valores reais em um só lugar.
- Fontes: **Poppins** (600/700/800) nos títulos e **Inter** (400/500/600) no texto, via `<link>` do Google Fonts com `preconnect` e `display=swap`.
- **Verde de textos pequenos** ("Verified Purchase" e "Free Shipping" dos totais): escureci para `#2e7d32`, porque `#4CAF50` em texto pequeno não passa no contraste AA.

### Seção por seção
| Seção | Decisão | Por quê |
| --- | --- | --- |
| **Header** | **Fixo** (`position: sticky`), com fundo sólido e sombra depois de rolar. Abaixo de 1024px vira **menu hambúrguer**. | Página longa: o acesso a Preço/FAQ fica sempre a um clique. Em 768px os 4 links + botão não cabiam com folga. |
| **Hero** | O corte em trapézio é um **`clip-path` no próprio hero**, com altura do chanfro em variável (`--chamfer`). | Resolve em uma linha de CSS, sem SVG extra, e escala com a largura. |
| **Hero** | O asset do hero é **um pote só, sem cápsulas soltas**. Usei como veio, sem desenhar cápsulas por cima. | Regra do briefing: não recriar à mão o que já existe como imagem. |
| **Hero** | No mobile o card flutuante fica **abaixo da imagem, sobreposto em parte**. A partir de 768px ele flutua sobre a imagem. | Em 360px, sobre a imagem, ele cobriria o produto. |
| **About** | A **foto da senhora vai ao fundo, em tons de cinza** (`filter: grayscale(1)`, como descrito no layout), e a **composição pronta** (`Frame 1707480045.png`) fica sobreposta na base, com posições em %. | A arte escala proporcionalmente em qualquer largura. O cinza da foto destaca o vermelho do pote e do sistema circulatório. |
| **Ingredients** | 1 coluna < 600px · 2 colunas ≥ 600px · 3 colunas ≥ 1024px. O ícone "vaza" pelo topo com `position: absolute` + `translate(-50%, -50%)`. | Os PNGs têm 231×120 com o círculo centralizado num canvas transparente; o `translate` centraliza independentemente disso. |
| **Why choose** | No mobile, produto no topo e as 6 badges empilhadas (2 colunas a partir de 600px). No desktop, 3 colunas: badges / produto / badges. Foto do casal com baixa opacidade e `mix-blend-mode: luminosity` sobre o gradiente vinho. | Layout lateral não cabe em telas estreitas. O blend mantém a foto "desbotada" no tom da seção. |
| **Marquee** | **Velocidade constante de 50px/s** (a duração é calculada pela largura do conteúdo), easing `linear`, pausa no hover, parada com `prefers-reduced-motion`. | Com duração fixa, a velocidade mudaria conforme a tela. `linear` é o único easing que não "engasga" no reinício do loop. |
| **Marquee** | **Componente reutilizável:** a mesma marcação com `data-marquee` é inicializada por `initMarquee()` para cada ocorrência. O JS clona o grupo até cobrir a largura + 1 grupo e anima exatamente a largura de **um** grupo, então o loop não tem salto. Os clones têm `aria-hidden`. O container tem `overflow: hidden` + `width: 100%`, e ainda há `overflow-x: clip` no `body`. | Evita o vazamento para fora da viewport em telas largas. O recálculo usa `ResizeObserver` e `document.fonts.ready`, então vale também para 1920px+ e depois da troca de fonte. |
| **Testimonials** | **Exatamente 4 depoimentos** no array `TESTIMONIALS` (`script.js`), com as 4 fotos reais. **1 card por vez < 1024px e 2 por vez ≥ 1024px.** Avança **1 card por clique**, sem loop: a seta fica vermelha quando a ação está disponível e branca/desabilitada no fim. Também tem bolinhas de paginação, teclado (← →) e swipe. | O carrossel de fato passa pelos 4 (Michael+Susan → Susan+Walter → Walter+Diane). Sem loop, o usuário sabe quando viu todos. O número de cards por vez vem de `--per-view` no CSS, então o breakpoint fica num só lugar. |
| **Testimonials** | **1 por vez até 1024px** (e não só no mobile). **Sem autoplay.** | Em 768px dois cards com foto ao lado ficariam espremidos. Autoplay atrapalha a leitura e exigiria botão de pausa (WCAG 2.2.2). |
| **Pricing** | **BASIC:** o asset tem 1 pote só, então **exibo a mesma imagem duas vezes, levemente sobrepostas via CSS**, para representar "2 bottles". A segunda cópia é `aria-hidden` com `alt=""`. | Comunica a quantidade certa sem editar a imagem. A limitação é que os dois potes são idênticos. |
| **Pricing** | **MOST POPULAR e BUNDLE:** as imagens já trazem a faixa "FREE SHIPPING" e o selo "SAVE $…", então **não repeti esses elementos em HTML**. A informação continua acessível no `alt` e na lista de benefícios ("Fast & Free Shipping"). | Evita badge duplicado na tela. |
| **Pricing** | No mobile o card **MOST POPULAR aparece primeiro** (`order: -1`). No desktop ele fica no meio, com `scale(1.06)`. | Em uma pilha vertical, a opção recomendada não deve ficar escondida no meio. |
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
- **Ingredientes 4, 5 e 6:** as descrições estavam cortadas no print. **Os trechos abaixo em negrito foram escritos por mim** e são plausíveis, mas não vêm do layout:
  - *Hibiscus:* "…support healthy blood flow and **blood pressure levels already within the normal range. Its naturally occurring antioxidants help protect blood vessels from everyday oxidative stress.**"
  - *Vitamin B6:* "Vitamin B6 plays a key role in red **blood cell formation and in the normal metabolism of homocysteine. Its active P-5-P form is readily used by the body to support energy and cardiovascular function.**"
  - *Vitamin B12:* "Supports red blood cell production **and helps maintain healthy oxygen transport throughout the body. It also contributes to normal energy metabolism and nervous system function.**"
- **Depoimentos 3 e 4 são placeholder:** *Walter J., 71 – Georgia* e *Diane K., 58 – Arizona*, nome e fala, escolhidos para combinar com as fotos `dep-tenurima-3` e `dep-tenurima-4`. Michael R. e Susan L. usam os nomes e falas do briefing.
- **Textos do hero, do About, da garantia, das respostas do FAQ** (menos a primeira, que veio no enunciado) **e das páginas legais** foram escritos com base no rótulo do produto (ex.: "one capsule twice daily"). As páginas legais têm um aviso de placeholder visível.
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
- **axe-core 4.10** em 360 e 1440px: **0 violações** (inclusive depois de trocar o botão BUY NOW por imagem).
- **`tools/check-links.mjs`:** 9 páginas e 258 referências (HTML + `script.js`) sem problemas.
- Conferência visual por screenshots de página inteira e por seção em cada largura.

## Limitações conhecidas

- **Contraste do botão verde:** o gradiente `#8BC34A → #4CAF50` com texto branco, pedido no layout, fica abaixo do AA (4.5:1) para texto de 16px, mesmo com `text-shadow`. Mantive por fidelidade, mas recomendaria ao design escurecer o gradiente (ex.: `#7CB342 → #388E3C`) ou usar texto escuro.
- **BASIC com a mesma imagem duplicada:** os dois potes são idênticos; o ideal seria o Figma exportar uma imagem de 2 potes, como já existe para 3 e 6.
- **Os depoimentos são renderizados por JS**, então sem JavaScript o carrossel fica vazio (o resto da página funciona). Foi uma troca consciente para ter os dados num array só.
- A marcação do marquee se repete duas vezes no HTML, porque HTML estático não tem includes. O comportamento é um componente único no JS/CSS.
- As imagens foram exportadas em 1x; em telas retina algumas ficam levemente suaves.
- **O botão BUY NOW é uma imagem**, então o texto dele não escala com o zoom de fonte do navegador nem se adapta a outro idioma. Se fosse decisão minha, manteria o botão em HTML/CSS (como os "ORDER NOW" verdes) e usaria a imagem só como referência visual.

## O que eu faria com mais tempo

1. **Usar os valores reais do Figma** (Inspect/Dev Mode) para cores, tamanhos e espaçamentos, e exportar as imagens em **2x** para montar `srcset` com densidades (e AVIF).
2. Pedir ao design: uma **imagem de 2 potes** para o card BASIC, o **ícone `b2`** que falta, um **export nítido** do `Mockup-Tenurima-1.png` e o **ícone do logo**.
3. **SCSS ou PostCSS** com parciais por seção, e **minificação** de CSS/JS num build simples (ex.: Vite).
4. **Includes** (ou um gerador estático) para header, footer e marquee, sem duplicar marcação entre as páginas.
5. **Testes automatizados** com Playwright: os mesmos testes de overflow, console e interações que rodei, mais axe e regressão visual por screenshot, rodando no **CI** (GitHub Actions) com o `check-links`.
6. **Integração real de checkout** e rastreamento dos cliques nos CTAs (analytics por pacote).
7. Revisar os pontos de contraste com o design e testar com leitores de tela reais (NVDA e VoiceOver).
8. SEO: dados estruturados `Product`/`FAQPage` (JSON-LD), Open Graph e `sitemap.xml`.

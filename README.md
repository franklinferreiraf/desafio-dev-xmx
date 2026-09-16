# Tenurima™ – Landing page (Desafio Dev XMX · Etapa 2)

Landing page do suplemento **Tenurima (Blood Pressure Support)**, feita do zero a partir da descrição seção por seção de um layout de referência no Figma.

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

### Scripts auxiliares (opcionais, precisam de Node 18+)

| Comando | O que faz |
| --- | --- |
| `node tools/check-links.mjs` | Confere **todos** os `href`/`src` locais de todas as páginas: se o arquivo existe (pega erros de digitação como `contatc.html`), se a âncora `#id` existe, se há `href` vazio ou `#` solto e se toda `<img>` tem `alt`. Sai com código 1 se achar algum problema. |
| `node tools/generate-assets.mjs` | Gera de novo as imagens placeholder (SVG) em `assets/img/`. |

## Estrutura

```
├── index.html            # landing page (12 seções)
├── styles.css            # todo o CSS, organizado em seções numeradas
├── script.js             # menu mobile, marquee, accordion, carrossel
├── contact.html          # páginas de destino dos links do footer / garantia
├── terms.html · privacy.html · disclaimer.html · reference.html · refund.html · shipping.html
├── checkout.html         # destino placeholder dos 3 botões BUY NOW
├── assets/img/           # imagens placeholder em SVG
└── tools/                # verificador de links e gerador de imagens
```

---

## Decisões tomadas (onde a descrição era omissa ou ambígua)

### Valores visuais
- **Cores e fontes são aproximações visuais** feitas a partir de screenshots, **não valores exatos do Inspect do Figma**. Ficam centralizadas em custom properties no topo do `styles.css` (`:root`), então dá para trocar pelos valores reais em um só lugar.
- Fontes: **Poppins** (600/700/800) nos títulos e **Inter** (400/500/600) no texto, via `<link>` do Google Fonts com `preconnect` e `display=swap`.
- **Verde de textos pequenos** (tag "FREE SHIPPING", selo "Verified Purchase", "Free Shipping" dos totais): escureci para `#2e7d32`, porque `#4CAF50` com texto branco/pequeno não passa no contraste AA.

### Imagens
- Eu não tinha os arquivos de imagem do Figma, então **todas as imagens são ilustrações SVG geradas por script** (`tools/generate-assets.mjs`): potes, cápsulas, ingredientes, silhueta do corpo, vasos sanguíneos, avatares e bandeiras de pagamento. Para usar fotos reais basta trocar os arquivos mantendo os nomes.
- **`loading="lazy"` em todas as imagens, menos no hero**, que tem `fetchpriority="high"` e `preload`. Toda imagem tem `width`/`height` para evitar layout shift.
- **`alt` descritivo e único por imagem.** As exceções propositais são o ícone do logo e a foto de fundo desbotada da seção "Why": as duas são decorativas e usam `alt=""` (o link do logo já tem `aria-label`).

### Seção por seção
| Seção | Decisão | Por quê |
| --- | --- | --- |
| **Header** | **Fixo** (`position: sticky`), com fundo sólido e sombra depois de rolar. No mobile e no tablet (< 1024px) vira **menu hambúrguer**. | Página longa: o acesso a Preço/FAQ fica sempre a um clique. Em 768px os 4 links + botão não cabiam com folga. |
| **Hero** | O corte em trapézio é um **`clip-path` no próprio hero**, com altura do chanfro em variável (`--chamfer`). | Resolve em uma linha de CSS, sem SVG extra, e escala com a largura. |
| **Hero** | No mobile o card flutuante fica **sob a imagem, sobreposto em parte**. A partir de 768px ele flutua sobre a imagem. | Em 360px, sobre a imagem, ele cobriria o produto inteiro. |
| **About** | A composição de imagens usa **posições em %** dentro de um container com `aspect-ratio`. | A arte escala proporcionalmente em qualquer largura, sem media queries específicas. |
| **Ingredients** | 1 coluna < 600px · 2 colunas ≥ 600px · 3 colunas ≥ 1024px. O ícone "vaza" pelo topo com `position: absolute` + `translate(-50%, -50%)`. | Pedido no enunciado. `translate` centraliza independentemente do tamanho do ícone. |
| **Why choose** | No mobile, pote no topo e as 6 badges empilhadas (2 colunas a partir de 600px). No desktop, 3 colunas: badges / pote / badges. O pedestal é feito em CSS. | Layout lateral não cabe em telas estreitas. |
| **Marquee** | **Velocidade constante de 50px/s** (a duração é calculada pela largura do conteúdo), easing `linear`, pausa no hover, parada com `prefers-reduced-motion`. | Com duração fixa, a velocidade mudaria conforme a tela. `linear` é o único easing que não "engasga" no reinício do loop. |
| **Marquee** | **Componente reutilizável:** a mesma marcação com `data-marquee` é inicializada por `initMarquee()` para cada ocorrência. O JS clona o grupo até cobrir a largura + 1 grupo e anima exatamente a largura de **um** grupo, então o loop não tem salto. Os clones têm `aria-hidden`. O container tem `overflow: hidden` + `width: 100%`, e ainda há `overflow-x: clip` no `body`. | Evita o bug citado (conteúdo vazando da viewport em telas largas). O recálculo usa `ResizeObserver` e `document.fonts.ready`, então vale também para 1920px+ e depois da troca de fonte. |
| **Testimonials** | **6 depoimentos** no array `TESTIMONIALS` (`script.js`). **1 card por vez < 1024px e 2 por vez ≥ 1024px.** Avança **1 card por clique**, sem loop: a seta fica vermelha quando a ação está disponível e branca/desabilitada no fim. Também tem bolinhas de paginação, teclado (← →) e swipe. | Com 6 itens e avanço de 1 em 1, o avanço é visível (o oposto do carrossel travado citado). Sem loop, o usuário sabe quando viu todos. O número de cards por vez vem de `--per-view` no CSS, então o breakpoint fica num só lugar. |
| **Testimonials** | **Sem autoplay.** | Autoplay atrapalha a leitura e exigiria botão de pausa (WCAG 2.2.2). |
| **Testimonials** | Em telas < 1024px (1 card por vez) a foto fica ao lado do texto, e não empilhada. | Mantém o card compacto, como no layout. |
| **Pricing** | No mobile o card **MOST POPULAR aparece primeiro** (`order: -1`). No desktop ele fica no meio, com `scale(1.06)`. | Em uma pilha vertical, a opção recomendada não deve ficar escondida no meio. |
| **Pricing** | Os **3 BUY NOW** apontam para `checkout.html?package=2-bottles` (ou `3-bottles` / `6-bottles`). O `checkout.html` mostra o pacote escolhido. Cada botão tem texto oculto para leitor de tela ("– 6 bottles for $299.88"). | Nenhum CTA sem destino. Em produção, basta trocar pela URL da plataforma de pagamento. |
| **Pricing** | Os **totais foram calculados**: preço cheio de **$178.98/pote**, que é o único valor que gera exatamente as economias do layout ($774 no de 6 e $327 no de 3). | Consistência entre preço, total riscado e badge "SAVE". |
| **Guarantee** | O selo usa **texto curvado de verdade com SVG `<textPath>`** (não simplifiquei para texto reto), com `role="img"` e `aria-label`. | Fiel ao layout e acessível. |
| **FAQ** | **8 perguntas:** as 5 pedidas + dosagem, efeitos colaterais e local de fabricação. Só um item aberto por vez, e dá para fechar todos. O primeiro começa aberto. A animação usa `grid-template-rows: 0fr → 1fr` (0.35s, `cubic-bezier(.22,.61,.36,1)`). Setas ↑ ↓, Home e End navegam entre as perguntas. | Animar `grid-template-rows` dá altura automática sem medir o conteúdo com JS. A resposta fechada fica com `visibility: hidden`, então sai da árvore de acessibilidade. |
| **FAQ** | Os listeners são anexados só depois de `DOMContentLoaded`, e o estado é sincronizado com o `aria-expanded` do HTML. **Sem JS, todas as respostas ficam visíveis** (classe `no-js`). | Evita o FAQ "morto" citado. |
| **Rótulo** | O Supplement Facts é uma **`<table>` HTML semântica** (`caption`, `th scope`), e não uma imagem. O %DV foi calculado com os valores diários de referência do FDA. | Legível por leitor de tela, nítido em qualquer resolução e fácil de editar. |
| **Footer / páginas** | As páginas legais, de contato e de checkout ficam **na raiz** (`contact.html` etc.), com layout próprio simples. | O enunciado pede exatamente `href="contact.html"`. Os nomes são conferidos por `tools/check-links.mjs`. |

### Conteúdo inventado ou completado (suposições)
- **Ingredientes 4, 5 e 6:** as descrições estavam cortadas no print. **Os trechos abaixo em negrito foram escritos por mim** e são plausíveis, mas não vêm do layout:
  - *Hibiscus:* "…support healthy blood flow and **blood pressure levels already within the normal range. Its naturally occurring antioxidants help protect blood vessels from everyday oxidative stress.**"
  - *Vitamin B6:* "Vitamin B6 plays a key role in red **blood cell formation and in the normal metabolism of homocysteine. Its active P-5-P form is readily used by the body to support energy and cardiovascular function.**"
  - *Vitamin B12:* "Supports red blood cell production **and helps maintain healthy oxygen transport throughout the body. It also contributes to normal energy metabolism and nervous system function.**"
- **Depoimentos:** só *Michael R., 62 – Texas* e *Susan L., 65 – Florida* aparecem no layout, e os textos deles também foram escritos por mim. **Robert K., Linda M., James T. e Patricia W. são placeholders.**
- **Textos do hero, do About, da garantia, das respostas do FAQ** (menos a primeira, que veio no enunciado) **e das páginas legais** foram escritos com base no rótulo do produto. As páginas legais têm um aviso de placeholder visível.
- **Contato:** o e-mail `support@tenurima.com` e o horário de atendimento são fictícios.

---

## Como verifiquei

- **Navegador real (Chrome headless via DevTools Protocol)** em 360, 768, 1024, 1440 e 1920px:
  - `document.documentElement.scrollWidth === clientWidth` em todas as larguras, sem nenhum elemento passando da viewport;
  - nenhuma exceção, `console.error` ou `console.warn`;
  - carrossel: 6 slides, avança 50% por clique até o último par e a seta "próximo" desabilita no fim;
  - accordion: abrir um item fecha o anterior e o `aria-expanded` acompanha;
  - marquee: 3 grupos em 360px e 5 em 1920px, com a animação andando;
  - menu mobile abre e fecha, inclusive ao clicar num link.
- **axe-core 4.10** em `index.html`, `contact.html`, `checkout.html` e `refund.html`, em 360 e 1440px: **0 violações**.
- **`tools/check-links.mjs`:** 9 páginas e 253 `href`/`src` sem problemas.
- Conferência visual por screenshots de página inteira em cada largura.

## Limitações conhecidas

- **Contraste do botão verde:** o gradiente `#8BC34A → #4CAF50` com texto branco, pedido no layout, fica abaixo do AA (4.5:1) para texto de 16px, mesmo com `text-shadow`. Mantive por fidelidade, mas recomendaria ao design escurecer o gradiente (ex.: `#7CB342 → #388E3C`) ou usar texto escuro.
- **Os depoimentos são renderizados por JS**, então sem JavaScript o carrossel fica vazio (o resto da página funciona). Foi uma troca consciente para ter os dados num array só.
- A marcação do marquee se repete duas vezes no HTML, porque HTML estático não tem includes. O comportamento é um componente único no JS/CSS.

## O que eu faria com mais tempo

1. **Usar os valores reais do Figma** (Inspect/Dev Mode) para cores, tamanhos, espaçamentos e as imagens reais exportadas em **WebP/AVIF com `srcset`**.
2. **SCSS ou PostCSS** com parciais por seção, e **minificação** de CSS/JS num build simples (ex.: Vite).
3. **Includes** (ou um gerador estático) para header, footer e marquee, sem duplicar marcação entre as páginas.
4. **Testes automatizados** com Playwright: os mesmos testes de overflow, console e interações que rodei manualmente, mais axe e regressão visual por screenshot, rodando no **CI** (GitHub Actions) com o `check-links`.
5. **Integração real de checkout** e rastreamento dos cliques nos CTAs (analytics por pacote).
6. Revisar os pontos de contraste com o design e testar com leitores de tela reais (NVDA e VoiceOver).
7. SEO: dados estruturados `Product`/`FAQPage` (JSON-LD), Open Graph e `sitemap.xml`.

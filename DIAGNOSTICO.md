# Diagnóstico — biogutex.com

Testado em 360px, 768px e 1440px, com inspeção do código-fonte renderizado e testes de interação (cliques, reload).

---

## Erro 1 — Botão "Buy Now" do plano MOST POPULAR (6 garrafas) não faz nada

**O que está errado:** É o plano em destaque ("97% dos clientes escolhem essa opção"), mas ao clicar no botão de compra, absolutamente nada acontece.

**Onde está:** Seção de planos/preços, card central "MOST POPULAR".

**Por que acontece:** Comparando com os outros dois cards, os botões "Add To Cart" do plano Basic e do Standard são imagens envolvidas por um link (`<a href="...linkoffer...">`). No card Most Popular, a mesma imagem de botão aparece **sem** estar envolvida por um link — é só uma imagem estática (inclusive com um ícone de cursor sobreposto, decorativo, simulando um clique). Ou seja, falta o `href`/anchor nesse botão específico; os outros dois foram implementados, esse não.

**Como corrigiria:** Envolver a imagem do botão (e idealmente o card inteiro do CTA) num `<a href="https://biogutex.com/linkoffer2">` (ou o link de checkout correto do pacote de 6 garrafas), do mesmo jeito que os outros dois planos.

**Gravidade:** **Crítico.** É o plano mais vendido e o botão principal de conversão da página inteira. Isso é dinheiro não entrando, do jeito mais direto possível.

---

## Erro 2 — Botão do plano BASIC (2 garrafas) leva a "Not Found"

**O que está errado:** Ao clicar em "Add To Cart" do plano de 2 garrafas, a página de destino retorna 404 (Not Found).

**Onde está:** Card "BASIC" na seção de planos.

**Por que acontece:** O `href` do botão aponta para uma URL de checkout (`/linkoffer`) que não existe mais no servidor/plataforma de checkout — link quebrado, provavelmente uma oferta que foi desativada, renomeada ou nunca publicada.

**Como corrigiria:** Verificar na plataforma de checkout (ex: ferramenta de pagamentos/funil) qual é a URL ativa correta para esse pacote e atualizar o `href`. Enquanto isso, o ideal seria nem publicar o botão apontando para um link morto.

**Gravidade:** **Crítico.** Bloqueia 100% das conversões desse plano.

---

## Erro 3 — Botão do plano STANDARD (3 garrafas) leva a "Not Found"

**O que está errado:** Mesmo sintoma do erro 2, só que no plano de 3 garrafas.

**Onde está:** Card "STANDARD" na seção de planos.

**Por que acontece:** Mesma causa raiz do Erro 2 — `href` apontando para uma URL de checkout (`/linkoffer3`) inexistente/404. Pelo padrão repetido (2 dos 3 planos com link morto), sugere um problema sistêmico na hora de gerar/publicar os links de checkout, não um erro isolado.

**Como corrigiria:** Mesma correção do Erro 2, aplicada a esse plano. Vale revisar o processo de publicação desses links como um todo, já que o padrão se repetiu.

**Gravidade:** **Crítico.** Mesmo motivo do Erro 2 — bloqueia a compra.

---

## Erro 4 — Perguntas do FAQ não abrem ao clicar

**O que está errado:** Clicar em qualquer pergunta do "Frequently Asked Questions" deveria expandir a resposta (o ícone de seta indica isso visualmente), mas nada acontece — a lista fica travada, sempre fechada.

**Onde está:** Seção FAQ, próxima ao final da página.

**Por que suspeito que acontece (não confirmado — não tenho acesso ao JS renderizado, apenas ao comportamento observado):** O padrão mais comum para esse sintoma é um event listener de accordion que não está sendo anexado corretamente — seja porque o script roda antes do DOM estar pronto, porque os seletores/classes usados no JS não batem mais com os do HTML (por exemplo, depois de um ajuste de CSS que renomeou uma classe), ou porque há IDs duplicados atrapalhando o `querySelector`.

**Como corrigiria:** Abrir o console do navegador para confirmar se há erro de JS nessa interação (isso eu não consegui verificar remotamente). Depois, revisar se o script do accordion está sendo carregado e se os seletores batem com o HTML atual.

**Gravidade:** **Médio.** Não impede a compra diretamente, mas prejudica a confiança do usuário (muitas dúvidas de segurança/reembolso estão ali) bem perto do momento de decisão.

---

## Erro 5 — Link "Contact Page" com URL incorreta (typo)

**O que está errado:** No FAQ, na resposta sobre reembolso/garantia, o link "link to our Contact Page" quebra (404).

**Onde está:** Resposta da pergunta "What's the refund policy?" / "How does the guarantee work?" no FAQ.

**Por que acontece:** O `href` está escrito como `biogutex.com/contact.hmtl` — letras trocadas ("hmtl" em vez de "html"). O link do rodapé, que aponta pra mesma página, está correto (`contact.html`), confirmando que é um erro de digitação isolado nesse trecho específico.

**Como corrigiria:** Corrigir o `href` para `contact.html`.

**Gravidade:** **Baixo.** Afeta só quem tenta contato via esse link específico do FAQ (o rodapé continua funcionando), mas é embaraçoso justo numa seção sobre garantia/confiança.

---

## Erro 6 — Seção de depoimentos duplicada / carrossel travado em 2 de 6 depoimentos

**O que está errado:** A página tem 6 depoimentos de clientes no conteúdo (James H., Robert M., Frank D., Dennis L., William C., Richard P.), mas na tela (1440px) a seção "Real Life Changing Results" aparece **duas vezes seguidas**, mostrando sempre os mesmos 2 depoimentos (William C. e Richard P.) — os outros 4 nunca aparecem.

**Onde está:** Seção de depoimentos, logo abaixo de "Consistent Use. Consistent Results."

**Por que suspeito que acontece (não confirmado):** Provavelmente o componente de carrossel/slider está sendo montado (mounted) duas vezes no DOM — por exemplo, um script incluído duas vezes, ou um componente que deveria trocar de slide via JS mas em vez disso duplicou o bloco visualmente. O fato de mostrar sempre os mesmos 2 (e não os 6) sugere que o carrossel não está de fato ciclando pelos slides — só os 2 primeiros do array estão sendo renderizados, e renderizados duas vezes.

**Como corrigiria:** Verificar se o script de inicialização do carrossel está sendo chamado mais de uma vez (duplicidade de `<script>` ou de instância), e revisar se a lógica de paginação está de fato usando os 6 itens de depoimento disponíveis.

**Gravidade:** **Médio.** Prova social é um gatilho de conversão importante nessa página (funil de venda), e aqui ela está literalmente pela metade — 4 depoimentos nunca são vistos, e a duplicação passa impressão de descuido.

---

## Erro 7 — Overflow horizontal na faixa de selos de confiança (1440px)

**O que está errado:** Na faixa "60 DAY GUARANTEE • NATURAL FORMULA • GLUTEN-FREE • NON-GMO" (que se repete em loop, tipo marquee), em telas largas (1440px) o conteúdo visualmente extrapola a largura do container/viewport — o texto/ícones continuam além da borda direita da tela.

**Onde está:** Faixa de selos, logo abaixo da seção "100% SATISFACTION GUARANTEED".

**Por que suspeito que acontece (não confirmado):** Efeito clássico de marquee/ticker feito com `display:flex` ou `inline-flex` sem `flex-wrap`, dentro de um container sem `overflow:hidden` e sem `max-width:100%` — em telas menores o excesso não chega a ficar visível, mas em telas largas o conteúdo "vaza" para fora.

**Como corrigiria:** Garantir que o container pai dessa faixa tenha `overflow-x: hidden` e `width: 100%`, e que a animação do marquee (se houver) esteja usando `translateX` dentro desses limites, não dependendo do elemento filho estourar a tela.

**Gravidade:** **Baixo.** Não quebra funcionalidade, mas em telas grandes (onde o cliente tem mais atenção aos detalhes) passa impressão de site mal finalizado.

---

## Bônus (extras notados, fora dos 7 principais)

- Praticamente todas as imagens de produto/ingredientes usam o mesmo texto alternativo genérico "AlphaRock" (ou vazio), em vez de descrever o conteúdo real de cada imagem — problema de acessibilidade que também é pedido explicitamente na Etapa 2 do desafio.
- Não consegui confirmar (sem DevTools ao vivo) se há erros de console adicionais nem o comportamento exato em resize ao vivo — se você notar algo na hora de testar, vale adicionar aqui antes de entregar.

# Diagnóstico — biogutex.com

Testado em 360px, 768px e 1440px, com inspeção do código-fonte renderizado e testes de interação (cliques, reload e comportamento responsivo).

---

## Erro 1 — Botão "Buy Now" do plano MOST POPULAR (6 garrafas) não faz nada

**O que está errado:** É o plano em destaque ("97% dos clientes escolhem essa opção"), mas ao clicar no botão de compra, absolutamente nada acontece.

**Onde está:** Seção de planos/preços, card central "MOST POPULAR".

**Por que acontece:** Comparando com os outros dois cards, os botões "Add To Cart" dos planos Basic e Standard são imagens envolvidas por links (`<a href="...">`). No card Most Popular, a imagem do botão aparece **sem** estar envolvida por um link funcional. Existe inclusive um ícone de cursor sobreposto, simulando visualmente uma interação, mas não existe uma ação real associada ao botão.

**Como corrigir:** Envolver a imagem do botão e, idealmente, o CTA correspondente do card em um `<a href="...">`, utilizando a URL de checkout correta para o pacote de 6 garrafas. A implementação deve seguir o mesmo padrão funcional utilizado nos demais planos.

**Gravidade:** **Crítico.** É o plano destacado e recomendado da página, portanto o botão precisa obrigatoriamente levar o usuário ao checkout.

---

## Erro 2 — Botão do plano BASIC (2 garrafas) leva a "Not Found"

**O que está errado:** Ao clicar em "Add To Cart" do plano de 2 garrafas, o usuário é direcionado para uma página que retorna "Not Found" / 404.

**Onde está:** Card "BASIC" na seção de planos.

**Por que acontece:** O `href` utilizado pelo botão aponta para `/linkoffer`, mas essa URL não está levando a um checkout válido.

**Como corrigir:** Verificar qual é a URL de checkout atualmente válida para o pacote de 2 garrafas e substituir o `href` atual pela URL correta. Todos os elementos clicáveis relacionados a esse plano devem utilizar o mesmo checkout válido.

**Gravidade:** **Crítico.** O usuário consegue visualizar a oferta, mas não consegue concluir a compra através desse plano.

---

## Erro 3 — Botão do plano STANDARD (3 garrafas) leva a "Not Found"

**O que está errado:** Ao clicar em "Add To Cart" do plano de 3 garrafas, o usuário também é direcionado para uma página "Not Found" / 404.

**Onde está:** Card "STANDARD" na seção de planos.

**Por que acontece:** O `href` atual aponta para `/linkoffer3`, que não está direcionando para um checkout válido.

**Como corrigir:** Identificar a URL correta e ativa do checkout para o pacote de 3 garrafas e substituir o `href` atual. O botão e os demais elementos clicáveis do card devem utilizar o mesmo destino.

**Gravidade:** **Crítico.** O erro impede diretamente a conversão desse plano.

---

## Erro 4 — Perguntas do FAQ não abrem ao clicar

**O que está errado:** As perguntas da seção "Frequently Asked Questions" aparecem visualmente como elementos expansíveis, mas ao clicar nelas nenhuma resposta é aberta.

**Onde está:** Seção FAQ, próxima ao final da página.

**Comportamento esperado:** Ao clicar em uma pergunta, a respectiva resposta deve ser expandida. Ao clicar novamente, ela deve ser recolhida. O comportamento deve funcionar tanto em desktop quanto em dispositivos móveis.

**Possível causa:** O JavaScript responsável pelo accordion pode não estar sendo inicializado corretamente, pode estar utilizando seletores diferentes dos elementos atuais do HTML ou pode existir algum conflito entre as instâncias do componente.

**Como corrigir:** Verificar a implementação atual do accordion no JavaScript e garantir que:

- os eventos de clique estejam sendo registrados;
- os seletores utilizados pelo JavaScript correspondam ao HTML atual;
- cada pergunta esteja vinculada à sua respectiva resposta;
- não existam IDs duplicados;
- o comportamento funcione após reload;
- o accordion continue funcionando em 360px, 768px e 1440px.

Não alterar o conteúdo das perguntas ou respostas; corrigir apenas o comportamento de interação.

**Gravidade:** **Médio.** Não impede diretamente o checkout, mas prejudica a experiência do usuário e impede o acesso às informações importantes antes da compra.

---

## Erro 5 — Descrição da seção "Built for Men" está apagada / com baixa legibilidade

**O que está errado:** Na seção que contém o título "Built for Men Who Demand More From Themselves", o texto descritivo abaixo do título está visualmente apagado, com contraste/opacity inadequados, dificultando a leitura.

**Onde está:** Seção "WHY ALPHA ROCK", próxima à parte inicial da página, onde aparece:

> "Built for Men Who Demand More From Themselves"

O problema está principalmente no parágrafo descritivo abaixo do título.

**Problema visual:** O texto não possui contraste suficiente em relação ao fundo. A informação está presente, mas parece desbotada/apagada, fazendo com que o usuário tenha dificuldade para ler o conteúdo.

**Como corrigir:** Ajustar o CSS responsável pela aparência desse texto para garantir contraste adequado com o fundo. Verificar principalmente:

- `color`;
- `opacity`;
- `font-weight`;
- `text-shadow`, caso esteja sendo utilizado;
- contraste entre texto e background;
- estilos herdados de elementos pais.

A correção deve preservar o design atual da seção e do protótipo, alterando somente o necessário para recuperar a legibilidade.

**Importante:** Não remover o texto, não substituir o conteúdo e não alterar desnecessariamente a tipografia ou o layout. O objetivo é fazer com que a descrição fique claramente legível, mantendo o visual original.

**Gravidade:** **Médio.** A seção contém informações importantes sobre o produto, e a baixa legibilidade prejudica a experiência e a percepção visual da página.

---

## Erro 6 — Link da seção "100% SATISFACTION GUARANTEED" não está funcional

**O que está errado:** Na seção "100% SATISFACTION GUARANTEED", existe um elemento visual/link associado ao selo, mas o link não está funcionando corretamente.

**Onde está:** Seção de garantia, depois dos cards de planos e antes da faixa de selos.

**Problema identificado:** O elemento relacionado à seção de garantia não está levando o usuário corretamente ao destino esperado quando clicado.

**Como corrigir:** Verificar o elemento clicável dessa seção e garantir que o `href` esteja apontando para uma página válida e existente. O link deve ser testado após a alteração para confirmar que não retorna 404, não aponta para um arquivo inexistente e não possui erro de digitação.

Também verificar se o elemento visual que aparenta ser clicável realmente possui um `<a>` funcional, caso essa seja a intenção do layout.

**Gravidade:** **Médio.** A seção está diretamente relacionada à garantia e à confiança do usuário antes da compra. Um link quebrado nessa área pode prejudicar a experiência e transmitir falta de acabamento.

---

## Erro 7 — Faixa de selos quebra informações em telas menores

**O que está errado:** A faixa de selos de confiança contendo:

- 60 DAY GUARANTEE
- NATURAL FORMULA
- GLUTEN-FREE
- NON-GMO

não mantém o layout corretamente em telas menores. Alguns textos e elementos acabam quebrando, ficando desalinhados ou ultrapassando/saindo da área visual esperada.

**Onde está:** Faixa localizada abaixo da seção "100% SATISFACTION GUARANTEED".

**Comportamento atual:** Em telas menores, principalmente nos breakpoints de dispositivos móveis, os itens da faixa não conseguem se adaptar corretamente ao espaço disponível.

**Como corrigir:** Ajustar a implementação responsiva da faixa para que os itens permaneçam dentro da viewport e mantenham espaçamento e alinhamento adequados em diferentes larguras.

Verificar principalmente:

- `width: 100%`;
- `max-width`;
- `overflow-x`;
- `display: flex`;
- `flex-wrap`;
- `gap`;
- tamanho da fonte;
- espaçamento interno;
- comportamento do marquee/animação, caso exista;
- `white-space`;
- posicionamento dos ícones;
- comportamento específico em 360px, 390px, 768px e 1440px.

A faixa pode continuar com o efeito de repetição/movimento, mas o conteúdo não pode causar quebra visual, overflow horizontal ou informações cortadas.

**Importante:** A correção deve ser responsiva. Não corrigir apenas 1440px sacrificando o mobile. O resultado precisa ser validado nas larguras de 360px, 768px e 1440px.

**Gravidade:** **Médio.** Não impede diretamente a compra, mas afeta bastante a qualidade visual e a responsividade da página, principalmente em dispositivos móveis.

---

## Critérios finais de validação

Depois das correções, testar novamente a página em pelo menos:

- 360px
- 390px
- 768px
- 1024px
- 1440px

Validar obrigatoriamente:

- [ ] Os três planos possuem botões de compra funcionais e direcionam para os respectivos checkouts válidos.
- [ ] O plano Most Popular (6 garrafas) possui CTA realmente clicável.
- [ ] O FAQ abre e fecha corretamente.
- [ ] A descrição da seção "Built for Men Who Demand More From Themselves" está claramente legível.
- [ ] O link da seção "100% SATISFACTION GUARANTEED" funciona corretamente.
- [ ] A faixa de selos não quebra em telas menores.
- [ ] Não existe overflow horizontal causado pela faixa ou por qualquer outro elemento.
- [ ] Não alterar desnecessariamente o layout, textos, imagens ou identidade visual já existente.
- [ ] Após as alterações, fazer um novo teste completo de interação e responsividade.
- [ ] Verificar o console do navegador para garantir que as correções não introduziram novos erros de JavaScript.

---
title: Como melhorar a acessibilidade de seus sites - Parte 2
description: Boas práticas em acessibilidade!
date: "2022-03-16 14:10:00"
image: "/assets/img/acessibilidade-parte-2.jpeg"
category: a11y
background: "#009e66"
---

## Introdução

![Imagem representando sinais de acessibilidade](/assets/img/acessibilidade-parte-2.jpeg)

Antes de mais nada, se você ainda não leu a parte 1 deste tema, recomendo que leia-o, basta [clicar aqui](/como-melhorar-acessibilidade).

A ideia de uma continuação veio a partir do [Episódio 3 do reality](https://youtu.be/Ccyegys681I?t=300) Show me the code, feito pela [Rocketseat](https://www.rocketseat.com.br/).
Onde no terceiro episódio o foco era aumentar e melhorar a acessibilidade do site em questão.

Então, com isso, separei mais alguns pontos do que fazer e como testar a acessibilidade.

### TabIndex

O tabIndex nada mais é do que uma propriedade que inserimos em elementos da tela para definir uma ordem de navegação pelo teclado.

Como neste exemplo retirado do MDN:

```html
<p>Clique em qualquer lugar deste painel, então tente navegar pelos elementos utilizando tab</p>

<label>O primeiro na ordem do tab<input type="text"></label>

<div tabindex="0">Pode ser acessado via tab por conta do tabindex</div>

<div>Não "tabeável" por não possuir tabindex</div>

<label>Terceiro na ordem do tab<input type="text"></label>
```

O resultado, assim como mais explicações pode ser acessado na [documentação do MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex).

### Contrastes de cor

Muitas pessoas tem dificuldades de percepção de cor, assim como o alto contraste pode dificultar/machucar a visão.
Um exemplo bem básico disso é colocar um amarelo `#f5ff6f` nos textos enquanto o fundo está branco, por exemplo. Você terá de fazer um esforço enorme para conseguir ler o texto. E isso pode vir e virá a incomodar bastante sua visão com o tempo.
Para isso existe a WCAG, que trás diretrizes que podemos seguir, a fim de obtermos uma boa acessibilidade!

Existem sites que te ajudam a validar se o background e a cor do texto possuem um nível de contraste bom, como o [Color A11y](https://color.a11y.com/?wc3). O ideal seria conseguir o máximo de aprovação neste teste, para garantir que todos consigam ler da melhor forma.

O próprio DevTools ajuda com isso, como no exemplo a seguir:

![Imagem onde mostro a visualização do devTools, na forma como ele ajuda com o contraste e acessibilidade exibindo curvas no seletor de cor.](/assets/img/devTools-contraste.png)

### Conclusão

Então é isso, conseguimos dar uma passada bem rápida e legal sobre o tema, e se o post te ajudou de alguma forma compartilhe e comente se já sabia de alguma dessas informações e quem sabe eu faça mais alguns posts sobre acessibilidade. Podemos até aprofundar em algum dos temas citados neste post!

Obrigado por ler!

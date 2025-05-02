---
date: 2021-07-27 17:00:00
image: /assets/img/acessibilidade-medium.png
title: Como melhorar a acessibilidade de seus sites
description: Boas práticas em acessibilidade!
main-class: a11y
color: "#009e66"
background: "#009e66"
tags:
  - acessibilidade
category: a11y
---

## Introdução

![Imagem representando sinais de acessibilidade](/assets/img/acessibilidade-medium.png)

Acessibilidade é um tópico muito falado mas muitas vezes vejo isso sendo deixado de lado.

Por ser um tópico bem grande, hoje irei abordar alguns pontos que são fáceis de começar e bem fácil de lembrar durante seu desenvolvimento.

### Outline

Já notou que nos navegadores baseados no Chromium e no Firefox algumas interações possuem um comportamento padrão do navegador?
Como por exemplo a seleção de um botão ou input. Como nos exemplos abaixo:

![Imagem onde mostra exemplos de foco de botões no Chrome, Safari e Firefox.](/assets/img/outline-chrome.png)

Muitas vezes eu vejo sites onde removem por completo o outline em CSS Reset. E isso implica diretamente na acessibilidade.

Pessoas que utilizam navegação pelo teclado ou não conseguem identificar alterações de cores não conseguem detectar o que está acontecendo caso essa propriedade seja removida. Okay, entendo que talvez não combine muito com o layout, mas **não o remova**, você pode alterar o comportamento padrão do navegador e aplicar seu próprio estilo.

Basta seguir este artigo para ter uma ideia melhor: [Copy the Browser’s Native Focus Styles](https://css-tricks.com/copy-the-browsers-native-focus-styles/)

### Textos alternativos

Textos alternativos são super importantes!

Seja pra SEO, acessibilidade e até performance.
O texto alternativo, ou `alt`, de uma imagem, por exemplo, quando a imagem não carregar o texto será exibido de placeholder. E além disso, os leitores de tela farão uso deste texto, então lembre-se de fazer um texto que faça sentido e que ajude quem realmente precisa. **Tente descrever o máximo a imagem!**

### ESLint

ESLint é o seu melhor amigo durante o desenvolvimento. Além de te ajudar a manter um bom código ele pode te ajudar com acessibilidade também!

[**eslint-plugin-jsx-a11y**](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)

Esse plugin vai te ajudar com vários pontos importantes de acessibilidade, como garantir os textos alternativos, a inclusão de `aria` em seus componentes, verificar se as anchor tags são válidas, se os emojis estão corretos e possuem acesso aos leitores de tela entre inúmeras funcionalidades. Vale a pena dar uma conferida!


Então é isso, conseguimos dar uma passada bem rápida e legal sobre o tema, e se o post te ajudou de alguma forma, compartilhe e comente se já sabia de alguma dessas informações e quem sabe eu faça mais alguns posts sobre acessibilidade. Podemos até aprofundar em algum dos temas citados neste post!

Obrigado por ler!

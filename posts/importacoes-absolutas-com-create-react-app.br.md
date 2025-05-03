---
layout: post
title: Importações absolutas com Create React App
description: Configurando o caminho absoluto! Chega de inferno de ../../../, agora com ESLint
date: 2019-12-15 05:06:17
main-class: js
color: "#a29330"
tags:
- react
- importações absolutas
---

## Introdução

O post de hoje é sobre uma configuração legal que você pode fazer em seus projetos. É mais fácil digitar os caminhos, sem mais `../../../../onde-está-minha-pasta`

Você pode mover um arquivo sem ter que atualizar seus caminhos de importação

## Vamos começar!

Tudo que você tem que fazer é criar um `jsconfig.json` na pasta raiz do seu projeto com este código:

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

Agora, vá para o seu `eslintrc.js` ou onde você configura seu ESLint e crie um novo objeto

```js
settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
```

E é praticamente isso! Agora você pode fazer essas importações mais bonitas e fáceis!

![Comparando o antes e depois de como as importações eram feitas](/assets/img/thumb-absolute-path.png "Comparando o antes e depois de como as importações eram feitas")

**Observe que você não precisa instalar nenhum pacote npm para isso, esse trecho de configuração é suficiente.**

Esse foi um post bem curto! Qualquer pergunta, deixe-me saber nos comentários abaixo!

Obrigado pela leitura!
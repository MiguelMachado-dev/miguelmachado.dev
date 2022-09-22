---
layout: post
date: 2022-09-22 12:57:26
image: /assets/img/1_3adbbrn3gotbz72xqfo96g.png
title: O poder do ESLint - Regras que mais gosto de usar
description: ESLint ajuda a mantermos um padrão no código e verificar erros.
  Aqui estarei listando algumas regras que não vivo sem!
main-class: js
color: "#a29330"
tags:
  - ESLint
  - regras
---
## Introdução

![Logo do Eslint](/assets/img/1_3adbbrn3gotbz72xqfo96g.png)

> [ESLint](https://eslint.org/) é um projeto open source que ajuda a encontrar e corrigir problemas em seu código JavaScript. Não importa se está escrevendo código no navegador ou no servidor, com ou sem framework, o ESLint pode ajudar seu código a ser mais consistente e robusto.

*Trecho retirado da documentação do ESLint.*

---

Além de checarmos problemas, podemos forçar um padrão e regras no código. O que queremos que seja um erro, aviso, verificado ou ignorado.

### Naming Convention

Com typescript-eslint, conseguimos definir um prefixo para variáveis com tipos **booleans**.\
Seguindo essa convenção, uma variável booleana "open" daria erro no código, e precisaríamos alterá-la para `isOpen` ou algo do tipo!

```json
// .eslintrc.json

{
  ...
  "rules": {
    ...
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "types": ["boolean"],
        "format": ["PascalCase"],
        "prefix": ["is", "should", "has", "can", "did", "will"]
      }
    ]
  }
}
```

### I﻿mport Order

C﻿om Import Order conseguimos, como nome induz, organizar a ordem de nossos imports.

N﻿o exemplo abaixo, sempre o que vem do react ficaria no topo, logo após nossos components, templates, types e etc... Podemos definir se queremos um espaço em branco entre cada um ou não. E o melhor, isso tudo será sempre arrumado ao salvar o arquivo! Então não precisamos nos preocupar em arrumar e sempre teremos um arquivo padronizado!

```json
// .eslintrc.json
"import/order": [
      "error",
      {
        "newlines-between": "always",
        "pathGroups": [
          {
            "pattern": "react",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "components/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "templates/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "types/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "utils/**",
            "group": "external",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["builtin"],
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object"
        ],
        "alphabetize": {
          "order": "asc"
        }
      }
    ],
```

### D﻿efault Export

C﻿om essa regra, definimos que todos os export serão named exports e não default, assim utilizando o nome dado e garantindo também que teremos nomes únicos na aplicação, e o próprio arquivo que define o nome dele, e não quem importa, ficando mais fácil também, que o refactor funcione até melhor!

```json
"import/prefer-default-export": "off",
"import/no-default-export": "error",
```

## C﻿onclusão

E﻿ssas são algumas regras que gosto de utilizar em meus projetos para manter um padrão melhor, visto que cada pessoa costuma organizar os imports de uma forma, ou as vezes não dá um nome tão claro a uma variável, com isso, fica mais fácil encontrar as coisas e até mesmo gerar um código limpo!

E﻿m breve trarei uma segunda parte desse artigo, e também não deixe de me contatar no LinkedIN ou Twitter, caso tenha alguma dúvida ou recomendação!

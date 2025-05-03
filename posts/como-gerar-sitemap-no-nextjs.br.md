---
date: 2021-03-24 11:20:00
image: /assets/img/sitemap.png
title: Como gerar sitemap no Next.JS
description: Como gerar sitemap estático e dinâmico no Next.JS com o next-sitemap
main-class: js
color: "#a29330"
background: "#a29330"
tags:
  - tutorial
  - nextjs
  - sitemap
category: js
---

## Introdução

![Imagem de um sitemap do UX Collective](/assets/img/sitemap.png)

O cenário era o seguinte, estava precisando gerar sitemap no Next.JS, mas tinha alguns links que eram totalmente dinâmicos. Sempre que um post novo no blog fosse criado, deveria atualizar o sitemap.

Comecei a buscar algumas soluções e sem sucesso, só conseguia gerar o sitemap estático, e teria de complementar na mão com os paths dinâmicos, além de ser muita gambiarra.

### next-sitemap

Bom, primeiramente vamos instalar a lib. Caso queira usá-lo para gerar apenas páginas estáticas instale-o como devDependencies `-D`

```bash
yarn add next-sitemap
```

### Criando sitemap estático

Agora vamos criar o script. Vá no `package.json` e crie o script `"postbuild": "next-sitemap"`, assim, sempre depois do build ele irá criar o sitemap.

Crie um arquivo `next-sitemap.js` na raiz do seu projeto.
Nele iremos configurar algumas coisas

```js
module.exports = {
  siteUrl: 'https://urldoseu.site',
  generateRobotsTxt: true, // opcional
  priority: null,
  changefreq: null,
  exclude: ['/server-sitemap.xml', '/post/*'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://urldoseu.site/server-sitemap.xml'],
  },
}
```

Bom, a lib irá gerar seu robots.txt também, caso não queira, basta passar como `false`. Os campos *priority* e *changefreq* são campos do xml, no meu caso eu não quero esses dois campos.

Os campos `exclude` e `robotsTxtOptions` não serão necessários caso você queira apenas gerar o sitemap estático.
Caso você tenha algum blog ou páginas que são criadas dinamicamentes, continua aí que vamos ver agora como fazer para preencher o sitemap com eles!

### Criando sitemap dinâmico

Agora iremos criar um arquivo em `pages/server-sitemap.xml/index.tsx`.

Nesse arquivo iremos fazer o seguinte:

```ts
import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { getAllPosts } from 'services' // Importar a api que cria as páginas dinamicas. Method to source urls from cms

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Vou pegar os primeiros 100 posts do meu blog
  const allPosts = await getAllPosts({ per_page: 100 })

  // Vou criar um fields, onde busco o slug da minha resposta
  // E com o slug vou preenchendo dinamicamente cada post que tenho
  const fields = allPosts.data.map(({ slug }) => ({
    loc: `https://urldoseu.site/post/${slug}`,
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  }))

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
// eslint-disable-next-line @typescript-eslint/no-empty-function
export default () => {}
```

E é apenas isso.
Lembra lá em cima onde criamos o arquivo `next-sitemap.js`?

Os campos:
```js
  exclude: ['/server-sitemap.xml', '/post/*'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://urldoseu.site/server-sitemap.xml'],
  },
```
`exclude`: estou excluindo do meu sitemap estático qualquer página que ele gere no build relacionado aos posts. Assim evito duplicatas em meu `public/sitemap.xml` gerado no `postbuild` com o meu `server-sitemap.xml` gerado dinamicamente.

Além disso, adiciono o meu `server-sitemap.xml` em meu `robots.txt`.

Quando acessarmos `localhost:3000/server-sitemap.xml` iremos ver o nosso xml dinâmico.

É isso. Geramos nosso xml estático e dinâmico em menos de 10 minutos!

Se o post te ajudou, compartilhe!

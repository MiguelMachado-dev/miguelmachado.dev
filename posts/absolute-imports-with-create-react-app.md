---
layout: post
title: Absolute imports with Create React App
description: Configuring absolute path! No more ../../../hell plus ESLint
date: 2019-12-15 05:06:17
image: /assets/img/thumb-absolute-path.png
main-class: js
color: "#a29330"
tags:
- react
- tutorial
categories:
twitter_text: "Configuring absolute path! No more ../../../hell plus ESLint"
introduction: "Configuring absolute path! No more ../../../hell plus ESLint"
---


## Introduction

Today's post is about a cool set up you can do in your projects. It's easier to type out the paths, no more `../../../../where-is-my-folder`

You can move a file without having to update its input paths

## Let's get started!

All you have to do is creating a `jsconfig.json` in your root folder with this code:

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

Then, you go to your `eslintrc.js` or where you set up your ESlint and create a new object

```js
settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
```

And it's pretty much it! You can now make those imports prettier and easier!

![Comparing the before and after of how imports were made](/assets/img/thumb-absolute-path.png "Comparing the before and after of how imports were made")

**Note that you don't need to install any npm package for this, that settings chunk is enough.**

That was a pretty short post! Any questions let me know in the comments below!

Stick around for more tips!

Thank you for reading!

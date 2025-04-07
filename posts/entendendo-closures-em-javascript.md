---
layout: post
date: 2025-04-07 14:03:20
image: /assets/img/entendendo-closures-em-javascript.png
title: Entendendo Closures em JavaScript
description: >-
  Neste artigo, exploraremos o conceito de closures em JavaScript, sua importância e como eles podem ser úteis no desenvolvimento de aplicações web modernas.
main-class: js
color: "#a29330"
background: "#a29330"
tags:
  - javascript
  - conceitos
category: javascript
---

### Introdução
Os closures são um dos conceitos mais poderosos e avançados da linguagem JavaScript. Eles permitem que uma função tenha acesso a variáveis externas à sua própria escopo, mesmo depois de terem sido executadas.

### O que são Closures?
Em termos simples, um closure é uma função que tem acesso a uma variável externa à sua própria escopo, mesmo após a execução da função externa ter terminado. Isso significa que as variáveis externas à função não são destruídas após a execução da função, mas mantidas em memória enquanto houver alguma referência a elas.

### Como funcionam os Closures?
Para entender como os closures funcionam, precisamos primeiro entender o conceito de escopo em JavaScript. Em JavaScript, o escopo é determinado pela posição de uma variável no código e pelo contexto em que ela é acessada.

Uma função interna (ou filha) tem acesso às variáveis da função externa (ou mãe) devido ao conceito de "encapsulamento" ou "fechamento" do escopo. Quando uma função interna é executada, seu escopo é fechado, ou seja, ele mantém referência às variáveis externas mesmo após a execução da função externa ter terminado.

A seguir, temos um exemplo prático em JavaScript:

```javascript
function counter() {
  let count = 0;

  function increment() {
    count++;
    console.log(count);
  }

  return increment;
}

const incrementCounter = counter();
incrementCounter(); // Output: 1
incrementCounter(); // Output: 2
```

No exemplo acima, a função `counter` retorna outra função chamada `increment`. Quando chamamos `counter()`, estamos criando uma nova instância da função `increment` com seu próprio escopo fechado, mantendo a variável `count` em memória. Dessa forma, cada vez que chamamos `incrementCounter()`, o valor de `count` é incrementado e exibido no console.

### Uso prático dos Closures
Os closures são extremamente úteis em situações onde precisamos criar funções com estado próprio, ou seja, funções que mantêm seu próprio contexto interno sem depender do escopo global. Eles também são utilizados em casos de currying, onde uma função recebe um número variável de argumentos e retorna outra função com os parâmetros parciais já definidos.

Um exemplo de uso prático dos closures é a criação de funções de alto nível que precisam ter acesso às variáveis do escopo externo, como no caso de iteradores ou loopings:

```javascript
function makeIterator(array) {
  let index = 0;

  return {
    next: function() {
      if (index >= array.length) {
        return null;
      }
      const result = array[index];
      index++;
      return { value: result, done: false };
    }
  };
}

const it = makeIterator([1, 2, 3]);
console.log(it.next()); // Output: { value: 1, done: false }
console.log(it.next()); // Output: { value: 2, done: false }
console.log(it.next()); // Output: { value: 3, done: false }
console.log(it.next()); // Output: null
```

No exemplo acima, a função `makeIterator` recebe um array como parâmetro e retorna um objeto com um método chamado `next`. O método `next` tem acesso à variável externa `index`, que é incrementada a cada chamada. Dessa forma, podemos iterar sobre o array sem precisar de uma estrutura de loop explícita.

### Conclusão
Os closures são um conceito fundamental em JavaScript e uma ferramenta poderosa para desenvolvedores que buscam criar código mais modular, reutilizável e eficiente. Compreender como eles funcionam pode nos ajudar a escrever código mais limpo, seguro e performático.
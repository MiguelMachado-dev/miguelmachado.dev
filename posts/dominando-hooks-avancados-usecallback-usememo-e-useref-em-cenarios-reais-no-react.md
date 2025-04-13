---
layout: post
date: 2025-04-09 18:00:57
image: /assets/img/dominando-hooks-avan-ados-usecallback-usememo-e-useref-em-cen-rios-reais-no-react.png
title: "Dominando Hooks Avançados: useCallback, useMemo e useRef em Cenários Reais no React"
description: "Vá além do useState e useEffect! Aprenda a otimizar suas aplicações React com exemplos práticos de useCallback, useMemo e useRef em TypeScript, entendendo quando e por que usá-los para evitar re-renderizações desnecessárias e gerenciar referências."
main-class: js
color: "#a29330"
background: "#a29330"
tags:
  - react
  - hooks
  - usecallback
  - usememo
  - useref
  - otimização de performance
category: react
---

# Introdução: Além dos Hooks Básicos

![Dominando Hooks Avançados](/assets/img/dominando-hooks-avan-ados-usecallback-usememo-e-useref-em-cen-rios-reais-no-react.png)

Se você já trabalha com React há algum tempo, `useState` e `useEffect` provavelmente são seus companheiros diários. Eles formam a base da lógica de estado e ciclo de vida em componentes funcionais. No entanto, à medida que as aplicações crescem em complexidade, surgem desafios de performance, principalmente relacionados a re-renderizações desnecessárias.

É aqui que entram os Hooks "avançados": `useCallback`, `useMemo` e `useRef`. Eles não são necessariamente mais complexos de usar, mas seu propósito principal é a **otimização** e o gerenciamento de cenários específicos que os Hooks básicos não cobrem diretamente.

Neste artigo, vamos explorar cada um desses Hooks com exemplos práticos em TypeScript, focando em cenários reais onde eles brilham e ajudam a criar aplicações React mais eficientes e robustas.

## Entendendo a Re-renderização no React

Antes de mergulhar nos Hooks de otimização, é crucial entender por que um componente React re-renderiza:

1. **Mudança de Estado:** Quando o estado de um componente (gerenciado por `useState` ou `useReducer`) muda.
2. **Mudança de Props:** Quando as props recebidas de um componente pai são alteradas. **Importante:** React usa comparação por referência (`Object.is`) para objetos e funções. Isso significa que `{} !== {}` e `() => {} !== () => {}` (sempre `false`).
3. **Re-renderização do Pai:** Quando um componente pai re-renderiza, seus filhos também re-renderizam por padrão, a menos que otimizações sejam aplicadas (como `React.memo`).
4. **Context Update:** Quando um valor de contexto que o componente consome é alterado.

O problema surge quando re-renderizações ocorrem sem necessidade real, como passar uma nova instância de uma função (mesmo que com a mesma lógica) para um componente filho otimizado, ou recalcular valores complexos em cada renderização.

## useCallback: Memoizando Funções

**O que faz?** `useCallback` retorna uma versão *memoizada* da função callback que você passou. Essa função memoizada só muda se uma de suas dependências (listadas no array de dependências) for alterada.

**Por que usar?**
Principalmente para otimizar componentes filhos que dependem de callbacks passados como props. Se você passa uma função definida diretamente no corpo do componente pai para um filho envolvido em `React.memo`, o filho re-renderizará a cada renderização do pai, pois a função será uma nova instância a cada vez (falha na comparação por referência). `useCallback` garante que a mesma instância da função seja passada enquanto as dependências não mudarem.

**Cenário Real:** Passar um manipulador de eventos para um componente de item de lista memoizado.

```typescript
import React, { useState, useCallback } from 'react';

// Interface para as props do componente filho
interface ListItemProps {
  item: { id: number; text: string };
  onRemove: (id: number) => void; // Callback
}

// Componente filho memoizado para evitar re-renderizações desnecessárias
const ListItem = React.memo(({ item, onRemove }: ListItemProps) => {
  console.log(`Renderizando Item: ${item.id}`);
  return (
    <li>
      {item.text}
      <button onClick={() => onRemove(item.id)}>Remover</button>
    </li>
  );
});

// Componente Pai
const ListComponent: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
  ]);
  const [newItemText, setNewItemText] = useState('');

  // SEM useCallback: Uma nova função `handleRemove` é criada em CADA renderização de ListComponent.
  // Isso faria com que TODOS os `ListItem` re-renderizassem quando algo no pai muda (ex: digitar no input).
  // const handleRemove = (id: number) => {
  //   setItems(prevItems => prevItems.filter(item => item.id !== id));
  // };

  // COM useCallback: A função `handleRemove` só é recriada se as dependências mudarem.
  // A mesma referência de função é passada para os `ListItem`, permitindo que `React.memo` funcione corretamente.
  const handleRemove = useCallback((id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []); // setItems é estável entre renderizações, então não precisa estar aqui

  const handleAdd = () => {
      if (!newItemText.trim()) return;
      const newItem = { id: Date.now(), text: newItemText };
      setItems(prevItems => [...prevItems, newItem]);
      setNewItemText('');
  }

  console.log("Renderizando ListComponent");

  return (
    <div>
      <input
        type="text"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        placeholder="Novo item"
      />
      <button onClick={handleAdd}>Adicionar</button>
      <ul>
        {items.map(item => (
          <ListItem key={item.id} item={item} onRemove={handleRemove} />
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
```

**Observações importantes:**

1. As funções updater do `useState` (como `setItems(prevItems => ...)`) têm garantia de estabilidade pelo React, então não precisam ser listadas nas dependências
2. Se uma callback precisar acessar valores de estado ou props, esses valores precisam ser incluídos no array de dependências
3. Ideal para evitar renderizações em componentes memoizados e reduzir o trabalho do garbage collector

**Quando não usar:** Se a função não é passada como prop para um componente memoizado (`React.memo`), ou se não é usada como dependência em outros Hooks (como `useEffect`), o custo da memoização geralmente supera o benefício.

## useMemo: Memoizando Valores Computados

**O que faz?** `useMemo` retorna um valor *memoizado* resultante da execução da função que você passou. Ele recomputa o valor apenas quando uma das dependências (listadas no array de dependências) muda.

**Por que usar?**
Para evitar cálculos computacionalmente caros em cada renderização. Se um cálculo depende de props ou estado que não mudam frequentemente, `useMemo` pode armazenar o resultado e retorná-lo diretamente nas renderizações subsequentes, economizando tempo de processamento.

**Cenário Real:** Filtrar ou processar uma lista grande de dados que só deve ser recalculada quando os dados brutos ou os critérios de filtro mudarem.

```typescript
import React, { useState, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

const initialProducts: Product[] = [
  // Imagine uma lista muito grande aqui (ex: 1000+ produtos)
  { id: 1, name: "Laptop Gamer", category: "Eletrônicos", price: 7500 },
  { id: 2, name: "Mouse Pad", category: "Acessórios", price: 80 },
  { id: 3, name: "Teclado Mecânico", category: "Eletrônicos", price: 450 },
  { id: 4, name: "Monitor Ultrawide", category: "Eletrônicos", price: 2200 },
  // ... mais produtos
];

// Função "cara" simulada (poderia ser um filtro complexo, ordenação, etc.)
const filterAndSortProducts = (products: Product[], categoryFilter: string): Product[] => {
  console.log(`--- Calculando Produtos Filtrados (Categoria: ${categoryFilter || 'Todas'}) ---`);

  // Em um caso real, este poderia ser um cálculo realmente intensivo
  const filtered = categoryFilter
    ? products.filter(p => p.category === categoryFilter)
    : products;

  return filtered.sort((a, b) => a.price - b.price); // Ordena por preço
};

const ProductList: React.FC = () => {
  const [products] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Estado irrelevante para a lista

  // SEM useMemo: filterAndSortProducts seria chamado em CADA renderização,
  // mesmo quando apenas `theme` muda, o que é desnecessário e custoso.
  // const visibleProducts = filterAndSortProducts(products, selectedCategory);

  // COM useMemo: filterAndSortProducts só é chamado quando `products` ou `selectedCategory` mudam.
  // Mudar o `theme` não causará o recálculo.
  const visibleProducts = useMemo(() => {
    return filterAndSortProducts(products, selectedCategory);
  }, [products, selectedCategory]);

  // Também podemos memoizar valores derivados mais simples
  const productCount = useMemo(() => {
    return visibleProducts.length;
  }, [visibleProducts]);

  console.log("Renderizando ProductList");

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <h2>Lista de Produtos ({productCount})</h2>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Mudar Tema ({theme})
      </button>

      <div>
        <label>Filtrar por Categoria: </label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Todas</option>
          <option value="Eletrônicos">Eletrônicos</option>
          <option value="Acessórios">Acessórios</option>
        </select>
      </div>

      <ul>
        {visibleProducts.map(product => (
          <li key={product.id}>
            {product.name} ({product.category}) - R$ {product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
```

**Casos de uso adicionais:**
1. Memoizar objetos passados como props para componentes filhos memoizados
2. Evitar recriação de objetos complexos que causam re-renderizações quando passados para outros componentes
3. Preparação de dados em formatação específica para gráficos ou visualizações

**Quando não usar:** Para cálculos simples e rápidos. A sobrecarga do `useMemo` pode ser maior que o benefício. Use apenas quando o cálculo for genuinamente caro ou quando a estabilidade referencial for necessária.

## useRef: Acessando o DOM e Mantendo Referências Mutáveis

**O que faz?** `useRef` retorna um objeto ref mutável cuja propriedade `.current` é inicializada com o argumento passado (initialValue). O objeto retornado persistirá durante todo o ciclo de vida do componente. **Importante:** Alterar a propriedade `.current` de um ref *não* causa uma nova renderização.

**Por que usar?**
1. **Acessar Elementos DOM:** Para interagir diretamente com nós do DOM (ex: focar um input, medir dimensões, integrar com bibliotecas não-React).
2. **Manter Valores Mutáveis:** Para armazenar um valor que precisa persistir entre renderizações, mas que não deve disparar uma nova renderização quando alterado (diferente do estado).

**Cenário Real 1:** Focar um campo de input automaticamente quando o componente monta.

```typescript
import React, { useRef, useEffect } from 'react';

const AutoFocusInput: React.FC = () => {
  // Cria uma ref. Inicialmente, inputRef.current é null.
  // Especificamos o tipo do elemento DOM que a ref irá referenciar.
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Dentro do useEffect (que roda após a montagem do DOM),
    // inputRef.current apontará para o elemento <input>.
    // Usamos optional chaining (?.) por segurança, caso a ref não seja atribuída.
    inputRef.current?.focus();
  }, []); // Array de dependências vazio significa que roda apenas uma vez, após a montagem.

  return (
    <div>
      <label htmlFor="myInput">Input com Foco Automático: </label>
      {/* Associa a ref ao elemento input no DOM */}
      <input ref={inputRef} type="text" id="myInput" />
    </div>
  );
};

export default AutoFocusInput;
```

**Cenário Real 2:** Armazenar o valor anterior de uma prop ou estado.

```typescript
import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
    initialCount?: number;
}

const PreviousValueCounter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);
  // Ref para guardar o valor anterior de 'count'
  const prevCountRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Este efeito roda *depois* da renderização.
    // Então, atualizamos a ref com o valor *atual* de 'count'
    // para que na *próxima* renderização, a ref contenha o valor anterior.
    prevCountRef.current = count;
  }, [count]); // Roda sempre que 'count' mudar

  // Durante a renderização, prevCountRef.current ainda contém o valor da renderização anterior.
  const prevCount = prevCountRef.current;

  return (
    <div>
      <p>Contador Atual: {count}</p>
      <p>Contador Anterior: {prevCount === undefined ? 'N/A' : prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Incrementar</button>
    </div>
  );
};

export default PreviousValueCounter;
```

**Cenário Real 3:** Armazenar uma referência a um intervalo (setInterval) para limpá-lo depois.

```typescript
import React, { useState, useEffect, useRef } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  // O tipo correto para timers no TypeScript é NodeJS.Timeout
  // ou usar number e depois aplicar cast quando necessário
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Inicia o timer
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Função de limpeza que será executada quando o componente desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Executa apenas na montagem

  const handleReset = () => {
    setSeconds(0);
  };

  return (
    <div>
      <p>Timer: {seconds} segundos</p>
      <button onClick={handleReset}>Resetar</button>
    </div>
  );
};

export default Timer;
```

**Quando não usar:** Para gerenciar dados que devem acionar uma atualização visual na tela quando mudam – para isso, use `useState` ou `useReducer`.

## Tipo Correto para useRef com TypeScript

Um erro comum em TypeScript é definir uma ref para um elemento DOM sem o tipo correto:

```typescript
// ❌ Incorreto - Não permite null inicialmente
const inputRef = useRef<HTMLInputElement>();

// ✅ Correto - O tipo inclui null para o valor inicial
const inputRef = useRef<HTMLInputElement | null>(null);
```

Ou quando criamos uma ref para armazenar um valor mutável:

```typescript
// ❌ Incorreto - Não especifica undefined
const prevValueRef = useRef<number>();

// ✅ Correto - Tipo correto com valor inicial
const prevValueRef = useRef<number | undefined>(undefined);
```

## Cuidado com a Otimização Prematura

Embora `useCallback`, `useMemo` e `useRef` sejam ferramentas poderosas, é fundamental não cair na armadilha da **otimização prematura**. React já é bastante rápido por padrão.

* **Não use `useCallback` e `useMemo` em todo lugar.** Eles têm um custo (criação da função/valor memoizado, comparação de dependências). Use-os apenas quando houver um gargalo de performance *real* e mensurável, geralmente identificado com ferramentas de profiling (React DevTools Profiler).
* **`React.memo` é frequentemente o pré-requisito:** `useCallback` e `useMemo` são mais eficazes quando usados em conjunto com componentes otimizados via `React.memo` ou quando as dependências de `useEffect` precisam ser estáveis.
* **Simplicidade primeiro:** Comece com o código mais simples e otimize apenas onde for necessário.

## Práticas Recomendadas e Padrões Comuns

### useCallback

1. **Evite dependências desnecessárias**
   ```typescript
   // ❌ Subótimo - inclui dependência desnecessária
   const handleSubmit = useCallback(() => {
     console.log('Submitting...');
     setSubmitting(true);
   }, [setSubmitting]); // setSubmitting é estável, não precisa estar aqui

   // ✅ Melhor - sem dependências desnecessárias
   const handleSubmit = useCallback(() => {
     console.log('Submitting...');
     setSubmitting(true);
   }, []);
   ```

2. **Use junto com React.memo para máxima eficiência**
   ```typescript
   // O componente filho só re-renderiza se suas props mudarem
   const ChildComponent = React.memo(({ onClick }) => {
     return <button onClick={onClick}>Click me</button>;
   });

   function ParentComponent() {
     // Esta função mantém a mesma referência entre renderizações
     const handleClick = useCallback(() => {
       console.log('Clicked!');
     }, []);

     return <ChildComponent onClick={handleClick} />;
   }
   ```

### useMemo

1. **Evite computações desnecessárias**
   ```typescript
   // ❌ Subótimo - executa filterExpensiveItems em cada renderização
   function ProductList({ products, threshold }) {
     const expensiveItems = products.filter(p => p.price > threshold);
     // ...
   }

   // ✅ Melhor - só recalcula quando products ou threshold mudam
   function ProductList({ products, threshold }) {
     const expensiveItems = useMemo(() => {
       return products.filter(p => p.price > threshold);
     }, [products, threshold]);
     // ...
   }
   ```

2. **Memoize objetos passados como props**
   ```typescript
   // ❌ Subótimo - cria um novo objeto em cada renderização
   function Parent() {
     const options = { sortBy: 'price', limit: 5 };
     return <Child options={options} />;
   }

   // ✅ Melhor - mantém a mesma referência se nada mudar
   function Parent() {
     const options = useMemo(() => {
       return { sortBy: 'price', limit: 5 };
     }, []);
     return <Child options={options} />;
   }
   ```

### useRef

1. **Armazenar valores sem causar re-renderizações**
   ```typescript
   function ScrollTracker() {
     // Guarda a posição de rolagem sem causar re-renderizações
     const lastScrollY = useRef(0);

     useEffect(() => {
       const handleScroll = () => {
         const currentScrollY = window.scrollY;
         if (Math.abs(currentScrollY - lastScrollY.current) > 50) {
           console.log('Rolagem significativa detectada');
           lastScrollY.current = currentScrollY;
         }
       };

       window.addEventListener('scroll', handleScroll);
       return () => window.removeEventListener('scroll', handleScroll);
     }, []);

     // ...
   }
   ```

2. **Integrações com bibliotecas de terceiros**
   ```typescript
   function ChartComponent({ data }) {
     const chartRef = useRef(null);
     const chartInstanceRef = useRef(null);

     useEffect(() => {
       if (chartRef.current) {
         // Criando uma instância da biblioteca de gráficos
         chartInstanceRef.current = new ChartLibrary(chartRef.current);
         chartInstanceRef.current.render(data);
       }

       // Limpeza quando o componente desmontar
       return () => {
         if (chartInstanceRef.current) {
           chartInstanceRef.current.destroy();
         }
       };
     }, [data]);

     return <div ref={chartRef} />;
   }
   ```

## Conclusão

Dominar `useCallback`, `useMemo` e `useRef` eleva suas habilidades em React, permitindo criar aplicações mais performáticas e lidar com cenários complexos de forma elegante.

* **`useCallback`** é seu aliado para estabilizar referências de funções, crucial para otimizar componentes filhos memoizados e dependências de `useEffect`.
* **`useMemo`** brilha ao evitar recálculos caros, garantindo que operações pesadas só ocorram quando suas dependências realmente mudarem.
* **`useRef`** oferece uma ponte para o DOM e uma maneira de manter valores mutáveis que não disparam re-renderizações.

Lembre-se de usá-los com propósito, focando em resolver problemas reais de performance ou necessidade de referências estáveis, e sempre meça o impacto de suas otimizações. Com prática e compreensão, esses Hooks se tornarão ferramentas valiosas no seu arsenal de desenvolvimento React.

---

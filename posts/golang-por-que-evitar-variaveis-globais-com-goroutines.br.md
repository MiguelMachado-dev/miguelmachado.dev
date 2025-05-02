---
layout: post
date: 2025-04-14 15:30:14
title: "Golang: Por que evitar variáveis globais com goroutines"
description: "Descubra os perigos ocultos de usar variáveis globais em programas Go concorrentes que utilizam goroutines. Aprenda sobre race conditions e explore alternativas mais seguras e idiomáticas para gerenciar estado compartilhado."
main-class: go
color: "#007d9c"
tags:
  - golang
  - goroutines
  - concorrência
  - variáveis globais
  - race condition
  - boas práticas
---

# Introdução: O Poder e o Perigo da Concorrência em Go

Go brilha quando o assunto é concorrência. Com sua sintaxe simples e o poderoso conceito de *goroutines* e *channels*, criar programas que executam múltiplas tarefas simultaneamente torna-se incrivelmente acessível. Goroutines são funções ou métodos que rodam concorrentemente com outras funções ou métodos. São leves, permitindo que você execute milhares, até milhões delas, em uma única aplicação.

No entanto, essa facilidade traz consigo responsabilidades. Um dos anti-patterns mais comuns e perigosos ao trabalhar com concorrência em Go é o uso inadequado de variáveis globais compartilhadas entre múltiplas goroutines. Embora possam parecer convenientes à primeira vista, elas são uma receita quase certa para dores de cabeça, bugs difíceis de rastrear e comportamento imprevisível.

Neste artigo, vamos explorar por que você deve pensar duas (ou três!) vezes antes de usar variáveis globais em seus programas Go concorrentes e quais alternativas mais seguras e robustas existem.

## O Problema Central: Condições de Corrida (Race Conditions)

O principal vilão ao compartilhar variáveis globais entre goroutines sem a devida sincronização é a **condição de corrida (race condition)**.

Uma race condition ocorre quando:

1.  Múltiplas goroutines acessam o mesmo recurso compartilhado (neste caso, uma variável global).
2.  Pelo menos uma dessas goroutines está *modificando* o recurso.
3.  Não há sincronização explícita para controlar o acesso a esse recurso.

O resultado? A ordem de execução das operações de leitura e escrita torna-se não determinística, dependendo de como o scheduler do Go decide executar as goroutines. Isso leva a resultados inconsistentes e muitas vezes incorretos, que podem variar a cada execução do programa.

Imagine duas goroutines tentando incrementar um contador global `contador := 0` ao mesmo tempo:

*   Goroutine A lê `contador` (valor 0).
*   Goroutine B lê `contador` (valor 0).
*   Goroutine A calcula `0 + 1 = 1`.
*   Goroutine B calcula `0 + 1 = 1`.
*   Goroutine A escreve `1` em `contador`.
*   Goroutine B escreve `1` em `contador`.

Esperávamos que o resultado fosse 2, mas devido à race condition, o resultado final é 1.

### Exemplo Prático (Problemático)

Vamos ver um exemplo de código que demonstra esse problema:

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// Variável global compartilhada
var contadorGlobal int

func main() {
	var wg sync.WaitGroup
	numeroDeGoroutines := 1000

	wg.Add(numeroDeGoroutines)

	for i := 0; i < numeroDeGoroutines; i++ {
		go func() {
			defer wg.Done()
			// Operação não atômica que causa a race condition
			valorAtual := contadorGlobal
			// Pequeno delay para aumentar a chance da race condition ocorrer
            time.Sleep(time.Microsecond)
			valorAtual++
			contadorGlobal = valorAtual
		}()
	}

	wg.Wait() // Espera todas as goroutines terminarem

	fmt.Printf("Valor final esperado (teoricamente): %d\n", numeroDeGoroutines)
	fmt.Printf("Valor final real do contador: %d\n", contadorGlobal)
}
```

Se você executar este código (`go run main.go`), notará que o "Valor final real do contador" raramente (ou nunca) será 1000. O valor será inconsistente a cada execução.

**Detectando Race Conditions:** Felizmente, Go possui uma ferramenta integrada para detectar race conditions. Execute o código com a flag `-race`:

```bash
go run -race main.go
```

Você provavelmente verá um aviso como `WARNING: DATA RACE`, indicando exatamente onde as leituras e escritas conflitantes estão ocorrendo.

### Impactos Negativos do Uso de Globais com Goroutines

Além das race conditions óbvias, usar variáveis globais em cenários concorrentes traz outros problemas:

1.  **Resultados Imprevisíveis:** Como vimos, o estado final da variável é incerto.
2.  **Debugging Dificultado:** Race conditions são notoriamente difíceis de depurar porque são sensíveis ao timing e podem não ocorrer consistentemente.
3.  **Manutenibilidade Reduzida:** O estado global torna o código mais difícil de entender e raciocinar sobre. Não fica claro quais partes do código podem modificar a variável, tornando refatorações e adições de features mais arriscadas.
4.  **Testabilidade Comprometida:** Testes unitários tornam-se mais complexos, pois o estado global pode vazar entre testes ou exigir configurações complicadas para isolar o componente sendo testado.

### Alternativas Seguras e Idiomáticas

Felizmente, Go oferece mecanismos excelentes para gerenciar estado compartilhado de forma segura em ambientes concorrentes.

**1. Passagem Explícita de Variáveis (Preferível)**

A maneira mais idiomática e geralmente mais segura é evitar o estado compartilhado global sempre que possível. Em vez disso, passe os dados necessários como parâmetros para as goroutines e retorne resultados através de canais ou outros meios.

```go
package main

import (
	"fmt"
	"sync"
	"sync/atomic" // Pacote para operações atômicas
)

func worker(id int, contador *int64, wg *sync.WaitGroup) {
	defer wg.Done()
	// Operação atômica segura para incrementar
	atomic.AddInt64(contador, 1)
	// fmt.Printf("Worker %d incrementou\n", id) // Opcional
}

func main() {
	var contador int64 // Usando int64 para compatibilidade com atomic
	var wg sync.WaitGroup
	numeroDeGoroutines := 1000

	wg.Add(numeroDeGoroutines)

	for i := 0; i < numeroDeGoroutines; i++ {
		// Passando o ponteiro do contador para a goroutine
		go worker(i, &contador, &wg)
	}

	wg.Wait()

	fmt.Printf("Valor final esperado: %d\n", numeroDeGoroutines)
	fmt.Printf("Valor final real do contador: %d\n", contador)
}
```

Neste exemplo (usando `sync/atomic` para segurança na incrementação), passamos um ponteiro para o contador, tornando a dependência explícita. Note que mesmo passando um ponteiro, a *operação* em si precisa ser segura para concorrência (daí o uso de `atomic.AddInt64`).

**2. Operações Atômicas (`sync/atomic`)**

Para operações simples como incremento, decremento e substituição de valores, o pacote `sync/atomic` oferece funções que garantem a atomicidade sem a necessidade de mutexes explícitos:

```go
package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

func main() {
	var contador int64 // Usando int64 para compatibilidade com atomic
	var wg sync.WaitGroup
	numeroDeGoroutines := 1000

	wg.Add(numeroDeGoroutines)

	for i := 0; i < numeroDeGoroutines; i++ {
		go func() {
			defer wg.Done()
			// Operação atômica - incremento seguro sem mutex
			atomic.AddInt64(&contador, 1)
		}()
	}

	wg.Wait()

	fmt.Printf("Valor final esperado: %d\n", numeroDeGoroutines)
	fmt.Printf("Valor final real do contador: %d\n", contador)
}
```

Esta abordagem é mais eficiente que usar mutexes para operações simples, pois evita o bloqueio completo, usando instruções específicas do processador para garantir a atomicidade.

**3. Canais (Channels)**

Canais são a forma preferida em Go para comunicação *entre* goroutines. Eles podem ser usados para passar dados ou para sincronizar a execução.

*"Não comunique compartilhando memória; em vez disso, compartilhe memória comunicando."* - Effective Go

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	numeroDeGoroutines := 1000
	requests := make(chan bool) // Canal para enviar "pedidos" de incremento
	done := make(chan bool)     // Canal para sinalizar o fim
	var wg sync.WaitGroup      // WaitGroup para garantir que todas as goroutines trabalhadoras terminem

	// Goroutine para gerenciar o contador centralmente
	go func() {
		contador := 0
		for i := 0; i < numeroDeGoroutines; i++ {
			<-requests // Espera um pedido
			contador++
		}
		fmt.Printf("Valor final real do contador: %d\n", contador)
		done <- true // Sinaliza que terminou
	}()

	// Lança as goroutines "trabalhadoras"
	wg.Add(numeroDeGoroutines)
	for i := 0; i < numeroDeGoroutines; i++ {
		go func() {
			defer wg.Done()
			requests <- true // Envia um pedido de incremento
		}()
	}

	// Espera todas as goroutines trabalhadoras terminarem
	wg.Wait()

	// Espera a goroutine gerenciadora terminar
	<-done
	fmt.Printf("Valor final esperado: %d\n", numeroDeGoroutines)
}
```

Neste modelo, apenas uma goroutine modifica o estado, e as outras se comunicam com ela através de um canal, eliminando a race condition.

**4. Primitivas de Sincronização (`sync` package)**

Se você *realmente* precisa compartilhar memória (talvez por razões de performance ou estrutura de dados complexa), use as primitivas de sincronização do pacote `sync`, como `sync.Mutex` ou `sync.RWMutex`.

Um `Mutex` (Mutual Exclusion) garante que apenas uma goroutine possa acessar a seção crítica (o código que modifica a variável compartilhada) por vez.

```go
package main

import (
	"fmt"
	"sync"
)

var contadorGlobal int
var mutex sync.Mutex // Mutex para proteger o contadorGlobal

func incrementarContador() {
	// Bloqueia o mutex antes de acessar a variável global
	mutex.Lock()
	// --- Seção Crítica ---
	contadorGlobal++ // Incremento direto
	// --- Fim da Seção Crítica ---
	mutex.Unlock() // Libera o mutex
}

func main() {
	var wg sync.WaitGroup
	numeroDeGoroutines := 1000

	wg.Add(numeroDeGoroutines)

	for i := 0; i < numeroDeGoroutines; i++ {
		go func() {
			defer wg.Done()
			incrementarContador()
		}()
	}

	wg.Wait()

	fmt.Printf("Valor final esperado: %d\n", numeroDeGoroutines)
	fmt.Printf("Valor final real do contador: %d\n", contadorGlobal)
}
```

Este código agora produzirá o resultado correto (1000), pois o acesso à `contadorGlobal` está protegido pelo `mutex`. No entanto, o uso excessivo de mutexes pode levar a contenção e gargalos de performance, além de introduzir a possibilidade de *deadlocks* se não forem usados corretamente.

### Quando Variáveis Globais *Podem* Ser Aceitáveis (Com Cautela)

Existem algumas situações onde variáveis globais podem ser usadas com menos risco, mesmo em programas concorrentes:

1.  **Constantes:** Variáveis globais declaradas como `const` são imutáveis e, portanto, seguras para serem lidas por múltiplas goroutines.
2.  **Configuração Imutável:** Variáveis globais que são inicializadas uma vez no início do programa (antes de qualquer goroutine acessá-las) e depois são tratadas como *read-only* (somente leitura) pelo resto da execução do programa. Exemplos incluem configurações carregadas de arquivos ou variáveis de ambiente. É crucial garantir que nenhuma goroutine tente modificá-las após a inicialização.

Mesmo nesses casos, é importante documentar claramente a natureza imutável ou *read-only* dessas variáveis.

### Conclusão

Variáveis globais podem parecer uma solução fácil para compartilhar estado entre diferentes partes de um programa, mas quando combinadas com a concorrência das goroutines em Go, elas se tornam uma fonte significativa de bugs complexos e difíceis de rastrear, principalmente devido a race conditions.

Para escrever código Go concorrente robusto, seguro e manutenível:

*   **Prefira passar dados explicitamente** como parâmetros para goroutines.
*   **Use canais** para comunicação e sincronização entre goroutines.
*   **Recorra a primitivas de sincronização** (`sync.Mutex`, `sync.RWMutex`, `sync.atomic`) com cautela quando o compartilhamento de memória for estritamente necessário, protegendo cuidadosamente o acesso aos dados compartilhados.
*   **Limite o uso de variáveis globais** a constantes verdadeiras ou configurações imutáveis inicializadas no início do programa.

Adotar essas práticas não apenas evitará as armadilhas das race conditions, mas também levará a um código mais claro, mais testável e mais fácil de entender e manter a longo prazo. Pense na segurança da concorrência desde o início do seu design em Go!

---

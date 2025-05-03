---
layout: post
date: 2023-07-20 11:40:39
image: /assets/img/0_uee8onqy7l2gdq8q.png
title: Extraindo Dados Essenciais de APIs com Go Structs
description: Explore o poder das Structs do Go para simplificar a extração de dados de APIs. Este post mostra uma abordagem prática para usar Structs Go para decodificar respostas de API, focando apenas em dados essenciais, usando a API do GitHub como exemplo. É um guia prático para desenvolvedores que querem otimizar seu processo de gerenciamento de dados em Go.
main-class: go
color: "#007d9c"
tags:
  - go
  - golang
  - json
  - api
  - extract
  - unmarshal
  - structs
---
# Extraindo Dados Essenciais de APIs com Go Structs

O universo de dados é vasto, especialmente quando estamos lidando com APIs que retornam enormes quantidades de informação. Muitas vezes, a maioria desses dados pode ser irrelevante para a tarefa que estamos executando, tornando a filtragem de dados uma tarefa cansativa. No entanto, com a linguagem de programação Go, podemos simplificar esse processo usando um recurso chamado struct.

No post de hoje, vamos explorar como as structs em Go podem ser usadas para extrair apenas os dados que precisamos de uma resposta de API. Para isso, usaremos a API do GitHub como nosso exemplo.

## Entendendo Structs em Go

Em Go, uma struct é um tipo de dado composto que permite agrupar zero ou mais valores de outros tipos de dados. É como um blueprint personalizado que pode ser preenchido com os dados desejados. Cada valor em uma struct é referido como um campo. Você define uma struct e depois cria instâncias dela, que você pode manipular conforme desejar.

Aqui está um exemplo de uma struct simples em Go:

```go
type Pessoa struct {
    Nome    string
    Idade   int
    Endereco string
}
```

## Usando Structs para Decodificar Respostas de APIs

Agora, vamos pensar em uma situação onde estamos fazendo uma chamada para a API do GitHub e recebemos uma resposta JSON. No entanto, estamos interessados apenas em algumas informações específicas - por exemplo, o nome e o slug de um repositório.

Para fazer isso, podemos criar uma struct que tenha apenas os campos que precisamos:

```go
type Repositorio struct {
	Nome string `json:"name"`
	Slug string `json:"slug"`
}
```

Vamos fazer a chamada à API e obter a resposta:

```go
resp, err := http.Get("https://api.github.com/repos/openai/gpt-3")
if err != nil {
	log.Fatalln(err)
}

body, err := ioutil.ReadAll(resp.Body)
if err != nil {
	log.Fatalln(err)
}
```

E então podemos desserializar o JSON para nossa struct:

```go
var repo Repositorio
err = json.Unmarshal(body, &repo)
if err != nil {
	log.Fatalln(err)
}

fmt.Println(repo.Nome, repo.Slug)
```

Go automaticamente preencherá os campos `Nome` e `Slug` com os dados correspondentes do JSON e ignorará o resto.

Isso é uma economia poderosa de tempo e esforço, especialmente ao lidar com APIs que retornam grandes quantidades de dados. Com o uso de structs, podemos focar apenas nos dados que realmente importam para nossas necessidades de programação.

## Conclusão

A linguagem de programação Go fornece ferramentas robustas e eficazes para lidar com dados, facilitando o trabalho dos desenvolvedores para focar no que realmente importa. Neste post, exploramos o poder das structs e como elas podem ser usadas para extrair informações específicas de respostas complexas de APIs.
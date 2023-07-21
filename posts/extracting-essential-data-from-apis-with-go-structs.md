---
layout: post
date: 2023-07-20 11:40:39
title: Extracting Essential Data from APIs with Go Structs
description: Explore the power of Go Structs in simplifying data extraction from
  APIs. This blog post showcases a hands-on approach to using Go Structs for
  decoding API responses, focusing only on essential data, using the GitHub API
  as an example. It is a practical guide for developers aiming to streamline
  their data management process in Go.
main-class: css
color: "#637a91"
tags:
  - ""
---
# Extracting Essential Data from APIs with Go Structs

The data universe is vast, especially when we're dealing with APIs that return huge amounts of information. Often, most of these data may be irrelevant to the task we're performing, making data sifting a tiresome task. However, with the Go programming language, we can simplify this process using a feature called struct.

In today's post, we'll explore how structs in Go can be used to extract only the data we need from an API response. For this, we'll be using the GitHub API as our example.

## Understanding Structs in Go

In Go, a struct is a composite data type that allows you to group zero or more values of other data types. It's like a custom blueprint that can be filled with the desired data. Each value in a struct is referred to as a field. You define a struct and then create instances of it, which you can manipulate as desired.

Here is an example of a simple struct in Go:

```go
type Person struct {
	Name    string
	Age     int
	Address string
}

```

## Using Structs to Decode API Responses

Now, let's think about a situation where we're making a call to the GitHub API and we receive a JSON response. However, we're only interested in some specific information - for instance, the name and slug of a repository.

To do this, we can create a struct that has only the fields we need:

```go
type Repository struct {
	Name string `json:"name"`
	Slug string `json:"slug"`
}

```

Let's make the API call and get the response:

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

And then we can unmarshal the JSON into our struct:

```go
var repo Repository
err = json.Unmarshal(body, &repo)
if err != nil {
	log.Fatalln(err)
}

fmt.Println(repo.Name, repo.Slug)

```

Go will automatically fill the `Name` and `Slug` fields with the corresponding data from the JSON and ignore the rest.

This is a powerful time and effort saver, especially when dealing with APIs that return large amounts of data. With the use of structs, we can focus only on the data that really matters to our programming needs.

## Conclusion

The Go programming language provides robust and effective tools for handling data, making it easier for developers to focus on what really matters. In this post, we explored the power of structs and how they can be used to extract specific information from complex API responses.
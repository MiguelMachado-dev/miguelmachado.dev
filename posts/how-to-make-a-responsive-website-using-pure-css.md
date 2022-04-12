---
date: 2019-12-07 11:24:38
image: /assets/img/rem-em-px.png
title: How to make a responsive website using pure CSS
description: How to use media queries and which unit to use to make a better responsive
main-class: css
color: "#2DA0C3"
background: "#2DA0C3"
category: css
---

## Introduction

When I was developing this blog I just knew it had to be responsive, and I know a lot of people have some doubts about what to do.

So today I'm going to show some tips about how to make your site more responsive with pure CSS!

![Image of a mobile, tablet and desktop, introducing to Responsive Subject](/assets/img/responsive-sources.jpg)

### Media queries

I think the biggest question always is: **breakpoints**

**Which ones should I use?**

And I got you. Here are the medias queries breakpoints I use in every project

```json
{
  "huge": "1440px",
  "large": "1170px",
  "medium": "768px",
  "small": "450px"
}
```

You dont have to set a new breakpoint every 100px, if you do, something is wrong with your responsive!

Why I said that?? Mobile-first! Which is our next topic!

### Mobile First

If you start your development in the mobile view your site will become so much responsive!

Adapting to large screens is much easier than adapting large screens to small screens, and mobile access is increasing so much that you don't want to lose their access because your app isn't responsive enough!

### The key to responsive!

On my blog, I just had to use one media query and it was 1170px.

For instance:

My sidebar will be showing at the top on mobile, so, to do that I just created this rule:

```css
@media (max-width: 1170px) {
  .blogWrapper {
    flex-direction: column;
  }
}
```

and now, the key... The secret is to use **REM**. ~~which won't make you [lose your religion](https://youtu.be/xwtdhWltSIg/)~~

I used **rem** in almost everywhere on my blog and it makes the responsive so much easier!

> [Check: Can I Use: REM](https://caniuse.com/#feat=rem)

> Type of unit similar to em, but relative only to the root element, not any parent element.

> Equal to the computed value of font-size on the root element. When specified on the font-size property of the root element, the rem units refer to the property’s initial value.

This means that 1rem equals the font size of the HTML element (which for most browsers has a default value of 16px). Unless you change it 😊

That's it for today! In the next post we will see a lib where we can make our responsive so much fast, so stick around!

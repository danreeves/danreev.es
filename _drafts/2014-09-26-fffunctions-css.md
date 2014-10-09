---
layout: post
title: "fffunctions css"
tags: css frameworks workflow
---

 - [Quick Facts](#quick-facts)
 - [Preprocessor](#preprocessor)
   - [Compiler](#compiler)
 - [Architecture](#architecture)
   - [Sassaparilla](#sassaparilla)
     - [File Structure](#file-structure)
     - [Code Structure](#code-structure)
     - [Grid System](#grid-system)
   - [Style Guide Driven Development](#style-guide-driven-development)
 - [Bundles](#bundles)
 - [Platform](#platform)
 - [Performance](#performance)
 - [Prototyping](#prototyping)
 - [Refactoring](#refactoring)
 - [The Future](#the-future)

___

*This was written for the [fffunction blog](http://blog.fffunction.co/article/functions-css)*

This article is in response to some recent posts by [Mark Dotto](http://markdotto.com/2014/07/23/githubs-css/), [Lonely Planet](http://ianfeather.co.uk/css-at-lonely-planet/), and [Chris Coyier](http://codepen.io/chriscoyier/blog/codepens-css). I'm big on optimising architectures and workflows, so I found reading how other people are doing it pretty helpful. It's also great to validate your own thoughts while learning from others.

### Quick Facts

 - We write in Sass
 - We use our own framework: Sassaparilla
 - We have many source files
 - We compile to a single CSS file
 - This files size varies from 15kb to 100kb, but it's usually in the low end
 - Ems are the most commonly used unit, with about half as many uses of px
 - We use style guides/pattern libraries extensively

### Preprocessor

fffunction had a brief affair with LESS before I had joined the team, but we now use Sass for everything but legacy projects. There isn't much to say here, there are lots of good articles explaining [why you should be using Sass](http://alistapart.com/article/why-sass).

#### Compiler

For most of our projects we use Mixture as a compiler. There are many reasons for this, and we've written about using it in various places. Mixture comes with lots of great features, such as a built a built-in local server, liquid templating, and web hosting. These things make it a great fit for our fast prototype/feedback workflow.

When we're not using Mixture we use custom Gulpfiles for the project.

### Architecture

We're completely in the BEM camp, and try to take it as far as possible. There are occasions where are discipline falters and we fall back into giving things ambiguous classes but hopefully that's not too often. It took some time and some griping to get everyone on board initially. It can be a hard thing to get your head around, but in the long run I think we all agree that it was for the best and has made our codebases much more maintainable.

#### Sassaparilla

We use our framework, Sassaparilla, on every project. It's a really great, structured, starting point for any project. It's there to make writing all our CSS easier, but also to enforce a structure. You can read more about [Sassaparilla](http://sass.fffunction.co) itself on GitHub or our [netmag article](http://www.creativebloq.com/web-design/start-web-projects-faster-sassaparilla-11135367).

##### File Structure

Sassaparilla looks like this:

 - libs - sassaparilla core scss files
 - modules - user created modules
 - screen.scss - All imports and some base styling, this gets compiled and minified

The `libs` directory is all of Sassaparilla's core files, things like: resets, sensible defaults, variables, the grid system and other mixins. These files are generally left alone or configured for colours or site-wide typography.

The `modules` directory is where all the BEM defined blocks go, each in its own file. This keeps everything modular and never interdependent. This is further enforced by the potentially unordered importing of Sass globbing. We're big proponents for BEM syntax and structure, for how easily maintainable and self-documenting it keeps our code.

The `screen.scss` file is where everything is pulled together.

##### Code Structure

Obviously we keep our code just as strictly BEM as our file structure. We utilise Sass nesting to make this a little easier (to read, at least). We use BEM syntax as described by [Harry Roberts](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).

```
.block {}
.block__element {}
.block--modifier {}
```

##### Grid System

I wanted to quickly mention how we use responsive grid systems. Unlike lots of frameworks, we don't have a prescribed set of classes with a set number of columns and breakpoints.

Instead we have a set of @mixins to produce a grid of any amount of columns, up to (or down to) any breakpoint. This allows us to write modular grids, keeping it as minimal as possible.

#### Style Guide Driven Development

Another key part of our development practice is the Style Guide. For a while now we've been working Style Guide first; attempting to keep all markup and style development kept in the style guide as much as possible. This leaves us with an up-to-date style guide at the end of the project and a definitive set of blocks that make up our templates. The blocks that make up our pattern library tend to match up one-to-one with the modules in our CSS structure.

We use this style guide as the sole point of CSS, to avoid duplication, and thus all our projects tend to come with a style guide built in; that's a plus for everyone.

### Bundles

As I mentioned before our Sass is compiled and minified into a single file. This has been an okay approach so far since our sites generally aren't very large, and neither are our CSS files. One benefit is keeping it to only one request.

### Platform

I thought this section was worth adding because we deploy on a variety of platforms, and each comes with its differences.

Our own site is hosted by Mixture. This means that it's just a Mixture project on the backend which handles lots of nice things like image optimisation and the templating has helpers for adding CSS and JS files to the HTML.

We also use a lot of WordPress, and other CMSs. For these, as mentioned before, we keep a Mixture project pattern library in the same repo. All the CSS is compiled here by Mixture and we're loading the CSS file the usual way (often we can write our own helper functions/template tags).

Sometimes, like in large Django builds, we feel the complexity of using Mixture was unnecessary, while it also needed a more customised build process with lots of JavaScript files. In these circumstances we're using Gulp and once again Django has nice helpers for `<link>` tags.

### Performance

Performance is a thing I think we all have in mind while writing our Sass. We always aim for clean and concise CSS, but we don't put much concious effort in afterwards; there are often bigger fish to fry than getting the css a few bytes smaller. Other considerations tie back in with the platform of choice. A great feature of Mixture hosting is that everything is concatenated, minified, and speedily served from AWS.

### Prototyping

One of the big parts of fffunction is the importance of user experience and prototyping, so I thought it was worth mentioning.

We start every project with prototypes. Sometimes this HTML and CSS makes it through into the final project, but often it doesn't. When in the prototyping stage we use Foundation a lot, for it's large library of prebuilt components, grids, and styling.

### Refactoring

We don't often get a chance to go back to older projects and refactor code. However, as I just mentioned, we do a lot of prototyping along the road and we have no inhibitions with tearing out bad CSS and starting modules again. This is especially true when we realise one module could become two, perhaps two modules should really be one with different modifiers. The BEM methodology certainly gives you a lot to think about while writing CSS.

### The Future

Personally, I would love to start linting our CSS and running it through all sorts of optimisations, such as UnCSS, because however sure I am that we write nice clean code, I'm even more sure that things slip through. It would be great to streamline our optimisation of delivery such as prioritising above-the-fold code.

We're also internally working on a prototyping library which will hopefully let us prototype with more production ready code.

I hope this provides some more discussion and maybe even some direction. I think how we're doing things at fffunction, while perhaps not perfect, is worth shouting about. It's also served as a reflection on what we're doing and where we can improve.

It would be great to hear about how you handle these things; pass on your knowledge.

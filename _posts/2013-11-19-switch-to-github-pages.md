---
layout: post
title: A Switch to GitHub Pages
tags: github blogging
---

When I first built this blog I wanted somewhere I could easily write, publish, and archive my thoughts and things I have learnt. One of my main goals was keeping everyone stored on GitHub where it would be easily accessible in a raw format.

I quickly realised that it was a waste of time to maintain a separate repo for my posts and my site. I also wanted to streamline my publication/deployment process. Keeping an server up to date with multiple git repos via FTP was too much of a chore for me.

###GitHub Pages

[GitHub Pages](http://pages.github.com/) is a brilliant (and free!) service provided by [GitHub](https://github.com/) which serves static websites directly from a repository. Best of all, they support websites powered by [Jekyll](http://jekyllrb.com/), a blog-aware static site generator. This means that I can publish a new post with a simple `git push`.

Luckily, the templating syntax is very similar to [Pico](http://pico.dev7studios.com/) so my site needed very little reconstructing and it was mostly a file structure change.

This move also highlighted my choice in markdown for my content. All my post easily dropped into the new site and worked, minus a different meta data syntax and file name syntax. However, the Jekyll method does seem more future proof to me; meta data is now written in [YAML](http://yaml.org/) and the file names contain the publication date.

If you haven't yet tried a Jekyll site I strongly recommend it. It makes simple static sites very easy to create and maintain.

####Other Changes

The site has also had a make over! I went a minimalist style to keep the focus on the content (how adventurous of me).

I'm now using the font [Roboto](http://www.google.com/fonts/specimen/Roboto) which is the current [Android System Font](http://developer.android.com/design/style/typography.html).

I have also implemented a post search using [typeahead.js](http://twitter.github.io/typeahead.js/) by twitter, but more on that later.

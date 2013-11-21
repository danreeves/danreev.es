---
layout: post
tags: apps simplicity
---

I think it took the advent of the smart phone to help us realise that simple, single purpose apps are really good. It probably came from how limited the smartphone was, limited screen real estate; limited memory both in terms of storage and ram, but it had stuck around as phones and tablets became more powerful and it's a trend that has even made is way onto the desktop.

The reason this design is so popular is because it makes it incredibly easy for the user to do what they want to do.

Today I was attempting to create an image map with photoshop. I knew about the slice tool, so I quickly sliced up my image, added links and exported. Wrong! That's a `<table>`; fiddle around a bit and you can make it `<div>`s. Google didn't help either. [The tutorials I found were years old.](http://designertoday.com/Tutorials/Photoshop/827/Tackling.Image.Maps.Slices.and.Tables.Image.Ready.Tutorial.aspx) Eventually I discover that the [feature had been removed and I should use fireworks instead](http://forums.adobe.com/message/2930387). Ugh! Time to give up.

Here's what I should have done:
 - Search for image map app.
 - Install one.
 - Create the image map.

## The right tool for the job

The reason the feature was removed was probably (hopefully) exactly what I am talking about. Photoshop isn't the tool for that job, it doesn't need that functionality and keeping it was extra bloat. It's still a very feature-full app, I'm not a photoshop pro and in the position to tell you that it's not all needed, but how many people use photoshop for all of them.

My main use of it, and I think a lot of people might agree, is as a psd viewer for coding up designs. It shouldn't be like that. Where's my simple app that let's me view a psd, how and show layers, and maybe get some details out like dimensions or hex codes?

## Single responsibility

To give a coding analogy, photoshop would be a class that is a thousand lines long and has all the apps functionality. We already know this is wrong which is why OOP, encapsulation, and single responsibility are such important aspects to modern programming. The Unix philosophy starts: "Write programs that do one thing and do it well. Write programs that work together." We've been doing this for years with command line tools but it hasn't really translated over to full GUI apps. I think this is changing but it's up to us to build these apps.

## Go forth and code

So, in conclusion, we should all go and build some really simple but really great apps. Use open formats &amp; play nicely with others.

___

I wrote this on the bus on the way home from work so if anything is wrong or if you have some suggestions for me on great apps to use (especially a psd viewer) let me know on Twitter - [@heydanreeves](https://twitter.com/HeyDanReeves)

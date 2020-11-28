---
published: 2020-11-28
---

# Rendering smol images with chonky pixels

Look at this lil fella:

![A small image](/img/chonky-pixels/small.jpg)

If you've ever rendered a jpeg on the internet you've probably
seen something like this:

![A blurry scaled image](/img/chonky-pixels/blurry.png)

It's blurry because the browser is interpolating the missing pixels, smearing the
few pixels over the screen. This works fine for large images or small differences
in size, but what if I actually want to see those chunky pixels.

What I actually want it to look like is this:

![A pixelated image](/img/chonky-pixels/crunchy.png)

Browsers are making this possible with a new CSS rule: `image-rendering: pixelated;`

The browser support for this is pretty good, but not universal. You can check
it out on [Can I Use](https://caniuse.com/mdn-css_properties_image-rendering_pixelated).

## How it works

```
img {
  image-rendering: pixelated;
}

// Wow that was easy.
```

## Not so fast!

What about those poor browsers that don't support it yet? We can't just let them
have gross stretched out blurry pixels. They want crisp blocks too. Nay, they
need them.

How about some JavaScript? Sure. Turns out browsers have added a neat little
API to detect whether a browser supports some CSS.

```
let supportsPixelated =
  CSS &&
  CSS.supports &&
  CSS.supports("image-rendering", "pixelated")
```

What we're saying here is _if_ the `CSS` object exists _and if_ the `CSS` object
has a `supports` function on it, we can call it with the CSS property and value
we want to use. If any of this returns `false` it's safe to say that the
browser does not support it. If it's true then it does. So now we know if the browser
supports `image-rendering: pixelated` we can leave it alone if it does and do something
about it if it doesn't.

Turns out the next part is also pretty easy.

```
  let img = document.querySelector("img")
  let canvas = document.createElement("CANVAS")
  canvas.width = img.width
  canvas.height = img.height
  img.parentNode.insertBefore(canvas, img.nextSibling)
  let ctx = canvas.getContext("2d")
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(img, 0, 0, img.width, img.height)
  img.parentElement.removeChild(img)
```

Okay so that was like nine lines of code in a row so let's go through it one
at a time and figure out what we're doing together.

<dl>

<dt><code>let img = document.querySelector("img")</code></dt>
<dd>This gets a reference to the image node in our document and puts it in our variable `img`.</dd>

<dt><code>let canvas = document.createElement("CANVAS")</code></dt>
<dd>This creates a new <a href="https://developer.mozilla.org/en-US/docs/Glossary/Canvas">&lt;canvas /&gt;</a>
element and puts it in our variable <code>canvas</code>.</dd>

<dt><code>
  canvas.width = img.width
  <br>
  canvas.height = img.height
</code></dt>
<dd>This sets the width and the height of the canvas element to the same as the
original image element.</dd>

<dt><code>img.parentNode.insertBefore(canvas, img.nextSibling)</code></dt>
<dd>Take our created canvas element and insert it into the DOM right after the &lt;img /&gt;.
Note that this might only work if there is an element after the image.</dd>

<dt><code>let ctx = canvas.getContext("2d")</code></dt>
<dd>This is how we get access to the programmable part of the canvas. We're choosing
the "2d" mode since we're just rendering a 2D image.</dd>

<dt><code>ctx.imageSmoothingEnabled = false</code></dt>
<dd>This is where the magic happens. We're telling the canvas to disable it's built
in image smoothing, which is the thing that blurs our images by default.</dd>

<dt><code>ctx.drawImage(img, 0, 0, img.width, img.height)</code></dt>
<dd>We call the `drawImage` method on the 2D canvas context with out the reference
to our image. `0, 0` refers to us starting drawing the image from the top left
corner of the canvas: coordinates 0 0. The next two parameters are number of pixels
we're drawing the image over, which is just the size of the canvas & image since they
are all the same.</dd>

<dt><code>img.parentElement.removeChild(img)</code></dt>
<dd>Now we've drawn the canvas we can remove the image element from the DOM so
we don't have a duplicate.</dd>

</dl>

And that's it. We replace the &lt;img /&gt; with a &lt;canvas /&gt; containing
the same image.

And here's how it looks:

<img src="/img/chonky-pixels/small.jpg" class="demo-canvas" />

<style>
  .demo-canvas {
	image-rendering: pixelated;
	width: 100%;
  }
</style>

<script>
  window.addEventListener("load", function() {
	let img = document.querySelector(".demo-canvas")
	let canvas = document.createElement("CANVAS")
	canvas.width = img.width
	canvas.height = img.height
	img.parentNode.insertBefore(canvas, img.nextSibling)
	let ctx = canvas.getContext("2d")
	ctx.imageSmoothingEnabled = false
	ctx.drawImage(img, 0, 0, img.width, img.height)
	img.parentElement.removeChild(img)
  })
</script>

```
<img
  src="/img/chonky-pixels/small.jpg"
  class="demo-canvas"
  />

<style>
  .demo-canvas {
	image-rendering: pixelated;
	width: 100%;
  }
</style>

<script>
  window.addEventListener("load", function() {
	let img = document.querySelector(".demo-canvas")
	let canvas = document.createElement("CANVAS")
	canvas.width = img.width
	canvas.height = img.height
	img.parentNode.insertBefore(canvas, img.nextSibling)
	let ctx = canvas.getContext("2d")
	ctx.imageSmoothingEnabled = false
	ctx.drawImage(img, 0, 0, img.width, img.height)
	img.parentElement.removeChild(img)
  })
</script>
```

This isn't totally finished. We deleted the image tag without carrying over any
of the accessibilty like the `alt` attribute. That's okay if it's purely decorative,
but otherwise you gotta do it. Promise?

Cool! Have a <span class="todaything">happy</span> <span class="todayday">Thursday</span>! &mdash; <a href="https://twitter.com/dnrvs">@dnrvs</a>

<script>
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]
let things = [
  "nice",
  "relaxing",
  "happy",
]
document.querySelector(".todayday").innerText = days[new Date().getDay()]
document.querySelector(".todaything").innerText = things[Math.round(Math.random() * 2 + 1) - 1]
</script>

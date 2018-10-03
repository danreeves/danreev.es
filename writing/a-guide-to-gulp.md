+++
published = "2014–06–12"
+++

# A guide to Gulp

In this article we'll be writing a build script that can compile
[Sassaparilla](http://sass.fffunction.co/), our Sass powered css framework. You
might want to [grab a copy of the
repo](https://github.com/fffunction/sassaparilla), or try it out on one of your
projects.

*This is an adaptation of an article I wrote for the July edition of Net
Magazine.*

Everyone who's [aware of
Grunt](http://24ways.org/2013/grunt-is-not-weird-and-hard/) will know what this
is about, but Gulp differs from Grunt in two important ways: the use of streams
and a code-over-configuration approach. A
[stream](http://maxogden.com/node-streams.html) is a method of plugging the
output of one tool into the input of another, allowing you to compose large
systems out of small tools that do one thing well. [Gulp](http://gulpjs.com/) is
a framework for plugging in your favourite tools to form a build script.

## Getting Going

To begin we'll need node and npm. If you don't have these you can download
installer from the [website](http://nodejs.org/) or if you're on OS X, I
recommend using [homebrew](http://brew.sh/).

Once we're ready, we can begin by installing the gulp CLI helper which allows
you to run your script with the `gulp`command:

This installs the gulp utility in the global node folder, meaning you can access
it from anywhere.

Next you'll need the dependencies for this build script. We're going simple and
only compiling, and minifying, the SCSS from Sassaparilla. Sassaparilla uses
compass so we'll need a compass library, rather than just a sass one. (In order
for this to work you'll also need sass and compass ruby gems installed,
instructions [here](http://compass-style.org/install/).) Here's the command to
get everything needed:

This will create a `node-modules` directory in your project where all the node
packages get saved, you can add this directory to your `.gitignore`, but there's
some [debate on
that](http://addyosmani.com/blog/checking-in-front-end-dependencies/).

While there are many purpose-written Gulp plugins (e.g gulp-compass), gulpfiles
are just like any other node program and you can use any node modules to do
custom tasks; you don't even have to use streams.

The `--save-dev` option saves these packages to your `devDependencies` list in
`package.json`. If you don't already have this file, I recommend creating one
according to the [docs](https://www.npmjs.org/doc/json.html) or using `npm init`
in the project root folder. This means that anyone using this project will know
exactly what packages they need and npm can automatically install them.

## Grasping Gulps API

We're ready to write the script! Gulp only has four methods, so it's easy to
learn and then gets out of your way letting you write a build script how you
want.

Create yourself a `gulpfile.js` with these lines:

This is the minimum viable script. It doesn't do much but it does introduce you
to three of the four gulp methods: `gulp.task`, `gulp.src`, and `gulp.dest`.
Respectively they define a task, get a stream from a source file, and output the
stream to a destination folder.

Run `gulp` in the terminal to test it's all working.

![](/img/guide-to-gulp-1.gif)

## Going Up A Gear

Now everything is running we can start compiling our Sassaparilla. Add the
relevant module imports and write a new task (you can remove the old one). Your
file should now look like this:

Note the default task now takes an array of tasks to call when you run `gulp`
from the terminal. A task can take up to three parameters: it's name, an array
of tasks to call before itself, and a function to perform as it's task.

After running `gulp` this time you should have a compiled and minified css file
in your css directory.

![](/img/guide-to-gulp-2.gif)

The addition of watching files for changes will introduce us to the fourth and
final gulp method (`gulp.watch`) and allow us to run gulp once and compile any
changes we make to our stylesheets. Create a new task like below, and amend the
default task to include the watch task:

![](/img/guide-to-gulp-3.gif)

In case you're not familiar with globbing, the asterisks in that task match
anything, so "`css/**/*.scss`" will be looking at every scss file in every
folder in the css folder.

## Graduation

Congratulations, you've grokked gulp and got in the groove of watching files
with globbing!

So far we've got Gulp watching and compiling our Sass; if we wanted to go
further, we could look at linting, concatenating and minifying our JavaScript;
live reloading in browsers and across devices; automated build tests; and other
deployment steps.

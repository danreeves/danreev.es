---
layout: post
title: Getting Started With Gulp.js
tags: gulpjs
---

[Gulp.js](http://gulpjs.com/) is a build system/task automator written for nodejs. It's useful for simplifying and speeding up your build process, automating tasks for you such as comiling code, minification, and concatenation.

Gulp differs from Grunt through the use of [streams](http://nodejs.org/api/stream.html) and a code-over-configuration approach. Through the use of streams, it allows you to write very simple scripts in a very similar way that you would to the front end using a library like jQuery while being very efficient and only writing files to the disk when you're ready.

It's also very easy to pick up and get running with only 6 methods to worry about. Only some minimal knowledge of the command line and npm is needed and then anyone confortable writing javascript will get alon
g nicely.

Before you start you'll need nodejs and npm installed which you can here [here](http://nodejs.org/).


### Getting Started

First, you'll need to install gulp globally with:
 
    npm install -g gulp
Now you can go into your project directory and install gulp and gulp-util, which are the only two dependencies. You can also install any packages you'd like to use now.

    npm install --save-dev gulp gulp-util
    npm install --save-dev gulp-concat gulp-csso gulp-sass gulp-uglify
    
Here, I've also installed packages for concatenating files, minifying css, compiling sass, and minifying javascript.

The `--save-dev` option saves these packages to your devDependencies list in `package.json`. If you don't already have this file, I recommend creating one according to the [docs](https://npmjs.org/doc/json.html) or using `npm init` to create one for you. The benefit of this is that anyone using this project will know exactly what packages they need and npm can automatically install them all.

My dependencies currently looks like this:

	 "devDependencies": {
	   "gulp": "~3.3.0",
	   "gulp-concat": "~2.1.7",
	   "gulp-csso": "~0.1.7",
	   "gulp-sass": "~0.3.0",
	   "gulp-uglify": "~0.1.0",
	   "gulp-util": "~2.2.9"
	 }

### gulpfile.js

The next step is to actually write the script. You should create a file in the root of your project called `gulpfile.js` and open it up in your favourite text editor.

The first thing you need to do here is require all the modules you just installed. Nodejs uses CommonJS-style require and is very easy to understand:

	var gulp = require('gulp'),
	    gutil = require('gulp-util'),
	    sass = require('gulp-sass'),
	    csso = require('gulp-csso'),
	    uglify = require('gulp-uglify'),
	    concat = require('gulp-concat');

### The API

[Gulp has 6 methods](https://github.com/gulpjs/gulp/blob/master/docs/API.md): `gulp.task`, `gulp.src`, `gulp.dest`, `gulp.watch`, `gulp.run`, and `gulp.env`. The first five are the most important.

`gulp.task` is used for defining a task. You pass it a name and a function to be run. When you enter `gulp` to the command line it tries to execute the `default` task but if you pass anything in it will try to do that task, for example `gulp taskone`. Using this you can set up different tasks thatyou might run at different times, such as a testing/dev task, where you keep code unminified and create source maps, or a production task, where you minify and concatenate everything.

This can also be done using `gulp.env` which allows you to pass in `--options`.

The next two important methods to know about are `gulp.src` and `gulp.dest`. Using these methods you tell gulp where to find the files you want to use, and where to output the new ones.

The last thing you will need to know before you can write a simple gulpfile is about nodejs' `pipe` method. This method takes in a text stream and sends it to a passed in function.

### Writing A Task

The first thing we'll write is a task to comile our sass and minify it.

	gulp.task('css', function () {
	    gulp.src('./pathto/css/*.scss')
	        .pipe(sass({includePaths: ['pathto/css']}))
	        .pipe(csso())
	        .pipe(gulp.dest('./assets/css'));
	});
	
Here we've created a task named `css` which sources all `.scss` files in the folder `/path/to/` from the root of our project. It pipes these files to the `sass()` function with an option that tells sass where the include files are. 
*This is only necassary if you're using `@include` in your sass.*

It then gets piped into `csso()` which minifies it and lastly it is piped ito `gulp.dest()` which creates the file in the `assets/css` folder from the root of the project.

This can now be run by using `gulp css` from the command line while in the root of your project directory.

I created another task for my javascript:

	gulp.task('js', function () {
	    gulp.src('./pathto/js/*.js')
	        .pipe(uglify())
	        .pipe(concat('all.js'))
	        .pipe(gulp.dest('./assets/js'));
	});
	
The usage and documentation for all packages can be found  on their [npm registery page](https://npmjs.org/) and you can find gulp-packages by searching [here](http://gratimax.github.io/search-gulp-plugins/).

### Automation

It's good so far; we can build our css and js with only two commands:
 
	gulp css
	gulp js

but we can make it better.

This is where the `gulp.watch` and `gulp.run` methods come in. `gulp.watch` is a built-in method of telling gulp which files to look at, and to do something when they change. `gulp.run` is the method for running a task by passing it one or more names.

We can now create a default task that runs both the css and js tasks, like so:

	gulp.task('default', function () {
	    gulp.run('css', 'js');
	});

This now only requires you to type `gulp` to run.

However, going to the command line and typing `gulp` every time you've made a change isn't ideal.

We can create watch function which keep and eye on your different types of files and run the necessary tasks when they are changed. This helps keep the build times down by only doing the tasks needed at the time, instead of rebuilding all the files.

Our default task could instead look like this:

	gulp.task('default', function () {
	
	    // Run both tasks on first run
	    gulp.run('css', 'js');
	    
	    // Watch the css folder for changes
	    gulp.watch('./pathto/css/*', function () {
	    	// Run the css task
	        gulp.run('css');
	    });
	
	    // Watch the js folder for changes
	    gulp.watch('./pathto/js/*', function () {
	    	// Run the js task
	        gulp.run('js');
	    });
	});
	
Now, when we run `gulp` it will keep running until we close it with `Ctrl C`.

You now have an almost fully automated built process. It is also possible to use a livereload package which even automates page refreshes for you after you have changed anything.

[Click here to see my full gulpfile.js](https://github.com/DanReeves/danreeves.github.io/blob/master/gulpfile.js)


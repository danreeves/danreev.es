---
layout: post
title: Showing and hiding hidden files in OS&nbsp;X
tags: bash osx
---

**EDIT: 2013-11-09**

I recently realised one of my favourite apps for the mac, [BetterTouchTools](http://www.boastr.de/), comes with the ability to create a custom gesture or keyboard shortcut which does this very thing so now I can hide or show dotfiles by simply pretting `Command + Caps Lock`. Incidentally, I've also remapped my caps lock key to F19 using [PCKeyboardHack](https://pqrs.org/macosx/keyremap4macbook/pckeyboardhack.html.en) so that I can then use it in custom keyboard shortcuts defines in BetterTouchTools.

If you haven't already remapped Caps Lock you might want to look into it. Also if you aren't already using BetterTouchTools, I strongly recommend it!

This kinda makes the rest of the post redundant but if you're still interested in some command line tips keep reading.

___

If you work on the web chances are you'll be using `.htaccess` files. By default these are hidden in the finder on OS X which is a pain. Luckily making these hidden files visible is pretty easy. Simply open the terminal (or your favourite CLI) and enter:

    defaults write com.apple.Finder AppleShowAllFiles TRUE && killall Finder

The first half of the command is writing to the system default settings. The `&&` is a conditional execution. This means that the second command can only run if the first is successful. Next the Finder app is killed off and restarted in order for the new settings to take effect.

You can reverse this and hide the files again by replacing `TRUE` with `FALSE`.

    defaults write com.apple.Finder AppleShowAllFiles FALSE && killall Finder

As a side note, I have seen people use both `com.apple.Finder` and `com.apple.finder`. On my installation I have found it best to use both else the it wouldn't take effect immediately  but your milage my vary.

###Power User

This is good, but not very practical. However, once again Bash comes to the rescue.
We can create aliases in bash which means we can put that whole command in to a variable of our choice, for example:

    alias shf="defaults write com.apple.Finder AppleShowAllFiles TRUE && defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder"

From then on you can simply type shf (show hidden files. See what I did there?) and it will execute all of that.

To be even more useful we can add this to our `.bashrc` or `.bash_profile` so it will load every time you start the bash shell. To complete this effect add the following lines to either your `.bashrc` or `.bash_profile` files in your home directory: `/user/USERNAME/`.

    alias shf="defaults write com.apple.Finder AppleShowAllFiles TRUE && defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder"

    alias hhf="defaults write com.apple.Finder AppleShowAllFiles FALSE && defaults write com.apple.finder AppleShowAllFiles FALSE && killall Finder"

Now you can always type `shf` to show hidden files and `hhf` to hide them again.

###Super Power User

This is great, but you might not always have a CLI open and you may not want to open one.

OS X has a great feature called Spotlight which is easily opened with `Cmd + Space`. The great thing about this is it can open files, run applications, and even execuables.

Create the following two files.

shf:

    #!/bin/bash

    defaults write com.apple.Finder AppleShowAllFiles TRUE && defaults write com.apple.finder AppleShowAllFiles TRUE && killall Finder

hhf:

    #!/bin/bash

    defaults write com.apple.Finder AppleShowAllFiles FALSE && defaults write com.apple.finder AppleShowAllFiles FALSE && killall Finder

Next, in your CLI, enter `sudo chmod +x myfile` substituting 'myfile' for the names of the files you have created. This will give them the ability to be executed as scripts.

Now, you can type shf or hhf into the spotlight, hit enter and the script will run. If the terminal stays open then you need to go into Terminal Preferences > Settings > Shell and set the 'When shell exits' setting to 'Close if the shell exited cleanly'. This means that if the script is successful the terminal will close. If you use a different CLI you'll have to find the appropriate settings yourself.

There you have it, the ability to easily hide or show those pesky hidden files.

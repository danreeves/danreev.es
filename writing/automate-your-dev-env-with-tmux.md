+++
published = "2017-10-29"
+++

# Automate your dev env with tmux

A side project I’m working on has two commands to start running in development
mode. `npm run dev:app` which starts a `create-react-app` dev server and `npm
run dev:server` which starts an express server for proxying external api calls
and handling OAuth. My usual workflow involves manually opening panes in iTerm2
and running each command manually, but I thought I could do better.

## Introducing tmux

`tmux` is a **t**erminal **mu**ltiple**x**er. This basically means it can manage
*multiple* terminal windows running different programs inside *one* window. To
get it, you can probably install it through your package manager of choice; if
you’re on mac you can use [homebrew](https://brew.sh/): `brew install tmux`

## How to use it

For my setup, I wanted two panes in the top half of my screen, each displaying
output of my dev servers, and the bottom half ready for me to run arbitrary
commands like `git` . Here’s what I came up with & let’s go through it
line-by-line:

    tmux new-session -s projectname 'npm run dev:app' \; \
     split-window 'npm run dev:server' \; \
     split-window \; \
     select-layout tiled \;

`tmux new-session -s projectname 'npm run dev:app'`

This creates a new “session”, with a name of “projectname”, and runs the command
`npm run dev:app` . The session name is helpful if I want to detach the tmux
session (run it in the background) and bring it back later. The `\;` is for
separating `tmux` commands.

`split-window 'npm run dev:server'`

We’re now splitting the current window in half, and running our second command
in it.

`split-window`

Split the window a third time, but don’t run a command in it.

`select-layout tiled`

Select the `tiled` layout from the list of default layouts `tmux` has.

![A terminal showing the final result](/img/automate-your-dev-env-with-tmux.png)
Tada 🎉

## Cool things

Now that I’ve got the `tmux` session running I can move it into the background
and perform other tasks when I need using the `tmux detach` command. This will
keep all my panes running in the background. When I want them back I can run
`tmux attach -t projectname` and they will come back in the same configuration.
Nice!

I’ve also expanded the script slightly to check if a session already exists; if
it does I kill the session. This means I have one command to run (the shell
script) and it’ll either start or kill my dev environment.

*****

If you have any `tmux` tips then let me know on Twitter:
[@dnrvs](https://twitter.com/dnrvs)

---
published: 2018-02-03
---

# Per project settings in nvim

I recently started using nvim as my editor, and along with it
[ALE (Asynchronous Lint Engine)](https://github.com/w0rp/ale) to run my code
linters, usually eslint.

One of my project uses [xo](https://github.com/sindresorhus/xo) which is a
preconfigured wrapper around eslint. ALE was detecting the eslint binary but not
any configuration and so was spouting errors. The solution is to _only_ enable
xo on this project.

## Enabling project specific config files

In your main config file add the following lines:

    set exrc
    set secure

`exrc` allows loading local **ex**ecuting local **rc** files.

`secure` disallows the use of :autocmd, shell and write commands in local
`.vimrc` files.

Now in your project specific file you can set:

    " Only enable the linters you want
    let g:ale_linters = {
    \  'javascript': ['xo'],
    \}

Note that the name of your config files matter. Neovim looks for an `.nvimrc` ,
vim looks for a `.vimrc` or `.exrc` files.

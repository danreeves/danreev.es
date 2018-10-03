+++
published = "2018-03-24T13:01:02.932Z"
+++

# Supporting IE10 with glamor & glamorous

[Glamor](https://github.com/threepointone/glamor) is a great little CSS-in-JS
library. It’s the basis of glamorous, one of the big names in the React styling
space.

One of it’s great attributes is the small file size, coming in at just 8kb, but
this small size comes at the expense of some browser support. Most notably, at
least in my case was that it didn’t support IE 10. Luckily it has a flexible
plugin system and is built on top of other configurable tools.

## Custom prefixer data

The browser prefixing of glamor comes from another library:
inline-style-prefixer. By default it only supports back to IE 11, but it
includes utilities for generating your own data, based on the CanIUse.com API.
Inside your glamor/glamorous project you’ll want to install
`inline-style-prefixer` and `caniuse-api` as dev dependencies.

    npm i -D inline-style-prefixer caniuse-api

Next you can write your script for generating the necessary data. It should look
a little something like:

    const generateData = require('inline-style-prefixer/generator');

    const defaultBrowserSupport = {
     chrome: 55,
     android: 5,
     firefox: 52,
     ios_saf: 9,
     safari: 9,
     ie: 11,
     ie_mob: 11,
     edge: 12,
     opera: 30,
     op_mini: 12,
     and_uc: 11,
     and_chr: 55
    };

    generateData(defaultBrowserSupport, {

      # Where to save the files
      staticPath: 'staticBrowserData.js',
      dynamicPath: 'dynamicBrowserData.js',

      # Output ES5 JS
      compatibility: true,
      # Include data for style prefixing the required browsers
      prefixData: true,
      # Include the compatibility layer plugins
      plugins: true,
    });

When you run this scripts, e.g. `node generate-data.js`, it’ll output two files,
including the static and dynamic versions of the prefixing data. Only the static
data is strictly necessary but you should read about the tradeoffs in the
[documentation](https://github.com/rofrischmann/inline-style-prefixer#dynamic-vs-static).

The `defaultBrowserSupport` object is the same as provided by
inline-style-prefixer, so you’ll want to edit that to you needs, for example
lowering `ie` from 11 to 10.

Now that we have our custom browser data we can go about creating a custom
prefixer from that and integrating it into glamor.

## Creating a custom prefixer

When you’re creating your custom prefixer you need to decide whether you want
the static or dynamic version. The dynamic prefixer evaluates the browsers
user-agent before prefixing styles so it only applies the needed ones. This
comes with added size though, so you might want to opt for the static prefixer
which applies all of the prefixes on every browser but is much smaller (~3kb vs
~8kb). Creating a dynamic prefixer requires both so I’ll use that for
demonstration and you can [read the
docs](https://github.com/rofrischmann/inline-style-prefixer/blob/master/docs/api/inline-style-prefixer/createPrefixer.md)
for more specific information.

    import createStaticPrefixer from 'inline-style-prefixer/static/createPrefixer';
    import createDynamicPrefixer from 'inline-style-prefixer/dynamic/createPrefixer';

    import staticData from './staticBrowserData.json';
    import dynamicData from './dynamicBrowserData.json';

    const StaticPrefixer = createStaticPrefixer(staticData);
    const DynamicPrefixer = createDynamicPrefixer(dynamicData, StaticPrefixer);

    export default DynamicPrefixer

As you can see we pass the static prefixer into the dynamic prefixer as a
fallback.

## Using it as a glamor plugin

Glamor has a [simple plugin
system](https://github.com/threepointone/glamor/blob/master/docs/plugins.md)
that gives the user a lot of power. A plugin is a function which recieves an
object with a `selector` and a `style` key. In this instances we only care about
the `style` object.

First we want to define our plugin:

    import DynamicPrefixer from './prefixer';

    const prefixer = new DynamicPrefixer();

    export default function prefixerPlugin (node) {
      return {
        ...node,
        style: prefixer.prefix({ ...node.style })
      };
    }

Now, in our app we need to integrate our plugin with glamor:

    import { plugins } from 'glamor';
    import prefixerPlugin from './prefixer-plugin';

    plugins.add(prefixerPlugin);

If you want to [copy glamor
exactly](https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/index.js#L20-L24),
without duplicating the prefixing it does by default you can clear our the
plugins automatically added by glamor. Then your code would look something like
this:

    import { plugins } from 'glamor';
    import { contentWrap, fallbacks, PluginSet } from 'glamor/lib/plugins';
    import prefixerPlugin from './prefixer-plugin';

    plugins.clear(); // Remove glamors plugins
    plugins.add(prefixerPlugin); // Add our own plugin
    // Re-add built in plugins
    plugins.add(contentWrap)
    plugins.add(fallbacks)
    plugins.media = new PluginSet()
    plugins.fontFace = new PluginSet()
    plugins.keyframes = new PluginSet([prefixer, fallbacks])

This is based on glamor’s initialisation:
[glamor/index.js#L20-L24](https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/index.js#L20-L24)

There we have it! Any time you use glamor or glamorous after this set up your
styles will be prefixer properly across the browsers you chose in your data
generation script.

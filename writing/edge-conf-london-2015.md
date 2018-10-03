+++
published = "2015–06–28"
+++

# Edge Conf — London 2015

I went to [Edge conf](https://edgeconf.com/2015-london) yesterday; it was a
fantastic day of meeting smart people and discussing the present and future of
the web. Props to Facebook for superb hosting of the event and a big thank you
to all the organizers.

The day was broken into four panels followed by three sets of "Break outs". The
day was accompanied by a Slack channel for discussion of the topics at hand,
with questions in the chat often being fed into the panel discussion. This meant
a very quick-fire exploration of the theme in which everyone had a say.

## Security

The first panel was on security on the web, moderated by [Dan
Appelquist](https://twitter.com/torgo) and opened with a talk from [Yan
Zhu](https://twitter.com/bcrypt) on why security is hard and what we can do
about some common cases. Yan's concern was that security is too damn hard and
boring. A quick summary would be use [CSPs](http://csptester.io/) and SSL
everywhere.

The discussion mostly revolved around, the main sticking point for a lot of
developers when trying to implement HTTPS, external sources not using HTTPS and
causing insecure domain warnings. The solutions suggested ranged from carrots to
sticks; ranking secure content higher in search results, only giving new web
features to secure domains, and slowly deprecating features from HTTP sites. It
was agreed that more pressure needs to be applied to ad networks to get them to
move to HTTPS.

According to the panel getting HTTPS easily and for free will become a non-issue
in the near future, with the release of [LetsEncrypt](https://letsencrypt.org/).
There was some concern that even though the process has been reduced to a single
command it's still not easy enough for the standard user.

![Everyone keeps using the word "developers" to refer to people who build the
web. The web is for everyone. The thought of Code Club students having to learn
how to deploy HTTPS horrifies me.](/img/edge-conf-2015-1.png)

## Front end data

The front end data panel was lead by [Jake
Archibald](https://twitter.com/jaffathecake) with a keynote by [Nolan
Lawson](https://twitter.com/nolanlawson). The keynote started with a long list
of the types of storage available to the front end developer and then went
through a list of applications of front end storage. Just some examples were the
[php.net](http://php.net/) autocomplete box, the Chrome Dev Summit site, and
[npm-browser.com](http://npm-browser.com/). The point being that using local
storage can lead to some really cool websites and slick experiences. It was also
to show how a lot of people don't realise the capabilities of the web.

IndexDB was easily the most popular topic, if only to complain about it. The
panelists suggested that it has a low level API, which, while definitely not
perfect, isn't supposed to be used manually and should be smoothed over by
libraries (à la the extensible web).

There was also talk of how trustworthy front end data is. Firstly it can be
cleaned up by the browser/OS whenever it decides it needs that space. A user
could also accidentally remove the data when clearing browser cache or similar.
The conclusion was that there needs to be drastic improvement on the usabilty of
front end data by the end user. Whether that's on a per app basis or a browser
implementation, users need more information and control over what the browser is
storing, especially when there's large amounts of data involved.

Another concern was security. How can you be sure that the local storage hasn't
been corrupted through an XSS, for example. Questions were raised such as
"Should we be encrypting all local storage?" and "Should we have mechanisms to
clear all local data?".

## Components and modules

The third panel of the day was mostly focussed on Web Components and what future
they have. It was lead by [Chris Heilmann](https://twitter.com/codepo8) with an
opening keynote from [Guy Bedford](https://twitter.com/guybedford).

There was a lot of interest in the potential for shadow dom to hide complexity
and the modularised model the web could move towards. However the discussion was
dominated by the *problems* with Web Components in their current state. My take
away was that web components are in no good state to use today and they might
not be for a long time. Problems include:

* *There's no finalized spec yet* <br> This means inconsistent and wrong
implementations. Some arguably important features such as `is` may not make it
into the spec.
* *The polyfills are big and slow* <br> Currently the best available is Polymer.
* *There's no best practice deployment strategy* <br> HTML Imports are currently
in contention, meaning the only sensible deployment is to
[Vulcanize](https://github.com/polymer/vulcanize). Even if HTML Imports made it
into browsers they only become performant with HTTP/2 which isn't widespread
enough yet, meaning either holding off on them or multiple deployment builds
(Vulcanize and HTML Imports).
* *There's no way of rendering on the server to optimise for first paint* <br>
This is an important point, as a lot of effort has been put into these sorts of
optimisations on the web in the last couple of years. The major challenge here
is a declarative shadow dom. It is almost possible, as seen in the [Guitar Tuner
app](https://aerotwist.com/blog/guitar-tuner).
* Jake Archibald brought up the point that we were talking about server rendering
to fix the performance of Web Components, when surely that sort of consideration
should be made in the spec.
* In summary, I think the largest consensus on the room was that Web Components
are a long way from being even worth using.

## Progressive enhancement

![fingers crossed this is not about JS vs non-JS](/img/edge-conf-2015-2.png)

The final panel of the day way moderated by [Lyza Danger
Gardner](https://twitter.com/lyzadanger) and keynoted by [Remy
Sharp](https://twitter.com/rem). This was probably the most discussed item of
the day, being an important undercurrent in almost every session.

Remy's keynote started by explaining how the term progressive enhancement is
often geared towards the lowest common denominator and is more often than not
defined as making something work without JavaScipt; unfortunately these
misconceptions are widely spread. He continued to talk about examples of apps
that can and can't work without JS and explaining why that can be fine.

The core to progressive enhancement is deciding what is core functionality and
what is an enhancement, and setting your own baseline requirements to satisfy
the users needs.

There was a lot of great discussion that would be too long to summarise in this
post so I recommend having a [skim of the
notes](https://docs.google.com/document/d/1aSjbz1A2ifV5Xu-pYx-SGiweaihwZ74R79PXeAJxJh8/edit).

The key takeaways were, however:

* We need to redefine progressive enhancement or come up with a better term.
* It isn't just about accessibility but *availability*.
* The support baseline changes from project to project, depending on the tech
required and the user expectations.
* There's too much emphasis on using every feature we can. We need processes in
which the users preferences and context are taken into account.

## Appendix

* [Security panel write
up](https://docs.google.com/document/d/1tUbDpaZ-aeajAqSIQInYxDZHlDY1SnM9ZTuUeViz1lg/edit)
by George Crawford
* [Front end data panel write
up](https://docs.google.com/document/d/18T9Qhx1NQGUTGAWKBQqITqQlXPIRmiaSRK19-8qMACY/edit)
by Ada Rose Edwards
* [Components & modules panel write
up](https://docs.google.com/document/d/1Keg45q9iLtI79wcgZjrH2s0Gp_Mh36Ob5i6ZZmHoHPo/edit)
by Rowan Beentje
* [Progressive enhancement panel write
up](https://docs.google.com/document/d/1aSjbz1A2ifV5Xu-pYx-SGiweaihwZ74R79PXeAJxJh8/edit)
by Patrick Hamann
* [Edge conf — London 2015 schedule/speaker/panelist
list](https://edgeconf.com/2015-london/schedule)


---
published: 2017-01-17
---

# JavaScript isn't just JavaScript

2016 was the year of “JavaScript fatigue”. The idea that JavaScript has become
too fractured and entrenched in tools. It's now harder than ever for a developer
to get a project started, let alone finished.

On a surface level it makes a lot of sense. The last several years have seen a
massive shift in the way front-end development works. Frameworks, bundlers,
transpilers; even a massive update to the language itself. Still, the biggest
impact has come from npm: now the largest package registry in the world. How on
earth are you supposed to choose which packages you want from the
[350,000](https://www.linux.com/news/event/Nodejs/2016/state-union-npm)
available to you? How do you choose between the handful of build tools and
dozens of frameworks? Why isn't there just one best tool?

This is where the entire argument falls apart. There isn't one best way of doing
anything of complexity because JavaScript isn't just JavaScript. Unless you're a
Node.js developer, who sticks to the server, you're never _just_ considering
JavaScript. You need to consider: the server, how is this JavaScript being
built, deployed, and sent to the client, the network, is it being served from a
CDN, how big is the bundle, can I break it into smaller parts, can my views be
server rendered, what parts are being progressively enhanced, what parts can't
be progressively enhanced, who are my target audience, how well will this run on
their device, will it even run on their device, how fast is their connection,
how reliable is their connection, what about the people I'm not targeting, how
is the content being managed, is it integrating with other services, who's
building it, how fast does it need to be ready, how long is it expected to last,
how long will people be working on it, does it need internationalisation, how
accessible does it need to be… The list goes on and on.

There are a lot of tools and frameworks to choose from but that's a good thing.
The world wide web is the largest and most variable platform there is. There
never will be a one-size-fits-all solution, and that just comes with the
territory. I'm sorry. Web development is hard. It's also very rewarding.

---

Okay, if number of packages and choice paralysis isn't the problem, what is and
how do we solve it?

Well, the progressive enhancement purists will tell you this is a moot point.
You should be building your sites first in HTML. Only then should you sprinkle
on the enhancements. While this is true it's also ignoring the vast potential of
the platform. There are things you might want to do which are either awful
experiences or just plain impossible to do without JavaScript.

I think the solution comes in two steps, and following them will make the web
better for developers and the people using it.

### 1. Ask the right questions

This one is for the developers of sites and apps. Make sure you're asking
questions that will improve User Experience, not just Developer Experience.
Don't get me wrong, DX is important but it should never trump UX.

### 2. Give the right answers

Now for the tooling and framework authors. I'm assuming you've already asked
question one, and you're making something that solves a problem. But, to make
informed decisions, and great experiences, developers need more information. The
good and the bad. What are the aims and what trade-offs does it make.

A great example of this is the
[Inferno README](https://github.com/infernojs/inferno/blob/master/README.md).
Although requiring some React knowledge, it explains the user-focused philosophy
behind the project. It even goes into the differences between it and other
similar libraries.

### Conclusion

I don't want to be dismissive of peoples complaints, but I do think they're
misplaced. JavaScript isn't the hard part. Web development is hard. Empathy is
hard. Thinking ahead, planning, and asking the right questions is hard. As a
community we need to work together on this. We need to make sure we are asking
the right questions and giving the right answers. With an industry and platform
that moves as fast as ours, we're all constantly learning and we should also be
constantly teaching. We need less divisive and partisan education around our
tooling.

There's no one correct way to build for the web, but there are some good
questions to point you in the right direction.

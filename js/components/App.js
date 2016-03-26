import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>Dan Reeves</h1>
                <p>Hi 👋</p>
                <p>I'm the lead <a href="http://github.com/danreeves">developer</a> at a user-centred digital agency called <a href="http://fffunction.co">fffunction</a>. I specialise in <a href="https://www.npmjs.com/~danreeves">JavaScript</a> and full-stack web development. My other passion is <a href="http://steamcommunity.com/id/danreeves">playing</a>, making, and talking video games. I'm also a co-organiser of the <a href="http://join.cornwallgeeks.net">Cornwall Geeks</a> community, running a developer focused meetup every month. ✨</p>
                <nav>
                    <a href="https://twitter.com/heydanreeves">Twitter</a>
                    <a href="https://github.com/danreeves">GitHub</a>
                    <a href="mailto:danr@fffunction.co">Email</a>
                </nav>
            </div>
        );
    }
}

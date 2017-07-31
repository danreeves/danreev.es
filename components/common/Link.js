import Link from 'next/link';
import styled from 'styled-components';
import baffle from 'baffle';

const characters = ['◸◹◺◿', '◴◵◶◷', '◰◱◲◳', '◧◨◩◪'];

export class BaffledLink extends React.Component {
    constructor(props) {
        super(props);
        this.doBaffle = this.doBaffle.bind(this);
        this.getRef = this.getRef.bind(this);
    }

    getRef(node) {
        this.node = node;
        this.baffle = baffle(node, {
            characters:
                characters[Math.floor(Math.random() * characters.length)],
            speed: 50,
        }).text(() => this.props.children);
    }

    doBaffle() {
        this.baffle.start();
        setTimeout(() => {
            this.baffle.reveal(500);
        }, 250);
    }

    render() {
        return (
            <a
                {...this.props}
                ref={this.getRef}
                onFocus={this.doBaffle}
                onMouseOver={this.doBaffle}
            >
                {this.props.children}
            </a>
        );
    }
}

import styled from 'styled-components';
import baffle from 'baffle';

const characters = ['◸◹◺◿', '◴◵◶◷', '◰◱◲◳', '◧◨◩◪'];

const Link = styled.a`
    text-decoration: none;
    color: black;
    display: inline-block;
    border-bottom: 0.1em solid black;
    padding: 0.2em 0.2em 0.1em 0.2em;
    margin: 1px;
    :hover, :focus {
        cursor: inherit;
        outline: none;
        padding: 0.1em;
        border: 0.1em solid black;
    }
`

export class BaffledLink extends React.Component {
    constructor(props) {
        super(props);
        this.doBaffle = this.doBaffle.bind(this);
        this.getRef = this.getRef.bind(this);
    }

    getRef(node) {
        this.node = node;
        this.baffle = baffle(node, {
            characters: characters[0],
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
            <Link
                {...this.props}
                innerRef={this.getRef}
                onFocus={this.doBaffle}
                onMouseOver={this.doBaffle}
            >
                {this.props.children}
            </Link>
        );
    }
}

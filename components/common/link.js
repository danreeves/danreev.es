import React from 'react';
import PropTypes from 'prop-types';
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
  :hover,
  :focus {
    cursor: inherit;
    outline: none;
    padding: 0.1em;
    border: 0.1em solid black;
  }
`;

export default class BaffledLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleBaffle = this.handleBaffle.bind(this);
    this.getRef = this.getRef.bind(this);
  }

  getRef(node) {
    this.node = node;
    this.baffle = baffle(node, {
      characters: characters[0],
      speed: 50,
    }).text(() => this.props.children);
  }

  handleBaffle() {
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
        onFocus={this.handleBaffle}
        onMouseOver={this.handleBaffle}
      >
        {this.props.children}
      </Link>
    );
  }
}

BaffledLink.propTypes = {
  children: PropTypes.node.isRequired,
};

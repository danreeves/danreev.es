import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BaffledLink from './common/link';
import List from './common/list';

const Desc = styled.p`
  margin: 0.5em 1em;
  font-size: 0.8em;
  max-width: 55%;
`;

const LinkSection = ({ title, list, fullPage }) => {
  return (
    <div>
      <h2>{title}</h2>
      <List>
        {list.map(item => (
          <li key={item.label}>
            <BaffledLink href={item.href}>{item.label}</BaffledLink>
            {item.desc ? <Desc>{item.desc}</Desc> : null}
          </li>
        ))}
      </List>
      {fullPage ? <BaffledLink href={fullPage}>See more →</BaffledLink> : null}
    </div>
  );
};

LinkSection.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  fullPage: PropTypes.string,
};

LinkSection.defaultProps = {
  fullPage: null,
};

export default LinkSection;

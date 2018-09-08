import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Base from '../components/base';
import LinkSection from '../components/link-section';
import BaffledLink from '../components/common/link';
import { getProjects } from '../resources';

class Glitch extends Component {
  static async getInitialProps() {
    const glitchProjects = await getProjects();
    return {
      glitch: glitchProjects.map(p => ({
        label: p.domain,
        desc: p.description,
        href: `https://glitch.com/~${p.domain}`,
      })),
    };
  }

  render() {
    const { glitch } = this.props;
    return (
      <Base title="Glitch demos">
        <BaffledLink href="/">← Home</BaffledLink>
        <div>
          <p>
            <BaffledLink href="https://glitch.com">Glitch</BaffledLink> is a
            cool platform for sharing demos & collaborative coding. You can see
            my projects and remix them by clicking the links below!
          </p>
        </div>

        <LinkSection title="Glitch demos" list={glitch} />
      </Base>
    );
  }
}

Glitch.propTypes = {
  glitch: PropTypes.array.isRequired,
};

export default Glitch;

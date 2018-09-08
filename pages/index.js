import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Base from '../components/base';
import Intro from '../components/intro';
import LinkSection from '../components/link-section';
import { getProjects, getPosts, getRepos } from '../resources';

class Home extends Component {
  static async getInitialProps() {
    const glitchProjects = await getProjects();
    const mediumPosts = await getPosts();
    const githubRepos = await getRepos();
    return {
      glitch: glitchProjects.slice(0, 3).map(p => ({
        label: p.domain,
        href: `https://glitch.com/~${p.domain}`,
      })),
      medium: mediumPosts.slice(0, 3).map(p => ({
        label: p.title,
        href: `https://medium.com/@dnrvs/${p.uniqueSlug}`,
      })),
      github: githubRepos.slice(0, 3).map(p => ({
        label: p.name,
        href: `https://github.com/${p.full_name}`,
      })),
    };
  }

  render() {
    const { glitch, medium, github } = this.props;
    return (
      <Base title="Dan Reeves">
        <Intro />

        <LinkSection title="Latest posts" list={medium} fullPage="/posts" />

        <LinkSection title="Glitch demos" list={glitch} fullPage="/glitch" />

        <LinkSection title="GitHub repos" list={github} fullPage="/github" />
      </Base>
    );
  }
}

Home.propTypes = {
  glitch: PropTypes.array.isRequired,
  medium: PropTypes.array.isRequired,
  github: PropTypes.array.isRequired,
};

export default Home;

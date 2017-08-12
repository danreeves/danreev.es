import { Component } from 'react';
import Base from '../components/base';
import Intro from '../components/intro';
import LinkSection from '../components/link-section';
import { getProjects } from '../resources/glitch';

export default class Home extends Component {
    static async getInitialProps() {
        const glitchProjects = await getProjects();
        return {
            glitch: glitchProjects.slice(0, 3).map(p => ({
                label: p.domain,
                href: `https://glitch.com/~${p.domain}`,
            })),
        };
    }
    render() {
        const { glitch } = this.props;
        return (
            <Base title="Dan Reeves">
                <Intro />

                <LinkSection
                    title="Latest posts"
                    list={glitch}
                    fullPage="/glitch"
                />
                <LinkSection
                    title="Glitch demos"
                    list={glitch}
                    fullPage="/glitch"
                />
                 <LinkSection
                    title="GitHub repos"
                    list={glitch}
                    fullPage="/glitch"
                />
                 <LinkSection
                    title="Bookmarks"
                    list={glitch}
                    fullPage="/glitch"
                />
            </Base>
        );
    }
}

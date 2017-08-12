import { Component } from 'react';
import Base from '../components/base';
import LinkSection from '../components/link-section';
import { BaffledLink } from '../components/common/link';
import { getRepos } from '../resources';

export default class GitHub extends Component {
    static async getInitialProps() {
        const githubRepos = await getRepos();
        return {
            github: githubRepos.map(p => ({
                label: p.name,
                href: `https://github.com/${p.full_name}`,
                desc: p.description,
            })),
        };
    }
    render() {
        const { github } = this.props;
        return (
            <Base title="GitHub repos">
                <BaffledLink href="/">← Home</BaffledLink>

                <div>
                    <p>
                        I spend a lot of time on
                        <BaffledLink href="https://github.com/danreeves">
                            GitHub
                        </BaffledLink>. A lot of my work is private, but I try
                        to open source as much as I can.
                    </p>
                </div>

                <LinkSection title="GitHub repos" list={github} />
            </Base>
        );
    }
}

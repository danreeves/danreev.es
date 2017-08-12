import { Component } from 'react';
import Base from '../components/base';
import LinkSection from '../components/link-section';
import { BaffledLink } from '../components/common/link';
import { getPosts } from '../resources';

export default class Medium extends Component {
    static async getInitialProps() {
        const mediumPosts = await getPosts();
        return {
            medium: mediumPosts.map(p => ({
                label: p.title,
                href: `https://medium.com/@dnrvs/${p.uniqueSlug}`,
                desc: p.previewContent.bodyModel.paragraphs.find(
                    x => x.type === 1
                ).text,
            })),
        };
    }
    render() {
        const { medium } = this.props;
        return (
            <Base title="Posts">
                <BaffledLink href="/">← Home</BaffledLink>

                <div>
                    <p>
                        I write sometimes. When I do I put it on
                        <BaffledLink href="https://medium.com/@dnrvs">
                            Medium
                        </BaffledLink>. I'm trying to write more, so let me know
                        if you like it!
                    </p>
                </div>

                <LinkSection title="Posts" list={medium} />
            </Base>
        );
    }
}

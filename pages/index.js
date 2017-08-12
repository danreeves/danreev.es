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

                <div>
                    <h2>Latest posts</h2>
                    <ol>
                        <li>
                            <a href="#">Cornwall Geeks is 3!</a>
                        </li>
                        <li>
                            <a href="#">Premature optimisation</a>
                        </li>
                        <li>
                            <a href="#">JavaScript isn’t just JavaScript</a>
                        </li>
                    </ol>
                    <a href="#">View all...</a>
                </div>

                <LinkSection
                    title="Glitch demos"
                    list={glitch}
                    fullPage="/glitch"
                />

                <div>
                    <h2>GitHub repos</h2>
                    <ul>
                        <li>
                            <a href="#">Choodux</a>
                        </li>
                        <li>
                            <a href="#">Facemoji</a>
                        </li>
                        <li>
                            <a href="#">http-referers</a>
                        </li>
                        <li>
                            <a href="#">Choodux</a>
                        </li>
                        <li>
                            <a href="#">Facemoji</a>
                        </li>
                        <li>
                            <a href="#">http-referers</a>
                        </li>
                    </ul>
                    <a href="#">See more...</a>
                </div>

                <div>
                    <h2>Bookmarks</h2>
                    <ul>
                        <li>
                            <a href="#">How to deploy software</a>
                        </li>
                        <li>
                            <a href="#">How to build stable systems</a>
                        </li>
                        <li>
                            <a href="#">
                                Engineering a culture of psychological safety
                            </a>
                        </li>
                    </ul>
                    <a href="#">See more...</a>
                </div>
            </Base>
        );
    }
}

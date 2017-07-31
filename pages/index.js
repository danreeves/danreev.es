import Base from '../components/base.js';
import { BaffledLink } from '../components/common/Link.js';
import Link from 'next/link';

export default () =>
    <Base title="Dan Reeves">
        <div>
            <p>
                Hey. I'm <BaffledLink href="https://twitter.com/dnrvs">Dan Reeves</BaffledLink>,
                Frontend Engineer at <BaffledLink href="https://treasuredata.com">Treasure Data</BaffledLink>.
                I love all things JavaScript. Another passion is playing,
                making, and talking video games. I also
                co-organise Cornwall Geeks.
            </p>
        </div>

        <div>
            <h2>Latest posts</h2>
            <ol>
                <li><a href="#">Cornwall Geeks is 3!</a></li>
                <li><a href="#">Premature optimisation</a></li>
                <li><a href="#">JavaScript isn’t just JavaScript</a></li>
            </ol>
            <a href="#">View all...</a>
        </div>

        <div>
            <h2>Glitch demos</h2>
            <ul>
                <li><a href="#">Choodux</a></li>
                <li><a href="#">Facemoji</a></li>
                <li><a href="#">http-referers</a></li>
                <li><a href="#">Choodux</a></li>
                <li><a href="#">Facemoji</a></li>
                <li><a href="#">http-referers</a></li>
            </ul>
            <a href="#">See more...</a>
        </div>

        <div>
            <h2>GitHub repos</h2>
            <ul>
                <li><a href="#">Choodux</a></li>
                <li><a href="#">Facemoji</a></li>
                <li><a href="#">http-referers</a></li>
                <li><a href="#">Choodux</a></li>
                <li><a href="#">Facemoji</a></li>
                <li><a href="#">http-referers</a></li>
            </ul>
            <a href="#">See more...</a>
        </div>

        <div>
            <h2>Bookmarks</h2>
            <ul>
                <li><a href="#">How to deploy software</a></li>
                <li><a href="#">How to build stable systems</a></li>
                <li>
                    <a href="#">
                        Engineering a culture of psychological safety
                    </a>
                </li>
            </ul>
            <a href="#">See more...</a>
        </div>

    </Base>;

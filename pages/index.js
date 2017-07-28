import styled from 'styled-components';
import Layout from '../layouts/default.js';
import Box from '../components/box.js';

export default () =>
    <Layout>
        <Box tall={2}>
            <p>
                Hi. I'm Dan Reeves, lead developer at fffunction, a user-centred
                design agency. I love writing JavaScript and Python. My other
                passion is playing, making, and talking video games. I also
                co-organise Cornwall Geeks.
            </p>
        </Box>

        <Box wide={2}>
            <h2>Latest posts</h2>
            <ol>
                <li><a href="#">Cornwall Geeks is 3!</a></li>
                <li><a href="#">Premature optimisation</a></li>
                <li><a href="#">JavaScript isn’t just JavaScript</a></li>
            </ol>
            <a href="#">View all...</a>
        </Box>

        <Box>
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
        </Box>

        <Box>
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
        </Box>

        <Box>
            <h2>Bookmarks</h2>
            <ul>
                <li><a href="#">How to deploy software</a></li>
                <li><a href="#">How to build stable systems</a></li>
                <li><a href="#">Engineering a culture of psychological safety</a></li>
            </ul>
            <a href="#">See more...</a>
        </Box>

    </Layout>;

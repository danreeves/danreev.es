import Head from './common/head.js';
import styled, { injectGlobal } from 'styled-components';
import { complement } from 'polished';

const colors = {
    red: '#FF4447',
    blue: '#4978FF',
    green: '#0FC47A',
    yellow: '#FFDF4C',
    pink: '#EE6599',
};

function randomColor(c) {
    const keys = Object.keys(c);
    return c[keys[Math.floor(Math.random() * keys.length)]];
}

const r = randomColor(colors);

const Body = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif;
    font-size: 2em;
    background-color: ${r};
    color: ${complement(r)};
    border: 1rem solid ${complement(r)};
    a {
        color: ${complement(r)};
    }
`;

const Page = styled.div`
    max-width: 900px;
    padding: 5%;
`;

export default ({ title, children }) =>
    <Body>
        <Head title={title} />
        <Page>
            {children}
        </Page>
    </Body>;

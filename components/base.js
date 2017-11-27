import Head from './common/head.js';
import styled, { injectGlobal } from 'styled-components';
import { complement } from 'polished';
import { BaffledLink } from './common/link';

const Body = styled.div`
    border: 3vw solid black;
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu,
        Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial,
        sans-serif;
    font-size: 2em;
    color: black;
    background: white;
    *::selection {
        color: white;
        background: black;
    }
    cursor: url('data:image/png;base64,AAACAAEAICAAAAMAAQCoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgMP8gIDD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/ICAw/wEAAP8BAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgMP8BAAD/PT1B/yoqLP8BAAD/AAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgIDD/AQAA/xSNEf8BAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAD/F5cR/wEAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////////////////z////4f///+D////A////wP///4H///wB///4A///8AP///AH///4A///+AP///AD///gB///wD///4A///+Af///gH///4D///+A////gf///4H///+D////g////4f////H////7/////////8='),
        auto;
`;

const Page = styled.div`
    max-width: 900px;
    padding: 5%;
`;

const Footer = styled.footer`
    margin: 0;
    margin-top: 2em;
    & p {
        margin: 0;
    }
    & p:first-of-type {
        margin-top: 0.5em;
    }
    & svg {
        height: 1.5em;
        width: 1.5em;
        margin-right: 0.5em;
        vertical-align: bottom;
    }
`;

export default ({ title, children }) => (
    <Body>
        <Head title={title} />
        <Page>
            {children}
            <Footer>
                    <a href="https://twitter.com/dnrvs">
                        <svg
                            role="img"
                            aria-label="Twitter"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect fill="#000" height="512" width="512" />
                            <path
                                d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z"
                                fill="#fff"
                            />
                        </svg>
                    </a>
                    <a href="https://github.com/danreeves">
                        <svg
                            role="img"
                            aria-label="Github"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect fill="#171515" height="512" width="512" />
                            <path
                                d="m119 255c17 30 49 48 102 53-8 6-17 17-18 30-10 6-29 8-44 3-21-7-29-48-61-42-7 1-6 6 0 10 10 6 21 16 26 30 12 31 37 39 77 33v45c0 14-20 18-20 25 0 3 7 3 12 3 10 0 32-9 32-23 0-12 0-52 1-59 0-15 8-20 8-20s1 82-2 92c-4 13-10 11-10 17 0 9 26 2 35-17 7-15 4-95 3-94h7s0 37 1 53c0 17-1 39 9 50 7 7 29 19 29 8 0-6-12-12-12-29v-79c10 0 8 26 8 26l1 48s-2 18 19 25c8 3 24 3 25-1s-20-11-20-25v-49c0-36-5-49-22-60 53-5 86-18 102-53 10-20 12-44 12-62 0-50-24-67-29-76 7-38-1-55-5-60-14-5-48 12-66 24-30-9-94-8-118 2-44-31-67-26-67-26s-15 27-4 66c-15 18-25 31-26 65 0 27 3 44 15 67z"
                                fill="#fff"
                            />
                        </svg>
                    </a>
                    <a href="https://medium.com/@dnrvs/latest">
                        <svg
                            role="img"
                            aria-label="Medium"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect fill="#12100e" height="512" width="512" />
                            <path
                                d="M122 171c1-4-1-8-4-11l-32-39v-5h99l78 169 67-169h95v5l-27 27c-2 1-4 4-3 7v194c-1 3 1 6 3 7l27 27v6H290v-6l28-27c2-3 2-4 2-8V192l-77 196h-10l-90-196v131c-1 6 1 11 5 15l36 44v6H81v-6l37-44c3-4 5-9 4-15z"
                                fill="#fff"
                            />
                        </svg>
                    </a>
                    <a href="https://www.npmjs.com/~danreeves">
                        <svg
                            role="img"
                            aria-label="NPM"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000"
                        >
                            <rect height="512" width="512" fill="#000" />
                            <path
                                fill="#fff"
                                d="m16 163.3h480v160h-240v26.7h-106.7v-26.7h-133.3zm26.7 133.4h53.3v-80h26.7v80h26.7v-106.7h-106.7zm133.3-106.7v133.3h53.3v-26.7h53.3v-106.6zm53.3 26.7h26.7v53.3h-26.7zm80-26.7v106.7h53.3v-80h26.7v80h26.7v-80h26.7v80h26.7v-106.7z"
                            />
                        </svg>
                    </a>
                    <p>a world wide web site</p>
                    <p>made by dan reeves</p>
                    <p>have a nice day 🌤</p>
            </Footer>
        </Page>
    </Body>
);

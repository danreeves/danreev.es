import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const HeadMeta = ({ title = 'Dan Reeves' }) => {
    title = title === 'Dan Reeves' ? title : `${title} - Dan Reeves`;
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <title>{title}</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
            />
            <meta name="msapplication-TileColor" content="#000" />
            <meta name="theme-color" content="#000" />
            <meta
                name="google-site-verification"
                content="kgIjoP-G9lKdG0RAaoLHMUwgxv5cLtIOZZfVdtTJvhY"
            />
        </Head>
    );
};

HeadMeta.propTypes = {
    title: PropTypes.string.isRequired,
};

export default HeadMeta;

import React from "react";
import { Helmet } from "react-helmet";

const HelmetMeta = ({ pageTilte, pageDesc, pageThumbnail }) => {
    return (
        <div>
            <Helmet>
                <title>{pageTilte}</title>
                {/*  <meta name="description" content={pageDesc} /> */}

                <meta property="og:site_name" content="Web Highlights Blog" />
                <meta property="og:title" content={pageTilte} />
                <meta property="og:type" content="article" />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:image" content={pageThumbnail} />

                {/* Twitter specific meta tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTilte} />
                <meta name="twitter:description" content={pageDesc} />
                <meta name="twitter:image:src" content={pageThumbnail} />

                {/* LinkedIn specific meta tags */}
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content={pageTilte} />
            </Helmet>
            {/* Your component content goes here */}
        </div>
    );
};

export default HelmetMeta;

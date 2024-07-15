import React from "react";
const { REACT_APP_ASSET_URL } = process.env;

function BlogRelatedCard({ img, category, title, time, blogDate }) {
    return (
        <a href="#" className="blog-box">
            <div className="blog-img">
                <img src={img} alt="" width="100%" height="100%" loading="lazy" />
            </div>
            <div className="blog-right">
                <p className="comm-body-small blue">{category}</p>
                <h2 className="comm-head-7">{title}</h2>
                <div className="ot-details">
                    <span className="comm-body-small">{blogDate}</span>
                    <span className="divider-circle" />
                    <span className="comm-body-small">{time}</span>
                </div>
            </div>
        </a>
    );
}

export default BlogRelatedCard;

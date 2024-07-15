import React from "react";

/* plugin */
import { Link } from "react-router-dom";
/* plugin end */

// var para
var moment = require("moment");
var paraHTML;
var para;

const BlogCard = ({
  bloglink,
  img,
  category,
  title,
  time,
  content,
  datecode,
}) => {
  paraHTML = document.createElement("div");
  paraHTML.innerHTML = content;
  para = paraHTML.children[0].innerText;
  const handleLinkClick = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };
  return (
    <Link
      to={`/blog-detail/${bloglink}`}
      className="blog-box"
      onClick={() => handleLinkClick()}
    >
      <div className="blog-img">
        <img src={img} alt="" width="100%" height="100%" loading="lazy" />
      </div>
      <div className="blog-right">
        <p className="comm-body-small blue">{category}</p>
        <h2 className="comm-head-2">{title}</h2>
        <p className="comm-body">{para}</p>
        <div className="ot-details">
          <span className="comm-body-small">
            {moment(datecode).format("Do MMM YY")}
          </span>
          <span className="divider-circle" />
          <span className="comm-body-small">{time} min read</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

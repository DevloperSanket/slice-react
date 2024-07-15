import React from "react";
import { Link } from "react-router-dom";
var moment = require("moment");

function LearnBlog({
  bloglink,
  img,
  category,
  title,
  time,
  content,
  datecode,
  onClickFun,
}) {
  const handleLinkClick = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };
  return (
    <Link
      to={`/blog-detail/${bloglink}`}
      className="blog-box"
      onClick={() => {
        handleLinkClick();
        onClickFun();
      }}
    >
      <div className="blog-img">
        <img src={img} alt="" width="100%" height="100%" loading="lazy" />
      </div>
      <div className="blog-right">
        <p className="comm-body-small blue">{category}</p>
        <h2 className="comm-head-7">{title}</h2>
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
}

export default LearnBlog;

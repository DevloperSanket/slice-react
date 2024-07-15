import React from "react";

const FaqListComp = ({ title, imgSrc, onClick, activeState }) => {
  return (
    <div
      className={`faq-wrap ${activeState}`}
      onClick={() => {
        onClick();
      }}
    >
      <div className="faq-page">
        <img
          src={imgSrc}
          alt=""
          className="faq-icon"
          width="100%"
          height="100%"
          loading="lazy"
        />
        <span className="comm-body">{title}</span>
      </div>
      <div className="right-arrow">
        <span className="icon-arrow-left" />
      </div>
    </div>
  );
};

export default FaqListComp;

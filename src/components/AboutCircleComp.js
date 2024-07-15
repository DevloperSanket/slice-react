import React from "react";

const AboutCircleComp = ({ data }) => {
  return (
    <div className="f-col">
      <div className="about-circ-wrap">
        <div className="about-circ-box-wrap card-box-wrap">
          <div className="about-circ-box card-box">
            <h3>{data.title}</h3>
          </div>
          <div className="card-shadow" />
        </div>
      </div>
    </div>
  );
};

export default AboutCircleComp;

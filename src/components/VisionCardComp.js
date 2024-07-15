import React from "react";

const VisionCardComp = ({ data }) => {
  return (
    <div className={`mission-box ${data.color}`}>
      <div className="noiseContain">
        <div className="noiseContain-box"></div>
        <div className="mission-box-coloured">
          <div className="mission-icon">
            <img src={data.logo} />
          </div>
          <h3 className="comm-head-2">{data.heading}</h3>
          <p>{data.detail}</p>
        </div>
      </div>
    </div>
  );
};

export default VisionCardComp;

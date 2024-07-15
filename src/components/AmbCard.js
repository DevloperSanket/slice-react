import React from "react";

const { REACT_APP_ASSET_URL } = process.env;

const AmbCard = ({ imgSrc, ambName, intro, niche }) => {
  return (
    <div className="mentor-box change-cursor">
      <div className="mentor-img change-cursor">
        <img
          className="change-cursor"
          // src={`${REACT_APP_ASSET_URL}/index/mentor-2.jpg`}
          src={imgSrc}
          alt=""
          width="100%"
          height="100%"
          loading="lazy"
        />
      </div>
      <p className="position change-cursor">{niche}</p>
      <h2 className="comm-head-5 white change-cursor">{ambName}</h2>
      <p className="comm-body-small white change-cursor">{intro}</p>
    </div>
  );
};

export default AmbCard;

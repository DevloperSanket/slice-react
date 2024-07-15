import React from "react";
import { Link } from "react-router-dom";
const { REACT_APP_ASSET_URL } = process.env;

const ResaleCard = ({ img, city, title, price, sliceNo }) => {
  return (
    <a
      href="https://webapp.beta.slice.ooo/login"
      target="_blank"
      className="resale-wrap">
      <div className="resale-image">
        <img src={img} alt="" />
      </div>
      <h4>{title} </h4>
      <h5>{city}</h5>
      <div className="resale-bottom">
        <h4>USD {price}</h4>
        <div className="slice-tag">
          <img
            src={`${REACT_APP_ASSET_URL}/properties/slice-small.svg`}
            alt="Slice"
          />
          <p>{sliceNo} Slice</p>
        </div>
      </div>
    </a>
  );
};

export default ResaleCard;

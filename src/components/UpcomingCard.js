import React from "react";
import { Link } from "react-router-dom";
const { REACT_APP_ASSET_URL } = process.env;

const UpcomingCard = ({ img, title, city, price }) => {
  return (
    <div className="upcoming-wrap">
      <div className="upcoming-image">
        <img src={img} alt="" />
      </div>
      <div className="upcoming-txt">
        <h4>{title}</h4>
        <div className="comm-rel">
          <div className="blur-overlay blur-text-bl active">
            <div className="blur-text">
              <div>
                <img
                  src={`${REACT_APP_ASSET_URL}/properties/lock-bold-bl.svg`}
                  alt="lock"
                />
              </div>
              <p>
                <a href="https://webapp.beta.slice.ooo/sign-up" target="_blank">
                  Sign up
                </a>{" "}
                or{" "}
                <a href="https://webapp.beta.slice.ooo/login" target="_blank">
                  Login
                </a>{" "}
                to view the property
              </p>
            </div>
          </div>
          <h5>{city}</h5>
          <h3>{price}</h3>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCard;

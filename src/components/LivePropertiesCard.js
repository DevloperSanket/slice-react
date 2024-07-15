import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const { REACT_APP_ASSET_URL } = process.env;

const LivePropertiesCard = ({
  img,
  name,
  city,
  bed,
  bath,
  area,
  price,
  irr,
  sliceLeft,
  totalSlice,
  status,
  fundingDate,
}) => {
  const [mySeconds, setSeconds] = useState(0);

  const updateTimer = () => {
    const currDate = moment();
    const fundDate = moment(fundingDate);
    // const duration = moment.duration(fundDate.diff(currDate));
    const duration = moment.duration(fundDate - currDate);
    // console.log(duration);

    // Get the duration in days, hours, minutes, and seconds
    const days = Math.floor(duration.asDays());
    const hours = Math.floor(duration.asHours() % 24);
    const minutes = Math.floor(duration.asMinutes() % 60);
    const seconds = Math.floor(duration.asSeconds() % 60);

    // const days = duration.days();
    // const hours = duration.hours();
    // const minutes = duration.minutes();
    // const seconds = duration.seconds();
    const formattedTime = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
    // const formattedTime = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;

    if (hours > 0) {
      setSeconds(formattedTime);
    } else {
      setSeconds("0d: 0h: 0m: 0s");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="live-prop-wrap">
      <div className="live-prop-bg">
        <img src={img} alt="" />
      </div>
      <div className="live-prop-top">
        <div className="time-tag">
          <img src={`${REACT_APP_ASSET_URL}/properties/time-icon.svg`} alt="" />
          <p>{mySeconds}</p>
        </div>
        <div className="live-tag">
          <p>{status}</p>
        </div>
      </div>
      <div className="live-prop-bottom">
        <div className="time-tag">
          <img src={`${REACT_APP_ASSET_URL}/properties/small-pie.svg`} alt="" />
          <p>
            Slices Left: {sliceLeft}/{totalSlice}
          </p>
        </div>
        <h3>{name}</h3>

        <div className="comm-rel">
          <div className="blur-overlay active">
            <div className="blur-text">
              <div>
                <img
                  src={`${REACT_APP_ASSET_URL}/properties/lock-bold-wh.svg`}
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
          <h4>{city}</h4>
          <div className="small-tags">
            <div className="detail-tag">
              <img
                src={`${REACT_APP_ASSET_URL}/properties/bed-icon.svg`}
                alt=""
              />
              <p>{bed} Bed</p>
            </div>
            <div className="detail-tag">
              <img
                src={`${REACT_APP_ASSET_URL}/properties/bath-icon.svg`}
                alt=""
              />
              <p>{bath} Bath</p>
            </div>
            <div className="detail-tag">
              <img
                src={`${REACT_APP_ASSET_URL}/properties/scale-icon.svg`}
                alt=""
              />
              <p>{area} SqFt</p>
            </div>
          </div>
          <div className="live-last-wrap">
            <h5>USD {price}</h5>
            <div className="returns-tag">
              <p>Returns: {irr}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePropertiesCard;

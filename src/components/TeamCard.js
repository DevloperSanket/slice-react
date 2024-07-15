import React from "react";

const { REACT_APP_ASSET_URL } = process.env;

const TeamCard = ({ person }) => {
  return (
    <div className="founder-wrap card-wrap">
      <div className="founder-box-wrap card-box-wrap">
        <div className="founder-box card-box">
          <img src={person.img} alt="" />
        </div>
        <div className="card-shadow" />
      </div>
      <div className="founder-txt">
        {person.lname ? (
          <h4>{person.fname + " " + person.lname}</h4>
        ) : (
          <h4>{person.fname}</h4>
        )}

        <h5>{person.designation}</h5>
        {person.logo ? (
          <div className="advisory-logo">
            <img src={person.logo} alt="" />
          </div>
        ) : null}
        <p>{person.detail}</p>
        <a href={person.linkedin} target="_blank" className="founder-linkedin">
          <img src={`${REACT_APP_ASSET_URL}/linkedin-logo.svg`} alt="" />
        </a>
      </div>
    </div>
  );
};

export default TeamCard;

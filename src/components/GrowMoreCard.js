import React from "react";
import { Link } from "react-router-dom";
const { REACT_APP_ASSET_URL } = process.env;

const GrowMoreCard = ({ img, title, para }) => {
    return (
        <a href="#" className="grow-box-wrap">
            <div className="grow-image">
                <img
                    src={img}
                    alt=""
                />
            </div>
            <h4>{title}</h4>
            <p>{para}</p>
        </a>
    )
}

export default GrowMoreCard;
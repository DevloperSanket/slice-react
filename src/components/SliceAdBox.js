import React from "react";

const SliceAdBox = ({ adBoxData }) => {
    return (
        <div className="slice-ad-box change-cursor">
            <div className="slice-ad-icon change-cursor">
                <img src={adBoxData.img} alt="" className="change-cursor" />
            </div>
            <h3 className="comm-head-3 white change-cursor">
                {adBoxData.title}
            </h3>
            <p className=" change-cursor">
                {adBoxData.para}
            </p>
        </div>
    )
}

export default SliceAdBox
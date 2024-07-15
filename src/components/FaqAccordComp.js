import React, { useState } from "react";

/* plugin */
import { useAutoAnimate } from "@formkit/auto-animate/react";
/* plugin end */

const FaqAccordComp = ({ title, description }) => {
  const [animationParent] = useAutoAnimate();
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`faq-details ${isActive ? "active" : ""}`}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="faq-ques">
        <h2 className="comm-head-4">{title}</h2>
        <div className="right-arrow">
          <span className="icon-arrow-down" />
        </div>
      </div>
      <div ref={animationParent}>
        {isActive && (
          <div className="faq-ans comm-body">
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqAccordComp;

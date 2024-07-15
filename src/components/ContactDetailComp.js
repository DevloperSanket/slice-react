import React from "react";

const ContactDetailComp = ({ data }) => {
  // console.log({ data });

  return (
    <a
      href={data?.link}
      className="contact-detail-wrap"
      rel="noreferrer"
      target="_blank"
    >
      <div className="contact-detail-icon">
        <img src={data?.icon} width={`100%`} height={`100%`} alt={data?.type} />
      </div>
      <div className="contact-detail-txt">
        <h4>{data?.type.replaceAll("_", " ")}</h4>
        <h3>{data?.value}</h3>
      </div>
    </a>
  );
};

export default ContactDetailComp;

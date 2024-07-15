import React, { useContext, useEffect, useState } from "react";

/* plugin */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "@dotlottie/player-component";
import axios from "axios";
/* plugin end */

/* Component */
import GetSliceCard from "../components/GetSliceCard";
import { headersConfig } from "../config/constants";
import ContactDetailComp from "../components/ContactDetailComp";
import gs from "../service/global";
import mainContext from "../config/mainContext";
/* Component End*/

const { REACT_APP_ASSET_URL } = process.env;
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const mainObj = useContext(mainContext);
  // console.log(mainObj);
  const [contactDetail, setContactDetail] = useState([]);

  /* Login Api */
  const getContactDetail = () => {
    axios
      .get(
        `/main/slice/api/v1/user/static/content?limit=100&pageNo=1&type=SLICE_SUPPORT`,
        {
          headers: {
            ...headersConfig,
            Authorization: `Bearer ${mainObj.appToken}`,
          },
        }
      )
      .then((response) => {
        setContactDetail(response.data.data);

        /* Loader Starts */
        gs.showLoader(true);
        /* Loader Ends */
      })
      .catch((error) => {
        console.log(error);
        window.location.reload();
        /* Loader Starts */
        gs.showLoader(false);
        /* Loader Ends */
      });
  };
  /* Login Api end */
  useEffect(() => {
    if (mainObj?.apiLoad) {
      getContactDetail();
    }
  }, [mainObj]);

  return (
    <main className="main-container">
      <section className="internal-banner-section">
        <div className="container">
          <div className="internal-banner-wrap">
            <div className="banner-img banner-img-left">
              <dotlottie-player
                autoPlay
                mode="normal"
                src={`${REACT_APP_ASSET_URL}/contact/contact_us_1.lottie`}
              ></dotlottie-player>
            </div>
            <div className="banner-txt">
              <h1 className="comm-head-1">Contact Us</h1>
              <p>Say hello and we'll be happy to hear from you</p>
            </div>
            <div className="banner-img banner-img-right">
              <dotlottie-player
                autoPlay
                mode="normal"
                src={`${REACT_APP_ASSET_URL}/contact/contact_us_2.lottie`}
              ></dotlottie-player>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Starts */}
      <div className="comm-section">
        <div className="container">
          <div className="f-row">
            <div className="w30 w-990-40 w-768-100">
              <div className="contact-wrap">
                {contactDetail.map((elem) => (
                  <ContactDetailComp key={elem._id} data={elem} />
                ))}
              </div>
            </div>
            <div className="w70 w-990-60 w-768-100">
              <div className="contact-illus">
                <dotlottie-player
                  autoPlay
                  mode="normal"
                  src={`${REACT_APP_ASSET_URL}/contact/contact.lottie`}
                ></dotlottie-player>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Ends */}
      {/* Get Slice and Get Going Starts */}
      <GetSliceCard />
      {/* Get Slice and Get Going Ends */}
    </main>
  );
};

export default Contact;

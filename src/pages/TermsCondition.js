import React, { useEffect, useState } from "react";

/* plugin */
import axios from "axios";
import DOMPurify from "dompurify";
/* plugin end */

/* component */
import { headersConfig, basicAuthConfig } from "../config/constants";
import gs from "../service/global";
/* component end */

const TermsCondition = () => {
  const [termsDetail, setTermsDetail] = useState([]);

  /* Login Api */
  const getTermsDetail = () => {
    axios
      .get(
        `/main/slice/api/v1/user/content/slice-legal-content?title=Terms%20%26%20Conditions`,
        {
          headers: {
            ...headersConfig,
            ...basicAuthConfig,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setTermsDetail(response.data.data);
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
    getTermsDetail();
  }, []);

  return (
    <main className="main-container">
      <section className="internal-banner-section ">
        <div className="container">
          <div className="internal-banner-wrap">
            <div className="banner-img banner-img-left"></div>
            <div className="banner-txt">
              <h1 className="comm-head-1">{termsDetail.title}</h1>
            </div>
            <div className="banner-img banner-img-right"></div>
          </div>
        </div>
      </section>

      <section className="comm-section">
        <div className="container">
          <div className="blog-container">
            <div
              className="blog-details custom-quill-styles-container"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(termsDetail.body),
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsCondition;

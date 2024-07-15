import React from "react";
import { Link } from "react-router-dom";

const { REACT_APP_ASSET_URL } = process.env;

const Footer = () => {
  const handleLinkClick = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };
  return (
    <div className="footer-wrap change-cursor">
      <div className="container change-cursor">
        <div className="footer-box change-cursor">
          <div className="footer-top change-cursor">
            <div className="f-row change-cursor">
              <div className="w80 w-768-100 footer-logo-wrap change-cursor">
                <div className="logo footer-logo change-cursor">
                  <img
                    src={`${REACT_APP_ASSET_URL}/slice-logo-white.svg`}
                    alt="Logo"
                  />
                </div>
                <div className="foot-addr">
                  <p className="footer-txt change-cursor">
                    Slice Fintech Limited
                    <br /> Office 201, Gate Avenue South, DIFC,
                    <br /> Dubai, UAE
                  </p>
                  <br />
                  <p className="footer-txt change-cursor">
                    Slice Fintech Limited
                    <br /> 867 Boylston St Suite 500 Boston, <br />
                    MA 02116, USA
                  </p>
                </div>
                <p className="footer-txt change-cursor">
                  Slice Fintech Limited (“Slice”) is regulated by the Dubai
                  Financial Services Authority (DFSA)
                </p>
              </div>
              <div className="w20 w-768-30 w-640-100 footer-left-wrap change-cursor">
                <div className="footer-left change-cursor">
                  <h4 className="footer-head change-cursor">Follow Us</h4>
                  <div className="footer-list social-list change-cursor">
                    <ul className=" change-cursor">
                      <li className=" change-cursor">
                        <a
                          href="https://www.instagram.com/slicesuperapp/"
                          target="_blank"
                          rel="noreferrer"
                          className="curzr-hover change-cursor"
                        >
                          <img
                            src={`${REACT_APP_ASSET_URL}/common/insta.svg`}
                            alt=""
                            width="100%"
                            height="100%"
                            loading="lazy"
                            className="curzr-hover "
                          ></img>
                        </a>
                      </li>
                      <li className=" change-cursor">
                        <a
                          href="https://www.facebook.com/slice.ooo/"
                          target="_blank"
                          rel="noreferrer"
                          className="curzr-hover change-cursor"
                        >
                          <i className="icon-facebook change-cursor" />
                        </a>
                      </li>
                      <li className=" change-cursor">
                        <a
                          href="https://twitter.com/Slicesuperapp"
                          target="_blank"
                          rel="noreferrer"
                          className="curzr-hover change-cursor"
                        >
                          <img
                            src={`${REACT_APP_ASSET_URL}/common/twitter.svg`}
                            alt=""
                            width="100%"
                            height="100%"
                            loading="lazy"
                            className="curzr-hover "
                          ></img>
                          {/* <i className="icon-twitter change-cursor" /> */}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom change-cursor">
            <p className="footer-txt change-cursor">
              2024 Slice. All rights reserved.
            </p>
            <div className="terms-pages change-cursor">
              <Link
                to="/faq?data=RiskDisclosures"
                className="curzr-hover change-cursor"
                onClick={() => handleLinkClick()}
              >
                Key Risk
              </Link>
              <Link
                to="/terms-condition"
                className="curzr-hover change-cursor"
                onClick={() => handleLinkClick()}
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy-policy"
                className="curzr-hover change-cursor"
                onClick={() => handleLinkClick()}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

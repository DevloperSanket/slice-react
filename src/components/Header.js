import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { isMobile } from "detect-touch-device";
import AnimatedCursor from "react-animated-cursor";

const { REACT_APP_ASSET_URL } = process.env;

function menuClick() {
  document.querySelector(".mobile-menu").classList.add("in");
  document.querySelector(".menuOverlay").classList.add("in");
  document.querySelector("body").classList.add("overflow-hidden");
}

function closeClick() {
  document.querySelector(".menuOverlay").classList.remove("in");
  document.querySelector(".mobile-menu").classList.remove("in");
  document.querySelector("body").classList.remove("overflow-hidden");
}

function callWebengageTrackEvent(event_name) {
  window.webengage.track(event_name, {});
}

const Header = () => {
  const handleLinkClick = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  /* cursor */
  /* cursor end */

  return (
    <>
      <div id="header">
        <div className="header-box">
          <div className="head-left">
            <div className="logoBox">
              <Link className="logo" to="/" onClick={() => handleLinkClick()}>
                <img src={`${REACT_APP_ASSET_URL}/logo.svg`} alt="Logo" />
              </Link>
            </div>
          </div>
          <ul className="header-list">
            <li
              onClick={() => {
                callWebengageTrackEvent("How it Works Tab clicked");
                handleLinkClick();
              }}
            >
              <Link to="/how-it-works">How it works</Link>
            </li>
            <li
              onClick={() => {
                callWebengageTrackEvent("Properties Tab Clicked");
                handleLinkClick();
              }}
            >
              <Link to="/properties">Properties</Link>
            </li>
            <li className="drop">
              <p>Learn</p>
              <ul>
                <li
                  onClick={() => {
                    callWebengageTrackEvent("Blog Tab Clicked");
                    handleLinkClick();
                  }}
                >
                  <Link to="/blog">Blogs</Link>
                </li>
                <li
                  onClick={() => {
                    callWebengageTrackEvent("FAQ Clicked");
                    handleLinkClick();
                  }}
                >
                  <Link to="/faq">Faq's</Link>
                </li>
              </ul>
            </li>
            <li className="drop">
              <p>About</p>
              <ul>
                <li
                  onClick={() => {
                    callWebengageTrackEvent("About Us Clicked");
                    handleLinkClick();
                  }}
                >
                  <Link to="/about">About Us</Link>
                </li>
                <li
                  onClick={() => {
                    callWebengageTrackEvent("Contact Us Clicked");
                    handleLinkClick();
                  }}
                >
                  <Link to="/contact">Contact Us </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="head-right">
            <div className="menuBtn">
              <a
                href="https://webapp.beta.slice.ooo/login"
                target="_blank"
                rel="noreferrer"
                className="button white"
                onClick={() => {
                  callWebengageTrackEvent("Login Button Clicked");
                  handleLinkClick();
                }}
              >
                Login
              </a>
              <a
                href="https://webapp.beta.slice.ooo/sign-up"
                target="_blank"
                rel="noreferrer"
                className="button black"
                onClick={() => {
                  callWebengageTrackEvent("Get Started Clicked");
                  handleLinkClick();
                }}
              >
                Get Started
              </a>
              <div className="menu side-menu" onClick={menuClick}>
                <img
                  src={`${REACT_APP_ASSET_URL}/common/side-menu.svg`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* Side Menu */}
        <div className="menuOverlay" />
        <div className="mobile-menu">
          <h3 className="close-menu" onClick={closeClick}>
            <img src={`${REACT_APP_ASSET_URL}/common/cross.svg`} alt="cancel" />
          </h3>
          <ul className="header-list">
            <li
              onClick={() => {
                callWebengageTrackEvent("How it Works Tab clicked");
                handleLinkClick();
              }}
            >
              <Link to="/how-it-works" onClick={closeClick}>
                How it works
              </Link>
            </li>
            <li
              onClick={() => {
                callWebengageTrackEvent("Properties Tab Clicked");
                handleLinkClick();
              }}
            >
              <Link to="./properties" onClick={closeClick}>
                Properties
              </Link>
            </li>
            <li className="drop">
              <h6 className="mob-list-menu">Learn</h6>
              <ul>
                <li
                  onClick={() => {
                    callWebengageTrackEvent("Blog Tab Clicked");
                    handleLinkClick();
                  }}
                >
                  <Link to="./blog" onClick={closeClick}>
                    Blogs
                  </Link>
                </li>
                <li
                  onClick={() => {
                    callWebengageTrackEvent("FAQ Clicked");
                    handleLinkClick();
                  }}
                >
                  <Link to="/faq" onClick={closeClick}>
                    Faq's
                  </Link>
                </li>
              </ul>
            </li>
            <li className="drop">
              <h6 className="mob-list-menu">About</h6>
              <ul>
                <li
                  onClick={() => {
                    callWebengageTrackEvent("About Us Clicked");
                    handleLinkClick();
                  }}
                >
                  <Link to="/about" onClick={closeClick}>
                    About Us
                  </Link>
                </li>
                <li
                  onClick={() => {
                    callWebengageTrackEvent("Contact Us Clicked");
                    handleLinkClick();
                  }}
                >
                  <Link to="/contact" onClick={closeClick}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* Side Menu End */}
        {/* <div className="loaderBig">
                    <img src={`${REACT_APP_ASSET_URL}/common/loader.gif`} alt="" />
                </div> */}
      </div>

      {!isMobile && (
        // <div className="curzr">
        //   <div className="curzr-dot"></div>
        // </div>
        <AnimatedCursor
          innerSize={0}
          outerSize={25}
          innerScale={1}
          outerScale={1.7}
          outerAlpha={0}
          trailingSpeed={1}
          // hasBlendMode={true}
          // innerStyle={{
          //   border: "2px solid #f00",
          // }}
          outerStyle={{
            border: "2px solid rgba(67, 37, 245, 1)",
            background: "rgba(67, 37, 245, 0.5)",
            // border: "2px solid rgba(46, 255, 215, 1)",
            // background: "rgba(46, 255, 215, 0.15)",
            // border: "2px solid rgba(86, 252, 46, 1)",
            // background: "rgba(86, 252, 46, 0.15)",
            mixBlendMode: "difference",
          }}
        />
      )}
    </>
  );
};

export default Header;

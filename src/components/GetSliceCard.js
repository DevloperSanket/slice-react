import React, { useRef } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIntersection } from "react-use";
const { REACT_APP_ASSET_URL } = process.env;
gsap.registerPlugin(ScrollTrigger);

const GetSliceCard = () => {
  const getSliceSectionRef = useRef(null);
  const intersection = useIntersection(getSliceSectionRef, {
    root: null,
    rootMargin: "400px",
    threshold: 1,
  });

  const getSlicePlay = () => {
    const getSliceCardAnim = gsap.timeline();
    getSliceCardAnim.to(
      ".get-slice-phone-1 img,.get-slice-phone-2 img",
      {
        x: 0,
        y: 0,
        ease: "power2.inOut",
        duration: 1,
      },
      0
    );
  };

  const getSliceReverse = () => {
    const getSliceCardAnim = gsap.timeline();
    getSliceCardAnim
      .to(
        ".get-slice-phone-1 img",
        {
          x: 550,
          y: -550,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      .to(
        ".get-slice-phone-2 img",
        {
          x: -500,
          y: 500,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );
  };

  intersection && intersection.intersectionRatio < 1
    ? getSliceReverse()
    : getSlicePlay();

  useEffect(() => {
    var element = document.querySelector(".get-slice-phone-1");
    function getTranslateX() {
      var myStyle = window.getComputedStyle(element).transform;
    }
    getTranslateX();
  }, []);

  return (
    <div ref={getSliceSectionRef} className="comm-section get-slice-section">
      <div className="container">
        <div className="get-slice-box">
          <div className="get-slice-bg">
            <img src={`${REACT_APP_ASSET_URL}/gs-bg.png`} alt="" />
          </div>
          <div className="get-slice-left">
            <h2 className="comm-head-2 white">
              Get Slice and <br /> Get Going
            </h2>
            <div className="get-slice-btns footer-slice-btn">
              <a href="#" target="_blank" className="curzr-hover">
                <img
                  src={`${REACT_APP_ASSET_URL}/common/slice-google-play.svg`}
                  alt="Slice Google Play"
                />
              </a>
              <a href="#" target="_blank" className="curzr-hover">
                <img
                  src={`${REACT_APP_ASSET_URL}/common/slice-app-store.svg`}
                  alt="Slice App Store"
                />
              </a>
            </div>
            <div className="get-slice-scan">
              <h3>Just scan & Download Slice</h3>
              <div className="get-slice-img">
                <img
                  src={`${REACT_APP_ASSET_URL}/index/app-store-qr.png`}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="get-slice-right">
            <div className="get-slice-phone-1">
              <img src={`${REACT_APP_ASSET_URL}/gs-phone-1.png`} alt="" />
            </div>
            <div className="get-slice-phone-2">
              <img src={`${REACT_APP_ASSET_URL}/gs-phone-2.png`} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSliceCard;

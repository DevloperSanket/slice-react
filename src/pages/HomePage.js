import React, { useEffect, useState, useContext } from "react";
/* plugin */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  EffectCards,
  EffectFade,
  Controller,
  Autoplay,
  Navigation,
} from "swiper/modules";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "@dotlottie/player-component";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import lottie from "lottie-web";
/* plugin end */

/* Component */
import { headersConfig } from "../config/constants";
import GetSliceCard from "../components/GetSliceCard";
import gs from "../service/global";
import LearnBlog from "../components/LearnBlog";
import mainContext from "../config/mainContext";
import { Link } from "react-router-dom";
import AmbCard from "../components/AmbCard";
/* Component End*/

const { REACT_APP_ASSET_URL } = process.env;
gsap.registerPlugin(ScrollTrigger);

function myCalc() {
  // Calculator start
  var investVal = document.querySelector("#investVal");
  var capAppVal = document.querySelector("#capAppVal");
  var annuVal = document.querySelector("#annuVal");

  // Investment Range Slider
  const investRange = document.querySelector("#invest .range");
  const investThumb = document.querySelector("#invest .thumb");
  const investTrack = document.querySelector("#invest .track-inner");

  const updateInvestSlider = (value) => {
    // value = value/0;
    investThumb.style.left = `${value}%`;
    investThumb.style.transform = `translate(-${value}%, -50%)`;
    investTrack.style.width = `${value}%`;
  };

  investRange.oninput = (e) => {
    updateInvestSlider(e.target.value);
    let tempInvestVal = e.target.value * 400 + 10000;
    investVal.innerHTML = tempInvestVal;
    calc();
  };

  updateInvestSlider(0);
  // Investment Range Slider

  // Capital Apprition Range Slider
  const capRange = document.querySelector("#cap .range");
  const capThumb = document.querySelector("#cap .thumb");
  const capTrack = document.querySelector("#cap .track-inner");

  const updateCapSlider = (value) => {
    capThumb.style.left = `${value}%`;
    capThumb.style.transform = `translate(-${value}%, -50%)`;
    capTrack.style.width = `${value}%`;
  };

  capRange.oninput = (e) => {
    updateCapSlider(e.target.value);
    if (e.target.value == 0) capAppVal.innerHTML = "20%";
    else if (e.target.value == 16.6) capAppVal.innerHTML = "25%";
    else if (e.target.value == 33.2) capAppVal.innerHTML = "30%";
    else if (e.target.value == 49.8) capAppVal.innerHTML = "35%";
    else if (e.target.value == 66.4) capAppVal.innerHTML = "40%";
    else if (e.target.value == 83) capAppVal.innerHTML = "45%";
    else if (e.target.value == 99.6) capAppVal.innerHTML = "50%";

    calc();
  };

  updateCapSlider(0);
  // Capital Apprition Range Slider

  // Annual rental Range Slider
  const annuRange = document.querySelector("#annu .range");
  const annuThumb = document.querySelector("#annu .thumb");
  const annuTrack = document.querySelector("#annu .track-inner");

  const updateAnnuSlider = (value) => {
    annuThumb.style.left = `${value}%`;
    annuThumb.style.transform = `translate(-${value}%, -50%)`;
    annuTrack.style.width = `${value}%`;
  };

  annuRange.oninput = (e) => {
    updateAnnuSlider(e.target.value);
    console.log(e.target.value);
    if (e.target.value == 0) annuVal.innerHTML = "5%";
    else if (e.target.value == 10) annuVal.innerHTML = "6%";
    else if (e.target.value == 20) annuVal.innerHTML = "7%";
    else if (e.target.value == 30) annuVal.innerHTML = "8%";
    else if (e.target.value == 40) annuVal.innerHTML = "9%";
    else if (e.target.value == 50) annuVal.innerHTML = "10%";
    else if (e.target.value == 60) annuVal.innerHTML = "11%";
    else if (e.target.value == 70) annuVal.innerHTML = "12%";
    else if (e.target.value == 80) annuVal.innerHTML = "13%";
    else if (e.target.value == 90) annuVal.innerHTML = "14%";
    else if (e.target.value == 100) annuVal.innerHTML = "15%";
    calc();
  };

  updateAnnuSlider(0);
  // Annual rental Range Slider
  var totalReturn = document.querySelector("#totalReturn");
  var totalReturnShow = document.querySelector("#totalReturnShow");
  var monthlyRent = document.querySelector("#monthlyRent");
  var totalRent = document.querySelector("#totalRent");
  var totalRentShow = document.querySelector("#totalRentShow");
  var valAppr = document.querySelector("#valAppr");
  var valApprShow = document.querySelector("#valApprShow");
  var annualizedReturn = document.querySelector("#annualizedReturn");
  var totalInsvShow = document.querySelector("#totalInsvShow");
  var totalInsv = document.querySelector("#totalInsv");

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function calc() {
    // let investValTemp = parseInt(investVal.innerHTML);
    let investValTemp = parseInt(investVal.innerHTML.replace(/,/g, ""), 10);
    let capAppValTemp = parseInt(capAppVal.innerHTML);
    let annuValTemp = parseInt(annuVal.innerHTML);

    totalInsv.innerHTML = investValTemp;
    totalInsvShow.innerHTML = numberWithCommas(totalInsv.innerHTML);

    valAppr.innerHTML = Math.floor((investValTemp * capAppValTemp) / 100);
    valApprShow.innerHTML = numberWithCommas(valAppr.innerHTML);

    totalRent.innerHTML = Math.floor(((investValTemp * annuValTemp) / 100) * 5);
    totalRentShow.innerHTML = numberWithCommas(totalRent.innerHTML);

    let totalRentTemp = parseInt(totalRent.innerHTML);
    let valApprTemp = parseInt(valAppr.innerHTML);

    totalReturn.innerHTML = Math.floor(totalRentTemp + valApprTemp);
    totalReturnShow.innerHTML = numberWithCommas(totalReturn.innerHTML);

    annualizedReturn.innerHTML =
      (totalReturn.innerHTML * 100) / investValTemp / 5;
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function numberWithoutCommas(x) {
    x = x.replace(/\,/g, "");
    return parseInt(x, 10);
  }

  // Calculator End
}

const HomePage = () => {
  const handleLinkClick = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  const mainObj = useContext(mainContext);
  // console.log(mainObj);
  const [blogData, setBlogData] = useState([]);
  const [ambData, setAmbDetail] = useState([]);

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  const [firstClientSwiper, setFirstClientSwiper] = useState(null);
  const [secondClientSwiper, setSecondClientSwiper] = useState(null);

  /* Blog Api Start*/
  const getBlog = () => {
    var blogLimit = 10;
    var pageNo = 1;
    var learnBlog = [];
    axios
      .get(
        `/main/slice/api/v1/user/static/content?limit=${blogLimit}&pageNo=${pageNo}&type=SLICE_BLOGS`,
        {
          headers: {
            ...headersConfig,
            Authorization: `Bearer ${mainObj.appToken}`,
          },
        }
      )
      .then((response) => {
        setBlogData(response.data.data);
        // console.log(response.data.data);
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
  /* Blog Api end */

  /* ambassadors Api Start*/
  const getAmbDetail = () => {
    axios
      .get(
        `/main/slice/api/v1/user/static/content?limit=100&pageNo=1&type=SLICE_AMBASSADOR`,
        {
          headers: {
            ...headersConfig,
            Authorization: `Bearer ${mainObj?.appToken}`,
          },
        }
      )
      .then((response) => {
        setAmbDetail(response.data.data);
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
  /* ambassadors End */

  useEffect(() => {
    /* Loader Starts */
    gs.showLoader(true);
    /* Loader Ends */

    if (mainObj?.apiLoad) {
      getBlog();
      getAmbDetail();
    }

    // Function to play hiw videos
    const workPlay = (id) => {
      const video = document.getElementById(id);
      if (video) {
        video.playbackRate = 1;
        video.play();
      }
    };

    const tl0 = gsap.timeline({
      scrollTrigger: {
        trigger: ".works-trigger-0",
        start: "top 40%",
        end: "top 40%",
        toggleActions: "play none none reverse",
        id: "0",
        preventOverlaps: true,
        // markers: true,
        onEnter: () => {
          document.querySelector(".inv1").play();
        },
        onEnterBack: () => {
          document.querySelector(".inv1").stop();
        },
      },
    });

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".works-trigger-1",
        start: "top 40%",
        end: "top 40%",
        toggleActions: "play none none reverse",
        id: "1",
        preventOverlaps: true,
        // markers: true,
        onEnter: () => {
          document.querySelector(".inv2").play();
          document.querySelector(".inv1").stop();
        },
        onEnterBack: () => {
          document.querySelector(".inv1").play();
          document.querySelector(".inv2").stop();
        },
      },
    });
    tl1
      .to(
        ".skewed-number",
        {
          rotateY: -360,
          duration: 1.5,
          ease: "back.out(1.4)",
        },
        0
      )
      .to(
        ".skewed-number-1",
        {
          delay: 0.4,
          duration: 0.01,
          css: {
            opacity: 0,
            position: "absolute",
          },
        },
        0
      )
      .to(
        ".skewed-number-2",
        {
          delay: 0.4,
          duration: 0.01,
          css: {
            opacity: 1,
            position: "relative",
          },
        },
        0
      )
      .to(
        ".skewed-bg",
        {
          duration: 1.5,
          ease: "back.out(1.4)",
          css: {
            background: "#56FD2E",
            rotateY: -360,
          },
        },
        0
      )
      .to(
        ".skewed-bg",
        {
          x: -12,
          y: -4,
          duration: 0.5,
          ease: "back.out(1.4)",
        },
        0
      )
      .to(
        ".skewed-bg",
        {
          delay: 0.5,
          duration: 0.75,
          x: 0,
          y: 0,
          ease: "back.out(1.4)",
        },
        0
      )
      .to(
        ".hiw-text-2",
        {
          duration: 0.5,
          css: {
            opacity: 1,
            position: "relative",
            zIndex: 3,
          },
        },
        0
      )
      .to(
        ".hiw-text-1",
        {
          duration: 0.5,
          css: {
            opacity: 0,
            position: "absolute",
            zIndex: 0,
          },
        },
        0
      )
      .to(
        ".works-img-2",
        {
          duration: 0.5,
          css: {
            opacity: 1,
            position: "relative",
          },
        },
        0
      )
      .to(
        ".works-img-1",
        {
          duration: 0.5,
          css: {
            opacity: 0,
            position: "absolute",
          },
        },
        0
      );

    var tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".works-trigger-2",
        start: "top 40%",
        end: "top 40%",
        toggleActions: "play none none reverse",
        id: "2",
        preventOverlaps: true,
        // markers: true,
        onEnter: () => {
          document.querySelector(".inv3").play();
          document.querySelector(".inv2").stop();
        },
        onEnterBack: () => {
          document.querySelector(".inv2").play();
          document.querySelector(".inv3").stop();
        },
      },
    });
    tl2
      .to(
        ".skewed-number",
        {
          rotateY: -360,
          duration: 1.5,
          ease: "back.out(1.4)",
        },
        0
      )
      .to(
        ".skewed-number-2",
        {
          delay: 0.4,
          duration: 0.01,
          css: {
            opacity: 0,
            position: "absolute",
          },
        },
        0
      )
      .to(
        ".skewed-number-3",
        {
          delay: 0.4,
          duration: 0.01,
          css: {
            opacity: 1,
            position: "relative",
          },
        },
        0
      )
      .to(
        ".skewed-bg",
        {
          duration: 1.5,
          ease: "back.out(1.4)",
          css: {
            background: "#2EFFD7",
            rotateY: -360,
          },
        },
        0
      )
      .to(
        ".skewed-bg",
        {
          x: -12,
          y: -4,
          duration: 0.5,
          ease: "back.out(1.4)",
        },
        0
      )
      .to(
        ".skewed-bg",
        {
          delay: 0.5,
          duration: 0.75,
          x: 0,
          y: 0,
          ease: "back.out(1.4)",
        },
        0
      )
      .to(
        ".hiw-text-3",
        {
          duration: 0.5,
          css: {
            opacity: 1,
            position: "relative",
            zIndex: 3,
          },
        },
        0
      )
      .to(
        ".hiw-text-2",
        {
          duration: 0.5,
          css: {
            opacity: 0,
            position: "absolute",
            zIndex: 0,
          },
        },
        0.01
      )
      .to(
        ".works-img-3",
        {
          duration: 0.5,
          css: {
            opacity: 1,
            position: "relative",
          },
        },
        0
      )
      .to(
        ".works-img-2",
        {
          duration: 0.5,
          css: {
            opacity: 0,
            position: "absolute",
          },
        },
        0.01
      );

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".works-trigger-4",
        start: "top 50%",
        end: "top 50%",
        id: "-1",
        preventOverlaps: true,
        onEnter: () => workPlay("hiw1"),
      },
    });

    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".works-trigger-5",
        start: "top 50%",
        end: "top 50%",
        id: "-2",
        preventOverlaps: true,
        onEnter: () => {
          workPlay("hiw2");
          // You may also want to handle work1Play() here if needed
        },
        onEnterBack: () => workPlay("hiw1"),
      },
    });

    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".works-trigger-6",
        start: "top 50%",
        end: "top 50%",
        id: "-3",
        preventOverlaps: true,
        onEnter: () => {
          workPlay("hiw3");
          // You may also want to handle work2Play() here if needed
        },
        onEnterBack: () => workPlay("hiw2"),
      },
    });

    const ris = gsap.timeline({
      scrollTrigger: {
        trigger: ".ques-section",
        start: "top 30%",
        end: "top 30%",
        preventOverlaps: true,
        onEnter: () => workPlay("quesVideo"),
      },
    });

    const ris2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".ans-section",
        start: "top 30%",
        end: "top 30%",
        preventOverlaps: true,
        onEnter: () => workPlay("ansVideo"),
      },
    });

    myCalc();
    return () => {
      // Clean up code if needed
      tl0.kill();
      tl1.kill();
      tl2.kill();
      tl3.kill();
      tl4.kill();
      tl5.kill();
      ris.kill();
      ris2.kill();
    };
  }, [mainObj]);

  const [animationParent] = useAutoAnimate();
  const [isActive, setIsActive] = useState(false);

  // const handleSlideChange = (swiper) => {
  //   if (swiper.activeIndex > 0) {
  //     const listClick = document.querySelectorAll(".grid-list li");
  //     listClick.forEach(
  //       (list, i) =>
  //       (list.onclick = () => {
  //         for (let i = 0; i < listClick.length; i++) {
  //           listClick[i].classList.remove("active");
  //         }
  //         list.classList.add("active");
  //         swiper.activeIndex = i;
  //       })
  //     );

  //     const ansParas = document.querySelectorAll(".ans-para");
  //     const paraHeight = ansParas[swiper.activeIndex - 1].clientHeight;
  //     ansParas[swiper.activeIndex - 1].style.height = 0;
  //     setTimeout(() => {
  //       ansParas[swiper.activeIndex - 1].style.height = paraHeight + "px";
  //     }, 50);
  //     const gridList = document.querySelectorAll(".grid-list li");
  //     gridList.forEach((para) => para.classList.remove("active"));
  //     document
  //       .querySelector(`.st-${swiper.activeIndex}`)
  //       .classList.add("active");
  //   }
  // };

  /* lottie change */
  const [selectedId, setSelectedId] = useState(1);

  function mobShowHide(i) {
    var currentId = i + 1;
    setSelectedId(currentId);
    // console.log("Enter", currentId);
  }

  function mobShowHideRev(i) {
    // console.log("Reverse", i);
    setSelectedId(i);
  }

  useEffect(() => {
    // dotlottie animation sharpness script
    document.querySelectorAll(".works-img").forEach((element, i) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".works-trigger-" + i,
          start: "top 40%",
          end: "top 40%",
          toggleActions: "play none none reverse",
          id: i,
          onEnter: () => mobShowHide(i),
          onEnterBack: () => mobShowHideRev(i),
        },
      });
    });
  }, []);
  /* lottie change end */

  return (
    <main className="main-container">
      {/* Hero START */}
      <section className="comm-section home-section bg-blue">
        <div className="container">
          <div className="hero-wrap">
            <div className="hero-left">
              <div className="hero-content-box">
                <h1 className="hero-head">
                  Real Estate Investing Made Effortless!
                </h1>
                <p className="hero-content">
                  Explore Real Estate Opportunities and Create Wealth by joining
                  Slice! Learn how to invest in real estate, starting from as
                  little as $100.
                </p>
                <div className="get-slice-btns banner-slice-btns">
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
                  <div className="curzr-hover qr-code-link">
                    <img
                      src={`${REACT_APP_ASSET_URL}/index/app-store-qr.png`}
                      alt="qr link"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-img">
                <video
                  className="video-background"
                  loop
                  autoPlay
                  playsInline={true}
                  muted
                  controlsList="nodownload, noremoteplayback"
                  frameBorder={0}
                  width="100%"
                  height="100%"
                  poster="./hero/000000.jpg">
                  <source
                    src={`${REACT_APP_ASSET_URL}/index/hero.mp4`}
                    type="video/mp4"
                  />
                  Sorry, your browser doesn't support embedded videos, but don't
                  worry, you can{" "}
                  <a href="https://ik.imagekit.io/ctnsv7r1u/index/hero.mp4">
                    {" "}
                    watch here!
                  </a>
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero END */}

      {/* Real Estate Investment Is Not For Me START */}
      <section className="comm-section ques-section">
        <div className="container">
          <div className="comm-center-head">
            <h2 className="comm-head-2">Real estate investment simplified</h2>
          </div>
          <div className="section-body">
            <div className="grid-wrap">
              <div className="grid-img ques-grid">
                <video
                  id="quesVideo"
                  className="video-background"
                  playsInline={true}
                  muted
                  autoPlay
                  controlsList="nodownload, noremoteplayback"
                  autopictureinpicture="false"
                  x-webkit-airplay="deny"
                  frameBorder={0}
                  width="100%"
                  height="100%"
                  poster="./ques/000000.jpg">
                  <source
                    src={`${REACT_APP_ASSET_URL}/index/rei-1.mp4`}
                    type="video/mp4"
                  />
                  Sorry, your browser doesn't support embedded videos, but don't
                  worry, you can
                  <a href="https://ik.imagekit.io/ctnsv7r1u/index/rei-1.mp4">
                    watch here!
                  </a>
                </video>
              </div>
              <div className="grid-content">
                <ul className="grid-list">
                  <li
                    className={`faq-details ${
                      isActive ? "st-1 active" : "st-1"
                    }`}
                    data-id={1}>
                    <p>Real estate investment needs large capital</p>
                    <div ref={animationParent}>
                      <p className="ans-para">
                        Invest in top real estate properties from as low as $
                        100
                      </p>
                    </div>
                    <div className="complete-line" />
                  </li>
                  <li className="st-2" data-id={2}>
                    <p>The process of real estate investment is very complex</p>
                    <div ref={animationParent}>
                      <p className="ans-para">
                        Investment in real estate with an easy 3 step sign up
                        and a 3 click purchase process
                      </p>
                    </div>
                    <div className="complete-line" />
                  </li>
                  <li className="st-3" data-id={3}>
                    <p>Property deals are not transparent and are risky</p>
                    <p className="ans-para">
                      The Slice App gives you full control &amp; transparency
                      Further, Slice is regulated by DFSA (Dubai Financial
                      Services Authority) to protect your investments &amp;
                      monies
                    </p>
                    <div className="complete-line" />
                  </li>
                  <li className="st-4" data-id={4}>
                    <p>
                      Property management, rent collection, and maintenance are
                      a hassle
                    </p>
                    <p className="ans-para">
                      Slice takes care of property management, tenancy &amp; and
                      maintenance overheads
                    </p>
                    <div className="complete-line" />
                  </li>
                  <li className="st-5" data-id={5}>
                    <p>Real estate does not offer portfolio diversification</p>
                    <p className="ans-para">
                      You can build a diversified portfolio by investing in
                      properties of your choice with just few clicks
                    </p>
                    <div className="complete-line" />
                  </li>
                  <li className="st-6" data-id={6}>
                    <p>Investing in international properties is difficult</p>
                    <p className="ans-para">
                      The Slice platform gives customers in 188 countries access
                      to real estate investment in a secure &amp; safe way
                    </p>
                    <div className="complete-line" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Me START */}
      <section className="comm-section">
        <div className="container">
          <div className="comm-center-head">
            <h2 className="comm-head-2">
              Real Estate Investments, in 3 easy step
            </h2>
          </div>
          <div className="section-body">
            <div className="works-sticky">
              <div className="works-trigger-0" />
              <div className="works-trigger-1" />
              <div className="works-trigger-2" />
              <div className="works-trigger-4" />
              <div className="works-trigger-5" />
              <div className="works-trigger-6" />
              <div className="works-grid">
                <div className="works-left">
                  <div
                    className={`works-img works-img-1 ${
                      selectedId === 1 ? "active" : ""
                    }`}>
                    <video
                      id="hiw1"
                      className="video-background"
                      playsInline={true}
                      muted
                      frameBorder={0}
                      width="100%"
                      height="100%"
                      poster="./works/0000.jpg">
                      <source
                        src={`${REACT_APP_ASSET_URL}/index/coin-new.mp4`}
                        type="video/mp4"
                      />
                      Sorry, your browser doesn't support embedded videos, but
                      don't worry, you can
                      <a href={`${REACT_APP_ASSET_URL}/index/coin-new.mp4`}>
                        watch here!
                      </a>
                    </video>

                    <dotlottie-player
                      loop="false"
                      class="investment-lottie inv1"
                      mode="normal"
                      src={`${REACT_APP_ASSET_URL}/index/investment-1.lottie`}></dotlottie-player>
                  </div>
                  <div
                    className={`works-img works-img-2 ${
                      selectedId === 2 ? "active" : ""
                    }`}>
                    <video
                      id="hiw2"
                      className="video-background "
                      playsInline={true}
                      // webkit-playsinline={true}
                      muted
                      frameBorder={0}
                      width="100%"
                      height="100%"
                      poster="./works/0121.jpg">
                      <source
                        src={`${REACT_APP_ASSET_URL}/index/coin-new.mp4`}
                        type="video/mp4"
                      />
                      Sorry, your browser doesn't support embedded videos, but
                      don't worry, you can
                      <a href={`${REACT_APP_ASSET_URL}/index/coin-new.mp4`}>
                        watch here!
                      </a>
                    </video>

                    <dotlottie-player
                      class="investment-lottie inv2"
                      mode="normal"
                      src={`${REACT_APP_ASSET_URL}/index/investment-2.lottie`}></dotlottie-player>
                  </div>
                  <div
                    className={`works-img works-img-3 ${
                      selectedId === 3 ? "active" : ""
                    }`}>
                    <video
                      id="hiw3"
                      className="video-background "
                      playsInline={true}
                      muted
                      frameBorder={0}
                      width="100%"
                      height="100%"
                      poster="./works/0221.jpg">
                      <source
                        src={`${REACT_APP_ASSET_URL}/index/coin-new.mp4`}
                        type="video/mp4"
                      />
                      Sorry, your browser doesn't support embedded videos, but
                      don't worry, you can
                      <a href={`${REACT_APP_ASSET_URL}/index/coin-new.mp4`}>
                        watch here!
                      </a>
                    </video>

                    <dotlottie-player
                      class="investment-lottie inv3"
                      mode="normal"
                      src={`${REACT_APP_ASSET_URL}/index/investment-3.lottie`}></dotlottie-player>
                  </div>
                </div>
                <div className="works-right">
                  <div className="works-content">
                    <div className="skewed-numbers-wrap">
                      <div className="skewed-wrap">
                        <div className="skewed-number skewed-number-1">
                          <span>1</span>
                        </div>
                        <div className="skewed-number skewed-number-2">
                          <span>2</span>
                        </div>
                        <div className="skewed-number skewed-number-3">
                          <span>3</span>
                        </div>
                        <div className="skewed-bg" />
                      </div>
                    </div>
                    <div className="hiw-wrap">
                      <div className="hiw-text hiw-text-1">
                        <div className="hiw-text-desktop">
                          <h4 className="comm-head-3">Create your account</h4>
                          <p>
                            Setting up a Slice account is a simple 3 step
                            sign-up process
                          </p>
                          <button className="button" type="button">
                            Get Started
                          </button>
                        </div>
                      </div>
                      <div className="hiw-text hiw-text-2">
                        <div className="hiw-text-desktop">
                          <h4 className="comm-head-3">Browse Properties</h4>
                          <p>
                            Explore properties curated by our team of experts
                            with all details on amenities, expected returns, and
                            Slice fees
                          </p>
                          <button className="button" type="button">
                            Get Started
                          </button>
                        </div>
                      </div>
                      <div className="hiw-text hiw-text-3">
                        <div className="hiw-text-desktop">
                          <h4 className="comm-head-3">
                            Invest and earn returns
                          </h4>
                          <p>
                            Add money and start investing. Sit back and enjoy
                            your returns.
                          </p>
                          <button className="button" type="button">
                            Get Started
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="works-content-right">
                    <div className="work-marker work-marker-1" />
                    <div className="work-marker work-marker-2" />
                    <div className="work-marker work-marker-3" />
                    <div className="work-line" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How it Works Me END */}

      {/* Know Your Slice of Returns START */}
      <section className="comm-section">
        <div className="container">
          <div className="comm-center-head">
            <h2 className="comm-head-2">Know Your Slice of Returns</h2>
          </div>
          <div className="section-body">
            <div className="f-row f-2 f-990-1">
              <div className="f-col">
                <div className="slider-wrap">
                  <div className="slider-header">
                    <span className="comm-body">Investment Amount</span>
                    <span className="comm-head-6">
                      USD <span id="investVal">10,000</span>
                    </span>
                  </div>
                  <div className="slider" id="invest">
                    <input
                      type="range"
                      className="range"
                      name="investR"
                      id="investR"
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={0}
                    />
                    <div className="track">
                      <div className="track-inner" />
                    </div>
                    <div className="thumb" />
                  </div>
                </div>
                <div className="slider-wrap">
                  <div className="slider-header">
                    <span className="comm-body">
                      Expected Capital Appreciation
                    </span>
                    <span className="comm-head-6 ">
                      <span id="capAppVal">20%</span>
                    </span>
                  </div>
                  <div className="slider" id="cap">
                    <input
                      type="range"
                      className="range"
                      name="cap"
                      id="capR"
                      min={0}
                      max={100}
                      step="16.6"
                      defaultValue={0}
                    />
                    <div className="track">
                      <div className="track-inner" />
                    </div>
                    <div className="thumb" />
                  </div>
                </div>
                <div className="slider-wrap">
                  <div className="slider-header">
                    <span className="comm-body">Expected Annual Rent</span>
                    <span className="comm-head-6 ">
                      <span id="annuVal">5%</span>
                    </span>
                  </div>
                  <div className="slider" id="annu">
                    <input
                      type="range"
                      className="range"
                      name="annu"
                      id="annuR"
                      min={0}
                      max={100}
                      step={10}
                      defaultValue={0}
                    />
                    <div className="track">
                      <div className="track-inner" />
                    </div>
                    <div className="thumb" />
                  </div>
                </div>
                <p className="cal-note">
                  All projected values are before any property costs and
                  platform fees, and based on a <b>5-year holding</b> period. We
                  expect the asset value to grow 30% over the next 5 years.
                </p>
              </div>
              <div className="f-col">
                <div className="return-wrap">
                  <div className="return-box">
                    <h3 className="comm-head-3">
                      USD <span id="totalInsvShow">10,000</span>
                      <span className="dummy-amt" id="totalInsv">
                        10000
                      </span>
                    </h3>
                    <p className="comm-body">Total Investment </p>
                  </div>
                  <div className="return-box">
                    <h3 className="comm-head-3">
                      USD <span id="totalReturnShow">4,500</span>
                      <span className="dummy-amt" id="totalReturn">
                        4500
                      </span>
                    </h3>
                    <p className="comm-body">Total Returns</p>
                  </div>
                </div>
                <div className="return-wrap">
                  <div className="return-box-2">
                    <h3 className="comm-head-5">
                      USD <span id="totalRentShow">2,500</span>
                      <span className="dummy-amt" id="totalRent">
                        2500
                      </span>
                    </h3>
                    <p className="comm-body">Total Rental Income</p>
                  </div>
                  <div className="return-box-2">
                    <h3 className="comm-head-5">
                      USD <span id="valApprShow">2,000</span>
                      <span className="dummy-amt" id="valAppr">
                        5000
                      </span>
                    </h3>
                    <p className="comm-body">Total Capital Appreciation</p>
                  </div>
                </div>
                <div className="return-wrap">
                  <div className="slider-header">
                    <span className="comm-head-5">Annualized Returns</span>
                    <span className="comm-head-2 ">
                      <span id="annualizedReturn">9</span>%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="calc-footer">
              <div className="f-row f-2 f-640-1">
                <div className="f-col"></div>
                <div className="f-col">
                  <div className="calc-footer-right">
                    <div className="svg-anim">
                      <svg
                        width={170}
                        height={110}
                        viewBox="0 0 184 139"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M172.209 86.5834C153.825 104.789 121.813 129.195 98.2474 113.319C68.7899 93.4735 86.626 51.5057 99.5428 33.9353C109.615 20.2339 121.89 31.8507 107.146 70.7283C92.4023 109.606 32.6833 122.582 10.3321 54.2593"
                          stroke="#2B2B2B"
                          strokeWidth={2}
                          className="svg-elem-1"
                        />
                        <path
                          d="M162.5 86.5H172V96"
                          stroke="#2B2B2B"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="svg-elem-2"
                        />
                      </svg>
                    </div>
                    <a href="#" className="button">
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Know Your Slice of Returns END */}

      {/* super-smooth investments START */}
      <section className="comm-section nblue-bg super-smooth-section">
        {/* <div className="container"> */}
        <div className="comm-center-head">
          <h2 className="comm-head-2 white">
            A frictionless app for making <br /> super - smooth investments
          </h2>
        </div>
        <Swiper
          className="invest-swiper invest-swiper"
          effect="coverflow"
          slidesPerView={1}
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={1500}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 70,
            modifier: 2,
            slideShadows: true,
          }}
          // keyboard={{
          //   enabled: true,
          // }}
          breakpoints={{
            400: {
              slidesPerView: 1.1,
            },

            480: {
              slidesPerView: 1.2,
            },
            640: {
              slidesPerView: 1.9,
            },
            768: {
              slidesPerView: 2.8,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 3.2,
            },
            1366: {
              slidesPerView: 3.7,
            },
            1440: {
              slidesPerView: 3.5,
            },
            1600: {
              slidesPerView: 3.8,
            },
            1680: {
              slidesPerView: 4.2,
            },
            1700: {
              slidesPerView: 5,
            },
          }}
          modules={[EffectCoverflow, Autoplay, Controller]}
          onSwiper={setFirstSwiper}
          controller={{ control: secondSwiper }}>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-5.png`}
                alt="Dashboard"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-2.png`}
                alt="Portfolio"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-4.png`}
                alt="Explore Investments"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-3.png`}
                alt="Referral & Rewards"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-1.png`}
                alt=""
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-5.png`}
                alt="Dashboard"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-2.png`}
                alt="Portfolio"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-4.png`}
                alt="Explore Investments"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-3.png`}
                alt="Referral & Rewards"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-1.png`}
                alt=""
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-5.png`}
                alt="Dashboard"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-2.png`}
                alt="Portfolio"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-4.png`}
                alt="Explore Investments"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-3.png`}
                alt="Referral & Rewards"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-app-img">
              <img
                src={`${REACT_APP_ASSET_URL}/index/invest-1.png`}
                alt=""
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <Swiper
          spaceBetween={25}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          // autoplay={{
          //   delay: 2000,
          //   disableOnInteraction: false,
          // }}
          className="invest-swiper investTextSwiper"
          breakpoints={{
            400: {
              slidesPerView: 1.1,
            },

            480: {
              slidesPerView: 1.2,
            },
            640: {
              slidesPerView: 1.9,
            },
            768: {
              slidesPerView: 2.8,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 3.2,
            },
            1366: {
              slidesPerView: 3.7,
            },
            1440: {
              slidesPerView: 3.5,
            },
            1600: {
              slidesPerView: 3.8,
            },
            1680: {
              slidesPerView: 4.2,
            },
            1700: {
              slidesPerView: 4.6,
            },
          }}
          modules={[Autoplay, Controller]}
          effect="fade"
          onSwiper={setSecondSwiper}
          controller={{ control: firstSwiper }}>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Dashboard</h3>
              <p className="comm-body-large white">
                Get access to your wallet balance, portfolio snapshot, special
                offers, and great learning content.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Portfolio</h3>
              <p className="comm-body-large white">
                You have full control of your investments. Get to know the
                subscription status &amp; returns earned. Transact from your own
                property passport
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Explore Investments</h3>
              <p className="comm-body-large white">
                Choose from a curated list of most attractive investment
                opportunities.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Referral & Rewards</h3>
              <p className="comm-body-large white">
                Earn cash backs, discounts, and loyalty bonuses through the
                Slice refer &amp; reward program.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Learn to Invest</h3>
              <p className="comm-body-large white">
                Start Your Slice Experience and Learn all about Real Estate
                Investment
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Dashboard</h3>
              <p className="comm-body-large white">
                Get access to your wallet balance, portfolio snapshot, special
                offers, and great learning content.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Portfolio</h3>
              <p className="comm-body-large white">
                You have full control of your investments. Get to know the
                subscription status &amp; returns earned. Transact from your own
                property passport
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Explore Investments</h3>
              <p className="comm-body-large white">
                Choose from a curated list of most attractive investment
                opportunities.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Referral & Rewards</h3>
              <p className="comm-body-large white">
                Earn cash backs, discounts, and loyalty bonuses through the
                Slice refer &amp; reward program.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Learn to Invest</h3>
              <p className="comm-body-large white">
                Start Your Slice Experience and Learn all about Real Estate
                Investment
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Dashboard</h3>
              <p className="comm-body-large white">
                Get access to your wallet balance, portfolio snapshot, special
                offers, and great learning content.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Portfolio</h3>
              <p className="comm-body-large white">
                You have full control of your investments. Get to know the
                subscription status &amp; returns earned. Transact from your own
                property passport
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Explore Investments</h3>
              <p className="comm-body-large white">
                Choose from a curated list of most attractive investment
                opportunities.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Referral & Rewards</h3>
              <p className="comm-body-large white">
                Earn cash backs, discounts, and loyalty bonuses through the
                Slice refer &amp; reward program.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="invest-img-box">
              <h3 className="comm-head-4 white">Learn to Invest</h3>
              <p className="comm-body-large white">
                Start Your Slice Experience and Learn all about Real Estate
                Investment
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* </div> */}
      </section>
      {/* super-smooth investments END */}

      {/* Real Deal Of Real Estate START */}
      <section className="comm-section">
        <div className="container">
          <div className="comm-center-head">
            <h2 className="comm-head-2">Real Deal Of Real Estate</h2>
          </div>
          <div className="section-body table-responsive">
            <div className="table-wrap active">
              <div className="table-row table-row-1">
                <div className="table-col table-col-1">
                  <div className="asset-box">
                    <h3 className="comm-head-5">Asset Class</h3>
                    <p className="comm-head-6">
                      Average Annual Return <br />
                      <span className="grey">Based on 20 year CAGR</span>
                    </p>
                  </div>
                </div>
                <div className="table-col table-col-2">
                  <div className="table-head">
                    <p className="table-title">Stocks</p>
                    <h2 className="table-data">8.91%</h2>
                  </div>
                  <div className="table-head">
                    <p className="table-title">Bonds</p>
                    <h2 className="table-data">6.02%</h2>
                  </div>
                  <div className="table-head">
                    <p className="table-title">Gold</p>
                    <h2 className="table-data">9.65%</h2>
                  </div>
                </div>
              </div>
              <div className="table-row table-row-2">
                <div className="table-col table-col-3">
                  <div className="re-box">
                    <ul className="asset-list">
                      <li>
                        <span className="comm-head-6">Regular cashflow</span>
                      </li>
                      <li>
                        <span className="comm-head-6">
                          Capital Appreciation
                        </span>
                      </li>
                      <li>
                        <span className="comm-head-6">Low Volatility</span>
                      </li>
                      <li>
                        <span className="comm-head-6">Inflation Hedge</span>
                      </li>
                      <li>
                        <span className="comm-head-6">Recession Hedge</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="table-col table-col-4">
                  <div className="table-body-wrap">
                    <div className="table-body">
                      <ul className="asset-list">
                        <li>
                          <span className="icon cross">
                            <span className="icon-cross" />
                          </span>
                        </li>
                        <li>
                          <span className="icon text high">High</span>
                        </li>
                        <li>
                          <span className="icon cross">
                            <span className="icon-cross" />
                          </span>
                        </li>
                        <li>
                          <span className="icon cross">
                            <span className="icon-cross" />
                          </span>
                        </li>
                        <li>
                          <span className="icon cross">
                            <span className="icon-cross" />
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="table-body">
                      <ul className="asset-list">
                        <li>
                          <span className="icon cross">
                            <span className="icon-cross" />
                          </span>
                        </li>
                        <li>
                          <span className="icon text">Medium</span>
                        </li>
                        <li>
                          <span className="icon tick">
                            <span className="icon-tick" />
                          </span>
                        </li>
                        <li>
                          <span className="icon cross">
                            <span className="icon-cross" />
                          </span>
                        </li>
                        <li>
                          <span className="icon tick">
                            <span className="icon-tick" />
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="table-body">
                      <ul className="asset-list">
                        <li>
                          <span className="icon cross">
                            <span className="icon-cross" />
                          </span>
                        </li>
                        <li>
                          <span className="icon text">Medium</span>
                        </li>
                        <li>
                          <span className="icon tick">
                            <span className="icon-tick" />
                          </span>
                        </li>
                        <li>
                          <span className="icon tick">
                            <span className="icon-tick" />
                          </span>
                        </li>
                        <li>
                          <span className="icon tick">
                            <span className="icon-tick" />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-row table-row-3">
                <div className="table-col table-col-5">
                  <div className="table-head">
                    <p className="table-title">Real Estate</p>
                    <h2 className="table-data">11.72%</h2>
                  </div>
                  <div className="table-body">
                    <ul className="asset-list">
                      <li>
                        <span className="icon tick">
                          <span className="icon-tick" />
                        </span>
                      </li>
                      <li>
                        <span className="icon text high">High</span>
                      </li>
                      <li>
                        <span className="icon tick">
                          <span className="icon-tick" />
                        </span>
                      </li>
                      <li>
                        <span className="icon tick">
                          <span className="icon-tick" />
                        </span>
                      </li>
                      <li>
                        <span className="icon tick">
                          <span className="icon-tick" />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Real Deal Of Real Estate END */}

      {/* Happy To SLICE START */}
      <section className="comm-section client-section">
        <div className="container">
          <div className="f-row">
            <div className=" w-1200-40 w-990-100">
              <div className="section-header client-header">
                <h2 className="comm-head-2">Happy To Slice</h2>
                <p className="comm-body-large">
                  Customers are happily investing with Slice
                </p>
              </div>
            </div>
            <div className="w70 w-1200-60 w-990-100">
              <Swiper
                className="client-swiper clientSwiper"
                effect="coverflow"
                slidesPerView={1}
                spaceBetween={0}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                speed={1500}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  // depth: 450,
                  depth: 200,
                  modifier: 2,
                  slideShadows: false,
                }}
                keyboard={{
                  enabled: true,
                }}
                breakpoints={{
                  390: { slidesPerView: 1 },
                  480: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  1200: { slidesPerView: 2.7 },
                  1280: { slidesPerView: 3 },
                }}
                modules={[Navigation, EffectCoverflow, Autoplay, Controller]}
                navigation={{
                  prevEl: ".clientSwiperPrev",
                  nextEl: ".clientSwiperNext",
                  clickable: true,
                }}
                onSwiper={setFirstClientSwiper}
                controller={{ control: secondClientSwiper }}>
                <SwiperSlide>
                  <div className="client-wrap founder-wrap">
                    <div className="founder-box-wrap">
                      <div className="founder-box">
                        <img
                          src={`${REACT_APP_ASSET_URL}/index/t2-brooke-anderson_BNK63KLO.jpg`}
                          alt="Brooke Anderson"
                          width="100%"
                          height="100%"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-wrap founder-wrap">
                    <div className="founder-box-wrap">
                      <div className="founder-box">
                        <img
                          src={`${REACT_APP_ASSET_URL}/index/t8-vishal-saini_HkzJM6ml.jpg`}
                          alt="Vishal Saini"
                          width="100%"
                          height="100%"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-wrap founder-wrap">
                    <div className="founder-box-wrap">
                      <div className="founder-box">
                        <img
                          src={`${REACT_APP_ASSET_URL}/index/t5-james-henderson_ptOiR6mv.jpg`}
                          alt="James Henderson"
                          width="100%"
                          height="100%"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-wrap founder-wrap">
                    <div className="founder-box-wrap">
                      <div className="founder-box">
                        <img
                          src={`${REACT_APP_ASSET_URL}/index/t6-rizwan-riaz_fZufQQWa.jpg`}
                          alt="Rizwan Riaz"
                          width="100%"
                          height="100%"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-wrap founder-wrap">
                    <div className="founder-box-wrap">
                      <div className="founder-box">
                        <img
                          src={`${REACT_APP_ASSET_URL}/index/t7-stuart-branson_hopo6y8z.jpg`}
                          alt="Stuart Branson"
                          width="100%"
                          height="100%"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-wrap founder-wrap">
                    <div className="founder-box-wrap">
                      <div className="founder-box">
                        <img
                          src={`${REACT_APP_ASSET_URL}/index/t10-hal-luscombe_j0r20OcX.jpg`}
                          alt="Hal Luscombe"
                          width="100%"
                          height="100%"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-wrap founder-wrap">
                    <div className="founder-box-wrap">
                      <div className="founder-box">
                        <img
                          src={`${REACT_APP_ASSET_URL}/index/t3-camelia-olteanu_CTr7pCSg.jpg`}
                          alt="Camelia Olteanu"
                          width="100%"
                          height="100%"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-wrap founder-wrap">
                    <div className="founder-box-wrap">
                      <div className="founder-box">
                        <img
                          src={`${REACT_APP_ASSET_URL}/index/t1-alex-popovici_kvMFtBKU.jpg`}
                          alt="Alex Popovici"
                          width="100%"
                          height="100%"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-wrap founder-wrap">
                    <div className="founder-box-wrap">
                      <div className="founder-box">
                        <img
                          src={`${REACT_APP_ASSET_URL}/index/t4-clifford-de-souza_a2RKirVN.jpg`}
                          alt="Clifford de Souza"
                          width="100%"
                          height="100%"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-wrap founder-wrap">
                    <div className="founder-box-wrap">
                      <div className="founder-box">
                        <img
                          src={`${REACT_APP_ASSET_URL}/index/t9-zaw-min-htun-1_2EBpQGLK.jpg`}
                          alt="Zaw Min Htun"
                          width="100%"
                          height="100%"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              <Swiper
                spaceBetween={25}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                // autoplay={{
                //   delay: 2000,
                //   disableOnInteraction: false,
                // }}
                className="client-text-swiper clientTextSwiper"
                breakpoints={{
                  390: { slidesPerView: 1 },
                  480: {
                    slidesPerView: 1,
                  },
                  640: { slidesPerView: 2 },
                  1200: { slidesPerView: 2.7 },
                  1280: { slidesPerView: 3 },
                }}
                modules={[Autoplay, Controller]}
                effect="fade"
                onSwiper={setSecondClientSwiper}
                controller={{ control: firstClientSwiper }}>
                <SwiperSlide>
                  <div className="client-text">
                    <div className="rating">
                      <img
                        src={`${REACT_APP_ASSET_URL}/index/rating.svg`}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                    <p className="comm-body">
                      The Slice real estate app in Dubai is a shining example of
                      transparency and seamlessness. It provides a clear window
                      into the real estate market and offers an incredibly
                      smooth user experience. Investing has never been this
                      straightforward, and I couldn't be happier with Slice!
                    </p>
                    <h2 className="comm-head-5 mb5">Brooke Anderson</h2>
                    <p className="comm-country">New Zealand</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-text">
                    <div className="rating">
                      <img
                        src={`${REACT_APP_ASSET_URL}/index/rating.svg`}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                    <p className="comm-body">
                      Slice is a fantastic way to invest in real estate. The app
                      is incredibly easy to use with a very neat and
                      user-friendly interface that makes it simple to find and
                      invest in properties that suit my needs.
                    </p>
                    <h2 className="comm-head-5 mb5">Vishal Saini</h2>
                    <p className="comm-country">India</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-text">
                    <div className="rating">
                      <img
                        src={`${REACT_APP_ASSET_URL}/index/rating.svg`}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                    <p className="comm-body">
                      I'm absolutely thrilled with Slice – it's a phenomenal
                      avenue for real estate investment. The app's sheer
                      simplicity, coupled with its impeccably organized and
                      user- friendly interface, effortlessly guides me to
                      discover and invest in properties that perfectly align
                      with my requirements. It's an outstanding experience!
                    </p>
                    <h2 className="comm-head-5 mb5">James Henderson</h2>
                    <p className="comm-country">Republic of South Africa</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-text">
                    <div className="rating">
                      <img
                        src={`${REACT_APP_ASSET_URL}/index/rating.svg`}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                    <p className="comm-body">
                      Slice App is perfectly designed keeping all kinds of
                      investors in mind. The concise information and ease of use
                      really make the investment process smooth.
                    </p>
                    <h2 className="comm-head-5 mb5">Rizwan Riaz</h2>
                    <p className="comm-country">Dubai</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-text">
                    <div className="rating">
                      <img
                        src={`${REACT_APP_ASSET_URL}/index/rating.svg`}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                    <p className="comm-body">
                      I am thrilled with the Slice real estate app! Its
                      user-friendly interface makes real estate investment a
                      breeze. I can easily choose and invest in property slices,
                      and I'm excited to watch my portfolio grow with Slice.
                      It's a game-changer!
                    </p>
                    <h2 className="comm-head-5 mb5">Stuart Branson</h2>
                    <p className="comm-country">United Kingdom</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-text">
                    <div className="rating">
                      <img
                        src={`${REACT_APP_ASSET_URL}/index/rating.svg`}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                    <p className="comm-body">
                      The Slice real estate app is the epitome of a
                      frictionless, cool, and seamless experience. It simplifies
                      the complex world of real estate investing and offers an
                      effortless journey from start to finish. If you want an
                      app that combines style with substance, look no further –
                      Slice has it all!
                    </p>
                    <h2 className="comm-head-5 mb5">Hal Luscombe</h2>
                    <p className="comm-country">Republic of South Africa</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-text">
                    <div className="rating">
                      <img
                        src={`${REACT_APP_ASSET_URL}/index/rating.svg`}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                    <p className="comm-body">
                      The Slice app in Dubai is a real estate revolution. It's
                      thrilling, user-friendly, and effortlessly simplifies
                      property investment in Dubai. Navigating the market is now
                      a breeze, thanks to its unique blend of simplicity and
                      excitement.
                    </p>
                    <h2 className="comm-head-5 mb5">Camelia Olteanu</h2>
                    <p className="comm-country">Luxembourg</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-text">
                    <div className="rating">
                      <img
                        src={`${REACT_APP_ASSET_URL}/index/rating.svg`}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                    <p className="comm-body">
                      The Slice app has revolutionized my real estate
                      investments. It's incredibly user-friendly, making the
                      entire process seamless. With a few clicks, I explore
                      diverse properties without traditional hassles. Slice
                      simplifies my investment journey, and I couldn't be
                      happier. It's a paradigm shift!
                    </p>
                    <h2 className="comm-head-5 mb5">Alex Popovici</h2>
                    <p className="comm-country">Romania</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-text">
                    <div className="rating">
                      <img
                        src={`${REACT_APP_ASSET_URL}/index/rating.svg`}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                    <p className="comm-body">
                      Investing in real estate has always been on my mind,
                      especially in Dubai. With Slice's intuitive app interface,
                      I absolutely love the digital approach it helps me with
                      while letting me pick and choose slices of real estate I
                      want to invest in. Looking forward to growing my portfolio
                      with Slice.
                    </p>
                    <h2 className="comm-head-5 mb5">Clifford de Souza</h2>
                    <p className="comm-country">Dubai</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="client-text">
                    <div className="rating">
                      <img
                        src={`${REACT_APP_ASSET_URL}/index/rating.svg`}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="lazy"
                      />
                    </div>
                    <p className="comm-body">
                      The Slice app in Dubai is a game-changer for real estate
                      enthusiasts. It's not only user-friendly and cool but also
                      incredibly transparent and educational. It feels like
                      having a mentor in your pocket, providing a fresh
                      perspective on Dubai's real estate scene. I'm thoroughly
                      impressed with the results.
                    </p>
                    <h2 className="comm-head-5 mb5">Zaw Min Htun</h2>
                    <p className="comm-country">Qatar</p>
                  </div>
                </SwiperSlide>
              </Swiper>

              <div className="client-swiper-btn client-swiper-btn-mob">
                <div className="swiper-nav swiper-prev clientSwiperPrev">
                  <span className="icon-arrow-left" />
                </div>
                <div className="swiper-nav swiper-next clientSwiperNext">
                  <span className="icon-arrow-left" />
                </div>
              </div>
            </div>
          </div>
          <div className="client-wrapper">
            <div className="box-element">
              <img
                src={`${REACT_APP_ASSET_URL}/box-elem.svg`}
                alt=""
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
            <div className="stairs-element">
              <img
                src={`${REACT_APP_ASSET_URL}/stair-elem.svg`}
                alt=""
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
            <div className="star-element">
              <img
                src={`${REACT_APP_ASSET_URL}/star-elem.svg`}
                alt=""
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </div>
          <div className="client-swiper-btn client-swiper-btn-web">
            <div className="swiper-nav swiper-prev clientSwiperPrev">
              <span className="icon-arrow-left" />
            </div>
            <div className="swiper-nav swiper-next clientSwiperNext">
              <span className="icon-arrow-left" />
            </div>
          </div>
        </div>
      </section>
      {/* Happy To SLICE END */}

      {/* The Slice Ambassadors START */}
      <section className="comm-section black-bg">
        <div className="container change-cursor">
          <div className="comm-center-head change-cursor">
            <h2 className="comm-head-2 white change-cursor">
              The Slice Ambassadors
            </h2>
            <p className="hero-content white change-cursor">
              Learn from our ambassadors and make informed investments to earn
              high returns
            </p>
          </div>
          <div className="section-body change-cursor">
            <Swiper
              spaceBetween={25}
              modules={[Navigation]}
              navigation={{
                prevEl: ".mentorSwiperPrev",
                nextEl: ".mentorSwiperNext",
                clickable: true,
              }}
              speed={1500}
              className="mentorSwiper mentor-swiper swiper"
              breakpoints={{
                390: {
                  slidesPerView: 1,
                },
                576: {
                  slidesPerView: 2,
                },
                768: {
                  spaceBetween: 24,
                  slidesPerView: 2.5,
                },
                1024: {
                  spaceBetween: 38,
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}>
              {ambData.map((item) => (
                <SwiperSlide key={item._id}>
                  <AmbCard
                    imgSrc={item.image}
                    ambName={item.name}
                    intro={item.bio}></AmbCard>
                </SwiperSlide>
              ))}
              <div className="swiper-nav swiper-prev mentorSwiperPrev">
                <span className="icon-arrow-left"></span>
              </div>
              <div className="swiper-nav swiper-next mentorSwiperNext">
                <span className="icon-arrow-left"></span>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
      {/* The Slice Ambassadors END */}

      {/* Blog START */}
      <section className="comm-section blog-section">
        <div className="container">
          <div className="comm-center-head">
            <h2 className="comm-head-2">Learn</h2>
            <p className="hero-content">
              Get to know the latest on Real Estate and Invest better
            </p>
          </div>
          <div className="section-body">
            <div className="f-row f-2 f-990-1">
              {blogData.slice(0, 2).map((ele, i) => (
                <div className="f-col" key={i}>
                  <LearnBlog
                    title={blogData[i].title}
                    bloglink={blogData[i]._id}
                    img={blogData[i].webImage}
                    category={blogData[i].tag}
                    time={blogData[i].readingTime}
                    content={blogData[i].content}
                    datecode={blogData[i].created}
                  />
                </div>
              ))}
            </div>
            <div className="btn-center">
              <Link
                to="/blog"
                className="button"
                onClick={() => handleLinkClick()}>
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Blog END */}

      {/* Get Slice and Get Going Starts */}
      <GetSliceCard />
      {/* Get Slice and Get Going Ends */}
    </main>
  );
};

export default HomePage;

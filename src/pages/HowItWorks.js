import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

/* plugin */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Observer } from "gsap/all";
import "@dotlottie/player-component";
/* plugin end */

/* Component */
import GetSliceCard from "../components/GetSliceCard";
import SliceAdBox from "../components/SliceAdBox";
import FaqAccordComp from "../components/FaqAccordComp";
import SLICEADBOX_DATA from "../components/data/SliceAdBoxData";
import { headersConfig } from "../config/constants";
import gs from "../service/global";
import mainContext from "../config/mainContext";
/* Component End*/

const { REACT_APP_ASSET_URL } = process.env;

const HowItWorks = () => {
  const mainObj = useContext(mainContext);
  const [faqDetail, setFaqDetail] = useState([]);
  // console.log(mainObj?.apiLoad);

  var faqArr = [];
  /* FAQ Api */
  const getFaqDetail = () => {
    axios
      .get(
        `/main/slice/api/v1/user/static/content?limit=10&pageNo=1&type=SLICE_FAQ`,
        {
          headers: {
            ...headersConfig,
            Authorization: `Bearer ${mainObj?.appToken}`,
          },
        }
      )
      .then((response) => {
        const result = response?.data?.data;
        // console.log(result[0].FAQ);
        setFaqDetail(result[0].FAQ);
        // if (result.length > 0) {
        //   result.forEach((item) => {
        //     item.FAQ.forEach((qnaItem) => {
        //       faqArr.push(qnaItem);
        //     });
        //   });
        //   setFaqDetail(faqArr);
        // }

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
  /* FAQ Api end */

  let currentIndex = -1;
  let animating;
  let swipePanels = gsap.utils.toArray(".hiw-container .hiwTriger");

  gsap.set(swipePanels, {
    zIndex: (i) => i,
  });

  let intentObserver = ScrollTrigger.observe({
    target: window,
    type: "wheel,touch,scroll,pointer",
    onUp: () => !animating && gotoPanel(currentIndex + 1, true),
    onDown: () => !animating && gotoPanel(currentIndex - 1, false),
    wheelSpeed: 1,
    tolerance: 5,
    preventDefault: true,
    /*  onPress: (self) => {
      ScrollTrigger.isTouch && self.event.preventDefault();
    }, */
  });
  intentObserver.disable();

  function gotoPanel(index, isScrollingDown) {
    animating = true;
    // return to normal scroll if we're at the end or back up to the start
    if (
      (index === swipePanels.length && isScrollingDown) ||
      (index === -1 && !isScrollingDown)
    ) {
      let target = index;
      gsap.to(target, {
        // xPercent: isScrollingDown ? -100 : 0,
        duration: 0.0,
        onComplete: () => {
          animating = false;
          isScrollingDown && intentObserver.disable();
        },
      });
      return;
    }

    //   target the second panel, last panel?
    let target = isScrollingDown
      ? swipePanels[index]
      : swipePanels[currentIndex];

    gsap.to(target, {
      yPercent: isScrollingDown ? 0 : 500,
      duration: 0.3,
      onComplete: () => {
        animating = false;
      },
    });
    currentIndex = index;
    console.log(index);
  }
  /*   ScrollTrigger.create({
    trigger: ".hiw-container",
    start: "top top",
    end: "+=1",
    markers: true,
    onEnter: (self) => {
      intentObserver.enable();
      gotoPanel(currentIndex + 1, true);
    },
    onEnterBack: () => {
      intentObserver.enable();
      gotoPanel(currentIndex - 1, false);
    },
  }); */

  var tl4;
  const howGsap = () => {
    var tl0 = gsap.timeline({
      scrollTrigger: {
        trigger: ".hiw-1",
        start: "top 20%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        // markers: true,
        id: "0",
      },
    });

    tl0
      .from(
        ".hiw-illus-prop-3",
        {
          scale: 0,
          duration: 0.6,
          ease: "power2.in",
        },
        0
      )
      .to(
        ".hiw-illus-prop-3",
        {
          delay: 0.8,
          scale: 0,
          ease: "power2.in",
        },
        0
      );

    var tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".hiw-2",
        start: "top 40%",
        end: "top 40%",
        toggleActions: "play none none reverse",
        id: "1",
        preventOverlaps: true,
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
        ".hiw-text-1",
        {
          duration: 0.5,
          css: {
            opacity: 0,
            position: "absolute",
          },
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
            duration: 1.5,
            ease: "back.out(1.4)",
          },
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
        ".hiw-text-1",
        {
          duration: 0.5,
          css: {
            opacity: 0,
            position: "absolute",
          },
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
        ".hiw-illus-anim-bg-2",
        {
          css: {
            top: "0",
          },
        },
        0
      )
      .to(
        ".hiw-illus-anim-bg-1",
        {
          css: {
            top: "-100%",
          },
        },
        0
      )
      .to(
        ".hiw-illus-prop-3",
        {
          scale: 1,
          duration: 0.6,
          ease: "power2.in",
        },
        0
      )
      .to(
        ".hiw-illus-prop-3",
        {
          delay: 0.8,
          scale: 0,
          ease: "power2.in",
        },
        0
      )
      .from(
        ".hiw-illus-prop-2",
        {
          x: 0,
          scale: 1,
        },
        0
      )
      .to(
        ".hiw-illus-prop-2",
        {
          x: 40,
          scale: 0.8,
        },
        0
      )
      .from(
        ".hiw-illus-prop-1",
        {
          x: 0,
          scale: 1,
        },
        0
      )
      .to(
        ".hiw-illus-prop-1",
        {
          x: -40,
          scale: 0.8,
        },
        0
      )
      .to(
        ".hiw-illus-prop-cube",
        {
          scale: 0,
          opacity: 0,
        },
        0
      )
      .to(
        ".hiw-illus-prop-cube-2",
        {
          scale: 1,
          opacity: 1,
        },
        0
      );

    var tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".hiw-3",
        start: "top 40%",
        end: "top 40%",
        toggleActions: "play none none reverse",
        id: "2",
        // markers: true
        preventOverlaps: true,
      },
    });
    tl2
      .to(
        ".skewed-number",
        {
          rotateY: -720,
          duration: 1.5,
          ease: "back.out(1.4)",
        },
        0
      )
      .to(
        ".skewed-number-2",
        {
          duration: 0.01,
          delay: 0.4,
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
          duration: 0.01,
          delay: 0.4,
          css: {
            opacity: 1,
            position: "relative",
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
          },
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
            rotateY: -720,
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
        ".hiw-illus-anim-bg-3",
        {
          css: {
            top: "0",
          },
        },
        0
      )
      .to(
        ".hiw-illus-anim-bg-2",
        {
          css: {
            top: "-100%",
          },
        },
        0
      )
      .to(
        ".hiw-illus-prop-3",
        {
          scale: 1,
          duration: 0.6,
          ease: "power2.in",
        },
        0
      )
      .to(
        ".hiw-illus-prop-3",
        {
          delay: 0.8,
          scale: 0,
          ease: "power2.in",
        },
        0
      )
      .to(
        ".hiw-illus-prop-2",
        {
          x: 0,
          scale: 1,
        },
        0
      )
      .to(
        ".hiw-illus-prop-1",
        {
          x: 0,
          scale: 1,
        },
        0
      )

      .to(
        ".hiw-illus-prop-cube-2",
        {
          scale: 0,
          opacity: 0,
        },
        0
      )
      .to(
        ".hiw-illus-prop-cube-3",
        {
          scale: 1,
          opacity: 1,
        },
        0
      );

    var tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".hiw-4",
        start: "top 40%",
        end: "top 40%",
        // markers: true
        toggleActions: "play none none reverse",
        id: "3",
        preventOverlaps: true,
      },
    });

    tl3
      .to(
        ".skewed-number",
        {
          rotateY: -1080,
          duration: 1.5,
          ease: "back.out(1.4)",
        },
        0
      )
      .to(
        ".skewed-number-3",
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
        ".skewed-number-4",
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
        ".hiw-text-3",
        {
          duration: 0.5,
          css: {
            opacity: 0,
            position: "absolute",
          },
        },
        0
      )
      .to(
        ".hiw-text-4",
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
        ".skewed-bg",
        {
          duration: 1.5,
          ease: "back.out(1.4)",
          css: {
            background: "#EB7032",
            rotateY: -1080,
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
        ".hiw-illus-anim-bg-4",
        {
          css: {
            top: "0",
          },
        },
        0
      )
      .to(
        ".hiw-illus-anim-bg-3",
        {
          css: {
            top: "-100%",
          },
        },
        0
      )
      .to(
        ".hiw-illus-prop-3",
        {
          scale: 1,
          duration: 0.6,
          ease: "power2.in",
        },
        0
      )
      .to(
        ".hiw-illus-prop-3",
        {
          delay: 0.8,
          scale: 0,
          ease: "power2.in",
        },
        0
      )
      .to(
        ".hiw-illus-prop-2",
        {
          x: 40,
          scale: 0.8,
        },
        0
      )
      .to(
        ".hiw-illus-prop-1",
        {
          x: -40,
          scale: 0.8,
        },
        0
      )
      .to(
        ".hiw-illus-prop-cube-3",
        {
          scale: 0,
          opacity: 0,
        },
        0
      )
      .to(
        ".hiw-illus-prop-cube-4",
        {
          scale: 1,
          opacity: 1,
        },
        0
      );

    tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".hiw-5",
        start: "top 40%",
        end: "top 40%",
        // markers: true
        toggleActions: "play none none reverse",
        id: "4",

        preventOverlaps: true,
        onEnter: () => mobShowHide5(),
        onEnterBack: () => mobShowHideRev5(),
      },
    });

    function mobShowHide5() {
      document.querySelector(".hiw-illus-mob-4").classList.remove("active");
      document.querySelector(".hiw-illus-mob-5").classList.add("active");
    }

    function mobShowHideRev5() {
      document.querySelector(".hiw-illus-mob-4").classList.add("active");
      document.querySelector(".hiw-illus-mob-5").classList.remove("active");
    }

    tl4
      .to(
        ".skewed-number",
        {
          rotateY: -1440,
          duration: 1.5,
          ease: "back.out(1.4)",
        },
        0
      )
      .to(
        ".skewed-number-4",
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
        ".skewed-number-5",
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
        ".hiw-text-4",
        {
          duration: 0.5,
          css: {
            opacity: 0,
            position: "absolute",
          },
        },
        0
      )
      .to(
        ".hiw-text-5",
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
        ".skewed-bg",
        {
          duration: 1.5,
          ease: "back.out(1.4)",
          css: {
            background: "#FFBF17",
            rotateY: -1440,
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
        ".hiw-illus-anim-bg-5",
        {
          css: {
            top: "0",
          },
        },
        0
      )
      .to(
        ".hiw-illus-anim-bg-4",
        {
          css: {
            top: "-100%",
          },
        },
        0
      )
      .to(
        ".hiw-illus-prop-3",
        {
          scale: 1,
          duration: 0.6,
          ease: "power2.in",
        },
        0
      )
      .to(
        ".hiw-illus-prop-3",
        {
          delay: 0.8,
          scale: 0,
          ease: "power2.in",
        },
        0
      )
      .to(
        ".hiw-illus-prop-2",
        {
          x: 0,
          scale: 1,
        },
        0
      )
      .to(
        ".hiw-illus-prop-1",
        {
          x: 0,
          scale: 1,
        },
        0
      )

      .to(
        ".hiw-illus-prop-cube-4",
        {
          scale: 0,
          opacity: 0,
        },
        0
      )
      .to(
        ".hiw-illus-prop-cube-5",
        {
          scale: 1,
          opacity: 1,
        },
        0
      );
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(Observer);

    howGsap();
    if (mainObj?.apiLoad) {
      getFaqDetail();
    }

    return () => {
      tl4.kill();
    };
  }, [mainObj]);

  /* lottie change */
  const [selectedId, setSelectedId] = useState(1);

  function mobShowHide(i) {
    // console.log("Enter", i);
    setSelectedId(i);
  }

  function mobShowHideRev(i) {
    // console.log("Reverse", i);
    var currentId = i - 1;
    setSelectedId(currentId);
  }

  useEffect(() => {
    document.querySelectorAll(".hiw-illus-mob").forEach((element, i) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hiw-" + i,
          start: "top 40%",
          end: "top 40%",
          toggleActions: "play none none reverse",
          id: i,
          // markers: true,
          onEnter: () => mobShowHide(i),
          onEnterBack: () => mobShowHideRev(i),
        },
      });
    });
  }, []);
  /* lottie change end */

  return (
    <main className="main-container">
      {/* comm head starts */}
      <section className="internal-banner-section ">
        <div className="container">
          <div className="internal-banner-wrap">
            <div className="banner-img banner-img-left">
              <dotlottie-player
                autoPlay=""
                mode="normal"
                src={`${REACT_APP_ASSET_URL}/how-it-works/how_it_works_1.lottie`}></dotlottie-player>
            </div>
            <div className="banner-txt">
              <h1 className="comm-head-1">How It Works</h1>
              <p>
                Invest in real estate with 3 simple steps and start earning
                today
              </p>
            </div>
            <div className="banner-img banner-img-right">
              <dotlottie-player
                autoPlay=""
                mode="normal"
                src={`${REACT_APP_ASSET_URL}/how-it-works/how_it_works_2.lottie`}></dotlottie-player>
            </div>
          </div>
        </div>
      </section>
      {/* comm head starts ends*/}
      {/* how it works Starts */}
      <section className="comm-section pt0">
        <div className="container">
          <div className="hiw-container">
            <div className="hiwTriger hiw-1" />
            <div className="hiwTriger hiw-2" />
            <div className="hiwTriger hiw-3" />
            <div className="hiwTriger hiw-4" />
            <div className="hiwTriger hiw-5" />
            <div className="hiw-sticky">
              <div className="hiw-left">
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
                    <div className="skewed-number skewed-number-4">
                      <span>4</span>
                    </div>
                    <div className="skewed-number skewed-number-5">
                      <span>5</span>
                    </div>
                    <div className="skewed-bg" />
                  </div>
                </div>
                <div className="hiw-wrap">
                  <div className="hiw-text hiw-text-1">
                    <div className="hiw-text-desktop">
                      <h4 className="comm-head-3">Learn</h4>
                      <p>
                        Learn everything about investing in the real estate
                        market with Slice. Check our investment guide with the
                        latest news articles, blogs, and videos to learn
                        in-depth about the easiest investments.
                      </p>
                    </div>
                  </div>
                  <div className="hiw-text hiw-text-2">
                    <div className="hiw-text-desktop">
                      <h4 className="comm-head-3">Create Account</h4>
                      <p>
                        Opening a Slice account is easy! Just follow these three
                        simple steps, and you'll be all set to experience
                        investing the Slice way.
                      </p>
                    </div>
                  </div>
                  <div className="hiw-text hiw-text-3">
                    <div className="hiw-text-desktop">
                      <h4 className="comm-head-3">Browse Properties</h4>
                      <p>
                        Property experts at Slice curate investment
                        opportunities through a technology-driven selection
                        process. Choose the one which best suits your investment
                        needs.
                      </p>
                    </div>
                  </div>
                  <div className="hiw-text hiw-text-4">
                    <div className="hiw-text-desktop">
                      <h4 className="comm-head-3">Invest &amp; Earn</h4>
                      <p>
                        Fund your wallet and invest. Returns earned can be
                        withdrawn or can be used for reinvesting in newer and
                        multiple properties. Start from USD 100.
                      </p>
                    </div>
                  </div>
                  <div className="hiw-text hiw-text-5">
                    <div className="hiw-text-desktop">
                      <h4 className="comm-head-3">
                        Manage &amp; Grow Portfolio
                      </h4>
                      <p>
                        With an easy-to-use and minimal dashboard, you have
                        complete control over your investments and their growth.
                        Use the app to manage your portfolio whenever and
                        wherever you desire.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hiw-right">
                <div className="hiw-illus-prop-cube">
                  <img
                    src={`${REACT_APP_ASSET_URL}/how-it-works/prop-cube.png`}
                    alt=""
                  />
                </div>
                <div className="hiw-illus-prop-cube-2">
                  <img
                    src={`${REACT_APP_ASSET_URL}/how-it-works/prop-cube-2.png`}
                    alt=""
                  />
                </div>
                <div className="hiw-illus-prop-cube-3">
                  <img
                    src={`${REACT_APP_ASSET_URL}/how-it-works/prop-cube-3.png`}
                    alt=""
                  />
                </div>
                <div className="hiw-illus-prop-cube-4">
                  <img
                    src={`${REACT_APP_ASSET_URL}/how-it-works/prop-cube-4.png`}
                    alt=""
                  />
                </div>
                <div className="hiw-illus-prop-cube-5">
                  <img
                    src={`${REACT_APP_ASSET_URL}/how-it-works/prop-cube-5.png`}
                    alt=""
                  />
                </div>
                <div className="hiw-illus-wrap">
                  <div className="hiw-illus-anim-bg-5"></div>
                  <div className="hiw-illus-anim-bg-4"></div>
                  <div className="hiw-illus-anim-bg-3"></div>
                  <div className="hiw-illus-anim-bg-2"></div>
                  <div className="hiw-illus-anim-bg-1"></div>
                  <div className="hiw-illus-prop-1">
                    <img
                      src={`${REACT_APP_ASSET_URL}/how-it-works/hiw-prop-1.png`}
                      alt=""
                    />
                  </div>
                  <div className="hiw-illus-prop-2">
                    <img
                      src={`${REACT_APP_ASSET_URL}/how-it-works/hiw-prop-1.png`}
                      alt=""
                    />
                  </div>
                  <div className="hiw-illus-prop-3">
                    <img
                      src={`${REACT_APP_ASSET_URL}/how-it-works/prop-3.png`}
                      alt=""
                    />
                  </div>
                  <div className="hiw-illus-prop-4">
                    <img
                      src={`${REACT_APP_ASSET_URL}/how-it-works/prop-2.png`}
                      alt=""
                    />
                  </div>
                  <div className="hiw-illus-prop-5">
                    <img
                      src={`${REACT_APP_ASSET_URL}/how-it-works/prop-4.png`}
                      alt=""
                    />
                  </div>
                  <div className="hiw-illus-anim">
                    <div
                      className={`hiw-illus-mob ${
                        selectedId === 1 ? "active" : ""
                      }`}>
                      <dotlottie-player
                        autoPlay=""
                        loop=""
                        mode="normal"
                        src={`${REACT_APP_ASSET_URL}/how-it-works/learn.lottie`}></dotlottie-player>
                    </div>
                    <div
                      className={`hiw-illus-mob ${
                        selectedId === 2 ? "active" : ""
                      }`}>
                      <dotlottie-player
                        autoPlay=""
                        loop=""
                        mode="normal"
                        src={`${REACT_APP_ASSET_URL}/how-it-works/create-acc.lottie`}></dotlottie-player>
                    </div>
                    <div
                      className={`hiw-illus-mob ${
                        selectedId === 3 ? "active" : ""
                      }`}>
                      <dotlottie-player
                        autoPlay=""
                        loop=""
                        mode="normal"
                        src={`${REACT_APP_ASSET_URL}/how-it-works/browse.lottie`}></dotlottie-player>
                    </div>
                    <div
                      className={`hiw-illus-mob hiw-illus-mob-4 ${
                        selectedId === 4 ? "active" : ""
                      }`}>
                      <dotlottie-player
                        autoPlay=""
                        loop=""
                        mode="normal"
                        src={`${REACT_APP_ASSET_URL}/how-it-works/invest-earn.lottie`}></dotlottie-player>
                    </div>
                    <div
                      className={`hiw-illus-mob hiw-illus-mob-5 ${
                        selectedId === 5 ? "active" : ""
                      }`}>
                      <dotlottie-player
                        autoPlay=""
                        loop=""
                        mode="normal"
                        src={`${REACT_APP_ASSET_URL}/how-it-works/manage.lottie`}></dotlottie-player>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* how it works Ends */}
      {/* The Slice Advantage Starts */}
      <section className="comm-section black-bg change-cursor">
        <div className="container change-cursor">
          <div className="comm-center-head change-cursor">
            <h2 className="comm-head-2 white change-cursor">
              The Slice Advantage
            </h2>
          </div>
          <div className="slice-advantage-wrap change-cursor">
            <div className="f-row f-3 f-990-1 change-cursor">
              {SLICEADBOX_DATA.map((item, i) => (
                <div className="f-col change-cursor" key={i}>
                  <SliceAdBox
                    adBoxData={{
                      title: item.title,
                      para: item.para,
                      img: item.imgSrc,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* The Slice Advantage Ends */}
      {/* faq Starts */}
      <div className="comm-section">
        <div className="container">
          <div className="hiw-faq">
            <div className="comm-center-head">
              <h2 className="comm-head-2">FAQ's</h2>
            </div>
            <div className="faq-details-wrap-hiw">
              {faqDetail.slice(0, 5).map((item, i) => (
                <FaqAccordComp
                  title={item?.que}
                  description={item?.ans}
                  key={i}
                />
              ))}
            </div>
            <a href="./faq" className="button" type="button">
              View All FAQ's
            </a>
          </div>
        </div>
      </div>
      {/* faq ends */}
      {/* Get Slice and Get Going Starts */}
      <GetSliceCard />
      {/* Get Slice and Get Going Ends */}
    </main>
  );
};

export default HowItWorks;

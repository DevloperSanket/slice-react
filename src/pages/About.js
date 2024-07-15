import React, { useEffect, useRef } from "react";
import "@dotlottie/player-component";

/* plugin */
import "swiper/css";
import "swiper/css/effect-fade";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
/* plugin end */

/* Component */
import GetSliceCard from "../components/GetSliceCard";
import TeamCard from "../components/TeamCard";
import VisionCardComp from "../components/VisionCardComp";
import AboutCircleComp from "../components/AboutCircleComp";
import gs from "../service/global";
/* Component End*/

const { REACT_APP_ASSET_URL } = process.env;
gsap.registerPlugin(ScrollTrigger);

/* About Circle Data Starts*/
const aboutCircleData = [
  {
    id: 1,
    title: "Empowering Impact",
  },
  {
    id: 2,
    title: "Innovation with Integrity",
  },
  {
    id: 3,
    title: "Transparent and Trustworthy",
  },
];
/* About Circle Data Ends */

/* Founder data Starts */
const founderData = [
  {
    id: 1,
    fname: "AD",
    lname: "Singh",
    designation: "Chief Executive Officer",
    linkedin: "https://www.linkedin.com/in/ads7/",
    // img: "https://ik.imagekit.io/ctnsv7r1u/about/founder-1.png",
    img: "https://ik.imagekit.io/ctnsv7r1u/index/ad-singh_oNZN34cK.jpg",
    detail: `AD Singh has been a tech entrepreneur for over two decades, having successfully
    founded and led companies in consulting, product development, and mobility. His client
    base has included some of the world's largest corporations, such as HSBC, McKinsey,
    DHL, Saudi Aramco, Procter & Gamble, and many others. AD's academic background
    includes a degree in Finance from Boston University, where he first began his career in
    the tech industry. As the founder of Slice, AD is currently dedicated to assembling high-
    performance teams capable of delivering exceptional customer experiences and
    revolutionizing the real estate investment market. AD has received numerous industry
    accolades recognizing his innovative spirit and entrepreneurial accomplishments.`,
  },
  {
    id: 2,
    fname: "Keith",
    lname: "Fenner",
    designation: "Chief Growth Officer",
    linkedin: "https://www.linkedin.com/in/keithfenner/",
    img: "https://ik.imagekit.io/ctnsv7r1u/index/keith-fenner-new_PJLslBm0.jpg",
    detail: `Keith is a seasoned senior tech executive with a wealth of experience in successfully
    executing go-to-market strategies for public-listed tech companies. With over 30 years
    of experience, his expertise has led to over USD 2 billion in sales and the acquisition of
    more than 5 million users across 80 countries. Throughout his career, he has held
    several senior leadership and managing director positions at top companies, including
    Microsoft, Computer Associates, and Sage Group. Drawing on his extensive knowledge
    and experience, Keith is now using his skills to execute a successful go-to-market
    strategy for Slice, with the aim of acquiring 2 million users. He was also a part of the
    leadership team for a Tech Unicorn sale in 2021, which further highlights his acumen in
    the industry.
`,
  },
  {
    id: 3,
    fname: "Ojas",
    lname: "Desai",
    designation: "Director Investments",
    linkedin: "https://www.linkedin.com/in/ojasdesai/",
    img: "https://ik.imagekit.io/ctnsv7r1u/index/ojas-desai_OViWDytJ.jpg",
    // logo: "https://ik.imagekit.io/ctnsv7r1u/dummy-logo.png",
    detail: `Ojas, a seasoned real estate professional with two decades of experience in
Australia and India. His mission: maximize investor returns and democratize real
estate and financial growth for all. Educated in Finance Real Estate and
Architecture, Ojas began in Australian real estate investment banking. His
diverse work spans affordable housing to luxury projects, blending financial
acumen and creative insight. He excels in analyzing metrics, evaluating growth
factors, and grasping market dynamics. At Slice, Ojas combines his real estate
expertise with fintech innovation. As a passionate architectural designer, he
infuses design thinking into tech, processes, and operations. His holistic
approach aims to revolutionize real estate investment with innovation,
inclusivity, and market savvy.`,
  },
];

const advisioryData = [
  {
    id: 1,
    fname: "Paul",
    lname: "Grewal",
    linkedin: "https://www.linkedin.com/in/paul-grewal-288978b4/",
    img: "https://ik.imagekit.io/ctnsv7r1u/index/paul-grewal_0V1mdu9p.jpg",
    // logo: "https://ik.imagekit.io/ctnsv7r1u/dummy-logo.png",
    detail: `As the Chief Legal Officer of Coinbase Global, Inc., Paul Grewal oversees the legal,
    compliance, global intelligence, risk management, and government relations groups for
    the platform that enables more than 100 million individuals in over 100 countries to
    buy, sell, store, use, and earn cryptocurrency. Before joining Coinbase in August 2020,
    Paul held the position of Vice President and Deputy General Counsel at Facebook. Prior
    to this, he served as a United States Magistrate Judge for the Northern District of
    California, presiding over a range of legal matters. With his experience as a partner at
    Howrey LLP, Paul has tried cases across various locations in the United States, from
    Marshall, Texas, to Wilmington, Delaware, and has argued before several United States
    appellate courts. Paul obtained his JD from the University of Chicago Law School and his
    SB from the Massachusetts Institute of Technology and is highly regarded for his legal
    expertise and leadership in the tech industry.`,
  },
  {
    id: 2,
    fname: "Alan Rosling",
    linkedin: "https://www.linkedin.com/in/alan-rosling-6915a45/",
    img: "https://ik.imagekit.io/ctnsv7r1u/index/alan-rosling_4OpuwKdu.jpg",
    // logo: "https://ik.imagekit.io/ctnsv7r1u/dummy-logo.png",
    detail: `Alan is the Chairman of Azure Power (NYSE AZRE), a leading renewable energy. He also
    serves as a Senior Advisor to Navam Capital and advises several early-stage companies,
    including Vyome Therapeutics and Insolight. During his five-year tenure as an Executive
    Director of Tata Sons Limited, starting from 2004, Alan was responsible for the
    internationalization of the Tata Group. He also served as the Chairman of the Jardine
    Matheson Group in India from 1998 to 2003. Alan's early career included working for
    the Policy Unit at No.10 Downing Street, serving as the Strategy Director at United
    Distillers, and as the CEO of a division of Courtaulds Textiles and S.G. Warburg. Alan is a
    graduate of Cambridge University and the Harvard Business School. He is also a Charter
    Member of TiE and a director of TiE Hong Kong. His first book, "Boom Country? The New
    Wave of Indian Enterprise," was published by Hachette in 2017, further highlighting his
    insights into the Indian enterprise sector.`,
  },

  {
    id: 3,
    fname: "Jeremy Korer",
    linkedin: "https://www.linkedin.com/in/jeremy-korer-78a9399/",
    img: "https://ik.imagekit.io/ctnsv7r1u/index/jeremy-korer_mg89nJGU.jpg",
    detail: `With more than 22 years of experience in the real estate industry, Jeremy is a highly
    skilled executive with a track record of successfully transacted over USD 14 billion in real
    estate transactions. His expertise lies in selecting and curating the most promising real
    estate equity, debt, and structured deals. Throughout his career, he has held several
    senior-level positions, including Managing Director roles at Cusham Wakefield USA,
    Cooper-Horowitz, and Meridien Capital. Jeremy has led some of the industry's largest
    transactions, including The Drake Hotel, Trump International Hotel Chicago, The Trump
    International Las Vegas, and The Z Hotel, each valued at over USD 1 billion. At Slice,
    Jeremy has created and implemented a property curation model and algorithm for retail
    investors, while also leading the company's real estate teams.
`,
  },
];
/* Founder data Ends */

/* Vision Data Starts */
const visionData = [
  {
    id: 1,
    logo: "https://ik.imagekit.io/ctnsv7r1u/about/mission-1.svg",
    heading: "Purpose",
    detail:
      "Provide capital appreciation & cash flow opportunities to users excluded from the real estate economy.",
    color: "",
  },
  {
    id: 2,
    logo: "https://ik.imagekit.io/ctnsv7r1u/about/mission-2.svg",
    heading: "Mission",
    detail:
      "Democratize Real Estate Investment in a simple, transparent & digitally- enabled experience.",
    color: "green",
  },
  {
    id: 3,
    logo: "https://ik.imagekit.io/ctnsv7r1u/about/mission-3.svg",
    heading: "Vision",
    detail:
      "Our vision is to be the most beloved real estate investment super app, making real estate investment easy and affordable for millions.",
    color: "nblue white",
  },
];
/* Vision Data Ends */

const About = () => {
  const promiseCircle = useRef(null);
  const promiseWrap = useRef(null);

  /* slider code */
  const handleSlideChange = (swiper) => {
    // console.log(swiper.activeIndex);
    const gridList = document.querySelectorAll(".comm-slide-list li");
    gridList.forEach((para) => para.classList.remove("active"));
    document.querySelector(`.st-${swiper.activeIndex}`).classList.add("active");
  };

  const swiperRef = useRef(null);

  const handleButtonClick = (slideIndex) => {
    // console.log(swiperRef.current);
    if (swiperRef.current) {
      swiperRef.current?.swiper.slideTo(slideIndex);
    }
  };
  /* slider code end */

  useEffect(() => {
    /* Loader Starts */
    gs.showLoader(true);
    /* Loader Ends */

    /* Box Hover Effect  Start */
    document.querySelectorAll(".card-wrap").forEach(function (cardWrap) {
      cardWrap.addEventListener("mousemove", function (e) {
        e.preventDefault();
        var cox = (e.pageX - this.offsetLeft - this.offsetWidth / 2) / 20;
        var coy = (this.offsetHeight / 2 - (e.pageY - this.offsetTop)) / 20;

        this.querySelectorAll(".card-box-wrap").forEach(function (
          boxWrap,
          index
        ) {
          boxWrap.style.transform =
            "rotateY(" + cox + "deg) rotateX(" + coy + "deg)";
        });

        this.querySelectorAll(".card-box").forEach(function (box, index) {
          box.style.transform =
            "translateX(" + cox + "px) translateY(" + -coy + "px)";
        });
      });

      cardWrap.addEventListener("mouseleave", function (e) {
        e.preventDefault();

        this.querySelectorAll(".card-box-wrap").forEach(function (
          boxWrap,
          index
        ) {
          boxWrap.style.transform = "rotateY(0) rotateX(0)";
        });

        this.querySelectorAll(".card-box").forEach(function (box, index) {
          box.style.transform = "translateX(0) translateY(0)";
        });
      });
    });
    /* Box Hover Effect  end */

    /* The Slice Promise  starts */
    if (window.innerWidth > 990) {
      var i = 1;
      var hovering = false;

      function doSetTimeout() {
        if (hovering === false) {
          setTimeout(() => {
            if (i > 5) {
              i = 1;
              rotateCirc["rotateCirc" + i]();
            } else {
              rotateCirc["rotateCirc" + i]();
            }
            setTimeout(() => {
              doSetTimeout();
            }, 800);
          }, i * 500);
          i++;
        }
      }

      doSetTimeout();

      var promiseNumbers = document.querySelectorAll(".promise-numbers");

      function handleMouseOver(e) {
        hovering = true;
        var x = e.currentTarget.getAttribute("data-id");
        rotateCirc["rotateCirc" + x]();
      }

      for (var j = 0; j < promiseNumbers.length; j++) {
        promiseNumbers[j].addEventListener("mouseover", handleMouseOver);
      }

      var rotateCirc = {
        rotateCirc1: function () {
          if (promiseCircle.current && promiseWrap.current) {
            promiseCircle.current.style.transform = "rotate(0deg)";
            promiseWrap.current.style.background = "rgba(46,255,215,0.15)";
          }
        },

        rotateCirc2: function () {
          if (promiseCircle.current && promiseWrap.current) {
            promiseCircle.current.style.transform = "rotate(72deg)";
            promiseWrap.current.style.background = "rgb(86 253 46 / 40%)";
          }
        },

        rotateCirc3: function () {
          if (promiseCircle.current && promiseWrap.current) {
            promiseCircle.current.style.transform = "rotate(144deg)";
            promiseWrap.current.style.background = "rgb(67 37 245 / 40%)";
          }
        },

        rotateCirc4: function () {
          if (promiseCircle.current && promiseWrap.current) {
            promiseCircle.current.style.transform = "rotate(216deg)";
            promiseWrap.current.style.background = "rgb(255 191 23 / 40%)";
          }
        },

        rotateCirc5: function () {
          if (promiseCircle.current && promiseWrap.current) {
            promiseCircle.current.style.transform = "rotate(288deg)";
            promiseWrap.current.style.background = "rgb(235 112 50 / 40%)";
          }
        },
      };
    }
    /* The Slice Promise  ends */

    /* Vision Card Starts  */

    window.addEventListener("scroll", function () {
      const noiseBoxes = document.querySelectorAll(".noiseContain-box");

      // Loop through each element and add the 'active' class
      noiseBoxes.forEach(function (box) {
        box.classList.add("active");
      });

      setTimeout(function () {
        noiseBoxes.forEach(function (box) {
          box.classList.remove("active");
        });
      }, 200);
    });

    /* Vision Card Ends  */
  }, []);

  return (
    <main className="main-container">
      {/* comm head starts */}
      <section className="about-banner card-wrap">
        <div className="about-bg">
          <video
            className=""
            autoPlay
            title="Amatech"
            playsInline={true}
            preload="auto"
            muted="muted"
            controlsList="nodownload, noremoteplayback"
            autopictureinpicture="false"
            buffered=""
            x-webkit-airplay="deny"
            frameBorder={0}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
            width="100%"
            height="100%"
            loop
            id="vid-about"
          >
            <source
              src={`${REACT_APP_ASSET_URL}/about/about-vid.mp4`}
              type="video/mp4"
            />{" "}
          </video>
        </div>
        <div className="container comm-rev">
          <div className="banner-txt-about">
            <h1 className="comm-head-1">About Us</h1>
            <h2>One Company. Three Values.</h2>
            <p>
              We’re unlocking real estate for everyone, making wealth creation
              an accessible journey not an exclusive destination.
            </p>
          </div>

          <div className="about-circles">
            <div className="f-row f-3 f-480-1 about-row">
              {aboutCircleData.map((elem, i) => {
                return <AboutCircleComp key={elem.id} data={elem} />;
              })}
            </div>
          </div>
        </div>
      </section>
      {/* comm head starts ends*/}
      {/* Who we are Starts */}
      <section className="comm-section pb-0">
        <div className="container">
          <div className="who-wrap">
            <div className="f-row f-2 f-990-1">
              <div className="f-col">
                <div className="who-left">
                  <dotlottie-player
                    autoPlay=""
                    loop=""
                    mode="normal"
                    src={`${REACT_APP_ASSET_URL}/about/slice-promise.lottie`}
                  ></dotlottie-player>
                </div>
              </div>
              <div className="f-col">
                <div className="who-right">
                  <h3 className="comm-head-2">Who we are</h3>
                  <p>
                    Slice is a first of a kind "Learn - Discover - Earn" Real
                    Estate Super App that enables customers in 188 countries to
                    invest in professionally vetted fractionalized real estate
                    in under 3 minutes in a regulated &amp; safe model starting
                    from USD 100. Our differentiation &amp; strength comes from
                    empowering &amp; building a community of real estate
                    investors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Who we are Ends */}
      {/* The Slice Promise */}
      <section className="comm-section promise-sec">
        <div className="container">
          <div className="comm-center-head">
            <h3 className="comm-head-2">The Slice Promise</h3>
          </div>
          <div className="promise-wrap" ref={promiseWrap}>
            <div className="promise-circle" ref={promiseCircle}>
              <img src={`${REACT_APP_ASSET_URL}/about/circle.png`} alt="" />
            </div>
            <div className="promise-numbers promise-numbers-1" data-id={1}>
              1
              <div className="tooltip">
                <p>Democratize Real Estate</p>
              </div>
            </div>
            <div className="promise-numbers promise-numbers-2" data-id={2}>
              2
              <div className="tooltip">
                <p>
                  Help achieve Real Estate Aspiration for Millions of Users
                  Globally
                </p>
              </div>
            </div>
            <div className="promise-numbers promise-numbers-3" data-id={3}>
              3
              <div className="tooltip">
                <p>Provide simple &amp; transparent transaction</p>
              </div>
            </div>
            <div className="promise-numbers promise-numbers-4" data-id={4}>
              4
              <div className="tooltip">
                <p>Deliver best in class ROI</p>
              </div>
            </div>
            <div className="promise-numbers promise-numbers-5" data-id={5}>
              5
              <div className="tooltip">
                <p>User experience &amp; user service obsessed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* The Slice Promise */}
      {/* Process Starts */}
      <section className="comm-section">
        <div className="container">
          <div className="comm-center-head">
            <h3 className="comm-head-2">The Slice Expertise</h3>
          </div>
          <div className="process-wrap">
            <div className="process-left">
              <ul className="solutions-left-wrap comm-slide-list">
                <li
                  className="sol-text st-0"
                  onClick={() => handleButtonClick(0)}
                >
                  <div className="txt-wrap-sol">
                    <h4>
                      Over 25 years of global real estate investment experience
                    </h4>
                  </div>
                  <div className="complete-line" />
                </li>
                <li
                  className="sol-text st-1"
                  onClick={() => handleButtonClick(1)}
                >
                  <div className="txt-wrap-sol">
                    <h4>
                      Over $14bn in real estate deals transacted by the founders
                    </h4>
                  </div>
                  <div className="complete-line" />
                </li>
                <li
                  className="sol-text st-2"
                  onClick={() => handleButtonClick(2)}
                >
                  <div className="txt-wrap-sol">
                    <h4>Over 5M users acquired &amp; served by founders</h4>
                  </div>
                  <div className="complete-line" />
                </li>
                <li
                  className="sol-text st-3"
                  onClick={() => handleButtonClick(3)}
                >
                  <div className="txt-wrap-sol">
                    <h4>Highly skilled deal team for investment curation</h4>
                  </div>
                  <div className="complete-line" />
                </li>
                <li
                  className="sol-text st-4"
                  onClick={() => handleButtonClick(4)}
                >
                  <div className="txt-wrap-sol">
                    <h4>
                      Both knowledge and ability to handle legal, compliance and
                      financial regulations
                    </h4>
                  </div>
                  <div className="complete-line" />
                </li>
                <li
                  className="sol-text st-5"
                  onClick={() => handleButtonClick(5)}
                >
                  <div className="txt-wrap-sol">
                    <h4>
                      Demonstrable success in developing innovative applications
                      and disrupting markets
                    </h4>
                  </div>
                  <div className="complete-line" />
                </li>
              </ul>
            </div>
            <div className="process-right">
              <Swiper
                ref={swiperRef}
                slidesPerView={1}
                speed={800}
                effect={"fade"}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[EffectFade, Autoplay]}
                className="swiper swiperPro swiper-process"
                onSlideChange={(swiper) => handleSlideChange(swiper)}
              >
                <SwiperSlide className="swiper-slide">
                  <div className="solutions-media">
                    <img
                      src={`${REACT_APP_ASSET_URL}/about/sol-1.png`}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="solutions-media">
                    <img
                      src={`${REACT_APP_ASSET_URL}/about/sol-2.svg`}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="solutions-media">
                    <img
                      src={`${REACT_APP_ASSET_URL}/about/sol-3.svg`}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="solutions-media">
                    <img
                      src={`${REACT_APP_ASSET_URL}/about/sol-4.svg`}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="solutions-media">
                    <img
                      src={`${REACT_APP_ASSET_URL}/about/sol-5.svg`}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className=" solutions-media">
                    <img
                      src={`${REACT_APP_ASSET_URL}/about/sol-6.svg`}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      {/* Process Ends */}
      {/* Mission Starts */}
      <section className="comm-section black-bg change-cursor">
        <div className="container change-cursor">
          <div className="mission-wrap change-cursor">
            <div className="f-row f-3 f-990-1 change-cursor">
              {visionData.map((elem, i) => {
                return elem.id % 2 == 0 ? (
                  <div className="f-col" key={elem.id}>
                    <VisionCardComp data={elem} />
                  </div>
                ) : (
                  <div className="f-col change-cursor" key={elem.id}>
                    <VisionCardComp data={elem} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Mission Ends */}
      {/* Founders Starts */}
      <section className="comm-section">
        <div className="container">
          <div className="comm-center-head">
            <h2 className="comm-small-title">Meet the team</h2>
            <h3 className="comm-head-2">Founders</h3>
          </div>
          <div className="f-row team-founder">
            {founderData.map((elem, i) => {
              return elem.id !== founderData.length ? (
                <div className="w50 w-768-100" key={elem.id}>
                  <TeamCard person={elem} />
                </div>
              ) : (
                <div className="w100" key={elem.id}>
                  <TeamCard person={elem} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Founders Ends */}
      {/* Advisory Starts */}
      <section className="comm-section">
        <div className="container">
          <div className="comm-center-head">
            <h3 className="comm-head-2">The Board</h3>
          </div>
          <div className="f-row team-founder">
            {advisioryData.map((elem, i) => {
              return elem.id !== advisioryData.length ? (
                <div className="w50 w-768-100" key={elem.id}>
                  <TeamCard person={elem} />
                </div>
              ) : (
                <div className="w100" key={elem.id}>
                  <TeamCard person={elem} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Advisory Ends */}
      {/* Partners Starts */}
      <section className="comm-section">
        <div className="container">
          <div className="comm-center-head">
            <h3 className="comm-head-2">Our Partners</h3>
          </div>
          <div className="f-row f-4 f-768-3 f-480-2">
            <div className="f-col">
              <div className="partner-logo">
                <img src={`${REACT_APP_ASSET_URL}/about/fab.png`} alt="" />
              </div>
            </div>
            <div className="f-col">
              <div className="partner-logo">
                <img
                  src={`${REACT_APP_ASSET_URL}/about/Emirates_NBD.webp`}
                  alt=""
                />
              </div>
            </div>
            <div className="f-col">
              <div className="partner-logo">
                <img src={`${REACT_APP_ASSET_URL}/about/sumsub.png`} alt="" />
              </div>
            </div>
            <div className="f-col">
              <div className="partner-logo">
                <img src={`${REACT_APP_ASSET_URL}/about/checkout.svg`} alt="" />
              </div>
            </div>
            <div className="f-col">
              <div className="partner-logo">
                <img
                  src={`${REACT_APP_ASSET_URL}/about/sovereign.png`}
                  alt=""
                />
              </div>
            </div>
            <div className="f-col">
              <div className="partner-logo">
                <img src={`${REACT_APP_ASSET_URL}/about/pkf.JPG`} alt="" />
              </div>
            </div>
            <div className="f-col">
              <div className="partner-logo">
                <img src={`${REACT_APP_ASSET_URL}/about/crowe.jpg`} alt="" />
              </div>
            </div>
            <div className="f-col">
              <div className="partner-logo">
                <img src={`${REACT_APP_ASSET_URL}/about/wio.png`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Partners Ends */}
      {/* Get Slice and Get Going Starts */}
      <GetSliceCard />
      {/* Get Slice and Get Going Ends */}
    </main>
  );
};

export default About;

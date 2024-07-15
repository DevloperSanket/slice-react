import React, { useContext, useEffect, useRef, useState } from "react";

/* plugin */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "@dotlottie/player-component";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";
/* plugin end */

/* Component */
import GetSliceCard from "../components/GetSliceCard";
import FaqListComp from "../components/FaqListComp";
import FaqAccordComp from "../components/FaqAccordComp";
import { headersConfig, basicAuthConfig } from "../config/constants";
import gs from "../service/global";
import mainContext from "../config/mainContext";
import { useSearchParams } from "react-router-dom";

/* component end */

const { REACT_APP_ASSET_URL } = process.env;
gsap.registerPlugin(ScrollTrigger);

const Faq = () => {
  const scrollToRef = useRef(null);
  const mainObj = useContext(mainContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const dataValue = searchParams.get("data");
  // console.log(dataValue);

  // console.log(mainObj);
  const [animationParent] = useAutoAnimate();
  const [faqDetail, setFaqDetail] = useState([]);
  const [faqSingleDetail, setFaqSingleDetail] = useState([]);
  const [previousId, setPreviousId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [faqTitle, setFaqTitle] = useState("");

  /* FAQ Api */
  var faqLimit = 25;
  var faqPageNo = 1;
  const getFaqDetail = () => {
    axios
      .get(
        `/main/slice/api/v1/user/static/content?limit=${faqLimit}&pageNo=${faqPageNo}&type=SLICE_FAQ`,
        {
          headers: {
            ...headersConfig,
            Authorization: `Bearer ${mainObj.appToken}`,
          },
        }
      )
      .then((response) => {
        const result = response?.data?.data;
        setFaqDetail(result);
        // setFaqSingleDetail(result);
        // console.log(result[0].FAQ);

        if (result.length > 0) {
          setFaqSingleDetail(result[0].FAQ);
          setFaqTitle(result[0].title);
        }
        setActiveIndex(0);
        // console.log(dataValue);
        if (dataValue) {
          const idTitles = result.map(({ _id, title }, index) => ({
            index,
            _id,
            title,
          }));
          const specificFaqId = idTitles.find(
            (obj) => obj.title.replaceAll(" ", "") === dataValue
          );
          setActiveIndex(specificFaqId?.index);
          getFaqApi(specificFaqId?._id);
          setFaqTitle(specificFaqId?.title);
        }

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

  /* FAQ category Api */
  const getFaqId = (currentId) => {
    setSearchParams({});
    if (previousId !== currentId) {
      getFaqApi(currentId);
      setPreviousId(currentId);
    }
  };

  const getFaqApi = (faqId) => {
    axios
      .get(`/main/slice/api/v1/user/content/faq/${faqId}`, {
        headers: {
          ...headersConfig,
          ...basicAuthConfig,
        },
      })
      .then((response) => {
        const result = response?.data?.data?.FAQ;
        setFaqSingleDetail(result);
        // console.log(result);

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
  /* FAQ category Api end */

  /* mob other FAQ start */
  const [faqMenu, setFaqMenu] = useState(false);

  const handleFaqBtn = () => {
    setFaqMenu(!faqMenu);
  };
  /* mob other FAQ end */

  const storeActiveIndex = (index) => {
    // console.log(index);
    setActiveIndex(index);
  };

  const handleScroll = () => {
    scrollToRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (mainObj?.apiLoad) {
      getFaqDetail();
    }
  }, [mainObj, dataValue]);

  /* keyRisk start */
  // const [queryUrlData, setQueryUrlData] = useState(null);

  // useEffect(() => {
  //   setQueryUrlData(dataValue);

  //   const idTitles = faqDetail.map(({ _id, title }) => ({ _id, title }));
  //   const specificFaqId = idTitles.find(
  //     (obj) => obj.title === "Risk Disclosures"
  //   );
  //   console.log(specificFaqId);

  //   if (specificFaqId) {
  //     console.log("ID of Movie 2:", specificFaqId._id);

  //     getFaqApi(specificFaqId._id);
  //   }
  // }, [searchParams]);
  /* keyRisk end */

  return (
    <main className="main-container" ref={scrollToRef}>
      <section className="internal-banner-section ">
        <div className="container">
          <div className="internal-banner-wrap">
            <div className="banner-img banner-img-left">
              <dotlottie-player
                autoPlay
                mode="normal"
                src={`${REACT_APP_ASSET_URL}/faq/faq's_1.lottie`}
              ></dotlottie-player>
            </div>
            <h2 className="comm-head-1">FAQ’s</h2>
            <div className="banner-img banner-img-right">
              <dotlottie-player
                autoPlay
                mode="normal"
                src={`${REACT_APP_ASSET_URL}/faq/faq's_2.lottie`}
              ></dotlottie-player>
            </div>
          </div>
        </div>
      </section>
      <section className="comm-section faq-details-section">
        <div className="container">
          <div className="f-row">
            <div className="w25 w-1280-30 w-990-100">
              <div className={`faq-left-list ${faqMenu ? "active" : ""}`}>
                <div className="down-arrow" onClick={() => handleFaqBtn()}>
                  <span className="icon-arrow-down" />
                </div>
                {faqDetail.map((item, index) => {
                  return (
                    item?.status === "ACTIVE" && (
                      <FaqListComp
                        key={item?._id}
                        title={item?.title}
                        imgSrc={item?.image}
                        onClick={() => {
                          getFaqId(item?._id);
                          setFaqTitle(item?.title);
                          handleFaqBtn();
                          handleScroll();
                          storeActiveIndex(index);
                        }}
                        activeState={index === activeIndex ? "active" : ""}
                      />
                    )
                  );
                })}
              </div>
            </div>
            <div className="w75 w-1280-70 w-990-100">
              <div className="faq-details-wrap">
                <div ref={animationParent}>
                  <p className="faq-title">{faqTitle}</p>
                  {faqSingleDetail?.map(
                    (item) =>
                      item?.status === "ACTIVE" && (
                        <FaqAccordComp
                          title={item?.que}
                          description={item?.ans}
                          faqId={item._id}
                          key={item._id}
                        />
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="faq-btn" onClick={() => handleFaqBtn()}>
            <button className="button black">Other FAQ's</button>
          </div>
        </div>
      </section>
      {/* Get Slice and Get Going Starts */}
      <GetSliceCard />
      {/* Get Slice and Get Going Ends */}
    </main>
  );
};

export default Faq;

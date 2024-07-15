import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

/* plugin */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "@dotlottie/player-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
/* plugin end */

/* Component */
import GetSliceCard from "../components/GetSliceCard";
import LivePropertiesCard from "../components/LivePropertiesCard";
import GrowMoreCard from "../components/GrowMoreCard";
import UpcomingCard from "../components/UpcomingCard";
import ResaleCard from "../components/ResaleCard";
import { GROWMORE_DATA, RESALE_DATA } from "../components/data/PropertiesData";
import { headersConfig, bearerAuthConfig } from "../config/constants";
import gs from "../service/global";
import mainContext from "../config/mainContext";
/* Component End*/

const { REACT_APP_ASSET_URL } = process.env;
gsap.registerPlugin(ScrollTrigger);

const Properties = () => {
  const mainObj = useContext(mainContext);
  // console.log(mainObj);
  const [liveDetail, setLiveDetail] = useState([]);
  const [upcomingDetail, setUpcomingDetail] = useState([]);
  const [fundedDetail, setFundedDetail] = useState([]);

  /* Live Properties Api Start*/
  const getLiveDetail = () => {
    axios
      .get(`/property/slice/api/v1/properties/live?limit=20&pageNo=1`, {
        headers: {
          ...headersConfig,
          Authorization: `Bearer ${mainObj?.appToken}`,
        },
      })
      .then((response) => {
        setLiveDetail(response.data.data);
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
  /* Live Properties End */

  /* Upcoming Api Start*/
  const getUpcomingDetail = () => {
    axios
      .get(`/property/slice/api/v1/properties/upcoming?limit=20&pageNo=1`, {
        headers: {
          ...headersConfig,
          Authorization: `Bearer ${mainObj?.appToken}`,
        },
      })
      .then((response) => {
        setUpcomingDetail(response.data.data);
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
  /* Upcoming Api End */

  /* Funded Properties Api Start*/
  const getFundedDetail = () => {
    axios
      .get(`/property/slice/api/v1/properties/funded?limit=20&pageNo=1`, {
        headers: {
          ...headersConfig,
          Authorization: `Bearer ${mainObj?.appToken}`,
        },
      })
      .then((response) => {
        setFundedDetail(response.data.data);
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
  /* Funded Properties End */

  useEffect(() => {
    if (mainObj?.apiLoad) {
      getUpcomingDetail();
      getLiveDetail();
      getFundedDetail();
    }
  }, [mainObj]);

  return (
    <main className="main-container">
      <section className="internal-banner-section">
        <div className="container">
          <div className="internal-banner-wrap">
            <div className="banner-img banner-img-left">
              <dotlottie-player
                autoPlay=""
                mode="normal"
                src={`${REACT_APP_ASSET_URL}/properties/properties-1.lottie`}
              ></dotlottie-player>
            </div>
            <div className="banner-txt">
              <h1 className="comm-head-1">
                Explore our range of property investments
              </h1>
              <p>
                Start investing in income generating properties from just USD
                100
              </p>
            </div>
            <div className="banner-img banner-img-right">
              <dotlottie-player
                autoPlay=""
                mode="normal"
                src={`${REACT_APP_ASSET_URL}/properties/properties-2.lottie`}
              ></dotlottie-player>
            </div>
          </div>
        </div>
      </section>
      {/* live properties */}
      <section className="prop-section ">
        <div className="container">
          <h3 className="comm-head-2">Live Properties</h3>
          <Swiper
            slidesPerView={1.05}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              1280: {
                slidesPerView: 4,
              },
              990: {
                slidesPerView: 3,
              },
              640: {
                slidesPerView: 2,
              },
              360: {
                slidesPerView: 1.2,
              },
            }}
            modules={[Pagination]}
            className="swiper swiperLiveProperties"
          >
            {liveDetail.map((item, i) => (
              <SwiperSlide className="swiper-slide" key={i}>
                <LivePropertiesCard
                  img={item.images[0]}
                  name={item.name}
                  city={item.location.state + ", " + item.location.country}
                  bed={item.beds}
                  bath={item.baths}
                  area={item.sqft}
                  price={item.pricePerSlice}
                  irr={item.IRR}
                  sliceLeft={item.numberOfSlices - item.subscribed}
                  totalSlice={item.numberOfSlices}
                  fundingDate={item.fundingTargetDate}
                  status={item.status}
                />
              </SwiperSlide>
            ))}
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>
      </section>
      {/* grow more */}
      {/* <section className="prop-section">
        <div className="container">
          <h3 className="comm-head-2">Grow More</h3>
          <Swiper
            slidesPerView={1.05}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              1366: {
                slidesPerView: 6,
              },
              1280: {
                slidesPerView: 5,
              },
              990: {
                slidesPerView: 4,
              },
              640: {
                slidesPerView: 3,
              },
              400: {
                slidesPerView: 2,
              },
              360: {
                slidesPerView: 1.5,
              },
            }}
            modules={[Pagination]}
            className="swiper swiperGrowMore"
          >
            {GROWMORE_DATA.map((item, i) => (
              <SwiperSlide className="swiper-slide" key={i}>
                <GrowMoreCard
                  img={item.imgSrc}
                  title={item.title}
                  para={item.para}
                />
              </SwiperSlide>
            ))}
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>
      </section> */}
      {/* upcoming properties */}
      <section className="prop-section">
        <div className="container">
          <h3 className="comm-head-2">Upcoming Properties</h3>
          <Swiper
            slidesPerView={1.05}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              1280: {
                slidesPerView: 4,
              },
              990: {
                slidesPerView: 3,
              },
              640: {
                slidesPerView: 2,
              },
              360: {
                slidesPerView: 1.3,
              },
            }}
            modules={[Pagination]}
            className="swiper swiperUpcoming"
          >
            {upcomingDetail.map((item, i) => (
              <SwiperSlide className="swiper-slide" key={i}>
                <UpcomingCard
                  img={item.images[0]}
                  title={item.name}
                  city={
                    item.location.city +
                    ", " +
                    item.location.state +
                    ", " +
                    item.location.country
                  }
                  price={"USD " + item.pricePerSlice}
                />
              </SwiperSlide>
            ))}
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>
      </section>
      {/* resale properties */}
      <section className="prop-section ">
        <div className="container">
          <h3 className="comm-head-2">Funded Properties</h3>
          <Swiper
            slidesPerView={1.05}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              1280: {
                slidesPerView: 3,
              },
              990: {
                slidesPerView: 3,
              },
              640: {
                slidesPerView: 2,
              },
              360: {
                slidesPerView: 1.1,
                spaceBetween: 20,
              },
            }}
            modules={[Pagination]}
            className="swiper swiperResale"
          >
            {fundedDetail.map((item, i) => (
              <SwiperSlide className="swiper-slide" key={i}>
                <ResaleCard
                  img={item.images[0]}
                  title={item.name}
                  price={item.pricePerSlice}
                  city={item.location.city + ", " + item.location.country}
                  sliceNo={item.numberOfSlices}
                />
              </SwiperSlide>
            ))}
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>
      </section>
      {/* Get Slice and Get Going Starts */}
      <GetSliceCard />
      {/* Get Slice and Get Going Ends */}
    </main>
  );
};

export default Properties;

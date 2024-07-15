import React, { useEffect, useState, useRef, useContext } from "react";

/* plugin */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "@dotlottie/player-component";
import axios from "axios";
import ReactPaginate from "react-paginate";
/* plugin end */

/* Component */
import BlogCard from "../components/BlogCard";
import GetSliceCard from "../components/GetSliceCard";
import { headersConfig } from "../config/constants";
import gs from "../service/global";
import mainContext from "../config/mainContext";
/* Component End*/

const { REACT_APP_ASSET_URL } = process.env;
gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const mainObj = useContext(mainContext);

  // console.log(mainObj);
  const [blogData, setBlogData] = useState([]);
  const scrollToRef = useRef(null);

  function callWebengageTrackEvent(event_name, item) {
    window.webengage.track(event_name, {
      "Article Name": blogData[item].title,
      "Article Category": blogData[item].tag,
      "Article Date": blogData[item].created,
    });
  }
  /* Blog Api Start*/
  var blogLimit = 25;
  var pageNo = 1;
  const getBlog = () => {
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

  // pagination start
  const items = [];

  blogData.forEach((item, i) => {
    items.push(i);
  });

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div
              className="element-item Investment"
              data-category="Investment"
              key={blogData[item]._id}
              onClick={() => callWebengageTrackEvent("BlogViewed", item)}
            >
              <BlogCard
                bloglink={blogData[item]._id}
                img={blogData[item].webImage}
                category={blogData[item].tag}
                title={blogData[item].title}
                time={blogData[item].readingTime}
                content={blogData[item].content}
                datecode={blogData[item].created}
              />
            </div>
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    const handleScroll = () => {
      scrollToRef.current.scrollIntoView({
        behavior: "smooth",
      });
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          onClick={() => handleScroll()}
        />
      </>
    );
  }
  // pagination end

  useEffect(() => {
    if (mainObj?.apiLoad) {
      getBlog();
    }
  }, [mainObj]);

  return (
    <main className="main-container">
      <section className="internal-banner-section ">
        <div className="container">
          <div className="internal-banner-wrap">
            <div className="banner-img banner-img-left">
              <dotlottie-player
                autoPlay
                mode="normal"
                src={`${REACT_APP_ASSET_URL}/blog/blog_1.lottie`}
              ></dotlottie-player>
            </div>
            <div className="banner-txt">
              <h1 className="comm-head-1">Blogs</h1>
              <p>
                Check out our blogs covering a wide range of topics to help you{" "}
                <br /> understand finance and investments better
              </p>
            </div>
            <div className="banner-img banner-img-right">
              <dotlottie-player
                autoPlay
                mode="normal"
                src={`${REACT_APP_ASSET_URL}/blog/blog_2.lottie`}
              ></dotlottie-player>
            </div>
          </div>
        </div>
      </section>
      <section className="comm-section" ref={scrollToRef}>
        <div className="container">
          <div className="grid">
            <PaginatedItems itemsPerPage={5} />
          </div>
        </div>
      </section>
      {/* Get Slice and Get Going Starts */}
      <GetSliceCard />
      {/* Get Slice and Get Going Ends */}
    </main>
  );
};

export default Blog;

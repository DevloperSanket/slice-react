import React, { useContext, useEffect, useState } from "react";

/* plugin */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useParams } from "react-router";
import moment from "moment";
import DOMPurify from "dompurify";
import axios from "axios";
/* plugin end */

/* Component */
import BlogRelatedCard from "../components/BlogRelatedCard";
import GetSliceCard from "../components/GetSliceCard";
import {
  headersConfig,
  basicAuthConfig,
  bearerAuthConfig,
} from "../config/constants";
import { Link } from "react-router-dom";
import gs from "../service/global";
import LearnBlog from "../components/LearnBlog";
import mainContext from "../config/mainContext";
import HelmetMeta from "../components/HelmetMeta";
/* Component End*/

const { REACT_APP_ASSET_URL } = process.env;
gsap.registerPlugin(ScrollTrigger);

const BlogDetail = () => {
  const currentUrl = window.location.href;
  const mainObj = useContext(mainContext);
  let { blogId } = useParams();
  // console.log(blogId);
  const [blogDetail, setBlogDetail] = useState({});

  /* share social media */
  const pageUrl = encodeURIComponent(document.URL);

  const socialWindow = (url) => {
    // console.log(url);
    const left = (window.innerWidth - 570) / 2;
    const top = (window.innerHeight - 570) / 2;
    const params = `menubar=no,toolbar=no,status=no,width=570,height=570,top=${top},left=${left}`;
    window.open(url, "NewWindow", params);
  };

  const handleLinkedInClick = () => {
    const url = `https://www.linkedin.com/shareArticle?&url=${pageUrl}`;
    socialWindow(url);
  };

  const handleFacebookClick = () => {
    const url = `https://www.facebook.com/sharer.php?u=${pageUrl}`;
    socialWindow(url);
  };

  const handleTwitterClick = () => {
    const url = `https://twitter.com/intent/tweet?url=${pageUrl}`;
    socialWindow(url);
  };

  /* share social media end */

  /* Blog Api Start*/
  const getBlogDetail = () => {
    getCurrentBlog(blogId);
  };

  const getRelatedBlog = (currentId) => {
    // console.log(currentId);
    getCurrentBlog(currentId);
  };

  const getCurrentBlog = (currentBlogId) => {
    axios
      .get(`/main/slice/api/v1/user/content/blog/${currentBlogId}`, {
        headers: {
          ...headersConfig,
          ...basicAuthConfig,
        },
      })
      .then((response) => {
        const result = response.data.data;
        // console.log(result);
        setBlogDetail(result);

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

  // const Blog = () => {
  const [blogData, setBlogData] = useState([]);

  /* Blog Api Start*/
  var blogLimit = 10;
  var pageNo = 1;
  var learnBlog = [];
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

  useEffect(() => {
    if (mainObj?.apiLoad) {
      getBlogDetail();
      getBlog();
    }
  }, [mainObj]);

  return (
    <>
      <HelmetMeta
        pageTilte={blogDetail?.title}
        pageDesc="Blog detail description"
        pageThumbnail={blogDetail?.webImage}
      />
      <main className="main-container">
        <div className="blog">
          <div className="container">
            <div className="blog-container">
              <ul className="breadcrums">
                <li>
                  <Link to="/" className="bc-name">
                    Home{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="bc-name">
                    blog
                  </Link>
                </li>
              </ul>
              <h1 className="comm-head-2">{blogDetail?.title}</h1>
              <div>
                {blogDetail?.tag?.map((item, i) => (
                  <span className="comm-body blue badge" key={i}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="blog-header">
                <div className="blog-h-left">
                  {blogDetail?.profilePicture && (
                    <div className="blog-logo">
                      <img
                        src={blogDetail?.profilePicture}
                        alt=""
                        width="100%"
                        height="100%"
                        loading="eager"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="comm-head-7">{blogDetail?.createdBy}</h2>
                    <div className="ot-details">
                      <span className="comm-body-small">
                        {moment(blogDetail?.created).format("Do MMM YY")}
                      </span>
                      <span className="divider-circle" />
                      <span className="comm-body-small">
                        {blogDetail?.readingTime} min read
                      </span>
                    </div>
                  </div>
                </div>
                <div className="blog-h-right">
                  <div className="share">
                    <span className="label-small">SHARE WITH:</span>

                    <div className="footer-list social-list">
                      <ul>
                        <li>
                          <div
                            className="curzr-hover blog-social"
                            onClick={() => handleLinkedInClick()}
                          >
                            <img
                              src={`${REACT_APP_ASSET_URL}/blog-detail/social-1.svg`}
                              alt=""
                            />
                          </div>
                        </li>
                        <li>
                          <div
                            className="curzr-hover blog-social"
                            onClick={() => handleFacebookClick()}
                          >
                            <img
                              src={`${REACT_APP_ASSET_URL}/blog-detail/social-2.svg`}
                              alt=""
                            />
                          </div>
                        </li>
                        <li>
                          <div
                            className="curzr-hover blog-social"
                            onClick={() => handleTwitterClick()}
                          >
                            <img
                              src={`${REACT_APP_ASSET_URL}/blog-detail/x-twitter.svg`}
                              alt=""
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="blog-main-banner">
              <img
                src={blogDetail?.webImage}
                alt=""
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
            <div className="blog-container">
              <div
                className="blog-details custom-quill-styles-container"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blogDetail?.content),
                }}
              ></div>
            </div>
          </div>
        </div>
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
                      onClickFun={() => getRelatedBlog(blogData[i]._id)}
                    />
                  </div>
                ))}
              </div>
              <div className="btn-center">
                <Link to="/blog" className="button">
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
    </>
  );
};

export default BlogDetail;

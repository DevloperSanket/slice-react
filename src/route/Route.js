import React, { useEffect, useRef, useState } from "react";
import { createBrowserRouter, Outlet, useNavigate } from "react-router-dom";

/* Common Components */
import Header from "../components/Header";
import Footer from "../components/Footer";

import HomePage from "../pages/HomePage";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import Properties from "../pages/Properties";
import HowItWorks from "../pages/HowItWorks";
import Contact from "../pages/Contact";

import ErrorPage from "../pages/ErrorPage";
import About from "../pages/About";
import Faq from "../pages/Faq";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsCondition from "../pages/TermsCondition";
import axios from "axios";
import mainContext from "../config/mainContext";
import { headersConfig, basicAuthConfig } from "../config/constants";

const { REACT_APP_EMAIL, REACT_APP_PASSWORD, REACT_APP_DEVICEID } = process.env;

const AppLayout = () => {
  const scrollToRef = useRef(null);
  const navigate = useNavigate();
  const [mainObj, setMainObj] = useState({
    appToken: null,
    apiLoad: false,
  });

  // console.log("Route Change");

  /* Login Api */
  const getToken = () => {
    let payload = {
      email: REACT_APP_EMAIL,
      password: REACT_APP_PASSWORD,
      deviceId: REACT_APP_DEVICEID,
      deviceToken: "string",
      deviceName:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      browser: "Chrome",
      region: "Asia/Calcutta",
    };

    axios
      .post(`/main/slice/api/v1/user/login`, payload, {
        headers: {
          ...headersConfig,
          ...basicAuthConfig,
        },
      })
      .then((response) => {
        let token = response?.data?.data?.accessToken;
        // console.log(token);
        setMainObj({ appToken: token, apiLoad: true });

        // localStorage.setItem("sToken", token);
      })
      .catch((error) => {
        console.log(error);
        setMainObj({ appToken: null, apiLoad: false });
      });
  };
  /* Login Api end */

  const handleScroll = () => {
    scrollToRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleScroll();
    getToken();
  }, [navigate]);

  return (
    <>
      <div ref={scrollToRef}>
        <mainContext.Provider value={mainObj}>
          <Header />
          <Outlet />
          <Footer />
        </mainContext.Provider>
      </div>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog-detail/:blogId",
        element: <BlogDetail />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "/properties",
        element: <Properties />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-condition",
        element: <TermsCondition />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default appRouter;

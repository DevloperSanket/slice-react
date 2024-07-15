import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gs from "../service/global";

const { REACT_APP_ASSET_URL } = process.env;

const ErrorPage = () => {
  useEffect(() => {
    /* Loader Starts */
    gs.showLoader(true);
    /* Loader Ends */
  }, []);

  return (
    <div className="wrap-404">
      <div className="container">
        <div className="glitch-wrap">
          <div className="glitch" data-text={404}>
            404
          </div>
          <div className="glow">404</div>
          <p className="txt-404">
            ooops! There seems to be a glitch <br /> in the matrix.
          </p>
          <Link to="/" className="button">
            Back to Home
          </Link>
        </div>
      </div>
      <div className="image-404">
        <img src={`${REACT_APP_ASSET_URL}/common/404-image.jpg`} alt="" />
      </div>
    </div>
  );
};

export default ErrorPage;

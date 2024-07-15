import axios from "axios";
const { REACT_APP_DEVELOPMENTURL } = process.env;

const Interceptor = () => {
  axios.defaults.baseURL = REACT_APP_DEVELOPMENTURL;

  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // let noAuth = config.headers.noAuth;
      // console.log(noAuth);
      config.headers.Accept = "application/json";
      return config;
    },
    function (error) {
      // console.log(error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // console.log("interceptor", error);
      // Reload the page
      // window.location.reload();
      return Promise.reject(error);
    }
  );
};

export default Interceptor;

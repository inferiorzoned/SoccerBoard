import axios from "axios";
// import { toast } from 'react-toastify';
// import logger from './logService';
import { func } from "prop-types";
import { toast } from "react-toastify";

// passing common headers. but to removve bidirectional dependency between http and auth
// service auth should be depended on the http service

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

//handling unexpected errors globally
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("INTERCEPTOR CALLED - logging error", error);
    // logger.log(error);
    // toast.error('an unexpected error occurred!');
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};

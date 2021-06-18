import axios from "axios";
import { toast } from "react-toastify";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.baseURL = "http://localhost:3900/api";
axios.defaults.baseURL = "https://soccerboard-api.herokuapp.com/api/";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Log", error);
    toast.error("An unexpected error occured");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const exportedApi = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default exportedApi;
import axios from "axios";
import {setLoader} from '../loader/loader.jsx'
import store from "../../pages/store/store.jsx";

export const configAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {},
});

configAxios.interceptors.request.use(
  function (config) {
    store.dispatch(setLoader(false));
    if (localStorage.getItem("token"))
      config.headers = {
        Authorization: `Basic ${localStorage.getItem("token")}`,
      };
    return config;
  },
  function (error) {
    store.dispatch(setLoader(true));
    return Promise.reject(error);
  }
);

configAxios.interceptors.response.use(
  function (response) {
    store.dispatch(setLoader(true));
    return response;
  },
  function (error) {
    store.dispatch(setLoader(true));
    return Promise.reject(error);

  }
)

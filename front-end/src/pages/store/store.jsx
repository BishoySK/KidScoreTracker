import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "../../utilities/loader/loader.jsx";

export default configureStore({
  reducer: {
    loader: loaderSlice,
  },
});
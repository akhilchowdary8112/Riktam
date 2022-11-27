import { configureStore } from "@reduxjs/toolkit";
import slice from "./slices/index";
const store = configureStore({
  reducer: {
    User: slice,
  },
});
export default store;

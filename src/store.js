import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./features/generalSlice";

const store = configureStore({
  reducer: {
    general: generalReducer,
  },
});

export default store;

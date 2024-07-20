import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./features/generalSlice";
import userReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    general: generalReducer,
    user: userReducer,
  },
});

export default store;

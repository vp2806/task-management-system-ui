import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastInfo: {
    type: null,
    message: null,
    isShow: false,
  },
  isLoading: false,
  error: null,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    updateToast: (state, action) => {
      return (state = { ...state, ["toastInfo"]: action.payload });
    },
    updateLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
    },
  },
});

export const { updateToast, updateLoading } = generalSlice.actions;

export default generalSlice.reducer;

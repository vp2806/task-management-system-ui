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

const userSlice = createSlice({
  name: "user",
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

export const { updateToast, updateLoading } = userSlice.actions;

export default userSlice.reducer;

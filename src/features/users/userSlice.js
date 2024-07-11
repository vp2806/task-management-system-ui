import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastInfo: {
    type: null,
    message: null,
    isShow: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateToast: (state, action) => {
      return (state = { ...state, ["toastInfo"]: action.payload });
    },
  },
});

export const { updateToast } = userSlice.actions;

export default userSlice.reducer;

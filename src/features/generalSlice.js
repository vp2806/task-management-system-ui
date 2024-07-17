import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastInfo: {
    type: null,
    message: null,
    isShow: false,
  },
  isLoading: false,
  error: null,
  modalInfo: {
    isModalOpen: false,
    toBeUpdate: null,
  },
  drawerInfo: {
    isDrawerOpen: false,
    isView: false,
    toBeUpdate: null,
    toBeView: null,
  },
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
    updateModalInfo: (state, action) => {
      state.modalInfo.isModalOpen = action.payload.isModalOpen;
      state.modalInfo.toBeUpdate = action.payload.toBeUpdate;
    },
    updateDrawerInfo: (state, action) => {
      state.drawerInfo.isDrawerOpen = action.payload.isDrawerOpen;
      state.drawerInfo.isView = action.payload.isView;
      state.drawerInfo.toBeUpdate = action.payload.toBeUpdate;
      state.drawerInfo.toBeView = action.payload.toBeView;
    },
  },
});

export const { updateToast, updateLoading, updateModalInfo, updateDrawerInfo } =
  generalSlice.actions;

export default generalSlice.reducer;

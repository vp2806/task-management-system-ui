import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../services/userProfile";

const initialState = {
  userProfile: {},
  isLoadingUser: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async () => {
    try {
      const response = await getUserProfile();
      if (typeof response === "object") {
        return response;
      }
      return {};
    } catch (error) {
      console.error("Error while fetching user profile", error);
      return {};
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.isLoadingUser = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.isLoadingUser = false;
      state.userProfile = action.payload;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;

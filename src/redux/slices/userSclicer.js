import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token") || "";

const initialState = {
  token,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    clearUserToken: (state) => {
      state.token = "";
    },
  },
});

export const { setUserToken, clearUserToken } = userSlice.actions;
export default userSlice.reducer;

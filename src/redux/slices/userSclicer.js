import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.user = action.payload;
    },
    clearUserState: (state) => {
      state.user = {};
    },
  },
});

export const { setUserState, clearUserState } = userSlice.actions;
export default userSlice.reducer;

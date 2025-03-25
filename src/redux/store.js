import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/blogPostSlice.js";

const store = configureStore({
    reducer: {
        posts: postReducer,
    },
});

export default store;
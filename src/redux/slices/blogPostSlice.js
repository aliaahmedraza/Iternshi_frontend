import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts, likePost, dislikePost, commentOnPost } from "../../services/apis.js";

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const posts = await getPosts();
      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to like a post
export const likePostAsync = createAsyncThunk(
  "posts/likePost",
  async ({ postId, userId }, thunkAPI) => {
    try {
      const updatedPost = await likePost(postId, userId);
      return updatedPost;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to dislike a post
export const dislikePostAsync = createAsyncThunk(
  "posts/dislikePost",
  async ({ postId, userId }, thunkAPI) => {
    try {
      const updatedPost = await dislikePost(postId, userId);
      return updatedPost;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to comment on a post
export const commentOnPostAsync = createAsyncThunk(
  "posts/commentOnPost",
  async ({ postId, userId, text }, thunkAPI) => {
    try {
      const updatedPost = await commentOnPost(postId, userId, text);
      return updatedPost;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Initial state for posts slice
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchPosts cases
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload || [];
      state.status = "succeeded";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Failed to fetch posts";
    });

    // likePostAsync cases
    builder.addCase(likePostAsync.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      state.items = state.items.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    });
    builder.addCase(likePostAsync.rejected, (state, action) => {
      state.error = action.payload || "Failed to like post";
    });

    // dislikePostAsync cases
    builder.addCase(dislikePostAsync.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      state.items = state.items.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    });
    builder.addCase(dislikePostAsync.rejected, (state, action) => {
      state.error = action.payload || "Failed to dislike post";
    });

    // commentOnPostAsync cases
    builder.addCase(commentOnPostAsync.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      state.items = state.items.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    });
    builder.addCase(commentOnPostAsync.rejected, (state, action) => {
      state.error = action.payload || "Failed to comment on post";
    });
  },
});

export default postSlice.reducer;

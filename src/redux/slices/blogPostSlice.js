// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getPosts, likePost, commentOnPost } from "../../services/api";

// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
//     return await getPosts();
// });

// export const likePostAsync = createAsyncThunk(
//     "posts/likePost",
//     async ({ postId, userId }) => {
//         return await likePost(postId, userId);
//     }
// );

// export const commentOnPostAsync = createAsyncThunk(
//     "posts/commentOnPost",
//     async ({ postId, userId, text }) => {
//         return await commentOnPost(postId, userId, text);
//     }
// );

// const postSlice = createSlice({
//     name: "posts",
//     initialState: { items: [], status: "idle", error: null },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchPosts.fulfilled, (state, action) => {
//                 state.items = action.payload;
//                 state.status = "succeeded";
//             })
//             .addCase(likePostAsync.fulfilled, (state, action) => {
//                 const updatedPost = action.payload;
//                 state.items = state.items.map((post) =>
//                     post._id === updatedPost?._id ? updatedPost : post
//                 );
//             })
//             .addCase(commentOnPostAsync.fulfilled, (state, action) => {
//                 const updatedPost = action.payload;
//                 state.items = state.items.map((post) =>
//                     post._id === updatedPost?._id ? updatedPost : post
//                 );
//             })
//             .addMatcher(
//                 (action) => action.type.endsWith("/rejected"),
//                 (state, action) => {
//                     state.error = action.error.message;
//                 }
//             );
//     },
// });

// export default postSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts, likePost, commentOnPost } from "../../services/apis.js";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
    try {
        return await getPosts();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const likePostAsync = createAsyncThunk(
    "posts/likePost",
    async ({ postId, userId }, { rejectWithValue }) => {
        try {
            return await likePost(postId, userId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const commentOnPostAsync = createAsyncThunk(
    "posts/commentOnPost",
    async ({ postId, userId, text }, { rejectWithValue }) => {
        try {
            return await commentOnPost(postId, userId, text);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const postSlice = createSlice({
    name: "posts",
    initialState: { items: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.items = action.payload || [];
                state.status = "succeeded";
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Failed to fetch posts";
            })
            .addCase(likePostAsync.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                if (updatedPost) {
                    state.items = state.items.map((post) =>
                        post._id === updatedPost?._id ? updatedPost : post
                    );
                }
            })
            .addCase(commentOnPostAsync.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                if (updatedPost) {
                    state.items = state.items.map((post) =>
                        post._id === updatedPost?._id ? updatedPost : post
                    );
                }
            })
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.error = action.payload || "An error occurred";
                }
            );
    },
});

export default postSlice.reducer;

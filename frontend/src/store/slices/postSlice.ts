import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostRequestSuccess } from "../types";

type baseStateType<D, E = null> = {
  data: D | null;
  loading: boolean;
  error: E | boolean;
};
const baseState = {
  data: null,
  loading: false,
  error: false,
};

interface initState {
  fetchPosts: baseStateType<PostRequestSuccess>;
  addPost: baseStateType<Post>;
  updatePost: baseStateType<Post>;
  deletePost: baseStateType<number>; // ID of the deleted post
}

const initialState: initState = {
  fetchPosts: baseState,
  addPost: baseState,
  updatePost: baseState,
  deletePost: baseState,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsRequest(state) {
      state.fetchPosts.loading = true;
      state.fetchPosts.error = false;
    },
    fetchPostsSuccess(state, action: PayloadAction<PostRequestSuccess>) {
      state.fetchPosts.data = action.payload;
      state.fetchPosts.loading = false;
    },
    fetchPostsFailure(state) {
      state.fetchPosts.loading = false;
      state.fetchPosts.error = true;
    },
    addPostRequest(state) {
      state.addPost.loading = true;
      state.addPost.error = false;
    },
    addPostSuccess(state, action: PayloadAction<Post>) {
      state.addPost.data = action.payload;
      state.addPost.loading = false;
    },
    addPostFailure(state) {
      state.addPost.loading = false;
      state.addPost.error = true;
    },
    updatePostRequest(state) {
      state.updatePost.loading = true;
      state.updatePost.error = false;
    },
    updatePostSuccess(state, action: PayloadAction<Post>) {
      state.updatePost.data = action.payload;
      state.updatePost.loading = false;

      // Update the specific post in fetchPosts if it exists
      if (state.fetchPosts.data) {
        const index = state.fetchPosts.data.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.fetchPosts.data.posts[index] = action.payload;
        }
      }
    },
    updatePostFailure(state) {
      state.updatePost.loading = false;
      state.updatePost.error = true;
    },
    deletePostRequest(state, action: PayloadAction<number>) {
      state.deletePost.loading = true;
      state.deletePost.error = false;
    },
    deletePostSuccess(state, action: PayloadAction<number>) {
      state.deletePost.data = action.payload;
      state.fetchPosts.data = {
        ...state.fetchPosts.data!,
        posts: state.fetchPosts.data!.posts.filter(
          (post) => post.id !== action.payload
        ),
      };
      state.deletePost.loading = false;
    },
    deletePostFailure(state) {
      state.deletePost.loading = false;
      state.deletePost.error = true;
    },
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
} = postsSlice.actions;

export default postsSlice.reducer;

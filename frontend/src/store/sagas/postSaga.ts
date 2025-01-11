import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import api from "../../services/api";
import {
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
} from "../slices/postSlice";
import { Post, PostRequestSuccess } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchPostsSaga(action: ReturnType<typeof fetchPostsRequest>) {
  try {
    const params = action.payload?.name
      ? { params: { name: action.payload.name } }
      : {};
    const response: AxiosResponse<PostRequestSuccess> = yield call(
      api.get,
      "/posts",
      params
    );
    yield put(fetchPostsSuccess(response.data));
  } catch (error: unknown) {
    console.error("Fetch post error:", error);
    yield put(fetchPostsFailure());
  }
}

function* addPostSaga(action: ReturnType<typeof addPostRequest>) {
  try {
    const response: AxiosResponse<Post> = yield call(
      api.post,
      "/posts",
      action.payload
    );
    yield put(addPostSuccess(response.data));
  } catch (error: unknown) {
    console.error("Add post error:", error);
    yield put(addPostFailure());
  }
}

function* updatePostSaga({ payload }: PayloadAction<{ id: string }>) {
  try {
    const response: AxiosResponse<Post> = yield call(
      api.put,
      `/posts/${payload.id}`,
      payload
    );
    yield put(updatePostSuccess(response.data));
  } catch (error: unknown) {
    console.error("Update post error:", error);
    yield put(updatePostFailure());
  }
}

function* deletePostSaga({ payload }: PayloadAction<number>) {
  try {
    yield call(api.delete, `/posts/${payload}`);
    yield put(deletePostSuccess(payload));
  } catch (error: unknown) {
    console.error("Delete post error:", error);
    yield put(deletePostFailure());
  }
}

// Watcher saga
export function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
  yield takeLatest(addPostRequest.type, addPostSaga);
  yield takeLatest(updatePostRequest.type, updatePostSaga);
  yield takeLatest(deletePostRequest.type, deletePostSaga);
}

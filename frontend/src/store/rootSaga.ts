import { all } from "redux-saga/effects";
import { postsSaga } from "../store/sagas/postSaga";

export default function* rootSaga() {
  yield all([postsSaga()]);
}

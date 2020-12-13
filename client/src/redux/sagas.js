import { put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";

export function* watchSubmitEmailPassword() {
  yield takeEvery("SUBMIT_EMAIL_PASSWORD", submitEmailPassword);
}

export function* watchGetList() {
  yield takeEvery("FETCH_LIST", fetchList);
}

function* fetchList({ payload }) {
  console.log("sage is running");
  console.log(payload);
  if (payload) {
    const response = yield axios.get("http://localhost:8000/protected", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + payload.token,
      },
    });
    if (response) {
      console.log(response.data.list);
      yield put({ type: "GET_LIST", payload: response.data.list });
    } else {
      yield put({ type: "GET_ERROR", payload: "no valid Token" });
      payload.history.push("/login");
    }
  }
}

function* submitEmailPassword({ payload }) {
  const { email, password, history } = payload;
  axios.defaults.withCredentials = true;
  const token = yield axios.post("http://localhost:8000/login", {
    email: email,
    password: password,
  });
  if (token) {
    yield put({ type: "AUTH_USER", payload: token.data.accessToken });
    yield put({ type: "AUTH_ERROR", payload: "" });
    history.push("/protected");
  } else {
    yield put({ type: "AUTH_ERROR", payload: "auth error" });
  }
}

export default function* rootSaga() {
  yield all([watchSubmitEmailPassword(), watchGetList()]);
}

import { put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";

export function* watchSubmitEmailPassword() {
  yield takeEvery("SUBMIT_EMAIL_PASSWORD", submitEmailPassword);
}

export function* watchGetList() {
  yield takeEvery("FETCH_LIST", fetchList);
}

export function* watchRefreshToken() {
  yield takeEvery("REFRESH_TOKEN", refreshToken);
}

function* fetchList({ payload }) {
  try {
    const response = yield axios.get("http://localhost:8000/protected", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + payload.token,
      },
    });
    yield put({ type: "GET_LIST", payload: response.data.list });
  } catch (e) {
    console.log(e);
    yield put({ type: "GET_ERROR", payload: "no valid Token" });
    payload.history.push("/login");
  }
}

function* submitEmailPassword({ payload }) {
  const { email, password, history } = payload;
  axios.defaults.withCredentials = true;

  try {
    const token = yield axios.post("http://localhost:8000/login", {
      email: email,
      password: password,
    });
    yield put({ type: "AUTH_USER", payload: token.data.accessToken });
    yield put({ type: "AUTH_ERROR", payload: "" });
    history.push("/protected");
  } catch (e) {
    yield put({ type: "AUTH_ERROR", payload: "auth error" });
    yield put({ type: "GET_ERROR", payload: "no valid Token" });
    payload.history.push("/login");
  }
}

function* refreshToken({ payload }) {
  console.log("saga being called");
  try {
    const token = yield axios.get("http://localhost:8000/refreshToken");
    yield put({ type: "AUTH_USER", payload: token.data.accessToken });
    yield put({ type: "AUTH_ERROR", payload: "" });
  } catch {
    yield put({ type: "AUTH_ERROR", payload: "auth error" });
    yield put({ type: "GET_ERROR", payload: "no refresh valid Token" });
    console.log("refresh token does not work");
    payload.history.push("/login");
  }
}

export default function* rootSaga() {
  yield all([watchSubmitEmailPassword(), watchGetList(), watchRefreshToken()]);
}

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

function* fetchList({ payload }) {
  try {
    const response = yield fetchListApitCall(payload.token);
    yield put({ type: "GET_LIST", payload: response.data.list });
  } catch {
    try {
      const newToken = yield tryTokenRefresh();
      const response = yield fetchListApitCall(newToken.data.accessToken);
      yield put({ type: "GET_LIST", payload: response.data.list });
    } catch {
      yield put({ type: "GET_ERROR", payload: "no valid Token" });
      payload.history.push("/login");
    }
  }
}

const fetchListApitCall = async (token) => {
  return await axios.get("http://localhost:8000/protected", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

const tryTokenRefresh = async () => {
  try {
    const newToken = await axios.get("http://localhost:8000/refreshToken");
    return newToken;
  } catch {
    throw "could not get a new token";
  }
};

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

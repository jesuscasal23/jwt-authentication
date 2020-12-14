import { put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";

export function* watchSubmitEmailPassword() {
  yield takeEvery("SUBMIT_EMAIL_PASSWORD", submitEmailPassword);
}

export function* watchGetList() {
  yield takeEvery("FETCH_LIST", fetchList);
}

export function* watchLogOut() {
  yield takeEvery("LOG_OUT", logOut);
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
      yield put({ type: "AUTH_USER", payload: newToken.data.accessToken });
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

function* logOut({ payload }) {
  console.log("logout saga being called");
  yield axios.get("http://localhost:8000/logOut");
  yield put({ type: "AUTH_USER", payload: "" });
  payload.history.push("/login");
}

export default function* rootSaga() {
  yield all([watchSubmitEmailPassword(), watchGetList(), watchLogOut()]);
}

import { put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";

export function* watchSubmitEmailPassword() {
  yield takeEvery("SUBMIT_EMAIL_PASSWORD", submitEmailPassword);
}

export function* watchGetList() {
  yield takeEvery("FETCH_LIST", fetchList);
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
  }
}

export default function* rootSaga() {
  yield all([watchSubmitEmailPassword(), watchGetList()]);
}

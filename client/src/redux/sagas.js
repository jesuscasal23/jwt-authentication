import { put, takeEvery, all, call } from "redux-saga/effects";
import axios from "axios";

export function* watchSubmitEmailPassword() {
  yield takeEvery("SUBMIT_EMAIL_PASSWORD", submitEmailPassword);
}

const submitEmailApiCall = async (email, password) => {
  axios.defaults.withCredentials = true;
  const response = await axios.post("http://localhost:8000/login", {
    email: email,
    password: password,
  });
  return response;
};

function* submitEmailPassword({ payload }) {
  const { email, password, history } = payload;
  const token = yield call(submitEmailApiCall, email, password);
  if (token) {
    yield put({ type: "AUTH_USER", payload: token.data.accessToken });
    yield put({ type: "AUTH_ERROR", payload: "" });
    history.push("/protected");
  } else {
    yield put({ type: "AUTH_ERROR", payload: "auth error" });
  }
}

export default function* rootSaga() {
  yield all([watchSubmitEmailPassword()]);
}

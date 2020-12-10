import axios from "axios";

// here is should use redux thunk
const submitEmailPassword = (props, callback) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: props.email,
        password: props.password,
      });
      dispatch({ type: "AUTH_USER", payload: response.data.accessToken });
      dispatch({ type: "AUTH_ERROR", payload: "" });
      callback();
    } catch (e) {
      dispatch({ type: "AUTH_ERROR", payload: "auth error" });
    }
  };
};

const getList = (token, callback) => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:8000/protected", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      dispatch({ type: "GET_LIST", payload: response.data.list });
    } catch (e) {
      if (e.response.status === 401) {
        dispatch({ type: "GET_ERROR", payload: "no valid Token" });
      }
      callback();
    }
  };
};

const logOut = () => {
  return {
    type: "AUTH_USER",
    payload: "",
  };
};

export { submitEmailPassword, logOut, getList };

import axios from "axios";

const submitEmailPassword = (props) => {
  const { email, password, history } = props;
  return {
    type: "SUBMIT_EMAIL_PASSWORD",
    payload: {
      email: email,
      password: password,
      history: history,
    },
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

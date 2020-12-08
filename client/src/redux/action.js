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
      callback();
    } catch (e) {
      dispatch({ type: "AUTH_ERROR", payload: "error" });
    }
  };
};

const logOut = () => {
  return {
    type: "AUTH_USER",
    payload: "",
  };
};

export { submitEmailPassword, logOut };

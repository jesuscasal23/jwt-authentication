const initialState = {
  email: "",
  password: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_EMAIL_PASSWORD":
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    default:
      return state;
  }
};

export default reducer;

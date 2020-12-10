const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "AUTH_USER":
      return {
        ...state,
        authenticated: action.payload,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        authError: action.payload,
      };
    case "GET_LIST":
      return {
        ...state,
        list: action.payload,
      };
    case "GET_ERROR":
      return {
        ...state,
        getError: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

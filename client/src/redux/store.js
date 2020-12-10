import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import authReducer from "./reducer";

const store = createStore(
  authReducer,
  { authenticated: "", authError: "", list: [], getError: "" },
  composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;

import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import authReducer from "./reducer";

import rootSaga from "./sagas";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  authReducer,
  { authenticated: "", authError: "", list: [], getError: "" },
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;

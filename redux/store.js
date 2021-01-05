import { applyMiddleware, createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];

// create a makeStore function
const makeStore = (context) =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });

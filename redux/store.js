import { applyMiddleware, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const middleware = [thunk];

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// create a makeStore function
const initStore = () => createStore(rootReducer, bindMiddleware(middleware));

// export an assembled wrapper
export const wrapper = createWrapper(initStore);

import users from "./users";
import objekty from "./objekty";
import alert from "./alert";
import mapbox from "./mapbox";
import places from "./places";
import previo from "./previo";
import radyTipy from "./radyTipy";
import webcams from "./webcams";
import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

const initReducer = (state = { tick: "init" }, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case "TICK":
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  initReducer,
  users,
  objekty,
  alert,
  mapbox,
  places,
  previo,
  radyTipy,
  webcams,
});

export default rootReducer;

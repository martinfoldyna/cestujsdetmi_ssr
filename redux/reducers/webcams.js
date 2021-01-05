import {
  ADD_WEBCAMS,
  GET_ALL_WEBCAMS,
  GET_ONE_WEBCAM,
  GET_WEBCAMS_ERROR,
  START_LOADING,
} from "../actions/types";

const initialState = {
  webcams: null,
  webcam: null,
  errors: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_WEBCAMS:
      return { ...state, webcams: payload, loading: false };
    case GET_ONE_WEBCAM:
      return { ...state, webcam: payload, loading: false };
    case ADD_WEBCAMS:
      console.log("current webcams state", { ...state.webcams, ...payload });
      return {
        ...state,
        webcams: [...state.webcams, ...payload],
        loading: false,
      };
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_WEBCAMS_ERROR:
      return { ...state, errors: payload, loading: false };
    default:
      return state;
  }
}

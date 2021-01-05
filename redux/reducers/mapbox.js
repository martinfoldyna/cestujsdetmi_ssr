import { GEOCODING_FAIL, GEOCODING_SUCCESS } from "../actions/types";

const initialState = {
  geoResults: null,
  errors: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GEOCODING_SUCCESS:
      return { ...state, geoResults: payload, loading: false };
    case GEOCODING_FAIL:
      return { ...state, errors: payload, loading: false };
    default:
      return state;
  }
}

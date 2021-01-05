import {
  GET_ALL_CITIES,
  GET_ALL_CITIES_IN_REGION,
  GET_ALL_REGIONS,
  ALL_CITIES_ERROR,
  ALL_REGIONS_ERROR,
} from "../actions/types";

const initialState = {
  allRegions: null,
  citiesInRegion: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_REGIONS:
      return {
        ...state,
        allRegions: payload,
        loading: false,
      };
    case GET_ALL_CITIES_IN_REGION:
      return {
        ...state,
        citiesInRegion: payload,
        loading: false,
      };
    case ALL_CITIES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ALL_REGIONS_ERROR:
      return {
        ...state,
        allRegions: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}

import { GET_HOTEL, GET_HOTELS, HOTELS_ERROR } from "../actions/types";

const initialState = {
  hotels: null,
  hotel: null,
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_HOTELS:
      return {
        ...state,
        hotels: payload,
        loading: false,
      };
    case GET_HOTEL:
      return {
        ...state,
        hotel: payload,
        loading: false,
      };
    case HOTELS_ERROR:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
}

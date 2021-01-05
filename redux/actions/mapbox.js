import axios from "axios";
import { GEOCODING_FAIL, GEOCODING_SUCCESS } from "./types";

export const geocoding = (searchQuery) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.replace(
        " ",
        "%20"
      )}.json?language=cs&country=cz&types=region,postcode,district,place,locality,neighborhood,address,poi&access_token=${
        process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN
      }`
    );
    dispatch({ type: GEOCODING_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GEOCODING_FAIL, payload: err });
  }
};

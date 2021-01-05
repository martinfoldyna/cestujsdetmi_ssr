import { GET_HOTEL, GET_HOTELS, HOTELS_ERROR } from "./types";
import axios from "axios";
import { parseString } from "xml2js";

export const searchHotels = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/xml",
      },
    };
    const getBody = `<?xml version="1.0"?>\n
    <request>
    <login>${process.env.REACT_APP_PREVIO_LOGIN}</login>
    <password>${process.env.REACT_APP_PREVIO_PASSWORD}</password>
    <hotId>1</hotId>
</request>`;

    const res = await axios.post(
      `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_PREVIO_API_URL}/hotels/search`,
      getBody,
      config
    );

    parseString(res.data, (err, result) => {
      if (err) {
        dispatch({ type: HOTELS_ERROR, payload: err });
      }
      dispatch({ type: GET_HOTELS, payload: result });
    });
  } catch (err) {
    dispatch({ type: HOTELS_ERROR, payload: err });
  }
};

export const getHotel = (hotelID) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/xml",
      },
    };
    const getBody = `<?xml version="1.0"?>\n
    <request>
    <login>${process.env.REACT_APP_PREVIO_LOGIN}</login>
    <password>${process.env.REACT_APP_PREVIO_PASSWORD}</password>
    <hotId>${hotelID}</hotId>
</request>`;

    const res = await axios.post(
      `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_PREVIO_API_URL}/hotel/get`,
      getBody,
      config
    );
    parseString(res.data, (err, result) => {
      if (err) {
        dispatch({ type: HOTELS_ERROR, payload: err });
      }
      dispatch({ type: GET_HOTEL, payload: result.hotel });
    });
  } catch (err) {
    dispatch({ type: HOTELS_ERROR, payload: err });
  }
};

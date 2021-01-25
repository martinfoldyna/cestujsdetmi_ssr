import axios from "axios";
import {
  ADD_WEBCAMS,
  GET_ALL_WEBCAMS,
  GET_ONE_WEBCAM,
  GET_WEBCAMS_ERROR,
  START_LOADING,
} from "./types";
import { searchParamsToQueryString } from "../../helpers/helpers";

export const getAllWebcams = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/webkameries?_limit=9&active=1`
    );

    console.log(res);

    dispatch({ type: GET_ALL_WEBCAMS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_WEBCAMS_ERROR, payload: err.message });
  }
};

export const getWebcam = (value) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/webkameries?hodnota=${value}`
    );
    if (res.data && res.data.length > 0) {
      dispatch({ type: GET_ONE_WEBCAM, payload: res.data[0] });
    } else {
      dispatch({ type: GET_WEBCAMS_ERROR, payload: "Webcam not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const loadMoreWebcams = (props) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const queryString = searchParamsToQueryString(props);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/webkameries?${queryString}`
    );

    dispatch({ type: ADD_WEBCAMS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_WEBCAMS_ERROR, payload: err });
  }
};

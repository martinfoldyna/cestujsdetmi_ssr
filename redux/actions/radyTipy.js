import {
  GET_ADVICE_POST,
  GET_ADVICE_POSTS,
  GET_RELATED_POSTS,
  POSTS_ADVICE_ERROR,
  REMOVE_ADVICE_POST,
} from "./types";
import axios from "axios";

export const getAdvices = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/rady-a-tipies?_sort=createdAt:DESC`
    );

    dispatch({ type: GET_ADVICE_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: POSTS_ADVICE_ERROR, payload: err });
  }
};

export const getAdvice = (hodnota) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/rady-a-tipies?hodnota=${hodnota}`
    );

    dispatch(getRelatedAdvices(res.data[0].page_keywords));

    dispatch({ type: GET_ADVICE_POST, payload: res.data[0] });
  } catch (err) {
    dispatch({ type: POSTS_ADVICE_ERROR, payload: err });
  }
};

export const removeAdvice = () => async (dispatch) => {
  dispatch({ type: REMOVE_ADVICE_POST });
};

/**
 *
 * @param tags
 * @return type: GET_RELATED_POSTS, payload: response data
 */
export const getRelatedAdvices = (tags) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/rady-a-tipies/related?_limit=9&tags=${tags}&_publicationState=live`
    );

    dispatch({ type: GET_RELATED_POSTS, payload: res.data });
  } catch (err) {
    dispatch({ type: POSTS_ADVICE_ERROR, payload: err });
  }
};

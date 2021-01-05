import axios from "axios";
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  USER_ERROR,
  USER_RECEIVED,
} from "./types";
// import { setToast } from "./alerts";

export const registerUser = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
      data
    );

    sessionStorage.setItem("auth-token", res.data.jwt);

    // dispatch(setToast("Váš účet byl úspěšně vytvořen.", "success"));
    dispatch({ type: REGISTER_USER, payload: res.data.user });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err });
  }
};

export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local/`,
      data
    );

    console.log(res);

    sessionStorage.setItem("auth-token", res.data.jwt);

    dispatch({ type: LOGIN_USER, payload: res.data.user });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("auth-token");
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: { authorization: `Bearer ${token}` },
    });

    dispatch({ type: USER_RECEIVED, payload: res.data });
  } catch (err) {
    console.log(err.message);
    dispatch({ type: USER_ERROR, payload: err });
    // if (err.response?.status === 401) {
    //     dispatch(
    //         setToast(
    //             "Z důvodu neaktivity jste byl(a) automaticky odhlášen(a)",
    //             "info"
    //         )
    //     );
    // }
  }
};

export const logoutUser = () => (dispatch) => {
  sessionStorage.removeItem("auth-token");
  dispatch({ type: LOGOUT_USER });
};

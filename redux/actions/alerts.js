import { SET_ALERT, REMOVE_ALERT, SET_TOAST } from "./types";
import { toast } from "react-toastify";
import { v4 } from "uuid";
export const setToast = (message, alertType) => (dispatch) => {
  const id = v4();

  dispatch({ type: SET_TOAST, payload: { id } });

  const onClose = () => dispatch({ type: REMOVE_ALERT, payload: id });

  toast(message, {
    type: alertType,
    onClose: onClose,
    hideProgressBar: true,
  });
};

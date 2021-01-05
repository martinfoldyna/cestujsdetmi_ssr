import {
    LOGIN_USER,
    LOGOUT_USER,
    OBJEKT_UPDATED,
    REGISTER_USER,
    USER_ERROR,
    USER_RECEIVED,
} from "../actions/types";
import { getUser } from "../actions/users";

const initialState = {
    user: null,
    loading: true,
    errors: null,
    getUser: getUser(),
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_USER:
        case LOGIN_USER:
        case USER_RECEIVED:
            return {
                ...state,
                user: payload,
                loading: false,
            };
        case USER_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false,
            };
        case LOGOUT_USER:
            return {
                user: null,
            };
        default:
            return state;
    }
}

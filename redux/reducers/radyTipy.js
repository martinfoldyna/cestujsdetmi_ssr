import {
  GET_ADVICE_POST,
  GET_ADVICE_POSTS,
  GET_RELATED_POSTS,
  POST_ADVICE_ERROR,
  POSTS_ADVICE_ERROR,
  REMOVE_ADVICE_POST,
} from "../actions/types";

const initialState = {
  posts: null,
  post: null,
  loading: true,
  errors: null,
  relatedPosts: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ADVICE_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_ADVICE_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case GET_RELATED_POSTS:
      return {
        ...state,
        relatedPosts: payload,
      };
    case REMOVE_ADVICE_POST:
      return {
        ...state,
        post: null,
        relatedPosts: null,
      };
    case POSTS_ADVICE_ERROR:
    case POST_ADVICE_ERROR:
      return {
        ...state,
        errors: { ...state.errors, payload },
      };

    default:
      return state;
  }
}

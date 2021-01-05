import {
  ADD_OBJEKTY,
  GET_OBJEKTY,
  GET_OBJEKTY_TYPY,
  GET_ONE_OBJEKT,
  GET_KATEGORIE,
  GET_PODKATEGORIE,
  OBJEKT_UPDATED,
  OBJEKT_UPDATE_ERROR,
  OBJEKT_UPLOAD_ERROR,
  OBJEKT_UPLOADED,
  OBJEKTY_ERROR,
  START_UPLOADING,
  GET_OBJEKTY_IN_OBLAST,
  GET_NEW_PUBLISHED_OBJEKTY,
  GET_LAST_MINUTE,
  REMOVE_OBJEKT_IN_STORAGE,
  START_LOADING,
  REMOVE_OBJEKTY_IN_STORAGE,
  COUNT_OBJEKTY,
} from "../actions/types";

const initialState = {
  objekty: null,
  objekt: null,
  objektyTypy: null,
  objektyInOblast: null,
  newPublished: null,
  kategorie: null,
  podkategorie: null,
  lastMinute: null,
  loading: true,
  totalCount: 0,
  uploadingInProgress: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OBJEKTY_TYPY:
      return {
        ...state,
        objektyTypy: payload,
        loading: false,
      };

    case GET_ONE_OBJEKT:
      return {
        ...state,
        objekt: payload,
        loading: false,
      };

    case START_UPLOADING:
      return {
        ...state,
        uploadingInProgress: true,
      };

    case ADD_OBJEKTY:
      return {
        ...state,
        objekty: state.objekty
          ? [...new Set([...state.objekty, ...payload])]
          : payload,
        loading: false,
      };

    case GET_OBJEKTY:
      return {
        ...state,
        objekty: payload,
        uploadingInProgress: false,
        loading: false,
      };

    case START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case COUNT_OBJEKTY:
      return {
        ...state,
        totalCount: payload,
      };

    case GET_NEW_PUBLISHED_OBJEKTY:
      return {
        ...state,
        newPublished: payload,
        loading: false,
      };
    case GET_LAST_MINUTE:
      return {
        ...state,
        lastMinute: payload,
        loading: false,
      };
    case GET_OBJEKTY_IN_OBLAST:
      return {
        ...state,
        objektyInOblast: payload,
      };

    case GET_KATEGORIE:
      return {
        ...state,
        kategorie: payload,
        loading: false,
      };

    case GET_PODKATEGORIE:
      return {
        ...state,
        podkategorie: payload,
        loading: false,
      };

    case REMOVE_OBJEKT_IN_STORAGE:
      return {
        ...state,
        objekt: null,
      };

    case REMOVE_OBJEKTY_IN_STORAGE:
      return {
        ...state,
        objekty: null,
      };

    case OBJEKTY_ERROR:
    case OBJEKT_UPDATE_ERROR:
    case OBJEKT_UPLOAD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        uploadingInProgress: false,
      };
    case OBJEKT_UPDATED:
      return {
        ...state,
        objekt: payload,
        uploadingInProgress: false,
        loading: false,
      };
    case OBJEKT_UPLOADED:
      return {
        ...state,
        uploadingInProgress: false,
      };
    default:
      return state;
  }
}

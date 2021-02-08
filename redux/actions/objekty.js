import {
  ADD_OBJEKTY,
  COUNT_OBJEKTY,
  GET_KATEGORIE,
  GET_LAST_MINUTE,
  GET_NEW_PUBLISHED_OBJEKTY,
  GET_OBJEKTY,
  GET_OBJEKTY_IN_OBLAST,
  GET_OBJEKTY_TYPY,
  GET_ONE_OBJEKT,
  OBJEKT_UPDATE_ERROR,
  OBJEKT_UPDATED,
  OBJEKT_UPLOAD_ERROR,
  OBJEKT_UPLOADED,
  OBJEKTY_ERROR,
  REMOVE_OBJEKT_IN_STORAGE,
  REMOVE_OBJEKTY_IN_STORAGE,
  START_LOADING,
  START_UPLOADING,
} from "./types";
import axios from "axios";
import { v4 } from "uuid";
import { handleImageUpload } from "../../helpers/images";
// import { setToast } from "./alerts";
import { searchParamsToQueryString } from "../../helpers/helpers";
import { fetchAllPrevioHotels, fetchQuery } from "../../helpers/fetch";

// GET: Fetch all objects
export const getObjekty = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos-minified?_sort=druh_zapisu_value:DESC,createdAt:DESC`
    );

    const previoFetch = await fetchAllPrevioHotels(2);

    console.log(res.data);

    dispatch({
      type: GET_OBJEKTY,
      payload: { ...res.data, ...previoFetch.data },
    });
  } catch (err) {
    dispatch({
      type: OBJEKTY_ERROR,
      payload: err,
    });
  }
};

export const getNewPublished = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos-minified?_sort=createdAt:DESC&_limit=4`
    );

    dispatch({ type: GET_NEW_PUBLISHED_OBJEKTY, payload: res.data });
  } catch (err) {
    dispatch({
      type: OBJEKTY_ERROR,
      payload: err,
    });
  }
};

export const removeObjektInStorage = () => (dispatch) => {
  dispatch({ type: REMOVE_OBJEKT_IN_STORAGE });
};

export const getLastMinute = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos-minified?_sort=druh_zapisu_value:DESC,createdAt:DESC&last_minute_popis_null=false&druh_zapisu_value=04_premium_gold`
    );

    dispatch({ type: GET_LAST_MINUTE, payload: res.data });
  } catch (err) {
    dispatch({
      type: OBJEKTY_ERROR,
      payload: err,
    });
  }
};

// GET: Get all objects in oblast
export const getObjektyInOblast = (oblast) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos-minified/byOblast/${oblast.key}`
    );

    dispatch({ type: GET_OBJEKTY_IN_OBLAST, payload: res.data });
  } catch (err) {
    dispatch({ type: OBJEKTY_ERROR, payload: err });
  }
};

// GET: Helper function, that gets number of all objects.
export const countObjekty = async (fetchParam) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos/count${
        fetchParam ? "?" + searchParamsToQueryString(fetchParam) : ""
      }`
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/**
 *
 * @param params: sorting or query params that are sent to api
 * @return {function(*): Promise<void>} Objekty
 */
export const getObjektyByParams = (params) => async (dispatch) => {
  try {
    const { method } = params;
    dispatch({ type: START_LOADING });
    // Stringify function params to string for API call
    let paramString = searchParamsToQueryString(params);
    console.log(paramString);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos-minified?_sort=druh_zapisu:DESC,createdAt:DESC&${paramString}`
    );

    dispatch({
      type: method !== "add" ? GET_OBJEKTY : ADD_OBJEKTY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: OBJEKTY_ERROR, payload: err });
  }
};

// GET: Get one objekt by it's ID
export const getObjektByID = (id) => async (dispatch) => {
  try {
    const { API_URL } = process.env;

    console.log(API_URL);

    const res = await axios.get(`${API_URL}/objekt-infos/${id}`);

    dispatch({
      type: GET_ONE_OBJEKT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: OBJEKTY_ERROR, payload: err.message });
  }
};

// POST: Upload object information
export const uploadObjektInfo = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos`,
      data,
      {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
        },
      }
    );

    return res;
  } catch (err) {
    console.log(err);

    return null;
  }
};

// POST: Upload object
export const uploadObjekt = (data, id, thumbnail) => async (dispatch) => {
  try {
    // dispatch({ type: START_UPLOADING });
    //
    // const fotky = data.galerie ? data.galerie : [];
    // if (images) {
    //   for (let image of images) {
    //     if (image.blobs) {
    //       console.log("image", image);
    //       const firebaseID = data.firebaseID ? data.firebaseID : v4();
    //       const urlSM = await handleImageUpload(image.blobs.sm, firebaseID);
    //       const urlLG = await handleImageUpload(image.blobs.lg, firebaseID);
    //       fotky.push({ sm: urlSM, lg: urlLG, popis: image.description });
    //     }
    //   }
    //   data.galerie = fotky;
    // }
    //   data = {
    //     ...data,
    //     firebaseID,
    //     nahledovy_obrazek: await firebaseRes.ref.getDownloadURL(),
    //   };
    //
    //
    // const infoRes = await uploadObjektInfo(objekt_info);
    //
    // dispatch({ type: OBJEKT_UPLOADED, payload: infoRes });
  } catch (err) {
    // dispatch({
    //   type: OBJEKT_UPLOAD_ERROR,
    //   payload: err,
    // });
  }
};

/**
 * @method: PUT or POST
 * Handles objekt upload
 * @param data
 * @param images
 * @param type
 * @param id
 * @return dispatch {function(*): Promise<void>}
 */
export const handleObjekt = (data, images, type, id, history) => async (
  dispatch
) => {
  try {
    dispatch({ type: START_UPLOADING });

    const fotky = [];
    if (images) {
      const firebaseID = data.firebaseID ? data.firebaseID : v4();
      for (let image of images) {
        if (image.blobs) {
          console.log("image", image);
          const urlSM = await handleImageUpload(image.blobs.sm, firebaseID);
          const urlLG = await handleImageUpload(image.blobs.lg, firebaseID);
          fotky.push({ sm: urlSM, lg: urlLG, popis: image.description });
        } else {
          fotky.push(image);
        }
      }
      data.galerie = fotky;
      if (!firebaseID) {
        data.firebaseID = firebaseID;
      }
    }

    if (type === "update") {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos/${id}`,
        data,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
          },
        }
      );

      // dispatch(
      //   setToast(`ObjektOverviewItem ${data.nazev && data.nazev} byl upraven `, "success")
      // );
      dispatch({ type: OBJEKT_UPDATED, payload: res });
      history.push("/auth/dashboard");
    } else if (type === "create") {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos`,
        data,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
          },
        }
      );

      // dispatch(
      //   setToast(`ObjektOverviewItem ${data.nazev && data.nazev} byl vytvořen `, "success")
      // );
      dispatch({ type: OBJEKT_UPLOADED, payload: res });
    }
  } catch (err) {
    // dispatch(
    //   setToast("Během ukládání objektu do databáze došlo k chybě.", "error")
    // );
    dispatch({ type: OBJEKT_UPDATE_ERROR, payload: err });
    console.log(err);
  }
};

// GET: Get object by user who created it
export const getObjektByUser = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos?hodnota=penzion-slunecno`,
      {
        headers: {
          authorization: `${sessionStorage.getItem("auth-token")}`,
        },
      }
    );

    dispatch({ type: GET_OBJEKTY, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

// GET: Get all object types
export const getAllObjectTypes = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/objekty-typies?_sort=hodnota:ASC`
    );

    const beautifiedData = {};
    for (let type of res.data) {
      const beautifiedHodnota = type.hodnota.substr(3);
      beautifiedData[beautifiedHodnota] = type;
    }
    dispatch({ type: GET_OBJEKTY_TYPY, payload: beautifiedData });
  } catch (err) {
    dispatch({
      type: OBJEKTY_ERROR,
      payload: err,
    });
  }
};

// PUT: Add review to objekt
export const addReview = (data, id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos/addReview/${id}`,
      data
    );
    dispatch({ type: OBJEKT_UPDATED, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: OBJEKT_UPDATE_ERROR,
      payload: err,
    });
  }
};

// GET: Get all categoreis
export const getCategories = (params) => async (dispatch) => {
  try {
    const url = params
      ? `${process.env.NEXT_PUBLIC_API_URL}/kategories`
      : `${process.env.NEXT_PUBLIC_API_URL}/kategories`;

    const res = await axios.get(url);

    dispatch({ type: GET_KATEGORIE, payload: res.data });
  } catch (err) {
    dispatch({
      type: OBJEKTY_ERROR,
      payload: err,
    });
  }
};

// GET: Get all secondaryCategories
export const getSecondaryCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/podkategories`
    );

    dispatch({ type: GET_KATEGORIE, payload: res.data });
  } catch (err) {
    dispatch({
      type: OBJEKTY_ERROR,
      payload: err,
    });
  }
};

// GET: Get all secondaryCategories by main category
export const getSecondaryCategoriesWithParam = (categoryID) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/podkategories?_kategorie=${categoryID}`
    );

    dispatch({ type: GET_KATEGORIE, payload: res.data });
  } catch (err) {
    dispatch({
      type: OBJEKTY_ERROR,
      payload: err,
    });
  }
};

export const removeObjekty = () => (dispatch) => {
  dispatch({ type: REMOVE_OBJEKTY_IN_STORAGE });
};

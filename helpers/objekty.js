import axios from "axios";
import { vaidateJwt } from "./auth";

/**
 *
 * @param data
 * @param images
 * @param type
 * @param id
 * @param user
 * @return {Promise<{data: any, success: boolean}|{err, success: boolean}>}
 */
export const objektUpload = async ({ data, images, type, id, jwt }) => {
  try {
    if (data.objekty) {
      delete data.objekty;
    }

    console.log(vaidateJwt(jwt));

    let dataRes;

    if (type === "update") {
      dataRes = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } else {
      dataRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    }

    let imageRes;
    const formData = new FormData();
    if (images && images.length > 0) {
      const uploadImages = Array.isArray(images) ? images : [images];

      for (let imageObject of uploadImages) {
        const image = imageObject.blob;
        if (image instanceof Blob) {
          // formData.append('files', image);
          // formData.append(`files.${image.name}`, image);
        }
      }
      uploadImages.forEach((file) =>
        formData.append(`files`, file.blob, file.blob.name)
      );
      formData.append("field", "galerie");
      formData.append("ref", "objekt-info");
      formData.append("refId", dataRes.data._id);
      imageRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    }

    return { data: dataRes.data, images: imageRes.data, success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
};

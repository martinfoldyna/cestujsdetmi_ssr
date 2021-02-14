import axios from "axios";

export const objektUpload = async (data, images, type, id) => {
  try {
    const formData = new FormData();

    if (images && images.length > 0) {
      const uploadImages = Array.isArray(images) ? images : [images];

      for (let imageObject of uploadImages) {
        const image = imageObject.blob;
        if (image instanceof Blob) {
          formData.append(`files.${image.name}`, image, image.name);
          formData.append("field", "galerie");
          formData.append("ref", "objekt-info");
        }
        /*formData.append(
          "fileInfo",
          `{"alternativeText":"${image.alternativeText}","name":"${image.name}"}`
        );*/
      }
    }

    if (data.objekty) {
      delete data.objekty;
    }

    formData.append("data", JSON.stringify(data));

    let res;

    if (type === "update") {
      res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
          },
        }
      );
    } else {
      res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    return { data: res.data, success: true };
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
};

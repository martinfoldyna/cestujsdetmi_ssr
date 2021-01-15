import axios from "axios";

export const objektUpload = async (data, images) => {
  try {
    if (images && images.length > 0) {
      const formData = new FormData();

      const uploadImages = Array.isArray(images) ? images : [images];

      console.log(data);

      for (let image of uploadImages) {
        console.log(image);
        formData.append(`files.${image.name}`, image, image.name);
        formData.append("field", "galerie");
        /*formData.append(
          "fileInfo",
          `{"alternativeText":"${image.alternativeText}","name":"${image.name}"}`
        );*/
      }

      if (data.objekty) {
        delete data.objekty;
      }

      formData.append("data", JSON.stringify(data));

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/objekt-infos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return { data: res.data, success: true };
    }
  } catch (err) {
    console.log(err);
    return { err, success: false };
  }
};

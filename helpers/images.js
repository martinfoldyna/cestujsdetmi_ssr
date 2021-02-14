import { imgCompressionOptions } from "../config/imageCompression";
import imageCompression from "browser-image-compression";

export const handleSingleCompression = async (file) => {
  const imageFile = file;
  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  try {
    const compressedFileLG = await imageCompression(
      new File([file.slice(0, file.size, "image/png")], imageFile.name, {
        type: imageFile.type,
      }),
      imgCompressionOptions
    );

    console.log(
      "compressedFileLG instanceof Blob",
      compressedFileLG instanceof Blob
    );
    console.log(
      `compressedFileLG size ${compressedFileLG.size / 1024 / 1024} MB`
    ); // smaller than maxSizeMB

    return compressedFileLG;
  } catch (error) {
    return { error };
  }
};

export const handleMultipleCompression = async (files) => {
  const compressedImages = [];

  for (let image of files) {
    try {
      const compressedImage = await handleSingleCompression(image);

      compressedImages.push(compressedImage);
    } catch (err) {
      return { err };
    }
  }

  return compressedImages;
};

// Upload images to database
// Return uploaded image URL
export const handleImageUpload = async (images) => {};

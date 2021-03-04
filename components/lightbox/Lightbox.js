import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import LightboxItem from "./LightboxItem";

const Lightbox = ({ open, images, clickedImage, onClose, ...rest }) => {
  const props = { open, ...rest };
  const [currentImage, setImage] = useState(clickedImage);
  const [loadingImage, setLoadingImage] = useState(false);

  const nextImage = () => {
    setLoadingImage(true);
    setImage((prevState) =>
      images.find((image) => {
        if (image.id !== images.length - 1) {
          return image.id === prevState.id + 1;
        } else return image;
      })
    );
  };

  console.log("Lightbox initialized");

  const previousImage = () => {
    setLoadingImage(true);
    setImage((prevState) => {
      const foundItem = images.find((image) => {
        if (prevState.id !== 0) {
          return image.id === prevState.id - 1;
        } else return image;
      });
      return foundItem ? foundItem : prevState;
    });
  };

  const onMouseDown = (e) => {
    console.log(e);
  };

  const onKeyDown = (e) => {
    const key = e.key.toLowerCase();
    switch (key) {
      case "arrowright":
      case "d":
        nextImage();
        break;
      case "arrowleft":
      case "a":
        previousImage();
        break;
    }
  };

  const onImageLoaded = () => {
    setLoadingImage(false);
  };

  useEffect(() => {
    setImage(clickedImage);
    console.log("clickedImage", clickedImage);
    console.log("images", images);
  }, [clickedImage]);

  return currentImage ? (
    <Modal
      {...props}
      center={true}
      onClose={onClose}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      closeIcon={
        <BsPlus className='cancel-filter-icon close-lightbox text-white' />
      }
    >
      <div className='lightbox-container' tabIndex={0} onKeyDown={onKeyDown}>
        <LightboxItem
          image={currentImage}
          onMouseDown={onMouseDown}
          onImageLoaded={onImageLoaded}
        />
        {currentImage.id !== 0 && (
          <FaArrowRight className='arrow arrow-left' onClick={previousImage} />
        )}
        {currentImage.id !== images.length - 1 && (
          <FaArrowLeft className='arrow arrow-right' onClick={nextImage} />
        )}
        <span className='counter'>
          {currentImage.id + 1 + " / " + images.length}
        </span>
      </div>
    </Modal>
  ) : (
    ""
  );
};

export default Lightbox;

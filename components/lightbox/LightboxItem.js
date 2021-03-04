import Image from "next/image";

const LightboxItem = ({ image, onImageLoaded, ...rest }) => (
  <div className='lightbox-item' {...rest}>
    {image ? (
      <>
        <img
          className='lightbox-image'
          src={
            image.lg
              ? image.lg
              : image.url
              ? image.url
              : image.preview
              ? image.preview
              : `https://www.cestujsdetmi.cz/${image.relativeUrl}`
          }
          alt={
            image.description
              ? image.description
              : image.label
              ? image.label
              : `Obrázek hotelu`
          }
          onLoad={onImageLoaded}
        />{" "}
        {image.description && (
          <span className='image-description'>{image.description}</span>
        )}
      </>
    ) : (
      <h1>Loading</h1>
    )}
  </div>
);

export default LightboxItem;

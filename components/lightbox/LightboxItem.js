const LightboxItem = ({ image, onImageLoaded, ...rest }) => {
  return (
    <div className="lightbox-item" {...rest}>
      {image ? (
        <>
          <img
            className="lightbox-image"
            src={image.lg ? image.lg : image.preview}
            alt={image.description}
            onLoad={onImageLoaded}
          />{" "}
          {image.description && (
            <span className="image-description">{image.description}</span>
          )}
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default LightboxItem;

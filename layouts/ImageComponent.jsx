const ImageComponent = ({ src, alt, ...rest }) => {
  return <img src={src} alt={alt} {...rest} />;
};

export default ImageComponent;

export const isEmail = () => {
  return {
    value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
    message: "Zadejte prosím platnou emailou adresu",
  };
};

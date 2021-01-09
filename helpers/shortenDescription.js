export const shortenDescription = (description) => {
  if (description) {
    const splitted = description.split(" ");
    const shorten = splitted.filter((item, index) => index < 17);
    return shorten.join(" ");
  } else {
    return "";
  }
};

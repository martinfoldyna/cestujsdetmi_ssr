import React from "react";
import parse from "html-react-parser";

const AdvertCard = ({ banner }) => {
  return parse(banner.script);
};
export default AdvertCard;

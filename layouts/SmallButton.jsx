import React from "react";
import { FaRegUser } from "react-icons/fa";

const MyComponent = ({
  icon,
  iconColor,
  background,
  color,
  ghost,
  outlineColor = color,
  children,
}) => {
  const Icon = icon;
  return (
    <button
      className={`btn-small-logo d-flex mr-0 align-items-center btn ${
        outlineColor ? `outline-${outlineColor}` : ""
      } text-${color ? color : "grey"} ${ghost ? "ghost" : ""} ${
        background ? `bg-${background}` : ""
      }`}
    >
      <Icon className={`btn-icon ${iconColor ? `text-${iconColor}` : ""}`} />
      <span>{children}</span>
    </button>
  );
};

export default MyComponent;

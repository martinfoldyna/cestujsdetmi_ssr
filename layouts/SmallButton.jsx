import React from "react";
import { FaRegUser } from "react-icons/fa";

const MyComponent = ({
  icon,
  iconColor,
  background,
  color,
  ghost,
  outlineColor = color,
  className,
  children,
}) => {
  const Icon = icon;
  return (
    <button
      className={`btn-small-logo d-flex mr-0 align-items-center btn ${
        outlineColor ? `outline-${outlineColor}` : ""
      } text-${color ? color : "grey"} ${ghost ? "ghost" : ""} ${
        background ? `bg-${background}` : ""
      } ${className ? className : ""}`}
    >
      <Icon className={`btn-icon ${iconColor ? `text-${iconColor}` : ""}`} />
      <span>{children}</span>
    </button>
  );
};

export default MyComponent;

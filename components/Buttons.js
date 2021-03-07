import React from "react";

const Button = ({ children, size, color }) => (
  <div className='button-wrapper'>
    <button className={`btn bg-${color} btn-${size}`}>{children}</button>
  </div>
);

export default Button;

import React, { Fragment } from "react";
import enums from "../../enums";

const Checkbox = React.forwardRef(
  (
    {
      text,
      name,
      errors,
      checked,
      removeErr = false,
      type = "radio",
      color = "blue",
      ...rest
    },
    ref
  ) => {
    return (
      <Fragment>
        <div className='form-item'>
          <label className='checkbox-container'>
            <span className='radio-label text-black'>{text}</span>
            <input
              type={type}
              name={name}
              ref={ref}
              defaultChecked={checked}
              {...rest}
            />
            <span
              className={`checkmark ${color} ${
                type === enums.CHECKBOX.checkbox ? "check" : "round"
              } ${errors && errors[name] ? "border-danger" : ""}`}
            />
          </label>
        </div>
        {!removeErr && (
          <div className='error-wrapper'>
            <p className='error-message'>
              {errors && errors[name] ? errors[name].message : ""}
            </p>
          </div>
        )}
      </Fragment>
    );
  }
);

export default Checkbox;

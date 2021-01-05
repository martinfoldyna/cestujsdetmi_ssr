import React, { Fragment } from "react";

const Input = React.forwardRef(
  (
    { text, name, type = "text", errors, children, objekt, className, ...rest },
    ref
  ) => (
    <Fragment>
      <div className={"form-item " + className}>
        <input
          type={type}
          className={`inputText ${
            errors && errors[name] ? "border-danger" : ""
          }`}
          id={name}
          name={name}
          required
          autoComplete="off"
          ref={ref}
          {...rest}
        />
        <label htmlFor={name} className="floating-label">
          {text}
        </label>
        {children}
      </div>
      {errors && (
        <div className="error-wrapper">
          <p className="error-message">{errors && errors[name]?.message}</p>
        </div>
      )}
    </Fragment>
  )
);

export default Input;

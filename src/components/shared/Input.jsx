import React from "react";
import "../../css/input.css";

function Input(props) {
  const {
    id,
    title,
    errorMessage,
    onChange,
    onBlur,
    isTouched,
    ...inputProps
  } = props;

  const inputClasses = `block w-full border border-gray-300 py-1 ${props.type == "file" ? "px-1": "px-4"} rounded-full ${
    isTouched && errorMessage ? "border-red-500" : ""
  }`;

  return (
    <div className="input-wrapper mb-2">
      <label htmlFor={id} className="">
        {title}
      </label>
      <input
        className={inputClasses}
        {...inputProps}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMessage && isTouched && (
        <p className="ml-3 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default Input;

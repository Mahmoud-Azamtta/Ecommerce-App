import React from "react";

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

  const inputClasses = `block w-full border dark:bg-gray-700 border-gray-300 py-1 file:px-3 file:py-1 file:rounded-l-full file:cursor-pointer file:hover:bg-gray-300 dark:file:bg-transparent dark:file:text-gray-300 dark:file:hover:bg-gray-800 dark:file:border-gray-200 file:transition file:border-0 file:border-r file:mr-3 ${props.type == "file" ? "px-1": "px-4"} rounded-full ${
    isTouched && errorMessage ? "border-red-500" : "dark:border-gray-600"
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

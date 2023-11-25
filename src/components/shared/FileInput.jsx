import { clearConfigCache } from "prettier";
import React, { useRef, useState } from "react";

function FileInput(props) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const [fileName, setFilename] = useState("No file chosen");

  const invalidClass = props.isTouched ? "border-red-500" : "";

  return (
    <div className="mt-4 py-2 flex flex-nowrap items-center relative">
      <label htmlFor={props.id} className="px-4">{props.title}</label>
      <input type="file" className="block w-9/12 opacity-10 absolute right-0 bg-red-500" />
      <div>
        <p className="file-name px-3">Click choose a file...</p>
      </div>
    </div>
  );
}

export default FileInput;

      {/* <input
        ref={fileInputRef}
        type="file"
        className="absolute hidden w-full cursor-pointer rounded-full bg-red-600 opacity-0"
        id={props.id}
        name={props.name}
        onChange={(event) => {
          const file = event.target.files[0];
          if (file) {
            setFilename(file.name);
          }
          props.onChange(event);
        }}
        onBlur={props.onBlur}
      /> */}
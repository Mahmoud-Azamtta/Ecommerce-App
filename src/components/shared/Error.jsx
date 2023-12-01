import React from "react";
import Container from "./Container";

function Error({message}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <img src="/images/confused-emoji.svg" alt="broken link" />
      <h2 className="pl-5 text-5xl">{message}</h2>
    </div>
  );
}

export default Error;

import React from "react";

export default function Container({ children, classes }) {
  const containerClasses = `${classes} mx-4 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-32`;
  return <div className={containerClasses}>{children}</div>;
}

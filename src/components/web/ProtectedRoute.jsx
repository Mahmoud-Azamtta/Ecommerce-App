import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, condition, replacementRoute }) {
  const isConditionMet = condition();

  return (
    isConditionMet 
      ? children
      : <Navigate to={replacementRoute} />
  )
}

export default ProtectedRoute;

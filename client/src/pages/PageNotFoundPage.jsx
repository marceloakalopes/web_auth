import React from "react";
import { Link } from "react-router-dom";

const PageNotFoundPage = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
};

export default PageNotFoundPage;

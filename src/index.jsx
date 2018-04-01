import React from "react";
import ReactDOM from "react-dom";
import App from "../dist/components/app";

ReactDOM.render(
  <App />,
  document.getElementById("app")
);

module.hot.accept();

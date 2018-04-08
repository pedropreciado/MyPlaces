import React from "react";
import ReactDOM from "react-dom";
import App from "../dist/components/app";
import configureStore from "../dist/store/store";

document.addEventListener("DOMContentLoaded", () => {
  let store = configureStore();

  ReactDOM.render(
    <App />,
    document.getElementById("app")
  );


})


module.hot.accept();

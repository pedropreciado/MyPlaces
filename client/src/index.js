
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import configureStore from "./store/store";
import * as PlaceAPIUtil from './utils/place_api_util';

document.addEventListener("DOMContentLoaded", () => {
  let store = configureStore();

  // window.onbeforeunload = function() {
  // return "Session will be lost if you leave the page, are you sure?";
  // };

  const app = document.getElementById("app");

  ReactDOM.render(<App store={store}/>, app);
})

import React from "react";
import ReactDOM from "react-dom";
import App from "../dist/components/app";
import configureStore from "../dist/store/store";
import * as PlaceAPIUtil from '../dist/utils/place_api_util';

document.addEventListener("DOMContentLoaded", () => {
  let store = configureStore();

  window.fetchFavorites = PlaceAPIUtil.fetchFavorites;
  window.fetchPlaces = PlaceAPIUtil.fetchPlaces;

  const app = document.getElementById("app");

  ReactDOM.render(<App store={store}/>, app);
})


module.hot.accept();

import React from 'react';
import { Provider } from 'react-redux';
import getPlaceData from '../utils/google_api_util';
import PlaceIndexContainer from './places/place_index_container';
import { store } from "../store/store";

const App = ({ store }) => {
  <Provider store={store}>
    <PlaceIndexContainer />
  </Provider>
}


export default App;

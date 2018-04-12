import React from 'react';
import { Provider } from 'react-redux';
import PlaceIndexContainer from './places/place_index_container';

const App = ({ store }) => (
  <Provider store={store}>
    <PlaceIndexContainer />
  </Provider>
)


export default App;

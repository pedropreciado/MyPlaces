import React from 'react';
import getPlaceData from '../utils/google_api_util';
import PlaceIndexContainer from './places/place_index_container';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={ store }>
        <PlaceIndexContainer>
      </Provider>
    )
  }
}

export default App;

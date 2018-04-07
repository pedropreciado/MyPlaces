import React from 'react';
import PlaceIndexItem from './place_index_item';

class PlaceIndex extends React.Component {
  contructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>
        PlaceIndex!
        <PlaceIndexItem/>
      </h1>
    )
  }
}

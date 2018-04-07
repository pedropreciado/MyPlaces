import React from 'react';
import PlaceIndexItem from './place_index_item';

class PlaceIndex extends React.Component {
  constructor(props) {
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

export default PlaceIndex;

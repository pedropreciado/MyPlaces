import React from 'react';
import PlaceIndexItem from './place_index_item';

class PlaceIndex extends React.Component {
  constructor(props) {
    super(props);
    console.log('proops: ', props);
  }

  componentWillMount() {
    this.props.fetchFavorites();
  }

  render() {
    return (
      <div>
        PlaceIndex!
        <PlaceIndexItem/>

      </div>
    )
  }
}

export default PlaceIndex;

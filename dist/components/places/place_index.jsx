import React from 'react';
import PlaceIndexItem from './place_index_item';

class PlaceIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchFavorites()
  }

  render() {
    console.log('poops: ', this.props);
    if (!this.props.places.length) {
      return (
        <h1>
          Loading...
        </h1>
      )
    } else {
      return (
        <ul>
          {
            this.props.places.map((place) => {
              
              return (
                <PlaceIndexItem
                  key={place._id}
                  place={place}
                  />
              )
            })
          }
        </ul>
      )
    }
    }

}

export default PlaceIndex;

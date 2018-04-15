import React from 'react';
import PlaceIndexItem from './place_index_item';
import { subscribeToTimer } from '../../utils/socket_api_util';
// import PlaceFormContainer from './place_form_container';

class PlaceIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: props.location
    }

    this.getCurrentPosition = this.getCurrentPosition.bind(this);
  }

  componentWillMount() {
    subscribeToTimer(1000, (err, timestamp) => {
      console.log(timestamp);
    })
    this.props.fetchFavorites();
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      window
        .navigator
        .geolocation
        .getCurrentPosition(resolve, reject)
    })
  }

  render() {
    if (!this.props.places.length) {
      return (
        <h1>
          Loading...
        </h1>
      )
    } else {
      return (
        <div className='place-index'>
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
        </div>
      )
    }
    }

}

export default PlaceIndex;

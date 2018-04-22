import React from 'react';
import PlaceItemOptions from './place_item_options';
import Draggable from 'react-draggable';

class PlaceIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positionY: null,
      style: {
        height: '0%',
        color: 'rgba(33, 33, 33, .3)'
      }
    }

    this.updatePosition = this.updatePosition.bind(this);
  }

  updatePosition(event) {
  }

  componentDidMount() {
    let style = {
      backgroundColor: 'rgba(33, 33, 33, .3)',
      height: `${this.props.place.busyPercentage}%`,
      transition: '2s'
    }

    setTimeout(() => {
      this.setState({style})
    }, 500)
  }

  render() {

    const place = this.props.place;
    let color;
    let isClosed = place.busyPercentage === 0;

    if (isClosed) {
      color = 'red';
    } else {
      color = 'green';
    }
    // onStop={(event) => this.props.handleStop(event.nativeEvent, place.placeid)}


    return (
      <div className={`place-item-${color}`}>
        <div id='place-item-header'>
            <a
              id='delete-place-button'
              onClick={() => this.props.deleteFavorite(place._id)}
              >
              X
            </a>
            <a id='place-name'>{ place.name }</a>
        </div>
        <a>{ place.address}</a>
        <a>{ place.phoneNumber}</a>

        { isClosed ? 'CLOSED' : (
            <div>
            <a>{ place.busyPercentage }% busy</a>
            <div
              id='percentage'
              style={this.state.style}
              >
            </div>
            </div>

          )}
    </div>
    )
  }
}

export default PlaceIndexItem;

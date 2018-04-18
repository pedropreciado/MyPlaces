import React from 'react';
import PlaceItemOptions from './place_item_options';
import Draggable from 'react-draggable';

class PlaceIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positionY: null
    }

    this.updatePosition = this.updatePosition.bind(this);
  }

  updatePosition(event) {
    console.log(event);
    // let positionY = event.offsetY
    // this.setState({
    //   positionY
    // })
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
      <Draggable
        onStart={(event) => this.props.handleDrag(true)}
        onDrag={(event) => this.updatePosition(event.nativeEvent)}
        onStop={(event) => this.props.handleDrag(false)}
        >
      <div className={`place-item-${color}`}>
        <a>{ place.name }</a>
        <a>{ place.address}</a>
        <a>{ place.phoneNumber}</a>
        <a>{ place.busyPercentage }% busy</a>

        <a>{ isClosed ? 'CLOSED' : (
            <div
              id='percentage'
              style={{ height: `${place.busyPercentage}%`}}
              >

            </div>

          )}
        </a>
    </div>
    </Draggable>
    )
  }
}

export default PlaceIndexItem;

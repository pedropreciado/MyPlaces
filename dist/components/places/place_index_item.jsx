import React from 'react';
import PlaceItemOptions from './place_item_options';
import Draggable from 'react-draggable';

class PlaceIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBeingDragged: false
    }
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


    return (
      <Draggable>
      <div className={`place-item-${color}`}>

        <a>{ place.name }</a>
        <br/>
        <a>{ place.address}</a>
        <br/>
        <a>{ place.phoneNumber}</a>
        <a>{ isClosed ? 'CLOSED' : place.busyPercentage }</a>

      </div>
    </Draggable>
    )
  }
}

export default PlaceIndexItem;

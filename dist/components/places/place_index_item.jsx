import React from 'react';
import Modal from 'react-modal';

class PlaceIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
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
      <div className={`place-item-${color}`}>
        <a>{ place.name + ' @' }</a>
        <a>{ place.address}</a>
        <a>{ place.phoneNumber}</a>
        <a>{ isClosed ? 'CLOSED' : place.busyPercentage }</a>
        <div className='plane'>
          <div className='layer'>
          </div>
        </div>
      </div>
    )
  }
}

export default PlaceIndexItem;

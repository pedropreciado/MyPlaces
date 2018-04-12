import React from 'react';

class PlaceIndexItem extends React.Component {
  constructor(props) {
    super(props);
    console.log('poops: ', this.props);
  }

  render() {
    const place = this.props.place;
    let color;

    if (place.isOpen) {
      color = 'green';
    } else {
      color = 'red';
    }



    return (
      <div className={`place-item-${color}`}>
        <a>{ place.name }</a>
        <a>{ place.address}</a>
        <a>{ place.phoneNumber}</a>
      </div>
    )
  }
}

export default PlaceIndexItem;

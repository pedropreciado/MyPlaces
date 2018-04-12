import React from 'react';

class PlaceIndexItem extends React.Component {
  constructor(props) {
    super(props);
    console.log('poops: ', this.props);
  }

  render() {
    let date = new Date();

    const place = this.props.place;
    let color;

    let day = Number(date.getUTCDay())
    let currentHour = date.getHours();


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
        <a>{ place.busyHours.week[day].hours[currentHour]}</a>
      </div>
    )
  }
}

export default PlaceIndexItem;

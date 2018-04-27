import React from 'react';
import PlaceItemOptions from './place_item_options';
import Draggable from 'react-draggable';

// formatAMPM from => https://stackoverflow.com/a/8888498
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

class PlaceIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positionY: null,
      style: {
        height: '0%',
        color: 'rgba(33, 33, 33, .3)'
      },
      mouseStatus: 'left'
    }

    this.renderText = this.renderText.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  setStyle() {
    let style = {
      backgroundColor: 'rgba(33, 33, 33, .3)',
      height: `${this.props.place.busyPercentage}%`,
      transition: '2s',
    }

    setTimeout(() => {
      this.setState({ style })
    }, 500)
  }

  handleHover(mouseStatus) {
    this.setState({ mouseStatus })
  }



  renderText(isClosed) {
    let lastUpdated = this.props.place.lastUpdated;
    let dateObj = new Date(lastUpdated);
    let time = formatAMPM(dateObj);
    let date = dateObj.toDateString();

    if (this.state.mouseStatus === 'entered' && lastUpdated) {
      return (
        <div id='last-updated'>
          <a>{'last updated: '}</a>
          <a>{date}</a>
          <a>{time}</a>
          <a>Click to refresh.</a>
        </div>
      )
    } else {
      return (
        <div id='place-item-initial'>
          <a>{ this.props.place.address }</a>

          <a id='percent-busy'>
            {
              isClosed ? '' :
              this.props.place.busyPercentage
              ? this.props.place.busyPercentage + '% busy'
              : 'Click to see busyPercentage'
            }
          </a>
            {
              isClosed ? 'CLOSED' : (
                <div
                  id='percentage'
                  style={this.state.style}
                  >
                </div>
            )
            }
      </div>
      )
    }
  }

  render() {

    const place = this.props.place;
    let color;
    let isClosed = this.props.place.busyPercentage === 0;

    if (isClosed) {
      color = 'red';
    } else {
      color = 'green';
    }

    return (
        <div
          className={`place-item-${color}`}
          onClick={() => this.props.refresh(place._id)}
          onMouseEnter={() => this.handleHover('entered')}
          onMouseLeave={() => this.handleHover('left')}
          >
          <div id='place-item-header'>
            <a
              id='delete-this.props.place-button'
              onClick={() => this.props.deleteFavorite(this.props.place._id)}
              >
              X
            </a>
            <a id='place-name'>{
                this.props.place.name.length > 12
                ? this.props.place.name.slice(0, 12) + '...'
                : this.props.place.name
              }</a>
          </div>
          {
            this.renderText(isClosed)
          }
        </div>
    )
  }
}

export default PlaceIndexItem;

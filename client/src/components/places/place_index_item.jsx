import React from 'react';
import PlaceItemOptions from './place_item_options';
import Draggable from 'react-draggable';
import TimeFormatter from '../../utils/time_formatter';

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

  componentWillReceiveProps(newProps) {
    if (!newProps.place.busyPercentage) {
      return;
    }

    let style = {
      backgroundColor: 'rgba(33, 33, 33, .3)',
      height: `${newProps.place.busyPercentage}%`,
      transition: '2s'
    }

    this.setState({ style })
  }

  componentWillMount() {
    if (!this.props.place.busyPercentage) {
      return;
    }

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

  renderText(isOpen) {
    let lastUpdated = this.props.place.lastUpdated;
    let dateObj = new Date(lastUpdated);
    let time = TimeFormatter(dateObj);
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
              !isOpen
              ? ''
              : this.props.place.busyPercentage
              ? this.props.place.busyPercentage + '% busy'
              : 'Click to see busyPercentage'
            }
          </a>
            {
              !isOpen
              ? 'CLOSED'
              : (
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
    let isOpen = this.props.place.isOpen;

    if (isOpen) {
      color = 'green';
    } else {
      color = 'red';
    }

    return (
        <div
          className={`place-item-${color}`}
          onClick={(event) => this.props.refresh(place._id)}
          onMouseEnter={() => this.handleHover('entered')}
          onMouseLeave={() => this.handleHover('left')}
          >
          <div id='place-item-header'>
            <a
              id='delete-this.props.place-button'
              onClick={(event) => {
                event.stopPropagation()

                this.props.deleteFavorite(this.props.place._id)
                }}
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
            this.renderText(isOpen)
          }
        </div>
    )
  }
}

export default PlaceIndexItem;

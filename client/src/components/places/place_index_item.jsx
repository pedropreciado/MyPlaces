

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
      },
      mouseStatus: 'left'
    }

    this.renderText = this.renderText.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  componentDidMount() {
    let style = {
      backgroundColor: 'rgba(33, 33, 33, .3)',
      height: `${this.props.place.busyPercentage}%`,
      transition: '2s',
    }

    setTimeout(() => {
      this.setState({style})
    }, 500)
  }

  handleHover(mouseStatus) {
    this.setState({ mouseStatus })
  }

  renderText(isClosed) {
    if (this.state.mouseStatus === 'entered') {
      return (
        this.props.place.lastUpdated
      )
    } else {
      return (
        <div>
          <div id='place-item-header'>
            <a id='place-name'>{ this.props.place.name }</a>
            <a
              id='delete-this.props.place-button'
              onClick={() => this.props.deleteFavorite(this.props.place._id)}
              >
              X
            </a>
          </div>
          <a>{ this.props.place.address }</a>

          <a>
            {
              isClosed ? '' :
              this.props.place.busyPercentage ?
              this.props.place.busyPercentage + '% busy' :
              'getting percentage ...'
            }
          </a>
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
          {
            this.renderText(isClosed)
          }
          { isClosed ? 'CLOSED' : (
            <div
              id='percentage'
              style={this.state.style}
              >
            </div>
        )}
        </div>
    )
  }
}

export default PlaceIndexItem;

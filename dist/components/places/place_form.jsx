import React from 'react';
import FontAwesome from 'react-fontawesome';

class PlaceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      location: props.location,
      requestSent: false
    }

    this.renderCurrentLocation = this.renderCurrentLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchLocation();
  }

  renderCurrentLocation() {
    if (this.props.location === undefined) {
      return (
        <a>
          Getting current location ...
        </a>
      )
    } else {
      return (
        <a>
       Current Location is {this.props.location}
       </a>
      )
    }
  }

  handleChange(name) {
    this.setState({ name, location: this.props.location });
  }

  handleSubmit(event) {
    event.preventDefault();

    let name = this.state.name;
    let location = this.state.location;

    this.props.fetchSearchResults({
      name,
      location
    })
  }

  render() {
    return (
      <div id='form-header'>
        <div
          id='location-container'
          >
        {
          this.renderCurrentLocation()
        }
        </div>

        <form>
          <input
            id='name-searchbox'
            type='text'
            onChange={(event) => this.handleChange(event.target.value)}
            value={this.state.name}
            placeholder='Search for a place'
            />

          <input
            type='submit'
            value='Search'
            onClick={ (event) => this.handleSubmit(event)}
            />
        </form>
      </div>
    )
  }
}

export default PlaceForm;

import React from 'react';
import FontAwesome from 'react-fontawesome';

class PlaceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      error: ''
    }

    this.renderCurrentLocation = this.renderCurrentLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
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

  showError(error) {
    this.setState({ error });

    setTimeout(() => {
      this.setState({ error: '' })
    }, 4000);
  }

  handleChange(name) {
    this.setState({ name });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.location === undefined) {
      this.showError(<div className="error-div">Still seaching for your location! Please wait. 😊 </div>)
      return;
    }

    let name = this.state.name;
    let location = this.props.location;

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

        {
          this.state.error
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

import React from 'react';

class PlaceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      error: '',
      color: '',
      zipcode: ''
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
    if (this.props.locationError) {
      return (
        <form
          id='zipcode-form'
          >
            <input
              id='zipcode-input'
              type='text'
              placeholder='Click here to enter your zipcode'
              value={this.state.zipcode}
              onChange={
                (event) =>
                this.handleChange(event.target.value, 'zipcode')
              }/>
          <input
            type='submit'
            value='submit'
            onClick={(event) => {
              event.preventDefault()

              !this.state.zipcode
              ? this.setState({ error: 'enter zipcode'})
              : this.props.setZipcode(this.state.zipcode)}
            }
              />
        </form>
      )
    }
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
    let input = this.state.name;

    this.setState({
      name: error,
      color: '-red'
     });

    setTimeout(() => {
      this.setState({
        name: input,
        color: ''
       })
    }, 2000);
  }

  handleChange(value, type = 'name') {
    this.setState({ [type]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.location === undefined) {
      this.showError('Searching for your location!  😊')
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
            id={`name-searchbox${this.state.color}`}
            type='text'
            onChange={(event) => this.handleChange(event.target.value)}
            value={this.state.name}
            placeholder='Search for a place'
            />

          <input
            className='session-submit'
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

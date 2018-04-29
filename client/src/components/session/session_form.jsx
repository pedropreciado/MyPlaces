import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formType: 'login',
      email: '',
      username: '',
      password: '',
      passwordConf: '',
      loginemail: '',
      loginpassword: '',
      errors: props.errors
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.formType === 'signup') {
      let user = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        passwordConf: this.state.passwordConf
      }

      this.props.signup(user)
    } else {
      let user = {
        loginemail: this.state.loginemail,
        loginpassword: this.state.loginpassword
      }

      this.props.login(user);
    }
    this.props.history.push('/places');
  }

  toggleForm(event) {
    event.preventDefault();

    this.setState({ formType: event.target.value})
  }

  renderForm() {
    if (this.state.formType === 'signup') {
      return (
        <div id='inputs'>
          <input
            className='session-input'
            type='text'
            onChange={(event) =>
              this.handleChange('email', event.target.value)
            }
            value={this.state.email}
            placeholder='email'
            />

          <input
            className='session-input'
            type='text'
            onChange={(event) => {
              this.handleChange('username', event.target.value)
            }}
            value={this.state.username}
            placeholder='username'
            />

          <input
            className='session-input'
            type='password'
            onChange={(event) => {
              this.handleChange('password', event.target.value)
            }}
            value={this.state.password}
            placeholder='password'
            />

          <input
            className='session-input'
            type='password'
            onChange={(event) => {
              this.handleChange('passwordConf', event.target.value)
            }}
            value={this.state.passwordConf}
            placeholder='retype password'
            />
        </div>
      )
    } else {
      return (
        <div id='inputs'>
          <input
            className='session-input'
            type='text'
            onChange={(event) =>
              this.handleChange('loginemail', event.target.value)
            }
            value={this.state.loginemail}
            placeholder='email'
            />

          <input
            className='session-input'
            type='password'
            onChange={(event) => {
              this.handleChange('loginpassword', event.target.value)
            }}
            value={this.state.loginpassword }
            placeholder='password'
            />
        </div>
      )
    }
  }

  render() {
    let formType = this.state.formType;

    return (
      <div id='session-container'>
        <form id='session-form' autoComplete='off'>
          <h1 id='session-title'>yooshe</h1>
          <a style={{ color: 'red' }}>
            {
              this.props.errors
            }
          </a>
          {
            this.renderForm()
          }
          <input
            className='session-submit'
            type='submit'
            onClick={(event) => this.handleSubmit(event)}
            value={formType}
            />
          or
          <input
            className='session-submit'
            type='submit'
            onClick={(event) => this.toggleForm(event)}
            value={formType === 'login' ? 'signup' : 'login'}
            />
        </form>
      </div>
    )
  }
}

export default SessionForm;

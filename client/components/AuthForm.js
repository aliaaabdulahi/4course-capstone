import React from 'react';
import {connect} from 'react-redux';
import {authenticate} from '../store';
import Button from '@material-ui/core/Button';

/**
 * COMPONENT
 */
class AuthForm extends React.Component {
  constructor (props) {
    super (props);
    this.state = {email: '', username: '', password: ''}
    this.handleSubmit = this.handleSubmit.bind (this);
    this.handleChange = this.handleChange.bind (this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit (evt) {
    evt.preventDefault ();
    const email = this.state.email;
    const username = this.state.username;
    const password = this.state.password;
    this.props.authenticate(email, username, password, this.props.name);
  }

  render () {
    const {name, displayName, error} = this.props;
    return (
      <div className="begin-search yellow-font login-box">
        <form name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="email" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" onChange={this.handleChange} />
          </div>
          <div>
            <Button
              className="buttons"
              type="submit"
              variant="contained"
              onClick={this.handleSubmit}
            >
              {displayName}
            </Button>
          </div>

          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

export const Login = connect (mapLogin, {authenticate}) (AuthForm);
export const Signup = connect (mapSignup, {authenticate}) (AuthForm);

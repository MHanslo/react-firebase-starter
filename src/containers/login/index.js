/*
 *
 * Login Page
 *
 *
*/

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { loginButtonClicked } from './actions';

class login extends React.Component {
  static propTypes = {
    onFormSubmit: React.PropTypes.func,
    loading: React.PropTypes.bool,
    emailError: React.PropTypes.string,
    passwordError: React.PropTypes.string
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.loginButtonClicked(this.state.email, this.state.password);
  }

  render() {
    return (
      <section className="hero is-medium is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Sign In</h1>
          <div className="box">
              <form onSubmit={this.onFormSubmit}>
                <Input label="Email" placeholder="Email" type="text" hasError={this.props.emailError} onChange={this.handleEmailChange} />
                <Input label="Password" placeholder="Password" type="password" hasError={this.props.passwordError} onChange={this.handlePasswordChange} />
                <div className="control">
                  <Button type="submit" isFullwidth isPrimary isLoading={this.props.loading}>Sign in</Button>
                </div>
              </form>
          </div>
          <p className="has-text-centered">Dont have an account? <Link style={{ color: '#fff', textDecoration: 'underline' }} to="/signup">Sign Up For Free</Link></p>
        </div>
      </div>
    </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.login.isAuthenticating,
    emailError: state.login.emailError,
    passwordError: state.login.passwordError
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginButtonClicked }, dispatch);
};

const Login = connect(mapStateToProps, mapDispatchToProps)(login);

export default Login;

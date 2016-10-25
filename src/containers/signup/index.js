/*
 *
 * SignIn Page
 *
 *
*/

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { signupButtonClicked } from './actions';

class signIn extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool,
    onSubmitForm: React.PropTypes.func,
    emailError: React.PropTypes.string,
    passwordError: React.PropTypes.string
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    this.props.signupButtonClicked(this.state.email, this.state.password);
  }

  render() {
    return (
      <section className="hero is-medium is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Sign Up</h1>
          <div className="box">
            <form onSubmit={this.onSubmitForm}>
              <Input label="Email" placeholder="Email" type="text" hasError={this.props.emailError} onChange={this.handleEmailChange} />
              <Input label="Password" placeholder="Password" type="password" hasError={this.props.passwordError} onChange={this.handlePasswordChange} />
              <Button type="submit" isPrimary isLoading={this.props.loading}>Registration</Button>
            </form>
          </div>
          <p className="has-text-centered">Already have an account? <Link style={{ color: '#fff', textDecoration: 'underline' }} to="/login">Sign in</Link></p>
        </div>
      </div>
    </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.signup.isAuthenticating,
    emailError: state.signup.emailError,
    passwordError: state.signup.passwordError
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signupButtonClicked }, dispatch);
};

const SignIn = connect(mapStateToProps, mapDispatchToProps)(signIn);

export default SignIn;

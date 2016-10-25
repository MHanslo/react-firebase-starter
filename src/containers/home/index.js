/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
*/

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../../components/Button';
import { logoutAndRedirect } from '../login/actions';

class home extends React.Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">This is the Homepage!</h1>
          <Button isPrimary onClick={this.props.logoutAndRedirect}>Logout</Button>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logoutAndRedirect }, dispatch);
};

const Home = connect(null, mapDispatchToProps)(home);

export default Home;

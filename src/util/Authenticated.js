import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const Authenticated = ({ component: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
     authenticated === true ? <Redirect to="/"/> : <Component {... props}/>
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});


Authenticated.prototype = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Authenticated);

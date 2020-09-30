import React, { Component } from "react";
import { Link } from "react-router-dom";


//MUI stuff

import AppBar from "@material-ui/core/AppBar";
import Tolbar from "@material-ui/core/Toolbar";
import { Button } from "@material-ui/core";


class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Tolbar style={{margin: 'auto'}}>
          <Button style={{fontSize: '12px'}}>Office Man</Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
        </Tolbar>
      </AppBar>
    );
  }
}

export default Navbar;

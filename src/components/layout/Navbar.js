import React, { Component, Fragment } from "react";
import AddOffice from "../officeProfile/AddOffice";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";
//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Tolbar from "@material-ui/core/Toolbar";
import { Button } from "@material-ui/core";
//Icons
import HomeIcon from "@material-ui/icons/Home";


class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Tolbar style={{ margin: "auto" }}>
          <Button style={{ color: "white" }}>Office Man</Button>
          <Fragment>
            <AddOffice />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon style={{ color: "white" }} />
              </MyButton>
            </Link>
          </Fragment>
        </Tolbar>
      </AppBar>
    );
  }
}

export default Navbar;

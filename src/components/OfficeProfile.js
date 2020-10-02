import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
//MUI staff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

//Icons
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip'
//Redux staff
import { connect } from "react-redux";

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80",
        left: "70",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "yellow",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    tetAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

export class OfficeProfile extends Component {
  render() {
    const { classes, loading } = this.props;
    let profileMarkup = !loading ? (
      <Paper>
        <Typography variant="body2" align="center">
          In the future you will need to register before accessing this page!
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
        <Tooltip title="Logout" placeholder="top">
          <IconButton>
            <KeyboardReturn color="primary"></KeyboardReturn>
          </IconButton>
        </Tooltip>
      </Paper>
    ) : (
      <p>loading...</p>
    );
    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  office: state.office,
});

OfficeProfile.propTypes = {
  office: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(OfficeProfile));

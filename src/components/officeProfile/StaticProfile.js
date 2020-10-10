import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
///Own components
import AddStaff from "./AddStaff";
import Staffs from "./Staffs";
//MUI stuff
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  ...theme.spreadThis,
  officeIamge: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 10,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expendButton: {
    position: "absolute",
    left: "88%",
    top: "40%",
  },
  officeDes: {
    color: "white",
  },
  backButton: {
    color: "#fff",
  },
});

const StaticProfile = (props) => {
  const {
    classes,
    officeProfile: {
      officeName,
      officeLocation,
      officeEmail,
      officeTellNumber,
      officeMaxOcupant,
      officeId,
      staffs,
    },
  } = props;

  function handleReturn() {
    window.location.replace("/");
  }
  return (
    <Grid container>
      <Grid item sm={4} style={{ backgroundColor: "#0dccff" }}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/manageofficeproj-23044.appspot.com/o/offceDefaultColor.jpg?alt=media"
          alt="office image"
          className={classes.officeIamge}
        />
      </Grid>
      <Grid sm={2} style={{ backgroundColor: "#0dccff" }}>
        <Tooltip title="Go back" placement="top">
          <IconButton onClick={handleReturn}>
            <KeyboardBackspaceIcon className={classes.backButton} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item sm={6} style={{ backgroundColor: "#0dccff" }}>
        <Typography
          className={classes.officeDes}
          color="primary"
          variant="h6"
          to={`/offices/${officeName}`}
        >
          {officeName}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.officeDes}
        >
          Address: {officeLocation}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.officeDes}
        >
          Email: {officeEmail}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.officeDes}
        >
          Office Tell: {officeTellNumber}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.officeDes}
        >
          Max Capacity: {officeMaxOcupant}
        </Typography>
      </Grid>
      <hr className={classes.invisibleSeparator} />
      <AddStaff officeId={officeId} />
      <Staffs staffs={staffs} />
    </Grid>
  );
};

StaticProfile.propTypes = {
  officeProfile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);

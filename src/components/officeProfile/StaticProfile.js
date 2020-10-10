import React from "react";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import withStyles from "@material-ui/core/styles/withStyles";
///Own components
import AddStaff from "./AddStaff";
import Staffs from "./Staffs";
//MUI stuff
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
      staffsMember,
      officeId,
      staffs,
    },
  } = props;
  return (
    <Grid container>
      <Grid item sm={5} style={{ backgroundColor: "#0dccff"}}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/manageofficeproj-23044.appspot.com/o/offceDefaultColor.jpg?alt=media"
          alt="office image"
          className={classes.officeIamge}
        />
      </Grid>
      <Grid item sm={7} style={{ backgroundColor: "#0dccff" }}>
        <Typography
          className={classes.officeDes}
          component={Link}
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

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { FaUserFriends } from "react-icons/fa";
import EditOffice from "../office/EditOffice";
import DeleteOffice from "../officeProfile/DeleteOffice";
import OfficeView from "../officeProfile/OfficeView";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";
//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = (theme) => ({
  typography: {
    useNextVariants: true,
  },
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
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
        color: "#00bcd4",
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
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

const StaticProfile = (props) => {
  const {
    classes,
    officeDetails: {
      officeName,
      officeLocation,
      officeEmail,
      officeTellNumber,
      officeMaxOcupant,
      officeColor,
    },
  } = props;
  return (
    <Fragment>
      <Card className={classes.card}>
        <Grid item xs={1}>
          <FaUserFriends className={classes.imageStyle} />
        </Grid>
        <Grid item xm={1}>
          <Typography className={classes.officeMember}>
            07/{officeMaxOcupant}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <CardContent className={classes.content}>
            <Typography
              variant="h6"
              color="primary"
              className={classes.officeName}
            >
              {officeName}
            </Typography>
            <Typography variant="body2" className={classes.officename}>
              <FaMapMarkerAlt /> {officeLocation}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <FaEnvelope /> {officeEmail}
            </Typography>
            <Typography variant="body2" className={classes.tellnumber}>
              <FaPhoneSquare /> {officeTellNumber}
            </Typography>
            <Typography variant="body2" className={classes.officeOcupant}>
              {" "}
              <FaUserFriends /> {officeMaxOcupant}
            </Typography>
          </CardContent>
          <Grid item sm={1}>
            <OfficeView  />
          </Grid>
        </Grid>
        <Grid item xs={1} style={{ marginLeft: "352px" }}>
          <EditOffice />
        </Grid>
        <Grid item xs={1}>
          <DeleteOffice />
        </Grid>
      </Card>
    </Fragment>
  );
};

StaticProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);

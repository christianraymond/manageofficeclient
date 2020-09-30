import React, { Component } from "react";
import EditOffice from './EditOffice';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
//Icons/

//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    height: 150,
  },
  imageStyle: {
    minWidth: 50,
    objectFit: "cover",
    fontSize: 50,
    backgroundColor: "DarkCyan",
    width: "10%",

    height: 150,
    borderRadius: "4px 0 0 4px",
    color: "white",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    padding: 25,
  },
  officeName: {
    fontWeight: "bold",
  },
  officename: {
    color: "gray",
    fontSize: 14,
  },
  tellnumber: {
    color: "MediumSeaGreen",
    fontSize: 14,
  },
};
export class Offices extends Component {
  render() {
    const {
      classes,
      office: {
        officeName,
        officeLocation,
        officeEmail,
        officeTellNumber,
        officeMaxOcupant,
      },
    } = this.props;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <Grid item xs={1}>
            <FaUserFriends className={classes.imageStyle} />
          </Grid>
          <Grid iem xm={1}>
          <Typography>04/{officeMaxOcupant}</Typography>
          </Grid>
          <Grid item xs={4}>
            <CardContent className={classes.content}>
              <Typography
                variant="h6"
                component={Link}
                to={`/offices/${officeName}`}
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
          </Grid>
          <Grid item xs={1}>
            <EditOffice/>
          </Grid>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Offices);

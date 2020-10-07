import React, { Component } from "react";
import PropTypes from "prop-types";
import EditOffice from "../office/EditOffice";
import DeleteOffice from "../officeProfile/DeleteOffice";
import OfficeView from "../officeProfile/OfficeView";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

//MUI stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
    height: 150,
    backgroundColor: 'Cornsilk',
  },
  cardContent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  imageStyle: {
    minWidth: 50,
    backgroundColor: "MediumTurquoise",
    width: "10%",
    fontSize: 50,
    height: 150,
    borderRadius: "4px 0 0 4px",
    color: "white",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  officeMember: {
    position: "absolute",
    bottom: "10%",
    top: "100px",
    left: "4px",
    color: "white",
    fontSize: 15,
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
        officeId,
        staffsMember,
      },
    } = this.props;
    return (
      <React.Fragment>
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
            <CardContent
              className={classes.content}
              className={classes.cardContent}
            >
              <Typography variant="h6" color="primary" className={classes.officeName}>
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
              <OfficeView officeId={officeId} />
            </Grid>
          </Grid>
          <Grid item xs={1} style={{ marginLeft: "352px" }}>
            <EditOffice />
          </Grid>
          <Grid item xs={1}>
            <DeleteOffice officeId={officeId} />
          </Grid>
        </Card>
      </React.Fragment>
    );
  }
}

Offices.prototypes = {
  office: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Offices);

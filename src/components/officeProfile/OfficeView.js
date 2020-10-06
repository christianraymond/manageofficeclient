import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";
import Staffs from "./Staffs";
//Mui stuff
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
//Icon
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

//Redux stuff
import { connect } from "react-redux";
import { viewOffice } from "../../redux/actions/dataAction";

const styles = (theme) => ({
  ...theme.spreadThis,
  officeIamge: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
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
});

export class OfficeView extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true});
    this.props.viewOffice(this.props.officeId); //Send the request to the server to get theh specified office
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const {
      classes,
      office: {
        officeName,
        officeLocation,
        officeEmail,
        officeTellNumber,
        officeMaxOcupant,
        staffs
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress size={30} />
    ) : (
      <Grid container>
        <Grid item sm={5}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/manageofficeproj-23044.appspot.com/o/offceDefaultColor.jpg?alt=media"
            alt="office image"
            className={classes.officeIamge}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h6"
            to={`/offices/${officeName}`}
          >
          {officeName}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1" color="textSecondary">
            Address: {officeLocation}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Email: {officeEmail}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Office Tell: {officeTellNumber}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Max Capacity: {officeMaxOcupant}
          </Typography>
        </Grid>
        <hr className={classes.invisibleSeparator}/>
        <Staffs staffs={staffs}/>
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand office"
          tipClassName={classes.expendButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

OfficeView.propTypes = {
  viewOffice: PropTypes.func.isRequired,
  officeId: PropTypes.string.isRequired,
  office: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  office: state.data.office,
  UI: state.UI,
});

const mapActionsToProps = {
  viewOffice,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(OfficeView));

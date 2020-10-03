import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
//Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
///MUI Icons
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
//Redux stuff
import { connect } from "react-redux";
import { editOfficeDetails } from "../redux/actions/officeAction";

const styles = (theme) => ({
  ...theme.spreadThis,
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "3%",
  }
});

export class EditOffice extends Component {
  state = {
    officename: "",
    officeEmail: "",
    officeTell: "",
    officeAddress: "",
    officeMaxOcupant: "",
    open: false,
  };
  mapUserDetailsTopState = (officeDetails) => {
    this.setState({
      officename: officeDetails.officename ? officeDetails.officename : "",
      officeEmail: officeDetails.officeEmail ? officeDetails.officeEmail : "",
      officeTell: officeDetails.officeTell ? officeDetails.officeTell : "",
      officeAddress: officeDetails.officeAddress
        ? officeDetails.officeAddress
        : "",
      officeMaxOcupant: officeDetails.officeMaxOcupant
        ? officeDetails.officeMaxOcupant
        : "",
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsTopState(this.props.officeDetails);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { officeDetails } = this.props;
    this.mapUserDetailsTopState(officeDetails);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = () => {
    const editedOfficeDetails = {
      officename: this.state.officename,
      officeEmail: this.state.officeEmail,
      officeTell: this.state.officeTell,
      officeAddress: this.state.officeAddress,
      officeMaxOcupant: this.state.officeMaxOcupant,
    };
    this.props.editOfficeDetails(editedOfficeDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Eidt office details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          style={{ height: "50" }}
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle style={{ textAlign: "center", color: "slategray" }}>
            Edit Office
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="officename"
                type="text"
                label="Office Name"
                rows="3"
                placeholder="office name"
                className={classes.TextField}
                value={this.state.officename}
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                name="officeEmail"
                type="text"
                label="Office Email"
                rows="3"
                placeholder="office Email"
                className={classes.TextField}
                value={this.state.officeEmail}
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                name="officeTell"
                type="text"
                label="Office Tell"
                rows="3"
                placeholder="office Tell"
                className={classes.TextField}
                value={this.state.officeTell}
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                name="officeAddress"
                type="text"
                label="Office Address"
                rows="3"
                placeholder="office Address"
                className={classes.TextField}
                value={this.state.officeAddress}
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                name="officeMaxOcupant"
                type="text"
                label="Max number of occupants"
                rows="3"
                placeholder="Max number of occupants"
                className={classes.TextField}
                value={this.state.officeMaxOcupant}
                fullWidth
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <Grid container justify="center">
            <Grid item>
              <DialogActions>
                <Button onClick={this.handleSubmit} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>
      </Fragment>
    );
  }
}

EditOffice.propTypes = {
  editOfficeDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  officeDetails: state.office.officeDetails,
});

export default connect(mapStateToProps, { editOfficeDetails })(
  withStyles(styles)(EditOffice)
);

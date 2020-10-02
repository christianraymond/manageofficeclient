import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
//Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
//Redux stuff
import { connect } from "react-redux";
import { addOffice } from "../redux/actions/dataAction";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: 'relative',
  },
  progressSpinner: {
    padding: '60 5 10 5'
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "3%",
  },
});
class AddOffice extends Component {
  state = {
    open: false,
    officeName: "",
    officeEmail: "",
    officeTellNumber: "",
    officeLocation: "",
    staffMaxOcupant: "",
    officeColor: "",
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    //Close the dialogue and return to initial state
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        officeName: "",
        officeEmail: "",
        officeTellNumber: "",
        officeLocation: "",
        staffMaxOcupant: "",
        officeColor: "",
      });
      this.handleClose();
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, errors: {} }); //Clear out the error when dialog is closed.
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addOffice({
      officeName: this.state.officeName,
      officeEmail: this.state.officeEmail,
      officeTellNumber: this.state.officeTellNumber,
      officeLocation: this.state.officeLocation,
      staffMaxOcupant: this.state.staffMaxOcupant,
    });
  };
  render() {
    const { errors } = this.state;
    const { classes, UI, loading } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Create a new office">
          <AddIcon style={{ color: "white" }} />
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
          <DialogTitle>Add Office</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="officeName"
                type="text"
                label="Office"
                multiline
                row="3"
                placeholder="Office name"
                errors={errors.officeName ? true : false}
                helperText={errors.officeName}
                className={classes.TextField}
                onChange={this.handleChange}
                fullWidth
              />
               <TextField
                name="officeEmail"
                type="text"
                label="Email Address"
                multiline
                row="3"
                placeholder="Email Address"
                errors={errors.officeEmail ? true : false}
                helperText={errors.officeEmail}
                className={classes.TextField}
                onChange={this.handleChange}
                fullWidth
              />
               <TextField
                name="officeTellNumber"
                type="text"
                label="Email Address"
                multiline
                row="3"
                placeholder="Office tell"
                errors={errors.officeTellNumber ? true : false}
                helperText={errors.officeTellNumber}
                className={classes.TextField}
                onChange={this.handleChange}
                fullWidth
              />
               <TextField
                name="officeLocation"
                type="text"
                label="Address"
                multiline
                row="3"
                placeholder="Address"
                errors={errors.officeLocation ? true : false}
                helperText={errors.officeLocation}
                className={classes.TextField}
                onChange={this.handleChange}
                fullWidth
              />
               <TextField
                name="staffMaxOcupant"
                type="text"
                label="Max number of occupants"
                multiline
                row="3"
                placeholder="Address"
                errors={errors.staffMaxOcupant ? true : false}
                helperText={errors.staffMaxOcupant}
                className={classes.TextField}
                onChange={this.handleChange}
                fullWidth
              /><br/>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Save Office
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

AddOffice.propTypes = {
  addOffice: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { addOffice })(
  withStyles(styles)(AddOffice)
);

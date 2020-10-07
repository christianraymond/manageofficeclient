import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
//MUI stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux stuff
import { connect } from "react-redux";
import { deleteOffice } from "../../redux/actions/dataAction";

const styles = {
  deleteButton: {
    marginTop: "22px",
  },
};

class DeleteOffice extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteOffice = () => {
    this.props.deleteOffice(this.props.officeId);
    this.setState({ open: false });
  };
  render() {
    const { classes, loading } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete office"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <span>
              <h1>Remove office</h1>
            </span>
            Are you sure you want to{" "}
            <span style={{ color: "red" }}>remove</span> this office ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteOffice} color="secondary">
              Remove
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteOffice.prototypes = {
  deleteOffice: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  officeId: PropTypes.string.isRequired,
};

export default connect(null, { deleteOffice })(
  withStyles(styles)(DeleteOffice)
);

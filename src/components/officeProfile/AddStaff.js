import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import withStyles from "@material-ui/styles/withStyles";
import PropTypes from "prop-types";
//MUI stuff
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//Icons
import CloseIcon from "@material-ui/icons/Close";
//Redux stuff
import { connect } from "react-redux";
import { addStaff } from "../../redux/actions/dataAction";

const styles = (theme) => ({
  ...theme.spreadThis,

  closeButton: {
    position: "absolute",
    left: "91%",
    top: "3%",
  },
});
export class AddStaff extends Component {
  state = {
    open: false,
    errors: {},
    firstName: "",
    lastName: ""
  };

  //Handle errors
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  hanldeSubmit = (e) => {
    e.preventDefault();
    this.props.addStaff(this.props.officeId, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
  };
  render() {
    const { classes, loading } = this.props;
    const errors = this.state.errors;
    return (
      <Grid container>
        <Grid item sm={4}>
          <Typography variant="body2">Staff Member</Typography>
        </Grid>
        <Grid item sm={8}>
          <Button variant="outlined" color="default" onClick={this.handleOpen}>
            Add Staff
          </Button>
        </Grid>

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
          <DialogTitle style={{ textAlign: "center", color: "slategray" }}>
            Add Staff
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.hanldeSubmit}>
              <TextField
                autoFocus
                marging="dense"
                margin="dense"
                name="firstName"
                label="First Name"
                type="text"
                required
                fullWidth
                className={classes.textField}
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                name="lastName"
                label="Last Name"
                type="text"
                required
                fullWidth
                className={classes.textField}
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              <Grid container justify="center">
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    disabled={loading}
                  >
                    Add Staff
                    {loading && (
                      <CircularProgress
                        size={30}
                        className={classes.progressSpinner}
                      />
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
            <hr className={classes.visibleSeparator} />
          </DialogContent>
        </Dialog>
      </Grid>
    );
  }
}

AddStaff.propTypes = {
  addStaff: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  officeId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { addStaff })(
  withStyles(styles)(AddStaff)
);

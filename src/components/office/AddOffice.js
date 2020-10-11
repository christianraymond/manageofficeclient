import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
//Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close"
import Grid from "@material-ui/core/Grid";
//Redux stuff
import { connect } from "react-redux";
import { addOffice } from "../../redux/actions/dataAction";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    justifyContent: "center",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  progressSpinner: {
    padding: "60 5 10 5",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "3%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    margin: "8px 5px 10px",
    padding: "5px 0 20px",
  },
});
class AddOffice extends Component {
  state = {
    open: false,
    officeName: "",
    officeLocation: "",
    officeEmail: "",
    officeTellNumber: "",
    officeMaxOcupant: "",
    officeColor: "",
    errors: {},
    select: "select",
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
        officeMaxOcupant: "",
        officeColor: "",
      });
      this.handleClose();
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
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
      officeMaxOcupant: this.state.officeMaxOcupant,
      officeColor: this.state.officeColor,
    });
    this.setState({ loading: true });
  };
  render() {
    const { errors } = this.state;
    const { classes, UI, loading } = this.props;
    const options = [
      "Black",
      "Orange",
      "Blue",
      "White",
    ];
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

          <div className={classes.centeredForm}>
            <DialogTitle style={{ textAlign: "center", color: "slategray" }}>
              Add Office
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  name="officeName"
                  type="text"
                  label="Office Name"
                  multiline
                  row="3"
                  placeholder="Office Name"
                  errors={errors.officeName ? true : undefined}
                  helperText={errors.officeName}
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
                <TextField
                  name="officeEmail"
                  type="text"
                  label="Email Address"
                  multiline
                  row="3"
                  placeholder="Email Address"
                  errors={errors.officeEmail ? true : undefined}
                  helperText={errors.officeEmail}
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
                <TextField
                  name="officeTellNumber"
                  type="text"
                  label="Office Tell"
                  multiline
                  row="3"
                  placeholder="Office Tell"
                  errors={errors.officeTellNumber ? true : undefined}
                  helperText={errors.officeTellNumber}
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
                <TextField
                  name="officeLocation"
                  type="text"
                  label="Office Address"
                  multiline
                  row="3"
                  placeholder="Office Address"
                  errors={errors.officeLocation ? true : undefined}
                  helperText={errors.officeLocation}
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
                <TextField
                  name="officeMaxOcupant"
                  type="number"
                  label="Max number of occupants"
                  multiline
                  row="3"
                  placeholder="Max number of occupants"
                  errors={errors.officeMaxOcupant ? true : undefined}
                  helperText={errors.officeMaxOcupant}
                  className={classes.textField}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
                
                  <label htmlFor="officeColor">Office color</label>
                  <select
                    value={this.state.value}
                    // onChange={this.handleClose}
                  >
                    {options.map((option) => {
                      return (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                <Grid container justify="center">
                  <Grid item>
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
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
          </div>
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

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//MUI staff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
//Icons
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
//Redux stuff
import { connect } from "react-redux";
import { editeOfficeDetails } from "../redux/actions/officeAction";

const styles = (theme) => ({
  ...theme,
});

export class EditOffice extends Component {
  state = {
    officename: "",
    officelocation: "",
    officeTell: "",
    officeEmal: "",
    open: false,
  };
  mapOfficeDetailsToState = (officeDetails) => {

  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapOfficeDetailsToState(this.props.officeDetails);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { officeDetails } = this.props;
    this.mapOfficeDetailsToState(officeDetails);
  }
  handleChange = (event) => {
      this.setState({
          [event.target.name]: event.target.value
      })
  };
  handleSubmit = () => {
      const detailsTobeChanged = {
          officename: this.state.officename,
          officelocation: this.state.officelocation,
          officeTell: this.state.officeTell,
          officeEmal: this.state.officeEmal
      };
      this.props.editeOfficeDetails(detailsTobeChanged);
      this.handleClose();
  }
  render() {
      const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit office" placement="top">
          <IconButton onClick={this.handleOpen} >
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.state.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit office details</DialogTitle>
          <DialogContent>
              <form>
                  <TextField
                   name="office-name"
                   type="text"
                   lable="Office name"
                   multiline
                   rows="3"
                   placeholder="Office name"
                 
                   value={this.state.officename}
                   onChange={this.handleChange}
                   fullWidth
                   />
                    <TextField
                   name="office location"
                   type="text"
                   lable="Office location"
                   multiline
                   rows="3"
                   placeholder="Office location"
                
                   value={this.state.officelocation}
                   onChange={this.handleChange}
                   fullWidth
                   />
                    <TextField
                   name="office-email"
                   type="text"
                   lable="Office email"
                   multiline
                   rows="3"
                   placeholder="Office email"
                  
                   value={this.state.officeEmal}
                   onChange={this.handleChange}
                   fullWidth
                   />
                    <TextField
                   name="office-phone"
                   type="text"
                   lable="Office phone"
                   multiline
                   rows="3"
                   placeholder="Office phone"
                  
                   value={this.state.officeTell}
                   onChange={this.handleChange}
                   fullWidth
                   />
              </form>
          </DialogContent>
          <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                  Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                  Save
              </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditOffice.propTypes = {
  editeOfficeDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  officeDetails: state.user.officeDetails,
});
export default EditOffice;

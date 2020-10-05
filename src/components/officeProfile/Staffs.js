import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import submitStaff from "../../redux/actions/dataAction";
import PropTypes from "prop-types";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.spreadThis,
});
class Staff extends Component {
  stuffsMember = () => {
    if (
      this.props.officeName.staffsMember &&
      this.props.officeName.staffsMember.find(
        (staffsMember) => staffsMember.officeId === this.props.office.officeId
      )
    )
      return true;
    else return false;
  };
  render() {
    const { staffsMember, classes } = this.props;
    return (
      <Grid container>
        {staffsMember.map((staff) => {
          const { officeName } = staff;
          return (
            <Fragment key={officeName}>
              <Grid item sm>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.staffList}
                >
                  {officeName}
                </Typography>
              </Grid>
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}
export default withStyles(styles)(Staff);

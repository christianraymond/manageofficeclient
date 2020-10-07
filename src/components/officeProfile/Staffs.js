import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import PropTypes from "prop-types";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//Icons
import PersonIcon from "@material-ui/icons/Person";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";

const styles = (theme) => ({
  ...theme.spreadThis,

  staffIcons: {
    color: "white",
    backgroundColor: "MediumTurquoise",
  },
});
class Staffs extends Component {
  render() {
    const { staffs, classes } = this.props;
    return (
      <Grid container>
        <hr className={classes.visibleSeparator} />
        {staffs.map((staff, index) => {
          console.log(staffs);
          return (
            <Fragment key={index}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={1}>
                    <PersonIcon className={classes.staffIcons} />
                  </Grid>
                  <Grid item sm={10}>
                    <Typography variant="body1">
                      {staff.staffName} {staff.lastName}
                    </Typography>
                  </Grid>
                  <Grid item sm={1}>
                    <MoreVertOutlinedIcon className={classes.addEtedIcon} />
                  </Grid>
                </Grid>
              </Grid>
              {index !== staffs.length - 1 && (
                <hr className={classes.visibleSeparator} /> //Show rulerLine unless it's the last index
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Staffs.propTypes = {
  staffs: PropTypes.array.isRequired,
};

export default withStyles(styles)(Staffs);

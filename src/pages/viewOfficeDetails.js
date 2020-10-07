import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Offices from "../components/officeProfile/Offices";
import StaticProfile from "../components/office/StaticProfile";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { viewOfficeDetails } from "../redux/actions/dataAction";

class ViewOfficeDetails extends Component {
  state = {
    officeDetails: null,
  };
  componentDidMount() {
    const officeName = this.props.match.params.officeName;
    this.props.viewOfficeDetails(officeName);
    axios
      .get(`/office/${officeName}`)
      .then((res) => {
        this.setState({
          officeDetails: res.data.office,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { offices, loading } = this.props.data;
    const officesMarkup = loading ? (
      <p>Loading data...</p>
    ) : (
      offices.map((office) => <Offices key={office.officeId} office={office} />)
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xm={12}>
          {officesMarkup}
        </Grid>
        <Grid item sm={4} xm={12}>
          <StaticProfile officeDetails={this.state.officeDetails} />
        </Grid>
      </Grid>
    );
  }
}

ViewOfficeDetails.propTypes = {
  viewOfficeDetails: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { viewOfficeDetails })(
  ViewOfficeDetails
);

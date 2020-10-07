import React, { Component } from "react";
import StaticProfile from '../components/officeProfile/StaticProfile';
import PropTypes from "prop-types";
import axios from "axios";
import Offices from "../components/officeProfile/Offices";
import Grid from "@material-ui/core/Grid";

//Redux stuff
import { connect } from "react-redux";
import { viewOfficeDetails } from "../redux/actions/dataAction";

class officeview extends Component {
  state = {
    profile: null,
  };
  componentDidMount() {
    const officeId = this.props.match.params.officeId;
    this.props.viewOfficeDetails(officeId);
    axios.get(`/office/${officeId}`).then((res) => {
      this.setState({
        profile: res.data.officeName,
      }).catch((err) => console.log(err));
    });
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
         { this.state.profile === null ? (
             <p>Loading office...</p>
         ): ( <StaticProfile profile={this.state.profile} />)}
        </Grid>
      </Grid>
    );
  }
}

officeview.propTypes = {
  viewOfficeDetails: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { viewOfficeDetails })(officeview);

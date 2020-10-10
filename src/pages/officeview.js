import React, { Component } from "react";
import StaticProfile from "../components/officeProfile/StaticProfile";
import PropTypes from "prop-types";
import axios from "axios";
import Offices from "../components/officeProfile/Offices";
import Grid from "@material-ui/core/Grid";

//Redux stuff
import { connect } from "react-redux";
import { viewOffice } from "../redux/actions/dataAction";

class officeview extends Component {
  state = {
    officeProfile: null,
  };
  componentDidMount() {
    const officeId = this.props.match.params.officeId;
    try {
      this.props.viewOffice(officeId);
      axios.get(`/office/${officeId}`).then((res) => {
        console.log("SHow me the data ", res.data);
        this.setState({
          officeProfile: res.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { offices, loading } = this.props.data;

    const officesMarkup = loading ? (
      <p>Loading data...</p>
    ) : (
      offices.map((office) => {
        return <Offices key={office.officeId} office={office} />;
      })
    );
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item sm={8} xm={12}>
            {this.state.officeProfile === null ? (
              <p>Loading office...</p>
            ) : (
              <StaticProfile officeProfile={this.state.officeProfile} />
            )}
          </Grid>
          <Grid item sm={4} xm={12}>
            {officesMarkup}
          </Grid>
        </Grid>
        {this.props.children}
      </div>
    );
  }
}

officeview.propTypes = {
  viewOffice: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { viewOffice })(officeview);

import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import Offices from "../components/officeProfile/Offices";
import RegisterOffice from "../components/office/RegisterOffice";

class Home extends Component {
  state = {
    offices: null,
  };

  componentDidMount() {
    axios
      .get("/offices")
      .then((res) => {
        console.log("server returns", res.data);
        this.setState({
          offices: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let recentOfficesMarkup = this.state.offices ? (
      this.state.offices.map((office, index) => (
        <Offices key={index} office={office} />
      ))
    ) : (
      <CircularProgress size={50} color="secondary" />
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xm={12}>
          {recentOfficesMarkup}
        </Grid>
        <Grid item sm={4} xm={12}>
          <RegisterOffice />
        </Grid>
      </Grid>
    );
  }
}

export default Home;

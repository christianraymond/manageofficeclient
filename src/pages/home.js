import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress'

import Offices from '../components/Offices';
import OfficeProfile from '../components/OfficeProfile'

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
      this.state.offices.map((office, index) => <Offices key={index} office={office}/>)
    ) : (
      <CircularProgress size={50} color="secondary"/>
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xm={12}>
          {recentOfficesMarkup}
        </Grid>
        <Grid item sm={4} xm={12}>
          <OfficeProfile/>
        </Grid>
      </Grid>
    );
  }
}

export default Home;


//Redux implimentation not rendering OFFICES. Bug to fix later. 

// import React, { Component } from "react";
// import Grid from "@material-ui/core/Grid";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import PropTypes from "prop-types";
// import Offices from "../components/Offices";
// import OfficeProfile from "../components/OfficeProfile";
// //Redux stuff
// import { connect } from "react-redux";
// import { getOffices } from "../redux/actions/dataAction";

// class Home extends Component {
//   componentDidMount() {
//     this.props.getOffices();
//   }
//   render() {
//     const { offices, loading } = this.props.data;
//     let recentOfficesMarkup = loading ? (
//       offices.map((office) => <Offices key={office.officeId} office={office} />)
//     ) : (
//       <CircularProgress size={50} color="secondary" />
//     );
//     return (
//       <Grid container spacing={4}>
//         <Grid item sm={8} xm={12}>
//           {recentOfficesMarkup}
//           {console.log('Hello', recentOfficesMarkup)}
//         </Grid>
//         <Grid item sm={4} xm={12}>
//           <OfficeProfile />
//         </Grid>
//       </Grid>
//     );
//   }
// }

// Home.propTypes = {
//   getOffices: PropTypes.func.isRequired,
//   data: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   data: state.data,
// });

// export default connect(mapStateToProps, { getOffices })(Home);

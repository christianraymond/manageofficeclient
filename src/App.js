import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import themeFile from "./util/theme";
import jwt from "jwt-decode";
import { MuiThemeProvider } from "@material-ui/core/styles";
// import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//Redux
import { Provider } from 'react-redux'
import store from "./redux/store";
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userAtion'
//Component
import Navbar from "./components/Navbar";
//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import Authenticated from "./util/Authenticated";
import axios from "axios";

const token = localStorage.FBIdToken;
if (token) {
  const decodeToken = jwt(token);
  console.log(decodeToken);
  if (token.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href("/login");
  }else{
    store.dispatch({ type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  } 
}

const theme = createMuiTheme(themeFile);
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Authenticated
                path="/login"
                component={login}
              />
              <Authenticated
                path="/signup"
                component={signup}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

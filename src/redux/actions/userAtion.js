import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from "../types";
import axios from 'axios';


export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-manageofficeproj-23044.cloudfunctions.net/api/signup",newUserData 
    )
    .then((response) => {
      console.log(response.data);
      setAuthorizationHeader(response.data.token)
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS});
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        palyload: err.response.data
      })
    });
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-manageofficeproj-23044.cloudfunctions.net/api/login",userData 
    )
    .then((response) => {
      console.log(response.data);
      setAuthorizationHeader(response.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS});
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        palyload: err.response.data
      })
    });
};

///clear token from user when logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED}); 
}

export const getUserData = () => (dispatch) => {
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//Help function for
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.default.header.common["Authorization"] = FBIdToken;
}

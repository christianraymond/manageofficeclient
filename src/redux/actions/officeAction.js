import { SET_OFFICE, LOADING_OFFICE, CLEAR_ERRORS, SET_ERRORS, SET_USER, LOADING_UI } from "../types";
import axios from 'axios';


export const createSingleOffice = (newOffice, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-manageofficeproj-23044.cloudfunctions.net/api/office", newOffice 
    )
    .then((response) => {
      console.log(response.data);
      dispatch(getOfficeData());
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

export const getOfficeData = () => (dispatch) => {
 dispatch({ type: LOADING_OFFICE});
  axios
    .get("/offices")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const editeOfficeDetails = (officeDetails) => (dispatch) => {
  dispatch({ type: LOADING_OFFICE});
  axios.post('/office', officeDetails)
  .then(() => {
    dispatch(getOfficeData())
  })
  .catch(err => console.log(err));
}



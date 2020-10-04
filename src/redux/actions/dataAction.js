import {
  SET_OFFICE,
  LOADING_DATA,
  DELETE_OFFICE,
  ADD_OFFICE,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";

//Get all office
export const getOffices = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/offices")
    .then((res) => {
      console.log("the server returns", res.data);
      dispatch({
        type: SET_OFFICE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_OFFICE,
        payload: [],
      });
    });
};

//Delete Office action func
export const deleteOffice = (officeId) => (dispatch) => {
  axios
    .delete(`/office/${officeId}`)
    .then(() => {
      dispatch({ type: DELETE_OFFICE, payload: officeId });
      window.location.reload()
    })
    .catch((err) => console.log(err));
};

//Add a new office
export const addOffice = (newOffice) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-manageofficeproj-23044.cloudfunctions.net/api/office", newOffice)
    .then((res) => {
      dispatch({
        type: ADD_OFFICE,
        payload: res.data,
      });
      dispatch(CLEAR_ERRORS);
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.data,
      });
    });
};

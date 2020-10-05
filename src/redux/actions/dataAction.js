import {
  SET_OFFICE,
  LOADING_DATA,
  DELETE_OFFICE,
  ADD_OFFICE,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  LOADING_OFFICE,
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
//Add a new office
export const addOffice = (newOffice) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(
      "https://us-central1-manageofficeproj-23044.cloudfunctions.net/api/office",
      newOffice
    )
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
//Edit office
export const editOfficeDetails = (officeDetails, id) => (dispatch) => {
  dispatch({ type: LOADING_OFFICE });
  axios
    .post("https://us-central1-manageofficeproj-23044.cloudfunctions.net/api/office", officeDetails)
    .then(() => {
      dispatch(getOffices());
    })
    .catch((err) => {
      console.log(err);
      if (!err.response) {
        //network error
        err.message = "Erro: Netword";
        console.log(err.message);
      } else if (err.code === "ENCONSBORTED") {
        console.log("Timout");
      }
      dispatch({
        type: SET_ERRORS,
        payload: err.message,
      });
    });
};
//Delete Office action func
export const deleteOffice = (officeId) => (dispatch) => {
  axios
    .delete(`/office/${officeId}`)
    .then(() => {
      dispatch({ type: DELETE_OFFICE, payload: officeId });
      window.location.reload();
    })
    .catch((err) => console.log(err));
};

//View office
export const viewOffice = (officeId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`https://us-central1-manageofficeproj-23044.cloudfunctions.net/api/office/${officeId}`)
    .then((res) => {
      dispatch({
        type: SET_OFFICE,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};



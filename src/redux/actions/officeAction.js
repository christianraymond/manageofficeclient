import {
  SET_OFFICE,
  LOADING_OFFICE,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
} from "../types";
import axios from "axios";

export const createSingleOffice = (newOffice, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/office", newOffice)
    .then((response) => {
      console.log(response.data);
      dispatch(getOfficeData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        palyload: err.response.data,
      });
    });
};

export const getOfficeData = () => (dispatch) => {
  dispatch({ type: LOADING_OFFICE });
  axios
    .get("/offices")
    .then((res) => {
      dispatch({
        type: SET_OFFICE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const editOfficeDetails = (officeDetails, id) => (dispatch) => {
  dispatch({ type: LOADING_OFFICE });
  axios
    .post("https://us-central1-manageofficeproj-23044.cloudfunctions.net/api/office", officeDetails)
    .then(() => {
      dispatch(getOfficeData());
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

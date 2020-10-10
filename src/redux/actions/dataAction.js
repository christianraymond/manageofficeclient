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
  ADD_STAFF,
  SET_OFFICES,
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
    .post("/office", newOffice)
    .then((res) => {
      dispatch({
        type: ADD_OFFICE,
        payload: res.data,
      });
      window.location.reload();
      dispatch(CLEAR_ERRORS);
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.data,
      });
    });
};
//ADD NEW STAFF MEMEBER
export const addStaff = (officeId, newStaff) => (dispatch) => {
  axios
    .post(`/office/${officeId}/newStaff`, newStaff)
    .then((res) => {
      dispatch({
        type: ADD_STAFF,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//Edit office
export const editOfficeDetails = (officeDetails) => (dispatch) => {
  dispatch({ type: LOADING_OFFICE });
  axios
    .post("/office", officeDetails)
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
    .get(`/office/${officeId}`)
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

//Todo,
///VIEW OFFICE IN A DINAMIC PAGE
// export const viewOfficeDetails = (officeId) => (dispatch) => {
//   dispatch({ type: LOADING_DATA });
//   axios
//     .get(`/office/${officeId}`)
//     .then((res) => {
//       dispatch({
//         type: SET_OFFICES,
//         payload: res.data.offices,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: SET_OFFICES,
//         payload: null,
//       });
//     });
// };
//Clear erros func
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

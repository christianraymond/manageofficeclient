import { SET_OFFICE, LOADING_DATA, DELETE_OFFICE } from '../types';
import axios from 'axios';

//Get all office
export const getOffices = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/offices')
     .then(res => {
         console.log('the server returns', res.data)
         dispatch({
             type: SET_OFFICE,
             payload: res.data
         })
     })
     .catch(err => {
         console.log(err)
         dispatch({
             type: SET_OFFICE,
             payload: []
         })
     })
}

//Delete Office action func
export const deleteOffice = (officeId) => (dispatch) => {
    axios.delete(`https://us-central1-manageofficeproj-23044.cloudfunctions.net/api/office/${officeId}`)
    .then(() => {
        dispatch({ type: DELETE_OFFICE, payload: officeId})
    })
    .catch(err => console.log(err))
}
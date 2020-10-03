//THis file handle every old actions relate to data.
import { SET_OFFICES, LOADING_DATA, DELETE_OFFICE, ADD_OFFICE, LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from "../types";

const initialState = {
  offices: [],
  office: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_OFFICES:
      return {
        ...state,
        offfices: action.payload,
        loading: false,
      };
    case DELETE_OFFICE:
      let index = state.offices.findIndex(
          (office) => office.officeId === action.payload.officeId);
          state.offices.splice(index, 1)
          return {
              ...state
          }
      case ADD_OFFICE:
        return {
          ...state,
          offices: [
            action.payload,
            ...state.offices
          ]
        }    
    default: {
      return state;
    }
  }
}

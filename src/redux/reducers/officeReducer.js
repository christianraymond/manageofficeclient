import { SET_OFFICE, LOADING_OFFICE } from "../types";

const initialState = {
  loading: false,
  officeDetails: {},
  staffs: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_OFFICE:
      return {
        loading: false,
      };
    case LOADING_OFFICE:
      return {
        ...state,
        loading: true,
      };
    default: {
      return state;
    }
  }
}

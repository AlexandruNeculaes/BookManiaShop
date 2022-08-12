import * as actionType from "../constants/actionTypes";

//auth reducer to set the state data for authentication
const authReducer = (state = { authData: null }, action) => {
  console.log(action);
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    case actionType.AUTH_ERROR:
      return { ...state, errors: action.message };
    default:
      return state;
  }
};

export default authReducer;

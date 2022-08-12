import { AUTH, AUTH_ERROR } from "../constants/actionTypes";
import * as api from "../api/index.js";

//function for signin and dispatching the data to the reducers
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      message: "Something went wrong! Please try again",
    });
  }
};

//function for signup and dispatching the data to the reducers
export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      message: "Something went wrong! Please try again",
    });
  }
};

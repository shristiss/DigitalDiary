import * as api from "../api";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    //login user
    const { data } =await  api.signIn(formData);
    dispatch({ type: 'AUTH', data });
    navigate('/');
  } catch (error) { 
    console.log(error.response.data);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    // sign up user
    const { data } = await  api.signUp(formData);
    console.log(data)
    dispatch({ type: 'AUTH', data });
    navigate('/');
  } catch (error) {
    console.log(error.response.data);
  }
};

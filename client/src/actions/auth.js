import * as api from "../api";


export const signin = (formData, history) => async(dispatch)  =>{
try {
    //login user

    history.push('/')
} catch (error) {
    console.log(error)
}
}

export const signup = () => async (dispatch) => {
    try {
        // sign up user
        history.push('/')
    } catch (error) {
        console.log(error)   
    }
}

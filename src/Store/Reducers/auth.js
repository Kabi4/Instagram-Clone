import * as actionTypes from './../actionTypes';

const initialState = {
    authenticated: false,
    error: false,
    loading: false,
    displayName: null
}

const authReducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SIGNINSTARTED:
            return{
                ...state,
                loading: true
            }
        case actionTypes.SIGNINSUCCESS:
            return{
                ...state,
                authenticated: true,
                error: false,
                loading: false,
                displayName: action.payload.name
            };
        case actionTypes.SIGNINFAILED:
            return{
                ...state,
                error: action.payload.message,
                loading: false
            };
        case actionTypes.LOGOUT:
            return{
                ...state,
                authenticated: false,
                error: false,
                loading: false,
                displayName: null
            }
        default:
            return state;
    }
};

export default authReducer;
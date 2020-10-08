import * as actionTypes from './../actionTypes';

import {auth} from './../../Firebase/Firebase';



const logoutAccount = ()=>{
    return{
        type: actionTypes.LOGOUT
    }
}

export const logout = ()=>{
    return dispatch=>{
        auth.signOut();
       dispatch(logoutAccount());
    }
};

export const AUTH__SUCCESS = (name) =>{
    return{
        type: actionTypes.SIGNINSUCCESS,
        payload: {
            name
        }
    }
};

const AUTH__FAILED = (message)=>{
    return{
        type: actionTypes.SIGNINFAILED,
        payload:{
            message: message
        }
    }
}

const AUTH__STARTED = ()=>{
    return{
        type: actionTypes.SIGNINSTARTED
    }
}

export const authenticate = (email,password,isSignup,name)=>{
    return dispatch=>{
        dispatch(AUTH__STARTED());
        if(isSignup){
            auth.createUserWithEmailAndPassword(email,password)
            .then(authUser=>{
                dispatch(AUTH__SUCCESS(name));
                authUser.user.updateProfile({
                    displayName: name                
                })
            })
            .catch(err=>{
                if(err.message){dispatch(AUTH__FAILED(err.message));}else{
                    dispatch(AUTH__FAILED("NETWORK ERROR"));
                }});
        }else{
            auth.signInWithEmailAndPassword(email,password)
            .catch(err=>{
                if(err.message){dispatch(AUTH__FAILED(err.message));}else{
                    dispatch(AUTH__FAILED("NETWORK ERROR"));
                }});
        }
    }
}
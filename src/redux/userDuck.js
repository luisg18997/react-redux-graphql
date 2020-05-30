import { loginWithGoogle, signOutGoogle } from "../firebase";
import { retrieveFavsAction, restoreFavsAction } from "./charsDuck";

//constast
let initialState = {
    fetching: false,
    loggedIn: false
}

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGOUT = 'LOGOUT';

//reducer
export default function reducer(state=initialState, action){
    switch(action.type){
        case LOGIN:
            return {...state, fetching: true}
        case LOGIN_ERROR:
            return {...state, fetching: false, error: action.payload}
        case LOGIN_SUCCESS:
            if(state.error) {
                delete state.error
            }
            return {...state, fetching:false, loggedIn:true, ...action.payload}
        case LOGOUT:
            return {...initialState}
        default:
            return state
    }
}


//aux
let saveStorage = (storage) => {
    localStorage.storage = JSON.stringify(storage)
}

//action (action creator)
export let logoutAction = () => (dispacth) => {
    signOutGoogle()
    dispacth({
        type: LOGOUT
    })
    localStorage.removeItem('storage');
}

export let restoreSessionAction = () => (dispacth) => {
    let storage = localStorage.getItem('storage');
    storage = JSON.parse(storage)
    if(storage) {
        dispacth({
            type: LOGIN_SUCCESS,
            payload: storage
        })
        restoreFavsAction()(dispacth)
    }
    
}

export let doGoogleLoginAction = () => (dispacth, getState) => {
    dispacth({
        type: LOGIN
    })
    return loginWithGoogle()
    .then(user => {
        dispacth({
            type: LOGIN_SUCCESS,
            payload: {uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL}
        })
        saveStorage(getState().user)
        retrieveFavsAction()(dispacth,getState);
    })
    .catch((err) => {
        dispacth({
            type: LOGIN_ERROR,
            payload: err.message
        })
    })
}

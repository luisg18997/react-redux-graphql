import { updateDB, getFavs } from "../firebase";
import { gql } from 'apollo-boost';
import client from '../graphql/client'
//constanst
let initalState = {
    fetching: false,
    characters: [],
    favorites: []
}


let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";
let REMOVE_CHARACTER = 'REMOVE_CHARACTER'
let ADD_FAVORITE = 'ADD_FAVORITE'
let GET_FAVS = 'GET_FAVS';
let GET_FAVS_SUCCESS ='GET_FAVS_SUCCESS'
let GET_FAVS_ERROR = 'GET_FAVS_ERROR';

//reducers
export default function reducer(state=initalState, action) {
    switch(action.type){
        case GET_CHARACTERS:
            return {...state, fetching: true}
        case GET_CHARACTERS_ERROR:
            return {...state, fetching:false, error: action.payload}
        case GET_CHARACTERS_SUCCESS:
            return {...state, fetching:false, characters: action.payload}
        case REMOVE_CHARACTER:
            return {...state, characters: action.payload}
        case ADD_FAVORITE: 
            return {...state, ...action.payload}
        case GET_FAVS:
            return {...state, fetching: true}
        case GET_FAVS_SUCCESS:
            return {...state, favorites: action.payload}
        case GET_FAVS_ERROR:
            return {...state, fetching:false, error: action.payload}
        default:
            return state;
    }
}

//aux
let saveFavs = (favs) => {
    localStorage.setItem('favs',JSON.stringify(favs))
}

//actions (thunks)
export let restoreFavsAction = () => (dispacth) => {
    let favs = JSON.parse(localStorage.getItem('favs'));
    if(favs) {
        dispacth({
            type: GET_FAVS_SUCCESS,
            payload: favs
        })
    }
}

export let retrieveFavsAction = () =>(dispatch, getState) => {
    let {uid} = getState().user 
    dispatch({type: GET_FAVS})
    getFavs(uid)
    .then(data => {
        dispatch({type: GET_FAVS_SUCCESS, payload: [...data]})
        saveFavs(getState().characters.favorites)
    })
    .catch(err =>{
        dispatch({type: GET_FAVS_ERROR, payload: err.message})
    })
}

export let addFavoritesAction = () => (dispatch, getState) => {
    let {characters, favorites} = getState().characters;
    let {uid} = getState().user
    let char = characters.shift()
    favorites.push(char)
    updateDB(favorites, uid)
    dispatch({
        type: ADD_FAVORITE,
        payload: {favorites: [...favorites], characters: [...characters]}
    })
    saveFavs(getState().characters.favorites)
} 


export let removeCharacterAction = () => (dispatch, getState) => {
    let {characters} = getState().characters
    characters.shift();
    dispatch({
        type: REMOVE_CHARACTER,
        payload: [...characters]
    })
}

export let getCharacterAction = () => (dispatch, getState) => {
    let query = gql`
        {
            characters {
                results{
                image
                name
                }
            }
        }
    `;
    dispatch({
        type: GET_CHARACTERS
    })

    return client.query({query})
    .then(({data, error}) => {
        if(error){
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: data.characters.results
            })
            return
        }
        dispatch({
            type: GET_CHARACTERS_SUCCESS,
            payload: data.characters.results
        })
    })
}

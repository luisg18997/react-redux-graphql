import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import userReducer, {restoreSessionAction} from './userDuck';
import charsReducer, {getCharacterAction} from './charsDuck';

let rootReducer = combineReducers({
    user: userReducer,
    characters: charsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function generateStore(){
    let store = createStore(rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
    );
    getCharacterAction()(store.dispatch, store.getState)
    restoreSessionAction()(store.dispatch);
    return store;
}
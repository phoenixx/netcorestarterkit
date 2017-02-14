import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { setLocale, getLocale, receiveLocale, SET_LOCALE, GET_LOCALE, RECEIVE_LOCALE } from '../actions/locale';

const selectedLocale = (state = 'en-GB', action) => {
    switch (action.type) {
    case SET_LOCALE:
        return action.locale;
    default:
        return state;
    }
};




//http://redux.js.org/docs/advanced/AsyncActions.html
const store = createStore({}, applyMiddleware(thunkMiddleware));

//const locale = (state = {}, action) => {
//    switch (action.type) {
//        case 'GET_LOCALE':

//    }
//}
import fetch from 'isomorphic-fetch';

export const SET_LOCALE = "SET_LOCALE";
export const GET_LOCALE = "GET_LOCALE";
export const RECEIVE_LOCALE = "RECEIVE_LOCALE";

export const setLocale = (locale) => {
    return {
        type: SET_LOCALE,
        locale: locale
    }
}

export const getLocale = () => {
    return {
        type: GET_LOCALE,
        loaded: false
    }
}

export const receiveLocale = (json) => {
    return {
        type: RECEIVE_LOCALE,
        locale: json.locale,
        loaded: true
    }
}

function fetchLocale() {
    return function (dispatch) {
        //let app know we're getting the locale
        dispatch(getLocale);
        //todo => consider error handling ...
        return fetch('/user/locale')
            .then(response => response.json())
            .then(json => {
                dispatch(receiveLocale(json));
            });
    }
}
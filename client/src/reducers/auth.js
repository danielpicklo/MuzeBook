import {REGISTER_SUCCESS, REGISTER_FAILURE, USER_LOAD, AUTH_ERR, LOGIN_FAIL, LOGIN_SUCCESS} from '../actions/constants';

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initState, action){
    const {type, payload} = action;
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {...state, ...payload, isAuthenticated: true, loading: false};
        case REGISTER_FAILURE:
        case AUTH_ERR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {...state, token: null, isAuthenticated: false, loading: false};
        case USER_LOAD:
            return {...state, isAuthenticated: true, loading: false, user: payload}; 
        default:
            return state;
    }
}
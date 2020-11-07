import {REGISTER_SUCCESS, USER_LOAD, AUTH_ERR, LOGIN_SUCCESS, LOGOUT_USER, CLR_PROFILE} from '../actions/constants';

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function (state = initState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case USER_LOAD:
            return {...state, isAuthenticated: true, loading: false, user: payload};
        case REGISTER_SUCCESS:
            return {...state, ...payload, isAuthenticated: true, loading: false};
        case LOGIN_SUCCESS:
            return {...state, ...payload, isAuthenticated: true, loading: false};
        case AUTH_ERR:
        case LOGOUT_USER:
            return {...state, token: null, isAuthenticated: false, loading: false, user: null};
        case CLR_PROFILE:
            return {...state, profile:null, loading:false};
        default:
            return state;
    }
}
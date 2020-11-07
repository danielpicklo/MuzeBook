import axios from 'axios';
import {setAlert} from './alert';
import {REGISTER_SUCCESS, REGISTER_FAILURE, USER_LOAD, AUTH_ERR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_USER, CLR_PROFILE} from './constants';

export const loadUser = () => async dispatch => {
   try {
      const res = await axios.get('/api/auth');
  
      dispatch({
        type: USER_LOAD,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERR
      });
    }
};

export const register = formData => async dispatch => {
    try {
      const res = await axios.post('/api/users', formData);
  
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: REGISTER_FAILURE
      });
    }
};
  
export const login = (email, password) => async dispatch => {
    const body = { email, password };
  
    try {
      const res = await axios.post('/api/auth', body);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: LOGIN_FAIL
      });
    }
};
  
export const logout = () => dispatch => {
    dispatch({type: CLR_PROFILE});
    dispatch({type: LOGOUT_USER});
};
import axios from 'axios';
import { setAlert } from './alert';
import {PROFILE_ERROR, GET_PROFILE} from './constants';

export const getCurrentProfile = () => async dispatch => {
  try {
      const res = await axios.get('/api/profile/me');
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
      const res = await axios.post('/api/profile', formData);
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
      history.push('/dashboard');
      
    } catch (err) {
      const errors = err.response.data.errors;
      
      console.log(err.message);

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
};
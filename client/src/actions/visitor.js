import axios from 'axios';
import { setAlert } from './alert';

import {
  CLEAR_VISITOR,
  GET_VISITOR,
  GET_VISITORS,
  VISITOR_ERROR,
  CHANGE_SEARCH_FIELD
} from './types';

// Get current users profile
export const getCurrentVisitor = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/visitor/me');

    dispatch({
      type: GET_VISITOR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_VISITOR });
    dispatch({
      type: VISITOR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all visitor
export const getAllVisitors = () => async (dispatch) => {
  dispatch({ type: CLEAR_VISITOR });
  try {
    const res = await axios.get('/api/visitor');

    
    dispatch({
      type: GET_VISITORS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VISITOR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get visitor by ID
export const getVisitorById = (visitorId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/visitor/${visitorId}`);
    dispatch({
      type: GET_VISITOR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VISITOR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or Update user visitor
export const createVisitor = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/visitor', formData);

    dispatch({
      type: GET_VISITOR,
      payload: res.data,
    });

    dispatch(setAlert('Visitor Created', 'success'));
    history.push('/register_visitor'); // Q: redirect to search visitors or add a new visitor?
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: VISITOR_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Change search Field
export const setSearchField = (text) => {
  return {
    type: CHANGE_SEARCH_FIELD,
    payload: text,
  };
};

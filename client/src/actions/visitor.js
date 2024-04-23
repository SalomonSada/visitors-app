import axios from 'axios';
import { setAlert } from './alert';

import {
  CLEAR_VISITOR,
  GET_VISITOR,
  GET_VISITORS,
  VISITOR_ERROR,
  CHANGE_SEARCH_FIELD,
  CHANGE_SEARCH_FIELD2,
} from './types';

// Get current visitor
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
  try {
    const res = await axios.get('/api/visitor');

    // console.log(res.data[0].name);

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

// Create visitor
export const createVisitor =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/api/visitor', formData);

      dispatch({
        type: GET_VISITOR,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Visitor Updated' : 'Visitor Created', 'success')
      );

      if (!edit) {
        history.push('/register_visitor'); // Q: redirect to search visitors or add a new visitor?
      } else {
        history.push('/visitors');
      }
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

// delete visitor
export const deleteVisitor = (id) => async (dispatch) => {
  if (window.confirm('¿Estas seguro? ¡¡Esto no puede deshacerse!!')) {
    try {
      const res = await axios.delete(`/api/visitor/${id}`);

      dispatch({
        type: GET_VISITOR,
        payload: res.data,
      });

      dispatch(setAlert('Visitor Removed', 'danger'));
      window.location.reload();
    } catch (err) {
      dispatch({
        type: VISITOR_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Change search Field
export const setSearchField = (text) => {
  return {
    type: CHANGE_SEARCH_FIELD,
    payload: text,
  };
};

// Change search Field 2
export const setSearchField2 = (text) => {
  return {
    type: CHANGE_SEARCH_FIELD2,
    payload: text,
  };
};

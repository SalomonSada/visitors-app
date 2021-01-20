import {
  GET_VISITOR,
  GET_VISITORS,
  VISITOR_ERROR,
  CLEAR_VISITOR,
  CHANGE_SEARCH_FIELD,
  CHANGE_SEARCH_FIELD2,
} from '../actions/types';

const initialState = {
  visitor: null,
  visitors: [],
  loading: true,
  searchField: '',
  searchFieldToDate: '',
};

export default function visitor(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VISITOR:
      // case UPDATE_VISITOR:
      return {
        ...state,
        visitor: payload,
        loading: false,
      };

    case GET_VISITORS:
      return {
        ...state,
        visitors: payload,
        loading: false,
      };

    case CHANGE_SEARCH_FIELD:
      return { ...state, searchField: payload };

    case CHANGE_SEARCH_FIELD2:
      return { ...state, searchFieldToDate: payload };

    case VISITOR_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEAR_VISITOR:
      return {
        ...state,
        visitor: null,
        loading: false,
      };

    default:
      return state;
  }
}

import {
  GET_VISITOR,
  GET_VISITORS,
  VISITOR_ERROR,
  CLEAR_VISITOR,
} from '../actions/types';

const initialState = {
  visitor: null,
  visitors: [],
  loading: true,
};

export default function visitor(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VISITOR:
      // case UPDATE_PROFILE:
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

    case VISITOR_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEAR_VISITOR:
      return {
        ...state,
        profile: null,
        loading: false,
      };

    default:
      return state;
  }
}

import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import visitor from './visitor';
export default combineReducers({ alert, auth, visitor });

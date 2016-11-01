import { combineReducers } from 'redux';

import user from './userReducer'
import session from './authReducer'

export default combineReducers({
  user,
  session,
});

import { combineReducers } from 'redux';

import users from './userReducer'
import session from './authReducer'

export default combineReducers({
  users,
  session,
});

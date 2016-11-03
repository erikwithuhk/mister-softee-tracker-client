import { combineReducers } from 'redux';

import user from './userReducer'
import session from './authReducer'
import vendor from './vendorReducer'

export default combineReducers({
  user,
  session,
  vendor,
});

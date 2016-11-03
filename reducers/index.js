import { combineReducers } from 'redux';

import user from './userReducer'
import session from './authReducer'
import map from './mapReducer'
import vendor from './vendorReducer'

export default combineReducers({
  user,
  session,
  map,
  vendor,
});

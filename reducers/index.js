import { combineReducers } from 'redux';

import customer from './customerReducer'
import map from './mapReducer'
import session from './authReducer'
import user from './userReducer'
import vendor from './vendorReducer'

export default combineReducers({
  customer,
  map,
  session,
  user,
  vendor,
});

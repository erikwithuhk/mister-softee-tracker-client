import axios from 'axios';
import { apiRequest } from '../services/APIRequest';

const vendorsPath = 'https://mister-softee-tracker-api.herokuapp.com/api/v1/vendors';

export function fetchVendors() {
  return {
    type: 'FETCH_VENDORS',
    payload: apiRequest.get(vendorsPath),
  };
}

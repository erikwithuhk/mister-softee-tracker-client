import axios from 'axios';
import { apiRequest } from '../services/APIRequest';

const vendorsPath = 'http://localhost:3000/api/v1/vendors';

export function fetchVendors() {
  return {
    type: 'FETCH_VENDORS',
    payload: apiRequest.get(vendorsPath),
  };
}

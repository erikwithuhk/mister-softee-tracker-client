import axios from 'axios';
import { apiRequest } from '../services/APIRequest';

const vendorsPath = 'https://mister-softee-tracker-api.herokuapp.com/api/v1/vendors';

export function fetchVendors() {
  return {
    type: 'FETCH_VENDORS',
    payload: apiRequest.get(vendorsPath),
  };
}

export function fetchVendorRequests(vendorID) {
  console.log(`${vendorsPath}/${vendorID}/requests`);
  return {
    type: 'FETCH_VENDOR_REQUESTS',
    payload: apiRequest.get(`${vendorsPath}/${vendorID}/requests`),
  }
}

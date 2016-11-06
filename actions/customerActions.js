import axios from 'axios';
import { apiRequest } from '../services/APIRequest';

const customersPath = 'https://mister-softee-tracker-api.herokuapp.com/api/v1/customers';

export function fetchCustomers() {
  return {
    type: 'FETCH_CUSTOMERS',
    payload: apiRequest.get(customersPath),
  };
}

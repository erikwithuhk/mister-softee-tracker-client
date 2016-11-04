import axios from 'axios';
import { apiRequest } from '../services/APIRequest';

const customersPath = 'http://localhost:3000/api/v1/customers';

export function fetchCustomers() {
  return {
    type: 'FETCH_CUSTOMERS',
    payload: apiRequest.get(customersPath),
  };
}

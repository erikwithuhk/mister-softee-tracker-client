const initialState = {
  customers: [],
  customerRequestInProgress: false,
  customerErrors: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CUSTOMERS_PENDING': {
      return { ...state, customerRequestInProgress: true };
    }
    case 'FETCH_CUSTOMERS_FULFILLED': {
      return {
        ...state,
        customerRequestInProgress: false,
        customers: action.payload.data,
      };
    }
    case 'FETCH_CUSTOMERS_REJECTED': {
      return {
        ...state,
        customerRequestInProgress: false,
        customerErrors: action.payload,
      };
    }
  }
  return state;
}

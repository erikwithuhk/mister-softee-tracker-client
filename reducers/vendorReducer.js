const initialState = {
  vendors: [],
  vendorRequestInProgress: false,
  vendorErrors: [],
  requests: [],
  requestRequestInProgress: false,
  requestErrors: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_VENDORS_PENDING': {
      return { ...state, vendorRequestInProgress: true };
    }
    case 'FETCH_VENDORS_FULFILLED': {
      return {
        ...state,
        vendorRequestInProgress: false,
        vendors: action.payload.data,
      };
    }
    case 'FETCH_VENDORS_REJECTED': {
      return {
        ...state,
        vendorRequestInProgress: false,
        vendorErrors: action.payload,
      };
    }
    case 'FETCH_VENDOR_REQUESTS_PENDING': {
      return { ...state, requestRequestInProgress: true };
    }
    case 'FETCH_VENDOR_REQUESTS_FULFILLED': {
      return {
        ...state,
        requestRequestInProgress: false,
        requests: action.payload.data,
      };
    }
    case 'FETCH_VENDOR_REQUESTS_REJECTED': {
      return {
        ...state,
        requestRequestInProgress: false,
        requestErrors: action.payload,
      };
    }
  }
  return state;
}

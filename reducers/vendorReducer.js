const initialState = {
  vendors: [],
  vendorRequestInProgress: false,
  vendorErrors: [],
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
  }
  return state;
}

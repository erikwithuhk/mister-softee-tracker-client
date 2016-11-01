const initialState = {
  users: [],
  userRequestInProgress: false,
  userErrors: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_USERS_PENDING': {
      return { ...state, userRequestInProgress: true };
    }
    case 'FETCH_USERS_FULFILLED': {
      return {
        ...state,
        userRequestInProgress: false,
        users: action.payload.data,
      };
    }
    case 'FETCH_USERS_REJECTED': {
      return {
        ...state,
        userRequestInProgress: false,
        userErrors: action.payload,
      };
    }
  }
  return state;
}

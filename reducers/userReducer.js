const initialState = {
  users: [],
  userRequestInProgress: false,
  userErrors: [],
  position: null,
  positionUpdateInProgress: false,
  positionUpdateErrors: [],
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
    case 'UPDATE_POSITION_PENDING': {
      return { ...state, positionUpdateInProgress: true };
    }
    case 'UPDATE_POSITION_FULFILLED': {
      return {
        ...state,
        positionUpdateInProgress: false,
        position: { lat: action.payload.data.position_lat, lng: action.payload.data.position_lng },
      };
    }
    case 'UPDATE_POSITION_REJECTED': {
      return {
        ...state,
        positionUpdateInProgress: false,
        positionUpdateErrors: action.payload,
      };
    }
  }
  return state;
}

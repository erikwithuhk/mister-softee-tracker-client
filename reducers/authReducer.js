const initialState = {
  authRequestInProgress: false,
  authErrors: [],
  authToken: null,
  email: null,
  userID: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST_PENDING': {
      return { ...state, authRequestInProgress: true };
    }
    case 'LOGIN_REQUEST_FULFILLED': {
      return {
        ...state,
        authRequestInProgress: false,
        authErrors: [],
        authToken: action.payload.auth_token,
        email: action.payload.email || 'efjonsson@gmail.com',
      };
    }
    case 'LOGIN_REQUEST_REJECTED': {
      return { ...state, authRequestInProgress: false, authErrors: action.payload };
    }
    case 'LOG_OUT': {
      console.log('log out');
      return {
        ...state,
        authRequestInProgress: false,
        authErrors: [],
        authToken: null,
        email: null,
        userID: null,
      };
    }
  }
  return state;

  // Accessor Methods
  // TODO see if these accessor methods are necessary
  // getUsername() { return _sessionState.username; }
  // getUserId() { return _sessionState.userId; }
  // isLoggedIn() { return (_sessionState.authToken !== null); },
  // getAuthErrors() { return (_sessionState.authErrors !== null); },
  // isAuthRequestInProgress() { return (_sessionState.authRequestInProgress === true); }
}

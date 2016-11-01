const initialState = {
  authRequestInProgress: false,
  authErrors: [],
  session: {
    authToken: null,
    email: null,
    userID: null,
  },
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
        session: {
          ...state.session,
          authToken: action.payload.auth_token,
          email: action.payload.user.email,
          userID: action.payload.user.id,
        },
      };
    }
    case 'LOGIN_REQUEST_REJECTED': {
      return { ...state, authRequestInProgress: false, authErrors: action.payload };
    }
    case 'LOG_OUT': {
      return {
        ...state,
        authRequestInProgress: false,
        authErrors: [],
        session: {
          ...state.session,
          authToken: null,
          email: null,
          userID: null,
        }
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

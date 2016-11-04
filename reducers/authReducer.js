import decoder from 'jwt-decode';

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
    case 'SIGNUP_REQUEST_PENDING': {
      return { ...state, authRequestInProgress: true };
    }
    case 'SIGNUP_REQUEST_FULFILLED': {
      const decodedToken = decoder(action.payload.auth_token);
      return {
        ...state,
        authRequestInProgress: false,
        authErrors: [],
        ...state.session,
        session: {
          authToken: action.payload.auth_token,
          userID: decodedToken.user_id,
          email: decodedToken.email,
          userType: decodedToken.type,
        },
      };
    }
    case 'SIGNUP_REQUEST_REJECTED': {
      return { ...state, authRequestInProgress: false, authErrors: action.payload };
    }
    case 'LOGIN_REQUEST_PENDING': {
      return { ...state, authRequestInProgress: true };
    }
    case 'LOGIN_REQUEST_FULFILLED': {
      const decodedToken = decoder(action.payload.auth_token);
      return {
        ...state,
        authRequestInProgress: false,
        authErrors: [],
        session: {
          ...state.session,
          authToken: action.payload.auth_token,
          userID: decodedToken.user_id,
          email: decodedToken.email,
          userType: decodedToken.type,
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

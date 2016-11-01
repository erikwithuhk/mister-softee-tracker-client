const initialState = {
  user: {
    id: null,
    email: null,
    name: null,
    password: null,
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_NAME': {
      return {
        ...state,
        user: { ...state.user, name: action.payload },
      };
    }
  }
  return state;
}

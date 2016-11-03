const initialState = {
  markers: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_MARKER': {
      const newState = state;
      newState.markers[action.payload.id] = action.payload.marker;
      return newState;
    }
  }
  return state;
}

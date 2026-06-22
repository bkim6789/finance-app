import { useReducer } from 'react';

const initialState = { count: 0 };

const countReducer = (state, action) => {
  switch (action.type) {
    case 'increment': 
      return { count: state.count + 1 };
    case 'decrement': 
      return { count: state.count - 1 };
    case 'set':
      return { count: action.payload };
    default:
      return state;
  }
};

export { initialState, countReducer };
import { SET_WEATHER } from '../actions';

export default (state = '', action) => {
  switch (action.type) {
    case SET_WEATHER:
      return `Today's weather is ${action.data}!`;
    default:
      return state;
  }
};

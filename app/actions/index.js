import axios from 'axios';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SET_WEATHER = 'SET_WEATHER';

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const setWeather = data => ({
  type: SET_WEATHER,
  data,
});

export const getWeather = () => dispatch =>
  axios.get('http://localhost:3001/weather')
    .then(response => dispatch(setWeather(response.data)));

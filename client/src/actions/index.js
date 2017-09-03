import axios from 'axios';
import {FETCH_USER} from './types';

export const fetchUser = () =>
// No need for return and {} if there is only a single expression
// within the {}
  async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({type: FETCH_USER, payload: res.data});
  };

export const handleStripeToken = (token) =>
  async (dispatch) => {
    const res = await axios.post('/api/stripe',token)
    dispatch({type: FETCH_USER, payload: res.data})
  };

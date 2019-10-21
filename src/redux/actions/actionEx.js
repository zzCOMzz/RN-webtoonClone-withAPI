import * as types from './../types';
import axios from 'axios';

export const handleGetUsers = () => ({
  type: types.GET_USERS,
  payload: axios.get('https://reqres.in/api/users'),
});

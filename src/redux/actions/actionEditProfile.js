import Host from '../../functions/host';
import * as types from '../types';
import axios from 'axios';

export const actionGetProfile = (userId, token) => ({
  type: types.UPDATE_PROFILE,
  payload: axios({
    method: 'GET',
    url: `${Host}/user/finduser/${userId}`,
    headers: {authorization: `${token}`},
  }),
});

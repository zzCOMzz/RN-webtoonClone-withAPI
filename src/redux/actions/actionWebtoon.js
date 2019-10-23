import * as types from '../types';
import axios from 'axios';
import Host from '../../functions/host';

export const actionGetMyWebtoon = (userId, token) => ({
  type: `${types.GET_MY_WEBTOON}`,
  payload: axios.get(`${Host}/user/${userId}/webtoon`, {
    headers: {authorization: `${token}`},
  }),
});

export const actionAddMyWebtoon = (userId, webtoonTitle) => ({
  type: `${types.ADD_MY_WEBTOON}`,
  payload: axios.post(
    `${Host}/user/${userId}/webtoon?webtoontitle=${webtoonTitle}`,
  ),
});

export const actionUpdateMyWebtoon = (userId, webtoonId) => ({
  type: `${types.UPDATE_MY_WEBTOON}`,
  payload: axios.put(`${Host}/user/${userId}/webtoon/${webtoonId}`),
});

export const actionDeleteMyWebtoon = (userId, webtoonId) => ({
  type: `${types.DELETE_MY_WEBTOON}`,
  payload: axios.delete(`${Host}/user/${userId}/webtoon/${webtoonId}`),
});

export const actionGuestGetAllWebtoon = () => ({
  type: `${types.GET_ALL_WEBTOON}`,
  payload: axios.get(`${Host}/webtoon`),
});

export const actionGuestGetEpisode = webtoonId => ({
  type: `${types.GET_ALL_EPISODE}`,
  payload: axios.get(`${Host}/webtoon/${webtoonId}/episode`),
});

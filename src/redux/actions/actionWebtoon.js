import * as types from '../types';
import axios from 'axios';
import Host from '../../functions/host';

export const actionGetMyWebtoon = (userId, token) => ({
  type: `${types.GET_MY_WEBTOON}`,
  payload: axios.get(`${Host}/user/${userId}/webtoon`, {
    headers: {authorization: `${token}`},
  }),
});

export const actionGetMyEpisode = (userId, webtoonId, token) => ({
  type: `${types.GET_MY_EPISODE}`,
  payload: axios.get(`${Host}/user/${userId}/webtoon/${webtoonId}/episode`, {
    headers: {authorization: `${token}`},
  }),
});

export const actionGetMyEpisodeImage = (
  userId,
  webtoonId,
  episodeid,
  token,
) => ({
  type: `${types.GET_MY_EPIDOSE_IMAGE}`,
  payload: axios.get(
    `${Host}/user/${userId}/webtoon/${webtoonId}/episode/${episodeid}/image`,
    {headers: {authorization: `${token}`}},
  ),
});

export const actionGuestGetAllWebtoon = () => ({
  type: `${types.GET_ALL_WEBTOON}`,
  payload: axios.get(`${Host}/webtoon`),
});

export const actionGuestGetEpisode = webtoonId => ({
  type: `${types.GET_ALL_EPISODE}`,
  payload: axios.get(`${Host}/webtoon/${webtoonId}/episode`),
});

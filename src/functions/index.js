import {AsyncStorage} from 'react-native';
import axios from 'axios';

import Host from './host';

export const getUserToken = async () =>
  (token = await AsyncStorage.getItem('token'));

export const getUserId = async () =>
  (userId = await AsyncStorage.getItem('userId'));

export const createFormData = (photo, fileKey, body) => {
  const data = new FormData();

  data.append(`${fileKey}`, {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export const editProfile = async formData => {
  const userId = await getUserId();
  const token = await getUserToken();

  const updateUser = await axios.put(
    `${Host}/user/${userId}/uploadprofile`,
    formData,
    {headers: {Authorization: `${token}`}},
  );

  return updateUser;
};

export const addWebtoon = async (formData, webtoonTitle) => {
  const token = await getUserToken();
  const userId = await getUserId();

  const uploadWebtoon = await axios.post(
    `${Host}/user/${userId}/webtoon?webtoontitle=${webtoonTitle}`,
    formData,
    {headers: {Authorization: `${token}`}},
  );
  return uploadWebtoon;
};

export const editWebtoon = async (formData, webtoonId) => {
  const token = await getUserToken();
  const userId = await getUserId();

  const editWebtoon = await axios.put(
    `${Host}/user/${userId}/webtoon/${webtoonId}`,
    formData,
    {headers: {Authorization: `${token}`}},
  );
  return editWebtoon;
};

export const deleteWebtoon = async webtoonId => {
  const token = await getUserToken();
  const userId = await getUserId();

  const deleteWebtoon = await axios.delete(
    `${Host}/user/${userId}/webtoon/${webtoonId}`,
    {headers: {Authorization: `${token}`}},
  );
  return deleteWebtoon;
};

export const addEpisode = async (
  formData,
  webtoonId,
  webtoonTitle,
  episodeTitle,
) => {
  const token = await getUserToken();
  const userId = await getUserId();
  const addEpisode = await axios.post(
    `${Host}/user/${userId}/webtoon/${webtoonId}/episode?webtoontitle=${webtoonTitle}&episodetitle=${episodeTitle}`,
    formData,
    {headers: {Authorization: `${token}`}},
  );
  return addEpisode;
};
export const deleteEpisode = async (webtoonId, episodeId) => {
  const token = await getUserToken();
  const userId = await getUserId();
  const deleteEpisode = await axios.delete(
    `${Host}/user/${userId}/webtoon/${webtoonId}/episode/${episodeId}`,
    {headers: {Authorization: `${token}`}},
  );
  return deleteEpisode;
};

export const editEpisode = async (formData, webtoonId, episodeId) => {
  const token = await getUserToken();
  const userId = await getUserId();
  const editEpisode = await axios.put(
    `${Host}/user/${userId}/webtoon/${webtoonId}/episode/${episodeId}`,
    formData,
    {
      headers: {Authorization: `${token}`},
    },
  );
  return editEpisode;
};

export const addImageEpisode = async (
  formData,
  webtoonId,
  webtoonTitle,
  episodeId,
  episodeTitle,
) => {
  const token = await getUserToken();
  const userId = await getUserId();
  const addImageEpisode = await axios.post(
    `${Host}/user/${userId}/webtoon/${webtoonId}/episode/${episodeId}/image?webtoontitle=${webtoonTitle}&episodetitle=${episodeTitle}`,
    formData,
    {
      headers: {Authorization: `${token}`},
    },
  );
  return addImageEpisode;
};

export const deleteImageEpisode = async (webtoonId, episodeId, imageId) => {
  const token = await getUserToken();
  const userId = await getUserId();
  const deleteImageEps = await axios.delete(
    `${Host}/user/${userId}/webtoon/${webtoonId}/episode/${episodeId}/image/${imageId}`,
    {
      headers: {Authorization: `${token}`},
    },
  );
  return deleteImageEps;
};

export const addWebtoonFav = async webtoonId => {
  const token = await getUserToken();
  const userId = await getUserId();
  const addFav = await axios.post(`${Host}/webtoon/${userId}`, webtoonId, {
    headers: {Authorization: `${token}`},
  });
  return addFav;
};

export const deleteWebtoonFav = async webtoonId => {
  const token = await getUserToken();
  const userId = await getUserId();
  const removeFav = await axios.delete(
    `${Host}/webtoon/${userId}/${webtoonId}`,
    {
      headers: {Authorization: `${token}`},
    },
  );
  return removeFav;
};

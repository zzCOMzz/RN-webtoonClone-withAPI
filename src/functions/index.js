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

export const addWebtoon = async (formData, userId) => {
  // const token = await getUserToken();
  // const userId = await getUserId();
};

export const editWebtoon = async () => {};

export const deleteWebtoon = async () => {};

export const addEpisode = async () => {};
export const deleteEpisode = async () => {};

export const addWebtoonFav = async () => {};
export const deleteWebtoonFav = async () => {};

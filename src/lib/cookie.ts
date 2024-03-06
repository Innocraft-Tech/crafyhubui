import Cookies from 'js-cookie';

export type UserData = {
  avatarUrl: null | string;
  bio: null | string;
  coverImageUrl: null | string;
  createdAt: string;
  email: string;
  fullname: string;
  id: string;
  messages: boolean;
  news: boolean;
  username: string;
  verified: boolean;
  verifiedEmail: boolean;
};

export const setToken = (accessToken: string) => {
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  Cookies.set('accessToken', accessToken, {
    expires: Date.now() - sevenDays,
  });
};

export const getAccessToken = () => Cookies.get('accessToken');
export const getRefreshToken = () => Cookies.get('refreshToken');

export const removeToken = () => {
  Cookies.remove('accessToken');
};
export const removeUserData = () => Cookies.remove('UserData');

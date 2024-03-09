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
  Cookies.set('access_token', accessToken, {
    expires: Date.now() - sevenDays,
  });
};

export const getAccessToken = () => Cookies.get('access_token');
export const getRefreshToken = () => Cookies.get('refresh_token');

export const removeToken = () => {
  Cookies.remove('access_token');
};
export const removeUserData = () => Cookies.remove('UserData');

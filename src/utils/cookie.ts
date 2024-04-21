import Cookies from 'js-cookie';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

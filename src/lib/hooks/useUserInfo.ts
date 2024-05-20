'use client';
import { useGetUserQuery } from '@/redux/api/usersApi';
import Cookies from 'js-cookie';

export default function useUserInfo() {
  //   const dispatch = useAppDispatch();
  //   const isVerify = useVerify()

  //   const { data, isLoading, error, isError } = useGetUserInfoQuery(undefined, {
  //     skip: !isVerify,
  //   })
  const userToken = Cookies.get('access_token') || '';
  const { data, isLoading, error, isError } = useGetUserQuery(userToken);

  //   if (isError) dispatch(userLogin(''))

  return { userInfo: data?.user, isLoading, error, isError };
}

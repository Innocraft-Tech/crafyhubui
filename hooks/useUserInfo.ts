import { useGetUserQuery } from 'store/api/usersApi';
import { useAppDispatch } from './useRedux';
import Cookies from 'js-cookie';

export default function useUserInfo() {
  //   const dispatch = useAppDispatch();
  //   const isVerify = useVerify()

  //   const { data, isLoading, error, isError } = useGetUserInfoQuery(undefined, {
  //     skip: !isVerify,
  //   })
  const user_token = Cookies.get('access_token');
  const { data, isLoading, error, isError } = useGetUserQuery(user_token);

  //   if (isError) dispatch(userLogin(''))

  return { userInfo: data?.user, isLoading, error, isError };
}

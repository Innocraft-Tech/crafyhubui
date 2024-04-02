'use client';

import { useEffect } from 'react';

// import { showAlert } from 'store';
import { useAppDispatch } from '@/lib/hooks/appHooks';
import { useToast } from '../ui/use-toast';

interface HandleResponseProps {
  isSuccess: boolean;
  isError: boolean;
  error: string;
  message: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function HandleResponse(props: HandleResponseProps) {
  //? Porps
  const { isSuccess, isError, error, message, onSuccess, onError } = props;
  const { toast } = useToast();

  //? Assets
  const dispatch = useAppDispatch();

  //? Re-Renders
  useEffect(() => {
    if (isSuccess) {
      if (onSuccess) onSuccess();

      toast({
        description: message,
      });
      // dispatch(
      //   showAlert({
      //     status: 'success',
      //     title: message,
      //   }),
      // );
    }

    if (isError) {
      if (onError) onError();
      toast({
        variant: 'destructive',
        description: error,
      });
      // dispatch(
      //   showAlert({
      //     status: 'error',
      //     title: error,
      //   }),
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

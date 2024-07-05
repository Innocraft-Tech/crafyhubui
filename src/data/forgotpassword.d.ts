type ForgotPassword = {
    newPassword:string;
    confirmNewPassword:string
  };
   
  type ForgotPasswordPayLoad = { token: string; data: ForgotPassword };
   
  type ForgotPasswordResponse = {
    message?: string;
  };
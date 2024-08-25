type ForgotPassword = {
  newPassword: string;
  confirmPassword: string;
};

type ForgotPasswordPayLoad = {
  data: ForgotPassword;
  userID: string;
};

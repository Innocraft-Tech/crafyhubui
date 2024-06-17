type User = {
  perHourValue: number[];
  isClient: boolean;
  jobs: string[] | [];
  profileIsComplete: boolean;
  files: string[] | [];
  isIndividual: boolean;
  isActive: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  cards: string[] | [];
  _id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  tools: string[];
  proofOfWork: string[] | [];
  appliedJobs: string[] | [];
  userLocation: string[];
  invoice: string[] | [];
  userLanguages: string[];
  isVerified: boolean;
  bio?: string;
  timezone?: string;
  addOneLiner?: string;
};

type EmailRequest = {
  email: string;
  name: string;
  reqtoken: string;
};

type EmailResponse = {
  message: string;
};

type OtpResponse = {
  message: string;
};

type OtpRequest = {
  userId: string;
  otp: string;
};

type ProfileRequest = {
  data: {
    userName?: string;
    firstName: string;
    addOneLiner?: string;
    lastName: string;
    profilePicture: string;
    tools: string[];
    perHourValue: number[] | [];
    bio: string;
  };
  id: string;
};

type ProfileResponse = {
  message: string;
  updatedUser: User;
};
type UserJobs = {
  userId: string;
};

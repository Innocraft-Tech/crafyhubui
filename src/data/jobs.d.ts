type Job = {
  _id?: string;
  jobTitle: string;
  jobDescription: string;
  requiredSkills: string[];
  paymentOneTime?: boolean;
  paymentOngoing?: boolean;
  oneTime?: (string | number)[];
  onGoing?: (string | number)[];
  client?: string;
  appliedUsers?: string[];
  jobLocation?: string;
  languages: string[];
  profileIsCompleted?: boolean;
  companyLog?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type PostJobPayload = { data: Job; id: string };

type PostJobResponse = {
  message?: string;
  job?: Job;
};

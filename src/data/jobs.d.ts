type Job = {
  jobTitle: string;
  jobDescription: string;
  requiredSkills: string[];
  paymentOneTime?: boolean;
  paymentOngoing?: boolean;
  oneTime?: string[];
  Ongoing?: string[];
  client?: string;
  appliedUsers?: string[];
  jobLocation?: string;
  languages: string[];
  profileIsCompleted?: boolean;
};

type PostJobPayload = Job;

type PostJobResponse = {
  message?: string;
  job?: Job;
};

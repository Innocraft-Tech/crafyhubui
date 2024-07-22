type Work = {
  document: File;
  title: string;
  description: string;
  keywords: string[];
};

type PostWorkPayLoad = { formData: Work; token: string };

type PostWorkResponse = {
  message?: string;
};

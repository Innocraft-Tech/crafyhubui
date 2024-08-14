type Work = {
  document: File;
  title: string;
  description: string;
  keywords: string[];
};

type PostWorkPayLoad = { formData: formData; token: string };

type PostWorkResponse = {
  message?: string;
};

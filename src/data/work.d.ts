type Work = {
  document: string;
  title: string;
  description: string;
  keywords: string[];
};

type PostWorkPayLoad = { token: string; formData: Work };

type PostWorkResponse = {
  message?: string;
};

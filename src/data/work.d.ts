type Work = {
  document: string;
  title: string;
  description: string;
  keywords: string[];
};

type PostWorkPayLoad = { token: string; data: Work };

type PostWorkResponse = {
  message?: string;
};

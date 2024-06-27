type Work = {
  title: string;
  keywords: string[];
  description: string;
  document: string;
};

type PostWorkPayLoad = { data: Work; token: string };

type PostWorkResponse = {
  Work?: Work;
  message?: string;
};

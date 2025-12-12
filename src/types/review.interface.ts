export type ReviewPage = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  author: {
    fullName?: string;
    email?: string;
  };
  target: {
    fullName?: string;
    email?: string;
  };
};
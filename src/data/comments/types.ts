export type Comment = {
  id: string;
  time: number;
  author: string;
  text: string;
  resolved: boolean;
  timestamp: number; // Comment creation timestamp
};

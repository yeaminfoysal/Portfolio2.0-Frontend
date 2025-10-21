export interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  thumbnail: string;
  category: string;
  tags: string[];
  views: number;
  description: string;
  content: string;
}
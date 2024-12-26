export interface Issue {
  id: string;
  title: string;
  volume: string;
  issue: string;
  date: string;
  abstract: string;
  pdfUrl?: string;
  coverImage?: string;
  articleCount?: number;
}
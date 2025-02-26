
import { ArticleSource } from "@/components/index-medicus/types/article";

export interface RhcaArticle {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  publicationDate: string;
  date: string;
  specialty: string;
  category?: string;
  source: ArticleSource;
  volume: string;
  issue?: string;
  pageNumber: number;
  views?: number;
  downloads?: number;
  shares?: number;
  citations?: number;
  tags: string[];
  imageUrl?: string;
  pdfUrl?: string;
  status?: string;
  institution?: string;
  userId?: string;
  articleType?: ArticleSource;
  pdfFileName?: string;
}

export interface RhcaVolume {
  id: string;
  volume: string;
  date: string;
  description: string;
  articleCount: number;
  downloadCount: number;
  shareCount: number;
  articles: RhcaArticle[];
  coverImage?: string;
}

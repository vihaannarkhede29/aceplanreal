export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: 'technique' | 'equipment' | 'fitness' | 'strategy' | 'news' | 'tips';
  tags: string[];
  readTime: number; // in minutes
  featured: boolean;
  imageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  views: number;
  likes: number;
  status: 'draft' | 'published' | 'scheduled';
}

export interface ArticleCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface ArticleGenerationRequest {
  category: string;
  topic?: string;
  keywords?: string[];
  tone?: 'professional' | 'casual' | 'technical' | 'beginner-friendly';
  length?: 'short' | 'medium' | 'long';
  targetAudience?: 'beginner' | 'intermediate' | 'advanced' | 'all';
}

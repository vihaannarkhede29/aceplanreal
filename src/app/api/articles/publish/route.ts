import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the article type
interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  imageUrl?: string;
  views: number;
  likes: number;
  status: string;
}

// Path to store published articles
const ARTICLES_DIR = path.join(process.cwd(), 'data', 'published-articles');

// Ensure directory exists
if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category = 'equipment', tags = [] } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Extract excerpt from content (first 150 characters)
    const excerpt = content
      .replace(/[#*`]/g, '') // Remove markdown formatting
      .substring(0, 150)
      .trim() + '...';

    // Calculate read time (average 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Create article object
    const article: Article = {
      id: Date.now().toString(),
      title,
      slug,
      excerpt,
      content,
      author: 'AcePlan AI',
      publishedAt: new Date(),
      category,
      tags: [...tags, 'tennis', 'aceplan'],
      readTime,
      featured: Math.random() > 0.7, // 30% chance of being featured
      imageUrl: '/images/articles/tennis-blog.jpg',
      views: Math.floor(Math.random() * 1000) + 100,
      likes: Math.floor(Math.random() * 100) + 10,
      status: 'published'
    };

    // Save article to file
    const articlePath = path.join(ARTICLES_DIR, `${article.id}.json`);
    fs.writeFileSync(articlePath, JSON.stringify(article, null, 2));

    // Update articles index
    updateArticlesIndex(article);

    return NextResponse.json({
      success: true,
      article: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        publishedAt: article.publishedAt
      }
    });

  } catch (error) {
    console.error('Error publishing article:', error);
    return NextResponse.json(
      { error: 'Failed to publish article' },
      { status: 500 }
    );
  }
}

function updateArticlesIndex(newArticle: Article) {
  const indexPath = path.join(ARTICLES_DIR, 'index.json');
  
  let articles: Article[] = [];
  
  // Load existing articles
  if (fs.existsSync(indexPath)) {
    try {
      const data = fs.readFileSync(indexPath, 'utf8');
      articles = JSON.parse(data);
    } catch (error) {
      console.error('Error loading articles index:', error);
    }
  }
  
  // Add new article to the beginning
  articles.unshift(newArticle);
  
  // Keep only the latest 100 articles
  articles = articles.slice(0, 100);
  
  // Save updated index
  fs.writeFileSync(indexPath, JSON.stringify(articles, null, 2));
}

export async function GET() {
  try {
    const indexPath = path.join(ARTICLES_DIR, 'index.json');
    
    if (!fs.existsSync(indexPath)) {
      return NextResponse.json({ articles: [] });
    }
    
    const data = fs.readFileSync(indexPath, 'utf8');
    const articles = JSON.parse(data);
    
    return NextResponse.json({ articles });
    
  } catch (error) {
    console.error('Error loading articles:', error);
    return NextResponse.json(
      { error: 'Failed to load articles' },
      { status: 500 }
    );
  }
}

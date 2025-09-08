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
      // Return sample articles if no file exists
      return NextResponse.json({ 
        articles: [
          {
            id: "sample-1",
            title: "Top 10 Tennis Rackets for Spin Players in 2024: Ultimate Guide",
            slug: "top-10-tennis-rackets-for-spin-players-in-2024-ultimate-guide",
            excerpt: "Here are the top 10 tennis rackets that excel in their respective categories, offering exceptional performance for players of all skill levels.",
            content: "Here are the top 10 tennis rackets that excel in their respective categories, offering exceptional performance for players of all skill levels.\n\n## Top 10 Tennis Rackets for Spin Players in 2024\n\n### 1. Babolat Pure Aero 2023\n\n**Type:** Power | **Weight:** 300g | **Head Size:** 100 in²\n\n**Best For:** Spin & Power\n\n**Standout Technology:** AeroModular\n\n**Skill Level:** Intermediate+\n\n**Why It's Great:** This racket excels in spin & power with its AeroModular technology, making it perfect for players seeking power characteristics.\n\n**[Get the Babolat Pure Aero 2023 here](https://amzn.to/3JOKGWA)**\n\n---\n\n### 2. Yonex EZONE 100\n\n**Type:** Power | **Weight:** 300g | **Head Size:** 100 in²\n\n**Best For:** Spin & Comfort\n\n**Standout Technology:** Isometric Design\n\n**Skill Level:** Intermediate\n\n**Why It's Great:** This racket excels in spin & comfort with its Isometric Design technology, making it perfect for players seeking power characteristics.\n\n**[Get the Yonex EZONE 100 here](https://amzn.to/46aFhRn)**\n\n---\n\n## Conclusion\n\nWhether you're looking to improve your UTR rating, find the perfect racket, or enhance your tennis game, the right approach and equipment make all the difference.\n\nFor more comprehensive tennis resources, equipment reviews, and training guides, visit [AcePlan](https://aceplan.me) and explore our extensive 100-racket database to find the perfect equipment for your game.\n\nOur database includes detailed specifications, reviews, and affiliate links to help you make informed purchasing decisions while supporting our platform.",
            author: "AcePlan AI",
            publishedAt: new Date().toISOString(),
            category: "equipment",
            tags: ["tennis rackets", "spin", "top 10", "equipment", "tennis", "aceplan"],
            readTime: 4,
            featured: false,
            imageUrl: "/images/articles/tennis-blog.jpg",
            views: 206,
            likes: 73,
            status: "published"
          },
          {
            id: "sample-2",
            title: "How to Improve Your UTR Rating Fast: 5 Proven Strategies",
            slug: "how-to-improve-your-utr-rating-fast-5-proven-strategies",
            excerpt: "Improving your UTR rating requires consistent practice, proper technique, and strategic match play to see significant gains.",
            content: "Improving your UTR rating requires consistent practice, proper technique, and strategic match play to see significant gains.\n\n## 5 Key Strategies to Improve Your UTR Fast\n\n### 1. Consistent Match Play\n\nPlay at least 3-4 competitive matches per week. UTR is based on match results, so regular competition is essential.\n\n### 2. Targeted Practice Sessions\n\nFocus on your weaknesses during practice. If you struggle with backhands, dedicate 30% of practice time to backhand drills.\n\n### 3. Mental Game Development\n\nWork on staying calm under pressure and maintaining focus during crucial points. Mental toughness often determines match outcomes.\n\n### 4. Physical Conditioning\n\nImprove your fitness to maintain consistent performance throughout long matches. Endurance training is crucial for UTR improvement.\n\n### 5. Equipment Optimization\n\nEnsure your racket, strings, and other equipment are properly suited to your playing style and skill level.\n\n## Conclusion\n\nWhether you're looking to improve your UTR rating, find the perfect racket, or enhance your tennis game, the right approach and equipment make all the difference.\n\nFor more comprehensive tennis resources, equipment reviews, and training guides, visit [AcePlan](https://aceplan.me) and explore our extensive 100-racket database to find the perfect equipment for your game.\n\nOur database includes detailed specifications, reviews, and affiliate links to help you make informed purchasing decisions while supporting our platform.",
            author: "AcePlan AI",
            publishedAt: new Date().toISOString(),
            category: "training",
            tags: ["UTR", "improvement", "training", "strategy", "tennis", "aceplan"],
            readTime: 2,
            featured: true,
            imageUrl: "/images/articles/tennis-blog.jpg",
            views: 421,
            likes: 90,
            status: "published"
          }
        ]
      });
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

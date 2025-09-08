import { NextRequest, NextResponse } from 'next/server';
import { AIArticleGenerator } from '@/lib/aiArticleGenerator';
import { ArticleGenerationRequest } from '@/types/articles';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, topic, keywords, tone, length, targetAudience } = body;

    // Validate required fields
    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    const articleGenerator = new AIArticleGenerator();
    
    const requestData: ArticleGenerationRequest = {
      category,
      topic,
      keywords,
      tone,
      length,
      targetAudience
    };

    const article = await articleGenerator.generateArticle(requestData);

    return NextResponse.json({
      success: true,
      article
    });

  } catch (error) {
    console.error('Error generating article:', error);
    return NextResponse.json(
      { error: 'Failed to generate article' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const articleGenerator = new AIArticleGenerator();
    const topics = await articleGenerator.generateWeeklyTopics();

    return NextResponse.json({
      success: true,
      topics
    });

  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
}

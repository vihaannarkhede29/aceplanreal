import { NextRequest, NextResponse } from 'next/server';
import { cronService } from '@/lib/cronService';

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from a legitimate source
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await cronService.generateDailyArticle();

    return NextResponse.json({
      success: true,
      message: 'Daily article generated successfully'
    });

  } catch (error) {
    console.error('Error in daily article cron job:', error);
    return NextResponse.json(
      { error: 'Failed to generate daily article' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Daily article cron endpoint',
    usage: 'POST with proper authorization to generate daily article'
  });
}

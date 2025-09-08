import { AIArticleGenerator } from './aiArticleGenerator';
import { ArticleGenerationRequest } from '@/types/articles';

export class CronService {
  private articleGenerator: AIArticleGenerator;

  constructor() {
    this.articleGenerator = new AIArticleGenerator();
  }

  // Daily article generation
  async generateDailyArticle(): Promise<void> {
    console.log('Starting daily article generation...');
    
    try {
      const today = new Date();
      const dayOfWeek = today.getDay();
      
      // Different article types for different days
      const dailyTopics = [
        { category: 'tips', topic: 'Monday Motivation: Quick Tennis Tips', tone: 'casual' },
        { category: 'technique', topic: 'Tuesday Technique: Improve Your Game', tone: 'professional' },
        { category: 'equipment', topic: 'Wednesday Gear: Equipment Spotlight', tone: 'technical' },
        { category: 'fitness', topic: 'Thursday Fitness: Training Focus', tone: 'professional' },
        { category: 'strategy', topic: 'Friday Strategy: Mental Game', tone: 'casual' },
        { category: 'news', topic: 'Weekend Roundup: Tennis News', tone: 'professional' },
        { category: 'tips', topic: 'Sunday Summary: Weekly Highlights', tone: 'casual' }
      ];

      const todayTopic = dailyTopics[dayOfWeek];
      
      const request: ArticleGenerationRequest = {
        category: todayTopic.category,
        topic: todayTopic.topic,
        tone: todayTopic.tone as any,
        length: 'medium',
        targetAudience: 'all',
        keywords: this.getKeywordsForCategory(todayTopic.category)
      };

      const article = await this.articleGenerator.generateArticle(request);
      
      // Save article to database
      await this.saveArticle(article);
      
      console.log(`Daily article generated: ${article.title}`);
      
    } catch (error) {
      console.error('Error generating daily article:', error);
    }
  }

  // Weekly article batch generation
  async generateWeeklyArticles(): Promise<void> {
    console.log('Starting weekly article batch generation...');
    
    try {
      const weeklyTopics = [
        { category: 'technique', topic: 'Master the Perfect Serve', keywords: ['serve', 'technique', 'power'] },
        { category: 'equipment', topic: 'Racket String Guide 2024', keywords: ['strings', 'equipment', 'guide'] },
        { category: 'fitness', topic: 'Tennis-Specific Workouts', keywords: ['fitness', 'training', 'workout'] },
        { category: 'strategy', topic: 'Doubles Communication Tips', keywords: ['doubles', 'strategy', 'communication'] },
        { category: 'tips', topic: 'Quick Improvement Hacks', keywords: ['tips', 'improvement', 'quick'] },
        { category: 'news', topic: 'This Week in Tennis', keywords: ['news', 'updates', 'tennis'] },
        { category: 'technique', topic: 'Backhand Mastery Guide', keywords: ['backhand', 'technique', 'mastery'] }
      ];

      for (const topic of weeklyTopics) {
        const request: ArticleGenerationRequest = {
          category: topic.category,
          topic: topic.topic,
          keywords: topic.keywords,
          tone: 'professional',
          length: 'long',
          targetAudience: 'all'
        };

        const article = await this.articleGenerator.generateArticle(request);
        await this.saveArticle(article);
        
        console.log(`Weekly article generated: ${article.title}`);
        
        // Add delay between articles to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error) {
      console.error('Error generating weekly articles:', error);
    }
  }

  // Monthly featured article
  async generateMonthlyFeatured(): Promise<void> {
    console.log('Starting monthly featured article generation...');
    
    try {
      const monthlyTopics = [
        'Complete Tennis Training Program',
        'Advanced Strategy Guide',
        'Equipment Buying Guide 2024',
        'Mental Game Mastery',
        'Injury Prevention Handbook',
        'Tennis Nutrition Guide'
      ];

      const randomTopic = monthlyTopics[Math.floor(Math.random() * monthlyTopics.length)];
      
      const request: ArticleGenerationRequest = {
        category: 'technique',
        topic: randomTopic,
        tone: 'professional',
        length: 'long',
        targetAudience: 'all',
        keywords: ['comprehensive', 'guide', 'mastery']
      };

      const article = await this.articleGenerator.generateArticle(request);
      article.featured = true; // Mark as featured
      
      await this.saveArticle(article);
      
      console.log(`Monthly featured article generated: ${article.title}`);
      
    } catch (error) {
      console.error('Error generating monthly featured article:', error);
    }
  }

  // Get keywords for category
  private getKeywordsForCategory(category: string): string[] {
    const keywordMap: Record<string, string[]> = {
      technique: ['technique', 'form', 'fundamentals', 'improvement'],
      equipment: ['equipment', 'gear', 'review', 'recommendation'],
      fitness: ['fitness', 'training', 'conditioning', 'health'],
      strategy: ['strategy', 'tactics', 'mental', 'game'],
      news: ['news', 'updates', 'tennis', 'professional'],
      tips: ['tips', 'tricks', 'quick', 'easy']
    };

    return keywordMap[category] || ['tennis', 'guide', 'improvement'];
  }

  // Save article to database (implement based on your storage solution)
  private async saveArticle(article: any): Promise<void> {
    // This would typically save to your database
    // For now, we'll just log it
    console.log('Saving article:', {
      id: article.id,
      title: article.title,
      category: article.category,
      publishedAt: article.publishedAt
    });

    // Example implementation for different storage solutions:
    
    // Firebase Firestore
    // await db.collection('articles').doc(article.id).set(article);
    
    // MongoDB
    // await ArticleModel.create(article);
    
    // Local JSON file
    // const articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
    // articles.push(article);
    // fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
  }

  // Schedule all cron jobs
  async scheduleAllJobs(): Promise<void> {
    console.log('Setting up cron jobs...');
    
    // This would typically be set up with a cron job scheduler
    // Examples:
    
    // Daily at 6 AM
    // cron.schedule('0 6 * * *', () => this.generateDailyArticle());
    
    // Weekly on Sundays at 8 AM
    // cron.schedule('0 8 * * 0', () => this.generateWeeklyArticles());
    
    // Monthly on the 1st at 10 AM
    // cron.schedule('0 10 1 * *', () => this.generateMonthlyFeatured());
    
    console.log('Cron jobs scheduled successfully');
  }
}

// Export singleton instance
export const cronService = new CronService();

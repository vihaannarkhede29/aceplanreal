import { Article, ArticleGenerationRequest } from '@/types/articles';

// AI Article Generation Service
export class AIArticleGenerator {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // You can use OpenAI, Anthropic, or any other AI service
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.baseUrl = 'https://api.openai.com/v1';
  }

  // Generate article topics for the week
  async generateWeeklyTopics(): Promise<string[]> {
    const topics = [
      'Perfect Your Forehand: 5 Common Mistakes to Avoid',
      'Choosing the Right Tennis String: A Complete Guide',
      'Mental Toughness: How to Stay Focused During Matches',
      'Tennis Fitness: Essential Exercises for Court Performance',
      'Serve Technique: From Beginner to Advanced',
      'Doubles Strategy: Communication and Positioning',
      'Recovery and Injury Prevention for Tennis Players'
    ];
    
    return topics;
  }

  // Generate a complete article
  async generateArticle(request: ArticleGenerationRequest): Promise<Article> {
    const prompt = this.buildPrompt(request);
    
    try {
      // For now, we'll use mock data. Replace with actual AI API call
      const article = await this.mockArticleGeneration(request);
      return article;
    } catch (error) {
      console.error('Error generating article:', error);
      throw new Error('Failed to generate article');
    }
  }

  // Build the AI prompt based on request
  private buildPrompt(request: ArticleGenerationRequest): string {
    const basePrompt = `Write a comprehensive tennis article about ${request.category}`;
    
    let prompt = basePrompt;
    
    if (request.topic) {
      prompt += ` focusing on "${request.topic}"`;
    }
    
    if (request.keywords) {
      prompt += ` that includes these keywords: ${request.keywords.join(', ')}`;
    }
    
    prompt += `. The article should be ${request.length || 'medium'} length `;
    prompt += `and written in a ${request.tone || 'professional'} tone `;
    prompt += `for ${request.targetAudience || 'all'} level players.`;
    
    prompt += ` Include practical tips, techniques, and actionable advice.`;
    
    return prompt;
  }

  // Mock article generation (replace with actual AI API)
  private async mockArticleGeneration(request: ArticleGenerationRequest): Promise<Article> {
    const now = new Date();
    const slug = this.generateSlug(request.topic || request.category);
    
    const mockContent = this.getMockContent(request);
    
    return {
      id: `article-${Date.now()}`,
      title: request.topic || `${request.category} Guide`,
      slug,
      excerpt: mockContent.excerpt,
      content: mockContent.content,
      author: 'AcePlan AI',
      publishedAt: now,
      category: request.category as any,
      tags: request.keywords || [request.category],
      readTime: this.calculateReadTime(mockContent.content),
      featured: false,
      imageUrl: `/images/articles/${slug}.jpg`,
      seoTitle: `${request.topic || request.category} - AcePlan Tennis`,
      seoDescription: mockContent.excerpt,
      views: 0,
      likes: 0,
      status: 'published'
    };
  }

  // Generate URL-friendly slug
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Calculate estimated read time
  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Get mock content based on category
  private getMockContent(request: ArticleGenerationRequest): { excerpt: string; content: string } {
    const category = request.category;
    
    const contentMap: Record<string, { excerpt: string; content: string }> = {
      technique: {
        excerpt: 'Master the fundamentals of tennis technique with these expert tips and drills.',
        content: `# Tennis Technique Mastery

Tennis technique is the foundation of every great player's game. Whether you're a beginner learning the basics or an advanced player refining your skills, proper technique is essential for consistent performance.

## The Fundamentals

### Grip and Stance
Your grip and stance form the foundation of every shot. The continental grip is versatile and allows for various shot types, while the eastern grip provides more power for forehands.

### Footwork
Good footwork is crucial for positioning yourself correctly for each shot. Practice the split-step, which helps you react quickly to your opponent's shot.

### Follow-Through
A proper follow-through ensures power and control. Your racket should finish over your shoulder on groundstrokes and extend toward your target on volleys.

## Common Mistakes to Avoid

1. **Over-gripping**: Holding the racket too tightly reduces feel and control
2. **Poor footwork**: Not moving to the ball early enough
3. **Incomplete follow-through**: Stopping the swing too early
4. **Wrong grip**: Using the same grip for all shots

## Practice Drills

### Wall Practice
Hit against a wall to improve consistency and timing. Focus on maintaining proper form.

### Shadow Swinging
Practice your strokes without a ball to develop muscle memory.

### Ball Machine
Use a ball machine to practice specific shots repeatedly.

## Conclusion

Mastering tennis technique takes time and practice. Focus on the fundamentals, avoid common mistakes, and practice regularly. With dedication and proper instruction, you'll see significant improvement in your game.`
      },
      equipment: {
        excerpt: 'Everything you need to know about tennis equipment, from rackets to strings.',
        content: `# Tennis Equipment Guide

Choosing the right tennis equipment can significantly impact your game. From rackets to strings, each piece of equipment plays a crucial role in your performance.

## Racket Selection

### Head Size
- **Oversize (110+ sq in)**: More power, larger sweet spot, good for beginners
- **Mid-plus (95-105 sq in)**: Balanced power and control, suitable for most players
- **Mid-size (85-95 sq in)**: Maximum control, requires advanced technique

### Weight
- **Light (under 10 oz)**: Easier to swing, good for beginners and players with arm issues
- **Medium (10-11 oz)**: Balanced performance, suitable for most players
- **Heavy (over 11 oz)**: More power and stability, requires good technique

### String Pattern
- **Open (16x18)**: More spin potential, less control
- **Dense (18x20)**: More control, less spin potential

## String Selection

### String Types
- **Natural Gut**: Best feel and power, expensive
- **Synthetic Gut**: Good balance of performance and price
- **Polyester**: Maximum durability and spin, less feel
- **Multifilament**: Good feel and comfort, moderate durability

### Tension
- **Lower tension (45-55 lbs)**: More power and comfort
- **Higher tension (55-65 lbs)**: More control and precision

## Other Equipment

### Shoes
Choose tennis-specific shoes with good lateral support and cushioning.

### Apparel
Wear moisture-wicking clothing that allows for full range of motion.

### Accessories
- Overgrips for better feel
- Dampeners to reduce vibration
- Headbands and wristbands for sweat management

## Conclusion

The right equipment can enhance your game, but technique and practice are still the most important factors. Choose equipment that matches your skill level and playing style.`
      },
      fitness: {
        excerpt: 'Improve your tennis performance with targeted fitness and conditioning.',
        content: `# Tennis Fitness and Conditioning

Tennis is a physically demanding sport that requires strength, endurance, agility, and flexibility. A proper fitness routine can significantly improve your on-court performance.

## Key Physical Components

### Cardiovascular Endurance
Tennis matches can last for hours, requiring sustained energy output. Build endurance through:
- Running and jogging
- Cycling
- Swimming
- High-intensity interval training (HIIT)

### Strength Training
Tennis requires both upper and lower body strength:
- **Upper body**: Shoulders, arms, and core for power and control
- **Lower body**: Legs for movement and stability
- **Core**: Essential for balance and power transfer

### Agility and Speed
Quick direction changes and explosive movements are crucial:
- Ladder drills
- Cone drills
- Plyometric exercises
- Sprint training

### Flexibility
Good flexibility prevents injuries and improves range of motion:
- Dynamic stretching before play
- Static stretching after play
- Yoga and Pilates
- Foam rolling

## Tennis-Specific Exercises

### On-Court Drills
- Suicide runs
- Side shuffles
- Backpedaling
- Split-step practice

### Off-Court Training
- Medicine ball throws
- Resistance band exercises
- Balance board training
- Jump rope

## Injury Prevention

### Common Tennis Injuries
- Tennis elbow
- Shoulder impingement
- Knee problems
- Ankle sprains

### Prevention Strategies
- Proper warm-up and cool-down
- Gradual training progression
- Cross-training
- Rest and recovery

## Nutrition and Hydration

### Pre-Match
- Carbohydrates for energy
- Light, easily digestible foods
- Adequate hydration

### During Match
- Water and sports drinks
- Quick energy sources (bananas, energy gels)

### Post-Match
- Protein for muscle recovery
- Carbohydrates to replenish glycogen
- Electrolytes to replace lost minerals

## Conclusion

A comprehensive fitness program is essential for tennis success. Focus on all aspects of physical conditioning, and don't forget the importance of rest and recovery.`
      }
    };

    return contentMap[category] || {
      excerpt: 'Learn more about tennis with this comprehensive guide.',
      content: `# Tennis Guide

This is a comprehensive guide about ${category} in tennis. 

## Introduction

Tennis is a sport that requires skill, strategy, and physical fitness. Understanding the fundamentals is key to improving your game.

## Key Points

1. Practice regularly
2. Focus on technique
3. Stay physically fit
4. Learn from mistakes
5. Enjoy the game

## Conclusion

With dedication and proper training, you can significantly improve your tennis game.`
    };
  }

  // Schedule daily article generation
  async scheduleDailyArticles(): Promise<void> {
    // This would typically be called by a cron job or scheduled task
    const topics = await this.generateWeeklyTopics();
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    if (dayOfWeek < topics.length) {
      const topic = topics[dayOfWeek];
      const request: ArticleGenerationRequest = {
        category: 'tips',
        topic,
        tone: 'beginner-friendly',
        length: 'medium',
        targetAudience: 'all'
      };
      
      await this.generateArticle(request);
    }
  }
}

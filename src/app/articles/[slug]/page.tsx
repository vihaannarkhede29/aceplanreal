'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Article } from '@/types/articles';
import { articleCategories } from '@/data/articleCategories';
import { Calendar, Clock, Eye, Heart, Share2, ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (params.slug) {
      loadArticle(params.slug as string);
    }
  }, [params.slug]);

  const loadArticle = async (slug: string) => {
    // Mock data - replace with actual API call
    const mockArticle: Article = {
      id: '1',
      title: 'Perfect Your Forehand: 5 Common Mistakes to Avoid',
      slug: slug,
      excerpt: 'Master the fundamentals of tennis technique with these expert tips and drills.',
      content: `# Perfect Your Forehand: 5 Common Mistakes to Avoid

The forehand is one of the most important shots in tennis, and mastering it can significantly improve your game. However, many players make common mistakes that prevent them from reaching their full potential. In this article, we'll explore the five most common forehand mistakes and how to fix them.

## 1. Over-gripping the Racket

**The Problem**: Many players hold the racket too tightly, which reduces feel and control.

**The Solution**: 
- Hold the racket firmly but not tightly
- Imagine holding a bird - firm enough to keep it, gentle enough not to hurt it
- Practice with a relaxed grip and gradually increase pressure as needed

## 2. Poor Footwork and Positioning

**The Problem**: Not getting into the right position before hitting the ball.

**The Solution**:
- Move to the ball early and get into position
- Use the split-step to prepare for your opponent's shot
- Keep your feet moving and stay balanced

## 3. Incomplete Follow-Through

**The Problem**: Stopping the swing too early, which reduces power and control.

**The Solution**:
- Follow through completely over your shoulder
- Imagine you're throwing the racket at your target
- Practice shadow swings to develop muscle memory

## 4. Wrong Grip Selection

**The Problem**: Using the same grip for all forehand situations.

**The Solution**:
- Learn different grips for different situations
- Use the eastern grip for flat shots
- Use the semi-western grip for topspin shots
- Practice switching grips quickly

## 5. Not Watching the Ball

**The Problem**: Taking your eyes off the ball too early.

**The Solution**:
- Keep your eyes on the ball until after contact
- Focus on the ball, not your opponent
- Practice with a partner who hits balls to different areas

## Practice Drills

### Wall Practice
Hit against a wall to improve consistency and timing. Focus on maintaining proper form.

### Shadow Swinging
Practice your forehand without a ball to develop muscle memory.

### Ball Machine
Use a ball machine to practice specific forehand situations repeatedly.

## Conclusion

Mastering the forehand takes time and practice. Focus on these fundamentals, avoid common mistakes, and practice regularly. With dedication and proper instruction, you'll see significant improvement in your forehand technique.

Remember, the key to improvement is consistent practice and attention to detail. Work on one aspect at a time, and don't try to fix everything at once.`,
      author: 'AcePlan AI',
      publishedAt: new Date('2024-01-15'),
      category: 'technique',
      tags: ['forehand', 'technique', 'beginner'],
      readTime: 5,
      featured: true,
      imageUrl: '/images/articles/forehand-technique.jpg',
      views: 1250,
      likes: 89,
      status: 'published'
    };

    setArticle(mockArticle);
    setLoading(false);
  };

  const handleLike = () => {
    if (article) {
      setLiked(!liked);
      // Update like count in your database
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Article...</h2>
          <p className="text-gray-600">Fetching the latest tennis insights</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
          <p className="text-gray-600 mb-4">The article you're looking for doesn't exist.</p>
          <Link href="/articles" className="text-blue-600 hover:text-blue-800">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const category = articleCategories.find(c => c.id === article.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href="/articles" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
            
            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${category?.color}`}>
                {category?.icon} {category?.name}
              </span>
              <span className="text-gray-500 text-sm">Featured</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </span>
              <span className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </span>
              <span className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{article.views} views</span>
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  liked
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                <span>{article.likes + (liked ? 1 : 0)}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Image */}
      {article.imageUrl && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-64 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
            <BookOpen className="h-24 w-24 text-white" />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}
          />
        </div>

        {/* Tags */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Info */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{article.author}</h4>
              <p className="text-gray-600 text-sm">AI Tennis Expert</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

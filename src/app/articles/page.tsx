'use client';

import { useState, useEffect } from 'react';
import { Article, ArticleCategory } from '@/types/articles';
import { articleCategories } from '@/data/articleCategories';
import { Calendar, Clock, Eye, Heart, Search, Filter, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, selectedCategory, searchQuery]);

  const loadArticles = async () => {
    try {
      // Fetch articles from your API
      const response = await fetch('/api/articles/publish');
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
      } else {
        // Fallback to empty array if no articles yet
        setArticles([]);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredArticles(filtered);
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
    } catch (error) {
      return 'Recent';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Articles...</h2>
          <p className="text-gray-600">Fetching the latest tennis insights</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tennis Articles & Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest tennis techniques, equipment reviews, and expert tips to improve your game.
            </p>
            <div className="mt-6">
              <Link 
                href="/"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <span>← Back to AcePlan</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {articleCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {articleCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        {selectedCategory === 'all' && articles.filter(article => article.featured).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {articles.filter(article => article.featured).map(article => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-white" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${articleCategories.find(c => c.id === article.category)?.color}`}>
                          {articleCategories.find(c => c.id === article.category)?.icon} {articleCategories.find(c => c.id === article.category)?.name}
                        </span>
                        <span className="text-gray-500 text-sm">Featured</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime} min read</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.views || 0}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{article.likes || 0}</span>
                          </span>
                        </div>
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === 'all' ? 'All Articles' : `${articleCategories.find(c => c.id === selectedCategory)?.name} Articles`}
          </h2>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {articles.length === 0 ? 'No articles yet' : 'No articles found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {articles.length === 0 
                  ? 'Your first automated blog post will appear here soon! Check back tomorrow at 9 AM.'
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
              {articles.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                  <h4 className="font-semibold text-blue-900 mb-2">🚀 Coming Soon!</h4>
                  <p className="text-blue-800 text-sm">
                    Your automated tennis blog will start generating content daily. 
                    Posts will include racket reviews, training tips, and player stories.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="h-40 bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-white" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${articleCategories.find(c => c.id === article.category)?.color}`}>
                          {articleCategories.find(c => c.id === article.category)?.icon}
                        </span>
                        <span className="text-gray-500 text-sm">{articleCategories.find(c => c.id === article.category)?.name}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}m</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{article.views || 0}</span>
                          </span>
                        </div>
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
}

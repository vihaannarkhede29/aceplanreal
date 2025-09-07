'use client';

import { useState, useMemo } from 'react';
import { rackets } from '@/data/rackets';
import { Search, Filter, Star, ExternalLink, ArrowLeft, Grid, List } from 'lucide-react';
import Image from 'next/image';

interface RacketDatabaseProps {
  onBackToHome?: () => void;
}

export default function RacketDatabase({ onBackToHome }: RacketDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'brand' | 'level'>('name');

  // Get unique brands, levels, and categories for filters
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(rackets.map(racket => racket.brand))];
    return uniqueBrands.sort();
  }, []);

  const levels = useMemo(() => {
    const uniqueLevels = [...new Set(rackets.map(racket => racket.level))];
    return uniqueLevels.sort();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(rackets.map(racket => racket.category))];
    return uniqueCategories.sort();
  }, []);

  // Filter and sort rackets
  const filteredRackets = useMemo(() => {
    let filtered = rackets.filter(racket => {
      const matchesSearch = racket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           racket.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           racket.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBrand = !selectedBrand || racket.brand === selectedBrand;
      const matchesLevel = !selectedLevel || racket.level === selectedLevel;
      const matchesCategory = !selectedCategory || racket.category === selectedCategory;

      return matchesSearch && matchesBrand && matchesLevel && matchesCategory;
    });

    // Sort rackets
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'brand':
          return a.brand.localeCompare(b.brand);
        case 'level':
          return a.level.localeCompare(b.level);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedBrand, selectedLevel, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedLevel('');
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Home</span>
                </button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tennis Racket Database</h1>
                <p className="text-gray-600 mt-1">
                  Explore our comprehensive collection of {rackets.length} professional tennis rackets
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rackets, brands, or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'brand' | 'level')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="brand">Sort by Brand</option>
                <option value="level">Sort by Level</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedBrand || selectedLevel || selectedCategory || searchTerm) && (
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedBrand && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  Brand: {selectedBrand}
                </span>
              )}
              {selectedLevel && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                  Level: {selectedLevel}
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                  Category: {selectedCategory}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredRackets.length} of {rackets.length} rackets
          </p>
        </div>

        {/* Rackets Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRackets.map((racket) => (
              <div key={racket.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Racket Image */}
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                  {racket.imageUrl ? (
                    <img 
                      src={racket.imageUrl} 
                      alt={racket.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Star className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-gray-500 text-xs">{racket.brand}</p>
                    </div>
                  )}
                </div>

                {/* Racket Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{racket.name}</h3>
                    <p className="text-sm text-gray-600">{racket.brand}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Weight:</span>
                      <span className="font-medium">{racket.weight}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Head Size:</span>
                      <span className="font-medium">{racket.headSize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Level:</span>
                      <span className="font-medium">{racket.level}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{racket.description}</p>

                  <a
                    href={racket.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>View on Amazon</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRackets.map((racket) => (
              <div key={racket.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-6">
                  {/* Racket Image */}
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {racket.imageUrl ? (
                      <img 
                        src={racket.imageUrl} 
                        alt={racket.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-1 flex items-center justify-center">
                          <Star className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-gray-500 text-xs">{racket.brand}</p>
                      </div>
                    )}
                  </div>

                  {/* Racket Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl mb-1">{racket.name}</h3>
                        <p className="text-gray-600">{racket.brand} • {racket.level}</p>
                      </div>
                      <a
                        href={racket.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>View on Amazon</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    <p className="text-gray-600 mb-4">{racket.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Weight:</span>
                        <p className="font-medium">{racket.weight}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Head Size:</span>
                        <p className="font-medium">{racket.headSize}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Stiffness:</span>
                        <p className="font-medium">{racket.stiffness}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Category:</span>
                        <p className="font-medium capitalize">{racket.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredRackets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No rackets found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

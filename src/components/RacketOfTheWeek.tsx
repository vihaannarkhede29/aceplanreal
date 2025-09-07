'use client';

import { Trophy, Star, ExternalLink, ArrowRight, Award } from 'lucide-react';
import { rackets } from '@/data/rackets';

interface RacketOfTheWeekProps {
  onGetEquipment: () => void;
}

export default function RacketOfTheWeek({ onGetEquipment }: RacketOfTheWeekProps) {
  // Get current week number to rotate rackets
  const getCurrentWeek = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / oneWeek);
  };

  // Select racket based on current week (cycles through top rackets)
  const topRackets = rackets.filter(racket => racket.category === 'best');
  const currentWeek = getCurrentWeek();
  const selectedRacket = topRackets[currentWeek % topRackets.length];

  // Fallback to first racket if none found
  const racket = selectedRacket || rackets[0];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award className="h-4 w-4" />
            <span>Featured This Week</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Racket of the Week
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our expert pick for the best racket this week, chosen for its exceptional performance and value
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Racket Image */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Trophy className="h-16 w-16 text-white" />
                    </div>
                    <p className="text-gray-500 text-sm">Racket Image</p>
                  </div>
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                #1 Pick
              </div>
            </div>

            {/* Racket Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {racket.name}
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  {racket.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                {racket.pros.slice(0, 4).map((pro, index) => {
                  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 ${colors[index]} rounded-full`}></div>
                      <span className="text-gray-700"><strong>{pro.split(' - ')[0]}</strong> - {pro.split(' - ')[1] || pro}</span>
                    </div>
                  );
                })}
              </div>

              {/* Price and CTA */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Starting at</p>
                    <p className="text-2xl font-bold text-gray-900">$249</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Rating</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">(4.9)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href={racket.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>View on Amazon</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={onGetEquipment}
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
                  >
                    Compare
                  </button>
                </div>
              </div>

              {/* Why This Week */}
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Why This Week?</h4>
                <p className="text-blue-800 text-sm">
                  {racket.level === 'Beginner-Intermediate' && "Perfect for players looking to improve their game with professional-quality equipment."}
                  {racket.level === 'Intermediate-Advanced' && "Ideal for serious players who want to take their game to the next level."}
                  {racket.level === 'Advanced' && "The choice of professionals and advanced players seeking maximum performance."}
                  {racket.level === 'Intermediate' && "Great balance of performance and accessibility for developing players."}
                  {racket.level === 'Beginner' && "Excellent starting point for new players with room to grow."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View All Rackets CTA */}
        <div className="text-center mt-8">
          <button
            onClick={onGetEquipment}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>View All 100+ Rackets</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

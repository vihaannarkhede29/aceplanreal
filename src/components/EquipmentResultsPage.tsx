'use client';

import { Racket, StringRecommendation } from '@/types';
import { ExternalLink, Star, Download, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

interface EquipmentAnswer {
  [key: string]: string;
}

interface EquipmentResultsPageProps {
  answers: EquipmentAnswer;
  onBackToEquipment: () => void;
}

export default function EquipmentResultsPage({ answers, onBackToEquipment }: EquipmentResultsPageProps) {
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Generate recommendations based on answers
  const generateEquipmentRecommendations = () => {
    // This is a simplified version - you can enhance the logic
    const skillLevel = answers.skillLevel || '';
    const budget = answers.budget || '';
    const playingStyle = answers.playingStyle || '';
    const primaryGoals = answers.primaryGoals || '';
    const armInjuries = answers.armInjuries || '';

    // Filter rackets based on criteria
    const recommendedRackets = [
      {
        name: "Wilson Tour Slam Tennis Racket",
        price: 89.99,
        headSize: "110 sq in",
        weight: "10.1 oz",
        stiffness: "Low",
        description: "Perfect for beginners with oversized head for forgiveness and lightweight design for easy maneuverability.",
        affiliateLink: "https://www.amazon.com/s?k=Wilson+Tour+Slam+Tennis+Racket",
        category: "beginner"
      },
      {
        name: "Babolat Pure Drive Tennis Racket",
        price: 199.99,
        headSize: "100 sq in",
        weight: "11.2 oz",
        stiffness: "Medium",
        description: "Excellent all-around racket with good power and control, suitable for intermediate to advanced players.",
        affiliateLink: "https://www.amazon.com/s?k=Babolat+Pure+Drive+Tennis+Racket",
        category: "intermediate"
      },
      {
        name: "Wilson Pro Staff 100 Tennis Racket",
        price: 249.99,
        headSize: "100 sq in",
        weight: "11.5 oz",
        stiffness: "High",
        description: "Professional-grade racket with exceptional control and precision for advanced players.",
        affiliateLink: "https://www.amazon.com/s?k=Wilson+Pro+Staff+100+Tennis+Racket",
        category: "advanced"
      }
    ];

    // Filter strings based on criteria
    const recommendedStrings = [
      {
        name: "Wilson NXT Comfort Tennis String",
        price: 24.99,
        type: "Multifilament",
        gauge: "16",
        description: "Soft, comfortable string with excellent feel and power, great for players with arm concerns.",
        affiliateLink: "https://www.amazon.com/s?k=Wilson+NXT+Comfort+Tennis+String",
        category: "comfort"
      },
      {
        name: "Luxilon ALU Power Tennis String",
        price: 19.99,
        type: "Polyester",
        gauge: "16L",
        description: "High-performance polyester string with excellent control and spin potential.",
        affiliateLink: "https://www.amazon.com/s?k=Luxilon+ALU+Power+Tennis+String",
        category: "control"
      },
      {
        name: "Babolat VS Touch Natural Gut Tennis String",
        price: 49.99,
        type: "Natural Gut",
        gauge: "16",
        description: "Premium natural gut string with unmatched feel and power, the gold standard in tennis strings.",
        affiliateLink: "https://www.amazon.com/s?k=Babolat+VS+Touch+Natural+Gut+Tennis+String",
        category: "power"
      }
    ];

    return { recommendedRackets, recommendedStrings };
  };

  const { recommendedRackets, recommendedStrings } = generateEquipmentRecommendations();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.save-dropdown')) {
        setShowSaveOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSaveOptions]);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add logo placeholder
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246); // Blue
    doc.text('AcePlan Equipment Recommendations', 20, 30);
    
    // Add user profile summary
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Your Equipment Profile:', 20, 50);
    
    let yPosition = 60;
    Object.entries(answers).forEach(([key, value]) => {
      if (value && key !== 'currentRacket' && key !== 'currentRacketFeedback') {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        doc.setFontSize(12);
        doc.text(`${label}: ${value}`, 25, yPosition);
        yPosition += 10;
      }
    });
    
    // Add racket recommendations
    yPosition += 10;
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.text('Recommended Rackets:', 20, yPosition);
    
    yPosition += 15;
    recommendedRackets.forEach((racket, index) => {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`${index + 1}. ${racket.name}`, 25, yPosition);
      yPosition += 8;
      
      doc.setFontSize(10);
      yPosition += 6;
      doc.text(`Head Size: ${racket.headSize}`, 30, yPosition);
      yPosition += 6;
      doc.text(`Weight: ${racket.weight}`, 30, yPosition);
      yPosition += 6;
      doc.text(`Stiffness: ${racket.stiffness}`, 30, yPosition);
      yPosition += 8;
      
      // Wrap description text
      const splitDescription = doc.splitTextToSize(racket.description, 170);
      doc.text(splitDescription, 30, yPosition);
      yPosition += splitDescription.length * 5 + 10;
    });
    
    // Add string recommendations
    doc.setFontSize(16);
    doc.setTextColor(34, 197, 94); // Green
    doc.text('Recommended Strings:', 20, yPosition);
    
    yPosition += 15;
    recommendedStrings.forEach((string, index) => {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`${index + 1}. ${string.name}`, 25, yPosition);
      yPosition += 8;
      
      doc.setFontSize(10);
      yPosition += 6;
      doc.text(`Type: ${string.type}`, 30, yPosition);
      yPosition += 6;
      doc.text(`Gauge: ${string.gauge}`, 30, yPosition);
      yPosition += 8;
      
      // Wrap description text
      const splitDescription = doc.splitTextToSize(string.description, 170);
      doc.text(splitDescription, 30, yPosition);
      yPosition += splitDescription.length * 5 + 10;
    });
    
    return doc;
  };

  const handleSavePDF = async () => {
    setIsSaving(true);
    try {
      const doc = generatePDF();
      doc.save('aceplan-equipment-recommendations.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsSaving(false);
      setShowSaveOptions(false);
    }
  };

  const handleSaveTXT = async () => {
    setIsSaving(true);
    try {
      let content = 'AcePlan Equipment Recommendations\n';
      content += '=====================================\n\n';
      
      content += 'Your Equipment Profile:\n';
      Object.entries(answers).forEach(([key, value]) => {
        if (value && key !== 'currentRacket' && key !== 'currentRacketFeedback') {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          content += `${label}: ${value}\n`;
        }
      });
      
      content += '\nRecommended Rackets:\n';
      recommendedRackets.forEach((racket, index) => {
        content += `\n${index + 1}. ${racket.name}\n`;
        content += `   Head Size: ${racket.headSize}\n`;
        content += `   Weight: ${racket.weight}\n`;
        content += `   Stiffness: ${racket.stiffness}\n`;
        content += `   Description: ${racket.description}\n`;
      });
      
      content += '\nRecommended Strings:\n';
      recommendedStrings.forEach((string, index) => {
        content += `\n${index + 1}. ${string.name}\n`;
        content += `   Type: ${string.type}\n`;
        content += `   Gauge: ${string.gauge}\n`;
        content += `   Description: ${string.description}\n`;
      });
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'aceplan-equipment-recommendations.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error saving TXT:', error);
    } finally {
      setIsSaving(false);
      setShowSaveOptions(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Equipment Recommendations
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Based on your profile as a {answers.skillLevel?.toLowerCase() || 'tennis player'}
        </p>
        <div className="flex justify-center space-x-4 flex-wrap gap-4">
          {/* Save Dropdown */}
          <div className="relative save-dropdown">
            <button
              onClick={() => setShowSaveOptions(!showSaveOptions)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200"
            >
              <Download className="h-4 w-4" />
              <span>{isSaving ? 'Saving...' : 'Save Recommendations'}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {showSaveOptions && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                <button
                  onClick={handleSavePDF}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                >
                  Save as PDF
                </button>
                <button
                  onClick={handleSaveTXT}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                >
                  Save as TXT
                </button>
              </div>
            )}
          </div>
          
          {/* Back to Equipment Quiz */}
          <button
            onClick={onBackToEquipment}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            Back to Equipment Quiz
          </button>
        </div>
      </div>

      {/* Racket Recommendations */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recommended Rackets</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {recommendedRackets.map((racket, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{racket.name}</h3>
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Head Size:</span>
                  <span className="font-medium">{racket.headSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{racket.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stiffness:</span>
                  <span className="font-medium">{racket.stiffness}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{racket.description}</p>
              
              <a
                href={racket.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 font-medium"
              >
                <span>View on Amazon</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* String Recommendations */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recommended Strings</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {recommendedStrings.map((string, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{string.name}</h3>
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{string.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gauge:</span>
                  <span className="font-medium">{string.gauge}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{string.description}</p>
              
              <a
                href={string.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 font-medium"
              >
                <span>View on Amazon</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Get Full AcePlan CTA */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Want More Than Just Equipment?
        </h3>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Get your complete 4-week training plan with personalized drills, weekly progression, and comprehensive tennis improvement strategy.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Get Your Full AcePlan
        </button>
      </div>
    </div>
  );
}


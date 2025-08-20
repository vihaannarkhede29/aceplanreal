'use client';

import { RecommendationResult } from '@/types';
import { ExternalLink, Star, Download, ChevronDown, User, Calendar } from 'lucide-react';
import TrainingCalendar from './TrainingCalendar';
import GearRecommendations from './GearRecommendations';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';
import UserProfile from './UserProfile';
import UserProfileHeader from './UserProfileHeader';
import { saveUserPlan } from '@/lib/userPlans';

interface ResultsPageProps {
  results: RecommendationResult;
  onRetakeQuiz: () => void;
  isPreviousPlan?: boolean;
}

export default function ResultsPage({ results, onRetakeQuiz, isPreviousPlan = false }: ResultsPageProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);
  const { currentUser } = useAuth();

  // Check if this is a loaded plan from saved plans
  const isLoadedPlan = !isPreviousPlan && localStorage.getItem('aceplan_loaded_plan') === 'true';

  // Save plan to Firestore when user is signed in and has results
  useEffect(() => {
    const savePlanToFirestore = async () => {
      if (currentUser && results && !isPreviousPlan && !planSaved) {
        try {
          setIsSaving(true);
          const planId = await saveUserPlan(currentUser.uid, results);
          console.log('ResultsPage: Plan saved to Firestore with ID:', planId);
          
          // Store in localStorage as backup
          localStorage.setItem('aceplan_quiz_results', JSON.stringify(results));
          localStorage.setItem('aceplan_firestore_id', planId);
          
          setPlanSaved(true);
        } catch (error) {
          console.error('ResultsPage: Error saving plan to Firestore:', error);
          // Fallback to localStorage only
          localStorage.setItem('aceplan_quiz_results', JSON.stringify(results));
        } finally {
          setIsSaving(false);
        }
      }
    };

    savePlanToFirestore();
  }, [currentUser, results, isPreviousPlan, planSaved]);

  // Show login modal after 15 seconds
  useEffect(() => {
    console.log('ResultsPage: Setting up 15-second timer, currentUser:', currentUser);
    const timer = setTimeout(() => {
      if (!currentUser) {
        console.log('ResultsPage: 15 seconds passed, showing login modal');
        setShowLoginModal(true);
        console.log('ResultsPage: showLoginModal set to true');
      } else {
        console.log('ResultsPage: User already logged in, not showing modal');
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [currentUser]);

  // Debug currentUser changes
  useEffect(() => {
    console.log('ResultsPage: currentUser changed:', currentUser);
  }, [currentUser]);

  // Debug showLoginModal changes
  useEffect(() => {
    console.log('ResultsPage: showLoginModal changed:', showLoginModal);
  }, [showLoginModal]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.save-dropdown')) {
        setShowSaveOptions(false);
      }
    };

    if (showSaveOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSaveOptions]);

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // Helper function to add text with word wrapping
    const addWrappedText = (text: string, y: number, fontSize: number = 12) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, contentWidth);
      doc.text(lines, margin, y);
      return y + (lines.length * fontSize * 0.4);
    };

    // Helper function to add section header
    const addSectionHeader = (text: string, y: number) => {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      
      // Use blue for section headers
      doc.setTextColor(59, 130, 246); // Blue
      doc.text(text, margin, y);
      
      // Reset text color to black
      doc.setTextColor(0, 0, 0);
      return y + 10;
    };

    // Helper function to add subsection header
    const addSubsectionHeader = (text: string, y: number) => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      
      // Use green for subsection headers
      doc.setTextColor(34, 197, 94); // Green
      doc.text(text, margin, y);
      
      // Reset text color to black
      doc.setTextColor(0, 0, 0);
      return y + 8;
    };

    // Logo
    try {
      const logoWidth = 40;
      const logoHeight = 40;
      const logoX = (pageWidth - logoWidth) / 2;
      doc.addImage('/aceplanlogo.png', 'PNG', logoX, yPosition, logoWidth, logoHeight);
      yPosition += logoHeight + 10;
    } catch (error) {
      console.log('Logo not found, continuing without logo');
    }
    
    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    
    // Calculate text width for centering
    const titleText = 'ACE PLAN';
    const titleWidth = doc.getTextWidth(titleText);
    const titleX = (pageWidth - titleWidth) / 2;
    
    // Draw "ACE" in blue
    doc.setTextColor(59, 130, 246); // Blue color
    doc.text('ACE', titleX, yPosition);
    
    // Draw " PLAN" in green
    doc.setTextColor(34, 197, 94); // Green color
    const aceWidth = doc.getTextWidth('ACE');
    doc.text(' PLAN', titleX + aceWidth, yPosition);
    
    // Reset text color to black
    doc.setTextColor(0, 0, 0);
    yPosition += 15;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Personalized Tennis Recommendations', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // User Profile
    yPosition = addSectionHeader('Your Profile', yPosition);
    yPosition = addWrappedText(`Skill Level: ${results.skillLevel}`, yPosition);
    yPosition = addWrappedText(`Playing Style: ${results.playingStyle}`, yPosition);
    yPosition = addWrappedText(`Training Summary: ${results.trainingSummary}`, yPosition);
    yPosition += 10;

    // Racket Recommendations
    yPosition = addSectionHeader('Top Racket Recommendations', yPosition);
    
    results.rackets.forEach((racket, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      yPosition = addSubsectionHeader(`${index + 1}. ${racket.name} (${racket.category.toUpperCase()})`, yPosition);
      yPosition = addWrappedText(`Price: $${racket.price} | Brand: ${racket.brand}`, yPosition);
      yPosition = addWrappedText(`Weight: ${racket.weight} | Head Size: ${racket.headSize}`, yPosition);
      yPosition = addWrappedText(`Stiffness: ${racket.stiffness} | Level: ${racket.level}`, yPosition);
      yPosition += 3; // Add space before description
      yPosition = addWrappedText(`Description: ${racket.description}`, yPosition);
      yPosition += 3; // Add space before pros
      
      yPosition = addWrappedText('Pros:', yPosition);
      racket.pros.forEach(pro => {
        yPosition = addWrappedText(`• ${pro}`, yPosition, 10);
      });
      yPosition += 2; // Add space before cons
      
      yPosition = addWrappedText('Cons:', yPosition);
      racket.cons.forEach(con => {
        yPosition = addWrappedText(`• ${con}`, yPosition, 10);
      });
      yPosition += 5;
    });

    // String Recommendations
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    yPosition = addSectionHeader('Top String Recommendations', yPosition);
    
    results.strings.forEach((string, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      yPosition = addSubsectionHeader(`${index + 1}. ${string.name}`, yPosition);
      yPosition = addWrappedText(`Type: ${string.type} | Price: $${string.price}`, yPosition);
      yPosition = addWrappedText(`Tension: ${string.tension}`, yPosition);
      yPosition = addWrappedText(`Best For: ${string.bestFor.join(', ')}`, yPosition);
      yPosition += 3; // Add space before description
      yPosition = addWrappedText(`Description: ${string.description}`, yPosition);
      yPosition += 5;
    });

    // Explanation
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    yPosition = addSectionHeader('Why These Recommendations?', yPosition);
    yPosition = addWrappedText(results.explanation, yPosition);
    yPosition += 10;

    // Training Plan
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    yPosition = addSectionHeader('Your 4-Week Training Plan', yPosition);
    
    if (results.trainingPlan && results.trainingPlan.length > 0) {
      results.trainingPlan.forEach((week, weekIndex) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        
        yPosition = addSubsectionHeader(`Week ${week.weekNumber || weekIndex + 1}`, yPosition);
        
        if (week.days && week.days.length > 0) {
          week.days.forEach((day, dayIndex) => {
            if (yPosition > 250) {
              doc.addPage();
              yPosition = 20;
            }
            
            yPosition = addWrappedText(`${day.day || `Day ${dayIndex + 1}`}:`, yPosition, 12);
            
            if (day.drills && day.drills.length > 0) {
              day.drills.forEach((drill, drillIndex) => {
                if (yPosition > 250) {
                  doc.addPage();
                  yPosition = 20;
                }
                
                const drillName = drill.name || `Drill ${drillIndex + 1}`;
                const drillDuration = drill.duration || '15';
                const drillDescription = drill.description || 'Tennis drill';
                
                yPosition = addWrappedText(`• ${drillName} (${drillDuration} min)`, yPosition, 10);
                yPosition += 2; // Add space before description
                yPosition = addWrappedText(`  ${drillDescription}`, yPosition, 10);
                
                if (drill.instructions && drill.instructions.length > 0) {
                  yPosition += 2; // Add space before instructions
                  drill.instructions.forEach((instruction, instIndex) => {
                    if (yPosition > 250) {
                      doc.addPage();
                      yPosition = 20;
                    }
                    const instructionText = instruction || `Step ${instIndex + 1}`;
                    yPosition = addWrappedText(`  ${instIndex + 1}. ${instructionText}`, yPosition, 9);
                  });
                }
                
                yPosition += 3; // Add more space between drills
              });
            }
            
            if (day.notes) {
              yPosition = addWrappedText(`Notes: ${day.notes}`, yPosition, 10);
            }
            
            yPosition += 5;
          });
        }
        
        yPosition += 5;
      });
    } else {
      yPosition = addWrappedText('Training plan will be generated based on your profile.', yPosition, 12);
    }

    // Footer
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Generated by AcePlan - Practice Hard. Play harder.', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 5;
    doc.text('© 2025 AcePlan. All rights reserved.', pageWidth / 2, yPosition, { align: 'center' });

    return doc;
  };

  const handleSavePDF = async () => {
    setIsSaving(true);
    try {
      const doc = generatePDF();
      doc.save(`aceplan-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error saving PDF:', error);
    } finally {
      setIsSaving(false);
      setShowSaveOptions(false);
    }
  };

  const handleSaveTXT = async () => {
    setIsSaving(true);
    
    try {
      // Create a comprehensive PDF-like document
      const content = `
ACE PLAN - PERSONALIZED TENNIS RECOMMENDATIONS

Your Profile:
- Skill Level: ${results.skillLevel}
- Playing Style: ${results.playingStyle}
- Training Summary: ${results.trainingSummary}

TOP RACKET RECOMMENDATIONS:
${results.rackets.map((racket, index) => `
${index + 1}. ${racket.name} (${racket.category.toUpperCase()})
   Price: $${racket.price}
   Brand: ${racket.brand}
   Weight: ${racket.weight}
   Head Size: ${racket.headSize}
   Stiffness: ${racket.stiffness}
   Level: ${racket.level}
   
   Description: ${racket.description}
   
   Pros:
   ${racket.pros.map(pro => `   • ${pro}`).join('\n')}
   
   Cons:
   ${racket.cons.map(con => `   • ${con}`).join('\n')}
`).join('\n')}

TOP STRING RECOMMENDATIONS:
${results.strings.map((string, index) => `
${index + 1}. ${string.name}
   Type: ${string.type}
   Price: $${string.price}
   Tension: ${string.tension}
   Best For: ${string.bestFor.join(', ')}
   
   Description: ${string.description}
`).join('\n')}

TRAINING PLAN SUMMARY:
${results.trainingSummary}

WHY THESE RECOMMENDATIONS:
${results.explanation}

YOUR 4-WEEK TRAINING PLAN:
${results.trainingPlan && results.trainingPlan.length > 0 ? results.trainingPlan.map((week, weekIndex) => `
WEEK ${week.weekNumber || weekIndex + 1}:
${week.days && week.days.length > 0 ? week.days.map((day, dayIndex) => `
${day.day || `Day ${dayIndex + 1}`}:
${day.drills && day.drills.length > 0 ? day.drills.map((drill, drillIndex) => `
• ${drill.name || `Drill ${drillIndex + 1}`} (${drill.duration || '15'} min)
  ${drill.description || 'Tennis drill'}
${drill.instructions && drill.instructions.length > 0 ? drill.instructions.map((instruction, instIndex) => `  ${instIndex + 1}. ${instruction || `Step ${instIndex + 1}`}`).join('\n') : ''}
`).join('') : 'No drills assigned for this day.'}
${day.notes ? `Notes: ${day.notes}` : ''}
`).join('') : 'No training days assigned for this week.'}
`).join('') : 'Training plan will be generated based on your profile.'}

Generated by AcePlan - Practice Hard. Play harder.
© 2025 AcePlan. All rights reserved.
      `;

      // Create a blob and download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `aceplan-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error saving AcePlan:', error);
    } finally {
      setIsSaving(false);
      setShowSaveOptions(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'best':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'better':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'best':
        return 'Top Pick';
      case 'better':
        return 'Great Choice';
      case 'good':
        return 'Good Option';
      default:
        return 'Option';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" id="results">
      {/* User Profile Header - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <UserProfileHeader />
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {isLoadedPlan ? 'Your Loaded AcePlan' : 
           isPreviousPlan ? 'Your Current AcePlan' : 
           'Your Personalized AcePlan'}
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {isLoadedPlan ? 'Here\'s the AcePlan you selected from your saved plans' :
           isPreviousPlan ? 'Continue with your current AcePlan session' :
           'Your personalized tennis equipment and training recommendations'}
        </p>
        <div className="flex justify-center space-x-4 flex-wrap gap-4">
          {/* Save Dropdown */}
          <div className="relative save-dropdown">
            <button
              onClick={() => setShowSaveOptions(!showSaveOptions)}
              disabled={isSaving}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              <span>{isSaving ? 'Saving...' : 'Save AcePlan'}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showSaveOptions && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                <button
                  onClick={handleSavePDF}
                  disabled={isSaving}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 flex items-center space-x-2"
                >
                  <span className="text-red-500 font-bold">📄</span>
                  <span>Save as PDF</span>
                </button>
                <button
                  onClick={handleSaveTXT}
                  disabled={isSaving}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <span className="text-blue-500 font-bold">📝</span>
                  <span>Save as TXT</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Sign In Button - Only show if user is not logged in */}
          {!currentUser && (
            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200"
            >
              <User className="h-4 w-4" />
              <span>Sign in to Save Results</span>
            </button>
          )}
        </div>
      </div>

      {/* Training Summary */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Your Training Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-center">
            {results.trainingSummary}
          </p>
        </div>
      </div>

      {/* Explanation */}
      <div className="mb-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Why These Recommendations?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {results.explanation}
          </p>
        </div>
      </div>

      {/* Training Calendar */}
      <TrainingCalendar trainingPlan={results.trainingPlan} />

      {/* Monthly Calendar Button */}
      <div className="text-center mb-12">
        <button
          onClick={() => window.open('/monthly-calendar', '_blank')}
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-green-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <Calendar className="h-5 w-5" />
          <span>Show Monthly Calendar</span>
        </button>
        <p className="text-gray-600 mt-3 text-sm">
          View your training plan in a full monthly calendar format
        </p>
      </div>

      {/* Racket Recommendations */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Recommended Rackets
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {results.rackets.map((racket, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="text-center mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(racket.category)} mb-3`}>
                  <Star className="h-3 w-3 mr-1" />
                  {getCategoryLabel(racket.category)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{racket.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{racket.brand}</p>
                <p className="text-lg font-semibold text-green-600">${racket.price}</p>
              </div>

              <p className="text-gray-700 text-sm mb-4">{racket.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{racket.weight}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Head Size:</span>
                  <span className="font-medium">{racket.headSize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stiffness:</span>
                  <span className="font-medium">{racket.stiffness}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{racket.level}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Pros:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {racket.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Cons:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {racket.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={racket.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <span>View on Amazon</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* String Recommendations */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Recommended Strings
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {results.strings.map((string, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{string.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{string.type}</p>
                <p className="text-lg font-semibold text-green-600">${string.price}</p>
              </div>

              <p className="text-gray-700 text-sm mb-4">{string.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tension:</span>
                  <span className="font-medium">{string.tension}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Best For:</span>
                  <span className="font-medium text-right">{string.bestFor.join(', ')}</span>
                </div>
              </div>

              <a
                href={string.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <span>View on Amazon</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>


        

      {/* Gear Recommendations */}
      <GearRecommendations 
        skillLevel={results.skillLevel} 
        trainingDays={'3-4 days per week'} 
      />

      {/* Login Modal and User Profile */}
      {showLoginModal && (
        <>
          {console.log('ResultsPage: Rendering LoginModal with showLoginModal:', showLoginModal)}
          <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} quizResults={results} />
        </>
      )}
      {currentUser && <UserProfile />}
    </div>
  );
}

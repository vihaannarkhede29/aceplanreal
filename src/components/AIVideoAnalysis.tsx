'use client';

import { useState, useRef } from 'react';
import { Upload, Play, Pause, RotateCcw, Download, ArrowLeft, Camera, Zap, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface AIVideoAnalysisProps {
  onBackToHome?: () => void;
}

interface AnalysisResult {
  overallScore: number;
  technique: {
    forehand: { score: number; feedback: string; improvements: string[] };
    backhand: { score: number; feedback: string; improvements: string[] };
    serve: { score: number; feedback: string; improvements: string[] };
    volley: { score: number; feedback: string; improvements: string[] };
  };
  footwork: {
    score: number;
    feedback: string;
    improvements: string[];
  };
  recommendations: string[];
  videoUrl?: string;
}

export default function AIVideoAnalysis({ onBackToHome }: AIVideoAnalysisProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setUploadedVideo(file);
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis processing time
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Mock analysis results
    const mockResult: AnalysisResult = {
      overallScore: 78,
      technique: {
        forehand: {
          score: 82,
          feedback: "Your forehand shows good power and spin generation. The follow-through is consistent and you're making good contact with the ball.",
          improvements: [
            "Try to keep your non-dominant hand on the racket longer during the backswing",
            "Focus on rotating your hips more to generate additional power",
            "Work on maintaining a consistent contact point"
          ]
        },
        backhand: {
          score: 75,
          feedback: "Solid two-handed backhand with good control. Your preparation is timely and the stroke is compact.",
          improvements: [
            "Extend your arms more through the contact point for better depth",
            "Practice hitting with more topspin to improve consistency",
            "Work on your footwork to get into better position"
          ]
        },
        serve: {
          score: 70,
          feedback: "Your serve has good pace but could benefit from more consistency. The toss placement is generally good.",
          improvements: [
            "Focus on a more consistent ball toss height and placement",
            "Work on your follow-through to improve accuracy",
            "Practice the serve motion to develop muscle memory"
          ]
        },
        volley: {
          score: 65,
          feedback: "Basic volley technique is present but needs refinement. You're getting to the net well.",
          improvements: [
            "Keep your racket head up and in front of your body",
            "Use shorter, more compact strokes at the net",
            "Practice split-stepping before each volley"
          ]
        }
      },
      footwork: {
        score: 80,
        feedback: "Good court coverage and positioning. You're moving well to the ball and recovering effectively.",
        improvements: [
          "Work on your split-step timing to improve reaction time",
          "Practice lateral movement drills to enhance court coverage",
          "Focus on maintaining balance during direction changes"
        ]
      },
      recommendations: [
        "Focus on improving your serve consistency - this will have the biggest impact on your game",
        "Practice volley drills to become more comfortable at the net",
        "Work on your backhand depth to create more pressure on opponents",
        "Consider taking lessons to refine your technique further"
      ]
    };
    
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setUploadedVideo(null);
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Work';
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
                <h1 className="text-3xl font-bold text-gray-900">AI Video Analysis</h1>
                <p className="text-gray-600 mt-1">
                  Upload your tennis video and get instant AI-powered technique analysis
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              <Zap className="h-4 w-4" />
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!analysisResult ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Camera className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Video</h2>
                <p className="text-gray-600">
                  Record yourself playing tennis and get instant AI analysis of your technique
                </p>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                {!uploadedVideo ? (
                  <div>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-gray-500 mb-4">
                      MP4, MOV, AVI up to 100MB
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Choose Video File
                    </button>
                  </div>
                ) : (
                  <div>
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      Video Uploaded Successfully
                    </p>
                    <p className="text-gray-500 mb-4">
                      {uploadedVideo.name} ({(uploadedVideo.size / 1024 / 1024).toFixed(1)} MB)
                    </p>
                    <div className="flex space-x-3 justify-center">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                      >
                        Change Video
                      </button>
                      <button
                        onClick={resetAnalysis}
                        className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Preview */}
              {videoPreview && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Video Preview</h3>
                  <video
                    src={videoPreview}
                    controls
                    className="w-full rounded-lg shadow-sm"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
              )}

              {/* Analyze Button */}
              {uploadedVideo && (
                <div className="mt-8 text-center">
                  <button
                    onClick={simulateAnalysis}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-3 mx-auto"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Analyzing Video...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5" />
                        <span>Analyze My Technique</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What We Analyze</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Stroke Technique</h4>
                      <p className="text-gray-600 text-sm">Forehand, backhand, serve, and volley analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Footwork & Movement</h4>
                      <p className="text-gray-600 text-sm">Court coverage, positioning, and balance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">AI-Powered Insights</h4>
                      <p className="text-gray-600 text-sm">Personalized recommendations and improvements</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Tips for Best Results</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Record from the side of the court for best angle</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Include multiple strokes in your video</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Ensure good lighting and clear visibility</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Keep video under 2 minutes for faster processing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-8">
            {/* Overall Score */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Analysis Complete!</h2>
                <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{analysisResult.overallScore}/100</div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>
                  <div className="text-left">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(analysisResult.overallScore)}`}>
                      {getScoreLabel(analysisResult.overallScore)}
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      Great job! Your technique shows solid fundamentals with room for improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technique Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(analysisResult.technique).map(([stroke, data]) => (
                <div key={stroke} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 capitalize">{stroke}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{data.score}/100</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getScoreColor(data.score)}`}>
                        {getScoreLabel(data.score)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{data.feedback}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Improvements:</h4>
                    <ul className="space-y-1">
                      {data.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                          <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Footwork Analysis */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Footwork & Movement</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{analysisResult.footwork.score}/100</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${getScoreColor(analysisResult.footwork.score)}`}>
                    {getScoreLabel(analysisResult.footwork.score)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{analysisResult.footwork.feedback}</p>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Improvements:</h4>
                <ul className="space-y-1">
                  {analysisResult.footwork.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200 p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">Key Recommendations</h3>
              <ul className="space-y-3">
                {analysisResult.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-green-800">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetAnalysis}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Analyze Another Video</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

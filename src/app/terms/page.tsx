'use client';

import { FileText, AlertTriangle, Shield, Users, CreditCard, Gavel, Scale, CheckCircle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-lg text-gray-500 mt-2">
            Please read these terms carefully before using AcePlan services
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-blue-600" />
            Agreement to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms of Service ("Terms") govern your use of AcePlan's tennis equipment recommendation and training plan service ("Service"). By accessing or using our Service, you agree to be bound by these Terms and all applicable laws and regulations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you do not agree with any of these terms, you are prohibited from using or accessing this Service. The materials contained in this Service are protected by applicable copyright and trademark law.
          </p>
        </div>

        {/* Service Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="h-6 w-6 mr-3 text-green-600" />
            Service Description
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What AcePlan Provides</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Personalized Equipment Recommendations:</strong> AI-powered racket and string suggestions based on your profile</li>
                <li><strong>Custom Training Plans:</strong> 4-week progressive training programs with detailed drills</li>
                <li><strong>Skill Assessment:</strong> Tennis quiz to evaluate your playing level and preferences</li>
                <li><strong>Plan Management:</strong> Save, access, and manage your personalized AcePlan</li>
                <li><strong>Educational Content:</strong> Tennis tips, improvement strategies, and training guidance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Limitations</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Not Professional Coaching:</strong> Our training plans are educational tools, not substitute for professional instruction</li>
                <li><strong>Equipment Recommendations:</strong> Suggestions are based on available data and may not cover all options</li>
                <li><strong>Internet Required:</strong> Service requires active internet connection for full functionality</li>
                <li><strong>Device Compatibility:</strong> Service works best on modern web browsers and mobile devices</li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Accounts and Registration */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-3 text-purple-600" />
            User Accounts and Registration
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Creation</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>You must be at least 13 years old to create an account</li>
                <li>Account creation requires valid Google account authentication</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>One account per person is allowed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide accurate and complete information during registration</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Maintain the security of your login credentials</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Termination</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>You may terminate your account at any time through account settings</li>
                <li>We may terminate accounts for violations of these Terms</li>
                <li>Account termination results in permanent deletion of your data</li>
                <li>Some data may be retained for legal or business purposes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Acceptable Use */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
            Acceptable Use
          </h2>
          
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Permitted Uses</h3>
              <ul className="list-disc list-inside text-green-800 space-y-1 ml-4">
                <li>Access and use the Service for personal tennis improvement</li>
                <li>Create and manage your personalized AcePlan</li>
                <li>Share your AcePlan with coaches or training partners</li>
                <li>Use equipment recommendations for purchasing decisions</li>
                <li>Follow training plans for skill development</li>
              </ul>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Prohibited Uses</h3>
              <ul className="list-disc list-inside text-red-800 space-y-1 ml-4">
                <li>Attempting to reverse engineer or hack the Service</li>
                <li>Creating multiple accounts or sharing account access</li>
                <li>Using the Service for commercial purposes without permission</li>
                <li>Uploading malicious content or attempting to harm the platform</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Impersonating others or providing false information</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Scale className="h-6 w-6 mr-3 text-indigo-600" />
            Intellectual Property Rights
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Rights</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Service Content:</strong> All content, features, and functionality are owned by AcePlan</li>
                <li><strong>Trademarks:</strong> AcePlan name, logo, and related marks are our trademarks</li>
                <li><strong>Software:</strong> The platform code and technology are our intellectual property</li>
                <li><strong>Training Content:</strong> Drills, exercises, and training methodologies are proprietary</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Rights</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Personal Use:</strong> You may use the Service for personal tennis improvement</li>
                <li><strong>Your Data:</strong> You retain ownership of your personal information and quiz responses</li>
                <li><strong>Generated Plans:</strong> Your personalized AcePlan belongs to you</li>
                <li><strong>Fair Use:</strong> Limited sharing of your plan with coaches or partners is permitted</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Restrictions</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>You may not copy, modify, or distribute our content</li>
                <li>You may not use our trademarks without written permission</li>
                <li>You may not attempt to extract or scrape our data</li>
                <li>Commercial use of our content requires licensing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimers and Limitations */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3 text-orange-600" />
            Disclaimers and Limitations of Liability
          </h2>
          
          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">Service Disclaimers</h3>
              <ul className="list-disc list-inside text-orange-800 space-y-1 ml-4">
                <li><strong>No Guarantees:</strong> We do not guarantee specific results from using our training plans</li>
                <li><strong>Not Medical Advice:</strong> Our content is not a substitute for medical or professional advice</li>
                <li><strong>Equipment Accuracy:</strong> Equipment recommendations are suggestions, not definitive choices</li>
                <li><strong>Training Safety:</strong> Users are responsible for their own safety during training</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Limitation of Liability</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Maximum Liability:</strong> Our total liability shall not exceed the amount you paid for the Service</li>
                <li><strong>Excluded Damages:</strong> We are not liable for indirect, incidental, or consequential damages</li>
                <li><strong>Force Majeure:</strong> We are not liable for events beyond our reasonable control</li>
                <li><strong>Third-Party Services:</strong> We are not responsible for third-party services or content</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Indemnification</h3>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify and hold harmless AcePlan from any claims, damages, or expenses arising from your use of the Service, violation of these Terms, or infringement of any rights of another party.
              </p>
            </div>
          </div>
        </div>

        {/* Affiliate and Commercial Terms */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <CreditCard className="h-6 w-6 mr-3 text-blue-600" />
            Affiliate Links and Commercial Terms
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Affiliate Relationships</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Commission Disclosure:</strong> We may earn commissions from equipment purchases through affiliate links</li>
                <li><strong>No Additional Cost:</strong> Affiliate links do not increase the price you pay</li>
                <li><strong>Independent Reviews:</strong> Our recommendations are based on analysis, not commission rates</li>
                <li><strong>Transparency:</strong> We disclose affiliate relationships where applicable</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Purchasing Decisions</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Your Choice:</strong> Equipment recommendations are suggestions, not requirements</li>
                <li><strong>Research Recommended:</strong> We encourage you to research products before purchasing</li>
                <li><strong>No Warranty:</strong> We do not warranty or guarantee any equipment you purchase</li>
                <li><strong>Return Policies:</strong> Follow the retailer's return and warranty policies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy and Data */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using our Service, you consent to the collection and use of your information as described in our Privacy Policy.
          </p>
        </div>

        {/* Termination */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms remain in effect until terminated by either party. You may terminate by discontinuing use of the Service and deleting your account. We may terminate or suspend access immediately for violations of these Terms.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Upon termination, your right to use the Service ceases immediately, and we may delete your account and associated data.
          </p>
        </div>

        {/* Governing Law */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Disputes</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms are governed by applicable laws. Any disputes arising from these Terms or your use of the Service should be resolved through good faith discussions between the parties.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We encourage users to contact us directly to resolve any issues before pursuing other options.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to modify these Terms at any time. We will notify users of material changes through email or prominent notices on our platform. Your continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>
          <p className="text-gray-700 leading-relaxed">
            It is your responsibility to review these Terms periodically for changes.
          </p>
        </div>

        {/* Severability */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
          <p className="text-gray-700 leading-relaxed">
            If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="text-blue-100 leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-blue-100">
            <p><strong>Email:</strong> aceplan711@gmail.com</p>
            <p><strong>Address:</strong> AcePlan Legal Team, [Your Business Address]</p>
            <p><strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            These Terms of Service are effective as of {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} and apply to all users of AcePlan services.
          </p>
        </div>
      </div>
    </div>
  );
}

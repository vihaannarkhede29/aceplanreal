'use client';

import { Shield, Lock, Eye, Database, Globe, User, Bell, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-lg text-gray-500 mt-2">
            AcePlan ("we," "our," or "us") is committed to protecting your privacy
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Eye className="h-6 w-6 mr-3 text-blue-600" />
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This Privacy Policy explains how AcePlan collects, uses, discloses, and safeguards your information when you use our tennis equipment recommendation and training plan service. By using AcePlan, you consent to the data practices described in this policy.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We are committed to protecting your privacy and ensuring the security of your personal information. This policy applies to all users of our website, mobile applications, and services.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Database className="h-6 w-6 mr-3 text-green-600" />
            Information We Collect
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Account Information:</strong> Email address, display name, and profile picture when you sign in with Google</li>
                <li><strong>Profile Data:</strong> Tennis skill level, playing style, training preferences, and improvement goals</li>
                <li><strong>Equipment Preferences:</strong> Current racket information, budget constraints, and physical concerns</li>
                <li><strong>Training Data:</strong> Training schedule, weakest shots, and specific improvement areas</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Quiz Responses:</strong> All answers provided during the tennis assessment quiz</li>
                <li><strong>Recommendation Data:</strong> Generated equipment recommendations and training plans</li>
                <li><strong>Interaction Data:</strong> Pages visited, features used, and time spent on the platform</li>
                <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Log Data:</strong> IP address, access times, and pages viewed</li>
                <li><strong>Cookies:</strong> Session cookies and preference cookies for enhanced user experience</li>
                <li><strong>Analytics:</strong> Anonymous usage statistics and performance metrics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <User className="h-6 w-6 mr-3 text-purple-600" />
            How We Use Your Information
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Primary Services</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-1 ml-4">
                <li>Generate personalized tennis equipment recommendations</li>
                <li>Create customized 4-week training plans</li>
                <li>Provide skill-level appropriate drill instructions</li>
                <li>Save and manage your AcePlan for future access</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Service Improvement</h3>
              <ul className="list-disc list-inside text-green-800 space-y-1 ml-4">
                <li>Analyze usage patterns to improve our recommendations</li>
                <li>Enhance the accuracy of our AI-powered suggestions</li>
                <li>Develop new features and training methodologies</li>
                <li>Optimize user experience and platform performance</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Communication</h3>
              <ul className="list-disc list-inside text-purple-800 space-y-1 ml-4">
                <li>Send important service updates and notifications</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Share tennis tips and improvement strategies</li>
                <li>Notify about new features and training content</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Storage and Security */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Lock className="h-6 w-6 mr-3 text-red-600" />
            Data Storage and Security
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Storage Locations</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Firebase Firestore:</strong> User accounts, saved plans, and preferences stored securely in the cloud</li>
                <li><strong>Local Storage:</strong> Temporary data storage on your device for immediate access</li>
                <li><strong>Google Authentication:</strong> Secure sign-in handled by Google's authentication services</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Security Measures</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Encryption:</strong> All data transmitted and stored using industry-standard encryption</li>
                <li><strong>Access Controls:</strong> Strict authentication and authorization protocols</li>
                <li><strong>Regular Audits:</strong> Ongoing security assessments and vulnerability testing</li>
                <li><strong>Data Backup:</strong> Regular backups with disaster recovery procedures</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Retention</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Active Accounts:</strong> Data retained while your account is active</li>
                <li><strong>Inactive Accounts:</strong> Data may be archived after 2 years of inactivity</li>
                <li><strong>Account Deletion:</strong> Complete data removal within 30 days of account deletion request</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Sharing and Disclosure */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-3 text-indigo-600" />
            Data Sharing and Disclosure
          </h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">We Do NOT Share</h3>
              <ul className="list-disc list-inside text-yellow-800 space-y-1 ml-4">
                <li>Your personal information with third-party advertisers</li>
                <li>Individual user data with other users</li>
                <li>Your training plans or equipment preferences</li>
                <li>Any identifiable information without your explicit consent</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Limited Sharing (With Your Consent)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Trusted partners who help us operate our platform</li>
                <li><strong>Analytics:</strong> Anonymous, aggregated usage statistics for improvement</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
                <li><strong>Business Transfers:</strong> In case of company sale or merger (with notice)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Affiliate Links</h3>
              <p className="text-gray-700 leading-relaxed">
                Our equipment recommendations include affiliate links to tennis retailers. When you click these links, we may receive a small commission at no additional cost to you. We do not share your personal information with these retailers.
              </p>
            </div>
          </div>
        </div>

        {/* Your Rights and Choices */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ShieldCheck className="h-6 w-6 mr-3 text-green-600" />
            Your Rights and Choices
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Access and Control</h3>
              <ul className="list-disc list-inside text-green-800 space-y-2 ml-4">
                <li>View and download your personal data</li>
                <li>Update or correct your information</li>
                <li>Delete your account and associated data</li>
                <li>Export your AcePlan data</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Communication Preferences</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-2 ml-4">
                <li>Opt out of non-essential communications</li>
                <li>Control notification settings</li>
                <li>Manage email preferences</li>
                <li>Unsubscribe from marketing emails</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How to Exercise Your Rights</h3>
            <p className="text-gray-700 leading-relaxed">
              To exercise any of these rights, contact us at <strong>privacy@aceplan.com</strong> or use the account settings in your profile. We will respond to your request within 30 days.
            </p>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Bell className="h-6 w-6 mr-3 text-orange-600" />
            Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            AcePlan is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For users between 13-18 years old, we recommend parental guidance when using our services and creating accounts.
          </p>
        </div>

        {/* International Users */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            AcePlan is operated from the United States. If you are accessing our services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using our services, you consent to the transfer of your information to the United States and the processing of your information in accordance with this Privacy Policy.
          </p>
        </div>

        {/* Changes to This Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Posting the updated policy on our website</li>
            <li>Sending an email notification to your registered email address</li>
            <li>Displaying a prominent notice on our platform</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Your continued use of AcePlan after any changes indicates your acceptance of the updated Privacy Policy.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-blue-100 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-2 text-blue-100">
            <p><strong>Email:</strong> privacy@aceplan.com</p>
            <p><strong>Address:</strong> AcePlan Privacy Team, [Your Business Address]</p>
            <p><strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            This Privacy Policy is effective as of {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} and applies to all users of AcePlan services.
          </p>
        </div>
      </div>
    </div>
  );
}

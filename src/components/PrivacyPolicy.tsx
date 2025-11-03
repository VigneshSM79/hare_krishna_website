import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center mb-8">
            <Shield className="text-orange-600 mr-4" size={48} />
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
              <p className="text-gray-600 mt-2">Last updated: November 3, 2025</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                At Hare Krishna Temple Avadi, we are committed to protecting your privacy and ensuring the security
                of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Database className="text-blue-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Visit our temple and provide information</li>
                <li>Register for events or programs</li>
                <li>Subscribe to our newsletter</li>
                <li>Make donations or payments</li>
                <li>Access the admin portal (for authorized personnel only)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you visit our website, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>IP address and browser type</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Eye className="text-green-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>To provide and maintain our website services</li>
                <li>To communicate about temple programs, events, and activities</li>
                <li>To process your registrations and donations</li>
                <li>To send newsletters and updates (with your consent)</li>
                <li>To improve our website and user experience</li>
                <li>To ensure security and prevent fraud</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            {/* Data Storage and Security */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Lock className="text-purple-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Data Storage and Security</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Secure server infrastructure (Supabase)</li>
                <li>Encrypted data transmission (HTTPS/SSL)</li>
                <li>Regular security audits and updates</li>
                <li>Access controls for admin personnel</li>
                <li>Session timeout for inactive admin sessions (2 hours)</li>
              </ul>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience. You can
                control cookie preferences through your browser settings. However, disabling cookies may limit
                certain features of our website.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website uses the following third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>ImageKit.io:</strong> For image hosting and optimization</li>
                <li><strong>Supabase:</strong> For database and authentication services</li>
                <li><strong>Google Maps:</strong> For location services</li>
                <li><strong>YouTube:</strong> For video content</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                These services have their own privacy policies. We encourage you to review them.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <UserCheck className="text-orange-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Your Rights</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Data Portability:</strong> Request transfer of your data</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined
                in this privacy policy, unless a longer retention period is required by law. Event registrations
                and donation records are retained for accounting and legal purposes.
              </p>
            </section>

            {/* International Users */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Globe className="text-blue-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">International Users (GDPR Compliance)</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                If you are accessing our website from the European Union or other regions with data protection laws,
                please note that your information may be transferred to and processed in India. By using our website,
                you consent to this transfer. We comply with applicable data protection regulations, including GDPR.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website is not directed to children under the age of 13. We do not knowingly collect personal
                information from children. If you are a parent or guardian and believe your child has provided us
                with personal information, please contact us.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review
                this Privacy Policy periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="text-gray-700 space-y-2">
                <p><strong>Hare Krishna Temple Avadi</strong></p>
                <p>147, Chinnamman Koil St, Paruthippattu</p>
                <p>Annamalai Nagar, Ambattur, Avadi</p>
                <p>Chennai, Tamil Nadu 600054</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

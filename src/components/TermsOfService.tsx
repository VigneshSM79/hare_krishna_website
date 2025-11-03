import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertCircle, CheckCircle, XCircle, Scale } from 'lucide-react';

const TermsOfService = () => {
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
            <FileText className="text-orange-600 mr-4" size={48} />
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Terms of Service</h1>
              <p className="text-gray-600 mt-2">Last updated: November 3, 2025</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Welcome to Hare Krishna Temple Avadi's website. By accessing and using this website, you accept
                and agree to be bound by the terms and provision of this agreement. Please read these Terms of
                Service carefully before using our website.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-green-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Acceptance of Terms</h2>
              </div>

              <p className="text-gray-700 leading-relaxed">
                By accessing this website, you agree to comply with these Terms of Service and all applicable laws
                and regulations. If you do not agree with any of these terms, you are prohibited from using or
                accessing this site.
              </p>
            </section>

            {/* Use License */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Scale className="text-blue-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Use License</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on Hare Krishna Temple Avadi's website
                for personal, non-commercial viewing only. This is the grant of a license, not a transfer of title,
                and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
              </ul>
            </section>

            {/* Website Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Website Content</h2>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Accuracy of Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The materials on Hare Krishna Temple Avadi's website are provided on an 'as is' basis. We make
                no warranties, expressed or implied, and hereby disclaim and negate all other warranties including,
                without limitation, implied warranties or conditions of merchantability, fitness for a particular
                purpose, or non-infringement of intellectual property.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Events and Programs</h3>
              <p className="text-gray-700 leading-relaxed">
                Event dates, times, and programs are subject to change without notice. We reserve the right to
                cancel, modify, or reschedule any event or program at our discretion.
              </p>
            </section>

            {/* User Conduct */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <AlertCircle className="text-orange-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">User Conduct</h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to use the website to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Violate any local, state, national, or international law</li>
                <li>Infringe upon or violate our intellectual property rights or the rights of others</li>
                <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>Submit false or misleading information</li>
                <li>Upload viruses or other malicious code</li>
                <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>Interfere with or circumvent the security features of the website</li>
                <li>Engage in any automated use of the system</li>
              </ul>
            </section>

            {/* Admin Access */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Access and Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Access to the admin portal is restricted to authorized personnel only. Unauthorized access attempts
                are strictly prohibited and may result in legal action. Admin users must:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Maintain the confidentiality of login credentials</li>
                <li>Not share access with unauthorized persons</li>
                <li>Log out after each session</li>
                <li>Report any security breaches immediately</li>
                <li>Accept automatic logout after 2 hours of inactivity</li>
              </ul>
            </section>

            {/* Gallery and Images */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Gallery and Images</h2>
              <p className="text-gray-700 leading-relaxed">
                Images displayed in our gallery are the property of Hare Krishna Temple Avadi. By submitting photos
                to us or being photographed at temple events, you grant us permission to display these images on
                our website and promotional materials. If you wish to have your image removed, please contact us.
              </p>
            </section>

            {/* Donations */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Donations and Payments</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Donations made through our website are voluntary contributions to support temple activities.
                Please note:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>All donations are final and non-refundable</li>
                <li>Donations are used for temple maintenance, programs, and charitable activities</li>
                <li>Receipts will be provided for tax purposes as applicable</li>
                <li>We do not store payment card information on our servers</li>
              </ul>
            </section>

            {/* External Links */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Links to External Websites</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites (such as YouTube, Google Maps, social media).
                These links are provided for your convenience only. We have no control over the content of these
                sites and accept no responsibility for them or for any loss or damage that may arise from your use
                of them.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The content, layout, design, data, databases, and graphics on this website are protected by
                intellectual property laws. The Hare Krishna name, logo, and all related names, logos, product and
                service names, designs, and slogans are trademarks of ISKCON and Hare Krishna Temple Avadi.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <XCircle className="text-red-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Limitation of Liability</h2>
              </div>

              <p className="text-gray-700 leading-relaxed">
                In no event shall Hare Krishna Temple Avadi or its members be liable for any damages (including,
                without limitation, damages for loss of data or profit, or due to business interruption) arising
                out of the use or inability to use the materials on this website.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Hare Krishna Temple Avadi, its members, officers,
                directors, employees, and agents from any claims, damages, losses, liabilities, and expenses
                (including attorneys' fees) arising from your use of the website or violation of these Terms of Service.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to terminate or suspend access to our website immediately, without prior notice
                or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service shall be governed and construed in accordance with the laws of India, without
                regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to
                the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify or replace these Terms of Service at any time. If a revision is
                material, we will provide at least 30 days' notice prior to any new terms taking effect. What
                constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="text-gray-700 space-y-2">
                <p><strong>Hare Krishna Temple Avadi</strong></p>
                <p>147, Chinnamman Koil St, Paruthippattu</p>
                <p>Annamalai Nagar, Ambattur, Avadi</p>
                <p>Chennai, Tamil Nadu 600054</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-blue-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed">
                <strong>BY USING THIS WEBSITE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND
                AGREE TO BE BOUND BY THEM.</strong>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

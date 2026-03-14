import React, { useState } from 'react';
import { Heart, Home, UtensilsCrossed, PartyPopper, Flower2, CheckCircle, Loader2, QrCode } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';

const CATEGORIES = [
  { id: 'Temple Maintenance', label: 'Temple Maintenance', icon: Home, description: 'Support upkeep and renovation of the temple premises' },
  { id: 'Annadanam (Food Service)', label: 'Annadanam (Food Service)', icon: UtensilsCrossed, description: 'Sponsor free meals for devotees and the needy' },
  { id: 'Festival Sponsorship', label: 'Festival Sponsorship', icon: PartyPopper, description: 'Help organize grand celebrations for Vaishnava festivals' },
  { id: 'Deity Decoration', label: 'Deity Decoration', icon: Flower2, description: 'Contribute to beautiful decorations for Their Lordships' },
];

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_SEVA_SCRIPT_URL as string;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const Donation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: '',
    transactionId: '',
    notes: '',
    category: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setFormData(prev => ({ ...prev, category: categoryId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      setErrorMessage('Please select a donation category.');
      return;
    }
    setErrorMessage('');
    setFormState('submitting');

    try {
      const params = new URLSearchParams({
        sheet: 'Donations',
        name: formData.name,
        phone: formData.phone,
        amount: formData.amount,
        category: formData.category,
        transactionId: formData.transactionId,
        notes: formData.notes,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      });

      await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`);
      setFormState('success');
      setFormData({ name: '', phone: '', amount: '', transactionId: '', notes: '', category: '' });
    } catch {
      setFormState('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Banner */}
        <div className="pt-24 pb-16 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-6 shadow-lg">
              <Heart className="text-white" size={32} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Support the Temple
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your generous contributions help sustain the daily worship, festivals, and community
              services at our temple. Every donation, big or small, is a sacred offering to
              Lord Krishna and goes directly towards maintaining His abode and serving His devotees.
            </p>
          </div>
        </div>

        {/* QR Code Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                <QrCode className="text-orange-500" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Scan to Donate via UPI</h2>
              <p className="text-gray-500 mb-6">Use any UPI app to scan the QR code below</p>
              <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 shadow-md inline-block">
                <img
                  src="/upi-qr.png"
                  alt="UPI QR Code for Donation"
                  className="w-64 h-64 mx-auto object-contain"
                />
              </div>
              <p className="text-sm text-gray-400 mt-4">
                After payment, please fill in the form below so we can acknowledge your donation.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">

              {formState === 'success' ? (
                <div className="text-center py-16 px-8 bg-green-50 rounded-2xl border border-green-200">
                  <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Hare Krishna!</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Thank you for your generous donation. May Lord Krishna bless you abundantly
                    for your selfless contribution to His service.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-8 px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Make Another Donation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Record Your Donation</h2>
                    <p className="text-gray-500">Fill in the details after completing your UPI payment</p>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Donation Category <span className="text-orange-500">*</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CATEGORIES.map(({ id, label, icon: Icon, description }) => {
                        const isSelected = formData.category === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => handleCategorySelect(id)}
                            className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${isSelected
                                ? 'border-green-500 bg-green-50 shadow-md'
                                : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                              }`}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`p-2 rounded-lg ${isSelected ? 'bg-green-500 text-white' : 'bg-orange-100 text-orange-500'}`}>
                                <Icon size={20} />
                              </div>
                              <span className={`font-semibold ${isSelected ? 'text-green-700' : 'text-gray-700'}`}>
                                {label}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                          </button>
                        );
                      })}
                    </div>
                    {errorMessage && (
                      <p className="mt-3 text-sm text-red-500">{errorMessage}</p>
                    )}
                  </div>

                  {/* Donation Details */}
                  <div className="bg-orange-50 rounded-2xl p-8 space-y-5">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Details</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (₹) <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="1"
                        placeholder="Enter donation amount"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transaction / Reference ID <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        required
                        placeholder="UPI transaction reference number"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Any message or special purpose for the donation"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
                      />
                    </div>
                  </div>

                  {formState === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      Something went wrong while submitting your donation details. Please try again or contact us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 active:scale-95 transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 size={22} className="animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Heart size={22} />
                        <span>Submit Donation Details</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Donation;

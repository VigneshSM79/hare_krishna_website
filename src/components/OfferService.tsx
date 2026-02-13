import React, { useState } from 'react';
import { Heart, Utensils, Sparkles, Flower2, CheckCircle, Loader2 } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';

const SERVICES = [
  { id: 'cooking', label: 'Cooking Service', icon: Utensils, description: 'Prepare prasadam offerings for the deities and devotees' },
  { id: 'cleaning', label: 'Cleaning Service', icon: Sparkles, description: 'Help maintain the purity and cleanliness of the temple' },
  { id: 'decorating', label: 'Decorating Service', icon: Heart, description: 'Decorate the temple for festivals and daily worship' },
  { id: 'garland', label: 'Garland Making', icon: Flower2, description: 'Craft beautiful flower garlands for deity decoration' },
];

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_SEVA_SCRIPT_URL as string;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const OfferService = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    services: [] as string[],
  });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      setErrorMessage('Please select at least one service you would like to offer.');
      return;
    }
    setErrorMessage('');
    setFormState('submitting');

    try {
      const params = new URLSearchParams({
        sheet: 'Seva Registrations',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        services: formData.services.join(', '),
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      });

      await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, { method: 'GET', mode: 'no-cors' });
      setFormState('success');
      setFormData({ name: '', email: '', phone: '', address: '', services: [] });
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
              Offer Your Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              In the Vaishnava tradition, <span className="font-semibold text-orange-600">seva</span> —
              devotional service — is one of the highest forms of worship. Every act of service
              offered with love and sincerity reaches the Lord directly. Join our community of
              dedicated devotees and let your hands become an instrument of His will.
              Whether you cook, clean, decorate or craft garlands, your seva is a sacred offering.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">

              {formState === 'success' ? (
                <div className="text-center py-16 px-8 bg-green-50 rounded-2xl border border-green-200">
                  <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Hare Krishna!</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Thank you for your willingness to serve. Your registration has been received.
                    A devotee from our temple will contact you soon to guide you through your seva.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-8 px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Register Another Devotee
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Seva Registration</h2>
                    <p className="text-gray-500">Fill in your details and choose how you'd like to serve</p>
                  </div>

                  {/* Personal Details */}
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
                        Email Address <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
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
                        Address <span className="text-orange-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Your residential address"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Choose Your Seva <span className="text-orange-500">*</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SERVICES.map(({ id, label, icon: Icon, description }) => {
                        const isSelected = formData.services.includes(id);
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => handleServiceToggle(id)}
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

                  {formState === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      Something went wrong while submitting your form. Please try again or contact us directly.
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
                        <span>Offer My Service</span>
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

export default OfferService;

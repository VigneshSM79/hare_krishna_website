import React, { useState } from 'react';
import { UtensilsCrossed, CheckCircle, Loader2 } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import {
  AREAS,
  SPONSORSHIP_OPTIONS,
  SponsorshipId,
  markSponsorRegistered,
  normalizeWhatsApp,
} from '../config/sponsorship';
import { submitForm } from '../lib/submitForm';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const initialFormData = {
  name: '',
  whatsapp: '',
  area: '',
  otherArea: '',
  sponsorship: '' as SponsorshipId | '',
};

const SponsorPrasadam = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const whatsapp = normalizeWhatsApp(formData.whatsapp);
    if (!whatsapp) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number for WhatsApp.');
      return;
    }
    if (!formData.area) {
      setErrorMessage('Please tell us which area you are coming from.');
      return;
    }
    if (formData.area === 'Other' && !formData.otherArea.trim()) {
      setErrorMessage('Please type the name of your area.');
      return;
    }
    if (!formData.sponsorship) {
      setErrorMessage('Please choose one of the prasadam sponsorship options.');
      return;
    }

    setErrorMessage('');
    setFormState('submitting');

    const chosen = SPONSORSHIP_OPTIONS.find(option => option.id === formData.sponsorship);

    try {
      // submitForm throws unless the row actually reached the sheet, so the
      // thank-you screen below can only ever mean the real thing.
      await submitForm('prasadam', {
        name: formData.name.trim(),
        whatsapp,
        area: formData.area === 'Other' ? formData.otherArea.trim() : formData.area,
        sponsorship: chosen ? chosen.label : '',
      });

      markSponsorRegistered();
      setFormState('success');
      setFormData(initialFormData);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '');
      setFormState('error');
    }
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-sm border border-line bg-paper focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition';

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        {/* Intro band */}
        <section className="pt-[calc(var(--header-h)+60px)] pb-16 bg-paper-2">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-md bg-saffron/10 mb-6">
                <UtensilsCrossed className="text-saffron" size={26} />
              </div>
              <p className="eyebrow mb-4">Prasadam Seva</p>
              <h1 className="font-display font-medium text-4xl lg:text-5xl text-ink mb-6 leading-tight">
                Register to Sponsor Prasadam
              </h1>
              <p className="text-xl text-stone leading-relaxed">
                Prasadam is the sanctified feast offered first to Lord Krishna and then shared with
                everyone who comes to the temple. Leave your details below so we know to welcome
                you — and if you wish, offer to sponsor a feast for the whole community.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-20 bg-paper">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">

              {formState === 'success' ? (
                <div className="text-center py-16 px-8 bg-paper-2 rounded-md border border-line">
                  <CheckCircle className="text-peacock mx-auto mb-4" size={64} />
                  <h2 className="font-display font-medium text-3xl text-ink mb-4">Hare Krishna!</h2>
                  <p className="text-lg text-stone leading-relaxed">
                    Thank you for registering. A devotee from the temple will reach you on WhatsApp
                    with the details of the next prasadam feast.
                  </p>
                  <button onClick={() => setFormState('idle')} className="btn-primary mt-8">
                    Register Another Devotee
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="text-center mb-10">
                    <h2 className="font-display font-medium text-2xl text-ink mb-2">
                      Devotee Registration
                    </h2>
                    <p className="text-stone">Takes less than a minute</p>
                  </div>

                  {/* Details */}
                  <div className="bg-paper-2 border border-line rounded-md p-8 space-y-5">
                    <h3 className="font-display font-medium text-lg text-ink mb-4">Your Details</h3>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">
                        Full Name <span className="text-saffron">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-ink mb-1">
                        WhatsApp Number <span className="text-saffron">*</span>
                      </label>
                      <input
                        id="whatsapp"
                        type="tel"
                        name="whatsapp"
                        inputMode="numeric"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                        placeholder="98765 43210"
                        className={inputClasses}
                      />
                      <p className="text-sm text-stone mt-1">
                        We will send festival and prasadam updates to this number on WhatsApp.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-ink mb-1">
                        Area You Come From <span className="text-saffron">*</span>
                      </label>
                      <select
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      >
                        <option value="">Select your area</option>
                        {AREAS.map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>

                    {formData.area === 'Other' && (
                      <div>
                        <label htmlFor="otherArea" className="block text-sm font-medium text-ink mb-1">
                          Which area? <span className="text-saffron">*</span>
                        </label>
                        <input
                          id="otherArea"
                          type="text"
                          name="otherArea"
                          value={formData.otherArea}
                          onChange={handleChange}
                          required
                          placeholder="Type your area or locality"
                          className={inputClasses}
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="sponsorship" className="block text-sm font-medium text-ink mb-1">
                        Would You Like to Sponsor Prasadam? <span className="text-saffron">*</span>
                      </label>
                      <select
                        id="sponsorship"
                        name="sponsorship"
                        value={formData.sponsorship}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      >
                        <option value="">Select an option</option>
                        {SPONSORSHIP_OPTIONS.map(({ id, label, description }) => (
                          <option key={id} value={id}>{`${label} — ${description}`}</option>
                        ))}
                      </select>
                      <p className="text-sm text-stone mt-1">
                        There is no obligation — every devotee is welcome either way.
                      </p>
                    </div>
                  </div>

                  {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

                  {formState === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                      {errorMessage ||
                        'Something went wrong while sending your details. Please try again, or contact the temple directly.'}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="btn-primary w-full py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed space-x-2"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 size={22} className="animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <UtensilsCrossed size={22} />
                        <span>Complete Registration</span>
                      </>
                    )}
                  </button>

                  <p className="text-sm text-stone text-center">
                    Your details are used only by Hare Krishna Temple Avadi to contact you about
                    temple programs. We never share them with anyone else.
                  </p>
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

export default SponsorPrasadam;

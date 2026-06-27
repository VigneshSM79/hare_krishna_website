import React, { useState } from 'react';
import { Heart, Home, UtensilsCrossed, PartyPopper, Flower2, CheckCircle, Loader2, QrCode, Soup, Clock, Sparkles, ReceiptText } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';

const CATEGORIES = [
  { id: 'Temple Maintenance', label: 'Temple Maintenance', icon: Home, description: 'Support upkeep and renovation of the temple premises' },
  { id: 'Annadanam (Food Service)', label: 'Annadanam (Food Service)', icon: UtensilsCrossed, description: 'Sponsor free meals for devotees and the needy' },
  { id: 'Festival Sponsorship', label: 'Festival Sponsorship', icon: PartyPopper, description: 'Help organize grand celebrations for Vaishnava festivals' },
  { id: 'Deity Decoration', label: 'Deity Decoration', icon: Flower2, description: 'Contribute to beautiful decorations for Their Lordships' },
];

// Preset contribution tiers. Amounts and per-meal cost are placeholders — confirm real values.
const PRESET_AMOUNTS = [500, 1100, 2100, 5000];
const COST_PER_MEAL = 20; // TODO: confirm the real cost of sponsoring one meal (₹).

// Impact figures shown in the cause section. TODO: replace with real temple numbers.
const IMPACT_STATS = [
  { icon: Soup, value: '500+', label: 'meals served monthly' }, // TODO: real figure
  { icon: Clock, value: '8:30 – 9:30pm', label: 'free prasadam, every Saturday' },
  { icon: Sparkles, value: 'Since 2014', label: 'serving the community' },
];

// Real Annadana (free prasadam) photos from the temple.
const CAUSE_IMAGE = '/annadana.jpg';
const CAUSE_GALLERY = [
  { src: '/annadana-3.jpg', alt: 'A young volunteer serving prasadam to seated devotees' },
  { src: '/annadana-2.jpg', alt: 'Devotees of all ages receiving free prasadam on leaf plates' },
  { src: '/annadana-4.jpg', alt: 'Women and children sharing prasadam together at the temple' },
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
  'Lakshadweep', 'Puducherry',
];

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_SEVA_SCRIPT_URL as string;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const initialFormData = {
  name: '',
  phone: '',
  amount: '',
  transactionId: '',
  notes: '',
  category: '',
  want80G: false,
  pan: '',
  addressDoor: '',
  addressBuilding: '',
  addressStreet: '',
  addressArea: '',
  state: '',
  city: '',
  pincode: '',
};

const Donation = () => {
  const [formData, setFormData] = useState(initialFormData);
  // null = nothing chosen yet, a number = a preset tier, 'custom' = free-text amount.
  const [amountChoice, setAmountChoice] = useState<number | 'custom' | null>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setFormData(prev => ({ ...prev, category: categoryId }));
  };

  const handlePresetSelect = (amount: number) => {
    setAmountChoice(amount);
    setFormData(prev => ({ ...prev, amount: String(amount) }));
  };

  const handleCustomSelect = () => {
    setAmountChoice('custom');
    setFormData(prev => ({ ...prev, amount: '' }));
  };

  const mealsFor = (amount: string) => {
    const value = Number(amount);
    if (!value || value < COST_PER_MEAL) return null;
    return Math.floor(value / COST_PER_MEAL);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      setErrorMessage('Please select a donation category.');
      return;
    }
    if (!formData.amount) {
      setErrorMessage('Please choose or enter a donation amount.');
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
        want80G: formData.want80G ? 'Yes' : 'No',
        pan: formData.want80G ? formData.pan : '',
        addressDoor: formData.want80G ? formData.addressDoor : '',
        addressBuilding: formData.want80G ? formData.addressBuilding : '',
        addressStreet: formData.want80G ? formData.addressStreet : '',
        addressArea: formData.want80G ? formData.addressArea : '',
        state: formData.want80G ? formData.state : '',
        city: formData.want80G ? formData.city : '',
        pincode: formData.want80G ? formData.pincode : '',
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      });

      await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`);
      setFormState('success');
      setFormData(initialFormData);
      setAmountChoice(null);
    } catch {
      setFormState('error');
    }
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-sm border border-line bg-paper focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition';

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="pt-32 pb-16 bg-paper-2">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
              <div>
                <p className="eyebrow mb-4">Seva &amp; Donations</p>
                <h1 className="font-display font-medium text-4xl lg:text-5xl text-ink mb-6 leading-tight">
                  Support the Temple
                </h1>
                <p className="text-xl text-stone leading-relaxed">
                  Your generous contributions sustain the daily worship, festivals, and community
                  services at our temple. Every donation, big or small, is a sacred offering to
                  Lord Krishna — going directly towards maintaining His abode and serving His devotees.
                </p>
              </div>
              <div className="rounded-md overflow-hidden border border-line">
                <img
                  src={CAUSE_IMAGE}
                  alt="Devotees being served free prasadam at the temple"
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cause + Impact */}
        <section className="py-16 bg-paper">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-3xl mb-12">
                <h2 className="font-display font-medium text-3xl text-ink mb-4">
                  What your donation does
                </h2>
                <p className="text-lg text-stone leading-relaxed">
                  {/* TODO: refine this cause copy with the temple's own words. */}
                  Through Annadanam, the temple offers free, sanctified meals to every visitor each
                  Saturday — no one who comes to Krishna's door leaves hungry. Your offering helps cook
                  and serve these meals, keep the deities beautifully worshipped, and welcome the
                  community to our festivals throughout the year.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {IMPACT_STATS.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="bg-paper-2 rounded-md p-6 border border-line text-center"
                  >
                    <div className="w-14 h-14 rounded-md bg-saffron/10 flex items-center justify-center mb-4 mx-auto">
                      <Icon className="text-saffron" size={26} />
                    </div>
                    <div className="font-display font-medium text-2xl text-ink mb-1">{value}</div>
                    <p className="text-stone leading-relaxed">{label}</p>
                  </div>
                ))}
              </div>

              {/* Photos from the temple's daily Annadana */}
              <div className="grid sm:grid-cols-3 gap-4 mt-12">
                {CAUSE_GALLERY.map(({ src, alt }) => (
                  <div key={src} className="rounded-md overflow-hidden border border-line">
                    <img src={src} alt={alt} className="w-full h-48 object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* QR Code Section */}
        <section className="py-16 bg-paper-2">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-saffron/10 rounded-md mb-4">
                <QrCode className="text-saffron" size={24} />
              </div>
              <h2 className="font-display font-medium text-2xl text-ink mb-2">Scan to Donate via UPI</h2>
              <p className="text-stone mb-6">Use any UPI app to scan the QR code below</p>
              <div className="bg-paper border border-line rounded-md p-6 inline-block">
                {/* TODO: add the real UPI QR at public/upi-qr.png */}
                <img
                  src="/upi-qr.png"
                  alt="UPI QR Code for Donation"
                  className="w-64 h-64 mx-auto object-contain"
                />
              </div>
              <p className="text-sm text-stone mt-4">
                After payment, please fill in the form below so we can acknowledge your donation.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20 bg-paper">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">

              {formState === 'success' ? (
                <div className="text-center py-16 px-8 bg-paper-2 rounded-md border border-line">
                  <CheckCircle className="text-peacock mx-auto mb-4" size={64} />
                  <h2 className="font-display font-medium text-3xl text-ink mb-4">Hare Krishna!</h2>
                  <p className="text-lg text-stone leading-relaxed">
                    Thank you for your generous donation. May Lord Krishna bless you abundantly
                    for your selfless contribution to His service.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="btn-primary mt-8"
                  >
                    Make Another Donation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="text-center mb-10">
                    <h2 className="font-display font-medium text-2xl text-ink mb-2">Record Your Donation</h2>
                    <p className="text-stone">Fill in the details after completing your UPI payment</p>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <h3 className="font-display font-medium text-lg text-ink mb-4">
                      Donation Category <span className="text-saffron">*</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CATEGORIES.map(({ id, label, icon: Icon, description }) => {
                        const isSelected = formData.category === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => handleCategorySelect(id)}
                            className={`text-left p-5 rounded-md border transition-colors duration-200 ${isSelected
                                ? 'border-saffron bg-saffron/5'
                                : 'border-line bg-paper hover:border-saffron/50'
                              }`}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`p-2 rounded-md ${isSelected ? 'bg-saffron text-paper' : 'bg-saffron/10 text-saffron'}`}>
                                <Icon size={20} />
                              </div>
                              <span className={`font-display font-medium ${isSelected ? 'text-saffron' : 'text-ink'}`}>
                                {label}
                              </span>
                            </div>
                            <p className="text-sm text-stone leading-relaxed">{description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <h3 className="font-display font-medium text-lg text-ink mb-4">
                      Contribution Amount <span className="text-saffron">*</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {PRESET_AMOUNTS.map(amount => {
                        const isSelected = amountChoice === amount;
                        const meals = Math.floor(amount / COST_PER_MEAL);
                        return (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => handlePresetSelect(amount)}
                            className={`text-center p-4 rounded-md border transition-colors duration-200 ${isSelected
                                ? 'border-saffron bg-saffron/5'
                                : 'border-line bg-paper hover:border-saffron/50'
                              }`}
                          >
                            <div className={`font-display font-medium text-xl ${isSelected ? 'text-saffron' : 'text-ink'}`}>
                              ₹{amount.toLocaleString('en-IN')}
                            </div>
                            {/* TODO: outcome framing depends on real COST_PER_MEAL */}
                            <div className="caption mt-1 normal-case tracking-normal">≈ {meals} meals</div>
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={handleCustomSelect}
                        className={`text-center p-4 rounded-md border transition-colors duration-200 ${amountChoice === 'custom'
                            ? 'border-saffron bg-saffron/5'
                            : 'border-line bg-paper hover:border-saffron/50'
                          }`}
                      >
                        <div className={`font-display font-medium text-xl ${amountChoice === 'custom' ? 'text-saffron' : 'text-ink'}`}>
                          Custom
                        </div>
                        <div className="caption mt-1 normal-case tracking-normal">Other amount</div>
                      </button>
                    </div>

                    {amountChoice === 'custom' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-ink mb-1">
                          Enter Amount (₹) <span className="text-saffron">*</span>
                        </label>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          required
                          min="1"
                          placeholder="Enter donation amount"
                          className={inputClasses}
                        />
                        {mealsFor(formData.amount) && (
                          <p className="caption mt-2 normal-case tracking-normal">
                            ≈ {mealsFor(formData.amount)} meals sponsored
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Donor Details */}
                  <div className="bg-paper-2 border border-line rounded-md p-8 space-y-5">
                    <h3 className="font-display font-medium text-lg text-ink mb-4">Your Details</h3>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-1">
                        Full Name <span className="text-saffron">*</span>
                      </label>
                      <input
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
                      <label className="block text-sm font-medium text-ink mb-1">
                        Phone Number <span className="text-saffron">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-1">
                        Transaction / Reference ID <span className="text-saffron">*</span>
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        required
                        placeholder="UPI transaction reference number"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-1">
                        Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Any message or special purpose for the donation"
                        className={`${inputClasses} resize-none`}
                      />
                    </div>
                  </div>

                  {/* 80G Tax Exemption */}
                  <div className="bg-paper-2 border border-line rounded-md p-8">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.want80G}
                        onChange={e => setFormData(prev => ({ ...prev, want80G: e.target.checked }))}
                        className="mt-1 w-4 h-4 accent-saffron"
                      />
                      <span>
                        <span className="flex items-center font-display font-medium text-ink">
                          <ReceiptText size={18} className="text-saffron mr-2" />
                          I'd like an 80G tax-exemption receipt
                        </span>
                        <span className="block text-sm text-stone mt-1">
                          Donations to the temple are eligible for tax exemption under Section 80G.
                          Share your PAN and address and we'll issue your receipt.
                        </span>
                      </span>
                    </label>

                    {formData.want80G && (
                      <div className="mt-6 space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-ink mb-1">
                            PAN Number <span className="text-saffron">*</span>
                          </label>
                          <input
                            type="text"
                            name="pan"
                            value={formData.pan}
                            onChange={handleChange}
                            required={formData.want80G}
                            placeholder="ABCDE1234F"
                            className={`${inputClasses} uppercase`}
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-ink mb-1">
                              Door / Flat No. <span className="text-saffron">*</span>
                            </label>
                            <input
                              type="text"
                              name="addressDoor"
                              value={formData.addressDoor}
                              onChange={handleChange}
                              required={formData.want80G}
                              placeholder="e.g. 12/3"
                              className={inputClasses}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-ink mb-1">
                              Building / Apartment
                            </label>
                            <input
                              type="text"
                              name="addressBuilding"
                              value={formData.addressBuilding}
                              onChange={handleChange}
                              placeholder="Building or apartment name"
                              className={inputClasses}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-ink mb-1">
                            Street <span className="text-saffron">*</span>
                          </label>
                          <input
                            type="text"
                            name="addressStreet"
                            value={formData.addressStreet}
                            onChange={handleChange}
                            required={formData.want80G}
                            placeholder="Street name"
                            className={inputClasses}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-ink mb-1">
                            Area / Locality <span className="text-saffron">*</span>
                          </label>
                          <input
                            type="text"
                            name="addressArea"
                            value={formData.addressArea}
                            onChange={handleChange}
                            required={formData.want80G}
                            placeholder="Area or locality"
                            className={inputClasses}
                          />
                        </div>

                        <div className="grid sm:grid-cols-3 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-ink mb-1">
                              State <span className="text-saffron">*</span>
                            </label>
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              required={formData.want80G}
                              className={inputClasses}
                            >
                              <option value="">Select state</option>
                              {INDIAN_STATES.map(state => (
                                <option key={state} value={state}>{state}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-ink mb-1">
                              City <span className="text-saffron">*</span>
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required={formData.want80G}
                              placeholder="City"
                              className={inputClasses}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-ink mb-1">
                              Pincode <span className="text-saffron">*</span>
                            </label>
                            <input
                              type="text"
                              name="pincode"
                              value={formData.pincode}
                              onChange={handleChange}
                              required={formData.want80G}
                              placeholder="600000"
                              className={inputClasses}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  )}

                  {formState === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                      Something went wrong while submitting your donation details. Please try again or contact us directly.
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

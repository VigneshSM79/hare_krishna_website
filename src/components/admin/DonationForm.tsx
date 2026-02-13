import React, { useState } from 'react';
import { CheckCircle, Loader2, IndianRupee } from 'lucide-react';

interface DonationFormProps {
  type: 'weekly' | 'yearly';
  scriptUrl: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const PAYMENT_MODES = ['Cash', 'UPI', 'Bank Transfer', 'Cheque'];

const DonationForm: React.FC<DonationFormProps> = ({ type, scriptUrl }) => {
  const isWeekly = type === 'weekly';

  const emptyForm = {
    donorName: '',
    phone: '',
    amount: '',
    paymentMode: '',
    date: isWeekly ? new Date().toISOString().split('T')[0] : '',
    year: isWeekly ? '' : new Date().getFullYear().toString(),
    notes: '',
  };

  const [form, setForm] = useState(emptyForm);
  const [formState, setFormState] = useState<FormState>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      const payload = new FormData();
      payload.append('sheet', isWeekly ? 'Weekly Donations' : 'Yearly Donations');
      payload.append('donorName', form.donorName);
      payload.append('phone', form.phone);
      payload.append('amount', form.amount);
      payload.append('paymentMode', form.paymentMode);
      payload.append('period', isWeekly ? form.date : form.year);
      payload.append('notes', form.notes);
      payload.append('timestamp', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));

      await fetch(scriptUrl, { method: 'POST', body: payload });
      setFormState('success');
      setForm(emptyForm);
    } catch {
      setFormState('error');
    }
  };

  if (formState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle className="text-green-500 mb-4" size={56} />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Entry Saved!</h3>
        <p className="text-gray-500 mb-8">The donation record has been added to the sheet.</p>
        <button
          onClick={() => setFormState('idle')}
          className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
        >
          Add Another Entry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      {/* Period field */}
      {isWeekly ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date <span className="text-orange-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year <span className="text-orange-500">*</span>
          </label>
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            required
            min="2000"
            max="2100"
            placeholder="e.g. 2025"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Donor Name <span className="text-orange-500">*</span>
        </label>
        <input
          type="text"
          name="donorName"
          value={form.donorName}
          onChange={handleChange}
          required
          placeholder="Full name of donor"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 XXXXX XXXXX"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount (₹) <span className="text-orange-500">*</span>
        </label>
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            min="1"
            placeholder="0"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Mode <span className="text-orange-500">*</span>
        </label>
        <select
          name="paymentMode"
          value={form.paymentMode}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition bg-white"
        >
          <option value="">Select payment mode</option>
          {PAYMENT_MODES.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any additional notes..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
        />
      </div>

      {formState === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-base hover:bg-orange-600 active:scale-95 transition-all duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {formState === 'submitting' ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <span>Save Donation Record</span>
        )}
      </button>
    </form>
  );
};

export default DonationForm;

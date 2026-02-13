import React, { useState } from 'react';
import { CalendarDays, CalendarRange, LogOut, Menu, X } from 'lucide-react';
import DonationForm from './DonationForm';

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab = 'weekly' | 'yearly';

const TABS = [
  {
    id: 'weekly' as Tab,
    label: 'Weekly Donation',
    icon: CalendarDays,
    description: 'Record weekly donation entries',
  },
  {
    id: 'yearly' as Tab,
    label: 'Yearly Donation',
    icon: CalendarRange,
    description: 'Record yearly donation entries',
  },
];

const SCRIPT_URL = import.meta.env.VITE_SEVA_SCRIPT_URL as string;

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('weekly');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeTabData = TABS.find(t => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">🕉</span>
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">HK Temple Avadi</p>
              <p className="text-gray-400 text-xs">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">Donations</p>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${activeTab === id
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-150"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">{activeTabData.label}</h1>
              <p className="text-xs text-gray-500">{activeTabData.description}</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <DonationForm key={activeTab} type={activeTab} scriptUrl={SCRIPT_URL} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

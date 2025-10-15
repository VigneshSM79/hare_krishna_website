import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AdminAuth from './AdminAuth';
import AdminCarouselManager from './AdminCarouselManager';
import AdminGalleryManager from './AdminGalleryManager';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'carousel' | 'gallery'>('carousel');

  useEffect(() => {
    checkAuthStatus();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    setLoading(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('carousel');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
              <p className="text-gray-600 mt-2">Manage temple images and content</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <span className="mr-2">🚪</span>
              Logout
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('carousel')}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'carousel'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🎠 Carousel Images
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'gallery'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🖼️ Gallery Images
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'carousel' ? (
          <AdminCarouselManager onLogout={handleLogout} />
        ) : (
          <AdminGalleryManager />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
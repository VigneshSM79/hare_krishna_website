import React from 'react';
import EventCarousel from './EventCarousel';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Welcome to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
                HareKrishna Temple Avadi
              </span>
            </h1>
          </div>

          {/* Images Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            {/* Static Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/Hare Krishna 1 .jpg"
                  alt="Sri Sri Radha Krishna Deities"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">Since</p>
                  <p className="text-gray-600 font-medium">2015</p>
                </div>
              </div>
            </div>

            {/* Carousel */}
            <div className="relative">
              <EventCarousel />
            </div>
          </div>

          {/* Content Below Images */}
          <div className="text-center space-y-8">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Experience divine consciousness through devotion, spiritual practice, and community service
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                Hare Krishna Temple Avadi
              </button>
              <button className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 hover:text-white transition-all duration-200">
                Learn More
              </button>
            </div>
            
            <p className="text-gray-600 text-center">
              Spreading the Hare Krishna Maha Mantra and teachings of Lord Sri Chaitanya Mahaprabhu
            </p>
          </div>
          
          {/* Temple Timings */}
          <div className="mt-20 bg-white rounded-3xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Temple Timings</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h4 className="font-semibold text-gray-800 mb-2">Morning</h4>
                <p className="text-gray-600">5:30 AM - 12:00 PM</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-800 mb-2">Evening</h4>
                <p className="text-gray-600">6:00 PM - 8:30 PM</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-800 mb-2">Special Events</h4>
                <p className="text-gray-600">Saturday Feast Program</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
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
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 pb-2">
                Hare Krishna Temple Avadi
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

            <p className="text-gray-600 text-center text-lg">
              Spreading the Hare Krishna Maha Mantra and teachings of Lord Sri Chaitanya Mahaprabhu
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
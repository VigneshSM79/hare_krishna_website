import React from 'react';

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

          {/* Main Image Section */}
          <div className="mb-12">
            <div className="relative max-w-5xl mx-auto">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/temple-entrance.jpg"
                  alt="Hare Krishna Temple Avadi"
                  className="w-full h-auto object-cover"
                />
              </div>
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
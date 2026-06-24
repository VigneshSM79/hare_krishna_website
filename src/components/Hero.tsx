import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-paper">
      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-6xl mx-auto">

          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="font-display font-medium text-ink text-4xl md:text-5xl lg:text-6xl leading-tight">
              Welcome to{' '}
              <span className="text-saffron">Hare Krishna Temple Avadi</span>
            </h1>
          </div>

          {/* Main Image Section */}
          <div className="mb-12">
            <div className="relative max-w-5xl mx-auto">
              <div className="rounded-md overflow-hidden border border-line">
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
            <p className="text-xl md:text-2xl text-stone leading-relaxed max-w-4xl mx-auto">
              Experience divine consciousness through devotion, spiritual practice, and community service
            </p>

            <p className="text-stone text-center text-lg">
              Spreading the Hare Krishna Maha Mantra and teachings of Lord Sri Chaitanya Mahaprabhu
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

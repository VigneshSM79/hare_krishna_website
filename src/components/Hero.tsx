import React from 'react';
import HeroCarousel from './HeroCarousel';

const Hero = () => {
  return (
    <section id="home" className="relative bg-paper">
      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="max-w-6xl mx-auto">

          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-ink text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight whitespace-nowrap">
              Welcome to{' '}
              <span className="text-saffron">Hare Krishna Temple Avadi</span>
            </h1>
          </div>

          {/* Main Image Section */}
          <div className="mb-12">
            <HeroCarousel />
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

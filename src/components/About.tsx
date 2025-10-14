import React from 'react';
import { Heart, Users, Book, Star } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Devotion',
      description: 'Cultivating love and devotion to Lord Krishna through daily prayers and spiritual practices.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a strong spiritual community that supports each member\'s journey of self-realization.'
    },
    {
      icon: Book,
      title: 'Knowledge',
      description: 'Studying ancient Vedic scriptures and applying their timeless wisdom to modern life.'
    },
    {
      icon: Star,
      title: 'Service',
      description: 'Serving humanity through food distribution, education, and spiritual guidance.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              About Hare Krishna Temple Avadi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The Hare Krishna Temple Avadi is dedicated to spreading the Hare Krishna Maha Mantra 
              and the teachings of Lord Sri Chaitanya Mahaprabhu.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-800">Our Mission</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  • Spread the Hare Krishna Maha Mantra and the teachings of Lord Sri Chaitanya Mahaprabhu to deliver the people in the age of kali yuga.
                </p>
                <ul className="text-lg text-gray-600 leading-relaxed space-y-3">
                  <li>• The temple offers the opportunity for satsang to the people of Avadi that will help to develop the Higher Thought, Learning attitude, practical Nutritional Spiritual Guidance, and Training.</li>
                  <li>• Teaching Vedic scriptures such as Srimad Bhagavad Gita, Srimad Bhagavatam, etc., derived from the formal authentic Guru - Disciple lineage.</li>
                  <li>• Temple that teaches the glorious spirituality of Bharat Irrespective of caste, creed or ethnicity.</li>
                  <li>• The temple trains children and the younger generation not to go astray.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-2xl">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Temple Philosophy</h4>
                <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                  "Abandon all varieties of religion and just surrender unto Me. I shall deliver you 
                  from all sinful reactions. Do not fear."
                  <footer className="text-orange-600 font-medium mt-2">— Bhagavad Gita 18.66</footer>
                </blockquote>
              </div>
            </div>

            {/* Temple Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/5626663/pexels-photo-5626663.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Temple Interior"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
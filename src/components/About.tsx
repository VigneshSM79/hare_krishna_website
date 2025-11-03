import React from 'react';
import { Heart, Book, Sparkles, Check } from 'lucide-react';

const About = () => {
  const principles = [
    {
      icon: Heart,
      title: 'Chant the Holy Names',
      description: 'Chant the Hare Krishna maha-mantra every day',
      detail: 'Chanting cleanses the mirror of the heart and stops the miseries of the blazing fire of material existence.'
    },
    {
      icon: Book,
      title: 'Read Srimad Bhagavatam',
      description: 'Read the spotless purana that glorifies the Supreme Lord',
      detail: 'All inauspicious things in our heart are completely destroyed by reading Srimad Bhagavatam every day.'
    },
    {
      icon: Sparkles,
      title: 'Honor Prasadam',
      description: 'Food sanctified by offering to the Supreme Lord',
      detail: 'Devotees who eat food offered first as sacrifice are released from all kinds of sins.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We are trying to give human society an opportunity for a life of happiness, good health,
              peace of mind and all good qualities through God Consciousness.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">What is the Mission of Human Life?</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                The mission of human life is to end the miseries of material existence and attain a blissful life.
                We are constantly searching after happiness, but we often fail in our pursuit. We may get a glimpse
                of happiness, but it does not last forever. We do not want miseries, but we cannot avoid them.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Scriptures inform us that we are spiritual beings, part and parcel of the Supreme Lord Sri Krishna,
                and by nature we are full of happiness – <span className="italic text-orange-600">ānandamayo 'bhyāsāt</span> (vedānta-sūtra).
                Then, why do we suffer? How do we rediscover the lost happiness and lead a blissful life?
              </p>
            </div>
          </div>

          {/* Three Principles */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Practice These Three Simple Principles
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {principles.map((principle, index) => {
                const IconComponent = principle.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6 mx-auto">
                      <IconComponent className="text-white" size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3 text-center">{principle.title}</h4>
                    <p className="text-orange-600 font-medium mb-4 text-center">{principle.description}</p>
                    <p className="text-gray-600 text-sm leading-relaxed text-center">{principle.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Understanding the Root Cause */}
          <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-3xl p-8 md:p-12 mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Understanding the Root Cause</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We are entrapped in this material world from time immemorial and the happiness we pursue here
                is temporary and illusory. In the pursuit of such happiness, we engage in various activities,
                pious and sinful, that binds us more and more in this material world.
              </p>
              <p>
                Our miseries are due to the sinful reactions and when we follow these three principles, all
                the material contaminations and sins are washed away; consequently, we are reestablished in
                our real constitutional position of unlimited bliss and happiness.
              </p>
            </div>
          </div>

          {/* Scriptural Quotes */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Sri Chaitanya Mahaprabhu Said:</h4>
              <blockquote className="text-gray-600 italic leading-relaxed">
                <span className="text-orange-600 font-semibold">ceto-darpaṇa-mārjanam bhava-mahā-dāvāgni-nirvāpaṇaṁ:</span>
                <br />
                Chanting the holy names of the Lord cleanses the mirror of the heart and stops the miseries
                of the blazing fire of material existence.
              </blockquote>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Srimad Bhagavatam Says:</h4>
              <blockquote className="text-gray-600 italic leading-relaxed">
                <span className="text-blue-600 font-semibold">naṣṭa-prāyeṣv abhadreṣu nityaṁ bhāgavata-sevayā:</span>
                <br />
                All the inauspicious things in our heart are completely destroyed by reading Srimad Bhagavatam
                every day. The darkness of ignorance is dissipated and we become situated in the mode of goodness.
              </blockquote>
            </div>
          </div>

          {/* Bhagavad Gita Quote */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white mb-16">
            <h4 className="text-2xl font-bold mb-6 text-center">From Bhagavad Gita (3.13)</h4>
            <blockquote className="text-xl italic text-center leading-relaxed mb-4">
              <span className="font-semibold">yajña-śiṣṭāśinaḥ santo mucyante sarva-kilbiṣaiḥ:</span>
            </blockquote>
            <p className="text-center text-lg opacity-90">
              Devotees who eat food offered first in sacrifice (as an offering to the Lord) are released
              from all kinds of sins.
            </p>
          </div>

          {/* Conclusion CTA */}
          <div className="text-center bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Achieve a Life of Happiness
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              By following these three simple, but effective principles given by Srila Prabhupada,
              we can achieve a life of happiness, good health, peace of mind, and all good qualities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-gray-700">
                <Check className="text-green-500 mr-2" size={24} />
                <span className="font-medium">Happiness</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Check className="text-green-500 mr-2" size={24} />
                <span className="font-medium">Good Health</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Check className="text-green-500 mr-2" size={24} />
                <span className="font-medium">Peace of Mind</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Check className="text-green-500 mr-2" size={24} />
                <span className="font-medium">All Good Qualities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
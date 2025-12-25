import React from 'react';
import { Heart, Book, Sparkles, Check, Users } from 'lucide-react';

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
    },
    {
      icon: Users,
      title: 'Devotee Association',
      description: 'Associate with devotees who carry spontaneous love towards krishna',
      detail: 'Physical devotee association will help one to gradually increase love for Sri Radha Krishna'
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
              Our mission is to Spread the Harinama Sankirtana movement of Sri Chaitanya Mahaprabhu carrying forward the teachings of the great acharya A.C Bhakthivedanta Swami Srila Prabhupada appeared in the lineage of Bramha-madhva Gaudiya Vaishnava sampradaya
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">What is the Mission of Human Life?</h3>

              {/* Sanskrit Verse */}
              <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-6 mb-6">
                <p className="text-center text-lg font-semibold text-orange-700 mb-3 italic">
                  āhāra-nidrā-bhaya-maithunaṁ ca<br />
                  sāmānyam etat paśubhiḥ narāṇām<br />
                  dharmo hi teṣām adhiko viśeṣo<br />
                  dharmeṇa hīna paśubhiḥ samānāḥ
                </p>
                <p className="text-center text-sm text-gray-600 font-medium">(HITOPADESA 25)</p>
              </div>

              {/* Meaning */}
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Meaning:</h4>
                <p className="text-gray-700 leading-relaxed">
                  Both animals and men share the activities of eating, sleeping, mating and defending.
                  But the special property of the humans is that they are able to engage in spiritual life.
                  Therefore without spiritual life, humans are on the level of animals.
                </p>
              </div>

              {/* Explanation */}
              <p className="text-gray-600 leading-relaxed mb-8">
                In this material world, the animals are engaged in sleeping, mating, eating, and defending them
                even human's life cycle is like this but human is differentiated from an animal by his consciousness
                which should be inclined towards attaining the supreme personality of godhead sri krishna. This human
                form of life is a golden opportunity to back home back to godhead by following the simple spiritual
                practices recommended by Srila Prabhupada they are….
              </p>

              {/* Spiritual Principles - Now Integrated */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {principles.map((principle, index) => {
                  const IconComponent = principle.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-4 mx-auto">
                        <IconComponent className="text-white" size={28} />
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2 text-center">{principle.title}</h4>
                      <p className="text-orange-600 font-medium mb-3 text-center text-sm">{principle.description}</p>
                      <p className="text-gray-600 text-sm leading-relaxed text-center">{principle.detail}</p>
                    </div>
                  );
                })}
              </div>
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

          {/* Four Regulative Principles */}
          <div className="text-center bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Four Regulative Principles
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              A person is eligible to become a pure devotee of the Lord by following these 4 regulative principles which were given by Srila Prabhupada and mentioned in the scriptures. They are:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-center text-gray-700 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-200">
                <span className="font-medium">No Intoxication</span>
              </div>
              <div className="flex items-center justify-center text-gray-700 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-200">
                <span className="font-medium">No Gambling</span>
              </div>
              <div className="flex items-center justify-center text-gray-700 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-200">
                <span className="font-medium">No Meat Eating</span>
              </div>
              <div className="flex items-center justify-center text-gray-700 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-200">
                <span className="font-medium">No Illicit Sex</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
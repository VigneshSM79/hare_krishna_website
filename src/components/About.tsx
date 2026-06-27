import React from 'react';
import { Heart, Book, Sparkles, Users } from 'lucide-react';

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
    <section id="about" className="py-20 bg-paper-2">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-4xl lg:text-5xl text-ink mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-stone max-w-4xl mx-auto leading-relaxed">
              Our mission is to Spread the Harinama Sankirtana movement of Sri Chaitanya Mahaprabhu carrying forward the teachings of the great acharya A.C Bhakthivedanta Swami Srila Prabhupada appeared in the lineage of Bramha-madhva Gaudiya Vaishnava sampradaya
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-paper rounded-md border border-line p-8 md:p-12 mb-16">
            <div className="prose prose-lg max-w-none">
              <h3 className="font-display font-medium text-3xl text-ink mb-6">What is the Mission of Human Life?</h3>

              {/* Sanskrit Verse */}
              <div className="bg-paper-2 border border-line rounded-md p-6 mb-6">
                <p className="text-center text-lg font-semibold text-saffron mb-3 italic font-display">
                  āhāra-nidrā-bhaya-maithunaṁ ca<br />
                  sāmānyam etat paśubhiḥ narāṇām<br />
                  dharmo hi teṣām adhiko viśeṣo<br />
                  dharmeṇa hīna paśubhiḥ samānāḥ
                </p>
                <p className="text-center text-sm text-stone font-medium">(HITOPADESA 25)</p>
              </div>

              {/* Meaning */}
              <div className="bg-paper-2 border border-line rounded-md p-6 mb-6">
                <h4 className="font-display font-medium text-lg text-ink mb-3">Meaning:</h4>
                <p className="text-ink leading-relaxed">
                  Both animals and men share the activities of eating, sleeping, mating and defending.
                  But the special property of the humans is that they are able to engage in spiritual life.
                  Therefore without spiritual life, humans are on the level of animals.
                </p>
              </div>

              {/* Explanation */}
              <p className="text-stone leading-relaxed mb-8">
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
                      className="bg-paper-2 rounded-md p-6 border border-line hover:border-stone transition-colors duration-200"
                    >
                      <div className="w-14 h-14 rounded-md bg-saffron/10 flex items-center justify-center mb-4 mx-auto">
                        <IconComponent className="text-saffron" size={28} />
                      </div>
                      <h4 className="font-display font-medium text-lg text-ink mb-2 text-center">{principle.title}</h4>
                      <p className="text-saffron font-medium mb-3 text-center text-sm">{principle.description}</p>
                      <p className="text-stone text-sm leading-relaxed text-center">{principle.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Understanding the Root Cause */}
          <div className="bg-paper border border-line rounded-md p-8 md:p-12 mb-16">
            <h3 className="font-display font-medium text-3xl text-ink mb-6">Understanding the Root Cause</h3>
            <div className="space-y-4 text-ink leading-relaxed">
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
            <div className="bg-paper rounded-md p-8 border border-line border-l-4 border-l-saffron">
              <h4 className="font-display font-medium text-lg text-ink mb-4">Sri Chaitanya Mahaprabhu Said:</h4>
              <blockquote className="text-stone italic leading-relaxed">
                <span className="text-saffron font-semibold">ceto-darpaṇa-mārjanam bhava-mahā-dāvāgni-nirvāpaṇaṁ:</span>
                <br />
                Chanting the holy names of the Lord cleanses the mirror of the heart and stops the miseries
                of the blazing fire of material existence.
              </blockquote>
            </div>

            <div className="bg-paper rounded-md p-8 border border-line border-l-4 border-l-peacock">
              <h4 className="font-display font-medium text-lg text-ink mb-4">Srimad Bhagavatam Says:</h4>
              <blockquote className="text-stone italic leading-relaxed">
                <span className="text-peacock font-semibold">naṣṭa-prāyeṣv abhadreṣu nityaṁ bhāgavata-sevayā:</span>
                <br />
                All the inauspicious things in our heart are completely destroyed by reading Srimad Bhagavatam
                every day. The darkness of ignorance is dissipated and we become situated in the mode of goodness.
              </blockquote>
            </div>
          </div>

          {/* Bhagavad Gita Quote */}
          <div className="bg-ink rounded-md p-8 md:p-12 text-paper mb-16">
            <h4 className="font-display font-medium text-2xl mb-6 text-center">From Bhagavad Gita (3.13)</h4>
            <blockquote className="text-xl italic text-center leading-relaxed mb-4 font-display">
              <span className="text-saffron font-semibold">yajña-śiṣṭāśinaḥ santo mucyante sarva-kilbiṣaiḥ:</span>
            </blockquote>
            <p className="text-center text-lg text-paper/80">
              Devotees who eat food offered first in sacrifice (as an offering to the Lord) are released
              from all kinds of sins.
            </p>
          </div>

          {/* Four Regulative Principles */}
          <div className="text-center bg-paper rounded-md border border-line p-8 md:p-12">
            <h3 className="font-display font-medium text-3xl text-ink mb-6">
              Four Regulative Principles
            </h3>
            <p className="text-xl text-stone leading-relaxed max-w-3xl mx-auto mb-8">
              A person is eligible to become a pure devotee of the Lord by following these 4 regulative principles which were given by Srila Prabhupada and mentioned in the scriptures. They are:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-center text-ink bg-paper-2 rounded-md p-4 border border-line">
                <span className="font-medium">No Intoxication</span>
              </div>
              <div className="flex items-center justify-center text-ink bg-paper-2 rounded-md p-4 border border-line">
                <span className="font-medium">No Gambling</span>
              </div>
              <div className="flex items-center justify-center text-ink bg-paper-2 rounded-md p-4 border border-line">
                <span className="font-medium">No Meat Eating</span>
              </div>
              <div className="flex items-center justify-center text-ink bg-paper-2 rounded-md p-4 border border-line">
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

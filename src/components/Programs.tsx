import React, { useEffect, useState } from 'react';
import { Sunrise, Sunset, Users, BookOpen, Music, Utensils, ChevronRight, X } from 'lucide-react';

type DailyProgram = {
  time: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  image: string;
  position?: string;
  details: string[];
};

const Programs = () => {
  // Each card opens a popup with an image and a fuller description.
  // Swap the `image` value for any web URL (or local /public path) as needed.
  const dailyPrograms: DailyProgram[] = [
    {
      time: '5:30 AM',
      title: 'Mangala Arati',
      description: 'First arati to the deities, early morning',
      icon: Sunrise,
      image: '/gaura_purnima_2022.jpg',
      position: 'center 30%',
      details: [
        "Mangala Arati is the first and most auspicious worship of the day, offered to Their Lordships in the early morning hours before sunrise, during the sacred period known as Brahma-muhurta. The word mangala means “auspicious,” and arati refers to the offering of light and other articles of worship before the Lord. As the conch is blown and the curtains open, the assembled devotees greet the Deities with the offering of a ghee lamp, incense, water, cloth, and flowers, accompanied by the singing of the Sri Gurvastakam prayer.",
        "Rising before dawn to stand before the Lord is considered especially purifying for the heart and mind. By beginning the day in the Lord's presence — chanting His holy names and offering worship — devotees set the tone of devotion for the entire day, conquering laziness and establishing Krishna consciousness from the very first moments of the morning. All are warmly welcome to join this serene and powerful start to the day at the temple.",
      ],
    },
    {
      time: '6:30 PM',
      title: 'Sandhya Arati',
      description: 'Evening arati and kirtan',
      icon: Sunset,
      image: '/gaura_purnima_2023.jpg',
      position: 'center 25%',
      details: [
        "Sandhya Arati, also lovingly known as Gaura Arati, is the evening worship offered to Their Lordships at dusk. The Deities are greeted with the offering of incense, a ghee lamp, water, cloth, and flowers, along with the gentle fanning of the chamara and peacock fan, all accompanied by joyful kirtan. The central song, “Jaya Jaya Gorachander Aratiko Shobha,” composed by Srila Bhaktivinoda Thakura, describes the beautiful vision of Lord Chaitanya's arati on the banks of the Ganges, surrounded by His eternal associates.",
        "As the day draws to a close, devotees gather to sing the glories of the Lord, dance, and take darshan of the beautifully dressed Deities. The congregational chanting of the holy names during Sandhya Arati fills the temple with a wonderful spiritual atmosphere, allowing everyone to set aside the cares of the day and absorb their minds in remembrance of Krishna. Devotees and well-wishers are warmly invited to attend each evening.",
      ],
    },
    {
      time: 'Saturday',
      title: 'Bhagavatam Satsang',
      description: 'Weekly Srimad-Bhagavatam discourse',
      icon: BookOpen,
      image: '/bhagavatha_satsanga.jpeg',
      position: 'center',
      details: [
        "The weekly Bhagavatam Satsang is a gathering of devotees to hear and discuss the timeless wisdom of the Srimad-Bhagavatam, the foremost of the eighteen Puranas. Compiled by Srila Vyasadeva as the cream of all Vedic literature, the Bhagavatam is glorified as “the ripened fruit of the tree of Vedic knowledge” and was hailed by Sri Chaitanya Mahaprabhu as the spotless authority (pramanam amalam) on the science of God.",
        "In the company of devotees (satsang), the verses of the Bhagavatam are read, translated, and explained, with their teachings applied to daily life. Srila Rupa Goswami counts the hearing of Srimad-Bhagavatam among the most powerful practices of devotional service — simply by giving aural reception to its message, love for Krishna awakens in the heart and the fire of material anxiety is extinguished. Devotees of all backgrounds are warmly welcome to come, hear, ask questions, and relish Krishna prasadam together.",
      ],
    },
  ];

  const weeklyPrograms = [
    {
      day: 'Monday',
      program: 'Bhagavad Gita Study Circle',
      time: '7:00 PM - 8:30 PM',
      icon: BookOpen,
      description: 'Deep dive into Krishna\'s teachings'
    },
    {
      day: 'Tuesday',
      program: 'Kirtan Evening',
      time: '7:00 PM - 8:30 PM',
      icon: Music,
      description: 'Devotional singing and chanting'
    },
    {
      day: 'Wednesday',
      program: 'Youth Programs',
      time: '6:00 PM - 8:00 PM',
      icon: Users,
      description: 'Spiritual activities for young devotees'
    },
    {
      day: 'Thursday',
      program: 'Prasadam Distribution',
      time: '12:00 PM - 2:00 PM',
      icon: Utensils,
      description: 'Free spiritual food for all'
    },
    {
      day: 'Saturday',
      program: 'Festival Programs',
      time: '10:00 AM - 8:00 PM',
      icon: Users,
      description: 'Special celebrations and events'
    },
    {
      day: 'Sunday',
      program: 'Sunday Feast',
      time: '11:00 AM - 3:00 PM',
      icon: Utensils,
      description: 'Community gathering with prasadam'
    }
  ];

  const [selected, setSelected] = useState<DailyProgram | null>(null);

  // Close on Escape and lock body scroll while the popup is open.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  return (
    <section id="programs" className="py-20 bg-paper">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-4xl lg:text-5xl text-ink mb-6">
              Daily Programs & Schedule
            </h2>
            <p className="text-xl text-stone max-w-3xl mx-auto leading-relaxed">
              Join us in our daily spiritual activities and weekly programs designed to
              deepen your connection with Krishna consciousness.
            </p>
          </div>

          {/* Daily Programs */}
          <div>
            <h3 className="font-display font-medium text-3xl text-center text-ink mb-12">Daily Schedule</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyPrograms.map((program, index) => {
                const IconComponent = program.icon;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelected(program)}
                    className="group text-center bg-paper-2 rounded-md p-6 border border-line hover:border-saffron/60 transition-colors duration-200"
                  >
                    <div className="w-16 h-16 rounded-md bg-saffron/10 flex items-center justify-center mb-4 mx-auto">
                      <IconComponent className="text-saffron" size={28} />
                    </div>
                    <div className="text-center">
                      <p className="font-display text-2xl text-saffron mb-2">{program.time}</p>
                      <h4 className="font-display font-medium text-xl text-ink mb-3">{program.title}</h4>
                      <p className="text-stone leading-relaxed">{program.description}</p>
                      <span className="caption mt-4 inline-flex items-center gap-1 normal-case tracking-normal text-saffron">
                        Read more
                        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Daily program popup */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div
            className="relative bg-paper border border-line rounded-md overflow-hidden flex flex-col w-[80vw] max-w-5xl h-[85vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Top half: program image */}
            <div className="relative h-1/2 shrink-0 bg-paper-2">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: selected.position ?? 'center' }}
              />
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 bg-paper/90 text-ink hover:bg-paper rounded-full p-2 transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Bottom half: scrollable content */}
            <div className="h-1/2 overflow-y-auto px-8 py-7">
              <p className="font-display text-xl text-saffron mb-1">{selected.time}</p>
              <h3 className="font-display font-medium text-2xl lg:text-3xl text-ink mb-5">
                {selected.title}
              </h3>
              <div className="space-y-4">
                {selected.details.map((para, i) => (
                  <p key={i} className="text-stone leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Programs;

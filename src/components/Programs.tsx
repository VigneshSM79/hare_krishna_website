import React from 'react';
import { Sunrise, Sunset, Users, BookOpen, Music, Utensils } from 'lucide-react';

const Programs = () => {
  const dailyPrograms = [
    {
      time: '5:30 AM',
      title: 'Mangala Arati',
      description: 'Morning prayers and offering to the deities',
      icon: Sunrise,
    },
    {
      time: '6:30 PM',
      title: 'Sandhya Arati',
      description: 'Evening prayers and kirtan',
      icon: Sunset,
    },
    {
      time: 'Saturday',
      title: 'Special Events',
      description: 'Saturday Feast Program',
      icon: Users,
    }
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
                  <div
                    key={index}
                    className="bg-paper-2 rounded-md p-6 border border-line hover:border-stone transition-colors duration-200"
                  >
                    <div className="w-16 h-16 rounded-md bg-saffron/10 flex items-center justify-center mb-4 mx-auto">
                      <IconComponent className="text-saffron" size={28} />
                    </div>
                    <div className="text-center">
                      <p className="font-display text-2xl text-saffron mb-2">{program.time}</p>
                      <h4 className="font-display font-medium text-xl text-ink mb-3">{program.title}</h4>
                      <p className="text-stone leading-relaxed">{program.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;

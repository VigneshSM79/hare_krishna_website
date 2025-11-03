import React from 'react';
import { Sunrise, Sun, Sunset, Moon, Users, BookOpen, Music, Utensils } from 'lucide-react';

const Programs = () => {
  const dailyPrograms = [
    {
      time: '5:30 AM',
      title: 'Mangala Arati',
      description: 'Morning prayers and offering to the deities',
      icon: Sunrise,
      color: 'from-pink-400 to-orange-400'
    },
    {
      time: '6:30 PM',
      title: 'Sandhya Arati',
      description: 'Evening prayers and kirtan',
      icon: Sunset,
      color: 'from-orange-400 to-red-400'
    },
    {
      time: 'Saturday',
      title: 'Special Events',
      description: 'Saturday Feast Program',
      icon: Users,
      color: 'from-blue-400 to-purple-400'
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
    <section id="programs" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Daily Programs & Schedule
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join us in our daily spiritual activities and weekly programs designed to 
              deepen your connection with Krishna consciousness.
            </p>
          </div>

          {/* Daily Programs */}
          <div>
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Daily Schedule</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyPrograms.map((program, index) => {
                const IconComponent = program.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-4 mx-auto`}>
                      <IconComponent className="text-white" size={28} />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600 mb-2">{program.time}</p>
                      <h4 className="text-xl font-semibold text-gray-800 mb-3">{program.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{program.description}</p>
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
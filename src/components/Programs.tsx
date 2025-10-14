import React from 'react';
import { Sunrise, Sun, Sunset, Moon, Users, BookOpen, Music, Utensils } from 'lucide-react';

const Programs = () => {
  const dailyPrograms = [
    {
      time: '5:00 AM',
      title: 'Mangala Arati',
      description: 'Morning prayers and offering to the deities',
      icon: Sunrise,
      color: 'from-pink-400 to-orange-400'
    },
    {
      time: '8:00 AM',
      title: 'Darshan & Bhagavatam Class',
      description: 'Deity worship and scripture study',
      icon: Sun,
      color: 'from-yellow-400 to-orange-400'
    },
    {
      time: '6:30 PM',
      title: 'Sandhya Arati',
      description: 'Evening prayers and kirtan',
      icon: Sunset,
      color: 'from-orange-400 to-red-400'
    },
    {
      time: '8:00 PM',
      title: 'Shayan Arati',
      description: 'Night prayers before rest',
      icon: Moon,
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
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Daily Schedule</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          {/* Weekly Programs */}
          <div>
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Weekly Programs</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {weeklyPrograms.map((program, index) => {
                const IconComponent = program.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mr-4 group-hover:shadow-lg transition-all duration-300">
                        <IconComponent className="text-orange-600" size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">{program.day}</h4>
                        <p className="text-orange-600 font-medium">{program.time}</p>
                      </div>
                    </div>
                    <h5 className="text-xl font-semibold text-gray-800 mb-3">{program.program}</h5>
                    <p className="text-gray-600 leading-relaxed">{program.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">Join Our Spiritual Community</h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Experience the joy of Krishna consciousness through our daily programs and community activities. 
                All are welcome to participate in our spiritual journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                  Visit Us Today
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-200">
                  Download Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
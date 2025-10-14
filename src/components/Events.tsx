import React from 'react';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      date: '7 Oct',
      month: 'to 5 Nov',
      title: 'Damodara Pooja',
      time: 'Daily Programs',
      location: 'Main Temple Hall',
      description: 'Special month-long celebration with daily prayers, offerings, and devotional activities.',
      featured: true,
      attendees: 300
    },
    {
      date: '21',
      month: 'Oct',
      title: 'Deepavali',
      time: '6:00 PM - 8:30 PM',
      location: 'Temple Complex',
      description: 'Festival of lights celebration with special prayers, lamps, and prasadam distribution.',
      featured: false,
      attendees: 200
    },
    {
      date: '22',
      month: 'Oct',
      title: 'Govardhan Pooja',
      time: '10:00 AM - 8:00 PM',
      location: 'Temple Complex',
      description: 'Celebrating Lord Krishna lifting Govardhan Hill with special prayers and offerings.',
      featured: false,
      attendees: 250
    }
  ];

  return (
    <section id="events" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Upcoming Events & Festivals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join us for special celebrations, festivals, and spiritual programs throughout the year. 
              Experience the joy of community worship and devotional activities.
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">Special Events</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                    event.featured ? 'border-2 border-orange-200 lg:col-span-2' : ''
                  }`}
                >
                  <div className={`${event.featured ? 'lg:flex' : ''}`}>
                    {/* Date Card */}
                    <div className={`${event.featured ? 'lg:w-48' : 'w-full'} bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white text-center`}>
                      {event.featured && (
                        <div className="flex items-center justify-center mb-2">
                          <Star className="text-yellow-300" size={20} />
                          <span className="ml-2 font-semibold">Featured</span>
                        </div>
                      )}
                      <div className="text-4xl font-bold">{event.date}</div>
                      <div className="text-lg font-medium opacity-90">{event.month}</div>
                      <div className="mt-4 flex items-center justify-center text-sm opacity-80">
                        <Users size={16} className="mr-1" />
                        <span>{event.attendees} expected</span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className={`p-8 ${event.featured ? 'flex-1' : ''}`}>
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h4>
                      <p className="text-gray-600 leading-relaxed mb-6">{event.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Clock size={18} className="mr-3 text-orange-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin size={18} className="mr-3 text-orange-500" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <button className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white">
            <Calendar size={48} className="mx-auto mb-6 text-blue-200" />
            <h3 className="text-3xl font-bold mb-6">Stay Updated with Our Events</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive updates about upcoming festivals, 
              special programs, and spiritual events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-800 font-medium focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      date: '26',
      month: 'Mar 2026',
      title: 'Sri Rama Navami',
      time: '6:30 PM - 10 PM',
      location: 'Temple Complex',
      description: 'The divine appearance day of Lord Sri Ramachandra. Join us for special abhishekam, kirtan, and a grand celebration honoring the Supreme Lord in His form as Maryada Purushottama.',
    }
  ];

  return (
    <section id="events" className="py-20 bg-paper-2">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-4xl lg:text-5xl text-ink mb-6">
              Upcoming Events & Festivals
            </h2>
            <p className="text-xl text-stone max-w-3xl mx-auto leading-relaxed">
              Join us for special celebrations, festivals, and spiritual programs throughout the year.
              Experience the joy of community worship and devotional activities.
            </p>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="font-display font-medium text-3xl text-ink mb-12 text-center">Special Events</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-paper rounded-md border border-line overflow-hidden hover:border-stone transition-colors duration-200"
                >
                  {/* Date Card */}
                  <div className="w-full bg-saffron p-6 text-paper text-center">
                    <div className="font-display text-4xl">{event.date}</div>
                    <div className="text-lg font-medium text-paper/90">{event.month}</div>
                  </div>

                  {/* Event Details */}
                  <div className="p-8">
                    <h4 className="font-display font-medium text-2xl text-ink mb-4">{event.title}</h4>
                    <p className="text-stone leading-relaxed mb-6">{event.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center text-stone">
                        <Clock size={18} className="mr-3 text-saffron" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-stone">
                        <MapPin size={18} className="mr-3 text-saffron" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <button className="btn-primary mt-6">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;

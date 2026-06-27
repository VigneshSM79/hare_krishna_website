import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      date: '28',
      month: 'Aug 2026',
      title: 'Sri Balarama Purnima',
      time: '6:00 PM onwards', // TODO: confirm program timing
      location: 'Temple Complex',
      description: 'The divine appearance day of Lord Balarama, elder brother of Lord Krishna and the source of all spiritual strength. Join us for special abhishekam, kirtan, and offerings honoring the Lord on this auspicious full-moon day.',
      image: '/festival-balarama.jpg',
      imagePosition: 'center',
    },
    {
      date: '04',
      month: 'Sep 2026',
      title: 'Sri Krishna Janmashtami',
      time: '6:00 PM – 12:30 AM', // TODO: confirm program timing
      location: 'Temple Complex',
      description: 'The most joyous celebration of the year — the midnight appearance of Lord Sri Krishna. Join us for abhishekam, bhajans, dramatic pastimes, the grand midnight arati, and mahaprasadam.',
      image: '/festival-janmashtami.jpg',
      imagePosition: 'top',
    },
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
                  {/* Festival photo with date badge */}
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-56 object-cover"
                      style={{ objectPosition: event.imagePosition }}
                    />
                    <div className="absolute top-4 left-4 bg-saffron text-paper px-4 py-2 text-center rounded-md">
                      <div className="font-display text-3xl leading-none">{event.date}</div>
                      <div className="text-sm font-medium text-paper/90 mt-1">{event.month}</div>
                    </div>
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

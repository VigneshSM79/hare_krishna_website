import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Visit Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We welcome all visitors to experience the spiritual atmosphere of our temple.
              Feel free to reach out for any questions or spiritual guidance.
            </p>
          </div>

          <div>
            {/* Contact Information */}
            <div className="space-y-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <MapPin className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600 leading-relaxed">
                        147, Chinnamman Koil St,<br />
                        Paruthippattu, Annamalai Nagar,<br />
                        Ambattur, Avadi,<br />
                        Chennai, Tamil Nadu 600054
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Getting Here */}
              <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Navigation className="mr-3 text-orange-600" size={24} />
                  How to Reach Us
                </h4>
                <div className="space-y-3 text-gray-600">
                  <p><span className="font-medium">By Bus:</span> Take buses to Avadi Bus Stand, temple is 5 minutes walk</p>
                  <p><span className="font-medium">By Train:</span> Avadi Railway Station is the nearest station</p>
                  <p><span className="font-medium">By Metro:</span> Avadi Metro Station (upcoming)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
                <MapPin size={28} className="mr-3 text-orange-500" />
                Find Us on Map
              </h3>
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.8746586991744!2d80.10636097507565!3d13.109556087230891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261aab99aaaab%3A0x6bcf2d8c8c8c8c8c!2s147%2C%20Chinnamman%20Koil%20St%2C%20Paruthippattu%2C%20Annamalai%20Nagar%2C%20Ambattur%2C%20Avadi%2C%20Chennai%2C%20Tamil%20Nadu%20600054!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hare Krishna Temple Avadi Location"
                ></iframe>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://maps.app.goo.gl/KvwMQm2wpyNyi2fe7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 transform hover:-translate-y-1 shadow-lg"
                >
                  <MapPin size={20} className="mr-2" />
                  Open in Google Maps
                </a>
                <a
                  href="https://maps.app.goo.gl/KvwMQm2wpyNyi2fe7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 transform hover:-translate-y-1 shadow-lg"
                >
                  <Navigation size={20} className="mr-2" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
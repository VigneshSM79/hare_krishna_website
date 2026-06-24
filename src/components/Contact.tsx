import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-paper-2">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-4xl lg:text-5xl text-ink mb-6">
              Visit Us
            </h2>
            <p className="text-xl text-stone max-w-3xl mx-auto leading-relaxed">
              We welcome all visitors to experience the spiritual atmosphere of our temple.
              Feel free to reach out for any questions or spiritual guidance.
            </p>
          </div>

          <div>
            {/* Contact Information */}
            <div className="max-w-4xl mx-auto">
              <h3 className="font-display font-medium text-3xl text-ink mb-8">Contact Information</h3>

              <div className="grid md:grid-cols-2 gap-8 md:gap-0">
                {/* Address */}
                <div className="md:pr-10">
                  <div className="flex items-start space-x-4">
                    <div className="bg-saffron/10 p-3 rounded-md">
                      <MapPin className="text-saffron" size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-medium text-lg text-ink">Address</h4>
                      <p className="text-stone leading-relaxed">
                        147, Chinnamman Koil St,<br />
                        Paruthippattu, Annamalai Nagar,<br />
                        Ambattur, Avadi,<br />
                        Chennai, Tamil Nadu 600054
                      </p>
                    </div>
                  </div>
                </div>

                {/* Getting Here */}
                <div className="md:pl-10 md:border-l border-t md:border-t-0 border-line pt-8 md:pt-0">
                  <h4 className="font-display font-medium text-xl text-ink mb-4 flex items-center">
                    <Navigation className="mr-3 text-saffron" size={24} />
                    How to Reach Us
                  </h4>
                  <div className="space-y-3 text-stone">
                    <p><span className="font-medium">By Bus:</span> Take bus 62E or S41. The temple is a short walk from the bus stop</p>
                    <p><span className="font-medium">By Train:</span> Avadi Railway Station is the nearest station</p>
                    <p><span className="font-medium">By Metro:</span> Avadi Metro Station (upcoming)</p>
                    <p><span className="font-medium">Landmark:</span> St. Peter's College</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <div className="bg-paper border border-line rounded-md p-8">
              <h3 className="font-display font-medium text-2xl text-ink mb-6 text-center flex items-center justify-center">
                <MapPin size={28} className="mr-3 text-saffron" />
                Find Us on Map
              </h3>
              <div className="aspect-video rounded-md overflow-hidden border border-line">
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
                  className="btn-primary"
                >
                  <MapPin size={20} className="mr-2" />
                  Open in Google Maps
                </a>
                <a
                  href="https://maps.app.goo.gl/KvwMQm2wpyNyi2fe7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-sm font-semibold border border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-200"
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
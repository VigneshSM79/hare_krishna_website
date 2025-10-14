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
              Visit Us & Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We welcome all visitors to experience the spiritual atmosphere of our temple. 
              Feel free to reach out for any questions or spiritual guidance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
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
                        123 Krishna Street, Avadi,<br />
                        Chennai - 600071,<br />
                        Tamil Nadu, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Phone className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-gray-600">+91 98765 43211</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Mail className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">info@iskconavadi.org</p>
                      <p className="text-gray-600">president@iskconavadi.org</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Clock className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Temple Timings</h4>
                      <div className="text-gray-600 space-y-1">
                        <p>Morning: 5:00 AM - 12:00 PM</p>
                        <p>Evening: 4:00 PM - 8:30 PM</p>
                        <p>Sundays: 5:00 AM - 8:30 PM</p>
                      </div>
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
                  <p><span className="font-medium">By Car:</span> Free parking available at the temple premises</p>
                  <p><span className="font-medium">By Metro:</span> Avadi Metro Station (upcoming)</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    >
                      <option>General Inquiry</option>
                      <option>Program Information</option>
                      <option>Event Registration</option>
                      <option>Spiritual Guidance</option>
                      <option>Donation Information</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center"
                  >
                    <Send size={20} className="mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Us on Map</h3>
              <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin size={48} className="mx-auto mb-4 text-orange-500" />
                  <p className="text-lg font-medium">Interactive Map Coming Soon</p>
                  <p>123 Krishna Street, Avadi, Chennai - 600071</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
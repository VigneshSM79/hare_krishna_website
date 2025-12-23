import React from 'react';
import { Calendar as CalendarIcon, Star } from 'lucide-react';

const FestivalCalendar = () => {
    const festivals = [
        "Gaura Purnima",
        "Rama Navami",
        "Narasimha Chaturdashi",
        "Balarama Purnima",
        "Sri Krishna Janmashtami",
        "Srila Prabhupada Vyasa Puja",
        "Radhastami",
        "Kartik Masam",
        "Govardhan Puja",
        "Vaikuntha Ekadashi",
        "Kannan Pongal",
        "Nityananda Trayodashi"
    ];

    return (
        <section id="festival-calendar" className="py-20 bg-orange-50">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                            Festival Calendar
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Celebrate the divine appearances and pastimes of the Lord throughout the year.
                        </p>
                    </div>

                    {/* Festival List - Vertical Layout */}
                    <div className="max-w-3xl mx-auto space-y-4">
                        {festivals.map((festival, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500 group hover:-translate-y-1"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                                        <CalendarIcon className="text-orange-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors">
                                            {festival}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">Annual Celebration</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FestivalCalendar;

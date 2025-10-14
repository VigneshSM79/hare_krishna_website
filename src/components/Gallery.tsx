import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/2145748/pexels-photo-2145748.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Temple Architecture',
      category: 'Temple'
    },
    {
      src: 'https://images.pexels.com/photos/5626663/pexels-photo-5626663.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Prayer Hall',
      category: 'Interior'
    },
    {
      src: 'https://images.pexels.com/photos/8294678/pexels-photo-8294678.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Krishna Deity',
      category: 'Deities'
    },
    {
      src: 'https://images.pexels.com/photos/6975384/pexels-photo-6975384.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Festival Celebration',
      category: 'Festivals'
    },
    {
      src: 'https://images.pexels.com/photos/7480136/pexels-photo-7480136.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Community Gathering',
      category: 'Community'
    },
    {
      src: 'https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Kirtan Session',
      category: 'Activities'
    },
    {
      src: 'https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Temple Garden',
      category: 'Temple'
    },
    {
      src: 'https://images.pexels.com/photos/6975378/pexels-photo-6975378.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Cultural Performance',
      category: 'Festivals'
    },
    {
      src: 'https://images.pexels.com/photos/8294442/pexels-photo-8294442.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Prasadam Distribution',
      category: 'Community'
    }
  ];

  const categories = ['All', 'Temple', 'Interior', 'Deities', 'Festivals', 'Community', 'Activities'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Temple Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore the beauty of our temple, festivals, and community activities through 
              our photo collection capturing moments of devotion and celebration.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-orange-100 hover:text-orange-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-square">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">{image.alt}</p>
                    <p className="text-sm opacity-90">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <p className="text-gray-600 font-medium">Photos in Gallery</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600 font-medium">Festivals Celebrated</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
              <p className="text-gray-600 font-medium">Community Members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft size={48} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight size={48} />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
              <p className="font-semibold">{filteredImages[selectedImage].alt}</p>
              <p className="text-sm text-center">{selectedImage + 1} of {filteredImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
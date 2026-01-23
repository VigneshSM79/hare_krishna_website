import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { listFilesFromFolder } from '../lib/imagekit';

interface ImageKitImage {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  filePath: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<ImageKitImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch images from ImageKit folder
      const folderPath = '/Gallery/2025 Hare Krishna Temple Janmastami Photos';
      console.log('Fetching images from folder:', folderPath);

      const images = await listFilesFromFolder(folderPath);
      console.log('Fetched images:', images.length);

      setGalleryImages(images);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      setError(error instanceof Error ? error.message : 'Failed to load images');
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = galleryImages;

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
              2025 Janmashtami Celebration - Capturing moments of devotion and celebration.
            </p>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
              <p className="text-gray-600">Loading images from ImageKit...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg mb-4">Error loading images: {error}</p>
              <button
                onClick={fetchGalleryImages}
                className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found in this folder</p>
              <p className="text-gray-400 text-sm mt-2">Folder: /Gallery/2025 Hare Krishna Temple Janmastami Photos</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredImages.map((image, index) => (
                <div
                  key={image.fileId}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="aspect-square">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">{image.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Statistics */}
          {!loading && !error && filteredImages.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-4xl font-bold text-orange-600 mb-2">{filteredImages.length}</div>
                <p className="text-gray-600 font-medium">Photos in Gallery</p>
              </div>
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
                <p className="text-gray-600 font-medium">Festivals Celebrated</p>
              </div>
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
                <p className="text-gray-600 font-medium">Community Members</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && filteredImages[selectedImage] && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>

            <img
              src={filteredImages[selectedImage].url}
              alt={filteredImages[selectedImage].name}
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
              <p className="font-semibold">{filteredImages[selectedImage].name}</p>
              <p className="text-sm text-center">{selectedImage + 1} of {filteredImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;

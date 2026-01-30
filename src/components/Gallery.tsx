import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { listFilesFromFolder } from '../lib/imagekit';

interface ImageKitImage {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  filePath: string;
}

interface SubCategory {
  id: string;
  title: string;
  coverPhoto: string;
  folderPath: string;
}

interface GalleryCategory {
  id: string;
  title: string;
  coverPhoto: string;
  folderPath?: string;
  subCategories?: SubCategory[];
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<ImageKitImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

  // Define the 3 main gallery categories with cover photos
  const categories: GalleryCategory[] = [
    {
      id: 'festival',
      title: 'FESTIVAL GALLERY',
      coverPhoto: '/festival_gallery.jpeg',
      subCategories: [
        {
          id: 'gaura-purnima-2023',
          title: '2023 Gaura Purnima',
          coverPhoto: '/gaura_purnima_2023.jpg',
          folderPath: '/Gallery/2023 Gaura Purnima'
        },
        {
          id: 'gaura-purnima-2022',
          title: '2022 Gaura Purnima & Moolavar & Patita Pavana Chakra Installation',
          coverPhoto: '/gaura_purnima_2022.jpg',
          folderPath: '/Gallery/2022 Gaura Purnima & Moolavar & Patita Pavana Chakra Installation'
        }
        // Add more festival sub-categories here
      ]
    },
    {
      id: 'satsanga',
      title: 'SATURDAY BHAGAVATHA SATSANGA GALLERY',
      coverPhoto: '/bhagavatha_satsanga.jpeg',
      folderPath: '/Gallery/Saturday Bhagavatha Satsanga Gallery'
    },
    {
      id: 'temple',
      title: 'TEMPLE GALLERY',
      coverPhoto: '/temple_gallery.jpeg',
      folderPath: '/Gallery/2025 Hare Krishna Temple Janmastami Photos'
    }
  ];

  const fetchGalleryImages = async (folderPath: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching images from folder:', folderPath);

      const images = await listFilesFromFolder(folderPath);
      console.log('Fetched images:', images.length);

      // Sort images by filename (alphabetically)
      const sortedImages = images.sort((a, b) => a.name.localeCompare(b.name));

      setGalleryImages(sortedImages);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      setError(error instanceof Error ? error.message : 'Failed to load images');
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: GalleryCategory) => {
    setSelectedCategory(category.id);
    setBreadcrumb([category.title]);

    // If category has no sub-categories, fetch images directly
    if (!category.subCategories && category.folderPath) {
      fetchGalleryImages(category.folderPath);
    }
  };

  const handleSubCategoryClick = (subCategory: SubCategory) => {
    const parentCategory = categories.find(cat => cat.id === selectedCategory);
    setSelectedSubCategory(subCategory.id);
    setBreadcrumb([parentCategory?.title || '', subCategory.title]);
    fetchGalleryImages(subCategory.folderPath);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setGalleryImages([]);
    setSelectedImage(null);
    setBreadcrumb([]);
  };

  const handleBackToSubCategories = () => {
    setSelectedSubCategory(null);
    setGalleryImages([]);
    setSelectedImage(null);
    const parentCategory = categories.find(cat => cat.id === selectedCategory);
    setBreadcrumb([parentCategory?.title || '']);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const showSubCategories = selectedCategory && currentCategory?.subCategories && !selectedSubCategory;
  const showImages = selectedCategory && (selectedSubCategory || !currentCategory?.subCategories);

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
              {breadcrumb.length > 0
                ? breadcrumb.join(' > ')
                : 'Explore our photo collections capturing moments of devotion and celebration.'}
            </p>
          </div>

          {/* Back Button */}
          {selectedCategory && (
            <div className="mb-8">
              <button
                onClick={selectedSubCategory ? handleBackToSubCategories : handleBackToCategories}
                className="flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                {selectedSubCategory ? `Back to ${currentCategory?.title}` : 'Back to Gallery Categories'}
              </button>
            </div>
          )}

          {/* Main Category Cards */}
          {!selectedCategory && (
            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.coverPhoto}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center bg-white">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sub-Category Cards (for Festival Gallery) */}
          {showSubCategories && currentCategory?.subCategories && (
            <div className="grid md:grid-cols-3 gap-8">
              {currentCategory.subCategories.map((subCategory) => (
                <div
                  key={subCategory.id}
                  onClick={() => handleSubCategoryClick(subCategory)}
                  className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={subCategory.coverPhoto}
                      alt={subCategory.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center bg-white">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                      {subCategory.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Images Grid */}
          {showImages && (
            <>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
                  <p className="text-gray-600">Loading images...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500 text-lg mb-4">Error loading images: {error}</p>
                  <button
                    onClick={() => {
                      const folderPath = selectedSubCategory
                        ? currentCategory?.subCategories?.find(sub => sub.id === selectedSubCategory)?.folderPath
                        : currentCategory?.folderPath;
                      if (folderPath) fetchGalleryImages(folderPath);
                    }}
                    className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : galleryImages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No images found in this category</p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {galleryImages.map((image, index) => (
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

                  {/* Statistics */}
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                      <div className="text-4xl font-bold text-orange-600 mb-2">{galleryImages.length}</div>
                      <p className="text-gray-600 font-medium">Photos in Album</p>
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
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && galleryImages[selectedImage] && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>

            <img
              src={galleryImages[selectedImage].url}
              alt={galleryImages[selectedImage].name}
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
              <p className="font-semibold">{galleryImages[selectedImage].name}</p>
              <p className="text-sm text-center">{selectedImage + 1} of {galleryImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;

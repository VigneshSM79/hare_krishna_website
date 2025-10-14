import React, { useState, useEffect } from 'react';
import { supabase, type CarouselImage } from '../lib/supabase';
import { Upload, Trash2, CreditCard as Edit, Save, X, Plus, LogOut, Image as ImageIcon } from 'lucide-react';

interface AdminCarouselManagerProps {
  onLogout: () => void;
}

const AdminCarouselManager: React.FC<AdminCarouselManagerProps> = ({ onLogout }) => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newImage, setNewImage] = useState({
    alt_text: '',
    quarter: '',
    display_order: 0
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.warn('Carousel images table not found');
        setImages([]);
        return;
      }
      setImages(data || []);
    } catch (error) {
      console.warn('Error fetching images:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('carousel-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('carousel-images')
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from('carousel_images')
        .insert({
          image_url: publicUrl,
          alt_text: newImage.alt_text || 'Temple Image',
          quarter: newImage.quarter || '2024-Q4',
          display_order: newImage.display_order || images.length + 1
        });

      if (insertError) throw insertError;

      setNewImage({ alt_text: '', quarter: '', display_order: 0 });
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      await supabase.storage
        .from('carousel-images')
        .remove([fileName]);

      // Delete from database
      const { error } = await supabase
        .from('carousel_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image. Please try again.');
    }
  };

  const handleUpdate = async (id: string, updates: Partial<CarouselImage>) => {
    try {
      const { error } = await supabase
        .from('carousel_images')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      setEditingId(null);
      fetchImages();
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Error updating image. Please try again.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Carousel Manager</h1>
              <p className="text-gray-600 mt-2">Manage temple event images</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Plus size={24} className="mr-2 text-orange-500" />
            Add New Image
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={newImage.alt_text}
                  onChange={(e) => setNewImage({ ...newImage, alt_text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Describe the image"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quarter
                </label>
                <input
                  type="text"
                  value={newImage.quarter}
                  onChange={(e) => setNewImage({ ...newImage, quarter: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., 2024-Q4"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={newImage.display_order}
                  onChange={(e) => setNewImage({ ...newImage, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Order in carousel"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                    uploading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'
                  } transition-colors`}
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={16} className="mr-2" />
                      Choose File
                    </>
                  )}
                </label>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Images Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Current Images</h2>
          
          {images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No images uploaded yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video">
                    <img
                      src={image.image_url}
                      alt={image.alt_text}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    {editingId === image.id ? (
                      <EditForm
                        image={image}
                        onSave={(updates) => handleUpdate(image.id, updates)}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">{image.alt_text}</h3>
                        <p className="text-sm text-gray-600 mb-2">Quarter: {image.quarter}</p>
                        <p className="text-sm text-gray-600 mb-4">Order: {image.display_order}</p>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingId(image.id)}
                            className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                          >
                            <Edit size={16} className="mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(image.id, image.image_url)}
                            className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface EditFormProps {
  image: CarouselImage;
  onSave: (updates: Partial<CarouselImage>) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ image, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    alt_text: image.alt_text,
    quarter: image.quarter,
    display_order: image.display_order,
    is_active: image.is_active
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={formData.alt_text}
        onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        placeholder="Alt text"
      />
      
      <input
        type="text"
        value={formData.quarter}
        onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        placeholder="Quarter"
      />
      
      <input
        type="number"
        value={formData.display_order}
        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        placeholder="Display order"
      />
      
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
        />
        <span className="text-sm text-gray-700">Active</span>
      </label>
      
      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition-colors flex items-center justify-center"
        >
          <Save size={14} className="mr-1" />
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600 transition-colors flex items-center justify-center"
        >
          <X size={14} className="mr-1" />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AdminCarouselManager;
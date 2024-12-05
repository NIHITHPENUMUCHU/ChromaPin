import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Link } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePinStore } from '../store/usePinStore';
import { ColorSelector } from './ColorSelector';
import toast from 'react-hot-toast';

export const UploadPin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadPin } = usePinStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !imageUrl || selectedColors.length === 0) {
      toast.error('Please fill in all required fields and select at least one color');
      return;
    }

    uploadPin({
      title,
      description,
      imageUrl,
      colors: selectedColors,
      author: {
        id: 'current-user',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      },
    });

    toast.success('Pin uploaded successfully!');
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setSelectedColors([]);
    setUploadMethod('url');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
      >
        <Upload className="w-5 h-5" />
        Upload Pin
      </motion.button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Upload a New Pin</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter pin title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter pin description"
                  rows={3}
                  required
                />
              </div>

              <ColorSelector
                selectedColors={selectedColors}
                onChange={setSelectedColors}
              />

              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setUploadMethod('url')}
                    className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                      uploadMethod === 'url'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <Link className="w-5 h-5" />
                    URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMethod('file')}
                    className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                      uploadMethod === 'file'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <ImageIcon className="w-5 h-5" />
                    Upload File
                  </button>
                </div>

                {uploadMethod === 'url' ? (
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter image URL"
                  />
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors text-center"
                    >
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        SVG, PNG, JPG or GIF (max. 5MB)
                      </p>
                    </button>
                  </div>
                )}

                {imageUrl && (
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl('');
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Upload Pin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
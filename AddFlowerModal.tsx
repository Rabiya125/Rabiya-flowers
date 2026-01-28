import React, { useState, useRef, useEffect } from 'react';
import { Flower } from '../types';

interface AddFlowerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (flower: Flower) => void;
  flowerToEdit: Flower | null;
  existingCategories: string[];
  initialCategory?: string;
}

const AddFlowerModal: React.FC<AddFlowerModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  flowerToEdit, 
  existingCategories,
  initialCategory = 'Roses'
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(initialCategory);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate form when flowerToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (flowerToEdit) {
        setName(flowerToEdit.name);
        setDescription(flowerToEdit.description);
        setPreviewUrl(flowerToEdit.imageUrl);
        setImageFile(null);
        
        setCategory(flowerToEdit.category);
        setIsCustomCategory(false);
        setCustomCategory('');
      } else {
        // Reset if adding new
        setName('');
        setDescription('');
        setCategory(initialCategory); // Use the passed initial category
        setIsCustomCategory(false);
        setCustomCategory('');
        setPreviewUrl(null);
        setImageFile(null);
      }
    }
  }, [isOpen, flowerToEdit, initialCategory]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '__NEW__') {
      setIsCustomCategory(true);
      setCategory('__NEW__');
    } else {
      setIsCustomCategory(false);
      setCategory(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalCategory = isCustomCategory ? customCategory.trim() : category;

    if (!name || !description || (!previewUrl && !imageFile) || !finalCategory) {
      alert("Please fill in all fields (including category) and select an image.");
      return;
    }

    const saveFlower = (imageUrl: string) => {
      const flower: Flower = {
        id: flowerToEdit ? flowerToEdit.id : Date.now().toString(),
        name,
        description,
        category: finalCategory, // Use the proper capitalized or custom string
        imageUrl,
      };
      onSave(flower);
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveFlower(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else if (previewUrl) {
      // Keep existing URL if no new file selected
      saveFlower(previewUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {flowerToEdit ? 'Edit Flower' : 'Add New Flower'}
                  </h3>
                  <div className="mt-4 space-y-4">
                    
                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Flower Photo</label>
                      <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50" onClick={() => fileInputRef.current?.click()}>
                        <div className="space-y-1 text-center">
                          {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="mx-auto h-32 object-cover rounded" />
                          ) : (
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          <div className="flex text-sm text-gray-600 justify-center">
                            <span className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-indigo-500">
                              <span>{previewUrl ? 'Change photo' : 'Upload a photo'}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      >
                        {existingCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option disabled>──────────</option>
                        <option value="__NEW__">+ Create New Category...</option>
                      </select>
                    </div>

                    {/* Custom Category Input */}
                    {isCustomCategory && (
                      <div className="animate-fade-in-down">
                        <label className="block text-sm font-medium text-primary">New Category Name</label>
                        <input
                          type="text"
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                          className="mt-1 block w-full border border-primary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          placeholder="e.g. Orchids"
                          autoFocus
                        />
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="e.g. Red Velvet Roses"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="Describe the flower..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
              >
                {flowerToEdit ? 'Save Changes' : 'Add to Gallery'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFlowerModal;
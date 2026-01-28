import React, { useState } from 'react';
import { Flower } from '../types';

interface GalleryProps {
  flowers: Flower[];
  onDelete: (id: string) => void;
  onEdit: (flower: Flower) => void;
  isAdmin: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ flowers, onDelete, onEdit, isAdmin }) => {
  const [filter, setFilter] = useState<string>('All');

  const mainCategories = ['All', 'Roses', 'Plants'];
  const otherCategories = Array.from(new Set(flowers.map(f => f.category)))
    .filter((c: string) => !['Roses', 'Plants'].includes(c));

  const allCategories = [...mainCategories, ...otherCategories];

  const filteredFlowers = filter === 'All' 
    ? flowers 
    : flowers.filter(f => f.category === filter);

  return (
    <section id="gallery" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Our Collection</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-serif">
            Rabieh Flowers Gallery
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Explore our fresh roses and beautiful plants.
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-4 flex-wrap gap-y-2">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-sm ${
                filter === cat 
                  ? 'bg-primary text-white shadow-lg scale-105' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredFlowers.map((flower) => (
            <div key={flower.id} className="group relative bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="w-full h-80 bg-gray-200 overflow-hidden relative">
                {/* Image */}
                <img 
                  src={flower.imageUrl} 
                  alt={flower.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                 {/* Badge for category */}
                 <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-text shadow-sm backdrop-blur-sm uppercase pointer-events-none">
                    {flower.category}
                  </span>
                  
                  {/* Action Buttons for Owner - Only visible if admin */}
                  {/* Added z-30 to ensure it sits above everything else */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 z-30 flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onEdit(flower);
                        }}
                        className="bg-white hover:bg-blue-600 text-blue-600 hover:text-white p-2 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                        title="Edit Flower"
                        aria-label="Edit flower"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onDelete(flower.id);
                        }}
                        className="bg-white hover:bg-red-600 text-red-600 hover:text-white p-2 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                        title="Delete Flower"
                        aria-label="Delete flower"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 font-serif">{flower.name}</h3>
                <p className="mt-2 text-base text-gray-500 line-clamp-2">{flower.description}</p>
              </div>
            </div>
          ))}
          {filteredFlowers.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400">
              No items found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
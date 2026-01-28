import React from 'react';

interface StatsProps {
  onAddItem: (category: string) => void;
  isAdmin: boolean;
  address: string;
}

const Stats: React.FC<StatsProps> = ({ onAddItem, isAdmin, address }) => {
  return (
    <section id="about" className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl font-serif">
            Indoor & Outdoor Plants
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Whether you want to green up your living room or landscape your garden, we have the perfect selection for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Indoor Card */}
          <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
            <div className="h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all duration-300 z-10"/>
              <img 
                src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1000&auto=format&fit=crop" 
                alt="Indoor Plants" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <div className="p-8 flex-1 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Indoor Collection</h3>
              <p className="text-gray-600 mb-6">
                Purify your air and transform your interior space with our range of low-maintenance, shade-loving, and tropical indoor plants. Perfect for homes and offices.
              </p>
              <ul className="text-left text-gray-600 space-y-2 mb-6 inline-block">
                  <li className="flex items-center">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                      Orchids & Exotic Flowers
                  </li>
                  <li className="flex items-center">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                      Succulents & Cacti
                  </li>
                   <li className="flex items-center">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                      Air Purifying Ferns
                  </li>
              </ul>
              
              {isAdmin && (
                <button 
                  onClick={() => onAddItem('Indoor')}
                  className="mt-auto inline-flex items-center px-6 py-3 border border-secondary text-base font-medium rounded-full text-secondary bg-white hover:bg-secondary hover:text-white transition-colors duration-300"
                >
                  + Add Indoor Plant
                </button>
              )}
            </div>
          </div>

          {/* Outdoor Card */}
          <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
            <div className="h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all duration-300 z-10"/>
              <img 
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop" 
                alt="Outdoor Garden" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-8 flex-1 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Outdoor Garden</h3>
              <p className="text-gray-600 mb-6">
                Create a stunning entrance or backyard oasis. We offer seasonal blooms, hardy shrubs, and decorative pots to withstand the elements and look great year-round.
              </p>
               <ul className="text-left text-gray-600 space-y-2 mb-6 inline-block">
                  <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Seasonal Bedding Plants
                  </li>
                  <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Balcony Arrangements
                  </li>
                   <li className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      Large Potted Trees
                  </li>
              </ul>

              {isAdmin && (
                <button 
                  onClick={() => onAddItem('Outdoor')}
                  className="mt-auto inline-flex items-center px-6 py-3 border border-primary text-base font-medium rounded-full text-primary bg-white hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  + Add Outdoor Plant
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Location and Contact Info */}
        <div className="bg-secondary bg-opacity-10 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                     <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Visit Our Shop</h3>
                     <p className="text-gray-600 mb-6 max-w-md mx-auto md:mx-0">
                        Come see our collection in person. We would love to help you find the perfect arrangement.
                     </p>
                     
                     <div className="flex items-start justify-center md:justify-start space-x-3 mb-4">
                        <div className="bg-white p-2 rounded-full shadow-sm text-primary shrink-0">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-gray-900">Location</h4>
                            <p className="text-gray-700">{address}</p>
                        </div>
                     </div>

                     <div className="flex items-start justify-center md:justify-start space-x-3">
                        <div className="bg-white p-2 rounded-full shadow-sm text-primary shrink-0">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-gray-900">Contact Us</h4>
                            <a href="tel:03328558" className="text-lg font-bold text-primary hover:underline">
                                +961 03 328558
                            </a>
                        </div>
                     </div>
                </div>
                
                <div className="hidden md:block h-full min-h-[200px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative">
                     <img 
                        src="https://images.unsplash.com/photo-1596627702849-c5c82dfd6632?q=80&w=800&auto=format&fit=crop" 
                        alt="Flower Shop Aesthetic" 
                        className="w-full h-full object-cover opacity-90"
                     />
                     <div className="absolute inset-0 bg-primary bg-opacity-10 flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-primary font-serif font-bold shadow-sm">
                            Rabieh Flowers
                        </span>
                     </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Stats;
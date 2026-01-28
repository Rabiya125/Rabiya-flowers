import React from 'react';
import { BUSINESS_PHONE } from '../constants';

const ContactSticky: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-30 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="text-sm text-gray-500">
        <p>Questions? Call us!</p>
      </div>
      <a
        href={`tel:${BUSINESS_PHONE}`}
        className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-md active:scale-95 transition-transform"
      >
        Call Now
      </a>
    </div>
  );
};

export default ContactSticky;

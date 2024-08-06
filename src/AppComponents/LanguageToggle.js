import React from 'react';
import { Globe } from 'lucide-react';

const LanguageToggle = ({ language, toggleLanguage }) => {
  return (
    <div className="flex justify-end mb-4">
      <button onClick={toggleLanguage} className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-1 px-3 rounded inline-flex items-center transition-colors duration-300">
        <Globe className="mr-1" size={16} />
        <span>{language === 'en' ? 'PT' : 'EN'}</span>
      </button>
    </div>
  );
};

export default LanguageToggle;

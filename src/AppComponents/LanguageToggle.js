import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

const LanguageToggle = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center justify-between w-20 bg-gray-800 text-white text-sm font-medium py-2 px-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
      >
        <Globe size={18} className="text-gray-400 mr-2" />
        <span>{language.toUpperCase()}</span>
        <svg className="fill-current h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-20 mt-1 bg-gray-800 rounded-md shadow-lg"
        >
          {['pt', 'en', 'fr'].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, Globe, ChevronDown } from 'lucide-react';
import translations from './translations';

const PageHeader = ({ language, setLanguage, logo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/NS3" || 
                     location.pathname === "/NS3/" || 
                     location.pathname === "/" || 
                     location.pathname === "";

  const t = translations[language];
  
  if (isHomePage) return null;

  const languages = {
    en: "English",
    pt: "Português"
  };

  return (
    <>
      <Helmet>
        <title>InMotion - Consulting</title>
        <meta name="description" content={t.description} />
      </Helmet>
      <div className="w-full p-4 -mt-6">
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto px-12">
          <Link
            to="/"
            className="text-[#00ff9d] hover:underline flex items-center w-24"
          >
            <ChevronLeft className="mr-2" /> {t.back}
          </Link>
          
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
            <img
              src={logo}
              alt="InMotion Logo"
              className="h-15 transform transition-transform duration-300 hover:scale-110"
            />
            <div className="text-lg text-gray-400 mt-6">
              Your Daily Toolbox for Business Excellence
            </div>
            <h2 className="text-xl">{t.subtitle}</h2>
          </div>

          <div className="relative w-24">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/80 backdrop-blur-md 
                         border border-gray-700 hover:border-[#00ff9d] hover:text-[#00ff9d] 
                         transition-all duration-300 w-full justify-between group"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 group-hover:text-[#00ff9d]" />
                <span className="text-sm">{language.toUpperCase()}</span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 group-hover:text-[#00ff9d] 
                           ${isOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-lg bg-gray-800/80 backdrop-blur-md 
                            border border-gray-700 overflow-hidden z-50">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm
                              hover:bg-gray-700/50 hover:text-[#00ff9d] transition-colors
                              ${language === code ? 'text-[#00ff9d] bg-gray-700/50' : ''}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;
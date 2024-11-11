import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import translations from './translations';

const PageHeader = ({ language, setLanguage, logo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/NS3" || 
                     location.pathname === "/NS3/" || 
                     location.pathname === "/" || 
                     location.pathname === "";

  // Lista de idiomas suportados
  const SUPPORTED_LANGUAGES = {
    en: "English",
    pt: "Português"
  };
  
  // Garante que o idioma atual é suportado, senão usa inglês
  const currentLanguage = SUPPORTED_LANGUAGES[language] ? language : "en";
  const t = translations[currentLanguage];
  
  if (isHomePage) return null;

  return (
    <>
      <Helmet>
        <title>InMotion - Consulting</title>
        <meta name="description" content={t.description} />
      </Helmet>
      <div className="w-full p-4 sm:px-6 -mt-6">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center max-w-4xl mx-auto px-4 sm:px-12">
          <Link
            to="/"
            className="text-[#00ff9d] hover:underline flex items-center w-full sm:w-24 mb-4 sm:mb-0"
          >
            <ChevronLeft className="mr-2" /> {t.back}
          </Link>
          
          <div className="flex flex-col items-center text-center sm:text-left">
            <motion.h1
              className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 whitespace-nowrap"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t.title}
            </motion.h1>

            <motion.img
              src={logo}
              alt="InMotion Logo"
              className="h-12 sm:h-15 transform transition-transform duration-300 hover:scale-110"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="text-sm sm:text-lg text-gray-400 mt-4 sm:mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Daily Toolbox for Business Excellence
            </motion.div>
            <motion.h2
              className="text-lg sm:text-xl mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t.subtitle}
            </motion.h2>
          </div>

          <div className="relative w-full sm:w-24 mt-4 sm:mt-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/80 backdrop-blur-md 
                         border border-gray-700 hover:border-[#00ff9d] hover:text-[#00ff9d] 
                         transition-all duration-300 w-full justify-between group"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 group-hover:text-[#00ff9d]" />
                <span className="text-sm">{currentLanguage.toUpperCase()}</span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 group-hover:text-[#00ff9d] 
                           ${isOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-full sm:w-32 rounded-lg bg-gray-800/80 backdrop-blur-md 
                            border border-gray-700 overflow-hidden z-50"
                >
                  {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code);
                        setIsOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm
                                hover:bg-gray-700/50 hover:text-[#00ff9d] transition-colors
                                ${currentLanguage === code ? 'text-[#00ff9d] bg-gray-700/50' : ''}`}
                    >
                      {name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;

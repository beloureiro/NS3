import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

// Componente LanguageToggle para alternar entre idiomas
const LanguageToggle = ({ language, setLanguage }) => {
  // Estado para controlar se o dropdown está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);
  
  // Refs para o dropdown e o botão, usados para detectar cliques fora do componente
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Função para alternar o estado do dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Função para mudar o idioma e fechar o dropdown
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Effect para lidar com cliques fora do componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Adiciona o event listener quando o componente monta
    document.addEventListener('mousedown', handleClickOutside);
    // Remove o event listener quando o componente desmonta
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Array de idiomas suportados
  const supportedLanguages = ['pt', 'en', 'fr', 'nl', 'es'];

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/80 backdrop-blur-md 
                   border border-gray-700 hover:border-[#00ff9d] hover:text-[#00ff9d] 
                   transition-all duration-300 w-full justify-between group"
      >
        <div className="flex items-center gap-2">
          <Globe size={18} className="text-gray-400 group-hover:text-[#00ff9d]" />
          <span className="text-sm">{language.toUpperCase()}</span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-300 group-hover:text-[#00ff9d] 
                     ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-20 mt-1 bg-gray-800 rounded-md shadow-lg"
        >
          {supportedLanguages.map((lang) => (
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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Search, ClipboardCheck, BarChart, ChevronLeft, Globe } from 'lucide-react';

const Rex = () => {
  const [language, setLanguage] = useState('en');

  const content = {
    en: {
      title: "Rex Platform",
      back: "Back",
      subtitle: "Customer Experience Enhancement Platform",
      overview: "Overview",
      features: "Features",
      benefits: "Benefits",
      // Add more content as needed
    },
    pt: {
      title: "Plataforma Rex",
      back: "Voltar",
      subtitle: "Plataforma de Aprimoramento da Experiência do Cliente",
      overview: "Visão Geral",
      features: "Funcionalidades",
      benefits: "Benefícios",
      // Add more content as needed
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button and language toggle */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="text-[#ffff08] hover:underline flex items-center">
            <ChevronLeft className="mr-2" /> {t.back}
          </Link>
          <button
            onClick={() => setLanguage(lang => lang === 'en' ? 'pt' : 'en')}
            className="flex items-center bg-gray-800 px-3 py-2 rounded"
          >
            <Globe className="mr-2" /> {language.toUpperCase()}
          </button>
        </div>

        {/* Main content */}
        <div className="bg-gray-800 rounded-lg p-6">
          {/* Add your Rex specific content here */}
        </div>
      </div>
    </div>
  );
};

export default Rex;

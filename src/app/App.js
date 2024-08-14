import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppRoutes from './routes';
import translations from '../AppComponents/translations';
import logo from '../assets/rsz_1design_inmotion_181818.png';
import Footer from '../AppComponents/Footer';
import LanguageToggle from '../AppComponents/LanguageToggle';
import '../index.css';

function App() {
  const [showTools, setShowTools] = useState(false);
  const [language, setLanguage] = useState('en');
  
  const t = translations[language];
  
  return (
    <Router basename="/NS3">
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>InMotion - Consulting</title>
          <meta name="description" content={t.description} />
        </Helmet>
        <div className="w-full max-w-4xl text-center flex flex-col items-center relative">
          {/* Botão de idioma - posicionado absolutamente para desktop, e como um elemento de bloco para mobile */}
          <div className="w-full mb-4 sm:mb-0 sm:absolute sm:top-0 sm:right-0 sm:w-auto">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          
          {/* Conteúdo principal do aplicativo, incluindo o título */}
          <AppRoutes
            language={language}
            showTools={showTools}
            setShowTools={setShowTools}
            t={t}
            logo={logo}
          />
          
          {/* Rodapé */}
          <Footer language={language} />
        </div>
      </div>
    </Router>
  );
}

export default App;
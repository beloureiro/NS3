import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppRoutes from './routes';
import translations from '../AppComponents/translations';
import logo from '../assets/rsz_1design_inmotion_181818.png';
import Footer from '../AppComponents/Footer';
import LanguageToggle from '../AppComponents/LanguageToggle';
import '../index.css';

// Componente principal App
function App() {
  // Estado para controlar a exibição de ferramentas
  const [showTools, setShowTools] = useState(false);
  
  // Estado para controlar o idioma atual
  const [language, setLanguage] = useState('en');
  
  // Seleciona as traduções para o idioma atual
  const t = translations[language];
  
  return (
    // Router com um caminho base '/NS3'
    <Router basename="/NS3">
      {/* Container principal com estilos Tailwind CSS */}
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        {/* Helmet para gerenciar metadados do documento */}
        <Helmet>
          <title>InMotion - Consulting</title>
          <meta name="description" content={t.description} />
        </Helmet>
        
        {/* Container de conteúdo central */}
        <div className="w-full max-w-4xl text-center flex flex-col items-center relative">
          {/* Componente de alternância de idioma 
              Posicionado absolutamente no desktop, como bloco no mobile */}
          <div className="w-full mb-4 sm:mb-0 sm:absolute sm:top-0 sm:right-0 sm:w-auto">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
          
          {/* Rotas principais do aplicativo */}
          <AppRoutes
            language={language}
            showTools={showTools}
            setShowTools={setShowTools}
            t={t}
            logo={logo}
          />
          
          {/* Componente de rodapé */}
          <Footer language={language} />
        </div>
      </div>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppRoutes from './routes';
import translations from '../AppComponents/translations';
import logo from '../assets/rsz_1design_inmotion_181818.png';
import Footer from '../AppComponents/Footer';
import '../index.css';

// Componente de conteúdo do App
function AppContent() {
  // Estado para controlar a exibição de ferramentas
  const [showTools, setShowTools] = useState(false);
  
  // Estado para controlar o idioma atual
  const [language, setLanguage] = useState('en');
  
  // Seleciona as traduções para o idioma atual
  const t = translations[language];

  // Usa o hook useLocation para obter a localização atual
  const location = useLocation();

  // Verifica se estamos na página inicial
  const isHomePage = location.pathname === '/NS3' || location.pathname === '/NS3/';
  
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      {/* Helmet para gerenciar metadados do documento */}
      <Helmet>
        <title>InMotion - Consulting</title>
        <meta name="description" content={t.description} />
      </Helmet>
      
      {/* Container de conteúdo central com largura condicional */}
      <div className={`${isHomePage ? 'w-full max-w-4xl' : 'w-full'} text-center flex flex-col items-center relative`}>
        
        {/* Rotas principais do aplicativo */}
        <AppRoutes
          language={language}
          showTools={showTools}
          setShowTools={setShowTools}
          t={t}
          logo={logo}
          setLanguage={setLanguage}
        />
        
        {/* Componente de rodapé */}
        <Footer language={language} />
      </div>
    </div>
  );
}

// Componente principal App
function App() {
  return (
    <Router basename="/NS3">
      <AppContent />
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppRoutes from './routes';
import translations from '../AppComponents/translations';
import logo from '../assets/rsz_1design_inmotion_181818.png';
import '../index.css';

function App() {
  const [showTools, setShowTools] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'pt' : 'en');
  };

  const t = translations[language];

  return (
    <Router basename="/NS3">
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>InMotion - Consulting</title>
          <meta name="description" content={t.description} />
        </Helmet>
        <div className="w-full max-w-4xl text-center">
          <AppRoutes 
            language={language}
            toggleLanguage={toggleLanguage}
            showTools={showTools}
            setShowTools={setShowTools}
            t={t}
            logo={logo}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
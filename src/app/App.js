import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./routes";
import translations from "../AppComponents/translations";
import logo from "../assets/rsz_1design_inmotion_181818.png";
import Footer from "../AppComponents/Footer";
import PageHeader from "../AppComponents/PageHeader";
import "../index.css";

function AppContent() {
  const [showTools, setShowTools] = useState(false);
  const [language, setLanguage] = useState("en");
  const location = useLocation();
  
  // Lista de idiomas suportados para páginas internas
  const SUPPORTED_LANGUAGES = ["en", "pt"];
  
  // Função modificada para controlar a mudança de idioma
  const handleLanguageChange = (newLanguage) => {
    // Se não estiver na home, verifica se o idioma é suportado
    if (location.pathname !== "/" && location.pathname !== "/NS3" && location.pathname !== "/NS3/") {
      const finalLanguage = SUPPORTED_LANGUAGES.includes(newLanguage) ? newLanguage : "en";
      setLanguage(finalLanguage);
    } else {
      // Na home, aceita qualquer idioma
      setLanguage(newLanguage);
    }
  };

  const t = translations[language];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <PageHeader 
        language={language} 
        setLanguage={handleLanguageChange} 
        logo={logo}
        isHomePage={location.pathname === "/" || location.pathname === "/NS3" || location.pathname === "/NS3/"}
      />
      <div className="w-full text-center flex flex-col items-center relative">
        <AppRoutes
          language={language}
          showTools={showTools}
          setShowTools={setShowTools}
          t={t}
          logo={logo}
          setLanguage={handleLanguageChange}
        />
        <Footer language={language} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/NS3">
      <AppContent />
    </Router>
  );
}

export default App;

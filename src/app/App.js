import React, { useState } from "react";
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
  const t = translations[language];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <PageHeader language={language} setLanguage={setLanguage} logo={logo} />
      <div className="w-full text-center flex flex-col items-center relative">
        <AppRoutes
          language={language}
          showTools={showTools}
          setShowTools={setShowTools}
          t={t}
          logo={logo}
          setLanguage={setLanguage}
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

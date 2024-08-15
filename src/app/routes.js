import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import DynamicExpertiseDashboard from '../AppComponents/DynamicExpertiseDashboard';
import QuickTools from '../AppComponents/QuickTools';
import ErrorPage from '../AppComponents/ErrorPage';
import DecisionHelper from '../tools/DecisionMatrix/DecisionMatrix';
import ActionPlanApp from '../tools/ActionPlan/ActionPlan';
import ProcessFlowDiagramApp from '../tools/ProcessFlow/ProcessFlow';
import LanguageToggle from '../AppComponents/LanguageToggle';

function Header({ title }) {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:items-center mb-4 relative">
      <h1 className="text-2xl sm:text-4xl font-bold text-center w-full sm:w-auto">
        {title}
      </h1>
    </div>
  );
}

const AppRoutes = ({ language, showTools, setShowTools, t, logo, setLanguage }) => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Header title={t.title} />
          
          <div className="w-full mb-4 sm:mb-0 sm:absolute sm:top-0 sm:right-0 sm:w-auto">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          <div className="mb-4 transform hover:scale-105 transition-transform duration-300 text-center">
            <img src={logo} alt="InMotion logo" className="mx-auto" />
            <p className="mt-1 text-gray-400">{t.description}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-center">{t.ourExpertise}</h2>
            <p className="leading-relaxed text-center">
              {t.expertiseDescription}
            </p>
          </div>

          <DynamicExpertiseDashboard language={language} />

          {/* Comentando o bloco responsável pelo botão "Quick Tools"
          {location.pathname === "/" && (
            <div className="mt-2 mb-2 text-center">
              <button
                onClick={() => setShowTools(!showTools)} 
                className="bg-[#00cc7d] hover:bg-[#00ff9d] text-black text-sm font-medium py-1.5 px-5 rounded inline-flex items-center transition-colors duration-300"
              >
                <Wrench className="mr-1" size={16} />
                <span>{t.quickToolsButton}</span>
              </button>
            </div>
          )}
          */}

          {showTools && <QuickTools language={language} />}

          <div className="mt-2 mb-2">
            <h2 className="text-2xl font-semibold mb-2 text-center">{t.transformBusiness}</h2>
            <div className="flex justify-center space-x-6">
              <a href="mailto:bc@inmotion.today" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                <Mail size={24} />
              </a>
              <a href="tel:+351915542701" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                <Phone size={24} />
              </a>
              <a href="https://www.linkedin.com/company/inmotionc" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                <Linkedin size={24} />
              </a>
              <a href="https://wa.me/351915542701" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </>
      } />

      <Route path="/decision-helper" element={<DecisionHelper />} />
      <Route path="/5w2h" element={<ActionPlanApp />} />
      <Route path="/process-flow" element={<ProcessFlowDiagramApp />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
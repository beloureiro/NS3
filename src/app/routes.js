import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Wrench, Globe, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import DynamicExpertiseDashboard from '../AppComponents/DynamicExpertiseDashboard';
import QuickTools from '../AppComponents/QuickTools';
import ErrorPage from '../AppComponents/ErrorPage';
import DecisionHelper from '../tools/DecisionHelper/DecisionHelper';
import ActionPlanApp from '../tools/ActionPlan/ActionPlan';

const AppRoutes = ({ language, toggleLanguage, showTools, setShowTools, t, logo }) => (
  <Routes>
    <Route path="/" element={
      <>
        <div className="flex justify-end mb-4">
          <button onClick={toggleLanguage} className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-1 px-3 rounded inline-flex items-center transition-colors duration-300">
            <Globe className="mr-1" size={16} />
            <span>{language === 'en' ? 'PT' : 'EN'}</span>
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
        
        <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
          <img src={logo} alt="InMotion logo" className="mx-auto" />
          <p className="mt-1 text-gray-400">{t.description}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">{t.ourExpertise}</h2>
          <p className="leading-relaxed">
            {t.expertiseDescription}
          </p>
        </div>
        
        <DynamicExpertiseDashboard language={language} />
        
        <div className="mt-6 mb-6">
          <button
            onClick={() => setShowTools(!showTools)}
            className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-1 px-3 rounded inline-flex items-center transition-colors duration-300"
          >
            <Wrench className="mr-1" size={16} />
            <span>{t.quickToolsButton}</span>
          </button>
        </div>

        {showTools && <QuickTools language={language} />}
        
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">{t.transformBusiness}</h2>
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
    <Route path="/error" element={<ErrorPage />} />
  </Routes>
);

export default AppRoutes;
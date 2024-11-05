import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Mail, Phone, Linkedin, MessageCircle, Wrench } from 'lucide-react';
import DynamicExpertiseDashboard from '../AppComponents/DynamicExpertiseDashboard';
import QuickTools from '../AppComponents/QuickTools';
import ErrorPage from '../AppComponents/ErrorPage';
import DecisionHelper from '../tools/DecisionMatrix/DecisionMatrix';
import ActionPlanApp from '../tools/ActionPlan/ActionPlan';
import ProcessFlowDiagramApp from '../tools/ProcessFlow/ProcessFlow';
import LanguageToggle from '../AppComponents/LanguageToggle';
import IndependentWidthPage from '../tools/WidthPage/IndependentWidthPage';
import Solutions from '../AppComponents/Solutions';
import InProcess from '../Solutions/Inprocess';

// Header component: displays the main title of the page
function Header({ title }) {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:items-center mb-4 relative">
      <h1 className="text-2xl sm:text-4xl font-bold text-center w-full sm:w-auto">
        {title}
      </h1>
    </div>
  );
}

// Main AppRoutes component: handles routing and page layout
const AppRoutes = ({ language, showTools, setShowTools, t, logo, setLanguage }) => {
  // useLocation hook: used to get the current URL path
  const location = useLocation();

  // Color classes for button styling
  const normalBgColor = "bg-[#000000]"; // Normal background color
  const hoverBgColor = "hover:bg-[#00ff9d]"; // Hover background color
  const normalBorderColor = "border-[#00cc7d]"; // Normal border color
  const hoverBorderColor = "hover:border-[#00cc7d]"; // Hover border color
  const normalTextColor = "text-[#ffffff]"; // Normal text color
  const hoverTextColor = "hover:text-[#000000]"; // Hover text color

  return (
    <Routes>
      {/* Define the route for the homepage */}
      <Route path="/" element={
        <>
          {/* Header with the page title */}
          <Header title={t.title} />
          
          {/* Language toggle component positioned at the top-right corner */}
          <div className="w-full mb-4 sm:mb-0 sm:absolute sm:top-0 sm:right-0 sm:w-auto">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          {/* Logo and description section */}
          <div className="mb-4 transform hover:scale-105 transition-transform duration-300 text-center">
            <img src={logo} alt="InMotion logo" className="mx-auto" />
            {/* Description of the page or company */}
            <p className="mt-1 text-gray-400">{t.description}</p>
          </div>

          {/* Solutions component */}
          <Solutions language={language} />

          {/* Expertise section */}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-center">{t.ourExpertise}</h2>
            <p className="leading-relaxed text-center max-w-4xl mx-auto">
              Explore our dynamic range of skills across key business domains. Our expertise is tailored to elevate your business performance through innovative solutions and strategic insights.
            </p>
          </div>

          {/* Dynamic expertise dashboard component */}
          <DynamicExpertiseDashboard language={language} />

          {/* Conditional rendering for the Quick Tools button on the homepage */}
          {location.pathname === "/" && (
            <div className="mt-2 mb-2 text-center">
              <button
                onClick={() => setShowTools(!showTools)} 
                className={`border-2 text-sm font-medium py-1.5 px-6 rounded inline-flex items-center transition-colors duration-300 ${normalBgColor} ${hoverBgColor} ${normalBorderColor} ${hoverBorderColor} ${normalTextColor} ${hoverTextColor}`}
              >
                {/* Icon with the label "Quick Tools" */}
                <Wrench className="mr-1" size={16} />
                <span>{t.quickToolsButton}</span>
              </button>
            </div>
          )}

          {/* Conditional rendering of the Quick Tools component */}
          {showTools && <QuickTools language={language} />}

          {/* Section displaying contact icons */}
          <div className="mt-2 mb-2">
            <h2 className="text-2xl font-semibold mb-2 text-center">{t.transformBusiness}</h2>
            <div className="flex justify-center space-x-6">
              {/* Contact links with hover effects */}
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

      {/* Define routes for other pages */}
      <Route path="/decision-helper" element={<DecisionHelper />} />
      <Route path="/5w2h" element={<ActionPlanApp />} />
      <Route path="/process-flow" element={<ProcessFlowDiagramApp />} />
      <Route path="/independent-width" element={<IndependentWidthPage />} />
      <Route 
        path="/inprocess" 
        element={
          <InProcess initialLanguage={language} setAppLanguage={setLanguage} />
        } 
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;

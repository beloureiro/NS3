import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Wrench } from "lucide-react";
import DynamicExpertiseDashboard from "../AppComponents/DynamicExpertiseDashboard";
import QuickTools from "../AppComponents/QuickTools";
import ErrorPage from "../AppComponents/ErrorPage";
import DecisionHelper from "../tools/DecisionMatrix/DecisionMatrix";
import ActionPlanApp from "../tools/ActionPlan/ActionPlan";
import ProcessFlowDiagramApp from "../tools/ProcessFlow/ProcessFlow";
import LanguageToggle from "../AppComponents/LanguageToggle";
import IndependentWidthPage from "../tools/WidthPage/IndependentWidthPage";
import Solutions from "../AppComponents/Solutions";
import ContactSection from "../AppComponents/ContactSection";
import InProcessMethodology from "../Solutions/Inprocess";
import FourMenu from "../Solutions/4Menu";

// Header component: displays the main title of the page
function Header({ title }) {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:items-center mb-2 relative">
      <h1 className="text-2xl sm:text-4xl font-bold text-center w-full sm:w-auto">
        {title}
      </h1>
    </div>
  );
}

// Main AppRoutes component: handles routing and page layout
const AppRoutes = ({
  language,
  showTools,
  setShowTools,
  t,
  logo,
  setLanguage,
}) => {
  const location = useLocation();

  const normalBgColor = "bg-[#000000]";
  const hoverBgColor = "hover:bg-[#00ff9d]";
  const normalBorderColor = "border-[#00cc7d]";
  const hoverBorderColor = "hover:border-[#00cc7d]";
  const normalTextColor = "text-[#ffffff]";
  const hoverTextColor = "hover:text-[#000000]";

  return (
    <Routes>
      {/* Define the route for the homepage */}
      <Route
        path="/"
        element={
          <>
            {/* Header with the page title */}
            <Header title={t.title} />

            {/* Language toggle component positioned at the top-right corner */}
            <div className="w-full mb-2 sm:mb-0 sm:absolute sm:top-0 sm:right-0 sm:w-auto">
              <LanguageToggle language={language} setLanguage={setLanguage} />
            </div>

            {/* Logo and description section */}
            <div className="mb-2 transform hover:scale-105 transition-transform duration-300 text-center">
              <img src={logo} alt="InMotion logo" className="mx-auto" />
              <p className="mt-1 text-gray-400">{t.description}</p>
            </div>

            {/* Solutions component */}
            <Solutions language={language} />

            {/* Expertise section */}
            <div className="-mt-2 mb-2 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-1 text-center text-[#00cc7d]">
                {t.ourExpertise}
              </h2>
              <p className="leading-relaxed text-center max-w-2xl mx-auto">
                {t.expertiseDescriptionShort}
              </p>
            </div>

            {/* Dynamic expertise dashboard component */}
            <DynamicExpertiseDashboard language={language} />

            {/* Conditional rendering for the Quick Tools button on the homepage */}
            {location.pathname === "/" && (
              <div className="mt-2 mb-2 text-center">
                <button
                  onClick={() => setShowTools(!showTools)}
                  className={`border-2 text-sm font-medium py-1 px-4 rounded inline-flex items-center transition-colors duration-300 ${normalBgColor} ${hoverBgColor} ${normalBorderColor} ${hoverBorderColor} ${normalTextColor} ${hoverTextColor}`}
                >
                  <Wrench className="mr-1" size={16} />
                  <span>{t.quickToolsButton}</span>
                </button>
              </div>
            )}

            {/* Conditional rendering of the Quick Tools component */}
            {showTools && <QuickTools language={language} />}

            {/* Replace the contact section with the new component */}
            <ContactSection title={t.transformBusiness} />
          </>
        }
      />

      {/* Define routes for other pages */}
      <Route path="/decision-helper" element={<DecisionHelper language={language} />} />
      <Route path="/5w2h" element={<ActionPlanApp language={language} />} />
      <Route path="/process-flow" element={<ProcessFlowDiagramApp language={language} />} />
      <Route path="/independent-width" element={<IndependentWidthPage />} />
      <Route 
        path="/4menu" 
        element={
          <FourMenu 
            language={language} 
            setLanguage={setLanguage}
          />
        } 
      />
      <Route
        path="/inprocess"
        element={
          <InProcessMethodology language={language} setLanguage={setLanguage} />
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;

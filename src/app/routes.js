import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
import REXPresentation from "../Solutions/Rex";

const transitionSettings = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.4 },
};

// Header component removed as it was not used

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

  // Lista de idiomas suportados para páginas internas
  const SUPPORTED_LANGUAGES = ["en", "pt"];

  // Função para garantir idioma suportado
  const getSupportedLanguage = (currentLanguage) => {
    return SUPPORTED_LANGUAGES.includes(currentLanguage)
      ? currentLanguage
      : "en";
  };

  // Garante que o idioma atual é suportado para componentes internos
  const safeLanguage = getSupportedLanguage(language);

  const normalBgColor = "bg-[#000000]";
  const hoverBgColor = "hover:bg-[#00ff9d]";
  const normalBorderColor = "border-[#00cc7d]";
  const hoverBorderColor = "hover:border-[#00cc7d]";
  const normalTextColor = "text-[#ffffff]";
  const hoverTextColor = "hover:text-[#000000]";

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Define the route for the homepage */}
        <Route
          path="/"
          element={
            <motion.div {...transitionSettings}>
              {/* Header with animated title */}
              <motion.h1
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-4xl font-bold text-center w-full sm:w-auto"
              >
                {t.title}
              </motion.h1>

              <div className="mb-2 transform hover:scale-105 transition-transform duration-300 text-center">
                <img src={logo} alt="InMotion logo" className="mx-auto" />
                <motion.p
                  key={t.description}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1 text-gray-400"
                >
                  {t.description}
                </motion.p>
              </div>

              {/* Language toggle component positioned below the logo and title on mobile */}
              <div className="flex justify-center mb-4 sm:mb-0 sm:absolute sm:top-0 sm:right-0">
                <LanguageToggle language={language} setLanguage={setLanguage} />
              </div>

              {/* Solutions component */}
              <Solutions language={language} />

              {/* Expertise section with animated text */}
              <div className="-mt-2 mb-2 max-w-2xl mx-auto">
                <motion.h2
                  key={t.ourExpertise}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-semibold mb-1 text-center text-[#00cc7d]"
                >
                  {t.ourExpertise}
                </motion.h2>
                <motion.p
                  key={t.expertiseDescriptionShort}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="leading-relaxed text-center max-w-2xl mx-auto"
                >
                  {t.expertiseDescriptionShort}
                </motion.p>
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
            </motion.div>
          }
        />

        {/* Define routes for other pages */}
        <Route
          path="/decision-helper"
          element={
            <motion.div {...transitionSettings}>
              <DecisionHelper language={safeLanguage} />
            </motion.div>
          }
        />
        <Route
          path="/5w2h"
          element={
            <motion.div {...transitionSettings}>
              <ActionPlanApp language={safeLanguage} />
            </motion.div>
          }
        />
        <Route
          path="/process-flow"
          element={
            <motion.div {...transitionSettings}>
              <ProcessFlowDiagramApp language={language} />
            </motion.div>
          }
        />
        <Route
          path="/independent-width"
          element={
            <motion.div {...transitionSettings}>
              <IndependentWidthPage />
            </motion.div>
          }
        />
        <Route
          path="/4menu"
          element={
            <motion.div {...transitionSettings}>
              <FourMenu language={safeLanguage} setLanguage={setLanguage} />
            </motion.div>
          }
        />
        <Route
          path="/inprocess"
          element={
            <motion.div {...transitionSettings}>
              <InProcessMethodology
                language={safeLanguage}
                setLanguage={setLanguage}
              />
            </motion.div>
          }
        />
        <Route
          path="/rex"
          element={
            <motion.div {...transitionSettings}>
              <REXPresentation language={safeLanguage} />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div {...transitionSettings}>
              <ErrorPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;

import React, { useState } from "react";
import {
  ChevronRight,
  Home,
  DollarSign,
  Calendar,
  BookOpen,
  BarChart2,
  Layers,
  RefreshCw,
  Database,
  MessageSquare,
  Users,
  Newspaper,
  TrendingUp,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { texts } from "./RexLanguage";
import ContactSection from "../AppComponents/ContactSection";

const REXPresentation = ({ language = "pt" }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Ajuste das propriedades dos ícones
  const icons = {
    1: <Home className="w-5 h-5" />,
    2: <DollarSign className="w-5 h-5" />,
    3: <TrendingUp className="w-5 h-5" />,
    4: <Newspaper className="w-5 h-5" />,
    5: <Calendar className="w-5 h-5" />,
    6: <BookOpen className="w-5 h-5" />,
    7: <Users className="w-5 h-5" />,
    8: <BarChart2 className="w-5 h-5" />,
    9: <Layers className="w-5 h-5" />,
    10: <RefreshCw className="w-5 h-5" />,
    11: <Database className="w-5 h-5" />,
    12: <MessageSquare className="w-5 h-5" />,
  };

  // Determina qual recurso deve ser exibido nos detalhes
  const featureToDisplay = hoveredFeature || selectedFeature;

  // Componente para cada card de funcionalidade
  const FeatureCard = ({ feature }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedFeature(feature)}
      onHoverStart={() => setHoveredFeature(feature)}
      onHoverEnd={() => setHoveredFeature(null)}
      className="relative w-full max-w-[180px] mx-auto"
    >
      <div
        className={` 
          h-full cursor-pointer rounded-lg border-2 transition-all duration-300
          ${
            selectedFeature?.id === feature.id
              ? "border-[#FFFF08] bg-gray-800/90"
              : hoveredFeature?.id === feature.id
              ? "border-[#FFFF08]/50 bg-gray-800/70"
              : "border-gray-700 bg-gray-800/60"
          }
        `}
      >
        <div className="p-3 flex items-center space-x-2">
          <div className="p-2 rounded-lg transition-colors duration-300 bg-transparent shrink-0">
            {React.cloneElement(icons[feature.id], {
              className: `${
                selectedFeature?.id === feature.id
                  ? "text-[#FFFF08]"
                  : hoveredFeature?.id === feature.id
                  ? "text-[#FFFF08]/80"
                  : "text-[#FFFF08]/60"
              }`,
            })}
          </div>
          <h3
            className={` 
              text-sm font-semibold transition-colors duration-300
              ${selectedFeature?.id === feature.id ? "text-[#FFFF08]" : "text-white"}
            `}
          >
            {feature.title[language]}
          </h3>
        </div>
      </div>
    </motion.div>
  );

  // Componente para exibir detalhes da funcionalidade
  const FeatureDetail = ({ feature }) => (
    <AnimatePresence mode="wait">
      {feature && (
        <motion.div
          key={feature.id} // Adicionado para melhorar o controle do componente
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <div className="bg-gray-800/90 border-2 border-gray-700 rounded-lg overflow-hidden">
            <div className="p-6 relative">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-transparent">
                    {React.cloneElement(icons[feature.id], {
                      className: "text-[#FFFF08]",
                    })}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#FFFF08]">
                      {feature.title[language]}
                    </h2>
                    <p className="text-gray-400 mt-2">
                      {feature.description[language]}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="p-2 hover:bg-gray-700/50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              </div>
              <div className="mt-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feature.details[language].map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className="mt-1">
                        <ChevronRight className="w-4 h-4 text-[#FFFF08]/60 group-hover:text-[#FFFF08] transition-colors" />
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {detail}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl">
              <Home className="w-8 h-8 text-[#FFFF08]" />
            </div>
            <h1 className="text-4xl font-bold text-[#FFFF08]">REX</h1>
          </div>
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-[#FFFF08] bg-[#FFFF08]/10 rounded-full">
            Real Estate Experience
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {texts.headerSubtitle[language]}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {texts.features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>

        <FeatureDetail feature={featureToDisplay} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <ContactSection title="Entre em Contato" />
        </motion.div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 8, 0.2);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 8, 0.3);
        }
      `}</style>
    </div>
  );
};

export default REXPresentation;

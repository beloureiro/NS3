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
} from "lucide-react";
import { texts } from "./RexLanguage";

const REXPresentation = ({ language = "pt" }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const icons = {
    1: <Home className="w-5 h-5 text-[#ffff08]" />,
    2: <DollarSign className="w-5 h-5 text-[#ffff08]" />,
    3: <TrendingUp className="w-5 h-5 text-[#ffff08]" />,
    4: <Newspaper className="w-5 h-5 text-[#ffff08]" />,
    5: <Calendar className="w-5 h-5 text-[#ffff08]" />,
    6: <BookOpen className="w-5 h-5 text-[#ffff08]" />,
    7: <Users className="w-5 h-5 text-[#ffff08]" />,
    8: <BarChart2 className="w-5 h-5 text-[#ffff08]" />,
    9: <Layers className="w-5 h-5 text-[#ffff08]" />,
    10: <RefreshCw className="w-5 h-5 text-[#ffff08]" />,
    11: <Database className="w-5 h-5 text-[#ffff08]" />,
    12: <MessageSquare className="w-5 h-5 text-[#ffff08]" />,
  };

  return (
    <div className="bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Home className="w-8 h-8 text-[#ffff08]" />
          <div>
            <h1 className="text-3xl font-bold text-[#ffff08]">
              REX - Real Estate Experience
            </h1>
            <p className="text-lg text-gray-400 mt-2">
              {texts.headerSubtitle[language]}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {texts.features.map((feature) => (
          <div
            key={feature.id}
            className={`bg-gray-800 rounded-lg border border-gray-700 cursor-pointer transition-all duration-200 hover:border-[#ffff08] ${
              selectedFeature?.id === feature.id ? "ring-1 ring-[#ffff08]" : ""
            }`}
            onClick={() => setSelectedFeature(feature)}
          >
            <div className="p-4 flex items-center justify-center gap-2">
              {icons[feature.id]}
              <h3 className="text-sm font-semibold text-white truncate">
                {feature.title[language]}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {selectedFeature && (
        <div className="max-w-6xl mx-auto mt-8">
          <div className="rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                {icons[selectedFeature.id]}
                <h3 className="text-xl font-semibold text-[#ffff08]">
                  {selectedFeature.title[language]}
                </h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {selectedFeature.description[language]}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {selectedFeature.details[language].map((detail, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#ffff08] mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default REXPresentation;

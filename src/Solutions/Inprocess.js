import React, { useState } from "react";
import {
  Users,
  Cpu,
  Search,
  ClipboardCheck,
  BarChart,
  Waypoints,
  Workflow,
} from "lucide-react";
import ContactSection from "../AppComponents/ContactSection";
import { translations, explanations } from "./InprocessLanguage";

// Component for creating a card with a specific background and border style
const Card = ({ children, className }) => (
  <div className={`bg-gray-800 border-gray-700 rounded-[5px] ${className}`}>{children}</div>
);

// Component for the content inside the card with padding
const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const TabContext = React.createContext();

// Tabs component with state management for active tab
const Tabs = ({ children, defaultValue, className, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={className}>{children}</div>
    </TabContext.Provider>
  );
};

// Component for the list of tabs
const TabsList = ({ children, className }) => (
  <div className={className}>{children}</div>
);

// Component for individual tab triggers
const TabsTrigger = ({ children, value, className }) => {
  const { activeTab, setActiveTab } = React.useContext(TabContext);

  return (
    <button
      className={`${className} ${
        activeTab === value ? "bg-[#00ff9d] text-black" : ""
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

// Component for tab content that displays only when active
const TabsContent = ({ children, value, className }) => {
  const { activeTab } = React.useContext(TabContext);
  return activeTab === value ? (
    <div className={className}>{children}</div>
  ) : null;
};

// Main component for the InProcess Methodology section
const InProcessMethodology = ({ language, setLanguage }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentTab, setCurrentTab] = useState("overview");

  // Get translations based on selected language
  const t = translations[language];

  // Mapping tabs to explanation keys
  const tabToExplanationMap = {
    overview: "default",
    diagnostic: "diagnostico",
    action: "planoAcao",
  };

  // Function to get the current explanation based on tab and selected item
  const getCurrentExplanation = (tab, item) => {
    if (item) {
      return explanations[item] || explanations.default;
    }
    const explanationKey = tabToExplanationMap[tab];
    return explanations[explanationKey] || explanations.default;
  };

  // Function to get the appropriate icon based on type
  const getIcon = (type) => {
    const icons = {
      default: <Waypoints className="w-8 h-8 text-blue-400" />,
      processos: <Workflow className="w-8 h-8 text-blue-400" />,
      pessoas: <Users className="w-8 h-8 text-purple-400" />,
      tecnologia: <Cpu className="w-8 h-8 text-green-400" />,
      diagnostico: <Search className="w-8 h-8 text-blue-400" />,
      planoAcao: <ClipboardCheck className="w-8 h-8 text-green-400" />,
      metricas: <Search className="w-8 h-8 text-blue-400" />,
      beneficios: <BarChart className="w-8 h-8 text-yellow-400" />,
    };
    return icons[type] || icons.default;
  };

  const currentExplanation = getCurrentExplanation(currentTab, selectedItem);

  // Handler for tab changes
  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
    setSelectedItem(null);
  };

  return (
    <div className="bg-black text-white flex flex-col">
      {/* Increased max-width to max-w-8xl for a wider main container */}
      <div className="w-full max-w-8xl mx-auto px-6 py-4"></div>

      <div>
        <div className="max-w-8xl mx-auto px-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-8">
                <Waypoints className="w-10 h-10 text-[#00ff9d]" />
                <div>
                  <h1 className="text-3xl font-bold text-[#00ff9d]">
                    {t.title}
                  </h1>
                  <p className="text-gray-400">{t.subtitle}</p>
                </div>
              </div>

              <Tabs
                defaultValue="overview"
                className="space-y-6"
                onTabChange={handleTabChange}
              >
                <TabsList className="grid grid-cols-3 gap-4 bg-gray-700 p-1 rounded-[5px]">
                  <TabsTrigger
                    value="overview"
                    className="bg-gray-700 text-white p-2 rounded-[5px]"
                  >
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <span>{t.overview}</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="diagnostic"
                    className="bg-gray-700 text-white p-2 rounded-[5px]"
                  >
                    <div className="flex items-center space-x-2">
                      <ClipboardCheck className="w-4 h-4" />
                      <span>{t.diagnostic}</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="action"
                    className="bg-gray-700 text-white p-2 rounded-[5px]"
                  >
                    <div className="flex items-center space-x-2">
                      <BarChart className="w-4 h-4" />
                      <span>{t.actionPlan}</span>
                    </div>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-3 gap-6">
                    <div
                      className="bg-gray-700 p-6 rounded-[5px] border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem("processos")}
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <Workflow className="w-8 h-8 text-blue-400" />
                        <h3 className="text-lg font-semibold">{t.processes}</h3>
                      </div>
                      <p className="text-gray-400">{t.processesDesc}</p>
                    </div>
                    <div
                      className="bg-gray-700 p-6 rounded-[5px] border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem("pessoas")}
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <Users className="w-8 h-8 text-purple-400" />
                        <h3 className="text-lg font-semibold">{t.people}</h3>
                      </div>
                      <p className="text-gray-400">{t.peopleDesc}</p>
                    </div>
                    <div
                      className="bg-gray-700 p-6 rounded-[5px] border border-gray-600 hover:border-green-500 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem("tecnologia")}
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <Cpu className="w-8 h-8 text-green-400" />
                        <h3 className="text-lg font-semibold">
                          {t.technology}
                        </h3>
                      </div>
                      <p className="text-gray-400">{t.technologyDesc}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="diagnostic" className="space-y-6">
                  <div className="grid gap-6">
                    <div
                      className="bg-gray-700 p-6 rounded-[5px] border border-gray-600 cursor-pointer"
                      onClick={() => setSelectedItem("diagnostico")}
                    >
                      <h3 className="text-xl font-semibold mb-4">
                        {t.advancedAnalysis}
                      </h3>
                      <div className="text-gray-400 space-y-4">
                        <p>{t.metrics}</p>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Complexidade de Execução (ECL)</li>
                          <li>Índice de Satisfação do Cliente (CSI)</li>
                          <li>Matriz de Complexidade e Satisfação</li>
                          <li>Análise de Feedback com IA</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="action" className="space-y-6">
                  <div className="grid gap-6">
                    <div
                      className="bg-gray-700 p-6 rounded-[5px] border border-gray-600 cursor-pointer"
                      onClick={() => setSelectedItem("planoAcao")}
                    >
                      <h3 className="text-xl font-semibold mb-4">
                        {t.actionPlanTitle}
                      </h3>
                      <div className="text-gray-400 space-y-4">
                        <p>{t.transformationProcess}</p>
                        <ul className="grid grid-cols-2 gap-4">
                          <li>Priorização de ações</li>
                          <li>Cronograma detalhado</li>
                          <li>Monitoramento contínuo</li>
                          <li>Auditoria integrada</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8">
                <div className="bg-gray-700 p-6 rounded-[5px] border border-gray-600">
                  <div className="flex items-center space-x-4 mb-4">
                    {getIcon(selectedItem || tabToExplanationMap[currentTab])}
                    <h3 className="text-xl font-semibold text-[#00ff9d]">
                      {currentExplanation[language].title}
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {currentExplanation[language].content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ContactSection title="Contact Us" className="mt-4 mb-2" />
    </div>
  );
};

export default InProcessMethodology;

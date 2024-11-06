import React, { useState } from "react";
// Remove Link import since back arrow is removed
// import { Link } from "react-router-dom";
import {
  Activity,
  Users,
  Cpu,
  Search,
  ClipboardCheck,
  BarChart,
  Waypoints, // Corrected import to Waypoint
} from "lucide-react";
// Remove logo import since it's not needed anymore
import ContactSection from "../AppComponents/ContactSection";
import { translations, explanations } from "./InprocessLanguage"; // Import translations and explanations

// Componentes auxiliares
const Card = ({ children, className }) => (
  <div className={`bg-gray-800 border-gray-700 ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const TabContext = React.createContext();

const Tabs = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabContext.Provider>
  );
};

const TabsList = ({ children, className }) => (
  <div className={className}>{children}</div>
);

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

const TabsContent = ({ children, value, className }) => {
  const { activeTab } = React.useContext(TabContext);
  return activeTab === value ? (
    <div className={className}>{children}</div>
  ) : null;
};

const InProcessMethodology = ({ language, setLanguage }) => {
  // Removemos o useState do language pois agora vem via props
  const [selectedItem, setSelectedItem] = useState(null);

  // Usa o language que vem via props
  const t = translations[language];
  const currentExplanation = explanations[selectedItem] || explanations.default;

  return (
    <div className="bg-black text-white flex flex-col">
      {/* Header Section - Simplified */}
      <div className="w-full max-w-6xl mx-auto px-6 py-4">
        {/* Removed language button and back arrow */}
      </div>

      {/* Main Content */}
      <div>
        <div className="max-w-6xl mx-auto px-6">
          {/* ...existing Card and content... */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-8">
                <Waypoints className="w-10 h-10 text-[#00ff9d]" />{" "}
                {/* Changed icon to waypoints */}
                <div>
                  <h1 className="text-3xl font-bold text-[#00ff9d]">
                    {t.title}
                  </h1>
                  <p className="text-gray-400">{t.subtitle}</p>
                </div>
              </div>

              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid grid-cols-3 gap-4 bg-gray-700 p-1">
                  <TabsTrigger
                    value="overview"
                    className="bg-gray-700 text-white p-2 rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <span>{t.overview}</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="diagnostic"
                    className="bg-gray-700 text-white p-2 rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <ClipboardCheck className="w-4 h-4" />
                      <span>{t.diagnostic}</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    value="action"
                    className="bg-gray-700 text-white p-2 rounded"
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
                      className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem("processos")}
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <Cpu className="w-8 h-8 text-blue-400" />
                        <h3 className="text-lg font-semibold">{t.processes}</h3>
                      </div>
                      <p className="text-gray-400">{t.processesDesc}</p>
                    </div>
                    <div
                      className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem("pessoas")}
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <Users className="w-8 h-8 text-purple-400" />
                        <h3 className="text-lg font-semibold">{t.people}</h3>
                      </div>
                      <p className="text-gray-400">{t.peopleDesc}</p>
                    </div>
                    <div
                      className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-green-500 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem("tecnologia")}
                    >
                      <div className="flex items-center space-x-2 mb-4">
                        <Activity className="w-8 h-8 text-green-400" />
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
                      className="bg-gray-700 p-6 rounded-lg border border-gray-600 cursor-pointer"
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
                      className="bg-gray-700 p-6 rounded-lg border border-gray-600 cursor-pointer"
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
                <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
                  <div className="flex items-center space-x-4 mb-4">
                    {currentExplanation.icon}
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

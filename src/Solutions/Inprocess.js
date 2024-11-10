import React, { useState } from "react";
import {
  Users,
  Cpu,
  Search,
  ClipboardCheck,
  BarChart,
  Waypoints,
  Workflow,
  ArrowRight,
  LayoutList,
  ArrowRightLeft,
  Grid2x2,
  Plus,
  ChartNetwork,
  Target,
  SquareActivity,
} from "lucide-react";
import ContactSection from "../AppComponents/ContactSection";
import { translations, explanations } from "./InprocessLanguage";
import { motion, AnimatePresence } from "framer-motion";

// Componente para criar um card com estilo específico de fundo e borda
const Card = ({ children, className }) => (
  <div
    className={`bg-transparent border-gray-700 rounded-[10px] ${className}`}
    style={{ minHeight: "60px" }}
  >
    {children}
  </div>
);

// Componente para o conteúdo dentro do card com padding
const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Contexto para gerenciar o estado das abas
const TabContext = React.createContext();

// Componente Tabs com gerenciamento de estado para a aba ativa
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

// Componente para os triggers individuais das abas
const TabsTrigger = ({ children, value, className }) => {
  const { activeTab, setActiveTab } = React.useContext(TabContext);

  return (
    <button
      className={`${className} uppercase ${
        activeTab === value ? "bg-[#00cc7d] text-black font-bold" : ""
      } hover:bg-gray-600 hover:text-white transition-colors`}
      onClick={() => {
        if (activeTab !== value) setActiveTab(value);
      }}
    >
      {children}
    </button>
  );
};

// Componente para o conteúdo da aba que exibe apenas quando ativo
const TabsContent = ({ children, value, className }) => {
  const { activeTab } = React.useContext(TabContext);
  return (
    <div>
      <AnimatePresence mode="wait">
        {activeTab === value && (
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={className}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Explicação da Análise Avançada com ajustes de padding e tamanho
const AdvancedAnalysisExplanation = ({ language }) => {
  const t = translations[language];
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="bg-gray-900 p-3 rounded-lg flex flex-col items-center w-full md:w-1/3">
          <Waypoints className="text-emerald-400 mb-2" size={28} />
          <p className="text-slate-300 text-sm text-center">
            {t.processMapping}
          </p>
        </div>
        <ArrowRightLeft className="text-emerald-400 hidden md:block" size={24} />
        <div className="bg-gray-900 p-3 rounded-lg flex flex-col items-center w-full md:w-1/3">
          <div className="flex items-center gap-4 mb-2">
            <Cpu className="text-emerald-400" size={28} />
            <Plus className="text-emerald-400" size={18} />
            <ChartNetwork className="text-emerald-400" size={28} />
          </div>
          <p className="text-slate-300 text-sm text-center">{t.aiProcessing}</p>
        </div>
        <ArrowRightLeft className="text-emerald-400 hidden md:block" size={24} />
        <div className="bg-gray-900 p-3 rounded-lg flex flex-col items-center w-full md:w-1/3">
          <Grid2x2 className="text-emerald-400 mb-2" size={28} />
          <p className="text-slate-300 text-sm text-center">
            {t.complexityMatrix}
          </p>
        </div>
      </div>
    </div>
  );
};

// Metodologia InProcess com ajustes nos espaços entre os elementos
const InProcessMethodology = ({ language, setLanguage }) => {
  const [selectedItem, setSelectedItem] = useState("processos");
  const [currentTab, setCurrentTab] = useState("overview");

  const t = translations[language];

  const tabToExplanationMap = {
    overview: "default",
    diagnostic: "diagnostico",
    action: "planoAcao",
  };

  const getCurrentExplanation = (tab, item) => {
    if (item) {
      return explanations[item] || explanations.default;
    }
    const explanationKey = tabToExplanationMap[tab];
    return explanations[explanationKey] || explanations.default;
  };

  const getIcon = (type) => {
    const icons = {
      default: <Waypoints className="w-8 h-8 text-blue-400" />,
      processos: <Workflow className="w-8 h-8 text-blue-400" />,
      pessoas: <Users className="w-8 h-8 text-purple-400" />,
      tecnologia: <Cpu className="w-8 h-8 text-green-400" />,
      diagnostico: <ClipboardCheck className="w-8 h-8 text-blue-400" />,
      planoAcao: <LayoutList className="w-8 h-8 text-green-400" />,
      metricas: <Search className="w-8 h-8 text-blue-400" />,
      beneficios: <BarChart className="w-8 h-8 text-yellow-400" />,
    };
    return icons[type] || icons.default;
  };

  const currentExplanation = getCurrentExplanation(currentTab, selectedItem);

  const handleTabChange = (newTab) => {
    if (newTab !== "overview") {
      setCurrentTab(newTab);
      setSelectedItem(null);
    } else {
      setCurrentTab("overview");
      setSelectedItem("processos");
    }
  };

  return (
    <div className="bg-black text-white">
      <div className="max-w-screen-lg mx-auto px-6 pt-0 pb-6">
        <Card className="bg-gray-800 border-gray-700 h-full">
          <CardContent className="p-6 h-full flex flex-col">
            {/* Cabeçalho fixo */}
            <div>
              <div className="flex items-center mb-4 space-x-4">
                <Waypoints className="w-14 h-14 text-[#00ff9d]" />
                <h1 className="text-4xl font-bold text-[#00ff9d]">{t.title}</h1>
              </div>
              <p className="text-white text-lg text-left mb-6 leading-[2]">
                Integra{" "}
                <span className="inline-flex items-baseline">
                  <Workflow
                    className="w-5 h-5 mr-1 text-blue-400"
                    style={{ verticalAlign: "baseline" }}
                  />
                  <span>Processos</span>
                </span>
                ,{" "}
                <span className="inline-flex items-baseline">
                  <Users
                    className="w-5 h-5 mr-1 text-purple-400"
                    style={{ verticalAlign: "baseline" }}
                  />
                  <span>Pessoas</span>
                </span>
                , e{" "}
                <span className="inline-flex items-baseline">
                  <Cpu
                    className="w-5 h-5 mr-1 text-green-400"
                    style={{ verticalAlign: "baseline" }}
                  />
                  <span>Tecnologia</span>
                </span>{" "}
                para melhorar e estabilizar as operações, capacitar equipes e
                acelerar fluxos de trabalho.
              </p>
            </div>

            {/* Conteúdo rolável */}
            <div className="flex-1">
              <Tabs
                defaultValue="overview"
                className="space-y-2"
                onTabChange={handleTabChange}
              >
                {/* Navegação das abas */}
                <div className="relative flex flex-col md:flex-row md:justify-between items-center w-full bg-gray-800 p-1 rounded-lg">
                  <TabsTrigger
                    value="overview"
                    className="relative flex items-center space-x-2 px-4 py-2 rounded-md transition-all w-full md:w-auto"
                  >
                    <Search className="w-4 h-4" />
                    <span>{t.overview}</span>
                  </TabsTrigger>

                  {/* Setas e linhas ocultas no mobile */}
                  <div className="flex items-center hidden md:flex">
                    <div
                      className={`h-0.5 w-8 transition-colors duration-300 ${
                        currentTab === "overview"
                          ? "bg-gray-600"
                          : "bg-[#00ff9d]"
                      }`}
                    />
                    <ArrowRight
                      className={`w-5 h-5 transition-colors duration-300 ${
                        currentTab === "overview"
                          ? "text-gray-400"
                          : "text-[#00ff9d]"
                      }`}
                    />
                  </div>

                  <TabsTrigger
                    value="diagnostic"
                    className="relative flex items-center space-x-2 px-4 py-2 rounded-md transition-all w-full md:w-auto mt-2 md:mt-0"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full border ${
                          currentTab === "diagnostic" || currentTab === "action"
                            ? "bg-[#00ff9d] text-black border-[#00ff9d]"
                            : "bg-transparent text-white border-white"
                        }`}
                      >
                        1
                      </div>
                      <ClipboardCheck className="w-4 h-4" />
                      <span>{t.diagnostic}</span>
                    </div>
                  </TabsTrigger>

                  {/* Setas e linhas ocultas no mobile */}
                  <div className="flex items-center hidden md:flex">
                    <div
                      className={`h-0.5 w-8 transition-colors duration-300 ${
                        currentTab === "action" ? "bg-[#00ff9d]" : "bg-gray-600"
                      }`}
                    />
                    <ArrowRight
                      className={`w-5 h-5 transition-colors duration-300 ${
                        currentTab === "action"
                          ? "text-[#00ff9d]"
                          : "text-gray-400"
                      }`}
                    />
                  </div>

                  <TabsTrigger
                    value="action"
                    className="relative flex items-center space-x-2 px-4 py-2 rounded-md transition-all w-full md:w-auto mt-2 md:mt-0"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full border ${
                          currentTab === "action"
                            ? "bg-[#00ff9d] text-black border-[#00ff9d]"
                            : "bg-transparent text-white border-white"
                        }`}
                      >
                        2
                      </div>
                      <LayoutList className="w-4 h-4" />
                      <span>{t.actionPlan}</span>
                    </div>
                  </TabsTrigger>
                </div>

                {/* Conteúdo das abas */}
                <TabsContent value="overview" className="space-y-4 mt-2">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div
                      className={`bg-gray-800 p-4 rounded-[5px] border ${
                        selectedItem === "processos"
                          ? "border-blue-500"
                          : "border-gray-600"
                      } hover:border-blue-500 transition-colors cursor-pointer w-full md:w-1/3`}
                      onClick={() => setSelectedItem("processos")}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Workflow className="w-8 h-8 text-blue-400" />
                        <h3 className="text-lg font-semibold">{t.processes}</h3>
                      </div>
                      <p className="text-gray-400">{t.processesDesc}</p>
                    </div>
                    <div
                      className={`bg-gray-800 p-4 rounded-[5px] border ${
                        selectedItem === "pessoas"
                          ? "border-purple-500"
                          : "border-gray-600"
                      } hover:border-purple-500 transition-colors cursor-pointer w-full md:w-1/3`}
                      onClick={() => setSelectedItem("pessoas")}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-8 h-8 text-purple-400" />
                        <h3 className="text-lg font-semibold">{t.people}</h3>
                      </div>
                      <p className="text-gray-400">{t.peopleDesc}</p>
                    </div>
                    <div
                      className={`bg-gray-800 p-4 rounded-[5px] border ${
                        selectedItem === "tecnologia"
                          ? "border-green-500"
                          : "border-gray-600"
                      } hover:border-green-500 transition-colors cursor-pointer w-full md:w-1/3`}
                      onClick={() => setSelectedItem("tecnologia")}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Cpu className="w-8 h-8 text-green-400" />
                        <h3 className="text-lg font-semibold">
                          {t.technology}
                        </h3>
                      </div>
                      <p className="text-gray-400">{t.technologyDesc}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="diagnostic" className="space-y-4 mt-2">
                  <AdvancedAnalysisExplanation language={language} />
                </TabsContent>

                <TabsContent value="action" className="space-y-4 mt-2">
                  <div className="bg-gray-800 p-1 rounded-lg">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-0">
                      <div className="bg-gray-900 p-3 rounded-lg flex flex-col items-center w-full md:w-1/3">
                        <div className="bg-black p-2 rounded-full mb-2">
                          <Target className="text-emerald-400 w-8 h-8" />
                        </div>
                        <h3 className="text-emerald-400 font-semibold text-lg mb-2">
                          {t.actionPlanOnly}
                        </h3>
                        <p className="text-slate-300 text-sm text-center max-w-xs">
                          {t.manageTrack}
                        </p>
                      </div>

                      {/* Setas e labels - Increased font size */}
                      <div className="flex flex-col items-center justify-center hidden md:flex w-full md:w-1/6">
                        <ArrowRightLeft className="text-emerald-400 w-5 h-5 mb-1" />
                        <span className="text-slate-400 text-base">
                          {t.continuous}
                        </span>
                        <span className="text-slate-400 text-base">
                          {t.monitoring}
                        </span>
                      </div>

                      <div className="bg-gray-900 p-3 rounded-lg flex flex-col items-center w-full md:w-1/3">
                        <div className="bg-black p-2 rounded-full mb-2">
                          <SquareActivity className="text-emerald-400 w-8 h-8" />
                        </div>
                        <h3 className="text-emerald-400 font-semibold text-lg mb-2">
                          {t.auditTool}
                        </h3>
                        <p className="text-slate-300 text-sm text-center max-w-xs">
                          {t.monitorEvaluate}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedItem || currentTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className={`bg-gray-800 p-6 rounded-[5px] border ${
                      selectedItem === "processos"
                        ? "border-blue-500"
                        : selectedItem === "pessoas"
                        ? "border-purple-500"
                        : selectedItem === "tecnologia"
                        ? "border-green-500"
                        : "border-gray-600"
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      {getIcon(selectedItem || tabToExplanationMap[currentTab])}
                      <h3 className="text-xl font-semibold text-[#00ff9d]">
                        {currentExplanation[language].title}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {currentExplanation[language].content}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Contato */}
      <div className="bg-black -mt-4">
        <ContactSection title="Fale Conosco" />
      </div>
    </div>
  );
};

export default InProcessMethodology;

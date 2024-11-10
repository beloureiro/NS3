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

// Component for creating a card with specific background and border style and fixed height
const Card = ({ children, className }) => (
  <div
    className={`bg-transparent border-gray-700 rounded-[10px] ${className}`}
    style={{ minHeight: "60px" }} // Set a minimum height to keep it consistent across tabs
  >
    {children}
  </div>
);

// Component for the content inside the card with padding
const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Context for managing tab state
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

// Component for individual tab triggers
const TabsTrigger = ({ children, value, className }) => {
  const { activeTab, setActiveTab } = React.useContext(TabContext);

  return (
    <button
      className={`${className} ${
        activeTab === value ? "bg-[#00ff9d] text-black" : ""
      } hover:bg-gray-600 hover:text-white transition-colors`}
      onClick={() => {
        if (activeTab !== value) setActiveTab(value);
      }}
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

// Advanced Analysis Explanation with adjusted padding and size adjustments
const AdvancedAnalysisExplanation = ({ language }) => {
  const t = translations[language];
  return (
    <div className="bg-slate-800 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="bg-slate-700 p-3 rounded-lg flex flex-col items-center w-full md:w-[30%]">
          <Waypoints className="text-emerald-400 mb-2" size={28} />
          <p className="text-slate-300 text-sm text-center">
            {t.processMapping}
          </p>
        </div>
        <ArrowRightLeft className="text-emerald-400 hidden md:block" size={24} />
        <div className="bg-slate-700 p-3 rounded-lg flex flex-col items-center w-full md:w-[30%]">
          <div className="flex items-center gap-4 mb-2">
            <Cpu className="text-emerald-400" size={28} />
            <Plus className="text-emerald-400" size={18} />
            <ChartNetwork className="text-emerald-400" size={28} />
          </div>
          <p className="text-slate-300 text-sm text-center">{t.aiProcessing}</p>
        </div>
        <ArrowRightLeft className="text-emerald-400 hidden md:block" size={24} />
        <div className="bg-slate-700 p-3 rounded-lg flex flex-col items-center w-full md:w-[30%]">
          <Grid2x2 className="text-emerald-400 mb-2" size={28} />
          <p className="text-slate-300 text-sm text-center">
            {t.complexityMatrix}
          </p>
        </div>
      </div>
    </div>
  );
};

// Integrated Action and Audit Explanation with adjusted dimensions
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
            {/* Fixed Header */}
            <div>
              <div className="flex items-center mb-4 space-x-4">
                <Waypoints className="w-14 h-14 text-[#00ff9d]" />
                <h1 className="text-4xl font-bold text-[#00ff9d]">{t.title}</h1>
              </div>
              <p className="text-white text-lg text-left mb-6 leading-[2]">
                Integrates{" "}
                <span className="inline-flex items-baseline">
                  <Workflow
                    className="w-5 h-5 mr-1 text-blue-400"
                    style={{ verticalAlign: "baseline" }}
                  />
                  <span>Processes</span>
                </span>
                ,{" "}
                <span className="inline-flex items-baseline">
                  <Users
                    className="w-5 h-5 mr-1 text-purple-400"
                    style={{ verticalAlign: "baseline" }}
                  />
                  <span>People</span>
                </span>
                , and{" "}
                <span className="inline-flex items-baseline">
                  <Cpu
                    className="w-5 h-5 mr-1 text-green-400"
                    style={{ verticalAlign: "baseline" }}
                  />
                  <span>Technology</span>
                </span>{" "}
                to enhance and stabilize operations, empower teams, and
                accelerate workflows.
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              <Tabs
                defaultValue="overview"
                className="space-y-4"
                onTabChange={handleTabChange}
              >
                {/* Tab navigation */}
                <div className="relative flex flex-col md:flex-row md:justify-between items-center w-full bg-gray-700 p-1 rounded-lg">
                  <TabsTrigger
                    value="overview"
                    className="relative flex items-center space-x-2 px-4 py-2 rounded-md transition-all w-full md:w-auto"
                  >
                    <Search className="w-4 h-4" />
                    <span>{t.overview}</span>
                  </TabsTrigger>

                  {/* Hidden arrows and lines on mobile */}
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

                  {/* Hidden arrows and lines on mobile */}
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

                {/* Tab content */}
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                      className={`bg-gray-700 p-4 rounded-[5px] border ${
                        selectedItem === "processos"
                          ? "border-blue-500"
                          : "border-gray-600"
                      } hover:border-blue-500 transition-colors cursor-pointer`}
                      onClick={() => setSelectedItem("processos")}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Workflow className="w-8 h-8 text-blue-400" />
                        <h3 className="text-lg font-semibold">{t.processes}</h3>
                      </div>
                      <p className="text-gray-400">{t.processesDesc}</p>
                    </div>
                    <div
                      className={`bg-gray-700 p-4 rounded-[5px] border ${
                        selectedItem === "pessoas"
                          ? "border-purple-500"
                          : "border-gray-600"
                      } hover:border-purple-500 transition-colors cursor-pointer`}
                      onClick={() => setSelectedItem("pessoas")}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-8 h-8 text-purple-400" />
                        <h3 className="text-lg font-semibold">{t.people}</h3>
                      </div>
                      <p className="text-gray-400">{t.peopleDesc}</p>
                    </div>
                    <div
                      className={`bg-gray-700 p-4 rounded-[5px] border ${
                        selectedItem === "tecnologia"
                          ? "border-green-500"
                          : "border-gray-600"
                      } hover:border-green-500 transition-colors cursor-pointer`}
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

                <TabsContent value="diagnostic" className="space-y-6">
                  <AdvancedAnalysisExplanation language={language} />
                </TabsContent>

                <TabsContent value="action" className="space-y-6">
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                      <div className="bg-slate-700 p-3 rounded-lg flex flex-col items-center w-full md:w-[35%]">
                        <div className="bg-slate-600/50 p-2 rounded-full mb-2">
                          <Target className="text-emerald-400 w-8 h-8" />
                        </div>
                        <h3 className="text-emerald-400 font-semibold text-md mb-2">
                          {t.actionPlanOnly}
                        </h3>
                        <p className="text-slate-300 text-sm text-center max-w-xs">
                          {t.manageTrack}
                        </p>
                      </div>

                      {/* Hidden arrows on mobile */}
                      <div className="flex flex-col items-center justify-center hidden md:flex">
                        <ArrowRightLeft className="text-emerald-400 w-5 h-5 mb-1" />
                        <span className="text-slate-400 text-xs">
                          {t.continuous}
                        </span>
                        <span className="text-slate-400 text-xs">
                          {t.monitoring}
                        </span>
                      </div>

                      <div className="bg-slate-700 p-3 rounded-lg flex flex-col items-center w-full md:w-[35%]">
                        <div className="bg-slate-600/50 p-2 rounded-full mb-2">
                          <SquareActivity className="text-emerald-400 w-8 h-8" />
                        </div>
                        <h3 className="text-emerald-400 font-semibold text-md mb-2">
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

              <div className="mt-6">
                <div
                  className={`bg-gray-700 p-6 rounded-[5px] border ${
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
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <div className="bg-black -mt-4">
        <ContactSection title="Contact Us" />
      </div>
    </div>
  );
};

export default InProcessMethodology;

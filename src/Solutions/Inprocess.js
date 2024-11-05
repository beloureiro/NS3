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
  // ChevronLeft, // Removed
  // Globe,        // Removed
} from "lucide-react";
// Remove logo import since it's not needed anymore
import ContactSection from "../AppComponents/ContactSection";

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

const InProcessMethodology = () => {
  const [language, setLanguage] = useState("en");
  const [selectedItem, setSelectedItem] = useState(null);

  const translations = {
    en: {
      title: "InProcess Methodology",
      subtitle: "Integrating Processes, People and Technology",
      back: "Back",
      overview: "Overview",
      diagnostic: "Diagnostic & Classification",
      actionPlan: "Action Plan & Audit",
      processes: "Processes",
      processesDesc: "Operations stabilization and standardization",
      people: "People",
      peopleDesc: "Team training and engagement",
      technology: "Technology",
      technologyDesc: "Innovative technological solutions",
      advancedAnalysis: "Advanced Analysis and Classification",
      metrics: "We use advanced metrics to classify processes:",
      actionPlanTitle: "Action Plan and Audit",
      transformationProcess:
        "Complete management of the transformation process:",
    },
    pt: {
      title: "Metodologia InProcess",
      subtitle: "Integrando Processos, Pessoas e Tecnologia",
      back: "Voltar",
      overview: "Visão Geral",
      diagnostic: "Diagnóstico & Classificação",
      actionPlan: "Plano de Ação & Auditoria",
      processes: "Processos",
      processesDesc: "Estabilização e padronização de operações",
      people: "Pessoas",
      peopleDesc: "Capacitação e engajamento de equipes",
      technology: "Tecnologia",
      technologyDesc: "Soluções tecnológicas inovadoras",
      advancedAnalysis: "Análise Avançada e Classificação",
      metrics: "Utilizamos métricas avançadas para classificar processos:",
      actionPlanTitle: "Plano de Ação e Auditoria",
      transformationProcess: "Gestão completa do processo de transformação:",
    },
  };

  const explanations = {
    default: {
      en: {
        title: "InProcess: Integrated Transformation",
        content:
          "InProcess integrates Processes, People and Technology to stabilize operations, empower teams and accelerate workflows. Focusing on creating standardized processes, an engaged team and a better customer experience, this methodology promotes more efficient service and a more productive team.",
      },
      pt: {
        title: "InProcess: Transformação Integrada",
        content:
          "InProcess integra Processos, Pessoas e Tecnologia para estabilizar operações, capacitar equipes e acelerar fluxos de trabalho. Com o foco em criar processos padronizados, uma equipe engajada e uma melhor experiência para o cliente, essa metodologia promove um atendimento mais eficiente e uma equipe mais produtiva.",
      },
      icon: <Activity className="w-8 h-8 text-blue-400" />,
    },
    diagnostico: {
      en: {
        title: "Diagnosis and Classification",
        content:
          "Understanding the client's pain, connecting it to process steps and identifying improvement points are the objectives of diagnosis. Through detailed mapping, we identify critical points that directly impact performance and customer experience. We use metrics such as Execution Complexity (ECL) and Customer Satisfaction Index (CSI) to guide specific improvements.",
      },
      pt: {
        title: "Diagnóstico e Classificação",
        content:
          "Conhecer a dor do cliente, conectá-la às etapas do processo e identificar pontos de melhoria são os objetivos do diagnóstico. A partir do mapeamento detalhado, identificamos pontos críticos que impactam diretamente o desempenho e a experiência do cliente. Utilizamos métricas como Complexidade de Execução (ECL) e Índice de Satisfação do Cliente (CSI) para orientar aprimoramentos específicos.",
      },
      icon: <Search className="w-8 h-8 text-blue-400" />,
    },
    planoAcao: {
      en: {
        title: "Action Plan and Audit",
        content:
          "After the diagnosis, an action plan is created to manage and monitor the necessary interventions. Each action is detailed with specific deadlines and updated statuses, ensuring the fulfillment of established priorities. InProcess offers an integrated audit tool to monitor the performance of adjusted processes.",
      },
      pt: {
        title: "Plano de Ação e Auditoria",
        content:
          "Após o diagnóstico, um plano de ações é criado para gerenciar e acompanhar as intervenções necessárias. Cada ação é detalhada com prazos específicos e status atualizados, garantindo o cumprimento das prioridades estabelecidas. A InProcess oferece uma ferramenta de auditoria integrada para monitorar a performance dos processos ajustados.",
      },
      icon: <ClipboardCheck className="w-8 h-8 text-green-400" />,
    },
    processos: {
      en: {
        title: "Standardized Processes",
        content:
          "We implement standardized and efficient processes that ensure consistency in operations. Through detailed analysis and continuous optimization, we establish workflows that maximize productivity and minimize errors.",
      },
      pt: {
        title: "Processos Padronizados",
        content:
          "Implementamos processos padronizados e eficientes que garantem consistência nas operações. Através de análise detalhada e otimização contínua, estabelecemos fluxos de trabalho que maximizam a produtividade e minimizam erros.",
      },
      icon: <Cpu className="w-8 h-8 text-blue-400" />,
    },
    pessoas: {
      en: {
        title: "Engaged People",
        content:
          "Focusing on people ensures that each team member is trained and motivated. We develop specific training programs and create an environment that promotes professional growth and engagement.",
      },
      pt: {
        title: "Pessoas Engajadas",
        content:
          "O foco em pessoas garante que cada membro da equipe esteja capacitado e motivado. Desenvolvemos programas de treinamento específicos e criamos um ambiente que promove o crescimento profissional e o engajamento.",
      },
      icon: <Users className="w-8 h-8 text-purple-400" />,
    },
    tecnologia: {
      en: {
        title: "Innovative Technology",
        content:
          "We use advanced technological solutions to automate processes and improve efficiency. Our approach integrates modern tools that facilitate work and increase operational accuracy.",
      },
      pt: {
        title: "Tecnologia Inovadora",
        content:
          "Utilizamos soluções tecnológicas avançadas para automatizar processos e melhorar a eficiência. Nossa abordagem integra ferramentas modernas que facilitam o trabalho e aumentam a precisão das operações.",
      },
      icon: <Activity className="w-8 h-8 text-green-400" />,
    },
    metricas: {
      en: {
        title: "Metrics and Advanced Analysis",
        content:
          "We use metrics such as Execution Complexity (ECL) and Customer Satisfaction Index (CSI) to guide specific improvements. Our analysis includes internal and external feedback, processed with artificial intelligence to identify precise improvement points.",
      },
      pt: {
        title: "Métricas e Análise Avançada",
        content:
          "Utilizamos métricas como Complexidade de Execução (ECL) e Índice de Satisfação do Cliente (CSI) para orientar aprimoramentos específicos. Nossa análise inclui feedbacks internos e externos, processados com inteligência artificial para identificar pontos de melhoria precisos.",
      },
      icon: <Search className="w-8 h-8 text-blue-400" />,
    },
    beneficios: {
      en: {
        title: "Proven Benefits",
        content:
          "The implementation of the methodology results in measurable benefits: significant reduction in operational failures, increased customer satisfaction, greater team engagement and resource optimization. It is especially effective in service companies seeking operational excellence.",
      },
      pt: {
        title: "Benefícios Comprovados",
        content:
          "A implementação da metodologia resulta em benefícios mensuráveis: redução significativa de falhas operacionais, aumento na satisfação do cliente, maior engajamento da equipe e otimização dos recursos. É especialmente eficaz em empresas de serviços que buscam excelência operacional.",
      },
      icon: <BarChart className="w-8 h-8 text-yellow-400" />,
    },
  };

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
                <Activity className="w-10 h-10 text-[#00ff9d]" />
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
                      <Cpu className="w-8 h-8 text-blue-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {t.processes}
                      </h3>
                      <p className="text-gray-400">{t.processesDesc}</p>
                    </div>
                    <div
                      className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem("pessoas")}
                    >
                      <Users className="w-8 h-8 text-purple-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">{t.people}</h3>
                      <p className="text-gray-400">{t.peopleDesc}</p>
                    </div>
                    <div
                      className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-green-500 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem("tecnologia")}
                    >
                      <Activity className="w-8 h-8 text-green-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {t.technology}
                      </h3>
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

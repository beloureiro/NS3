import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Users, Cpu, Search, ClipboardCheck, BarChart, ChevronLeft, Globe } from 'lucide-react';

// Código do componente Card
const Card = ({ children, className }) => (
  <div className={`bg-gray-800 border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Código do componente Tabs
const Tabs = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

const TabsTrigger = ({ children, value, activeTab, setActiveTab, className }) => (
  <button
    className={`${className} ${activeTab === value ? 'data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black' : ''}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab, className }) => (
  activeTab === value ? <div className={className}>{children}</div> : null
);

const InProcess = () => {
  const [language, setLanguage] = useState('en');
  const [selectedItem, setSelectedItem] = useState(null);

  const content = {
    en: {
      title: "InProcess Methodology",
      back: "Back",
      overview: "Overview",
      diagnostic: "Diagnostic",
      actionPlan: "Action Plan",
      processes: "Processes",
      people: "People",
      technology: "Technology",
      subtitle: "Integrating Processes, People and Technology",
      explanations: {
        default: {
          title: "InProcess: Integrated Transformation",
          content: "InProcess Methodology integrates Processes, People and Technology to stabilize operations, empower teams and accelerate workflows. By focusing on creating standardized processes, an engaged team and better customer experience, this methodology promotes more efficient service and a more productive team.",
          icon: <Activity className="w-8 h-8 text-[#00ff9d]" />
        },
        processes: {
          title: "Standardized Processes",
          content: "We implement standardized and efficient processes that ensure consistency in operations. Through detailed analysis and continuous optimization, we establish workflows that maximize productivity and minimize errors.",
          icon: <Cpu className="w-8 h-8 text-[#00ff9d]" />
        },
        people: {
          title: "Engaged People",
          content: "Focus on people ensures that each team member is empowered and motivated. We develop specific training programs and create an environment that promotes professional growth and engagement.",
          icon: <Users className="w-8 h-8 text-[#00ff9d]" />
        },
        technology: {
          title: "Innovative Technology",
          content: "We use advanced technological solutions to automate processes and improve efficiency. Our approach integrates modern tools that facilitate work and increase operational accuracy.",
          icon: <Activity className="w-8 h-8 text-[#00ff9d]" />
        },
        metrics: {
          title: "Metrics and Advanced Analysis",
          content: "We use metrics such as Execution Complexity (ECL) and Customer Satisfaction Index (CSI) to guide specific improvements. Our analysis includes internal and external feedback, processed with artificial intelligence to identify precise improvement points.",
          icon: <Search className="w-8 h-8 text-[#00ff9d]" />
        },
        benefits: {
          title: "Proven Benefits",
          content: "The methodology implementation results in measurable benefits: significant reduction in operational failures, increased customer satisfaction, greater team engagement and resource optimization. It is especially effective in service companies seeking operational excellence.",
          icon: <BarChart className="w-8 h-8 text-[#00ff9d]" />
        }
      }
    },
    pt: {
      title: "Metodologia InProcess",
      back: "Voltar",
      overview: "Visão Geral",
      diagnostic: "Diagnóstico",
      actionPlan: "Plano de Ação",
      processes: "Processos",
      people: "Pessoas",
      technology: "Tecnologia",
      explanations: {
        default: {
          title: "InProcess: Transformação Integrada",
          content: "A Metodologia InProcess integra Processos, Pessoas e Tecnologia para estabilizar operações...",
          icon: <Activity className="w-8 h-8 text-[#00ff9d]" />
        },
        processes: {
          title: "Processos Padronizados",
          content: "Implementamos processos padronizados e eficientes que garantem consistência nas operações...",
          icon: <Cpu className="w-8 h-8 text-[#00ff9d]" />
        },
        // ... resto das explicações em português ...
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="text-[#00ff9d] hover:underline flex items-center">
            <ChevronLeft className="mr-2" /> {t.back}
          </Link>
          <button
            onClick={() => setLanguage(lang => lang === 'en' ? 'pt' : 'en')}
            className="flex items-center bg-gray-800 px-3 py-2 rounded"
          >
            <Globe className="mr-2" /> {language.toUpperCase()}
          </button>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            {/* Header Section */}
            <div className="flex items-center space-x-4 mb-8">
              <Activity className="w-10 h-10 text-[#00ff9d]" />
              <div>
                <h1 className="text-3xl font-bold text-[#00ff9d]">
                  {t.title}
                </h1>
                <p className="text-gray-400">{t.subtitle}</p>
              </div>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid grid-cols-3 gap-4 bg-gray-700 p-1">
                <TabsTrigger value="overview" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4" />
                    <span>{t.overview}</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="diagnostic" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
                  <div className="flex items-center space-x-2">
                    <ClipboardCheck className="w-4 h-4" />
                    <span>{t.diagnostic}</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="action" className="data-[state=active]:bg-[#00ff9d] data-[state=active]:text-black">
                  <div className="flex items-center space-x-2">
                    <BarChart className="w-4 h-4" />
                    <span>{t.actionPlan}</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-3 gap-6">
                  <div 
                    className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-[#00ff9d] transition-colors cursor-pointer"
                    onClick={() => setSelectedItem('processes')}
                  >
                    <Cpu className="w-8 h-8 text-[#00ff9d] mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{t.processes}</h3>
                    <p className="text-gray-400">Estabilização e padronização de operações</p>
                  </div>
                  {/* ... outros cards ... */}
                </div>
              </TabsContent>

              {/* ... outros TabsContent ... */}
            </Tabs>

            {/* Explanation Section */}
            <div className="mt-8">
              <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
                <div className="flex items-center space-x-4 mb-4">
                  {(t.explanations[selectedItem] || t.explanations.default).icon}
                  <h3 className="text-xl font-semibold text-[#00ff9d]">
                    {(t.explanations[selectedItem] || t.explanations.default).title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {(t.explanations[selectedItem] || t.explanations.default).content}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InProcess;

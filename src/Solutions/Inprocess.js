import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Users, Cpu, Search, ClipboardCheck, BarChart, ChevronLeft, Globe } from 'lucide-react';

// Componentes auxiliares
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

const TabContext = React.createContext();

const Tabs = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabContext.Provider>
  );
};

const TabsList = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

const TabsTrigger = ({ children, value, className }) => {
  const { activeTab, setActiveTab } = React.useContext(TabContext);
  
  return (
    <button
      className={`${className} ${activeTab === value ? 'bg-[#00ff9d] text-black' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ children, value, className }) => {
  const { activeTab } = React.useContext(TabContext);
  return activeTab === value ? <div className={className}>{children}</div> : null;
};

const InProcessMethodology = () => {
  const [language, setLanguage] = useState('en');
  const [selectedItem, setSelectedItem] = useState(null);

  const explanations = {
    default: {
      title: "InProcess: Transformação Integrada",
      content: "A Metodologia InProcess integra Processos, Pessoas e Tecnologia para estabilizar operações, capacitar equipes e acelerar fluxos de trabalho. Com o foco em criar processos padronizados, uma equipe engajada e uma melhor experiência para o cliente, essa metodologia promove um atendimento mais eficiente e uma equipe mais produtiva.",
      icon: <Activity className="w-8 h-8 text-blue-400" />
    },
    processos: {
      title: "Processos Padronizados",
      content: "Implementamos processos padronizados e eficientes que garantem consistência nas operações. Através de análise detalhada e otimização contínua, estabelecemos fluxos de trabalho que maximizam a produtividade e minimizam erros.",
      icon: <Cpu className="w-8 h-8 text-blue-400" />
    },
    pessoas: {
      title: "Pessoas Engajadas",
      content: "O foco em pessoas garante que cada membro da equipe esteja capacitado e motivado. Desenvolvemos programas de treinamento específicos e criamos um ambiente que promove o crescimento profissional e o engajamento.",
      icon: <Users className="w-8 h-8 text-purple-400" />
    },
    tecnologia: {
      title: "Tecnologia Inovadora",
      content: "Utilizamos soluções tecnológicas avançadas para automatizar processos e melhorar a eficiência. Nossa abordagem integra ferramentas modernas que facilitam o trabalho e aumentam a precisão das operações.",
      icon: <Activity className="w-8 h-8 text-green-400" />
    },
    metricas: {
      title: "Métricas e Análise Avançada",
      content: "Utilizamos métricas como Complexidade de Execução (ECL) e Índice de Satisfação do Cliente (CSI) para orientar aprimoramentos específicos. Nossa análise inclui feedbacks internos e externos, processados com inteligência artificial para identificar pontos de melhoria precisos.",
      icon: <Search className="w-8 h-8 text-blue-400" />
    },
    beneficios: {
      title: "Benefícios Comprovados",
      content: "A implementação da metodologia resulta em benefícios mensuráveis: redução significativa de falhas operacionais, aumento na satisfação do cliente, maior engajamento da equipe e otimização dos recursos. É especialmente eficaz em empresas de serviços que buscam excelência operacional.",
      icon: <BarChart className="w-8 h-8 text-yellow-400" />
    }
  };

  const t = language === 'en' ? {
    title: "InProcess Methodology",
    back: "Back",
    overview: "Overview",
    diagnostic: "Diagnostic",
    actionPlan: "Action Plan",
  } : {
    title: "Metodologia InProcess",
    back: "Voltar",
    overview: "Visão Geral",
    diagnostic: "Diagnóstico",
    actionPlan: "Plano de Ação",
  };

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
            <div className="flex items-center space-x-4 mb-8">
              <Activity className="w-10 h-10 text-[#00ff9d]" />
              <div>
                <h1 className="text-3xl font-bold text-[#00ff9d]">
                  {t.title}
                </h1>
                <p className="text-gray-400">Integrando Processos, Pessoas e Tecnologia</p>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid grid-cols-3 gap-4 bg-gray-700 p-1">
                <TabsTrigger value="overview" className="bg-gray-700 text-white p-2 rounded">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4" />
                    <span>{t.overview}</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="diagnostic" className="bg-gray-700 text-white p-2 rounded">
                  <div className="flex items-center space-x-2">
                    <ClipboardCheck className="w-4 h-4" />
                    <span>{t.diagnostic}</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="action" className="bg-gray-700 text-white p-2 rounded">
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
                    onClick={() => setSelectedItem('processos')}
                  >
                    <Cpu className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Processos</h3>
                    <p className="text-gray-400">Estabilização e padronização de operações</p>
                  </div>
                  <div 
                    className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer"
                    onClick={() => setSelectedItem('pessoas')}
                  >
                    <Users className="w-8 h-8 text-purple-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Pessoas</h3>
                    <p className="text-gray-400">Capacitação e engajamento de equipes</p>
                  </div>
                  <div 
                    className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-green-500 transition-colors cursor-pointer"
                    onClick={() => setSelectedItem('tecnologia')}
                  >
                    <Activity className="w-8 h-8 text-green-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Tecnologia</h3>
                    <p className="text-gray-400">Soluções tecnológicas inovadoras</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="diagnostic" className="space-y-6">
                <div 
                  className="bg-gray-700 p-6 rounded-lg border border-gray-600 cursor-pointer"
                  onClick={() => setSelectedItem('metricas')}
                >
                  <h3 className="text-xl font-semibold mb-4">Análise Avançada</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Complexidade de Execução (ECL)</li>
                    <li>Índice de Satisfação do Cliente (CSI)</li>
                    <li>Análise de Feedback com IA</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="action" className="space-y-6">
                <div 
                  className="bg-gray-700 p-6 rounded-lg border border-gray-600 cursor-pointer"
                  onClick={() => setSelectedItem('beneficios')}
                >
                  <h3 className="text-xl font-semibold mb-4">Benefícios Comprovados</h3>
                  <ul className="grid grid-cols-2 gap-4 text-gray-400">
                    <li>Redução de falhas</li>
                    <li>Maior satisfação</li>
                    <li>Equipe engajada</li>
                    <li>Maior agilidade</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
                <div className="flex items-center space-x-4 mb-4">
                  {(explanations[selectedItem] || explanations.default).icon}
                  <h3 className="text-xl font-semibold text-[#00ff9d]">
                    {(explanations[selectedItem] || explanations.default).title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {(explanations[selectedItem] || explanations.default).content}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InProcessMethodology;
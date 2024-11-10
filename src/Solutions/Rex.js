import React, { useState } from 'react';
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
  TrendingUp 
} from 'lucide-react';

const REXPresentation = () => {
  // State to track the selected feature card
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Array of feature objects with icons, titles, descriptions, and details
  const features = [
    {
      id: 1,
      title: "Hub de Oportunidades",
      icon: <Home className="w-5 h-5 text-[#ffff08]" />,
      description: "Centralização de leads com brainstorming, tarefas e progresso monitorado.",
      details: [
        "Avaliação preliminar de leads promissores",
        "Espaço para brainstorming e atribuição de tarefas",
        "Associação de produtos existentes",
        "Monitoramento de progresso"
      ]
    },
    {
      id: 2,
      title: "Precificação de Imóveis",
      icon: <DollarSign className="w-5 h-5 text-[#ffff08]" />,
      description: "Sistema avançado para avaliação de preços com múltiplas metodologias.",
      details: [
        "Precificação Linear: Comparação com média regional",
        "Precificação Ajustada: Fatores específicos do imóvel",
        "Custo de Reposição: Avaliação de reconstrução"
      ]
    },
    {
      id: 3,
      title: "Simulador de Comissão",
      icon: <TrendingUp className="w-5 h-5 text-[#ffff08]" />,
      description: "Simule ganhos potenciais e entenda comissões e estrutura de venda.",
      details: [
        "Compra/Venda: Diferenciação de comissão",
        "Arrendamento: Detalhes específicos",
        "GainSimulator: Simulação personalizada de ganhos"
      ]
    },
    {
      id: 4,
      title: "Rex News",
      icon: <Newspaper className="w-5 h-5 text-[#ffff08]" />,
      description: "Notícias e atualizações do setor, com relatórios anuais para consulta.",
      details: [
        "Acesso a notícias selecionadas",
        "Relatórios de mercado anuais",
        "Atualizações mensais",
        "Notícias de grande impacto"
      ]
    },
    {
      id: 5,
      title: "Agenda de Contatos",
      icon: <Calendar className="w-5 h-5 text-[#ffff08]" />,
      description: "Gestão de clientes completa com documentação e histórico detalhado.",
      details: [
        "Anexo de documentos ao perfil",
        "Lembretes para interações futuras",
        "Histórico de produtos consumidos",
        "Chamadas com um clique",
        "Gestão de contratos - KYC"
      ]
    },
    {
      id: 6,
      title: "Gestão do Conhecimento",
      icon: <BookOpen className="w-5 h-5 text-[#ffff08]" />,
      description: "Repositório completo de manuais e vídeos para capacitação contínua.",
      details: [
        "Manuais de procedimentos",
        "Vídeos instrucionais",
        "Padrões de atendimento",
        "Atualizações regulares"
      ]
    },
    {
      id: 7,
      title: "Performance com NPS",
      icon: <Users className="w-5 h-5 text-[#ffff08]" />,
      description: "Análise estratégica com feedback de clientes e corretores.",
      details: [
        "Broker Survey: Feedback do corretor",
        "Customer Feedback: Percepção do cliente",
        "Net Promoter Score (NPS)",
        "Relatório de performance detalhado"
      ]
    },
    {
      id: 8,
      title: "Dashboard",
      icon: <BarChart2 className="w-5 h-5 text-[#ffff08]" />,
      description: "Monitore dados em tempo real com gráficos e alertas inteligentes.",
      details: [
        "Gráficos dinâmicos atualizados",
        "Status de transações",
        "Alertas inteligentes",
        "Métricas principais"
      ]
    },
    {
      id: 9,
      title: "Macroprocessos",
      icon: <Layers className="w-5 h-5 text-[#ffff08]" />,
      description: "Visualização da cadeia de valor com modelagem e fluxos de trabalho.",
      details: [
        "Modelagem BPMN",
        "Infográficos e diagramas",
        "Fluxos de trabalho",
        "Iniciação de processos"
      ]
    },
    {
      id: 10,
      title: "Ciclos de Melhoria",
      icon: <RefreshCw className="w-5 h-5 text-[#ffff08]" />,
      description: "Ciclos de melhoria contínua com reflexão e revisão para avanço.",
      details: [
        "Refletir: Compartilhar perspectivas",
        "Revisar: Identificar oportunidades",
        "Reinventar: Definir soluções",
        "Documentação de evolução"
      ]
    },
    {
      id: 11,
      title: "Sistema Centralizado",
      icon: <Database className="w-5 h-5 text-[#ffff08]" />,
      description: "Backend centralizado com segurança robusta e backups regulares.",
      details: [
        "Centralização de dados",
        "Segurança avançada",
        "Backups automáticos",
        "Bases integradas"
      ]
    },
    {
      id: 12,
      title: "Suporte",
      icon: <MessageSquare className="w-5 h-5 text-[#ffff08]" />,
      description: "Suporte dedicado com gestão de chamados e acompanhamento claro.",
      details: [
        "Acesso rápido via 'Need Help?'",
        "Gestão de chamados",
        "Atendimentos online",
        "Acompanhamento transparente"
      ]
    }
  ];

  return (
    <div className="bg-gray-900 p-4">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          {/* Header Icon and Title - adjust styling and icon size here */}
          <Home className="w-8 h-8 text-[#ffff08]" />
          <h1 className="text-3xl font-bold text-[#ffff08]">REX</h1>
        </div>
        {/* Header Subtitle */}
        <p className="text-lg text-gray-400">
          Real Estate Experience: Uma solução de gestão inovadora para agências e corretores de imóveis
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div 
            key={feature.id}
            // Card container - adjust borders, colors, and hover effects here
            className={`bg-gray-800 rounded-lg border border-gray-700 cursor-pointer transition-all duration-200 hover:border-[#ffff08] ${
              selectedFeature?.id === feature.id ? 'ring-1 ring-[#ffff08]' : ''
            }`}
            onClick={() => setSelectedFeature(feature)} // Update selected feature when clicked
          >
            <div className="p-4 flex items-center justify-center gap-2">
              {/* Card Icon and Title - adjust icon and text alignment here */}
              {feature.icon}
              <h3 className="text-sm font-semibold text-white truncate">{feature.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Feature Details */}
      {selectedFeature && (
        <div className="max-w-6xl mx-auto mt-8">
          <div className="rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                {/* Icon and Title of Selected Feature - adjust color, size, or alignment */}
                {selectedFeature.icon}
                <h3 className="text-xl font-semibold text-[#ffff08]">{selectedFeature.title}</h3>
              </div>
              {/* Description of Selected Feature */}
              <p className="text-sm text-gray-400 mb-4">{selectedFeature.description}</p>
              <div className="grid grid-cols-2 gap-4">
                {selectedFeature.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {/* Bullet Point Icon - adjust size, color, or alignment */}
                    <ChevronRight className="w-4 h-4 text-[#ffff08] mt-1 flex-shrink-0" />
                    {/* Bullet Point Text - adjust text size or color */}
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

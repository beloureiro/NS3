import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  QrCode, 
  Smartphone, 
  Bell, 
  ArrowRight, 
  ChefHat,
  BarChart,
  Calendar,
  DollarSign,
  ClipboardList,
  ChevronLeft
} from 'lucide-react';

const FlowCard = ({ icon: Icon, title, description, color = "emerald", isSelected, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-slate-800/80 p-3 rounded-lg w-32 cursor-pointer transition-all
      ${isSelected ? `border-2 border-${color}-400` : 'border border-slate-700'}
      hover:bg-slate-700/80`}
  >
    <div className="flex flex-col items-center text-center gap-2">
      <div className={`bg-${color}-400/10 p-2 rounded-lg`}>
        <Icon className={`text-${color}-400 w-5 h-5`} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="text-[10px] text-slate-400">{description}</p>
      </div>
    </div>
  </div>
);

const ArrowConnection = ({ label }) => (
  <div className="flex flex-col items-center justify-center w-8">
    <div className="h-0.5 w-full bg-slate-700 mb-1" />
    <ArrowRight className="text-slate-600 w-3 h-3" />
    <span className="text-[9px] text-slate-600 mt-1">{label}</span>
  </div>
);

const DetailPanel = ({ selectedItem }) => {
  const details = {
    site: {
      title: "Site & Reservas",
      color: "blue",
      icon: Globe,
      features: [
        "Menu digital personalizado",
        "Sistema de reservas online",
        "Atualizações em tempo real",
        "Interface responsiva",
        "Integração com redes sociais"
      ]
    },
    qrcode: {
      title: "QR Code Mesas",
      color: "blue",
      icon: QrCode,
      features: [
        "Adesivos personalizados",
        "Menu multilíngue",
        "Fotos e descrições",
        "Cardápio digital interativo",
        "Atualização instantânea"
      ]
    },
    app: {
      title: "App Gerencial",
      color: "purple",
      icon: Smartphone,
      features: [
        "Atualização dinâmica",
        "Promoções em tempo real",
        "Gestão de estoque",
        "Controle de vendas",
        "Dashboard móvel"
      ]
    },
    alerts: {
      title: "Sistema de Alertas",
      color: "purple",
      icon: Bell,
      features: [
        "Novas reservas",
        "Alertas de estoque",
        "Mensagens da equipe",
        "Notificações personalizadas",
        "Monitoramento em tempo real"
      ]
    },
    tips: {
      title: "Gestão de Gorjetas",
      color: "purple",
      icon: DollarSign,
      features: [
        "Dashboard individual",
        "Distribuição automática",
        "Histórico completo",
        "Relatórios detalhados",
        "Transparência total"
      ]
    }
  };

  const detail = details[selectedItem];
  if (!detail) return null;

  const Icon = detail.icon;

  return (
    <div className="mt-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <div className={`bg-${detail.color}-400/10 p-2 rounded-lg`}>
          <Icon className={`text-${detail.color}-400 w-5 h-5`} />
        </div>
        <h3 className="text-lg font-medium text-white">{detail.title}</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {detail.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full bg-${detail.color}-400`} />
            <span className="text-sm text-slate-300">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FourMenu = () => {
  const [language, setLanguage] = useState('en');
  const [selectedItem, setSelectedItem] = useState('site');

  const content = {
    en: {
      back: "Back",
    },
    pt: {
      back: "Voltar",
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button and language toggle */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="text-[#FF6B6B] hover:underline flex items-center">
            <ChevronLeft className="mr-2" /> {t.back}
          </Link>
          <button
            onClick={() => setLanguage(lang => lang === 'en' ? 'pt' : 'en')}
            className="flex items-center bg-gray-800 px-3 py-2 rounded"
          >
            <Globe className="mr-2" /> {language.toUpperCase()}
          </button>
        </div>

        {/* Process Flow Content */}
        <div className="bg-slate-900 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#FF6B6B] flex items-center gap-2">
                <ChefHat className="text-[#FF6B6B] w-5 h-5" />
                4menu.today - Sistema Integrado
              </h2>
              <p className="text-xs text-slate-400">Gestão simplificada para seu estabelecimento</p>
            </div>
            <div className="flex gap-6">
              <span className="text-xs text-slate-400 flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-400 mr-2" />
                Interface Cliente
              </span>
              <span className="text-xs text-slate-400 flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-400 mr-2" />
                Gestão Mobile
              </span>
              <span className="text-xs text-slate-400 flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2" />
                Controle Gerencial
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <FlowCard
              icon={Globe}
              title="Site & Reservas"
              description="Sistema integrado"
              color="blue"
              isSelected={selectedItem === 'site'}
              onClick={() => setSelectedItem('site')}
            />
            <ArrowConnection label="Integra" />
            <FlowCard
              icon={QrCode}
              title="QR Code Mesas"
              description="Acesso ao cardápio"
              color="blue"
              isSelected={selectedItem === 'qrcode'}
              onClick={() => setSelectedItem('qrcode')}
            />
            <ArrowConnection label="Conecta" />
            <FlowCard
              icon={Smartphone}
              title="App Gerencial"
              description="Controle total"
              color="purple"
              isSelected={selectedItem === 'app'}
              onClick={() => setSelectedItem('app')}
            />
            <ArrowConnection label="Notifica" />
            <FlowCard
              icon={Bell}
              title="Alertas"
              description="Comunicação real"
              color="purple"
              isSelected={selectedItem === 'alerts'}
              onClick={() => setSelectedItem('alerts')}
            />
            <ArrowConnection label="Gerencia" />
            <FlowCard
              icon={DollarSign}
              title="Gorjetas"
              description="Gestão transparente"
              color="purple"
              isSelected={selectedItem === 'tips'}
              onClick={() => setSelectedItem('tips')}
            />
          </div>

          <DetailPanel selectedItem={selectedItem} />

          <div className="mt-6 grid grid-cols-3 gap-4 bg-slate-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-400/10 p-2 rounded-lg">
                <ClipboardList className="text-emerald-400 w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-emerald-400">Gestão Financeira</h3>
                <p className="text-[10px] text-slate-400">Fluxo de caixa, custos e precificação</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-400/10 p-2 rounded-lg">
                <BarChart className="text-emerald-400 w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-emerald-400">Analytics</h3>
                <p className="text-[10px] text-slate-400">Vendas, demanda e performance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-400/10 p-2 rounded-lg">
                <Calendar className="text-emerald-400 w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-emerald-400">Gestão de Equipe</h3>
                <p className="text-[10px] text-slate-400">Escalas, extras e capacitação</p>
              </div>
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-slate-400">
            Maximize a lucratividade com gestão antecipada. Prepare-se para todas as temporadas.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourMenu; 
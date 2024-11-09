import React, { useState } from 'react';
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
  ClipboardList
} from 'lucide-react';
import ContactSection from '../AppComponents/ContactSection';
import { menuTranslations } from './4menuLanguage';

const FlowCard = ({ icon: Icon, title, color = "emerald", isSelected, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-slate-800/80 p-4 rounded-lg w-36 cursor-pointer transition-all
      ${isSelected ? `border-2 border-${color}-400` : 'border border-slate-700'}
      hover:bg-slate-700/80`}
  >
    <div className="flex flex-col items-center text-center gap-3">
      <div className={`bg-${color}-400/10 p-3 rounded-lg`}>
        <Icon className={`text-${color}-400 w-6 h-6`} />
      </div>
      <div>
        <h3 className="text-base font-medium text-white">{title}</h3>
      </div>
    </div>
  </div>
);

const ArrowConnection = ({ label }) => (
  <div className="flex flex-col items-center justify-center w-10">
    <div className="h-0.5 w-full bg-slate-700 mb-1" />
    <ArrowRight className="text-slate-600 w-4 h-4" />
    <span className="text-[10px] text-slate-600 mt-1">{label}</span>
  </div>
);

const DetailPanel = ({ selectedItem, t }) => {
  const details = {
    site: {
      title: t.siteCard.title,
      color: "blue",
      icon: Globe,
      features: t.siteCard.features
    },
    qrcode: {
      title: t.qrcodeCard.title,
      color: "blue",
      icon: QrCode,
      features: t.qrcodeCard.features
    },
    app: {
      title: t.appCard.title,
      color: "purple",
      icon: Smartphone,
      features: t.appCard.features
    },
    alerts: {
      title: t.alertsCard.title,
      color: "purple",
      icon: Bell,
      features: t.alertsCard.features
    },
    tips: {
      title: t.tipsCard.title,
      color: "purple",
      icon: DollarSign,
      features: t.tipsCard.features
    }
  };

  const detail = details[selectedItem];
  if (!detail) return null;

  const Icon = detail.icon;

  return (
    <div className="mt-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
      <div className="flex items-center gap-4 mb-6">
        <div className={`bg-${detail.color}-400/10 p-3 rounded-lg`}>
          <Icon className={`text-${detail.color}-400 w-6 h-6`} />
        </div>
        <h3 className="text-xl font-medium text-white">{detail.title}</h3>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {detail.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full bg-${detail.color}-400`} />
            <span className="text-base text-slate-300">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FourMenu = ({ language = 'en' }) => {
  const [selectedItem, setSelectedItem] = useState('site');
  const t = menuTranslations[language] || menuTranslations.en;

  return (
    <div className="bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#FF6B6B] flex items-center gap-3">
                <ChefHat className="text-[#00ff9d] w-8 h-8" />
                4menu.today
              </h2>
              <p className="text-base text-slate-400">{t.subtitle}</p>
            </div>
            <div className="flex gap-8">
              <span className="text-sm text-slate-400 flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-400 mr-2" />
                {t.clientInterface}
              </span>
              <span className="text-sm text-slate-400 flex items-center">
                <div className="w-4 h-4 rounded-full bg-purple-400 mr-2" />
                {t.mobileManagement}
              </span>
              <span className="text-sm text-slate-400 flex items-center">
                <div className="w-4 h-4 rounded-full bg-emerald-400 mr-2" />
                {t.managerialControl}
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mb-4">
            <FlowCard
              icon={Globe}
              title={t.siteCard.title}
              color="blue"
              isSelected={selectedItem === 'site'}
              onClick={() => setSelectedItem('site')}
            />
            <ArrowConnection label={t.integrates} />
            <FlowCard
              icon={QrCode}
              title={t.qrcodeCard.title}
              color="blue"
              isSelected={selectedItem === 'qrcode'}
              onClick={() => setSelectedItem('qrcode')}
            />
            <ArrowConnection label={t.connects} />
            <FlowCard
              icon={Smartphone}
              title={t.appCard.title}
              color="purple"
              isSelected={selectedItem === 'app'}
              onClick={() => setSelectedItem('app')}
            />
            <ArrowConnection label={t.notifies} />
            <FlowCard
              icon={Bell}
              title={t.alertsCard.title}
              color="purple"
              isSelected={selectedItem === 'alerts'}
              onClick={() => setSelectedItem('alerts')}
            />
            <ArrowConnection label={t.manages} />
            <FlowCard
              icon={DollarSign}
              title={t.tipsCard.title}
              color="purple"
              isSelected={selectedItem === 'tips'}
              onClick={() => setSelectedItem('tips')}
            />
          </div>

          <DetailPanel selectedItem={selectedItem} t={t} />

          <div className="mt-6 grid grid-cols-3 gap-6 bg-slate-800/50 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-400/10 p-3 rounded-lg">
                <ClipboardList className="text-emerald-400 w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-medium text-emerald-400">{t.financialManagement.title}</h3>
                <p className="text-xs text-slate-400">{t.financialManagement.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-emerald-400/10 p-3 rounded-lg">
                <BarChart className="text-emerald-400 w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-medium text-emerald-400">{t.analytics.title}</h3>
                <p className="text-xs text-slate-400">{t.analytics.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-emerald-400/10 p-3 rounded-lg">
                <Calendar className="text-emerald-400 w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-medium text-emerald-400">{t.teamManagement.title}</h3>
                <p className="text-xs text-slate-400">{t.teamManagement.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-3 text-center text-sm text-slate-400">
            {t.footer}
          </div>
        </div>
        
        <div className="mt-8 mb-2">
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default FourMenu; 
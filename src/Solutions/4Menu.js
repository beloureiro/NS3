import React, { useState } from 'react'; // Core React imports
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
} from 'lucide-react'; // Icon imports, can be swapped or updated with additional icons as needed
import ContactSection from '../AppComponents/ContactSection'; // Custom component; modify if adding new contact methods
import { menuTranslations } from './4menuLanguage'; // Translations; add new languages or adjust text here

// Individual menu item card component
const FlowCard = ({ icon: Icon, title, color, isSelected, onClick }) => {
  // Define a cor específica para cada card baseado na prop color
  const borderColor = {
    blue: "border-blue-400",
    purple: "border-purple-400",
    emerald: "border-emerald-400"
  }[color];

  return (
    <div 
      onClick={onClick}
      className={`bg-slate-800/80 p-4 rounded-lg cursor-pointer transition-all
        ${isSelected ? `border-2 ${borderColor}` : 'border border-slate-700'}
        hover:border-2 ${borderColor} flex flex-col justify-center items-center
        w-32 h-36 sm:w-36 sm:h-40 md:w-40 md:h-44`} // Responsivo: ajusta largura e altura
    >
      <div className="flex flex-col items-center text-center gap-2">
        <div className={`bg-${color}-400/10 p-3 rounded-lg`}>
          <Icon className={`text-${color}-400 w-6 h-6 md:w-8 md:h-8`} /> {/* Responsivo: ajusta tamanho do ícone */}
        </div>
        <div>
          <h3 className="text-base md:text-lg font-medium text-white">{title}</h3> {/* Responsivo: ajusta tamanho do texto */}
        </div>
      </div>
    </div>
  );
};

// Component for displaying connecting arrows between FlowCards
const ArrowConnection = ({ label }) => (
  <div className="flex flex-col items-center justify-center w-10 md:w-12"> {/* Responsivo: ajusta largura */}
    <div className="h-0.5 w-full bg-[#FF6B6B] mb-1" /> {/* Line style; change width, color, or spacing */}
    <ArrowRight className="text-[#FF6B6B] w-6 h-6 md:w-8 md:h-8" /> {/* Responsivo: ajusta tamanho do ícone */}
    <span className="text-sm md:text-base text-[#FF6B6B] mt-1">{label}</span> {/* Responsivo: ajusta tamanho do texto */}
  </div>
);

// Panel to show details and features of each selected item
const DetailPanel = ({ selectedItem, t }) => {
  // Detail object with properties for each menu item; add or modify items here
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

  const detail = details[selectedItem]; // Get details for the currently selected item
  if (!detail) return null; // Return null if no item is selected

  const Icon = detail.icon; // Dynamically assign the icon component

  return (
    <div className="mt-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
      <div className="flex items-center gap-4 mb-6">
        <div className={`bg-${detail.color}-400/10 p-3 rounded-lg`}>
          <Icon className={`text-${detail.color}-400 w-6 h-6 md:w-8 md:h-8`} /> {/* Responsivo: ajusta tamanho do ícone */}
        </div>
        <h3 className="text-2xl md:text-3xl font-medium text-white">{detail.title}</h3> {/* Responsivo: ajusta tamanho do texto */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {/* Responsivo: ajusta número de colunas */}
        {detail.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full bg-${detail.color}-400`} />
            <span className="text-lg text-slate-300">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component for the menu display
const FourMenu = ({ language = 'en' }) => {
  const [selectedItem, setSelectedItem] = useState('site'); // State for selected item; adjust default selection if needed
  const t = menuTranslations[language] || menuTranslations.en; // Translation based on language prop

  return (
    <div className="bg-black text-white pt-0 px-6 pb-6 -mt-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-transparent p-6 rounded-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6"> {/* Responsivo: ajusta direção e alinhamento */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FF6B6B] flex items-center gap-3">
                <ChefHat className="text-[#00ff9d] w-12 h-12 md:w-14 md:h-14" /> {/* Responsivo: ajusta tamanho do ícone */}
                4menu.today
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white">{t.subtitle}</p> {/* Responsivo: ajusta tamanho do texto */}
            </div>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0"> {/* Responsivo: permite quebra de linha */}
              <span className="text-base text-slate-400 flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-400 mr-2" />
                {t.clientInterface}
              </span>
              <span className="text-base text-slate-400 flex items-center">
                <div className="w-4 h-4 rounded-full bg-purple-400 mr-2" />
                {t.mobileManagement}
              </span>
              <span className="text-base text-slate-400 flex items-center">
                <div className="w-4 h-4 rounded-full bg-emerald-400 mr-2" />
                {t.managerialControl}
              </span>
            </div>
          </div>

          {/* Menu flow with clickable cards - adjusted sizes */}
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-3"> {/* Reduced gap from 4 to 3 */}
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

          {/* Detailed panel - adjusted grid */}
          <DetailPanel selectedItem={selectedItem} t={t} />

          {/* Additional management sections - adjusted grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-slate-800/50 p-5 rounded-lg"> {/* Reduced gap and padding */}
            <div className="flex items-center gap-4">
              <div className="bg-emerald-400/10 p-3 rounded-lg">
                <ClipboardList className="text-emerald-400 w-8 h-8 md:w-10 md:h-10" /> {/* Responsivo: ajusta tamanho do ícone */}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-emerald-400">{t.financialManagement.title}</h3> {/* Responsivo: ajusta tamanho do texto */}
                <p className="text-base text-white">{t.financialManagement.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-emerald-400/10 p-3 rounded-lg">
                <BarChart className="text-emerald-400 w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-emerald-400">{t.analytics.title}</h3>
                <p className="text-base text-white">{t.analytics.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-emerald-400/10 p-3 rounded-lg">
                <Calendar className="text-emerald-400 w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-emerald-400">{t.teamManagement.title}</h3>
                <p className="text-base text-white">{t.teamManagement.description}</p>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <div className="mb-1 mt-1 text-center text-lg text-white">
            {t.footer}
          </div>
        </div>
        
        {/* Contact section */}
        <div className="mt-0 mb-2">
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default FourMenu; // Exporting the main component for use in other parts of the app

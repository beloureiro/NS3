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
import { motion, AnimatePresence } from 'framer-motion'; // Add this import at the top with other imports

// Individual menu item card component
const FlowCard = ({ icon: Icon, title, color, isSelected, onClick, onMouseEnter, onMouseLeave }) => {
  // Define a specific color for each card based on the 'color' prop
  const borderColor = {
    blue: "border-blue-400",
    purple: "border-purple-400",
    emerald: "border-emerald-400"
  }[color];

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        bg-slate-800/80 rounded-lg cursor-pointer transition-all duration-300
        ${isSelected 
          ? `border-[2px] ${borderColor}` 
          : `border-[1px] ${borderColor}`
        }
        hover:border-[2px] hover:${borderColor}
        w-full p-4 md:flex-1 md:min-h-[120px]
      `}
    >
      <div className="flex items-center space-x-3 md:flex-col md:items-center md:text-center md:space-x-0 md:space-y-2">
        <div className={`bg-${color}-400/10 p-2 rounded-lg`}>
          <Icon className={`text-${color}-400 w-7 h-7 md:w-6 md:h-6`} />
        </div>
        <h3 className="text-base font-medium text-white md:text-sm">{title}</h3>
      </div>
    </motion.div>
  );
};

// Component for displaying connecting arrows between FlowCards
const ArrowConnection = ({ label }) => (
  <div className="flex flex-col items-center justify-center w-10 md:w-14 hidden md:flex"> {/* Hidden on mobile */}
    <div className="h-0.5 w-full bg-[#FF6B6B] mb-0.5" />
    <ArrowRight className="text-[#FF6B6B] w-3 h-3 md:w-4 md:h-4" />
    <span className="text-xs md:text-sm text-[#FF6B6B] mt-0.5 text-center whitespace-normal min-w-[50px]">{label}</span>
  </div>
);

// Panel to show details and features of each selected item
const DetailPanel = ({ selectedItem, hoveredItem, t }) => {
  const itemToShow = hoveredItem || selectedItem; // Use hovered item if available
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

  const detail = details[itemToShow]; // Get details for the currently selected item
  if (!detail) return null; // Return null if no item is selected

  const Icon = detail.icon; // Dynamically assign the icon component

  // Define the same border color logic as FlowCard
  const borderColor = {
    blue: "border-blue-400",
    purple: "border-purple-400",
    emerald: "border-emerald-400"
  }[detail.color];

  return (
    <AnimatePresence mode="wait">
      {detail && (
        <motion.div 
          key={itemToShow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`mt-3 bg-slate-800/50 p-4 rounded-lg border-2 ${borderColor}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`bg-${detail.color}-400/10 p-2 rounded-lg`}>
              <Icon className={`text-${detail.color}-400 w-5 h-5 md:w-6 md:h-6`} />
            </div>
            <h3 className="text-xl md:text-2xl font-medium text-white">{detail.title}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {detail.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full bg-${detail.color}-400`} />
                <span className="text-base text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main component for the menu display
const FourMenu = ({ language = 'en' }) => {
  const [selectedItem, setSelectedItem] = useState('site'); // State for selected item; adjust default selection if needed
  const [hoveredItem, setHoveredItem] = useState(null); // State for hovered item
  const t = menuTranslations[language] || menuTranslations.en; // Translation based on language prop

  return (
    <div className="bg-black text-white px-4 sm:px-6 pb-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto flex flex-col"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-transparent p-2 sm:p-4 md:p-6 rounded-xl flex-grow"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-[#FF6B6B] flex items-center gap-2 md:gap-3">
                <ChefHat className="text-[#00ff9d] w-14 h-14 sm:w-16 sm:h-16 md:w-12 md:h-12 lg:w-14 lg:h-14" />
                4menu.today
              </h2>
              <p className="text-lg sm:text-xl md:text-lg lg:text-xl text-white">{t.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 md:mt-0">
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

          {/* Menu flow section */}
          <div className="relative">
            {/* Mobile Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              <FlowCard
                icon={Globe}
                title={t.siteCard.title}
                color="blue"
                isSelected={selectedItem === 'site'}
                onClick={() => setSelectedItem('site')}
                onMouseEnter={() => setHoveredItem('site')}
                onMouseLeave={() => setHoveredItem(null)}
              />
              <FlowCard
                icon={QrCode}
                title={t.qrcodeCard.title}
                color="blue"
                isSelected={selectedItem === 'qrcode'}
                onClick={() => setSelectedItem('qrcode')}
                onMouseEnter={() => setHoveredItem('qrcode')}
                onMouseLeave={() => setHoveredItem(null)}
              />
              <FlowCard
                icon={Smartphone}
                title={t.appCard.title}
                color="purple"
                isSelected={selectedItem === 'app'}
                onClick={() => setSelectedItem('app')}
                onMouseEnter={() => setHoveredItem('app')}
                onMouseLeave={() => setHoveredItem(null)}
              />
              <FlowCard
                icon={Bell}
                title={t.alertsCard.title}
                color="purple"
                isSelected={selectedItem === 'alerts'}
                onClick={() => setSelectedItem('alerts')}
                onMouseEnter={() => setHoveredItem('alerts')}
                onMouseLeave={() => setHoveredItem(null)}
              />
              <FlowCard
                icon={DollarSign}
                title={t.tipsCard.title}
                color="purple"
                isSelected={selectedItem === 'tips'}
                onClick={() => setSelectedItem('tips')}
                onMouseEnter={() => setHoveredItem('tips')}
                onMouseLeave={() => setHoveredItem(null)}
              />
            </div>

            {/* Desktop Layout (hidden on mobile) */}
            <div className="hidden md:flex justify-center items-stretch gap-3">
              <FlowCard
                icon={Globe}
                title={t.siteCard.title}
                color="blue"
                isSelected={selectedItem === 'site'}
                onClick={() => setSelectedItem('site')}
                onMouseEnter={() => setHoveredItem('site')}
                onMouseLeave={() => setHoveredItem(null)}
              />
              <ArrowConnection label={t.integrates} />
              <FlowCard
                icon={QrCode}
                title={t.qrcodeCard.title}
                color="blue"
                isSelected={selectedItem === 'qrcode'}
                onClick={() => setSelectedItem('qrcode')}
                onMouseEnter={() => setHoveredItem('qrcode')}
                onMouseLeave={() => setHoveredItem(null)}
              />
              <ArrowConnection label={t.connects} />
              <FlowCard
                icon={Smartphone}
                title={t.appCard.title}
                color="purple"
                isSelected={selectedItem === 'app'}
                onClick={() => setSelectedItem('app')}
                onMouseEnter={() => setHoveredItem('app')}
                onMouseLeave={() => setHoveredItem(null)}
              />
              <ArrowConnection label={t.notifies} />
              <FlowCard
                icon={Bell}
                title={t.alertsCard.title}
                color="purple"
                isSelected={selectedItem === 'alerts'}
                onClick={() => setSelectedItem('alerts')}
                onMouseEnter={() => setHoveredItem('alerts')}
                onMouseLeave={() => setHoveredItem(null)}
              />
              <ArrowConnection label={t.manages} />
              <FlowCard
                icon={DollarSign}
                title={t.tipsCard.title}
                color="purple"
                isSelected={selectedItem === 'tips'}
                onClick={() => setSelectedItem('tips')}
                onMouseEnter={() => setHoveredItem('tips')}
                onMouseLeave={() => setHoveredItem(null)}
              />
            </div>

            {/* Mobile connection labels */}
            <div className="flex flex-col gap-2 mt-4 md:hidden">
              <div className="text-center text-[#FF6B6B] text-sm">
                {t.integrates} → {t.connects} → {t.notifies} → {t.manages}
              </div>
            </div>
          </div>

          {/* Detailed panel */}
          <DetailPanel selectedItem={selectedItem} hoveredItem={hoveredItem} t={t} />

          {/* Additional management sections */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 bg-slate-800/50 p-3 sm:p-4 md:p-5 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="bg-emerald-400/10 p-3 rounded-lg">
                <ClipboardList className="text-emerald-400 w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-emerald-400">{t.financialManagement.title}</h3>
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
          </motion.div>

          {/* Contact section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 rounded-lg p-3"
          >
            <ContactSection title={t.contactUs} />
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default FourMenu; // Exporting the main component for use in other parts of the app

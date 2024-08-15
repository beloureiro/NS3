import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Wrench, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import DynamicExpertiseDashboard from '../AppComponents/DynamicExpertiseDashboard';
import QuickTools from '../AppComponents/QuickTools';
import ErrorPage from '../AppComponents/ErrorPage';
import DecisionHelper from '../tools/DecisionMatrix/DecisionMatrix';
import ActionPlanApp from '../tools/ActionPlan/ActionPlan';
import ProcessFlowDiagramApp from '../tools/ProcessFlow/ProcessFlow';
import LanguageToggle from '../AppComponents/LanguageToggle';

// Função Header simplificada para criar o cabeçalho apenas com o título
function Header({ title }) {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:items-center mb-4 relative">
      {/* Div principal que organiza o layout do título, centralizando-o */}
      <h1 className="text-2xl sm:text-4xl font-bold text-center w-full sm:w-auto">
        {/* Título da página, centralizado em todas as telas */}
        {title}
      </h1>
    </div>
  );
}

// Função principal que define as rotas e renderiza os componentes da aplicação
const AppRoutes = ({ language, showTools, setShowTools, t, logo, setLanguage }) => {
  const location = useLocation(); // Captura a localização atual da rota

  return (
    <Routes>
      <Route path="/" element={
        <>
          {/* Rota principal que exibe o conteúdo da página inicial */}

          <Header title={t.title} />
          {/* Renderiza o cabeçalho apenas com o título */}
          
          {/* Renderiza o botão de alternância de idioma condicionalmente */}
          <div className="w-full mb-4 sm:mb-0 sm:absolute sm:top-0 sm:right-0 sm:w-auto">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          <div className="mb-4 transform hover:scale-105 transition-transform duration-300 text-center">
            {/* Div que exibe o logotipo da empresa e uma breve descrição */}
            <img src={logo} alt="InMotion logo" className="mx-auto" />
            {/* Logotipo centralizado */}
            <p className="mt-1 text-gray-400">{t.description}</p>
            {/* Descrição do logotipo abaixo do logotipo */}
          </div>

          <div className="mb-4">
            {/* Div que exibe o título e a descrição da expertise da empresa */}
            <h2 className="text-2xl font-semibold mb-2 text-center">{t.ourExpertise}</h2>
            {/* Título da seção de expertise, centralizado */}
            <p className="leading-relaxed text-center">
              {t.expertiseDescription}
              {/* Descrição da expertise da empresa */}
            </p>
          </div>

          <DynamicExpertiseDashboard language={language} />
          {/* Componente que exibe o dashboard dinâmico de expertise, adaptado ao idioma atual */}

          {/* Condicional para renderizar o botão "master" apenas na página inicial */}
          {location.pathname === "/" && (
            <div className="mt-2 mb-2 text-center">
              <button
                onClick={() => setShowTools(!showTools)} 
                className="bg-[#00cc7d] hover:bg-[#00ff9d] text-black text-sm font-medium py-1.5 px-5 rounded inline-flex items-center transition-colors duration-300"
              >
                <Wrench className="mr-1" size={16} />
                {/* Ícone de chave inglesa para indicar ferramentas */}
                <span>{t.quickToolsButton}</span>
                {/* Texto do botão de ferramentas rápidas */}
              </button>
            </div>
          )}

          {showTools && <QuickTools language={language} />}
          {/* Renderiza o componente de ferramentas rápidas se o estado showTools for verdadeiro */}

          <div className="mt-2 mb-2">
            {/* Div que exibe a seção de contatos com ícones para interações rápidas */}
            <h2 className="text-2xl font-semibold mb-2 text-center">{t.transformBusiness}</h2>
            {/* Título da seção de contatos, centralizado */}
            <div className="flex justify-center space-x-6">
              {/* Div que centraliza os ícones de contato */}
              <a href="mailto:bc@inmotion.today" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                <Mail size={24} />
                {/* Link de email */}
              </a>
              <a href="tel:+351915542701" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                <Phone size={24} />
                {/* Link para telefone */}
              </a>
              <a href="https://www.linkedin.com/company/inmotionc" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                <Linkedin size={24} />
                {/* Link para o perfil no LinkedIn */}
              </a>
              <a href="https://wa.me/351915542701" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                <MessageCircle size={24} />
                {/* Link para contato via WhatsApp */}
              </a>
            </div>
          </div>
        </>
      } />

      {/* Outras rotas */}
      <Route path="/decision-helper" element={<DecisionHelper />} />
      <Route path="/5w2h" element={<ActionPlanApp />} />
      <Route path="/process-flow" element={<ProcessFlowDiagramApp />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;

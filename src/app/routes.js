import React from 'react'; // Importa a biblioteca React para criar componentes
import { Route, Routes } from 'react-router-dom'; // Importa Route e Routes do React Router para definir as rotas no React
import { Wrench, Globe, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react'; // Importa ícones do Lucide React para serem usados na interface
import DynamicExpertiseDashboard from '../AppComponents/DynamicExpertiseDashboard'; // Importa o componente de dashboard dinâmico
import QuickTools from '../AppComponents/QuickTools'; // Importa o componente de ferramentas rápidas
import ErrorPage from '../AppComponents/ErrorPage'; // Importa o componente de página de erro
import DecisionHelper from '../tools/DecisionMatrix/DecisionMatrix'; // Importa a ferramenta de auxílio à decisão
import ActionPlanApp from '../tools/ActionPlan/ActionPlan'; // Importa a ferramenta de plano de ação
import ProcessFlowDiagramApp from '../tools/ProcessFlow/ProcessFlow'; // Importa a ferramenta de fluxo de processo

// Função Header para criar o cabeçalho com título e botão de troca de idioma
function Header({ title, language, toggleLanguage }) {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:items-center mb-4 relative">
      {/* Div principal que organiza o layout de título e botão, centralizando ambos */}
      <h1 className="text-2xl sm:text-4xl font-bold text-center w-full sm:w-auto">
        {/* Título da página, centralizado em todas as telas */}
        {title}
      </h1>

      <div className="mt-2 sm:mt-0 sm:absolute sm:right-0">
        {/* Div que contém o botão de troca de idioma, posicionado abaixo do título em mobile e à direita em desktop */}
        <button 
          onClick={toggleLanguage} 
          className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-1 px-3 rounded inline-flex items-center transition-colors duration-300"
        >
          <Globe className="mr-1" size={16} />
          {/* Ícone de globo para simbolizar a troca de idioma */}
          <span>{language === 'en' ? 'PT' : 'EN'}</span>
          {/* Texto do botão que muda conforme o idioma atual */}
        </button>
      </div>
    </div>
  );
}

// Função principal que define as rotas e renderiza os componentes da aplicação
const AppRoutes = ({ language, toggleLanguage, showTools, setShowTools, t, logo }) => (
  <Routes>
    {/* Define as rotas da aplicação */}
    <Route path="/" element={
      <>
        {/* Rota principal que exibe o conteúdo da página inicial */}

        <Header title={t.title} language={language} toggleLanguage={toggleLanguage} />
        {/* Renderiza o cabeçalho com título e botão de troca de idioma */}

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
    
    <Route path="/decision-helper" element={<DecisionHelper />} />
    {/* Rota para a ferramenta de auxílio à decisão */}

    <Route path="/5w2h" element={<ActionPlanApp />} />
    {/* Rota para a ferramenta de plano de ação */}

    <Route path="/process-flow" element={<ProcessFlowDiagramApp />} />
    {/* Rota para a ferramenta de fluxo de processo */}

    <Route path="*" element={<ErrorPage />} />
    {/* Rota curinga para capturar todas as outras rotas e exibir a página de erro */}
  </Routes>
);

export default AppRoutes;

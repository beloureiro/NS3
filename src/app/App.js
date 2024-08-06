// Importa as bibliotecas React e useState do React
import React, { useState } from 'react';

// Importa o BrowserRouter de 'react-router-dom' para gerenciar as rotas da aplicação
import { BrowserRouter as Router } from 'react-router-dom';

// Importa o componente Helmet da biblioteca 'react-helmet' para gerenciar o conteúdo da <head> do documento HTML
import { Helmet } from 'react-helmet';

// Importa o componente de rotas personalizado que gerencia a navegação na aplicação
import AppRoutes from './routes';

// Importa o objeto de traduções que contém strings em diferentes idiomas
import translations from '../AppComponents/translations';

// Importa o logotipo da aplicação que será exibido na interface
import logo from '../assets/rsz_1design_inmotion_181818.png';

// Importa o arquivo CSS que contém os estilos globais da aplicação
import '../index.css';

// Função principal do componente App, que é o componente raiz da aplicação
function App() {
  // Define um estado local 'showTools' que controla a visibilidade das ferramentas rápidas, inicialmente falso
  const [showTools, setShowTools] = useState(false);

  // Define um estado local 'language' que controla o idioma atual da aplicação, inicialmente 'en' (inglês)
  const [language, setLanguage] = useState('en');

  // Função que alterna o idioma da aplicação entre inglês ('en') e português ('pt')
  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'pt' : 'en');
  };

  // Variável 't' que acessa as strings de tradução de acordo com o idioma atual
  const t = translations[language];

  // Retorna a estrutura JSX que compõe a interface da aplicação
  return (
    // Configura o Router para gerenciar as rotas da aplicação, com um basename que define a base para todas as URLs
    <Router basename="/NS3">
      {/* Div principal que define o layout da página com fundo preto, texto branco, e ajusta a tela para ocupar o mínimo da altura do ecrã */}
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        {/* Componente Helmet que define o título da página e meta tags de descrição dinâmicas com base no idioma atual */}
        <Helmet>
          <title>InMotion - Consulting</title>
          <meta name="description" content={t.description} />
        </Helmet>
        {/* Div que centraliza o conteúdo e define uma largura máxima para manter o layout responsivo */}
        <div className="w-full max-w-4xl text-center">
          {/* Componente AppRoutes que gerencia as rotas da aplicação */}
          {/* Passa para o componente AppRoutes os estados e funções necessários, como idioma, alternância de idioma, visibilidade das ferramentas rápidas, etc. */}
          <AppRoutes 
            language={language}          // Passa o estado do idioma atual
            toggleLanguage={toggleLanguage} // Passa a função que alterna o idioma
            showTools={showTools}          // Passa o estado que controla a visibilidade das ferramentas rápidas
            setShowTools={setShowTools}    // Passa a função que atualiza a visibilidade das ferramentas rápidas
            t={t}                          // Passa o objeto de traduções atual baseado no idioma selecionado
            logo={logo}                    // Passa o logotipo da aplicação para ser utilizado no layout
          />
        </div>
      </div>
    </Router>
  );
}

// Exporta o componente App como padrão para ser utilizado em outras partes da aplicação
export default App;

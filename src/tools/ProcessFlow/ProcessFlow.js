/*
  Este arquivo define o componente principal `ProcessFlowDiagramApp` do aplicativo de construção de diagramas de fluxo de processo.
  
  Funcionalidades:
  - **Gerenciamento de Estado**: Utiliza o hook `useState` do React para gerenciar o estado do aplicativo, incluindo processos, nível atual, nome do processo, processo pai, mensagens de erro, idioma, título e descrição do fluxo.
  - **Adição de Processos**: Permite adicionar processos em diferentes níveis da hierarquia. Se o nível for maior que 1, exige que um processo pai seja selecionado.
  - **Internacionalização (i18n)**: Suporta a alternância entre os idiomas inglês e português, utilizando o objeto `translations` importado.
  - **Interface do Usuário**: Contém a estrutura da interface do usuário, incluindo campos de entrada, botões, e componentes estilizados para criar e visualizar o diagrama de fluxo de processos.
  
  O usuário pode interagir com o aplicativo para adicionar novos processos, definir títulos e descrições, e alternar entre idiomas. O componente `ProcessLevel` é usado para renderizar visualmente os processos em um formato hierárquico.
*/

import React, { useState } from 'react'; // Importa React e o hook useState para gerenciamento de estado
import { Link } from 'react-router-dom'; // Importa Link para navegação entre páginas
import { ChevronLeft, Globe, MoreVertical } from 'lucide-react'; // Importa ícones para a interface
import { ProcessLevel } from './ProcessComponents'; // Importa o componente ProcessLevel para renderizar a hierarquia de processos
import { getEligibleParents, translations } from './utils'; // Importa funções utilitárias e traduções

// Define o componente principal do aplicativo
const ProcessFlowDiagramApp = () => {
  const [processes, setProcesses] = useState([]); // Estado para armazenar os processos
  const [currentLevel, setCurrentLevel] = useState('1'); // Estado para armazenar o nível atual do processo
  const [processName, setProcessName] = useState(''); // Estado para armazenar o nome do processo
  const [parentProcess, setParentProcess] = useState(''); // Estado para armazenar o processo pai selecionado
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro
  const [language, setLanguage] = useState('en'); // Estado para armazenar o idioma atual
  const [title, setTitle] = useState(''); // Estado para armazenar o título do diagrama
  const [description, setDescription] = useState(''); // Estado para armazenar a descrição do diagrama
  const [isTitleSet, setIsTitleSet] = useState(false); // Estado para verificar se o título foi definido
  const [isEditingTitle, setIsEditingTitle] = useState(false); // Estado para verificar se o título está sendo editado

  // Função para adicionar um novo processo
  const addProcess = () => {
    setError(''); // Reseta a mensagem de erro

    // Verifica se o nome do processo está vazio
    if (processName.trim() === '') {
      setError('Process name cannot be empty.'); // Define mensagem de erro
      return;
    }
    
    // Cria um novo objeto de processo
    const newProcess = { level: currentLevel, name: processName, children: [] };
    
    // Se o nível atual for 1 (Macroprocesso), adiciona o processo diretamente
    if (currentLevel === '1') {
      setProcesses([...processes, newProcess]);
    } else {
      // Se o nível for maior que 1, verifica se um processo pai foi selecionado
      if (!parentProcess) {
        setError('Please select a parent process.'); // Define mensagem de erro se não houver pai selecionado
        return;
      }
      
      const updatedProcesses = [...processes]; // Cria uma cópia dos processos existentes
      let success = false; // Flag para verificar se o processo foi adicionado com sucesso
      
      // Função recursiva para adicionar o novo processo ao processo pai
      const addToParent = (items) => {
        for (let item of items) {
          if (item.name === parentProcess) {
            // Verifica se o nível do processo pai é válido
            if (parseInt(item.level) !== parseInt(currentLevel) - 1) {
              setError('Invalid parent process selected for this level.'); // Define mensagem de erro para nível inválido
              return false;
            }
            item.children.push(newProcess); // Adiciona o novo processo como filho
            return true;
          }
          // Se o processo atual tiver filhos, chama a função recursivamente
          if (item.children && addToParent(item.children)) {
            return true;
          }
        }
        return false;
      };
      
      success = addToParent(updatedProcesses); // Tenta adicionar o novo processo
      
      if (success) {
        setProcesses(updatedProcesses); // Atualiza o estado com os processos modificados
      } else if (!error) {
        setError('Failed to add process. Please check the hierarchy.'); // Define mensagem de erro se falhar
      }
    }
    
    setProcessName(''); // Reseta o nome do processo
    setParentProcess(''); // Reseta o processo pai
  };

  // Função para alternar entre os idiomas disponíveis
  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'pt' : 'en'); // Alterna entre inglês e português
  };

  // Função para definir o título do diagrama
  const setProcessTitle = () => {
    if (title.trim()) { // Verifica se o título não está vazio
      setIsTitleSet(true); // Define que o título foi definido
      setIsEditingTitle(false); // Desativa o modo de edição do título
    }
  };

  // Função para habilitar a edição do título
  const editTitle = () => {
    setIsEditingTitle(true); // Ativa o modo de edição do título
  };

  const t = translations[language]; // Seleciona as traduções com base no idioma atual

  // Renderiza a interface do usuário
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="text-green-500 hover:underline flex items-center">
          <ChevronLeft className="mr-2" /> {t.backToHome} {/* Link para voltar à página inicial */}
        </Link>
        <div className="text-center flex-1">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1> {/* Título do aplicativo */}
          <p className="text-lg italic">{t.subtitle}</p> {/* Subtítulo do aplicativo */}
        </div>
        <button onClick={toggleLanguage} className="flex items-center bg-gray-800 text-white p-2 rounded">
          <Globe className="mr-2" /> {language.toUpperCase()} {/* Botão para alternar o idioma */}
        </button>
      </div>

      {/* Renderiza o formulário de definição de título e descrição se o título ainda não foi definido */}
      {!isTitleSet ? (
        <div className="w-full max-w-6xl mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="mb-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.enterProcessTitle}
              className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded mb-4"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.enterProcessDescription}
              className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded mb-4"
            />
            <button
              onClick={setProcessTitle}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
            >
              {t.setProcessTitle} {/* Botão para definir o título */}
            </button>
          </div>
        </div>
      ) : (
        // Renderiza o formulário de adição de processo se o título já foi definido
        <div className="w-full max-w-6xl mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="mb-4">
            <select
              value={currentLevel}
              onChange={(e) => {
                setCurrentLevel(e.target.value);
                setParentProcess('');
                setError('');
              }}
              className="bg-gray-700 text-white border border-gray-600 p-2 rounded"
            >
              <option value="1">1. Business Process (Macroprocess)</option>
              <option value="2">2. Process</option>
              <option value="3">3. Sub-Process</option>
              <option value="4">4. Activity</option>
              <option value="5">5. Task</option>
            </select>
          </div>
          {/* Se o nível não for 1, renderiza o campo de seleção de processo pai */}
          {currentLevel !== '1' && (
            <div className="mb-4">
              <select
                value={parentProcess}
                onChange={(e) => setParentProcess(e.target.value)}
                className="bg-gray-700 text-white border border-gray-600 p-2 rounded"
              >
                <option value="">{t.selectParent}</option>
                {getEligibleParents(processes, currentLevel).map((process, index) => (
                  <option key={index} value={process.name}>{process.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex mb-4">
            <input
              value={processName}
              onChange={(e) => setProcessName(e.target.value)}
              placeholder={t.placeholder}
              className="mr-2 bg-gray-700 text-white border border-gray-600 p-2 rounded flex-1"
            />
            <button
              onClick={addProcess}
              disabled={currentLevel !== '1' && !parentProcess}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
            >
              {t.addProcess} {/* Botão para adicionar um processo */}
            </button>
          </div>
          {/* Exibe mensagens de erro, se houver */}
          {error && (
            <div className="mb-4 bg-red-900 border border-red-700 text-white p-2 rounded">
              {error}
            </div>
          )}
        </div>
      )}

      {/* Se o título foi definido, renderiza o título e a descrição */}
      {isTitleSet && (
        <div className="w-full max-w-6xl mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-6 relative">
          {isEditingTitle ? (
            <div className="mb-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded mb-2"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded mb-2"
              />
              <button
                onClick={setProcessTitle}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
              >
                {t.setProcessTitle}
              </button>
            </div>
          ) : (
            <>
              <div className="border-b border-gray-700 pb-4 flex flex-col items-center">
                <h2 className="text-xl font-semibold text-white text-center">{title}</h2>
                {description && <p className="text-gray-300 mt-1 text-center">{description}</p>}
              </div>
              <button
                onClick={editTitle}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                title={t.editTitle}
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Renderiza o componente ProcessLevel para exibir o diagrama de fluxo de processos */}
      {isTitleSet && ( // Conditionally render this section based on isTitleSet
        <div className="w-full max-w-6xl mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <div className="mt-8 overflow-x-auto">
            <ProcessLevel processes={processes} level="1" /> {/* Renderiza os processos a partir do nível 1 */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessFlowDiagramApp; // Exporta o componente como padrão

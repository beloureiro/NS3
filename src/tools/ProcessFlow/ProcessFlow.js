import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Globe, MoreVertical } from 'lucide-react';
import { ProcessLevel } from './ProcessComponents';
import { getEligibleParents, translations } from './utils';

const ProcessFlowDiagramApp = () => {
  // Estados do componente
  const [processes, setProcesses] = useState([]);
  const [currentLevel, setCurrentLevel] = useState('1');
  const [processName, setProcessName] = useState('');
  const [parentProcess, setParentProcess] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleSet, setIsTitleSet] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Função para adicionar um novo processo
  const addProcess = () => {
    setError('');
    if (processName.trim() === '') {
      setError('Process name cannot be empty.');
      return;
    }
    
    const newProcess = { level: currentLevel, name: processName, children: [] };
    
    if (currentLevel === '1') {
      setProcesses([...processes, newProcess]);
    } else {
      if (!parentProcess) {
        setError('Please select a parent process.');
        return;
      }
      
      const updatedProcesses = [...processes];
      let success = false;
      
      const addToParent = (items) => {
        for (let item of items) {
          if (item.name === parentProcess) {
            if (parseInt(item.level) !== parseInt(currentLevel) - 1) {
              setError('Invalid parent process selected for this level.');
              return false;
            }
            item.children.push(newProcess);
            return true;
          }
          if (item.children && addToParent(item.children)) {
            return true;
          }
        }
        return false;
      };
      
      success = addToParent(updatedProcesses);
      
      if (success) {
        setProcesses(updatedProcesses);
      } else if (!error) {
        setError('Failed to add process. Please check the hierarchy.');
      }
    }
    
    setProcessName('');
    setParentProcess('');
  };

  // Função para alternar o idioma
  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'pt' : 'en');
  };

  // Função para definir o título do processo
  const setProcessTitle = () => {
    if (title.trim()) {
      setIsTitleSet(true);
      setIsEditingTitle(false);
    }
  };

  // Função para editar o título
  const editTitle = () => {
    setIsEditingTitle(true);
  };

  // Seleção das traduções baseada no idioma atual
  const t = translations[language];

  return (
    <div className="bg-black text-white min-h-screen w-full p-4 sm:p-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <Link to="/" className="text-green-500 hover:underline flex items-center mb-4 sm:mb-0">
          <ChevronLeft className="mr-2" /> {t.backToHome}
        </Link>
        <div className="text-center flex-1">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-lg italic">{t.subtitle}</p>
        </div>
        <button onClick={toggleLanguage} className="flex items-center bg-gray-800 text-white p-2 rounded mt-4 sm:mt-0">
          <Globe className="mr-2" /> {language.toUpperCase()}
        </button>
      </div>

      {/* Formulário principal */}
      <div className="w-full bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-6">
        {!isTitleSet ? (
          // Formulário para definir o título do processo
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
              {t.setProcessTitle}
            </button>
          </div>
        ) : (
          // Formulário para adicionar processos
          <>
            <div className="mb-4">
              <select
                value={currentLevel}
                onChange={(e) => {
                  setCurrentLevel(e.target.value);
                  setParentProcess('');
                  setError('');
                }}
                className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded mb-4"
              >
                <option value="1">1. Business Process (Macroprocess)</option>
                <option value="2">2. Process</option>
                <option value="3">3. Sub-Process</option>
                <option value="4">4. Activity</option>
                <option value="5">5. Task</option>
              </select>
            </div>
            {currentLevel !== '1' && (
              <div className="mb-4">
                <select
                  value={parentProcess}
                  onChange={(e) => setParentProcess(e.target.value)}
                  className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded mb-4"
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
                className="flex-1 bg-gray-700 text-white border border-gray-600 p-2 rounded mr-2"
              />
              <button
                onClick={addProcess}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
              >
                {t.addProcess}
              </button>
            </div>
            {error && (
              <div className="mb-4 bg-red-900 border border-red-700 text-white p-2 rounded">
                {error}
              </div>
            )}
          </>
        )}
      </div>

      {/* Exibição do título e descrição do processo */}
      {isTitleSet && (
        <div className="w-full bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-6 relative">
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

      {/* Visualização do diagrama de processos */}
      {isTitleSet && (
        <div className="w-full bg-gray-800 text-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <ProcessLevel processes={processes} level="1" />
        </div>
      )}
    </div>
  );
};

export default ProcessFlowDiagramApp;

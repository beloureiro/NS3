import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Globe } from 'lucide-react';

const ProcessBox = ({ level, name, children }) => {
  const getStyle = () => {
    switch(level) {
      case '1': return 'bg-gray-700 text-white font-bold';
      case '2': return 'bg-gray-600 text-white';
      case '3': return 'bg-gray-500 text-white';
      case '4': return 'bg-gray-400 text-white';
      case '5': return 'bg-gray-300 text-black';
      default: return 'bg-gray-200 text-black';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`p-2 mb-2 text-center ${getStyle()} rounded min-w-[120px] shadow-md`}>
        {name}
      </div>
      {children && (
        <div className="flex flex-col items-center">
          <VerticalLine />
          {children}
        </div>
      )}
    </div>
  );
};

const ArrowRight = () => (
  <div className="flex items-center mx-2">
    <div className="w-8 h-0.5 bg-green-500"></div>
    <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-green-500"></div>
  </div>
);

const VerticalLine = () => (
  <div className="w-0.5 h-4 bg-green-500 my-1"></div>
);

const ArrowDown = () => (
  <div className="flex flex-col items-center">
    <div className="w-0.5 h-4 bg-green-500 my-1"></div>
    <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-green-500"></div>
  </div>
);

const ProcessLevel = ({ processes, level }) => (
  <div className={`relative ${parseInt(level) <= 3 ? 'flex flex-row items-start' : 'flex flex-col items-center'}`}>
    {processes.map((process, index) => (
      <React.Fragment key={index}>
        <ProcessBox level={level} name={process.name}>
          {process.children && process.children.length > 0 && (
            <div className="flex flex-col items-center">
              <ArrowDown />
              <ProcessLevel processes={process.children} level={(parseInt(level) + 1).toString()} />
            </div>
          )}
        </ProcessBox>
        {index < processes.length - 1 && parseInt(level) <= 3 && <ArrowRight />}
      </React.Fragment>
    ))}
  </div>
);

const ProcessFlowDiagramApp = () => {
  const [processes, setProcesses] = useState([]);
  const [currentLevel, setCurrentLevel] = useState('1');
  const [processName, setProcessName] = useState('');
  const [parentProcess, setParentProcess] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');

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

  const flattenProcesses = (processes) => {
    return processes.reduce((acc, process) => {
      acc.push(process);
      if (process.children) {
        acc.push(...flattenProcesses(process.children));
      }
      return acc;
    }, []);
  };

  const getEligibleParents = () => {
    const currentLevelInt = parseInt(currentLevel);
    return flattenProcesses(processes).filter(p => {
      const parentLevel = parseInt(p.level);
      return parentLevel === currentLevelInt - 1;
    });
  };

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'pt' : 'en');
  };

  const translations = {
    en: {
      backToHome: "Back to home",
      title: "Process Flow Diagram Builder",
      subtitle: "Design your process in a structured way.",
      placeholder: "name...",
      addProcess: "Add",
      selectParent: "Select parent stage",
    },
    pt: {
      backToHome: "Voltar",
      title: "Contrutor de Fluxo de Processo",
      subtitle: "Desenhe seu processo de forma estruturada.",
      placeholder: "nome...",
      addProcess: "Ad",
      selectParent: "Selecione o parente da etapa",
    },
  };

  const t = translations[language];

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="text-green-500 hover:underline flex items-center">
          <ChevronLeft className="mr-2" /> {t.backToHome}
        </Link>
        <div className="text-center flex-1">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-lg italic mb-8">{t.subtitle}</p>
        </div>
        <button onClick={toggleLanguage} className="flex items-center bg-gray-800 text-white p-2 rounded">
          <Globe className="mr-2" /> {language.toUpperCase()}
        </button>
      </div>

      <div className="w-full max-w-6xl mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
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
        {currentLevel !== '1' && (
          <div className="mb-4">
            <select
              value={parentProcess}
              onChange={(e) => setParentProcess(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 p-2 rounded"
            >
              <option value="">{t.selectParent}</option>
              {getEligibleParents().map((process, index) => (
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
            {t.addProcess}
          </button>
        </div>
        {error && (
          <div className="mb-4 bg-red-900 border border-red-700 text-white p-2 rounded">
            {error}
          </div>
        )}
        <div className="mt-8 overflow-x-auto">
          <ProcessLevel processes={processes} level="1" />
        </div>
      </div>
    </div>
  );
};

export default ProcessFlowDiagramApp;

import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Globe, MoreVertical, Download, Upload } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { translations } from './utils';
import AddProcessForm from './AddProcessForm';
import { exportProcessFlow } from './ProcessFlowExportImport';

// Componente para renderizar uma caixa de processo individual
const ProcessBox = ({ id, level, name, isRoot, isSelected, onSelect, onEdit, onMove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'process',
    item: { id, level },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'process',
    drop: (item) => onMove(item.id, id),
  }));

  const getStyle = () => {
    let style = 'p-2 text-center rounded min-w-[120px] shadow-md flex items-center ';
    if (isRoot) {
      style += 'text-white font-bold ';
    }
    switch (level) {
      case '1': return style + 'bg-gray-700 text-white font-bold';
      case '2': return style + 'bg-gray-600 text-white';
      case '3': return style + 'bg-gray-500 text-white';
      case '4': return style + 'bg-gray-400 text-black h-7';
      case '5': return 'text-white flex items-center pl-4 text-left';
      default: return style + 'bg-gray-200 text-black';
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onEdit(id, editedName);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div 
      ref={(node) => drag(drop(node))}
      className={`${getStyle()} ${isSelected ? 'ring-2 ring-blue-500' : ''} ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => onSelect(id)}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          autoFocus
          className="bg-transparent text-inherit w-full text-center"
        />
      ) : (
        <span className="flex-1">{level === '5' ? (<><span className="mr-1">▸</span> {name}</>) : name}</span>
      )}
    </div>
  );
};

// Componente para renderizar uma seta apontando para a direita
const ArrowRight = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex items-center">
      <div className="w-8 h-0.5 bg-green-500"></div>
      <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-green-500"></div>
    </div>
  </div>
);

const VerticalLine = () => (
  <div className="w-0.5 h-4 bg-green-500 my-1"></div>
);

// Componente principal para renderizar um nível do processo
const ProcessLevel = ({ processes, level, isRoot = false, selectedId, onSelect, onEdit, onMove }) => {
  const isHorizontal = parseInt(level) <= 3;

  return (
    <div className={`relative ${isHorizontal ? 'flex flex-row items-start' : 'flex flex-col'}`}>
      {processes.map((process, index) => (
        <React.Fragment key={process.id}>
          <div className={`flex flex-col ${level === '4' ? 'mb-1' : ''}`}>
            <ProcessBox 
              id={process.id}
              level={level} 
              name={process.name} 
              isRoot={isRoot && index === 0}
              isSelected={selectedId === process.id}
              onSelect={onSelect}
              onEdit={onEdit}
              onMove={onMove}
            />
            {process.children && process.children.length > 0 && (
              <div className={`flex flex-col items-center ${level === '4' ? 'mt-1' : 'mt-2'}`}>
                <VerticalLine />
                <ProcessLevel 
                  processes={process.children} 
                  level={(parseInt(level) + 1).toString()} 
                  selectedId={selectedId}
                  onSelect={onSelect}
                  onEdit={onEdit}
                  onMove={onMove}
                />
              </div>
            )}
          </div>
          {index < processes.length - 1 && isHorizontal && (
            <ArrowRight />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// O componente ProcessFlowDiagramApp começa aqui
const ProcessFlowDiagramApp = () => {
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
  const [selectedId, setSelectedId] = useState(null);

  const t = translations[language];

  const addProcess = (name, parentId) => {
    const newProcess = { id: Date.now().toString(), level: currentLevel, name, children: [] };
    
    setProcesses(prevProcesses => {
      if (currentLevel === '1') {
        return [...prevProcesses, newProcess];
      } else {
        const updatedProcesses = [...prevProcesses];
        const addToParent = (items) => {
          for (let item of items) {
            if (item.id === parentId) {
              item.children.push(newProcess);
              return true;
            }
            if (item.children && addToParent(item.children)) {
              return true;
            }
          }
          return false;
        };
        
        if (!addToParent(updatedProcesses)) {
          setError('Failed to add process. Please check the hierarchy.');
        }
        return updatedProcesses;
      }
    });
  };

  const handleSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const handleEdit = useCallback((id, newName) => {
    setProcesses(prevProcesses => {
      const updateProcess = (items) => {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, name: newName };
          }
          if (item.children) {
            return { ...item, children: updateProcess(item.children) };
          }
          return item;
        });
      };
      return updateProcess(prevProcesses);
    });
  }, []);

  const handleMove = useCallback((draggedId, targetId) => {
    if (draggedId === targetId) return;

    setProcesses(prevProcesses => {
      let draggedItem;
      const removeItem = (items) => {
        return items.filter(item => {
          if (item.id === draggedId) {
            draggedItem = item;
            return false;
          }
          if (item.children) {
            item.children = removeItem(item.children);
          }
          return true;
        });
      };

      const addItem = (items) => {
        return items.map(item => {
          if (item.id === targetId) {
            return { ...item, children: [...(item.children || []), draggedItem] };
          }
          if (item.children) {
            return { ...item, children: addItem(item.children) };
          }
          return item;
        });
      };

      let newProcesses = removeItem(prevProcesses);
      return addItem(newProcesses);
    });
  }, []);

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'pt' : 'en');
  };

  const setProcessTitle = () => {
    if (title.trim()) {
      setIsTitleSet(true);
      setIsEditingTitle(false);
    }
  };

  const editTitle = () => {
    setIsEditingTitle(true);
  };

  const handleExport = () => {
    exportProcessFlow(processes, title);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (importedData.processes && importedData.title) {
            setProcesses(importedData.processes);
            setTitle(importedData.title);
            setDescription(importedData.description || '');
            setIsTitleSet(true);
            alert('Importação bem-sucedida!');
          } else {
            throw new Error("Estrutura de dados incorreta");
          }
        } catch (err) {
          console.error("Invalid JSON file", err);
          alert("Erro ao importar o arquivo. Certifique-se de que o arquivo está correto.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-[#000000] text-[#b3b3b3] min-h-screen w-full p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <Link to="/" className="text-[#00ff9d] hover:text-[#00cc7d] flex items-center mb-4 sm:mb-0">
            <ChevronLeft className="mr-2" /> {t.backToHome}
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold mb-2 text-[#ffffff]">{t.title}</h1>
            <p className="text-lg italic text-[#808080]">{t.subtitle}</p>
          </div>
          <button onClick={toggleLanguage} className="flex items-center bg-[#1a1a1a] text-[#b3b3b3] p-2 rounded hover:bg-[#333333] transition-colors duration-200">
            <Globe className="mr-2" /> {language.toUpperCase()}
          </button>
        </div>

        <div className="w-full bg-[#1a1a1a] text-[#b3b3b3] p-6 rounded-lg shadow-lg mb-6 border border-[#333333]">
          {!isTitleSet ? (
            <div className="mb-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.enterProcessTitle}
                className="w-full bg-[#0d0d0d] text-[#b3b3b3] border border-[#333333] p-2 rounded mb-4 focus:border-[#00ff9d] focus:outline-none"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.enterProcessDescription}
                className="w-full bg-[#0d0d0d] text-[#b3b3b3] border border-[#333333] p-2 rounded mb-4 focus:border-[#00ff9d] focus:outline-none"
              />
              <div className="flex justify-between items-center">
                <button
                  onClick={setProcessTitle}
                  className="bg-[#00cc7d] hover:bg-[#00ff9d] text-[#000000] font-medium p-2 rounded transition-colors duration-200"
                >
                  {t.setProcessTitle}
                </button>
                <label className="flex items-center bg-[#1a1a1a] hover:bg-[#333333] text-[#b3b3b3] p-2 rounded cursor-pointer transition-colors duration-200">
                  <Upload className="mr-2" /> {t.importDiagram}
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                </label>
              </div>
            </div>
          ) : (
            <AddProcessForm 
              processes={processes}
              currentLevel={currentLevel}
              setCurrentLevel={setCurrentLevel}
              processName={processName}
              setProcessName={setProcessName}
              parentProcess={parentProcess}
              setParentProcess={setParentProcess}
              addProcess={addProcess}
              error={error}
              setError={setError}
              t={t}
              className="bg-[#0d0d0d] text-[#b3b3b3] border-[#333333] focus:border-[#00ff9d]"
            />
          )}
        </div>

        {isTitleSet && (
          <div className="w-full bg-[#1a1a1a] text-[#b3b3b3] p-6 rounded-lg shadow-lg mb-5 relative border border-[#333333]">
            {isEditingTitle ? (
              <div className="mb-4">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0d0d0d] text-[#b3b3b3] border border-[#333333] p-2 rounded mb-2 focus:border-[#00ff9d] focus:outline-none"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#0d0d0d] text-[#b3b3b3] border border-[#333333] p-2 rounded mb-2 focus:border-[#00ff9d] focus:outline-none"
                />
                <button
                  onClick={setProcessTitle}
                  className="bg-[#00ff9d] hover:bg-[#00cc7d] text-[#000000] font-medium p-2 rounded transition-colors duration-200"
                >
                  {t.setProcessTitle}
                </button>
              </div>
            ) : (
              <>
                <div className="border-b border-[#333333] pb-4 flex flex-col items-center">
                  <h2 className="text-xl font-semibold text-[#ffffff] text-center">{title}</h2>
                  {description && <p className="text-[#cccccc] mt-1 text-center">{description}</p>}
                </div>
                <button
                  onClick={editTitle}
                  className="absolute top-2 right-2 text-[#808080] hover:text-[#b3b3b3] transition-colors duration-200"
                  title={t.editTitle}
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        )}

        {isTitleSet && (
          <div className="w-full bg-[#1a1a1a] text-[#b3b3b3] p-6 rounded-lg shadow-lg overflow-x-auto mb-6 border border-[#333333]">
            <ProcessLevel 
              processes={processes} 
              level="1" 
              isRoot={true}
              selectedId={selectedId}
              onSelect={handleSelect}
              onEdit={handleEdit}
              onMove={handleMove}
              className="bg-[#0d0d0d] text-[#b3b3b3] border-[#333333]"
            />
          </div>
        )}

        {isTitleSet && (
          <div className="flex justify-end space-x-2">
            <button onClick={handleExport} className="flex items-center bg-[#1a1a1a] hover:bg-[#333333] text-[#b3b3b3] p-2 rounded transition-colors duration-200">
              <Download className="mr-2" /> {t.exportDiagram}
            </button>
            <label className="flex items-center bg-[#1a1a1a] hover:bg-[#333333] text-[#b3b3b3] p-2 rounded cursor-pointer transition-colors duration-200">
              <Upload className="mr-2" /> {t.importDiagram}
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default ProcessFlowDiagramApp;

import React, { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Globe,
  MoreVertical,
  Download,
  Upload,
} from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { translations } from "./utils";
import AddProcessForm from "./AddProcessForm";
import {
  exportProcessFlow,
  importProcessFlow,
  handleImportClick,
} from "./ProcessFlowExportImport";
import Tutorial from "./Tutorial"; // Importando o componente Tutorial
import ContactSection from "../../AppComponents/ContactSection";

// Componente para renderizar uma caixa de processo individual
const ProcessBox = ({
  id,
  level,
  name,
  isRoot,
  isSelected,
  onSelect,
  onEdit,
  onMove,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se o nome do processo está sendo editado
  const [editedName, setEditedName] = useState(name); // Estado para armazenar o nome do processo durante a edição

  // Configuração para permitir que o componente seja arrastável
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "process",
    item: { id, level }, // Informações do item arrastado
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Controla o estado de arrastamento
    }),
  }));

  // Configuração para permitir que o componente seja um alvo de drop (receber um item arrastado)
  const [, drop] = useDrop(() => ({
    accept: "process", // Define o tipo de item que pode ser solto
    drop: (item) => onMove(item.id, id), // Função a ser chamada ao soltar um item
  }));

  // Função para determinar o estilo da caixa com base no nível do processo
  const getStyle = () => {
    let style =
      "p-2 text-center rounded min-w-[120px] shadow-md flex items-center ";
    if (isRoot) {
      style += "text-white font-bold ";
    }
    switch (level) {
      case "1":
        return style + "bg-gray-700 text-white font-bold";
      case "2":
        return style + "bg-gray-600 text-white";
      case "3":
        return style + "bg-gray-500 text-white";
      case "4":
        return style + "bg-gray-400 text-black h-7";
      case "5":
        return "text-white flex items-center pl-4 text-left";
      default:
        return style + "bg-gray-200 text-black";
    }
  };

  // Função para iniciar a edição do nome ao clicar duas vezes
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // Função para finalizar a edição do nome ao perder o foco
  const handleBlur = () => {
    setIsEditing(false);
    onEdit(id, editedName); // Chama a função de edição passada como prop
  };

  // Função para salvar a edição ao pressionar Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))} // Configura o elemento para ser arrastável e recebível
      className={`${getStyle()} ${isSelected ? "ring-2 ring-blue-500" : ""} ${
        isDragging ? "opacity-50" : ""
      }`} // Aplica estilos condicionalmente
      onClick={() => onSelect(id)} // Seleciona o processo ao clicar
      onDoubleClick={handleDoubleClick} // Inicia a edição ao clicar duas vezes
      style={{ position: "relative" }} // Para posicionar o ícone
    >
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)} // Atualiza o nome do processo durante a edição
          onBlur={handleBlur} // Salva a edição ao perder o foco
          onKeyPress={handleKeyPress} // Salva a edição ao pressionar Enter
          autoFocus
          className="bg-transparent text-inherit w-full text-center"
        />
      ) : (
        <span className="flex-1">
          {level === "5" ? (
            <>
              <span className="mr-1">▸</span> {name}
            </>
          ) : (
            name
          )}
        </span> // Exibe o nome do processo ou uma seta caso seja um item de nível 5
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }} // Impede a propagação do evento
        className="absolute top-1 right-1 text-red-500 opacity-0 hover:opacity-100 transition-opacity"
        style={{ transition: "opacity 0.2s" }} // Transição suave
      >
        🗑️
      </button>
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

// Componente para renderizar uma linha vertical
const VerticalLine = () => <div className="w-0.5 h-4 bg-green-500 my-1"></div>;

// Componente principal para renderizar um nível do processo
const ProcessLevel = ({
  processes,
  level,
  isRoot = false,
  selectedId,
  onSelect,
  onEdit,
  onMove,
  onDelete,
}) => {
  const isHorizontal = parseInt(level) <= 3; // Define se o layout será horizontal ou vertical

  return (
    <div
      className={`relative ${
        isHorizontal ? "flex flex-row items-start" : "flex flex-col"
      }`}
    >
      {processes.map((process, index) => (
        <React.Fragment key={process.id}>
          <div className={`flex flex-col ${level === "4" ? "mb-1" : ""}`}>
            <ProcessBox
              id={process.id}
              level={level}
              name={process.name}
              isRoot={isRoot && index === 0} // Define se é o processo raiz
              isSelected={selectedId === process.id} // Verifica se o processo está selecionado
              onSelect={onSelect} // Função de seleção
              onEdit={onEdit} // Função de edição
              onMove={onMove} // Função de movimentação
              onDelete={onDelete} // Função de exclusão
            />
            {process.children && process.children.length > 0 && (
              <div
                className={`flex flex-col items-center ${
                  level === "4" ? "mt-1" : "mt-2"
                }`}
              >
                <VerticalLine /> {/* Renderiza a linha vertical */}
                <ProcessLevel
                  processes={process.children}
                  level={(parseInt(level) + 1).toString()}
                  selectedId={selectedId}
                  onSelect={onSelect}
                  onEdit={onEdit}
                  onMove={onMove}
                  onDelete={onDelete}
                />
              </div>
            )}
          </div>
          {index < processes.length - 1 && isHorizontal && (
            <ArrowRight /> // Renderiza a seta entre processos
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Componente principal da aplicação de diagrama de fluxo de processos
const ProcessFlowDiagramApp = () => {
  const [processes, setProcesses] = useState([]); // Estado para armazenar a lista de processos
  const [currentLevel, setCurrentLevel] = useState("1"); // Estado para armazenar o nível atual de processo
  const [processName, setProcessName] = useState(""); // Estado para armazenar o nome do processo sendo adicionado
  const [parentProcess, setParentProcess] = useState(""); // Estado para armazenar o processo pai selecionado
  const [error, setError] = useState(""); // Estado para armazenar mensagens de erro
  const [language, setLanguage] = useState("en"); // Estado para armazenar o idioma da aplicação
  const [title, setTitle] = useState(""); // Estado para armazenar o título do diagrama
  const [description, setDescription] = useState(""); // Estado para armazenar a descrição do diagrama
  const [isTitleSet, setIsTitleSet] = useState(false); // Estado para indicar se o título foi definido
  const [isEditingTitle, setIsEditingTitle] = useState(false); // Estado para controlar a edição do título
  const [selectedId, setSelectedId] = useState(null); // Estado para armazenar o ID do processo selecionado
  const fileInputRef = useRef(null); // Referência ao input de arquivo para importação
  const [isTutorialOpen, setIsTutorialOpen] = useState(false); // Estado para controlar a visibilidade do tutorial

  const t = translations[language]; // Obtenção das traduções com base no idioma atual

  // Função para alternar a visibilidade do tutorial
  const toggleTutorial = () => {
    setIsTutorialOpen((prev) => !prev);
  };

  // Função para adicionar um novo processo
  const addProcess = (name, parentId) => {
    const newProcess = {
      id: Date.now().toString(),
      level: currentLevel,
      name,
      children: [],
    };

    setProcesses((prevProcesses) => {
      if (currentLevel === "1") {
        return [...prevProcesses, newProcess]; // Adiciona o processo como raiz se for de nível 1
      } else {
        const updatedProcesses = [...prevProcesses];
        const addToParent = (items) => {
          for (let item of items) {
            if (item.id === parentId) {
              item.children.push(newProcess); // Adiciona o processo ao pai correspondente
              return true;
            }
            if (item.children && addToParent(item.children)) {
              return true;
            }
          }
          return false;
        };

        if (!addToParent(updatedProcesses)) {
          setError("Failed to add process. Please check the hierarchy."); // Exibe erro se não for possível adicionar
        }
        return updatedProcesses;
      }
    });
  };

  // Função para selecionar um processo
  const handleSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);

  // Função para editar o nome de um processo
  const handleEdit = useCallback((id, newName) => {
    setProcesses((prevProcesses) => {
      const updateProcess = (items) => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, name: newName }; // Atualiza o nome do processo
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

  // Função para mover um processo para um novo pai
  const handleMove = useCallback((draggedId, targetId) => {
    if (draggedId === targetId) return;

    setProcesses((prevProcesses) => {
      let draggedItem;
      const removeItem = (items) => {
        return items.filter((item) => {
          if (item.id === draggedId) {
            draggedItem = item; // Remove o item arrastado
            return false;
          }
          if (item.children) {
            item.children = removeItem(item.children);
          }
          return true;
        });
      };

      const addItem = (items) => {
        return items.map((item) => {
          if (item.id === targetId) {
            return {
              ...item,
              children: [...(item.children || []), draggedItem],
            }; // Adiciona o item ao novo pai
          }
          if (item.children) {
            return { ...item, children: addItem(item.children) };
          }
          return item;
        });
      };

      let newProcesses = removeItem(prevProcesses);
      return addItem(newProcesses); // Atualiza a estrutura dos processos
    });
  }, []);

  // Função para excluir um processo
  const handleDelete = useCallback((id) => {
    setProcesses((prevProcesses) => {
      const removeProcess = (items) => {
        return items
          .filter((item) => item.id !== id)
          .map((item) => ({
            ...item,
            children: removeProcess(item.children),
          }));
      };
      return removeProcess(prevProcesses);
    });
  }, []);

  // Função para alternar entre os idiomas
  const toggleLanguage = () => {
    setLanguage((lang) => (lang === "en" ? "pt" : "en"));
  };

  // Função para definir o título do diagrama
  const setProcessTitle = () => {
    if (title.trim()) {
      setIsTitleSet(true);
      setIsEditingTitle(false);
    }
  };

  // Função para iniciar a edição do título
  const editTitle = () => {
    setIsEditingTitle(true);
  };

  // Função para exportar o diagrama
  const handleExport = () => {
    exportProcessFlow(processes, title, description, t);
  };

  // Função para importar um diagrama a partir de um arquivo
  const handleImport = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    if (file.type !== "application/json") {
      alert(t.fileNotSupported); // Exibe alerta se o tipo de arquivo não for suportado
      event.target.value = ""; // Limpa o valor do input para permitir a seleção do mesmo arquivo novamente
      return;
    }

    importProcessFlow(event, setProcesses, setTitle, setDescription, t);
    setIsTitleSet(true); // Marca que o título foi definido após a importação
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-[#000000] text-[#b3b3b3] min-h-screen w-full p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <Link
            to="/"
            className="text-[#00ff9d] hover:text-[#00cc7d] flex items-center mb-4 sm:mb-0"
          >
            <ChevronLeft className="mr-2" /> {t.backToHome}
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold mb-2 text-[#ffffff]">
              {t.title}
            </h1>
            <p className="text-lg italic text-[#808080]">{t.subtitle}</p>
          </div>
          <button
            onClick={toggleLanguage}
            className="flex items-center bg-[#1a1a1a] text-[#b3b3b3] p-2 rounded hover:bg-[#333333] transition-colors duration-200"
          >
            <Globe className="mr-2" /> {language.toUpperCase()}
          </button>
        </div>
        <Tutorial
          language={language}
          isOpen={isTutorialOpen}
          toggleTutorial={toggleTutorial} // Passa a função como prop
        />
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
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
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
                  <h2 className="text-xl font-semibold text-[#ffffff] text-center">
                    {title}
                  </h2>
                  {description && (
                    <p className="text-[#cccccc] mt-1 text-center">
                      {description}
                    </p>
                  )}
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
              onDelete={handleDelete} // Passa a função de exclusão
              className="bg-[#0d0d0d] text-[#b3b3b3] border-[#333333]"
            />
          </div>
        )}
        {isTitleSet && (
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleExport}
              className="flex items-center bg-[#1a1a1a] hover:bg-[#333333] text-[#b3b3b3] p-2 rounded transition-colors duration-200"
            >
              <Download className="mr-2" /> {t.exportDiagram}
            </button>
            <button
              onClick={() => handleImportClick(fileInputRef)}
              className="flex items-center bg-[#1a1a1a] hover:bg-[#333333] text-[#b3b3b3] p-2 rounded transition-colors duration-200"
            >
              <Upload className="mr-2" /> {t.importDiagram}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              style={{ display: "none" }}
              accept=".json"
            />
          </div>
        )}
        <ContactSection /> {/* Moved ContactSection to the end */}
      </div>
    </DndProvider>
  );
};

export default ProcessFlowDiagramApp; // Exporta o componente para uso em outras partes da aplicação

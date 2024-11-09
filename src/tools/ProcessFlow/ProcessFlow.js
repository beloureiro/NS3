// ProcessFlowDiagramApp.js
import React, { useState, useCallback, useRef } from "react";
import { MoreVertical, Download, Upload } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { translations } from "./utils"; // Caminho corrigido para translations
import AddProcessForm from "./AddProcessForm";
import {
  exportProcessFlow,
  importProcessFlow,
  handleImportClick,
} from "./ProcessFlowExportImport";
import Tutorial from "./Tutorial"; // Importing the Tutorial component
import ContactSection from "../../AppComponents/ContactSection"; // Caminho corrigido para ContactSection

// Component to render an individual process box
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
  const [isEditing, setIsEditing] = useState(false); // State to control if the process name is being edited
  const [editedName, setEditedName] = useState(name); // State to store the process name during editing

  // Setup to make the component draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "process",
    item: { id, level }, // Information about the dragged item
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Controls the dragging state
    }),
  }));

  // Setup to make the component a drop target
  const [, drop] = useDrop(() => ({
    accept: "process", // Defines the type of item that can be dropped
    drop: (item) => onMove(item.id, id), // Function to call when an item is dropped
  }));

  // Function to determine the style of the box based on the process level
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

  // Function to start editing the name on double click
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // Function to finish editing the name on blur
  const handleBlur = () => {
    setIsEditing(false);
    onEdit(id, editedName); // Calls the edit function passed as prop
  };

  // Function to save the edit on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))} // Makes the element draggable and droppable
      className={`${getStyle()} ${isSelected ? "ring-2 ring-blue-500" : ""} ${
        isDragging ? "opacity-50" : ""
      }`} // Applies styles conditionally
      onClick={() => onSelect(id)} // Selects the process on click
      onDoubleClick={handleDoubleClick} // Starts editing on double click
      style={{ position: "relative" }} // For positioning the delete icon
    >
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)} // Updates the process name during editing
          onBlur={handleBlur} // Saves the edit on blur
          onKeyPress={handleKeyPress} // Saves the edit on Enter key press
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
        </span> // Displays the process name or an arrow if it's a level 5 item
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }} // Stops event propagation
        className="absolute top-1 right-1 text-red-500 opacity-0 hover:opacity-100 transition-opacity"
        style={{ transition: "opacity 0.2s" }} // Smooth transition
      >
        🗑️
      </button>
    </div>
  );
};

// Component to render a right-pointing arrow
const ArrowRight = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex items-center">
      <div className="w-8 h-0.5 bg-green-500"></div>
      <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-green-500"></div>
    </div>
  </div>
);

// Component to render a vertical line
const VerticalLine = () => <div className="w-0.5 h-4 bg-green-500 my-1"></div>;

// Main component to render a level of processes
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
  const isHorizontal = parseInt(level) <= 3; // Determines if the layout is horizontal or vertical

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
              isRoot={isRoot && index === 0} // Determines if it's the root process
              isSelected={selectedId === process.id} // Checks if the process is selected
              onSelect={onSelect} // Select function
              onEdit={onEdit} // Edit function
              onMove={onMove} // Move function
              onDelete={onDelete} // Delete function
            />
            {process.children && process.children.length > 0 && (
              <div
                className={`flex flex-col items-center ${
                  level === "4" ? "mt-1" : "mt-2"
                }`}
              >
                <VerticalLine /> {/* Renders the vertical line */}
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
          {index < processes.length - 1 && isHorizontal && <ArrowRight />}
        </React.Fragment>
      ))}
    </div>
  );
};

// Main application component for the process flow diagram
const ProcessFlowDiagramApp = ({ language = 'en' }) => {
  const [processes, setProcesses] = useState([]); // State to store the list of processes
  const [currentLevel, setCurrentLevel] = useState("1"); // State to store the current process level
  const [processName, setProcessName] = useState(""); // State to store the name of the process being added
  const [parentProcess, setParentProcess] = useState(""); // State to store the selected parent process
  const [error, setError] = useState(""); // State to store error messages
  const [title, setTitle] = useState(""); // State to store the diagram title
  const [description, setDescription] = useState(""); // State to store the diagram description
  const [isTitleSet, setIsTitleSet] = useState(false); // State to indicate if the title has been set
  const [isEditingTitle, setIsEditingTitle] = useState(false); // State to control title editing
  const [selectedId, setSelectedId] = useState(null); // State to store the selected process ID
  const fileInputRef = useRef(null); // Reference to the file input for import
  const [isTutorialOpen, setIsTutorialOpen] = useState(false); // State to control tutorial visibility

  const t = translations[language] || translations['en']; // Get translations based on the current language

  // Function to toggle the tutorial visibility
  const toggleTutorial = () => {
    setIsTutorialOpen((prev) => !prev);
  };

  // Function to add a new process
  const addProcess = (name, parentId) => {
    const newProcess = {
      id: Date.now().toString(),
      level: currentLevel,
      name,
      children: [],
    };

    setProcesses((prevProcesses) => {
      if (currentLevel === "1") {
        return [...prevProcesses, newProcess]; // Adds the process as root if level 1
      } else {
        const updatedProcesses = [...prevProcesses];
        const addToParent = (items) => {
          for (let item of items) {
            if (item.id === parentId) {
              item.children.push(newProcess); // Adds the process to the corresponding parent
              return true;
            }
            if (item.children && addToParent(item.children)) {
              return true;
            }
          }
          return false;
        };

        if (!addToParent(updatedProcesses)) {
          setError("Failed to add process. Please check the hierarchy."); // Displays error if unable to add
        }
        return updatedProcesses;
      }
    });
  };

  // Function to select a process
  const handleSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);

  // Function to edit the name of a process
  const handleEdit = useCallback((id, newName) => {
    setProcesses((prevProcesses) => {
      const updateProcess = (items) => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, name: newName }; // Updates the process name
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

  // Function to move a process to a new parent
  const handleMove = useCallback((draggedId, targetId) => {
    if (draggedId === targetId) return;

    setProcesses((prevProcesses) => {
      let draggedItem;
      const removeItem = (items) => {
        return items.filter((item) => {
          if (item.id === draggedId) {
            draggedItem = item; // Removes the dragged item
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
            }; // Adds the item to the new parent
          }
          if (item.children) {
            return { ...item, children: addItem(item.children) };
          }
          return item;
        });
      };

      let newProcesses = removeItem(prevProcesses);
      return addItem(newProcesses); // Updates the process structure
    });
  }, []);

  // Function to delete a process
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

  // Function to set the process diagram title
  const setProcessTitle = () => {
    if (title.trim()) {
      setIsTitleSet(true);
      setIsEditingTitle(false);
    }
  };

  // Function to start editing the title
  const editTitle = () => {
    setIsEditingTitle(true);
  };

  // Function to export the diagram
  const handleExport = () => {
    exportProcessFlow(processes, title, description, t);
  };

  // Function to import a diagram from a file
  const handleImport = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    if (file.type !== "application/json") {
      alert(t.fileNotSupported); // Alerts if the file type is not supported
      event.target.value = ""; // Clears the input value to allow re-selection
      return;
    }

    importProcessFlow(event, setProcesses, setTitle, setDescription, t);
    setIsTitleSet(true); // Marks the title as set after import
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-[#000000] text-[#b3b3b3] w-full p-4 pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Header section with updated title color */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00ff9d] to-[#00cc7d] text-transparent bg-clip-text">
                {t.title}
              </h1>
              <p className="text-lg italic text-[#808080]">{t.subtitle}</p>
            </div>
          </div>
          {/* Tutorial component */}
          <Tutorial
            language={language}
            isOpen={isTutorialOpen}
            toggleTutorial={toggleTutorial}
          />
          {/* Form to set the process title and description */}
          <div className="w-full bg-[#1a1a1a] text-[#b3b3b3] p-6 rounded-lg shadow-lg mb-6 border border-[#333333]">
            {!isTitleSet ? (
              <div className="mb-4">
                {/* Input for process title */}
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.enterProcessTitle}
                  className="w-full bg-[#0d0d0d] text-[#b3b3b3] border border-[#333333] p-2 rounded mb-4 focus:border-[#00ff9d] focus:outline-none"
                />
                {/* Textarea for process description */}
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t.enterProcessDescription}
                  className="w-full bg-[#0d0d0d] text-[#b3b3b3] border border-[#333333] p-2 rounded mb-4 focus:border-[#00ff9d] focus:outline-none"
                />
                <div className="flex justify-between items-center">
                  {/* Button to set the title */}
                  <button
                    onClick={setProcessTitle}
                    className="bg-[#00cc7d] hover:bg-[#00ff9d] text-[#000000] font-medium p-2 rounded transition-colors duration-200"
                  >
                    {t.setProcessTitle}
                  </button>
                  {/* Button to import a diagram */}
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
              /* Form to add a new process */
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
          {/* Display the process title and description */}
          {isTitleSet && (
            <div className="w-full bg-[#1a1a1a] text-[#b3b3b3] p-6 rounded-lg shadow-lg mb-5 relative border border-[#333333]">
              {isEditingTitle ? (
                <div className="mb-4">
                  {/* Input fields to edit title and description */}
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
          {/* Display the process flow diagram */}
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
                onDelete={handleDelete}
                className="bg-[#0d0d0d] text-[#b3b3b3] border-[#333333]"
              />
            </div>
          )}
          {/* Export and Import buttons */}
          {isTitleSet && (
            <div className="flex justify-end space-x-2 mb-2">
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
          {/* Contact section */}
          <div className="mt-8">
            <ContactSection />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ProcessFlowDiagramApp;

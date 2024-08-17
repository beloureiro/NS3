import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ProcessLevel } from './ProcessComponents';

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
    let style = 'p-2 text-center rounded min-w-[120px] shadow-md ';
    if (isRoot) {
      style += 'text-white font-bold ';
    }
    switch (level) {
      case '1': return style + 'bg-gray-700 text-white font-bold';
      case '2': return style + 'bg-gray-600 text-white';
      case '3': return style + 'bg-gray-500 text-white';
      case '4': return style + 'bg-gray-400 text-white';
      case '5': return name === 'Task' ? 'text-white' : style + 'bg-gray-800 text-white';
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
        name
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

// Componente para renderizar uma linha vertical
const VerticalLine = () => (
  <div className="w-0.5 h-4 bg-green-500 my-1"></div>
);

// Componente principal para renderizar um nível do processo
const ProcessLevel = ({ processes, level, isRoot = false, selectedId, onSelect, onEdit, onMove }) => (
  <div className={`relative ${parseInt(level) <= 3 && !isRoot ? 'flex flex-row items-start' : 'flex flex-col'}`}>
    {processes.map((process, index) => (
      <React.Fragment key={process.id}>
        <div className="flex flex-col">
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
            <div className="flex flex-col items-center mt-2">
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
        {index < processes.length - 1 && parseInt(level) <= 3 && !isRoot && (
          <ArrowRight />
        )}
      </React.Fragment>
    ))}
  </div>
);
export { ProcessLevel };
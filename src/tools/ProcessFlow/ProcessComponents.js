import React from 'react';

// Componente para renderizar uma caixa de processo individual
const ProcessBox = ({ level, name, isRoot, children }) => {
  // Função para determinar o estilo da caixa baseado no nível e se é raiz
  const getStyle = () => {
    if (isRoot) {
      return 'text-white font-bold';
    }
    switch (level) {
      case '1': return 'bg-gray-700 text-white font-bold';
      case '2': return 'bg-gray-600 text-white';
      case '3': return 'bg-gray-500 text-white';
      case '4': return 'bg-gray-400 text-white';
      case '5': return name === 'Task' ? 'text-white' : 'bg-gray-800 text-white';
      default: return 'bg-gray-200 text-black';
    }
  };

  const isTask = level === '5' && name === 'Task';

  return (
    <div className={`flex flex-col ${isRoot ? '' : 'mb-2'}`}>
      {isTask ? (
        <div className="text-white">{name}</div>
      ) : (
        <div className={`p-2 text-center ${getStyle()} ${isRoot ? '' : 'rounded min-w-[120px] shadow-md'}`}>
          {name}
        </div>
      )}
      {children}
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
const ProcessLevel = ({ processes, level, isRoot = false }) => (
  <div className={`relative ${parseInt(level) <= 3 && !isRoot ? 'flex flex-row items-start' : 'flex flex-col'}`}>
    {processes.map((process, index) => (
      <React.Fragment key={index}>
        <div className="flex flex-col">
          <ProcessBox level={level} name={process.name} isRoot={isRoot && index === 0} />
          {process.children && process.children.length > 0 && (
            <div className="flex flex-col items-center mt-2">
              <VerticalLine />
              <ProcessLevel processes={process.children} level={(parseInt(level) + 1).toString()} />
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

// Exportamos ProcessLevel como uma exportação nomeada e padrão
export { ProcessLevel };
export default ProcessLevel;
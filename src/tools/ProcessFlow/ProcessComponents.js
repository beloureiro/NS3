/*
  Este arquivo define componentes React que são usados para renderizar um diagrama de fluxo de processos hierárquicos.
  Ele permite que o usuário visualize diferentes níveis de um processo (como Macroprocesso, Processo, Subprocesso, etc.) 
  e suas relações hierárquicas (pai-filho). As personalizações possíveis incluem:

  - **Estilo dos Caixas de Processo**: Alterar as cores, estilos de fontes e layout de cada caixa de processo, dependendo do nível do processo.
  - **Representação de Hierarquia**: Modificar a forma como os diferentes níveis de processos e suas conexões (setas e linhas) são exibidos.
  - **Componente Reutilizável**: O componente `ProcessBox` e `ProcessLevel` podem ser reutilizados ou ajustados para representar diferentes tipos de dados hierárquicos.
  - **Renderização Condicional**: Você pode ajustar como e quando certos elementos são exibidos com base nas propriedades passadas para os componentes.

  Este arquivo é essencial para a visualização do fluxo de processos dentro do aplicativo.
*/

import React from 'react'; // Importa a biblioteca React para criar componentes

// Define um componente chamado ProcessBox que representa uma única caixa no fluxo de processo
const ProcessBox = ({ level, name, isRoot, children }) => {
  // Função para determinar o estilo da caixa com base no seu nível e se é um processo raiz
  const getStyle = () => {
    if (isRoot) { // Se o processo é o processo raiz, ele recebe um estilo especial
      return 'text-white font-bold'; // Texto branco com fonte em negrito
    }
    // Switch para retornar diferentes estilos dependendo do nível do processo
    switch (level) {
      case '1': return 'bg-gray-700 text-white font-bold'; // Fundo cinza escuro, texto branco em negrito para nível 1
      case '2': return 'bg-gray-600 text-white'; // Fundo cinza um pouco mais claro, texto branco para nível 2
      case '3': return 'bg-gray-500 text-white'; // Fundo cinza médio, texto branco para nível 3
      case '4': return 'bg-gray-400 text-white'; // Fundo cinza claro, texto branco para nível 4
      case '5': return name === 'Task' ? 'text-white' : 'bg-gray-800 text-white'; // Para nível 5, texto branco ou fundo cinza escuro, dependendo do nome
      default: return 'bg-gray-200 text-black'; // Estilo padrão para qualquer outro caso
    }
  };

  const isTask = level === '5' && name === 'Task'; // Verifica se a caixa representa uma Tarefa no nível 5

  return (
    // A div principal para a caixa de processo, com layout flexível para diferentes casos
    <div className={`flex flex-col ${isRoot ? '' : 'mb-2'}`}>
      {isTask ? ( // Se for uma Tarefa, apenas mostra o nome com texto branco
        <div className="text-white">{name}</div>
      ) : (
        // Caso contrário, aplica os estilos e mostra o nome do processo dentro de uma div estilizada
        <div className={`p-2 text-center ${getStyle()} ${isRoot ? '' : 'rounded min-w-[120px] shadow-md'}`}>
          {name}
        </div>
      )}
      {children} {/* Renderiza qualquer filho passado para este componente, permitindo estruturas aninhadas */}
    </div>
  );
};

// Define um componente para desenhar uma seta apontando para a direita, usada para indicar o fluxo entre processos
const ArrowRight = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex items-center">
      <div className="w-8 h-0.5 bg-green-500"></div> {/* Linha horizontal para a haste da seta */}
      <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-green-500"></div> {/* Parte triangular da seta */}
    </div>
  </div>
);

// Define um componente para desenhar uma linha vertical, usada para indicar conexões hierárquicas
const VerticalLine = () => (
  <div className="w-0.5 h-4 bg-green-500 my-1"></div> // Uma curta linha vertical verde
);

// Define um componente para representar um nível na hierarquia de processos
export const ProcessLevel = ({ processes, level, isRoot = false }) => (
  // Contêiner principal para o nível, com layout condicional baseado no número do nível
  <div className={`relative ${parseInt(level) <= 3 && !isRoot ? 'flex flex-row items-start' : 'flex flex-col'}`}>
    {processes.map((process, index) => (
      // Itera sobre cada processo no nível e renderiza sua caixa e filhos
      <React.Fragment key={index}>
        <div className="flex flex-col">
          {/* Renderiza uma ProcessBox para cada processo */}
          <ProcessBox level={level} name={process.name} isRoot={isRoot && index === 0} />
          {/* Se o processo tem filhos, renderiza recursivamente outro ProcessLevel para eles */}
          {process.children && process.children.length > 0 && (
            <div className="flex flex-col items-center mt-2">
              <VerticalLine /> {/* Linha conectando ao nível filho */}
              <ProcessLevel processes={process.children} level={(parseInt(level) + 1).toString()} />
            </div>
          )}
        </div>
        {/* Renderiza uma seta entre processos irmãos no mesmo nível */}
        {index < processes.length - 1 && parseInt(level) <= 3 && !isRoot && (
          <ArrowRight />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default ProcessLevel; // Exporta o componente ProcessLevel como a exportação padrão deste módulo

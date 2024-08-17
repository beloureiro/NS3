/*
  Este arquivo contém utilitários e dados de tradução que suportam o funcionamento do aplicativo de construção de diagramas de fluxo de processo.
  
  Funcionalidades:
  - **flattenProcesses**: Esta função é utilizada para "achatar" uma estrutura de processos hierárquicos, transformando-a em um array simples, que contém todos os processos, incluindo aqueles que estão aninhados.
  - **getEligibleParents**: Esta função identifica quais processos em um determinado nível hierárquico podem ser considerados "pais" para novos processos que estão sendo adicionados.
  - **translations**: Este objeto contém as traduções para os textos usados na interface do aplicativo, suportando inglês (en) e português (pt). Você pode adicionar ou modificar traduções conforme necessário.

  Este arquivo é importante para manipular a estrutura hierárquica dos processos e para suportar a internacionalização do aplicativo.
*/

export const flattenProcesses = (processes) => {
  return processes.reduce((acc, process) => {
    acc.push(process);
    if (process.children) {
      acc.push(...flattenProcesses(process.children));
    }
    return acc;
  }, []);
};

export const getEligibleParents = (processes, currentLevel) => {
  const currentLevelInt = parseInt(currentLevel);
  return flattenProcesses(processes).filter(p => {
    const parentLevel = parseInt(p.level);
    return parentLevel === currentLevelInt - 1;
  });
};

export const translations = {
  en: {
    backToHome: "Back",
    title: "Process Flow Diagram Builder",
    subtitle: "Design your process in a structured way.",
    placeholder: "name...",
    addProcess: "Add",
    selectParent: "Select parent stage",
    setProcessTitle: "Set Title",
    editTitle: "Edit",
    enterProcessTitle: "Enter process title",
    enterProcessDescription: "Enter process description (optional)",
    exportDiagram: "Export Diagram", // Texto para o botão de exportar
    importDiagram: "Import Diagram", // Texto para o botão de importar (se necessário)
    fileNotSupported: "File type not supported. Please upload a JSON file.", // Tradução adicional
    importSuccess: "Import successful!", // Tradução adicional
    importError: "Error importing file. Please check the file format." // Tradução adicional
  },
  pt: {
    backToHome: "Voltar",
    title: "Construtor de Fluxo de Processo",
    subtitle: "Desenhe seu processo de forma estruturada.",
    placeholder: "nome...",
    addProcess: "Adicionar",
    selectParent: "Selecione o parente da etapa",
    setProcessTitle: "Definir Título",
    editTitle: "Editar",
    enterProcessTitle: "Digite o título do processo",
    enterProcessDescription: "Digite a descrição do processo (opcional)",
    exportDiagram: "Exportar Diagrama", // Texto para o botão de exportar
    importDiagram: "Importar Diagrama", // Texto para o botão de importar (se necessário)
    fileNotSupported: "Tipo de arquivo não suportado. Por favor, faça upload de um arquivo JSON.", // Tradução adicional
    importSuccess: "Importação bem-sucedida!", // Tradução adicional
    importError: "Erro ao importar o arquivo. Por favor, verifique o formato do arquivo." // Tradução adicional
  },
};

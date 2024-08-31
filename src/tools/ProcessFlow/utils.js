/*
  Este arquivo contém utilitários e dados de tradução que suportam o funcionamento do aplicativo de construção de diagramas de fluxo de processo.
  
  Funcionalidades:
  - **flattenProcesses**: Esta função é utilizada para "achatar" uma estrutura de processos hierárquicos, transformando-a em um array simples, que contém todos os processos, incluindo aqueles que estão aninhados.
  - **getEligibleParents**: Esta função identifica quais processos em um determinado nível hierárquico podem ser considerados "pais" para novos processos que estão sendo adicionados.
  - **translations**: Este objeto contém as traduções para os textos usados na interface do aplicativo, suportando inglês (en), português (pt) e outros idiomas conforme necessário.

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
    exportDiagram: "Export Diagram",
    importDiagram: "Import Diagram",
    fileNotSupported: "File type not supported. Please upload a JSON file.",
    importSuccess: "Import successful!",
    importError: "Error importing file. Please check the file format.",
    tutorialStep1: "Set the title for the process you manage or own.",
    tutorialStep2: "Add a subtitle that briefly describes the process.",
    tutorialStep3: "Use the BPMN methodology to create your diagram. Remember that there is a hierarchy and levels of process modeling.",
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
    exportDiagram: "Exportar Diagrama",
    importDiagram: "Importar Diagrama",
    fileNotSupported: "Tipo de arquivo não suportado. Por favor, faça upload de um arquivo JSON.",
    importSuccess: "Importação bem-sucedida!",
    importError: "Erro ao importar o arquivo. Por favor, verifique o formato do arquivo.",
    tutorialStep1: "Defina o título do processo que você gerencia ou do qual é responsável.",
    tutorialStep2: "Adicione um subtítulo que descreva brevemente o processo.",
    tutorialStep3: "Utilize a metodologia BPMN para criar seu diagrama. Lembre-se que há uma hierarquia e níveis de modelagem de processos.",
  },
};

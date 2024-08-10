/*
  Este arquivo contém utilitários e dados de tradução que suportam o funcionamento do aplicativo de construção de diagramas de fluxo de processo.
  
  Funcionalidades:
  - **flattenProcesses**: Esta função é utilizada para "achatar" uma estrutura de processos hierárquicos, transformando-a em um array simples, que contém todos os processos, incluindo aqueles que estão aninhados.
  - **getEligibleParents**: Esta função identifica quais processos em um determinado nível hierárquico podem ser considerados "pais" para novos processos que estão sendo adicionados.
  - **translations**: Este objeto contém as traduções para os textos usados na interface do aplicativo, suportando inglês (en) e português (pt). Você pode adicionar ou modificar traduções conforme necessário.

  Este arquivo é importante para manipular a estrutura hierárquica dos processos e para suportar a internacionalização do aplicativo.
*/

export const flattenProcesses = (processes) => {
    // A função flattenProcesses recebe um array de processos e retorna um array "achatado"
    return processes.reduce((acc, process) => {
      // Adiciona o processo atual ao array acumulador
      acc.push(process);
      // Se o processo atual tiver filhos, chama recursivamente flattenProcesses para achatar os filhos
      if (process.children) {
        acc.push(...flattenProcesses(process.children));
      }
      // Retorna o array acumulador atualizado
      return acc;
    }, []); // Inicializa o array acumulador como vazio
  };
  
  export const getEligibleParents = (processes, currentLevel) => {
    // A função getEligibleParents retorna os processos que podem ser pais no nível atual
    const currentLevelInt = parseInt(currentLevel); // Converte o nível atual de string para número inteiro
    // Usa a função flattenProcesses para obter todos os processos em um único array e filtra para encontrar os pais elegíveis
    return flattenProcesses(processes).filter(p => {
      const parentLevel = parseInt(p.level); // Converte o nível do processo pai para número inteiro
      // Retorna true se o nível do processo pai for exatamente um nível acima do nível atual
      return parentLevel === currentLevelInt - 1;
    });
  };
  
  export const translations = {
    // Objeto que contém traduções para a interface do usuário em diferentes idiomas
    en: {
      backToHome: "Back", // Tradução para "Voltar para o início"
      title: "Process Flow Diagram Builder", // Tradução para o título "Construtor de Diagrama de Fluxo de Processo"
      subtitle: "Design your process in a structured way.", // Tradução para o subtítulo
      placeholder: "name...", // Texto placeholder para campos de entrada de nome
      addProcess: "Add", // Texto do botão para adicionar um processo
      selectParent: "Select parent stage", // Texto para selecionar a etapa pai
      setProcessTitle: "Set Title", // Texto para definir o título do processo
      editTitle: "Edit", // Texto para editar o título do processo
      enterProcessTitle: "Enter process title", // Texto para entrada de título do processo
      enterProcessDescription: "Enter process description (optional)" // Texto para entrada de descrição do processo
    },
    pt: {
      backToHome: "Voltar", // Tradução para "Voltar para o início"
      title: "Contrutor de Fluxo de Processo", // Tradução para o título "Construtor de Fluxo de Processo"
      subtitle: "Desenhe seu processo de forma estruturada.", // Tradução para o subtítulo
      placeholder: "nome...", // Texto placeholder para campos de entrada de nome
      addProcess: "Ad", // Texto do botão para adicionar um processo
      selectParent: "Selecione o parente da etapa", // Texto para selecionar a etapa pai
      setProcessTitle: "Definir Título", // Texto para definir o título do processo
      editTitle: "Editar", // Texto para editar o título do processo
      enterProcessTitle: "Digite o título do processo", // Texto para entrada de título do processo
      enterProcessDescription: "Digite a descrição do processo (opcional)" // Texto para entrada de descrição do processo
    },
  };
  
// ProcessFlowExportImport.js

// Função para exportar o fluxo de processos como um arquivo JSON
export const exportProcessFlow = (processes, title, description, t) => {
  // Cria um objeto contendo os processos, título e descrição
  const data = {
    processes,
    title,
    description
  };

  // Converte o objeto para uma string JSON formatada
  const jsonString = JSON.stringify(data, null, 2);

  // Cria um Blob com o conteúdo JSON e define o tipo de arquivo como 'application/json'
  const blob = new Blob([jsonString], { type: 'application/json' });

  // Gera uma URL temporária para o Blob
  const url = URL.createObjectURL(blob);
  
  // Cria um nome de arquivo usando a data e hora atuais
  const now = new Date();
  const dateString = now.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
  const timeString = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // Formato: HH-MM-SS
  const fileName = `InMotion-ProcessFlowBuilder-${dateString}-${timeString}.json`;
  
  // Cria um link temporário para download do arquivo
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;

  // Adiciona o link ao corpo do documento, clica nele para iniciar o download, e remove o link em seguida
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoga a URL temporária para liberar a memória
  URL.revokeObjectURL(url);
};

// Função para importar um fluxo de processos de um arquivo JSON
export const importProcessFlow = (event, setProcesses, setTitle, setDescription, t) => {
  // Obtém o arquivo selecionado pelo usuário
  const file = event.target.files && event.target.files[0];
  if (!file) {
    console.error('No file selected'); // Exibe um erro no console se nenhum arquivo for selecionado
    return;
  }

  // Verifica se o tipo de arquivo é JSON
  if (file.type !== 'application/json') {
    alert(t.fileNotSupported); // Exibe um alerta se o arquivo não for do tipo JSON
    return;
  }

  // Cria um leitor de arquivo para ler o conteúdo do arquivo selecionado
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      // Tenta analisar o conteúdo JSON do arquivo
      const data = JSON.parse(e.target.result);

      // Se os dados incluem processos, título e descrição, atualiza os estados correspondentes
      if (data.processes && Array.isArray(data.processes)) {
        setProcesses(data.processes);
      }
      if (data.title) {
        setTitle(data.title);
      }
      if (data.description) {
        setDescription(data.description);
      }

      // Exibe uma mensagem de sucesso ao usuário
      alert(t.importSuccess);
    } catch (error) {
      // Exibe um erro no console e um alerta ao usuário se houver um problema ao analisar o JSON
      console.error("Error parsing JSON:", error);
      alert(t.importError);
    }
  };

  // Lê o conteúdo do arquivo como texto
  reader.readAsText(file);
};

// Função para disparar o clique no input de arquivo para importação
export const handleImportClick = (fileInputRef) => {
  if (fileInputRef.current) {
    fileInputRef.current.click(); // Dispara o clique no input de arquivo
  }
};

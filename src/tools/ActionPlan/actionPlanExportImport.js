// actionPlanExportImport.js

// Função para exportar o plano de ação
export const exportActionPlan = (plans, currentPlan, currentQuestion, t) => {
    // Cria um objeto com os dados que precisam ser exportados
    const data = {
        plans, // Planos de ação
        currentPlan, // Plano atualmente selecionado
        currentQuestion, // Questão atual
    };

    // Converte o objeto em uma string JSON formatada
    const jsonString = JSON.stringify(data, null, 2);

    // Cria um Blob (um objeto que representa um arquivo) a partir da string JSON
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Cria uma URL temporária para o Blob
    const url = URL.createObjectURL(blob);

    // Gera um nome de arquivo baseado na data e hora atuais
    const now = new Date();
    const dateString = now.toISOString().split('T')[0]; // Data no formato YYYY-MM-DD
    const timeString = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // Hora no formato HH-MM-SS
    const fileName = `InMotion-ActionPlan-${dateString}-${timeString}.json`; // Nome do arquivo

    // Cria um link <a> para permitir o download do arquivo
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Define o nome do arquivo para download
    document.body.appendChild(link); // Adiciona o link ao DOM
    link.click(); // Simula um clique no link para iniciar o download
    document.body.removeChild(link); // Remove o link do DOM após o clique
    URL.revokeObjectURL(url); // Libera a URL temporária criada
};

// Função para importar um plano de ação a partir de um arquivo JSON
export const importActionPlan = (event, setPlans, setCurrentPlan, setCurrentQuestion, t) => {
    // Obtém o arquivo selecionado pelo usuário
    const file = event.target.files && event.target.files[0];
    if (!file) {
        console.error('No file selected'); // Exibe um erro no console se nenhum arquivo for selecionado
        return;
    }

    // Verifica se o arquivo é do tipo JSON
    if (file.type !== 'application/json') {
        alert(t.fileNotSupported); // Mostra uma mensagem de erro se o arquivo não for JSON
        return;
    }

    // Cria um leitor de arquivos para ler o conteúdo do arquivo selecionado
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            // Tenta converter o conteúdo do arquivo de volta para um objeto JavaScript
            const data = JSON.parse(e.target.result);
            
            // Atualiza os planos de ação se os dados importados forem válidos
            if (data.plans && Array.isArray(data.plans)) {
                setPlans(data.plans);
            }
            
            // Atualiza o plano atual se o dado importado for válido
            if (typeof data.currentPlan === 'number') {
                setCurrentPlan(data.currentPlan);
            }

            // Atualiza a questão atual se o dado importado for válido
            if (typeof data.currentQuestion === 'number') {
                setCurrentQuestion(data.currentQuestion);
            }

            // Informa o sucesso da importação
            alert(t.importSuccess);
        } catch (error) {
            console.error('Error parsing JSON:', error); // Exibe um erro no console se a leitura do JSON falhar
            alert(t.importError); // Mostra uma mensagem de erro ao usuário
        }
    };

    // Lê o arquivo como texto
    reader.readAsText(file);
};

// Função para simular o clique no campo de entrada de arquivo, para facilitar a seleção de arquivos
export const handleImportClick = (fileInputRef) => {
    if (fileInputRef.current) {
        fileInputRef.current.click(); // Simula o clique no campo de input de arquivos
    }
};

const translations = {
  // Traduções em inglês
  en: {
    title: "Action Plan", // Título da aplicação em inglês
    subtitle: "Plan your actions in a structured and efficient way", // Subtítulo explicativo em inglês
    // Conjunto de perguntas para guiar o usuário através do plano de ação
    questions: [
      { key: 'what', question: 'What will be done?' }, // "O que será feito?"
      { key: 'why', question: 'Why will it be done?' }, // "Por que será feito?"
      { key: 'where', question: 'Where will it be done?' }, // "Onde será feito?"
      { key: 'when', question: 'When will it be done?' }, // "Quando será feito?"
      { key: 'who', question: 'Who will do it?' }, // "Quem fará?"
      { key: 'how', question: 'How will it be done?' }, // "Como será feito?"
      { key: 'howMuch', question: 'How much will it cost?' }, // "Quanto custará?"
      { key: 'urgency', question: 'How urgent is it?' }, // "Qual a urgência?"
      { key: 'importance', question: 'How important is it?' } // "Qual a importância?"
    ],
    previous: "Previous", // Texto para o botão "Anterior"
    next: "Next", // Texto para o botão "Próxima"
    addNewAction: "Add New Action", // Texto para o botão "Adicionar Nova Ação"
    complete: "Complete", // Texto para o botão "Concluir"
    restart: "Restart", // Texto para o botão "Recomeçar"
    actionPlan: "Action Plan", // Texto para o botão "Plano de Ação"
    backToHome: "Back", // Texto para o botão "Voltar"
    totalActions: "Total Actions", // Texto indicando o total de ações
    actionOverview: "Action Overview", // Texto para "Visão Geral das Ações"
    chartDescription: "Finding actions with short deadlines in the red quadrant may indicate you're getting distracted by tasks that aren't urgent. Likewise, if truly important and urgent actions have long deadlines, there might be a prioritization issue or a lack of understanding of the process.", // Descrição do gráfico em inglês
    urgency: "Urgency", // Texto "Urgência"
    importance: "Importance", // Texto "Importância"
    urgencyLevels: ['Low', 'Medium', 'High'], // Níveis de urgência
    importanceLevels: ['Low', 'Medium', 'High'], // Níveis de importância
    fieldRequired: "This field is required", // Mensagem de campo obrigatório
    invalidDate: "Please enter a valid future date", // Mensagem para data inválida
    inputPlaceholder: "Enter your answer...", // Placeholder para o campo de entrada
    restartConfirmTitle: "Restart Action Plan", // Título de confirmação para reiniciar o plano
    restartConfirmMessage: "Are you sure you want to restart? This will delete all your current actions.", // Mensagem de confirmação para reiniciar o plano
    cancel: "Cancel", // Texto para o botão "Cancelar"
    confirm: "Confirm", // Texto para o botão "Confirmar"
    export: "Export", // Texto para o botão "Exportar"
    import: "Import", // Texto para o botão "Importar"
    fileNotSupported: "File type not supported. Please select a JSON file.", // Mensagem para tipo de arquivo não suportado
    importSuccess: "Action plan imported successfully!", // Mensagem de sucesso ao importar
    importError: "Error importing action plan. Please try again.", // Mensagem de erro ao importar
  },
  // Traduções em português
  pt: {
    title: "Plano de Ação", // Título da aplicação em português
    subtitle: "Planeje suas ações de forma estruturada e eficiente", // Subtítulo explicativo em português
    // Conjunto de perguntas para guiar o usuário através do plano de ação
    questions: [
      { key: 'what', question: 'O que será feito?' }, // "What will be done?"
      { key: 'why', question: 'Por que será feito?' }, // "Why will it be done?"
      { key: 'where', question: 'Onde será feito?' }, // "Where will it be done?"
      { key: 'when', question: 'Quando será feito?' }, // "When will it be done?"
      { key: 'who', question: 'Quem fará?' }, // "Who will do it?"
      { key: 'how', question: 'Como será feito?' }, // "How will it be done?"
      { key: 'howMuch', question: 'Quanto custará?' }, // "How much will it cost?"
      { key: 'urgency', question: 'Qual a urgência?' }, // "How urgent is it?"
      { key: 'importance', question: 'Qual a importância?' } // "How important is it?"
    ],
    previous: "Anterior", // Texto para o botão "Previous"
    next: "Próxima", // Texto para o botão "Next"
    addNewAction: "Adicionar Nova Ação", // Texto para o botão "Add New Action"
    complete: "Concluir", // Texto para o botão "Complete"
    restart: "Recomeçar", // Texto para o botão "Restart"
    actionPlan: "Plano de Ação", // Texto para o botão "Action Plan"
    backToHome: "Voltar", // Texto para o botão "Back"
    totalActions: "Total de Ações", // Texto indicando o total de ações
    actionOverview: "Visão Geral das Ações", // Texto para "Action Overview"
    chartDescription: "Encontrar ações com prazos curtos no quadrante vermelho pode indicar que você está se distraindo com tarefas que não são urgentes. Da mesma forma, se ações realmente importantes e urgentes têm prazos longos, pode haver um problema de priorização ou compreensão do processo.", // Descrição do gráfico em português
    urgency: "Urgência", // Texto "Urgency"
    importance: "Importância", // Texto "Importance"
    urgencyLevels: ['Baixa', 'Média', 'Alta'], // Níveis de urgência
    importanceLevels: ['Baixa', 'Média', 'Alta'], // Níveis de importância
    fieldRequired: "Este campo é obrigatório", // Mensagem de campo obrigatório
    invalidDate: "Por favor, insira uma data futura válida", // Mensagem para data inválida
    inputPlaceholder: "Digite sua resposta...", // Placeholder para o campo de entrada
    restartConfirmTitle: "Reiniciar Plano de Ação", // Título de confirmação para reiniciar o plano
    restartConfirmMessage: "Tem certeza que deseja reiniciar? Isso irá deletar todas as suas ações atuais.", // Mensagem de confirmação para reiniciar o plano
    cancel: "Cancelar", // Texto para o botão "Cancel"
    confirm: "Confirmar", // Texto para o botão "Confirm"
    export: "Exportar", // Texto para o botão "Export"
    import: "Importar", // Texto para o botão "Import"
    fileNotSupported: "Tipo de arquivo não suportado. Por favor, selecione um arquivo JSON.", // Mensagem para tipo de arquivo não suportado
    importSuccess: "Plano de ação importado com sucesso!", // Mensagem de sucesso ao importar
    importError: "Erro ao importar o plano de ação. Por favor, tente novamente.", // Mensagem de erro ao importar
  }
};

export default translations;

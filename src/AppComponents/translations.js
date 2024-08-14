// O objeto 'translations' contém todas as traduções para os idiomas suportados pelo aplicativo.
// Cada chave (por exemplo, 'en', 'pt', 'fr') representa um idioma e contém um conjunto de traduções específicas para aquele idioma.
const translations = {
  en: {
    // Esta seção contém as traduções para o idioma inglês.
    
    // Título principal exibido na página inicial do aplicativo.
    title: "Solution in Business Management",

    // Descrição da aplicação, que aparece nas meta tags para SEO e também pode ser usada em outros lugares.
    description: "Your Daily Toolbox for Business Excellence",

    // Título de uma seção que descreve as áreas de especialização da empresa.
    ourExpertise: "Our Expertise",

    // Descrição detalhada da seção que fala sobre a expertise da empresa, destacando as áreas de atuação e as habilidades oferecidas.
    expertiseDescription: "Explore our dynamic range of skills across key business domains. Our expertise is tailored to elevate your business performance through innovative solutions and strategic insights.",

    // Texto de chamada para ação, incentivando os visitantes a transformarem seus negócios.
    transformBusiness: "Transform Your Business Today",

    // Seção que contém as ferramentas rápidas disponíveis no aplicativo.
    quickTools: {
      // Título da seção de ferramentas rápidas.
      title: "Quick Tools",

      // Nome da primeira ferramenta, que ajuda a tomar decisões usando uma matriz de decisão.
      decisionHelper: "Decision Matrix",

      // Nome da segunda ferramenta, que é um plano de ação estruturado (método 5W2H).
      actionPlan: "Action Plan",

      // Nome da terceira ferramenta, que descreve o fluxo de processo em um negócio.
      processFlow: "Process Flow",

      // Frase curta associada à ferramenta "Process Flow", que ajuda os usuários a entender o propósito da ferramenta.
      phraseProcessFlow: "Where am I?",

      // Frase curta associada à ferramenta "Decision Matrix", para guiar os usuários sobre o que esperar.
      phraseDecisionMatrix: "Where should I go?",

      // Frase curta associada à ferramenta "Action Plan", que orienta os usuários sobre como usar a ferramenta.
      phraseActionPlan: "How will I get there?",
    },

    // Texto que aparece no botão que abre a seção de ferramentas rápidas.
    quickToolsButton: "Quick Tools",

    // Seção que lista as diferentes áreas de expertise da empresa.
    expertiseAreas: {
      // Primeira área de expertise: Gestão Empresarial.
      businessManagement: "Business Management",

      // Segunda área de expertise: Análise de Dados e Tecnologia.
      dataAnalysis: "Data Analysis & Technology",

      // Terceira área de expertise: Consultoria e Ensino.
      consultingTeaching: "Consulting & Teaching",

      // Quarta área de expertise: Design e Inovação.
      designInnovation: "Design & Innovation",

      // Quinta área de expertise: Liderança Saudável.
      healthLeadership: "Healthy Leadership",

      // Subseção que descreve as habilidades específicas dentro de cada área de expertise.
      skills: {
        // Habilidades dentro da área de Gestão Empresarial.
        businessManagement: [
          "Operational Management", // Gestão Operacional
          "Process Improvement", // Melhoria de Processos
          "Strategic Planning", // Planejamento Estratégico
          "Financial Analysis", // Análise Financeira
          "Project Management", // Gestão de Projetos
          "Customer Satisfaction" // Satisfação do Cliente
        ],

        // Habilidades dentro da área de Análise de Dados e Tecnologia.
        dataAnalysis: [
          "Business Intelligence", // Inteligência de Negócios
          "Microsoft Power BI", // Ferramenta de análise de dados Power BI
          "Data Modeling", // Modelagem de Dados
          "Python Programming", // Programação em Python
          "Advanced Excel", // Excel Avançado
          "Artificial Intelligence" // Inteligência Artificial
        ],

        // Habilidades dentro da área de Consultoria e Ensino.
        consultingTeaching: [
          "Business Consulting", // Consultoria Empresarial
          "Problem-Solving Training", // Treinamento em Resolução de Problemas
          "Financial Training", // Treinamento Financeiro
          "Lean Process Management", // Gestão de Processos Lean
          "Strategic Planning", // Planejamento Estratégico
          "Solution Development" // Desenvolvimento de Soluções
        ],

        // Habilidades dentro da área de Design e Inovação.
        designInnovation: [
          "Design", // Design
          "Innovation", // Inovação
          "Creativity", // Criatividade
          "Product Development", // Desenvolvimento de Produtos
          "Innovative Solutions" // Soluções Inovadoras
        ],

        // Habilidades dentro da área de Liderança Saudável.
        healthLeadership: [
          "Leadership", // Liderança
          "Inclusion & Diversity", // Inclusão e Diversidade
          "Emotional Intelligence", // Inteligência Emocional
          "Wellness Programs", // Programas de Bem-Estar
          "Health & Safety Policies" // Políticas de Saúde e Segurança
        ]
      }
    },

    // Texto para o rodapé em inglês
    footerText: "© InMotion - Technology and Management Services"
  },
  
  pt: {
    // Esta seção contém as traduções para o idioma português.
    
    // Título principal exibido na página inicial do aplicativo.
    title: "Soluções em Gestão Empresarial",

    // Descrição da aplicação, que aparece nas meta tags para SEO e também pode ser usada em outros lugares.
    description: "Sua Caixa de Ferramentas Diária para a Excelência Empresarial",

    // Título de uma seção que descreve as áreas de especialização da empresa.
    ourExpertise: "Nossa Expertise",

    // Descrição detalhada da seção que fala sobre a expertise da empresa, destacando as áreas de atuação e as habilidades oferecidas.
    expertiseDescription: "Explore nossa ampla gama de habilidades em áreas empresariais essenciais. Nossa expertise é projetada para elevar o desempenho do seu negócio através de soluções inovadoras e insights estratégicos.",

    // Texto de chamada para ação, incentivando os visitantes a transformarem seus negócios.
    transformBusiness: "Transforme Seu Negócio Hoje",

    // Seção que contém as ferramentas rápidas disponíveis no aplicativo.
    quickTools: {
      // Título da seção de ferramentas rápidas.
      title: "Ferramentas Rápidas",

      // Nome da primeira ferramenta, que ajuda a tomar decisões usando uma matriz de decisão.
      decisionHelper: "Matriz de Decisão",

      // Nome da segunda ferramenta, que é um plano de ação estruturado (método 5W2H).
      actionPlan: "Plano de Ação",

      // Nome da terceira ferramenta, que descreve o fluxo de processo em um negócio.
      processFlow: "Fluxo de Processo",

      // Frase curta associada à ferramenta "Fluxo de Processo", que ajuda os usuários a entender o propósito da ferramenta.
      phraseProcessFlow: "Onde estou?",

      // Frase curta associada à ferramenta "Matriz de Decisão", para guiar os usuários sobre o que esperar.
      phraseDecisionMatrix: "Para onde eu vou?",

      // Frase curta associada à ferramenta "Plano de Ação", que orienta os usuários sobre como usar a ferramenta.
      phraseActionPlan: "Como eu vou?",
    },

    // Texto que aparece no botão que abre a seção de ferramentas rápidas.
    quickToolsButton: "Ferramentas Rápidas",

    // Seção que lista as diferentes áreas de expertise da empresa.
    expertiseAreas: {
      // Primeira área de expertise: Gestão Empresarial.
      businessManagement: "Gestão Empresarial",

      // Segunda área de expertise: Análise de Dados e Tecnologia.
      dataAnalysis: "Análise de Dados & Tecnologia",

      // Terceira área de expertise: Consultoria e Ensino.
      consultingTeaching: "Consultoria & Ensino",

      // Quarta área de expertise: Design e Inovação.
      designInnovation: "Design & Inovação",

      // Quinta área de expertise: Liderança Saudável.
      healthLeadership: "Liderança Saudável",

      // Subseção que descreve as habilidades específicas dentro de cada área de expertise.
      skills: {
        // Habilidades dentro da área de Gestão Empresarial.
        businessManagement: [
          "Gestão Operacional", // Operational Management
          "Melhoria de Processos", // Process Improvement
          "Planejamento Estratégico", // Strategic Planning
          "Análise Financeira", // Financial Analysis
          "Gestão de Projetos", // Project Management
          "Satisfação do Cliente" // Customer Satisfaction
        ],

        // Habilidades dentro da área de Análise de Dados e Tecnologia.
        dataAnalysis: [
          "Inteligência de Negócios", // Business Intelligence
          "Microsoft Power BI", // Ferramenta de análise de dados Power BI
          "Modelagem de Dados", // Data Modeling
          "Programação em Python", // Python Programming
          "Excel Avançado", // Advanced Excel
          "Inteligência Artificial" // Artificial Intelligence
        ],

        // Habilidades dentro da área de Consultoria e Ensino.
        consultingTeaching: [
          "Consultoria Empresarial", // Business Consulting
          "Treinamento em Resolução de Problemas", // Problem-Solving Training
          "Treinamento Financeiro", // Financial Training
          "Processos Lean", // Lean Process Management
          "Planejamento Estratégico", // Strategic Planning
          "Desenvolvimento de Soluções" // Solution Development
        ],

        // Habilidades dentro da área de Design e Inovação.
        designInnovation: [
          "Design", // Design
          "Inovação", // Innovation
          "Criatividade", // Creativity
          "Desenvolvimento de Produtos", // Product Development
          "Soluções Inovadoras" // Innovative Solutions
        ],

        // Habilidades dentro da área de Liderança Saudável.
        healthLeadership: [
          "Liderança", // Leadership
          "Inclusão & Diversidade", // Inclusion & Diversity
          "Inteligência Emocional", // Emotional Intelligence
          "Programas de Bem-Estar", // Wellness Programs
          "Políticas de Saúde e Segurança" // Health & Safety Policies
        ]
      }
    },

    // Texto para o rodapé em português
    footerText: "© InMotion - Tecnologia e Serviços de Gestão"
  },

  fr: {
    // Cette section contient les traductions en français.
    
    // Titre principal affiché sur la page d'accueil de l'application.
    title: "Solutions en Gestion d'Entreprise",

    // Description de l'application, qui apparaît dans les meta tags pour le SEO et peut également être utilisée ailleurs.
    description: "Votre Boîte à Outils Quotidienne pour l'Excellence en Affaires",

    // Titre d'une section qui décrit les domaines d'expertise de l'entreprise.
    ourExpertise: "Notre Expertise",

    // Description détaillée de la section qui parle de l'expertise de l'entreprise, mettant en avant les domaines d'activité et les compétences offertes.
    expertiseDescription: "Explorez notre gamme dynamique de compétences dans les domaines clés de l'entreprise. Notre expertise est conçue pour améliorer la performance de votre entreprise grâce à des solutions innovantes et des perspectives stratégiques.",

    // Texte d'incitation à l'action, encourageant les visiteurs à transformer leur entreprise.
    transformBusiness: "Transformez Votre Entreprise Aujourd'hui",

    // Section contenant les outils rapides disponibles dans l'application.
    quickTools: {
      // Titre de la section des outils rapides.
      title: "Outils Rapides",

      // Nom du premier outil, qui aide à prendre des décisions à l'aide d'une matrice de décision.
      decisionHelper: "Matrice de Décision",

      // Nom du deuxième outil, qui est un plan d'action structuré (méthode 5W2H).
      actionPlan: "Plan d'Action",

      // Nom du troisième outil, qui décrit le flux de processus dans une entreprise.
      processFlow: "Flux de Processus",

      // Phrase courte associée à l'outil "Flux de Processus", qui aide les utilisateurs à comprendre l'objectif de l'outil.
      phraseProcessFlow: "Où suis-je?",

      // Phrase courte associée à l'outil "Matrice de Décision", pour guider les utilisateurs sur ce à quoi s'attendre.
      phraseDecisionMatrix: "Où devrais-je aller?",

      // Phrase courte associée à l'outil "Plan d'Action", qui guide les utilisateurs sur la manière d'utiliser l'outil.
      phraseActionPlan: "Comment vais-je y arriver?",
    },

    // Texte apparaissant sur le bouton qui ouvre la section des outils rapides.
    quickToolsButton: "Outils Rapides",

    // Section répertoriant les différents domaines d'expertise de l'entreprise.
    expertiseAreas: {
      // Premier domaine d'expertise: Gestion d'Entreprise.
      businessManagement: "Gestion d'Entreprise",

      // Deuxième domaine d'expertise: Analyse des Données et Technologie.
      dataAnalysis: "Analyse des Données & Technologie",

      // Troisième domaine d'expertise: Conseil et Enseignement.
      consultingTeaching: "Conseil & Enseignement",

      // Quatrième domaine d'expertise: Design et Innovation.
      designInnovation: "Design & Innovation",

      // Cinquième domaine d'expertise: Leadership Sain.
      healthLeadership: "Leadership Sain",

      // Sous-section décrivant les compétences spécifiques dans chaque domaine d'expertise.
      skills: {
        // Compétences dans le domaine de la Gestion d'Entreprise.
        businessManagement: [
          "Gestion Opérationnelle", // Operational Management
          "Amélioration des Processus", // Process Improvement
          "Planification Stratégique", // Strategic Planning
          "Analyse Financière", // Financial Analysis
          "Gestion de Projet", // Project Management
          "Satisfaction du Client" // Customer Satisfaction
        ],

        // Compétences dans le domaine de l'Analyse des Données et Technologie.
        dataAnalysis: [
          "Business Intelligence", // Intelligence d'Affaires
          "Microsoft Power BI", // Outil d'analyse de données Power BI
          "Modélisation des Données", // Data Modeling
          "Programmation Python", // Python Programming
          "Excel Avancé", // Advanced Excel
          "Intelligence Artificielle" // Artificial Intelligence
        ],

        // Compétences dans le domaine du Conseil et Enseignement.
        consultingTeaching: [
          "Conseil en Entreprise", // Business Consulting
          "Formation à la Résolution de Problèmes", // Problem-Solving Training
          "Formation Financière", // Financial Training
          "Gestion des Processus Lean", // Lean Process Management
          "Planification Stratégique", // Strategic Planning
          "Développement de Solutions" // Solution Development
        ],

        // Compétences dans le domaine du Design et Innovation.
        designInnovation: [
          "Design", // Design
          "Innovation", // Innovation
          "Créativité", // Creativity
          "Développement de Produits", // Product Development
          "Solutions Innovantes" // Innovative Solutions
        ],

        // Compétences dans le domaine du Leadership Sain.
        healthLeadership: [
          "Leadership", // Leadership
          "Inclusion & Diversité", // Inclusion & Diversity
          "Intelligence Émotionnelle", // Emotional Intelligence
          "Programmes de Bien-Être", // Wellness Programs
          "Politiques de Santé et Sécurité" // Health & Safety Policies
        ]
      }
    },

    // Texte pour le pied de page en français
    footerText: "© InMotion - Services de Technologie et de Gestion"
  }
};

// Exporta o objeto 'translations' para que ele possa ser utilizado em outros componentes do aplicativo.
// Isso permite que o aplicativo alterne entre idiomas e exiba o texto correto com base na seleção do usuário.
export default translations;

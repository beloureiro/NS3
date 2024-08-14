// O objeto 'translations' contém todas as traduções para os idiomas suportados pelo aplicativo.
// Cada chave (por exemplo, 'en', 'pt', 'fr') representa um idioma e contém um conjunto de traduções específicas para aquele idioma.
const translations = {
  en: {
    // Esta seção contém as traduções para o idioma inglês.
    
    title: "Business Management Solutions",
    description: "Your Daily Toolbox for Business Excellence",
    ourExpertise: "Our Expertise",
    expertiseDescription: "Explore our dynamic range of skills across key business domains. Our expertise is tailored to elevate your business performance through innovative solutions and strategic insights.",
    transformBusiness: "Transform Your Business Today",
    quickTools: {
      title: "Quick Tools",
      decisionHelper: "Decision Matrix",
      actionPlan: "Action Plan",
      processFlow: "Process Flow",
      phraseProcessFlow: "Where am I?",
      phraseDecisionMatrix: "Where should I go?",
      phraseActionPlan: "How will I get there?",
    },
    quickToolsButton: "Quick Tools",
    expertiseAreas: {
      businessManagement: "Business Management",
      dataAnalysis: "Data Analysis & Technology",
      consultingTeaching: "Consulting & Teaching",
      designInnovation: "Design & Innovation",
      healthLeadership: "Healthy Leadership",
      skills: {
        businessManagement: [
          "Operational Management",
          "Process Improvement",
          "Strategic Planning",
          "Financial Analysis",
          "Project Management",
          "Customer Satisfaction"
        ],
        dataAnalysis: [
          "Business Intelligence",
          "Microsoft Power BI",
          "Data Modeling",
          "Python Programming",
          "Advanced Excel",
          "Artificial Intelligence"
        ],
        consultingTeaching: [
          "Business Consulting",
          "Problem-Solving Training",
          "Financial Training",
          "Lean Process Management",
          "Strategic Planning",
          "Solution Development"
        ],
        designInnovation: [
          "Design",
          "Innovation",
          "Creativity",
          "Product Development",
          "Innovative Solutions"
        ],
        healthLeadership: [
          "Leadership",
          "Inclusion & Diversity",
          "Emotional Intelligence",
          "Wellness Programs",
          "Health & Safety Policies"
        ]
      }
    },
    footerText: "© InMotion - Technology and Management Services"
  },
  
  pt: {
    // Esta seção contém as traduções para o idioma português.
    
    title: "Soluções em Gestão Empresarial",
    description: "Sua Caixa de Ferramentas Diária para a Excelência Empresarial",
    ourExpertise: "Nossa Expertise",
    expertiseDescription: "Explore nossa ampla gama de habilidades em áreas empresariais essenciais. Nossa expertise é projetada para elevar o desempenho do seu negócio através de soluções inovadoras e insights estratégicos.",
    transformBusiness: "Transforme Seu Negócio Hoje",
    quickTools: {
      title: "Ferramentas Rápidas",
      decisionHelper: "Matriz de Decisão",
      actionPlan: "Plano de Ação",
      processFlow: "Fluxo de Processo",
      phraseProcessFlow: "Onde estou?",
      phraseDecisionMatrix: "Para onde devo ir?", // Ajustado para melhor correspondência com o inglês
      phraseActionPlan: "Como chegarei lá?", // Ajustado para melhor correspondência com o inglês
    },
    quickToolsButton: "Ferramentas Rápidas",
    expertiseAreas: {
      businessManagement: "Gestão Empresarial",
      dataAnalysis: "Análise de Dados & Tecnologia",
      consultingTeaching: "Consultoria & Ensino",
      designInnovation: "Design & Inovação",
      healthLeadership: "Liderança Saudável",
      skills: {
        businessManagement: [
          "Gestão Operacional",
          "Melhoria de Processos",
          "Planejamento Estratégico",
          "Análise Financeira",
          "Gestão de Projetos",
          "Satisfação do Cliente"
        ],
        dataAnalysis: [
          "Inteligência de Negócios",
          "Microsoft Power BI",
          "Modelagem de Dados",
          "Programação em Python",
          "Excel Avançado",
          "Inteligência Artificial"
        ],
        consultingTeaching: [
          "Consultoria Empresarial",
          "Treinamento em Resolução de Problemas",
          "Treinamento Financeiro",
          "Processos Lean", // Ajustado para melhor correspondência com o inglês
          "Planejamento Estratégico",
          "Desenvolvimento de Soluções"
        ],
        designInnovation: [
          "Design",
          "Inovação",
          "Criatividade",
          "Desenvolvimento de Produtos",
          "Soluções Inovadoras"
        ],
        healthLeadership: [
          "Liderança",
          "Inclusão & Diversidade",
          "Inteligência Emocional",
          "Programas de Bem-Estar",
          "Políticas de Saúde e Segurança"
        ]
      }
    },
    footerText: "© InMotion - Tecnologia e Serviços de Gestão"
  },

  fr: {
    // Cette section contient les traductions en français.
    
    title: "Solutions en Gestion d'Entreprise",
    description: "Votre Boîte à Outils Quotidienne pour l'Excellence en Affaires",
    ourExpertise: "Notre Expertise",
    expertiseDescription: "Explorez notre gamme dynamique de compétences dans les domaines clés de l'entreprise. Notre expertise est conçue pour améliorer la performance de votre entreprise grâce à des solutions innovantes et des perspectives stratégiques.",
    transformBusiness: "Transformez Votre Entreprise Aujourd'hui",
    quickTools: {
      title: "Outils Rapides",
      decisionHelper: "Matrice de Décision",
      actionPlan: "Plan d'Action",
      processFlow: "Flux de Processus",
      phraseProcessFlow: "Où suis-je ?",
      phraseDecisionMatrix: "Où devrais-je aller ?",
      phraseActionPlan: "Comment vais-je y arriver ?",
    },
    quickToolsButton: "Outils Rapides",
    expertiseAreas: {
      businessManagement: "Gestion d'Entreprise",
      dataAnalysis: "Analyse des Données & Technologie",
      consultingTeaching: "Conseil & Formation", // Ajustado para melhor correspondência com o inglês
      designInnovation: "Design & Innovation",
      healthLeadership: "Leadership Sain",
      skills: {
        businessManagement: [
          "Gestion Opérationnelle",
          "Amélioration des Processus",
          "Planification Stratégique",
          "Analyse Financière",
          "Gestion de Projet",
          "Satisfaction Client"
        ],
        dataAnalysis: [
          "Intelligence d'Affaires",
          "Microsoft Power BI",
          "Modélisation des Données",
          "Programmation Python",
          "Excel Avancé",
          "Intelligence Artificielle"
        ],
        consultingTeaching: [
          "Conseil en Entreprise",
          "Formation à la Résolution de Problèmes",
          "Formation Financière",
          "Gestion des Processus Lean",
          "Planification Stratégique",
          "Développement de Solutions"
        ],
        designInnovation: [
          "Design",
          "Innovation",
          "Créativité",
          "Développement de Produits",
          "Solutions Innovantes"
        ],
        healthLeadership: [
          "Leadership",
          "Inclusion & Diversité",
          "Intelligence Émotionnelle",
          "Programmes de Bien-Être",
          "Politiques de Santé et Sécurité"
        ]
      }
    },
    footerText: "© InMotion - Services de Technologie et de Gestion"
  }
};

// Exporta o objeto 'translations' para que ele possa ser utilizado em outros componentes do aplicativo.
// Isso permite que o aplicativo alterne entre idiomas e exiba o texto correto com base na seleção do usuário.
export default translations;
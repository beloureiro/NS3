// Objeto contendo as traduções para os idiomas suportados
const translations = {
    en: {
      // Traduções em inglês
      title: "Solution in Business Management",
      // Título principal da aplicação
      description: "Your Daily Toolbox for Business Excellence",
      // Descrição da aplicação
      ourExpertise: "Our Expertise",
      // Título para a seção de expertise
      expertiseDescription: "Explore our dynamic range of skills across key business domains. Our expertise is tailored to elevate your business performance through innovative solutions and strategic insights.",
      // Descrição detalhada da seção de expertise
      transformBusiness: "Transform Your Business Today",
      // Chamada para ação motivando a transformação dos negócios
      quickTools: {
        // Seção de ferramentas rápidas
        title: "Quick Tools",
        // Título da seção
        decisionHelper: "Decision Matrix",
        // Nome da ferramenta de auxílio à decisão
        actionPlan: "Action Plan",
        // Nome da ferramenta de plano de ação 5W2H
        processFlow: "Process Flow"
        // Nome da ferramenta de fluxo de processo
      },
      quickToolsButton: "Quick Tools",
      // Texto do botão para abrir as ferramentas rápidas
      expertiseAreas: {
        // Áreas de expertise da empresa
        businessManagement: "Business Management",
        dataAnalysis: "Data Analysis & Technology",
        consultingTeaching: "Consulting & Teaching",
        designInnovation: "Design & Innovation",
        healthLeadership: "Healthy Leadership",
        skills: {
          // Habilidades específicas dentro de cada área de expertise
          businessManagement: [
            "Operational Management", "Process Improvement", "Strategic Planning", "Financial Analysis", "Project Management", "Customer Satisfaction"
          ],
          dataAnalysis: [
            "Business Intelligence", "Microsoft Power BI", "Data Modeling", "Python Programming", "Advanced Excel", "Artificial Intelligence"
          ],
          consultingTeaching: [
            "Business Consulting", "Problem-Solving Training", "Financial Training", "Lean Process Management", "Strategic Planning", "Solution Development"
          ],
          designInnovation: [
            "Design", "Innovation", "Creativity", "Product Development", "Innovative Solutions"
          ],
          healthLeadership: [
            "Leadership", "Inclusion & Diversity", "Emotional Intelligence", "Wellness Programs", "Health & Safety Policies"
          ]
        }
      }
    },
    pt: {
      // Traduções em português
      title: "Soluções em Gestão Empresarial",
      // Título principal da aplicação
      description: "Sua Caixa de Ferramentas Diária para a Excelência Empresarial",
      // Descrição da aplicação
      ourExpertise: "Nossa Expertise",
      // Título para a seção de expertise
      expertiseDescription: "Explore nossa ampla gama de habilidades em áreas empresariais essenciais. Nossa expertise é projetada para elevar o desempenho do seu negócio através de soluções inovadoras e insights estratégicos.",
      // Descrição detalhada da seção de expertise
      transformBusiness: "Transforme Seu Negócio Hoje",
      // Chamada para ação motivando a transformação dos negócios
      quickTools: {
        // Seção de ferramentas rápidas
        title: "Ferramentas Rápidas",
        // Título da seção
        decisionHelper: "Matriz de Decisão",
        // Nome da ferramenta de auxílio à decisão
        actionPlan: "Plano de Ação",
        // Nome da ferramenta de plano de ação 5W2H
        processFlow: "Fluxo de Processo"
        // Nome da ferramenta de fluxo de processo
      },
      quickToolsButton: "Ferramentas Rápidas",
      // Texto do botão para abrir as ferramentas rápidas
      expertiseAreas: {
        // Áreas de expertise da empresa
        businessManagement: "Gestão Empresarial",
        dataAnalysis: "Análise de Dados & Tecnologia",
        consultingTeaching: "Consultoria & Ensino",
        designInnovation: "Design & Inovação",
        healthLeadership: "Liderança Saudável",
        skills: {
          // Habilidades específicas dentro de cada área de expertise
          businessManagement: [
            "Gestão Operacional", "Melhoria de Processos", "Planejamento Estratégico", "Análise Financeira", "Gestão de Projetos", "Satisfação do Cliente"
          ],
          dataAnalysis: [
            "Inteligência de Negócios", "Microsoft Power BI", "Modelagem de Dados", "Programação em Python", "Excel Avançado", "Inteligência Artificial"
          ],
          consultingTeaching: [
            "Consultoria Empresarial", "Treinamento em Resolução de Problemas", "Treinamento Financeiro", "Processos Lean", "Planejamento Estratégico", "Desenvolvimento de Soluções"
          ],
          designInnovation: [
            "Design", "Inovação", "Criatividade", "Desenvolvimento de Produtos", "Soluções Inovadoras"
          ],
          healthLeadership: [
            "Liderança", "Inclusão & Diversidade", "Inteligência Emocional", "Programas de Bem-Estar", "Políticas de Saúde e Segurança"
          ]
        }
      }
    }
  };
  
  export default translations;
  // Exporta o objeto de traduções para ser utilizado em outros componentes da aplicação
  
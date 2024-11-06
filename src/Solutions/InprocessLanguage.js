import {
  Waypoints,
  Search,
  ClipboardCheck,
  Cpu,
  Users,
  Activity,
  BarChart,
} from "lucide-react"; // Import necessary icons

export const translations = {
  en: {
    title: "InProcess Methodology",
    subtitle: "Integrating Processes, People and Technology",
    back: "Back",
    overview: "Overview",
    diagnostic: "Diagnostic & Classification",
    actionPlan: "Action Plan & Audit",
    processes: "Processes",
    processesDesc: "Operations stabilization and standardization",
    people: "People",
    peopleDesc: "Team training and engagement",
    technology: "Technology",
    technologyDesc: "Innovative technological solutions",
    advancedAnalysis: "Advanced Analysis and Classification",
    metrics: "We use advanced metrics to classify processes:",
    actionPlanTitle: "Action Plan and Audit",
    transformationProcess: "Complete management of the transformation process:",
  },
  pt: {
    title: "Metodologia InProcess",
    subtitle: "Integrando Processos, Pessoas e Tecnologia",
    back: "Voltar",
    overview: "Visão Geral",
    diagnostic: "Diagnóstico & Classificação",
    actionPlan: "Plano de Ação & Auditoria",
    processes: "Processos",
    processesDesc: "Estabilização e padronização de operações",
    people: "Pessoas",
    peopleDesc: "Capacitação e engajamento de equipes",
    technology: "Tecnologia",
    technologyDesc: "Soluções tecnológicas inovadoras",
    advancedAnalysis: "Análise Avançada e Classificação",
    metrics: "Utilizamos métricas avançadas para classificar processos:",
    actionPlanTitle: "Plano de Ação e Auditoria",
    transformationProcess: "Gestão completa do processo de transformação:",
  },
};

export const explanations = {
  default: {
    en: {
      title: "InProcess: Integrated Transformation",
      content:
        "InProcess integrates Processes, People and Technology to stabilize operations, empower teams and accelerate workflows. Focusing on creating standardized processes, an engaged team and a better customer experience, this methodology promotes more efficient service and a more productive team.",
    },
    pt: {
      title: "InProcess: Transformação Integrada",
      content:
        "InProcess integra Processos, Pessoas e Tecnologia para estabilizar operações, capacitar equipes e acelerar fluxos de trabalho. Com o foco em criar processos padronizados, uma equipe engajada e uma melhor experiência para o cliente, essa metodologia promove um atendimento mais eficiente e uma equipe mais produtiva.",
    },
    icon: <Waypoints className="w-8 h-8 text-blue-400" />,
  },
  diagnostico: {
    en: {
      title: "Diagnosis and Classification",
      content:
        "Understanding the client's pain, connecting it to process steps and identifying improvement points are the objectives of diagnosis. Through detailed mapping, we identify critical points that directly impact performance and customer experience. We use metrics such as Execution Complexity (ECL) and Customer Satisfaction Index (CSI) to guide specific improvements.",
    },
    pt: {
      title: "Diagnóstico e Classificação",
      content:
        "Conhecer a dor do cliente, conectá-la às etapas do processo e identificar pontos de melhoria são os objetivos do diagnóstico. A partir do mapeamento detalhado, identificamos pontos críticos que impactam diretamente o desempenho e a experiência do cliente. Utilizamos métricas como Complexidade de Execução (ECL) e Índice de Satisfação do Cliente (CSI) para orientar aprimoramentos específicos.",
    },
    icon: <Search className="w-8 h-8 text-blue-400" />,
  },
  planoAcao: {
    en: {
      title: "Action Plan and Audit",
      content:
        "After the diagnosis, an action plan is created to manage and monitor the necessary interventions. Each action is detailed with specific deadlines and updated statuses, ensuring the fulfillment of established priorities. InProcess offers an integrated audit tool to monitor the performance of adjusted processes.",
    },
    pt: {
      title: "Plano de Ação e Auditoria",
      content:
        "Após o diagnóstico, um plano de ações é criado para gerenciar e acompanhar as intervenções necessárias. Cada ação é detalhada com prazos específicos e status atualizados, garantindo o cumprimento das prioridades estabelecidas. A InProcess oferece uma ferramenta de auditoria integrada para monitorar a performance dos processos ajustados.",
    },
    icon: <ClipboardCheck className="w-8 h-8 text-green-400" />,
  },
  processos: {
    en: {
      title: "Standardized Processes",
      content:
        "We implement standardized and efficient processes that ensure consistency in operations. Through detailed analysis and continuous optimization, we establish workflows that maximize productivity and minimize errors.",
    },
    pt: {
      title: "Processos Padronizados",
      content:
        "Implementamos processos padronizados e eficientes que garantem consistência nas operações. Através de análise detalhada e otimização contínua, estabelecemos fluxos de trabalho que maximizam a produtividade e minimizam erros.",
    },
    icon: <Cpu className="w-8 h-8 text-blue-400" />,
  },
  pessoas: {
    en: {
      title: "Engaged People",
      content:
        "Focusing on people ensures that each team member is trained and motivated. We develop specific training programs and create an environment that promotes professional growth and engagement.",
    },
    pt: {
      title: "Pessoas Engajadas",
      content:
        "O foco em pessoas garante que cada membro da equipe esteja capacitado e motivado. Desenvolvemos programas de treinamento específicos e criamos um ambiente que promove o crescimento profissional e o engajamento.",
    },
    icon: <Users className="w-8 h-8 text-purple-400" />,
  },
  tecnologia: {
    en: {
      title: "Innovative Technology",
      content:
        "We use advanced technological solutions to automate processes and improve efficiency. Our approach integrates modern tools that facilitate work and increase operational accuracy.",
    },
    pt: {
      title: "Tecnologia Inovadora",
      content:
        "Utilizamos soluções tecnológicas avançadas para automatizar processos e melhorar a eficiência. Nossa abordagem integra ferramentas modernas que facilitam o trabalho e aumentam a precisão das operações.",
    },
    icon: <Activity className="w-8 h-8 text-green-400" />,
  },
  metricas: {
    en: {
      title: "Metrics and Advanced Analysis",
      content:
        "We use metrics such as Execution Complexity (ECL) and Customer Satisfaction Index (CSI) to guide specific improvements. Our analysis includes internal and external feedback, processed with artificial intelligence to identify precise improvement points.",
    },
    pt: {
      title: "Métricas e Análise Avançada",
      content:
        "Utilizamos métricas como Complexidade de Execução (ECL) e Índice de Satisfação do Cliente (CSI) para orientar aprimoramentos específicos. Nossa análise inclui feedbacks internos e externos, processados com inteligência artificial para identificar pontos de melhoria precisos.",
    },
    icon: <Search className="w-8 h-8 text-blue-400" />,
  },
  beneficios: {
    en: {
      title: "Proven Benefits",
      content:
        "The implementation of the methodology results in measurable benefits: significant reduction in operational failures, increased customer satisfaction, greater team engagement and resource optimization. It is especially effective in service companies seeking operational excellence.",
    },
    pt: {
      title: "Benefícios Comprovados",
      content:
        "A implementação da metodologia resulta em benefícios mensuráveis: redução significativa de falhas operacionais, aumento na satisfação do cliente, maior engajamento da equipe e otimização dos recursos. É especialmente eficaz em empresas de serviços que buscam excelência operacional.",
    },
    icon: <BarChart className="w-8 h-8 text-yellow-400" />,
  },
};

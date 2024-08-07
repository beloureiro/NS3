import React from 'react';
// Importa o React para permitir a criação de componentes.

export const Button = ({ children, onClick, className }) => (
  // Componente funcional Button que recebe "children" (conteúdo do botão), "onClick" (função de clique) e "className" (classes CSS adicionais).
  <button onClick={onClick} className={`px-4 py-2 rounded ${className}`}>{children}</button>
  // Renderiza um botão com preenchimento, bordas arredondadas e classes CSS personalizadas.
);

export const Input = ({ className, ...props }) => (
  // Componente funcional Input que recebe "className" e outros atributos de entrada (...props).
  <input className={`p-2 rounded ${className}`} {...props} />
  // Renderiza um campo de entrada com preenchimento, bordas arredondadas e classes CSS personalizadas.
);

export const Textarea = ({ className, ...props }) => (
  // Componente funcional Textarea que recebe "className" e outros atributos de textarea (...props).
  <textarea className={`p-2 rounded ${className}`} {...props} />
  // Renderiza uma área de texto com preenchimento, bordas arredondadas e classes CSS personalizadas.
);

export const Card = ({ children, className }) => (
  // Componente funcional Card que recebe "children" (conteúdo do cartão) e "className" (classes CSS adicionais).
  <div className={`border border-gray-700 rounded-lg overflow-hidden ${className}`}>{children}</div>
  // Renderiza um contêiner com borda, bordas arredondadas, e permite que o conteúdo seja exibido.
);

export const CardHeader = ({ children }) => (
  // Componente funcional CardHeader que recebe "children" (conteúdo do cabeçalho).
  <div className="p-4 border-b border-gray-700">{children}</div>
  // Renderiza o cabeçalho do cartão com preenchimento e borda inferior.
);

export const CardContent = ({ children }) => (
  // Componente funcional CardContent que recebe "children" (conteúdo do cartão).
  <div className="p-4 border-b border-gray-700">{children}</div>
  // Renderiza o conteúdo do cartão com preenchimento e borda inferior.
);

export const CardFooter = ({ children }) => (
  // Componente funcional CardFooter que recebe "children" (conteúdo do rodapé do cartão).
  <div className="p-4 border-t border-gray-700">{children}</div>
  // Renderiza o rodapé do cartão com preenchimento e borda superior.
);

export const CardTitle = ({ children, className, onClick }) => (
  // Componente funcional CardTitle que recebe "children" (título do cartão), "className" (classes CSS adicionais) e "onClick" (função de clique).
  <h3 className={`text-lg font-semibold cursor-pointer ${className}`} onClick={onClick}>{children}</h3>
  // Renderiza um título de nível 3 com tamanho de texto grande, negrito, cursor de ponteiro (mão) e classes CSS personalizadas.
);

export const Alert = ({ children, className }) => (
  // Componente funcional Alert que recebe "children" (conteúdo do alerta) e "className" (classes CSS adicionais).
  <div className={`p-4 rounded-lg border border-gray-700 ${className}`}>{children}</div>
  // Renderiza um contêiner de alerta com preenchimento, bordas arredondadas, borda externa e classes CSS personalizadas.
);

export const AlertTitle = ({ children }) => (
  // Componente funcional AlertTitle que recebe "children" (título do alerta).
  <h4 className="font-bold mb-2">{children}</h4>
  // Renderiza um título de nível 4 com texto em negrito e margem inferior.
);

export const AlertDescription = ({ children }) => (
  // Componente funcional AlertDescription que recebe "children" (descrição do alerta).
  <p>{children}</p>
  // Renderiza um parágrafo com o conteúdo do alerta.
);

export const translations = {
  en: {
    title: "Advanced Decision Matrix",
    subtitle: "Wisdom lies in weighing all variables before deciding",
    describeDilemma: "Describe your dilemma",
    dilemmaPlaceholder: "Ex: Should I start my own business, or invest in a promising startup, or put my money in low-risk traditional investments",
    analyzeOptions: "Analyze Options",
    decisionCriteria: "Decision Criteria",
    criterionName: "Criterion name",
    weight: "Weight",
    addCriterion: "Add Criterion",
    alternatives: "Alternatives",
    alternativeName: "Alternative name",
    score: "Score",
    addAlternative: "Add Alternative",
    decide: "Decide",
    decisionMatrix: "Decision Matrix",
    finalDecision: "Final Decision",
    addTwoAlternatives: "Add at least two alternatives to make a decision.",
    bestAlternative: "The best alternative is: {name} with a score of {score}",
    calculationDetails: "Calculation Details",
    disclaimerTitle: "Disclaimer",
    disclaimerText: "By proceeding, you acknowledge that this tool provides an advanced methodology to support your decision-making, but the final outcome depends entirely on you. Therefore, you agree that we are not responsible for any results achieved.",
    agree: "I Understand and Agree",
    cancel: "Cancel",
    weightedScore: 'Weighted Score',
    avgCriterionWeight: 'Avg. Criterion Weight',
    name: 'Name'
  },
  pt: {
    title: "Matriz de Decisão Avançada",
    subtitle: "A sabedoria está em ponderar todas as variáveis antes de decidir",
    describeDilemma: "Descreva seu dilema",
    dilemmaPlaceholder: "Ex: Devo abrir meu próprio negócio, ou investir em uma startup promissora, ou aplicar meu capital em investimentos tradicionais de baixo risco",
    analyzeOptions: "Analisar Opções",
    decisionCriteria: "Critérios de Decisão",
    criterionName: "Nome do critério",
    weight: "Peso",
    addCriterion: "Adicionar Critério",
    alternatives: "Alternativas",
    alternativeName: "Nome da alternativa",
    score: "Pontuação",
    addAlternative: "Adicionar Alternativa",
    decide: "Decidir",
    decisionMatrix: "Matriz de Decisão",
    finalDecision: "Decisão Final",
    addTwoAlternatives: "Adicione pelo menos duas alternativas para tomar uma decisão.",
    bestAlternative: "A melhor alternativa é: {name} com uma pontuação de {score}",
    calculationDetails: "Detalhes do Cálculo",
    disclaimerTitle: "Aviso Legal",
    disclaimerText: "Ao continuar, você reconhece que esta ferramenta oferece uma metodologia avançada para apoiar suas decisões, mas o resultado final depende exclusivamente de você. Portanto, concorda que não temos responsabilidade sobre os resultados obtidos.",
    agree: "Eu Entendo e Concordo",
    cancel: "Cancelar",
    weightedScore: 'Pontuação Ponderada',
    avgCriterionWeight: 'Peso Médio do Critério',
    name: 'Nome'
  },
};
// Objeto de traduções para suportar múltiplos idiomas (inglês e português).

export const DisclaimerModal = ({ isOpen, onClose, onConfirm, language }) => {
  // Componente funcional DisclaimerModal que controla a exibição do modal de isenção de responsabilidade.

  if (!isOpen) return null;
  // Se o modal não estiver aberto, não renderiza nada (retorna null).

  const t = translations[language];
  // Seleciona as traduções de acordo com o idioma.

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Contêiner do modal com fundo escuro semi-transparente e centralizado na tela */}
      <div className="bg-[#1a1a1a] p-6 rounded-lg max-w-md w-full">
        {/* Conteúdo do modal com fundo escuro, preenchimento, bordas arredondadas e largura máxima definida */}
        <h2 className="text-xl font-bold mb-4 text-[#00ff9d]">{t.disclaimerTitle}</h2>
        <p className="mb-6 text-gray-300">{t.disclaimerText}</p>
        <div className="flex justify-end space-x-4">
          {/* Botões para fechar ou confirmar o modal */}
          <Button onClick={onClose} className="bg-gray-600 hover:bg-gray-700">
            {t.cancel}
          </Button>
          <Button onClick={onConfirm} className="bg-[#00864c] hover:bg-[#00ff9d] text-black">
            {t.agree}
          </Button>
        </div>
      </div>
    </div>
  );
};
// Modal que exibe uma mensagem de isenção de responsabilidade e oferece opções para concordar ou cancelar.

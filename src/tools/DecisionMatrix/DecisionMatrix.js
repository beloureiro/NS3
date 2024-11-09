import React, { useState, useRef, useEffect } from "react";
import {
  Brain,
  ChevronDown,
  Plus,
  Trash2,
  Send,
  CheckCircle,
} from "lucide-react";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  Alert,
  AlertTitle,
  AlertDescription,
  DisclaimerModal,
} from "./HelperComponents"; // Importa componentes auxiliares
import { calculateWeightedScores, ImprovedScatterChart } from "./DecisionLogic"; // Importa funções e componentes relacionados à lógica de decisão
import { translations } from "./translation"; // Importa traduções
import ImportExportButtons from "./ImportExportButtons"; // Importa o componente de botões de importação/exportação
import {
  exportDecisionProcess,
  importDecisionProcess,
} from "./DecisionMatrixExportImport"; // Importa funções de importação/exportação de decisões
import ContactSection from "../../AppComponents/ContactSection";

const DecisionHelper = ({ language }) => {
  // Definição de estados utilizando o hook useState
  const [alternatives, setAlternatives] = useState([]); // Armazena as alternativas de decisão
  const [decision, setDecision] = useState(null); // Armazena a decisão final
  const [userInput, setUserInput] = useState(""); // Armazena a entrada do usuário
  const [criteria, setCriteria] = useState([
    { name: "Importance", weight: 5 },
    { name: "Urgency", weight: 4 },
  ]); // Armazena os critérios de decisão com pesos
  const [showMatrix, setShowMatrix] = useState(false); // Controla a exibição da matriz de decisão
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false); // Controla a exibição do modal de isenção de responsabilidade
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false); // Indica se há alterações não salvas

  const fileInputRef = useRef(null); // Referência ao input de arquivo para importação

  // Obtenção das traduções de acordo com o idioma selecionado
  const t = translations[language];

  // Hook useEffect para avisar o usuário sobre mudanças não salvas antes de sair da página
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = t.unsavedChangesWarning; // Exibe uma mensagem de aviso
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload); // Remove o listener quando o componente é desmontado
    };
  }, [hasUnsavedChanges, t]);

  // Marca que há alterações não salvas quando alternativas ou critérios são alterados
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [alternatives, criteria]);

  // Adiciona uma nova alternativa ao estado
  const addAlternative = () => {
    setAlternatives([
      ...alternatives,
      { name: "", scores: criteria.map(() => 0) },
    ]);
  };

  // Remove uma alternativa específica
  const removeAlternative = (index) => {
    const newAlternatives = alternatives.filter((_, i) => i !== index);
    setAlternatives(newAlternatives);
  };

  // Atualiza o nome ou os scores de uma alternativa específica
  const updateAlternative = (index, field, value) => {
    const newAlternatives = [...alternatives];
    if (field === "name") {
      newAlternatives[index].name = value;
    } else {
      newAlternatives[index].scores[field] = parseFloat(value);
    }
    setAlternatives(newAlternatives);
  };

  // Adiciona um novo critério de decisão
  const addCriterion = () => {
    setCriteria([...criteria, { name: "", weight: 3 }]);
  };

  // Atualiza o nome ou o peso de um critério específico
  const updateCriterion = (index, field, value) => {
    const newCriteria = [...criteria];
    newCriteria[index][field] = field === "weight" ? parseFloat(value) : value;
    setCriteria(newCriteria);
  };

  // Remove um critério específico e atualiza as alternativas
  const removeCriterion = (index) => {
    const newCriteria = criteria.filter((_, i) => i !== index);
    setCriteria(newCriteria);
    setAlternatives(
      alternatives.map((alt) => ({
        ...alt,
        scores: alt.scores.filter((_, i) => i !== index),
      }))
    );
  };

  // Realiza a decisão final com base nos critérios e alternativas
  const makeDecision = () => {
    if (alternatives.length < 2) {
      setDecision(t.addTwoAlternatives); // Verifica se há pelo menos duas alternativas
      return;
    }

    const weightedScores = calculateWeightedScores(alternatives, criteria); // Calcula os scores ponderados
    const bestAlternative = weightedScores.reduce((prev, current) =>
      current.score > prev.score ? current : prev
    );

    // Define a melhor alternativa com base nos scores calculados
    setDecision(
      t.bestAlternative
        .replace("{name}", bestAlternative.name)
        .replace("{score}", bestAlternative.score.toFixed(2))
    );
  };

  // Processa a entrada do usuário e sugere alternativas
  const processUserInput = () => {
    const words = userInput.toLowerCase().split(/\s+/);
    const extractedAlternatives = [];
    let currentAlternative = { name: "", scores: [] };

    words.forEach((word, index) => {
      if (word !== "and" && word !== "or" && word !== "e" && word !== "ou") {
        currentAlternative.name += (currentAlternative.name ? " " : "") + word;
      }

      if (
        index === words.length - 1 ||
        ["and", "or", "e", "ou"].includes(words[index + 1])
      ) {
        if (currentAlternative.name) {
          currentAlternative.scores = criteria.map(
            () => Math.floor(Math.random() * 5) + 1
          );
          extractedAlternatives.push(currentAlternative);
          currentAlternative = { name: "", scores: [] };
        }
      }
    });

    setAlternatives(extractedAlternatives);
    setUserInput("");
    suggestCriteria(words); // Sugere critérios com base nas palavras-chave na entrada do usuário
  };

  // Sugere critérios de decisão com base em palavras comuns
  const suggestCriteria = (words) => {
    const commonCriteria = [
      "cost",
      "time",
      "quality",
      "risk",
      "benefit",
      "impact",
      "viability",
      "durability",
      "satisfaction",
      "innovation",
      "custo",
      "tempo",
      "qualidade",
      "risco",
      "benefício",
      "impacto",
      "viabilidade",
      "durabilidade",
      "satisfação",
      "inovação",
    ];
    const suggestedCriteria = commonCriteria.filter((criterion) =>
      words.includes(criterion)
    );

    if (suggestedCriteria.length > 0) {
      setCriteria([
        ...criteria,
        ...suggestedCriteria.map((name) => ({ name, weight: 3 })),
      ]);
    }
  };

  // Exibe o modal de isenção de responsabilidade antes de realizar a decisão
  const handleDecideClick = () => {
    setIsDisclaimerOpen(true);
  };

  // Confirma a decisão e fecha o modal de isenção
  const handleDisclaimerConfirm = () => {
    setIsDisclaimerOpen(false);
    makeDecision();
  };

  // Exporta o processo de decisão para um arquivo
  const handleExport = () => {
    exportDecisionProcess(alternatives, criteria, decision, t);
    setHasUnsavedChanges(false); // Marca que as mudanças foram salvas
  };

  // Dispara o input de arquivo para importar o processo de decisão
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full bg-black text-gray-300 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mantendo título e subtítulo com a mesma visibilidade */}
        <h1 className="text-3xl font-bold text-[#00ff9d] text-center mb-2 hover:text-[#00cc7d] transition-colors">
          {t.title}
        </h1>
        <p className="text-lg text-[#f1f5f9] italic text-center mb-4">
          {t.subtitle}
        </p>

        {/* Main content container */}
        <div className="space-y-4 mb-4">
          {/* Grid layout for cards with reduced gap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Cartão para descrever o dilema */}
            <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00ff9d]/20">
              <CardHeader>
                <CardTitle className="text-[#f1f5f9] flex items-center">
                  <Brain className="mr-2" /> {t.describeDilemma}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="w-full bg-[#111111] text-gray-300 border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md"
                  placeholder={t.dilemmaPlaceholder}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </CardContent>
              <CardFooter>
                <Button
                  onClick={processUserInput}
                  className="w-full bg-[#374151] hover:bg-[#00864c] text-white font-medium flex items-center justify-center space-x-2 py-2 px-4 rounded transition-colors duration-300"
                >
                  <Send className="h-4 w-4" />
                  <span>{t.analyzeOptions}</span>
                </Button>
              </CardFooter>
            </Card>

            {/* Cartão para adicionar e gerenciar critérios de decisão */}
            <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00ff9d]/20">
              <CardHeader>
                <CardTitle className="text-[#f1f5f9]">
                  {t.decisionCriteria}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {criteria.map((criterion, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-[#00ff9d] font-bold min-w-[24px]">
                        {index + 1}.
                      </span>
                      <Input
                        className="flex-grow bg-[#111111] text-gray-300 border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md"
                        placeholder={t.criterionName}
                        value={criterion.name}
                        onChange={(e) =>
                          updateCriterion(index, "name", e.target.value)
                        }
                      />
                      <Input
                        className="w-24 bg-[#111111] text-gray-300 border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md"
                        type="number"
                        placeholder={t.weight}
                        value={criterion.weight}
                        onChange={(e) =>
                          updateCriterion(index, "weight", e.target.value)
                        }
                      />
                      <Button
                        onClick={() => removeCriterion(index)}
                        className="bg-red-900 hover:bg-red-800 rounded-full p-2 transition-colors duração-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={addCriterion}
                  className="w-full bg-[#374151] hover:bg-[#00864c] text-white font-medium flex items-center justify-center space-x-2 py-2 px-4 rounded transition-colors duração-300"
                >
                  <Plus className="h-4 w-4" />
                  <span>{t.addCriterion}</span>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Cartão para adicionar e gerenciar alternativas - largura total */}
          <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00864c]/20 mt-4">
            <CardHeader>
              <CardTitle className="text-[#00ff9d]">{t.alternatives}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alternatives.map((alt, altIndex) => (
                  <div key={altIndex} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#00ff9d] font-bold min-w-[24px]">
                        {altIndex + 1}.
                      </span>
                      <Input
                        className="flex-grow bg-[#111111] text-gray-300 border-[#333333] focus:border-[#00ff9d] focus:ring-[#00864c] rounded-md"
                        placeholder={t.alternativeName}
                        value={alt.name}
                        onChange={(e) =>
                          updateAlternative(altIndex, "name", e.target.value)
                        }
                      />
                      <Button
                        onClick={() => removeAlternative(altIndex)}
                        className="bg-red-900 hover:bg-red-800 rounded-full p-2 transition-colors duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-8">
                      {criteria.map((criterion, critIndex) => (
                        <div
                          key={critIndex}
                          className="flex items-center space-x-2"
                        >
                          <span className="text-sm text-gray-400">
                            {criterion.name}:
                          </span>
                          <Input
                            className="flex-grow bg-[#111111] text-gray-300 border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md"
                            type="number"
                            placeholder={t.score}
                            value={alt.scores[critIndex]}
                            onChange={(e) =>
                              updateAlternative(
                                altIndex,
                                critIndex,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center space-x-4">
              <Button
                onClick={addAlternative}
                className="flex items-center text-white hover:text-[#00ff9d] hover:underline cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" /> {t.addAlternative}
              </Button>
              <Button
                onClick={handleDecideClick}
                className="mx-auto w-1/2 bg-[#00864c] hover:bg-[#00ff9d] text-black font-medium py-3 px-6 rounded transition-colors duration-300 flex items-center justify-center"
              >
                <CheckCircle className="mr-2 h-5 w-5" /> {t.decide}
              </Button>
            </CardFooter>
          </Card>

          {/* Cartão que exibe a matriz de decisão em um gráfico - largura total */}
          <Card className="bg-[#0a0a0a] border-[#333333] shadow-[#00ff9d]/20 mt-4 overflow-hidden">
            <CardHeader>
              <CardTitle
                onClick={() => setShowMatrix(!showMatrix)}
                className="text-[#00ff9d] flex items-center justify-between cursor-pointer"
              >
                {t.decisionMatrix}
                <ChevronDown
                  className={`transition-transform ${
                    showMatrix ? "rotate-180" : ""
                  }`}
                />
              </CardTitle>
            </CardHeader>
            {showMatrix && (
              <CardContent className="p-0">
                <ImprovedScatterChart
                  alternatives={alternatives}
                  criteria={criteria}
                  calculateWeightedScores={calculateWeightedScores}
                  language={language}
                />
              </CardContent>
            )}
          </Card>

          {/* Exibe o resultado da decisão final */}
          {decision && (
            <Alert className="mt-4 bg-[#1a1a1a] border-[#00ff9d] text-[#00ff9d]">
              <AlertTitle className="text-[#00ff9d] font-bold">
                {t.finalDecision}
              </AlertTitle>
              <AlertDescription className="text-[#00ff9d]">
                {decision}
              </AlertDescription>
            </Alert>
          )}

          {/* Import/Export buttons */}
          <div className="flex justify-center mb-2">
            <ImportExportButtons
              onExport={handleExport}
              onImport={handleImportClick}
              language={language}
              className="flex items-center space-x-2"
            />
          </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              importDecisionProcess(
                e,
                setAlternatives,
                setCriteria,
                setDecision,
                t
              );
              setHasUnsavedChanges(false);
            }}
            accept=".json"
          />

          {/* Contact Section mais próximo do footer */}
          <div className="mt-2">
            <ContactSection />
          </div>

          {/* Disclaimer Modal */}
          <DisclaimerModal
            isOpen={isDisclaimerOpen}
            onClose={() => setIsDisclaimerOpen(false)}
            onConfirm={handleDisclaimerConfirm}
            language={language}
          />
        </div>
      </div>
    </div>
  );
};

export default DecisionHelper; // Exporta o componente para uso em outras partes da aplicação

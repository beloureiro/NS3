import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Brain, ChevronDown, Plus, Trash2, Send, CheckCircle } from 'lucide-react';
import {
  Button, Input, Textarea, Card, CardHeader, CardContent, CardFooter, CardTitle,
  Alert, AlertTitle, AlertDescription, DisclaimerModal
} from './HelperComponents';
import { calculateWeightedScores, ImprovedScatterChart } from './DecisionLogic';
import { translations } from './translation';

const DecisionHelper = () => {
  // Estados do componente (mantidos sem alterações)
  const [alternatives, setAlternatives] = useState([]);
  const [decision, setDecision] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [criteria, setCriteria] = useState([
    { name: 'Importance', weight: 5 },
    { name: 'Urgency', weight: 4 },
  ]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const t = translations[language];

  // Funções do componente (mantidas sem alterações)
  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'pt' : 'en');
  };

  const addAlternative = () => {
    setAlternatives([...alternatives, { name: '', scores: criteria.map(() => 0) }]);
  };

  const removeAlternative = (index) => {
    const newAlternatives = alternatives.filter((_, i) => i !== index);
    setAlternatives(newAlternatives);
  };

  const updateAlternative = (index, field, value) => {
    const newAlternatives = [...alternatives];
    if (field === 'name') {
      newAlternatives[index].name = value;
    } else {
      newAlternatives[index].scores[field] = parseFloat(value);
    }
    setAlternatives(newAlternatives);
  };

  const addCriterion = () => {
    setCriteria([...criteria, { name: '', weight: 3 }]);
  };

  const updateCriterion = (index, field, value) => {
    const newCriteria = [...criteria];
    newCriteria[index][field] = field === 'weight' ? parseFloat(value) : value;
    setCriteria(newCriteria);
  };

  const removeCriterion = (index) => {
    const newCriteria = criteria.filter((_, i) => i !== index);
    setCriteria(newCriteria);
    setAlternatives(alternatives.map(alt => ({
      ...alt,
      scores: alt.scores.filter((_, i) => i !== index)
    })));
  };

  const makeDecision = () => {
    if (alternatives.length < 2) {
      setDecision(t.addTwoAlternatives);
      return;
    }

    const weightedScores = calculateWeightedScores(alternatives, criteria);
    const bestAlternative = weightedScores.reduce((prev, current) =>
      (current.score > prev.score) ? current : prev
    );

    setDecision(t.bestAlternative.replace('{name}', bestAlternative.name).replace('{score}', bestAlternative.score.toFixed(2)));
  };

  const processUserInput = () => {
    const words = userInput.toLowerCase().split(/\s+/);
    const extractedAlternatives = [];
    let currentAlternative = { name: '', scores: [] };

    words.forEach((word, index) => {
      if (word !== 'and' && word !== 'or' && word !== 'e' && word !== 'ou') {
        currentAlternative.name += (currentAlternative.name ? ' ' : '') + word;
      }

      if (index === words.length - 1 || ['and', 'or', 'e', 'ou'].includes(words[index + 1])) {
        if (currentAlternative.name) {
          currentAlternative.scores = criteria.map(() => Math.floor(Math.random() * 5) + 1);
          extractedAlternatives.push(currentAlternative);
          currentAlternative = { name: '', scores: [] };
        }
      }
    });

    setAlternatives(extractedAlternatives);
    setUserInput('');
    suggestCriteria(words);
  };

  const suggestCriteria = (words) => {
    const commonCriteria = ['cost', 'time', 'quality', 'risk', 'benefit', 'impact', 'viability', 'durability', 'satisfaction', 'innovation',
                            'custo', 'tempo', 'qualidade', 'risco', 'benefício', 'impacto', 'viabilidade', 'durabilidade', 'satisfação', 'inovação'];
    const suggestedCriteria = commonCriteria.filter(criterion => words.includes(criterion));

    if (suggestedCriteria.length > 0) {
      setCriteria([...criteria, ...suggestedCriteria.map(name => ({ name, weight: 3 }))]);
    }
  };

  const handleDecideClick = () => {
    setIsDisclaimerOpen(true);
  };

  const handleDisclaimerConfirm = () => {
    setIsDisclaimerOpen(false);
    makeDecision();
  };

  return (
    // Container principal com largura total e estilos básicos
    <div className="p-4 min-h-screen bg-black text-gray-300 font-sans antialiased">
      {/* Cabeçalho do componente */}
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="text-[#00ff9d] hover:underline">{t.back}</Link>
        <h1 className="text-3xl font-bold text-[#f1f5f9]">{t.title}</h1>
        <Button onClick={toggleLanguage} className="bg-[#f1f5f9] hover:bg-[#00864c] text-black">
          <Globe className="mr-2 h-4 w-4 inline" /> {language === 'en' ? 'PT' : 'EN'}
        </Button>
      </div>
      
      {/* Container do conteúdo principal - usa largura total com padding responsivo */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Subtítulo centralizado com largura máxima para melhor legibilidade */}
        <p className="text-lg text-[#f1f5f9] italic text-center mb-8 max-w-3xl mx-auto">{t.subtitle}</p>
  
        {/* Grid layout para organizar os cartões em telas maiores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cartão para descrever o dilema */}
          <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00ff9d]/20 mb-6">
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
          <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00ff9d]/20 mb-6">
            <CardHeader>
              <CardTitle className="text-[#f1f5f9]">{t.decisionCriteria}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criteria.map((criterion, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-[#00ff9d] font-bold min-w-[24px]">{index + 1}.</span>
                    <Input
                      className="flex-grow bg-[#111111] text-gray-300 border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md"
                      placeholder={t.criterionName}
                      value={criterion.name}
                      onChange={(e) => updateCriterion(index, 'name', e.target.value)}
                    />
                    <Input
                      className="w-24 bg-[#111111] text-gray-300 border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md"
                      type="number"
                      placeholder={t.weight}
                      value={criterion.weight}
                      onChange={(e) => updateCriterion(index, 'weight', e.target.value)}
                    />
                    <Button
                      onClick={() => removeCriterion(index)}
                      className="bg-red-900 hover:bg-red-800 rounded-full p-2 transition-colors duration-300"
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
                className="w-full bg-[#374151] hover:bg-[#00864c] text-white font-medium flex items-center justify-center space-x-2 py-2 px-4 rounded transition-colors duration-300"
              >
                <Plus className="h-4 w-4" />
                <span>{t.addCriterion}</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
  
        {/* Cartão para adicionar e gerenciar alternativas - largura total */}
        <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00864c]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-[#00ff9d]">{t.alternatives}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alternatives.map((alt, altIndex) => (
                <div key={altIndex} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#00ff9d] font-bold min-w-[24px]">{altIndex + 1}.</span>
                    <Input
                      className="flex-grow bg-[#111111] text-gray-300 border-[#333333] focus:border-[#00ff9d] focus:ring-[#00864c] rounded-md"
                      placeholder={t.alternativeName}
                      value={alt.name}
                      onChange={(e) => updateAlternative(altIndex, 'name', e.target.value)}
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
                      <div key={critIndex} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">{criterion.name}:</span>
                        <Input
                          className="flex-grow bg-[#111111] text-gray-300 border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md"
                          type="number"
                          placeholder={t.score}
                          value={alt.scores[critIndex]}
                          onChange={(e) => updateAlternative(altIndex, critIndex, e.target.value)}
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
        <Card className="bg-[#0a0a0a] border-[#333333] shadow-[#00ff9d]/20 mb-6 overflow-hidden">
          <CardHeader>
            <CardTitle onClick={() => setShowMatrix(!showMatrix)} className="text-[#00ff9d] flex items-center justify-between cursor-pointer">
              {t.decisionMatrix}
              <ChevronDown className={`transition-transform ${showMatrix ? 'rotate-180' : ''}`} />
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
          <Alert className="mt-6 bg-[#1a1a1a] border-[#00ff9d] text-[#00ff9d]">
            <AlertTitle className="text-[#00ff9d] font-bold">{t.finalDecision}</AlertTitle>
            <AlertDescription className="text-[#00ff9d]">{decision}</AlertDescription>
          </Alert>
        )}
      </div>
  
      {/* Modal de isenção de responsabilidade */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        onConfirm={handleDisclaimerConfirm}
        language={language}
      />
    </div>
  );
};

export default DecisionHelper;

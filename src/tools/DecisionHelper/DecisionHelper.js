import React, { useState } from 'react';
// Importa o React e o hook useState, que permite gerenciar o estado dentro do componente.

import { Link } from 'react-router-dom';
// Importa o componente Link do react-router-dom para navegação entre páginas.

import { Globe, Brain, ChevronDown, Plus, Trash2, Send } from 'lucide-react';
// Importa ícones específicos do pacote lucide-react para usar no design do componente.

import {
  Button, Input, Textarea, Card, CardHeader, CardContent, CardFooter, CardTitle,
  Alert, AlertTitle, AlertDescription, DisclaimerModal, translations
} from './HelperComponents';
// Importa vários componentes personalizados e traduções de um arquivo auxiliar.

import { calculateWeightedScores, ImprovedScatterChart } from './DecisionLogic';
// Importa uma função de cálculo de pontuações ponderadas e um gráfico personalizado de um arquivo de lógica de decisão.

const DecisionHelper = () => {
  // Define o componente funcional DecisionHelper.

  const [alternatives, setAlternatives] = useState([]);
  // Estado para armazenar as alternativas que o usuário irá adicionar.

  const [decision, setDecision] = useState(null);
  // Estado para armazenar a decisão final calculada.

  const [userInput, setUserInput] = useState('');
  // Estado para armazenar a entrada de texto do usuário sobre o dilema.

  const [criteria, setCriteria] = useState([
    { name: 'Importance', weight: 5 },
    { name: 'Urgency', weight: 4 },
  ]);
  // Estado para armazenar os critérios que serão usados na decisão, com valores padrão.

  const [showMatrix, setShowMatrix] = useState(false);
  // Estado para controlar a exibição da matriz de decisão.

  const [language, setLanguage] = useState('en');
  // Estado para armazenar a linguagem atual do aplicativo.

  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  // Estado para controlar a visibilidade do modal de isenção de responsabilidade.

  const t = translations[language];
  // Variável para acessar as traduções baseadas na linguagem selecionada.

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'pt' : 'en');
  };
  // Função para alternar entre inglês e português.

  const addAlternative = () => {
    setAlternatives([...alternatives, { name: '', scores: criteria.map(() => 0) }]);
  };
  // Função para adicionar uma nova alternativa à lista de alternativas.

  const removeAlternative = (index) => {
    const newAlternatives = alternatives.filter((_, i) => i !== index);
    setAlternatives(newAlternatives);
  };
  // Função para remover uma alternativa específica da lista.

  const updateAlternative = (index, field, value) => {
    const newAlternatives = [...alternatives];
    if (field === 'name') {
      newAlternatives[index].name = value;
    } else {
      newAlternatives[index].scores[field] = parseFloat(value);
    }
    setAlternatives(newAlternatives);
  };
  // Função para atualizar o nome ou as pontuações de uma alternativa específica.

  const addCriterion = () => {
    setCriteria([...criteria, { name: '', weight: 3 }]);
  };
  // Função para adicionar um novo critério à lista de critérios.

  const updateCriterion = (index, field, value) => {
    const newCriteria = [...criteria];
    newCriteria[index][field] = field === 'weight' ? parseFloat(value) : value;
    setCriteria(newCriteria);
  };
  // Função para atualizar o nome ou o peso de um critério específico.

  const removeCriterion = (index) => {
    const newCriteria = criteria.filter((_, i) => i !== index);
    setCriteria(newCriteria);
    setAlternatives(alternatives.map(alt => ({
      ...alt,
      scores: alt.scores.filter((_, i) => i !== index)
    })));
  };
  // Função para remover um critério específico e atualizar as alternativas para refletir essa remoção.

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
  // Função para calcular e determinar a melhor alternativa com base nas pontuações ponderadas dos critérios.

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
  // Função para processar a entrada do usuário e extrair alternativas com pontuações geradas aleatoriamente.

  const suggestCriteria = (words) => {
    const commonCriteria = ['cost', 'time', 'quality', 'risk', 'benefit', 'impact', 'viability', 'durability', 'satisfaction', 'innovation',
                            'custo', 'tempo', 'qualidade', 'risco', 'benefício', 'impacto', 'viabilidade', 'durabilidade', 'satisfação', 'inovação'];
    const suggestedCriteria = commonCriteria.filter(criterion => words.includes(criterion));
    
    if (suggestedCriteria.length > 0) {
      setCriteria([...criteria, ...suggestedCriteria.map(name => ({ name, weight: 3 }))]);
    }
  };
  // Função para sugerir critérios com base nas palavras encontradas na entrada do usuário.

  const handleDecideClick = () => {
    setIsDisclaimerOpen(true);
  };
  // Função para abrir o modal de isenção de responsabilidade antes de tomar uma decisão.

  const handleDisclaimerConfirm = () => {
    setIsDisclaimerOpen(false);
    makeDecision();
  };
  // Função para confirmar a isenção de responsabilidade e prosseguir com a tomada de decisão.

  return (
    <div className="p-4 min-h-screen bg-black text-gray-300 font-sans antialiased">
      {/* Contêiner principal com estilos de fundo, cor do texto e fonte */}
      <div className="flex justify-between items-center mb-4">
        {/* Barra de navegação com link para a página inicial e botão para alternar idioma */}
        <Link to="/" className="text-[#00ff9d] hover:underline">&larr; Back to home</Link>
        {/* Link para a página inicial */}
        <Button onClick={toggleLanguage} className="bg-[#f1f5f9] hover:bg-[#00864c] text-black">
          <Globe className="mr-2 h-4 w-4 inline" /> {language === 'en' ? 'PT' : 'EN'}
        </Button>
        {/* Botão para alternar entre inglês e português */}
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Contêiner centralizado com largura máxima */}
        <div className="text-center mb-8">
          {/* Título e subtítulo */}
          <h1 className="text-3xl font-bold mb-2 text-[#f1f5f9]">{t.title}</h1>
          <p className="text-lg text-[#f1f5f9] italic">{t.subtitle}</p>
        </div>

        <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00ff9d]/20 mb-6">
          {/* Card para descrever o dilema */}
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
            {/* Textarea para o usuário descrever seu dilema */}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={processUserInput} 
              className="w-full bg-[#374151] hover:bg-[#00864c] text-white font-medium flex items-center justify-center space-x-2 py-2 px-4 rounded transition-colors duration-300"
            >
              <Send className="h-4 w-4" />
              <span>{t.analyzeOptions}</span>
            </Button>
            {/* Botão para processar a entrada do usuário */}
          </CardFooter>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00ff9d]/20 mb-6">
          {/* Card para gerenciar os critérios de decisão */}
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
                  {/* Cada critério possui um campo de nome, um campo de peso e um botão de exclusão */}
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
            {/* Botão para adicionar um novo critério */}
          </CardFooter>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00864c]/20 mb-6">
          {/* Card para gerenciar as alternativas */}
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
                    {/* Cada alternativa possui um campo de nome e um botão de exclusão */}
                  </div>
                  <div className="grid grid-cols-2 gap-4 ml-8">
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
                        {/* Cada critério de cada alternativa possui um campo para pontuação */}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end items-center space-x-2">
            <Button
              onClick={addAlternative}
              className="bg-[#374151] hover:bg-[#4a5568] text-white font-medium py-2 px-4 rounded transition-colors duration-300 flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" /> {t.addAlternative}
            </Button>
            <Button
              onClick={handleDecideClick}
              className="bg-[#374151] hover:bg-[#4a5568] text-white font-medium py-2 px-4 rounded transition-colors duration-300"
            >
              {t.decide}
            </Button>
            {/* Botões para adicionar nova alternativa e tomar a decisão */}
          </CardFooter>
        </Card>

        <Card className="bg-[#0a0a0a] border-[#333333] shadow-[#00ff9d]/20 mb-6 overflow-hidden">
          {/* Card para exibir a matriz de decisão */}
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
              {/* Componente de gráfico personalizado que exibe a matriz de decisão */}
            </CardContent>
          )}
        </Card>

        {decision && (
          <Alert className="mt-6 bg-[#1a1a1a] border-[#00ff9d] text-[#00ff9d]">
            <AlertTitle className="text-[#00ff9d] font-bold">{t.finalDecision}</AlertTitle>
            <AlertDescription className="text-[#00ff9d]">{decision}</AlertDescription>
          </Alert>
        )}
        {/* Exibe um alerta com a decisão final */}
      </div>

      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        onConfirm={handleDisclaimerConfirm}
        language={language}
      />
      {/* Modal de isenção de responsabilidade que deve ser confirmado antes da tomada de decisão */}
    </div>
  );
};

export default DecisionHelper;
// Exporta o componente para ser utilizado em outras partes da aplicação.

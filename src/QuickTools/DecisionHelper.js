import React, { useState } from 'react';
import { Plus, Trash2, Send, Brain, ChevronDown, Globe } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

// Simplified UI components
const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded ${className}`}>{children}</button>
);

const Input = ({ className, ...props }) => (
  <input className={`p-2 rounded ${className}`} {...props} />
);

const Textarea = ({ className, ...props }) => (
  <textarea className={`p-2 rounded ${className}`} {...props} />
);

const Card = ({ children, className }) => (
  <div className={`border rounded-lg overflow-hidden ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => <div className="p-4 border-b">{children}</div>;
const CardContent = ({ children }) => <div className="p-4">{children}</div>;
const CardFooter = ({ children }) => <div className="p-4 border-t">{children}</div>;
const CardTitle = ({ children, className, onClick }) => <h3 className={`text-lg font-semibold cursor-pointer ${className}`} onClick={onClick}>{children}</h3>;

const Alert = ({ children, className }) => (
  <div className={`p-4 rounded-lg ${className}`}>{children}</div>
);
const AlertTitle = ({ children }) => <h4 className="font-bold mb-2">{children}</h4>;
const AlertDescription = ({ children }) => <p>{children}</p>;

// Translations
const translations = {
  en: {
    title: "Advanced Decision Matrix",
    subtitle: "Wisdom lies in weighing all variables before deciding",
    describeDilemma: "Describe your dilemma",
    dilemmaPlaceholder: "Ex: Should I choose between buying a more expensive new car or a cheaper used one",
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
  },
  pt: {
    title: "Matriz de Decisão Avançada",
    subtitle: "A sabedoria está em ponderar todas as variáveis antes de decidir",
    describeDilemma: "Descreva seu dilema",
    dilemmaPlaceholder: "Ex: Devo escolher entre comprar um carro novo que é mais caro ou um usado mais barato",
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
  },
};

const DecisionHelper = () => {
  const [alternatives, setAlternatives] = useState([]);
  const [decision, setDecision] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [criteria, setCriteria] = useState([
    { name: 'Importance', weight: 5 },
    { name: 'Urgency', weight: 4 },
  ]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [language, setLanguage] = useState('en');

  const t = translations[language];

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

  const calculateWeightedScores = () => {
    return alternatives.map(alt => ({
      name: alt.name,
      score: alt.scores.reduce((acc, score, index) => acc + score * criteria[index].weight, 0) / criteria.reduce((acc, crit) => acc + crit.weight, 0)
    }));
  };

  const makeDecision = () => {
    if (alternatives.length < 2) {
      setDecision(t.addTwoAlternatives);
      return;
    }

    const weightedScores = calculateWeightedScores();
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

  return (
    <div className="p-4 min-h-screen bg-black text-gray-300 font-sans antialiased">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="text-[#00ff9d] hover:underline">&larr; Back to home</Link>
        <Button onClick={toggleLanguage} className="bg-[#f1f5f9] hover:bg-[#00864c] text-black">
          <Globe className="mr-2 h-4 w-4 inline" /> {language === 'en' ? 'PT' : 'EN'}
        </Button>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#f1f5f9]">{t.title}</h1>
          <p className="text-lg text-[#f1f5f9] italic">{t.subtitle}</p>
        </div>

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
            <Button onClick={processUserInput} className="w-full bg-[#374151] hover:bg-[#00864c] text-white font-medium">
              <Send className="mr-2 h-4 w-4" /> {t.analyzeOptions}
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00ff9d]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-[#f1f5f9]">{t.decisionCriteria}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criteria.map((criterion, index) => (
                <div key={index} className="flex items-center space-x-2">
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
                  <Button onClick={() => removeCriterion(index)} className="bg-red-900 hover:bg-red-800 rounded-full p-2">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={addCriterion} className="w-full bg-[#374151] hover:bg-[#00864c] text-white font-medium">
              <Plus className="mr-2 h-4 w-4" /> {t.addCriterion}
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00864c]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-[#00ff9d]">{t.alternatives}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alternatives.map((alt, altIndex) => (
                <div key={altIndex} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      className="flex-grow bg-[#111111] text-gray-300 border-[#333333] focus:border-[#00ff9d] focus:ring-[#00864c] rounded-md"
                      placeholder={t.alternativeName}
                      value={alt.name}
                      onChange={(e) => updateAlternative(altIndex, 'name', e.target.value)}
                    />
                    <Button onClick={() => removeAlternative(altIndex)} className="bg-red-900 hover:bg-red-800 rounded-full p-2">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
          <CardFooter className="flex justify-between">
            <Button onClick={addAlternative} className="bg-[#374151] hover:bg-[#00864c] text-white font-medium">
              <Plus className="mr-2 h-4 w-4" /> {t.addAlternative}
            </Button>
            <Button onClick={makeDecision} className="bg-[#374151] hover:bg-[#00864c] text-white font-medium">
              Decidir
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00ff9d]/20 mb-6">
          <CardHeader>
            <CardTitle onClick={() => setShowMatrix(!showMatrix)}>
              {t.decisionMatrix} <ChevronDown className={`inline-block transition-transform ${showMatrix ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          {showMatrix && (
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis type="number" dataKey="x" name="score" unit="" stroke="#00ff9d" />
                    <YAxis type="number" dataKey="y" name="weight" unit="" stroke="#00ff9d" />
                    <ZAxis type="number" dataKey="z" range={[100, 1000]} name="score" unit="" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', color: '#00ff9d' }} />
                    <Scatter data={alternatives.map((alt, index) => ({
                      x: calculateWeightedScores()[index].score, // Usando a pontuação calculada para o eixo x
                      y: criteria[0].weight,  // Usando o peso do primeiro critério para o eixo y
                      z: calculateWeightedScores()[index].score * 200,
                      name: alt.name
                    }))} fill="#00ff9d" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          )}
        </Card>

        {decision && (
          <Alert className="mt-6 bg-[#1a1a1a] border-[#00ff9d] text-[#00ff9d]">
            <AlertTitle className="text-[#00ff9d] font-bold">{t.finalDecision}</AlertTitle>
            <AlertDescription className="text-[#00ff9d]">{decision}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DecisionHelper;

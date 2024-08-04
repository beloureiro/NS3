import React, { useState } from 'react';
import { Plus, Trash2, Send, Brain, ChevronDown, Globe } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Legend } from 'recharts';
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
    calculationDetails: "Calculation Details",
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
    calculationDetails: "Detalhes do Cálculo",
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

  const renderCalculationDetails = () => {
    const weightedScores = calculateWeightedScores();
    const totalWeight = criteria.reduce((acc, crit) => acc + crit.weight, 0);

    return (
      <Card className="bg-[#1a1a1a] border-[#333333] shadow-[#00ff9d]/20 mb-6">
        <CardHeader>
          <CardTitle className="text-[#00ff9d]">{t.calculationDetails}</CardTitle>
        </CardHeader>
        <CardContent>
          {alternatives.map((alt, index) => (
            <div key={index} className="mb-4 p-2 border border-[#333333] rounded">
              <h4 className="text-[#00ff9d] mb-2">{alt.name}</h4>
              <p className="text-sm text-gray-300">
                (
                {alt.scores.map((score, i) => (
                  <span key={i}>
                    {i > 0 && ' + '}({score} * {criteria[i].weight})
                  </span>
                ))}
                ) / {totalWeight} = 
                {' '}
                (
                {alt.scores.map((score, i) => (
                  <span key={i}>
                    {i > 0 && ' + '}{score * criteria[i].weight}
                  </span>
                ))}
                ) / {totalWeight} = 
                {' '}
                {weightedScores[index].score.toFixed(2)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    );
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
            <Button 
              onClick={processUserInput} 
              className="w-full bg-[#374151] hover:bg-[#00864c] text-white font-medium flex items-center justify-center space-x-2 py-2 px-4 rounded transition-colors duration-300"
            >
              <Send className="h-4 w-4" />
              <span>{t.analyzeOptions}</span>
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
      onClick={makeDecision}
      className="bg-[#374151] hover:bg-[#4a5568] text-white font-medium py-2 px-4 rounded transition-colors duration-300"
    >
      {t.decide}
    </Button>
  </CardFooter>
</Card>
<Card className="bg-[#0a0a0a] border-[#333333] shadow-[#00ff9d]/20 mb-6 overflow-hidden">
  <CardHeader>
    <CardTitle onClick={() => setShowMatrix(!showMatrix)} className="text-[#00ff9d] flex items-center justify-between cursor-pointer">
      {t.decisionMatrix}
      <ChevronDown className={`transition-transform ${showMatrix ? 'rotate-180' : ''}`} />
    </CardTitle>
  </CardHeader>
  {showMatrix && (
    <CardContent className="p-0">
      <div className="h-80 w-full relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiIGlkPSJncmlkIj48c3RvcCBzdG9wLWNvbG9yPSIjMDBmZjlkIiBzdG9wLW9wYWNpdHk9IjAuMSIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiMwMGZmOWQiIHN0b3Atb3BhY2l0eT0iMCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
            <XAxis 
              type="number" 
              dataKey="x" 
              name="score" 
              unit="" 
              stroke="#00ff9d" 
              tickLine={false} 
              axisLine={false}
              label={{ value: 'Score', position: 'bottom', fill: '#00ff9d' }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="weight" 
              unit="" 
              stroke="#00ff9d" 
              tickLine={false} 
              axisLine={false}
              label={{ value: 'Weight', angle: -90, position: 'left', fill: '#00ff9d' }}
            />
            <ZAxis type="number" dataKey="z" range={[100, 1000]} name="score" unit="" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }} 
              contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', boxShadow: '0 0 10px #00ff9d', color: '#00ff9d' }}
              itemStyle={{ color: '#00ff9d' }}
              formatter={(value, name, props) => [value.toFixed(2), props.payload.name]}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              content={({ payload }) => (
                <div className="flex justify-center space-x-4">
                  {payload.map((entry, index) => (
                    <span key={`legend-${index}`} className="text-[#00ff9d] text-xs">
                      <span className="inline-block w-3 h-3 rounded-full mr-1" style={{backgroundColor: entry.color}}></span>
                      {entry.value}
                    </span>
                  ))}
                </div>
              )}
            />
            <Scatter 
              data={alternatives.map((alt, index) => ({
                x: calculateWeightedScores()[index].score,
                y: criteria[0].weight,
                z: calculateWeightedScores()[index].score * 200,
                name: alt.name
              }))} 
              fill="#00ff9d"
              shape={(props) => {
                const { cx, cy, fill, payload } = props;
                return (
                  <g>
                    <circle cx={cx} cy={cy} r={8} fill={fill} fillOpacity={0.6} />
                    <circle cx={cx} cy={cy} r={8} fill="none" stroke={fill} strokeWidth={2} />
                    <circle cx={cx} cy={cy} r={12} fill="none" stroke={fill} strokeWidth={1} opacity={0.5}>
                      <animate attributeName="r" from="8" to="12" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <text x={cx} y={cy - 15} textAnchor="middle" fill="#00ff9d" fontSize="10">
                      {payload.name}
                    </text>
                  </g>
                );
              }}
            />
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

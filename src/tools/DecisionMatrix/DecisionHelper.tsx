import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, ChevronDown, CheckCircle } from 'lucide-react';
import {
  Button, Card, CardHeader, CardContent, CardTitle,
  Alert, AlertTitle, AlertDescription, DisclaimerModal
} from './HelperComponents';
import { calculateWeightedScores, ImprovedScatterChart } from './DecisionLogic';
import { translations } from './translation';
import DilemmaInput from './DilemmaInput';
import DecisionCriteria from './DecisionCriteria';

interface Criterion {
  name: string;
  weight: number;
}

interface Alternative {
  name: string;
  scores: number[];
}

const DecisionHelper: React.FC = () => {
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);
  const [decision, setDecision] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [criteria, setCriteria] = useState<Criterion[]>([
    { name: 'Importance', weight: 5 },
    { name: 'Urgency', weight: 4 },
  ]);
  const [showMatrix, setShowMatrix] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'pt' : 'en');
  };

  const addAlternative = () => {
    setAlternatives([...alternatives, { name: '', scores: criteria.map(() => 0) }]);
  };

  const removeAlternative = (index: number) => {
    const newAlternatives = alternatives.filter((_, i) => i !== index);
    setAlternatives(newAlternatives);
  };

  const updateAlternative = (index: number, field: string | number, value: string | number) => {
    const newAlternatives = [...alternatives];
    if (field === 'name') {
      newAlternatives[index].name = value as string;
    } else {
      newAlternatives[index].scores[field as number] = parseFloat(value as string);
    }
    setAlternatives(newAlternatives);
  };

  const addCriterion = () => {
    setCriteria([...criteria, { name: '', weight: 3 }]);
  };

  const updateCriterion = (index: number, field: string, value: string | number) => {
    const newCriteria = [...criteria];
    newCriteria[index][field as keyof Criterion] = field === 'weight' ? parseFloat(value as string) : value;
    setCriteria(newCriteria);
  };

  const removeCriterion = (index: number) => {
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

  const suggestCriteria = (words: string[]) => {
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
    <div className="p-4 min-h-screen bg-black text-gray-300 font-sans antialiased">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="text-[#00ff9d] hover:underline">{t.back}</Link>
        <h1 className="text-3xl font-bold text-[#f1f5f9]">{t.title}</h1>
        <Button onClick={toggleLanguage} className="bg-[#f1f5f9] hover:bg-[#00864c] text-black">
          <Globe className="mr-2 h-4 w-4 inline" /> {language === 'en' ? 'PT' : 'EN'}
        </Button>
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <p className="text-lg text-[#f1f5f9] italic text-center mb-8 max-w-3xl mx-auto">{t.subtitle}</p>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DilemmaInput
            userInput={userInput}
            setUserInput={setUserInput}
            processUserInput={processUserInput}
            t={t}
          />
  
          <DecisionCriteria
            criteria={criteria}
            alternatives={alternatives}
            updateCriterion={updateCriterion}
            removeCriterion={removeCriterion}
            addCriterion={addCriterion}
            updateAlternative={updateAlternative}
            removeAlternative={removeAlternative}
            addAlternative={addAlternative}
            handleDecideClick={handleDecideClick}
            t={t}
          />
        </div>
  
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
  
        {decision && (
          <Alert className="mt-6 bg-[#1a1a1a] border-[#00ff9d] text-[#00ff9d]">
            <AlertTitle className="text-[#00ff9d] font-bold">{t.finalDecision}</AlertTitle>
            <AlertDescription className="text-[#00ff9d]">{decision}</AlertDescription>
          </Alert>
        )}
      </div>
  
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
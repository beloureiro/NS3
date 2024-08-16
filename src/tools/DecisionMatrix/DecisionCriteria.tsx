import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button, Input, Card, CardHeader, CardContent, CardFooter, CardTitle } from './HelperComponents';

interface Criterion {
  name: string;
  weight: number;
}

interface Alternative {
  name: string;
  scores: number[];
}

interface DecisionCriteriaProps {
  criteria: Criterion[];
  alternatives: Alternative[];
  updateCriterion: (index: number, field: string, value: string | number) => void;
  removeCriterion: (index: number) => void;
  addCriterion: () => void;
  updateAlternative: (index: number, field: string | number, value: string | number) => void;
  removeAlternative: (index: number) => void;
  addAlternative: () => void;
  handleDecideClick: () => void;
  t: any; // Tipo mais específico pode ser definido baseado na estrutura das traduções
}

const DecisionCriteria: React.FC<DecisionCriteriaProps> = ({
  criteria,
  alternatives,
  updateCriterion,
  removeCriterion,
  addCriterion,
  updateAlternative,
  removeAlternative,
  addAlternative,
  handleDecideClick,
  t
}) => {
  return (
    <>
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
    </>
  );
};

export default DecisionCriteria;
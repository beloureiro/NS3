import React from 'react';
import { Brain, Send } from 'lucide-react';
import { Button, Textarea, Card, CardHeader, CardContent, CardFooter, CardTitle } from './HelperComponents';

interface DilemmaInputProps {
  userInput: string;
  setUserInput: (input: string) => void;
  processUserInput: () => void;
  t: any; // Tipo mais específico pode ser definido baseado na estrutura das traduções
}

const DilemmaInput: React.FC<DilemmaInputProps> = ({ userInput, setUserInput, processUserInput, t }) => {
  return (
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
  );
};

export default DilemmaInput;
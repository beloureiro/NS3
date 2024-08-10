import React from 'react';
import { Link } from 'react-router-dom';
import translations from './translations';

const QuickTools = ({ language }) => {
  const t = translations[language].quickTools;

  const tools = [
    { name: t.processFlow, path: "/process-flow", phrase: t.phraseProcessFlow },
    { name: t.decisionHelper, path: "/decision-helper", phrase: t.phraseDecisionMatrix },
    { name: t.actionPlan, path: "/5w2h", phrase: t.phraseActionPlan },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6 text-center">
      <h3 className="text-lg font-semibold mb-3 text-white">{t.title}</h3>
      <ul className="space-y-2">
        {tools.map((tool, index) => (
          <li key={index} className="flex flex-col sm:flex-row items-center justify-center text-sm">
            <div className="flex items-center mb-1 sm:mb-0">
              <span className="text-green-400 mr-2">{index + 1}.</span>
              <Link to={tool.path} className="text-green-400 hover:underline">
                {tool.name}
              </Link>
            </div>
            <span className="text-white sm:ml-2">- {tool.phrase}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickTools;
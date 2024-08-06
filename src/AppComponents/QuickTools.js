import React from 'react';
import { Link } from 'react-router-dom';
import translations from './translations'; // Importando as traduções

const QuickTools = ({ language }) => {
  const t = translations[language].quickTools;
  const tools = [
    { name: t.decisionHelper, path: "/decision-helper" },
    { name: t.actionPlan, path: "/5w2h" },
    { name: t.processFlow, path: "/process-flow" },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6 transition-all duration-300">
      <h3 className="text-lg font-semibold mb-3">{t.title}</h3>
      <ul className="space-y-2">
        {tools.map((tool, index) => (
          <li key={index}>
            <Link to={tool.path} className="text-green-400 hover:underline">
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickTools;

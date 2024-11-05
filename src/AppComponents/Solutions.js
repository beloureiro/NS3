import React from 'react';
import { Link } from 'react-router-dom';

const Solutions = ({ language }) => {
  const solutions = [
    {
      name: 'InProcess',
      description: language === 'en' 
        ? 'Process optimization methodology'
        : 'Metodologia de otimização de processos',
      path: '/inprocess',
      titleColor: '#00ff9d'
    },
    {
      name: '4Menu',
      description: language === 'en'
        ? 'Menu management solution'
        : 'Solução de gestão de cardápios',
      path: '/4menu',
      titleColor: '#FF6B6B'
    },
    {
      name: 'Rex',
      description: language === 'en'
        ? 'Customer experience platform'
        : 'Plataforma de experiência do cliente',
      path: '/rex',
      titleColor: '#ffff08'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {solutions.map((solution, index) => (
        <Link
          key={index}
          to={solution.path}
          className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
        >
          <h3 
            className="text-xl font-bold mb-2"
            style={{ color: solution.titleColor }}
          >{solution.name}</h3>
          <p className="text-gray-300">{solution.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default Solutions;

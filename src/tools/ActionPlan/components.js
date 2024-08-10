import React from 'react';

// Componentes de UI reutilizáveis
export const Card = ({ children, className }) => (
  <div className={`bg-[#1a1a1a] border border-[#333333] rounded-lg shadow-lg ${className}`}>{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-[#333333]">{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-[#f1f5f9]">{children}</h2>
);

export const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full bg-[#111111] text-gray-300 border border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md p-2"
  />
);

export const DateInput = ({ ...props }) => (
  <input
    {...props}
    type="date"
    className="w-full bg-[#111111] text-gray-300 border border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md p-2"
  />
);

export const Button = ({ children, selected, ...props }) => (
  <button
    {...props}
    className={`bg-[#374151] hover:bg-[#00864c] text-white font-medium py-2 px-4 rounded transition-colors duration-300 flex items-center ${
      selected ? 'bg-[#00ff9d] text-black' : ''
    }`}
  >
    {children}
  </button>
);

export const Timeline = ({ currentQuestion, questions }) => (
  <div className="flex justify-between mb-4">
    {questions.map((_, index) => (
      <div
        key={index}
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          index <= currentQuestion ? 'bg-[#00ff9d] text-black' : 'bg-gray-600 text-white'
        }`}
      >
        {index + 1}
      </div>
    ))}
  </div>
);

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#1a1a1a', border: '1px solid #00ff9d', padding: '10px', borderRadius: '5px' }}>
        <p className="label" style={{ color: '#00ff9d' }}>{`${data.name}`}</p>
        <p style={{ color: '#fff' }}>{`Days to Complete: ${data.daysToComplete}`}</p>
        <p style={{ color: '#fff' }}>{`Urgency: ${data.urgency}`}</p>
        <p style={{ color: '#fff' }}>{`Importance: ${data.importance}`}</p>
      </div>
    );
  }
  return null;
};

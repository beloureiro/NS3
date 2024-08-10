import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const BubbleChart = ({ data }) => {
  // Função para determinar a cor das células com base na urgência e importância.
  const getCellColor = (urgency, importance) => {
    if (urgency === 1 && importance === 1) {
      return 'red';
    } else if (urgency === 5 && importance === 5) {
      return 'green';
    } else {
      return 'yellow';
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#333333] rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold text-[#f1f5f9] mb-4">Bubble Chart</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <XAxis dataKey="urgency" type="number" domain={[0, 6]} ticks={[1, 3, 5]} />
          <YAxis dataKey="importance" type="number" domain={[0, 6]} ticks={[1, 3, 5]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data} fill="#00ff9d">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getCellColor(entry.urgency, entry.importance)}
                r={entry.count * 10} // Aumenta o tamanho da bolha conforme a quantidade de ações
              >
                <text x={entry.urgency} y={entry.importance} dy={-10} fill="#ffffff" fontSize={14} textAnchor="middle">
                  {entry.daysToComplete.toFixed(1)} dias
                </text>
              </Cell>
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BubbleChart;

import React from 'react';
import { ResponsiveContainer, ComposedChart, Scatter, XAxis, YAxis, Tooltip, Cell, ReferenceArea } from 'recharts';

// O componente Card é usado para criar um contêiner com borda, fundo e sombra que agrupa outros elementos da UI.
export const Card = ({ children, className }) => (
  // A classe `bg-[#1a1a1a]` define o fundo do card, `border` adiciona bordas, e `shadow-lg` cria uma sombra para o card.
  <div className={`bg-[#1a1a1a] border border-[#333333] rounded-lg shadow-lg ${className}`}>{children}</div>
);

// O componente CardHeader é utilizado para criar um cabeçalho dentro do card, geralmente para um título.
export const CardHeader = ({ children }) => 
  // `p-4` define o padding, e `border-b` adiciona uma borda inferior.
  <div className="p-4 border-b border-[#333333]">{children}</div>;

// O componente CardContent é usado para agrupar o conteúdo principal dentro do card.
export const CardContent = ({ children }) => 
  // `p-4` adiciona padding ao conteúdo.
  <div className="p-4">{children}</div>;

// O componente CardTitle define o estilo do título dentro do card, com fonte em negrito e cor específica.
export const CardTitle = ({ children }) => 
  // `text-xl` define o tamanho da fonte e `font-bold` torna o texto em negrito.
  <h2 className="text-xl font-bold text-[#f1f5f9]">{children}</h2>;

// O componente Input cria um campo de entrada de texto estilizado.
export const Input = ({ ...props }) => (
  // A classe `focus:border-[#00ff9d]` altera a cor da borda quando o campo é focado.
  <input
    {...props}
    className="w-full bg-[#111111] text-gray-300 border border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md p-2"
  />
);

// O componente DateInput cria um campo de entrada para datas, com estilo similar ao do Input.
export const DateInput = ({ ...props }) => (
  <input
    {...props}
    type="date"
    className="w-full bg-[#111111] text-gray-300 border border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md p-2"
  />
);

// O componente Button cria um botão estilizado, que muda de aparência quando selecionado.
export const Button = ({ children, selected, ...props }) => (
  // `bg-[#374151]` define a cor de fundo, e a classe `hover:bg-[#00864c]` altera a cor ao passar o mouse sobre o botão.
  <button
    {...props}
    className={`bg-[#374151] hover:bg-[#00864c] text-white font-medium py-2 px-4 rounded transition-colors duration-300 flex items-center ${
      selected ? 'bg-[#00ff9d] text-black' : ''
    }`}
  >
    {children}
  </button>
);

// O componente Timeline exibe uma linha do tempo visual que mostra o progresso das perguntas.
export const Timeline = ({ currentQuestion, questions }) => (
  // `flex justify-between` distribui os elementos da linha do tempo igualmente.
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

// O componente CustomTooltip é usado para mostrar informações detalhadas quando o usuário passa o mouse sobre elementos do gráfico.
export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#1a1a1a', border: '1px solid #00ff9d', padding: '10px', borderRadius: '5px' }}>
        <p className="label" style={{ color: '#00ff9d' }}>{`${data.name}`}</p>
        <p style={{ color: '#fff' }}>{`Urgency: ${data.urgency}`}</p>
        <p style={{ color: '#fff' }}>{`Importance: ${data.importance}`}</p>
        <p style={{ color: '#fff' }}>{`Days to Complete: ${data.daysToComplete}`}</p>
      </div>
    );
  }
  return null;
};

// O componente ActionPlanChart renderiza um gráfico composto com áreas de referência e dispersão dos dados.
export const ActionPlanChart = ({ data }) => {
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
    // O ResponsiveContainer torna o gráfico responsivo, ajustando-se ao tamanho do contêiner pai.
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        {/* XAxis e YAxis definem os eixos X e Y do gráfico */}
        <XAxis dataKey="urgency" type="number" domain={[0, 6]} ticks={[1, 3, 5]} />
        <YAxis dataKey="importance" type="number" domain={[0, 6]} ticks={[1, 3, 5]} />
        {/* Tooltip mostra informações detalhadas ao passar o mouse sobre os pontos */}
        <Tooltip content={<CustomTooltip />} />
        {/* ReferenceArea destaca áreas específicas do gráfico */}
        <ReferenceArea x1={0} x2={2} y1={0} y2={2} fill="rgba(255, 0, 0, 0.1)" />
        <ReferenceArea x1={0} x2={2} y1={2} y2={4} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={0} x2={2} y1={4} y2={6} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={2} x2={4} y1={0} y2={2} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={2} x2={4} y1={2} y2={4} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={2} x2={4} y1={4} y2={6} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={4} x2={6} y1={0} y2={2} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={4} x2={6} y1={2} y2={4} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={4} x2={6} y1={4} y2={6} fill="rgba(0, 255, 0, 0.1)" />
        {/* Scatter cria pontos dispersos no gráfico */}
        <Scatter dataKey="importance" fill="#00ff9d">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getCellColor(entry.urgency, entry.importance)}>
              {/* O texto dentro do gráfico exibe os dias restantes para completar a ação */}
              <text x={entry.urgency} y={entry.importance} dy={-10} fill="#ffffff" fontSize={14} textAnchor="middle">
                {entry.daysToComplete}
              </text>
            </Cell>
          ))}
        </Scatter>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

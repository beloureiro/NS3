import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Componente CustomTooltip: uma tooltip personalizada que exibe informações detalhadas
// sobre o item quando o usuário passa o mouse sobre um ponto no gráfico.
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    // Extrai os dados do item que o usuário está visualizando
    const data = payload[0].payload;
    return (
      // A tooltip é estilizada com um fundo escuro, borda verde e padding para afastar o conteúdo das bordas
      <div className="custom-tooltip" style={{ backgroundColor: '#1a1a1a', border: '1px solid #00ff9d', padding: '10px', borderRadius: '5px' }}>
        {/* Exibe o nome do item */}
        <p className="label" style={{ color: '#00ff9d' }}>{`${data.name}`}</p>
        {/* Exibe os detalhes do item como dias para completar, urgência e importância */}
        <p style={{ color: '#fff' }}>{`Days to Complete: ${data.daysToComplete}`}</p>
        <p style={{ color: '#fff' }}>{`Urgency: ${data.urgency}`}</p>
        <p style={{ color: '#fff' }}>{`Importance: ${data.importance}`}</p>
      </div>
    );
  }
  return null; // Se a tooltip não estiver ativa ou não houver dados, não exibe nada
};

// Componente QuadrantChart: um gráfico de dispersão personalizado que exibe ações baseadas em urgência e importância.
const QuadrantChart = ({ actions }) => {
  // Função para gerar um deslocamento aleatório para evitar sobreposição exata dos pontos no gráfico
  const getRandomOffset = () => (Math.random() - 0.5) * 1.2;  // Aumenta o intervalo do deslocamento aleatório

  // Mapeia as ações para adicionar um deslocamento aleatório a urgência e importância, garantindo que estejam dentro dos limites [1.1, 4.9]
  const data = actions.map(action => ({
    ...action,
    urgency: Math.max(1.1, Math.min(4.9, action.urgency + getRandomOffset())),
    importance: Math.max(1.1, Math.min(4.9, action.importance + getRandomOffset())),
  }));

  return (
    // Contêiner responsivo para o gráfico, garantindo que ocupe 100% da largura disponível e uma altura de 96 unidades
    <div className="h-96 w-full relative">
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
          {/* Define uma seta personalizada que será usada nas extremidades dos eixos */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00ff9d" />
            </marker>
          </defs>
          {/* Eixo X (Urgency) com setas nas extremidades e rótulos personalizados */}
          <XAxis
            type="number"
            dataKey="urgency"
            name="urgency"
            stroke="#00ff9d"
            tickLine={false}
            axisLine={{ stroke: '#00ff9d', markerEnd: 'url(#arrow)' }}  // Seta no eixo X
            domain={[1, 5]}  // Limites do eixo
            interval={0}
            ticks={[1, 3, 5]}  // Posições dos ticks
            label={{ value: 'Urgency', position: 'insideBottom', offset: -15, fill: '#00ff9d' }}  // Rótulo do eixo
          />
          {/* Eixo Y (Importance) com setas nas extremidades e rótulos personalizados */}
          <YAxis
            type="number"
            dataKey="importance"
            name="importance"
            stroke="#00ff9d"
            tickLine={false}
            axisLine={{ stroke: '#00ff9d', markerEnd: 'url(#arrow)' }}  // Seta no eixo Y
            domain={[1, 5]}  // Limites do eixo
            interval={0}
            ticks={[1, 3, 5]}  // Posições dos ticks
            label={{ value: 'Importance', angle: -90, position: 'insideLeft', offset: -15, fill: '#00ff9d' }}  // Rótulo do eixo
          />
          <Tooltip content={<CustomTooltip />} /> 
          {/* Áreas coloridas de fundo, representando diferentes quadrantes */}
          <g>
            <rect x="0%" y="66.66%" width="33.33%" height="33.33%" fill="#ff6347" opacity="0.3" />
            <rect x="66.66%" y="0%" width="33.33%" height="33.33%" fill="#98fb98" opacity="0.3" />
            <rect x="0%" y="0%" width="33.33%" height="66.66%" fill="#ffd700" opacity="0.3" />
            <rect x="33.33%" y="0%" width="33.33%" height="33.33%" fill="#ffd700" opacity="0.3" />
            <rect x="33.33%" y="33.33%" width="33.33%" height="66.66%" fill="#ffd700" opacity="0.3" />
            <rect x="66.66%" y="33.33%" width="33.33%" height="66.66%" fill="#ffd700" opacity="0.3" />
          </g>
          {/* Linhas de grade para os quadrantes */}
          <line x1="33.33%" y1="0%" x2="33.33%" y2="100%" stroke="#00ff9d" strokeOpacity={0.3} />
          <line x1="66.66%" y1="0%" x2="66.66%" y2="100%" stroke="#00ff9d" strokeOpacity={0.3} />
          <line x1="0%" y1="33.33%" x2="100%" y2="33.33%" stroke="#00ff9d" strokeOpacity={0.3} />
          <line x1="0%" y1="66.66%" x2="100%" y2="66.66%" stroke="#00ff9d" strokeOpacity={0.3} />
          {/* Desenha os pontos no gráfico, com círculos personalizados e rótulos */}
          <Scatter
            data={data}
            fill="#00ff9d"
            shape={(props) => {
              const { cx, cy, fill, payload } = props;
              const size = 18;  // Tamanho dos círculos
              return (
                <g>
                  {/* Desenha um círculo no ponto (cx, cy) */}
                  <circle cx={cx} cy={cy} r={size} fill={fill} fillOpacity={0.6} />
                  {/* Adiciona um rótulo acima do círculo */}
                  <text x={cx} y={cy - size - 5} textAnchor="middle" fill="#00ff9d" fontSize="10">
                    {payload.name}
                  </text>
                </g>
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuadrantChart;

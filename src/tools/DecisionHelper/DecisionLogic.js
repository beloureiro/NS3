import React from 'react';
// Importa o React para criar componentes.

import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from 'recharts';
// Importa componentes específicos do Recharts para construir o gráfico de dispersão.

export const calculateWeightedScores = (alternatives, criteria) => {
  // Função para calcular as pontuações ponderadas de cada alternativa com base nos critérios.

  return alternatives.map(alt => ({
    name: alt.name,
    // Nome da alternativa.

    score: alt.scores.reduce((acc, score, index) => acc + score * criteria[index].weight, 0) / criteria.reduce((acc, crit) => acc + crit.weight, 0)
    // Calcula a pontuação ponderada somando os produtos das pontuações e pesos dos critérios,
    // e depois dividindo pelo somatório dos pesos dos critérios.
  }));
};

const CustomTooltip = ({ active, payload, language }) => {
  // Componente para personalizar o tooltip (dica) que aparece quando o usuário passa o mouse sobre um ponto no gráfico.

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    // Obtém os dados do ponto sobre o qual o mouse está passando.

    const t = translations[language];
    // Usa as traduções baseadas no idioma selecionado.

    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#1a1a1a', padding: '10px', border: '1px solid #00ff9d' }}>
        {/* Tooltip personalizado com fundo escuro e borda verde */}
        <p className="label" style={{ color: '#00ff9d' }}>{`${t.name}: ${data.name}`}</p>
        <p style={{ color: '#00ff9d' }}>{`${t.score}: ${data.x.toFixed(2)}`}</p>
        <p style={{ color: '#00ff9d' }}>{`${t.avgCriterionWeight}: ${data.y.toFixed(2)}`}</p>
        {/* Exibe o nome, pontuação e peso médio do critério da alternativa */}
      </div>
    );
  }
  return null;
  // Retorna null se o tooltip não estiver ativo.
};

export const ImprovedScatterChart = ({ alternatives, criteria, calculateWeightedScores, language }) => {
  // Componente que renderiza um gráfico de dispersão personalizado.

  const t = translations[language];
  // Usa as traduções baseadas no idioma selecionado.

  const data = alternatives.map((alt, index) => {
    const weightedScore = calculateWeightedScores(alternatives, criteria)[index].score;
    // Calcula a pontuação ponderada para cada alternativa.

    return {
      x: weightedScore,
      // Define a posição no eixo X como a pontuação ponderada.

      y: criteria.reduce((acc, criterion) => acc + criterion.weight * alt.scores[criteria.indexOf(criterion)], 0) / criteria.length,
      // Calcula a posição no eixo Y como a média ponderada dos pesos dos critérios.

      z: weightedScore * 200,
      // Define o tamanho do ponto no gráfico (eixo Z) com base na pontuação ponderada.

      name: alt.name
      // Define o nome da alternativa.
    };
  });

  return (
    <div className="h-80 w-full relative">
      {/* Contêiner para o gráfico com altura e largura ajustáveis */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiIGlkPSJncmlkIj48c3RvcCBzdG9wLWNvbG9yPSIjMDBmZjlkIiBzdG9wLW9wYWNpdHk9IjAuMSIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiMwMGZmOWQiIHN0b3Atb3BhY2l0eT0iMCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      {/* Fundo decorativo com padrão SVG */}
      <ResponsiveContainer>
        {/* Componente que torna o gráfico responsivo */}
        <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
          {/* Gráfico de dispersão com margens definidas */}
          <XAxis
            type="number"
            dataKey="x"
            name="score"
            unit=""
            stroke="#00ff9d"
            tickLine={false}
            axisLine={false}
            label={{ value: t.weightedScore, position: 'bottom', fill: '#00ff9d' }}
            // Configurações do eixo X, incluindo o rótulo e a cor do eixo.
          />
          <YAxis
            type="number"
            dataKey="y"
            name="weight"
            unit=""
            stroke="#00ff9d"
            tickLine={false}
            axisLine={false}
            label={{ value: t.avgCriterionWeight, angle: -90, position: 'left', fill: '#00ff9d' }}
            // Configurações do eixo Y, incluindo o rótulo e a cor do eixo.
          />
          <ZAxis type="number" dataKey="z" range={[100, 1000]} name="score" unit="" />
          {/* Configurações do eixo Z, que define o tamanho dos pontos no gráfico */}
          <Tooltip content={<CustomTooltip language={language} />} />
          {/* Tooltip personalizado que exibe informações adicionais ao passar o mouse sobre os pontos */}
          <Scatter
            data={data}
            fill="#00ff9d"
            shape={(props) => {
              const { cx, cy, fill, payload } = props;
              const size = (payload.z / 200) * 5;
              return (
                <g>
                  <circle cx={cx} cy={cy} r={size} fill={fill} fillOpacity={0.6} />
                  <circle cx={cx} cy={cy} r={size} fill="none" stroke={fill} strokeWidth={2} />
                  <circle cx={cx} cy={cy} r={size * 1.5} fill="none" stroke={fill} strokeWidth={1} opacity={0.5}>
                    <animate attributeName="r" from={size} to={size * 1.5} dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <text x={cx} y={cy - size - 5} textAnchor="middle" fill="#00ff9d" fontSize="10">
                    {payload.name}
                  </text>
                </g>
              );
            }}
          />
          {/* Configura os pontos no gráfico, com animações e labels personalizados */}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

const translations = {
  en: {
    weightedScore: 'Weighted Score',
    avgCriterionWeight: 'Avg. Criterion Weight',
    name: 'Name',
    score: 'Score'
  },
  pt: {
    weightedScore: 'Pontuação Ponderada',
    avgCriterionWeight: 'Peso Médio do Critério',
    name: 'Nome',
    score: 'Pontuação'
  }
};
// Objeto de traduções para suportar múltiplos idiomas (inglês e português).

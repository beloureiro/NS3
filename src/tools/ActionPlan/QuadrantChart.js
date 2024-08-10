import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
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

const QuadrantChart = ({ actions }) => {
  const getRandomOffset = () => (Math.random() - 0.5) * 1.2;  // Further increased offset range

  const data = actions.map(action => ({
    ...action,
    urgency: Math.max(1.1, Math.min(4.9, action.urgency + getRandomOffset())),
    importance: Math.max(1.1, Math.min(4.9, action.importance + getRandomOffset())),
  }));

  return (
    <div className="h-96 w-full relative">
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00ff9d" />
            </marker>
          </defs>
          <XAxis
            type="number"
            dataKey="urgency"
            name="urgency"
            stroke="#00ff9d"
            tickLine={false}
            axisLine={{ stroke: '#00ff9d', markerEnd: 'url(#arrow)' }}  // Arrow on X axis
            domain={[1, 5]}
            interval={0}
            ticks={[1, 3, 5]}
            label={{ value: 'Urgency', position: 'insideBottom', offset: -15, fill: '#00ff9d' }}
          />
          <YAxis
            type="number"
            dataKey="importance"
            name="importance"
            stroke="#00ff9d"
            tickLine={false}
            axisLine={{ stroke: '#00ff9d', markerEnd: 'url(#arrow)' }}  // Arrow on Y axis
            domain={[1, 5]}
            interval={0}
            ticks={[1, 3, 5]}
            label={{ value: 'Importance', angle: -90, position: 'insideLeft', offset: -15, fill: '#00ff9d' }}
          />
          <Tooltip content={<CustomTooltip />} />
          {/* Áreas coloridas de fundo */}
          <g>
            <rect x="0%" y="66.66%" width="33.33%" height="33.33%" fill="#ff6347" opacity="0.3" />
            <rect x="66.66%" y="0%" width="33.33%" height="33.33%" fill="#98fb98" opacity="0.3" />
            <rect x="0%" y="0%" width="33.33%" height="66.66%" fill="#ffd700" opacity="0.3" />
            <rect x="33.33%" y="0%" width="33.33%" height="33.33%" fill="#ffd700" opacity="0.3" />
            <rect x="33.33%" y="33.33%" width="33.33%" height="66.66%" fill="#ffd700" opacity="0.3" />
            <rect x="66.66%" y="33.33%" width="33.33%" height="66.66%" fill="#ffd700" opacity="0.3" />
          </g>
          {/* Linhas de grade nas bordas */}
          <line x1="33.33%" y1="0%" x2="33.33%" y2="100%" stroke="#00ff9d" strokeOpacity={0.3} />
          <line x1="66.66%" y1="0%" x2="66.66%" y2="100%" stroke="#00ff9d" strokeOpacity={0.3} />
          <line x1="0%" y1="33.33%" x2="100%" y2="33.33%" stroke="#00ff9d" strokeOpacity={0.3} />
          <line x1="0%" y1="66.66%" x2="100%" y2="66.66%" stroke="#00ff9d" strokeOpacity={0.3} />
          <Scatter
            data={data}
            fill="#00ff9d"
            shape={(props) => {
              const { cx, cy, fill, payload } = props;
              const size = 18;
              return (
                <g>
                  <circle cx={cx} cy={cy} r={size} fill={fill} fillOpacity={0.6} />
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

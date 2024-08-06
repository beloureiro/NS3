import React, { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import translations from './translations'; // Importando as traduções

const DynamicExpertiseDashboard = ({ language }) => {
  const t = translations[language].expertiseAreas;
  const [activeArea, setActiveArea] = useState('businessManagement');
  const [animateData, setAnimateData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const expertiseAreas = useMemo(() => ({
    businessManagement: {
      title: t.businessManagement,
      color: "#ADFF2F",
      skills: t.skills.businessManagement.map((skill, index) => ({ name: skill, value: [90, 85, 75, 75, 85, 80][index] }))
    },
    dataAnalysis: {
      title: t.dataAnalysis,
      color: "#4ECDC4",
      skills: t.skills.dataAnalysis.map((skill, index) => ({ name: skill, value: [85, 95, 90, 75, 75, 85][index] }))
    },
    consultingTeaching: {
      title: t.consultingTeaching,
      color: "#FFA62B",
      skills: t.skills.consultingTeaching.map((skill, index) => ({ name: skill, value: [90, 95, 80, 75, 80, 85][index] }))
    },
    designInnovation: {
      title: t.designInnovation,
      color: "#FF6B6B",
      skills: t.skills.designInnovation.map((skill, index) => ({ name: skill, value: [85, 90, 80, 75, 85][index] }))
    },
    healthLeadership: {
      title: t.healthLeadership,
      color: "#1E90FF",
      skills: t.skills.healthLeadership.map((skill, index) => ({ name: skill, value: [90, 95, 90, 75, 85][index] }))
    }
  }), [t]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setAnimateData([]);
    const timer = setTimeout(() => {
      setAnimateData(expertiseAreas[activeArea]?.skills || []);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeArea, expertiseAreas]);

  const renderRadarChart = () => {
    const desktopConfig = {
      extraRadius: 0,
      adjustmentFactor: 0.5,
      horizontalOffset: 0,
      verticalOffset: 0,
      fontSize: 15,
      lineHeight: 20
    };

    const mobileConfig = {
      extraRadius: 20,
      adjustmentFactor: 0.3,
      horizontalOffset: 0,
      verticalOffset: 0,
      fontSize: 12,
      lineHeight: 15
    };

    const config = isMobile ? mobileConfig : desktopConfig;

    const calculateExtraRadius = (angle) => {
      const normalizedAngle = Math.abs((angle % 180) - 0) / 90;
      return config.extraRadius * (1 - config.adjustmentFactor * normalizedAngle);
    };

    return (
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={animateData}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis
            dataKey="name"
            stroke="#374151"
            tick={(props) => {
              const { x, y, payload, cx, cy } = props;
              const words = payload.value.split(' ');
              const radius = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
              const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
              const extraRadius = calculateExtraRadius(angle);
              const cos = Math.cos(angle * (Math.PI / 180));
              const sin = Math.sin(angle * (Math.PI / 180));
              
              const tx = cx + (cos * (radius + extraRadius)) + config.horizontalOffset;
              const ty = cy + (sin * (radius + extraRadius)) + config.verticalOffset;

              return (
                <g transform={`translate(${tx},${ty})`}>
                  {words.map((word, index) => (
                    <text
                      key={index}
                      x={0}
                      y={index * config.lineHeight}
                      dy={0}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={config.fontSize}
                    >
                      {word}
                    </text>
                  ))}
                </g>
              );
            }}
          />
          <PolarRadiusAxis angle={61} domain={[0, 100]} stroke="#4ade80" />
          <Radar 
            name={expertiseAreas[activeArea]?.title || ''} 
            dataKey="value" 
            stroke={expertiseAreas[activeArea]?.color || '#FFFFFF'} 
            fill={expertiseAreas[activeArea]?.color || '#FFFFFF'} 
            fillOpacity={0.1} 
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-xl">
      <div className="flex flex-wrap bg-gray-800">
        {Object.keys(expertiseAreas).map(areaKey => (
          <button
            key={areaKey}
            onClick={() => setActiveArea(areaKey)}
            className={`flex-1 py-2 px-2 text-sm font-medium transition-all duration-300 ${
              activeArea === areaKey 
                ? `bg-${expertiseAreas[areaKey]?.color || 'gray-500'} text-white`
                : 'bg-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {expertiseAreas[areaKey]?.title || ''}
          </button>
        ))}
      </div>
      <div className="p-4 bg-gray-800">
        <h2 className="text-xl font-bold mb-2 text-center" style={{ color: expertiseAreas[activeArea]?.color || '#FFFFFF' }}>
          {expertiseAreas[activeArea]?.title || ''}
        </h2>
        {renderRadarChart()}
      </div>
    </div>
  );
};

export default DynamicExpertiseDashboard;

import React, { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import translations from './translations';

const DynamicExpertiseDashboard = ({ language }) => {
  // Setting translation based on selected language
  const t = translations[language].expertiseAreas;
  
  // States for active area, hovered area, animation data, and mobile check
  const [activeArea, setActiveArea] = useState('dataAnalysis');
  const [hoveredArea, setHoveredArea] = useState(null);
  const [animateData, setAnimateData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Define expertise areas - adjust titles, colors, and skill values for each area here
  const expertiseAreas = useMemo(() => ({
    dataAnalysis: {
      title: t.dataAnalysis,
      color: "#4ECDC4", // Adjust individual area colors here
      skills: t.skills.dataAnalysis.map((skill, index) => ({ 
        name: skill, 
        value: [80, 90, 90, 100, 70, 100][index] // Skill values for the radar chart
      }))
    },
    businessManagement: {
      title: t.businessManagement,
      color: "#ADFF2F",
      skills: t.skills.businessManagement.map((skill, index) => ({ 
        name: skill, 
        value: [90, 85, 75, 75, 85, 80][index] // Adjust values as needed
      }))
    },
    consultingTeaching: {
      title: t.consultingTeaching,
      color: "#FFA62B",
      skills: t.skills.consultingTeaching.map((skill, index) => ({ 
        name: skill, 
        value: [90, 95, 80, 75, 80, 85][index]
      }))
    },
    designInnovation: {
      title: t.designInnovation,
      color: "#FF6B6B",
      skills: t.skills.designInnovation.map((skill, index) => ({ 
        name: skill, 
        value: [85, 90, 80, 75, 85][index]
      }))
    },
    healthLeadership: {
      title: t.healthLeadership,
      color: "#1E90FF",
      skills: t.skills.healthLeadership.map((skill, index) => ({ 
        name: skill, 
        value: [90, 95, 90, 75, 85][index]
      }))
    }
  }), [t]);

  // Check if screen is mobile for adjusting display
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint for mobile devices if necessary
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animates radar chart data - adjust timeout to change animation speed
  useEffect(() => {
    setAnimateData([]);
    const timer = setTimeout(() => {
      setAnimateData(expertiseAreas[activeArea]?.skills || []);
    }, 50); // Adjust this delay to change animation speed
    return () => clearTimeout(timer);
  }, [activeArea, expertiseAreas]);

  // Render radar chart function
  const renderRadarChart = () => {
    // Configurations for desktop and mobile
    const desktopConfig = {
      width: "100%",
      height: 250,
      outerRadius: "80%", // Desktop-specific radius
      extraRadius: 0,
      adjustmentFactor: 0.5,
      fontSize: 15,
      lineHeight: 17
    };
  
    const mobileConfig = {
      width: "100%",
      height: 200,
      outerRadius: "60%", // Reduced radius for mobile
      extraRadius: 20,
      adjustmentFactor: 0.3,
      fontSize: 10,
      lineHeight: 12
    };
  
    const config = isMobile ? mobileConfig : desktopConfig;
  
    return (
      <ResponsiveContainer width={config.width} height={config.height}>
        <RadarChart cx="50%" cy="50%" outerRadius={config.outerRadius} data={animateData}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis
            dataKey="name"
            stroke="#374151"
            tick={(props) => {
              const { x, y, payload, cx, cy } = props;
              const words = payload.value.split(' ');
              const radius = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
              const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
              const extraRadius = config.extraRadius * (1 - config.adjustmentFactor * Math.abs((angle % 180) - 0) / 90);
              const cos = Math.cos(angle * (Math.PI / 180));
              const sin = Math.sin(angle * (Math.PI / 180));
              const tx = cx + (cos * (radius + extraRadius));
              const ty = cy + (sin * (radius + extraRadius));
  
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
          <PolarRadiusAxis angle={61} domain={[0, 100]} stroke="#4ade80" fontSize={14} />
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
    <div className="w-full max-w-4xl mx-auto bg-transparent rounded-lg overflow-hidden shadow-xl">
      {/* "Our Expertise" text block */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          {t.ourExpertise}
        </h2>
        <p className="leading-relaxed text-center max-w-4xl mx-auto">
          {t.expertiseDescriptionShort}
        </p>
      </div>
      
      {/* Category buttons - implementing responsiveness */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} justify-center bg-transparent mb-4`}>
        {Object.keys(expertiseAreas).map((areaKey) => (
          <button
            key={areaKey}
            onClick={() => setActiveArea(areaKey)}
            onMouseEnter={() => setHoveredArea(areaKey)}
            onMouseLeave={() => setHoveredArea(null)}
            className={`${
              isMobile ? 'w-full my-1' : 'flex-1 mx-1 my-1'
            } py-2 px-2 text-sm font-medium transition-all duration-300 border-2 ${
              activeArea === areaKey
                ? `bg-${expertiseAreas[areaKey]?.color || 'gray-500'} text-white border-${expertiseAreas[areaKey]?.color || 'gray-500'}`
                : 'bg-[#1f2937] text-gray-300 border-gray-500 hover:bg-gray-800 hover:text-white'
            } rounded-md`}
            style={{
              flex: isMobile ? 'none' : '0 0 14%', // Adjust button width for desktop and mobile
              borderColor: hoveredArea === areaKey ? expertiseAreas[areaKey]?.color : '#374151',
              marginTop: '-0.5rem'
            }}
          >
            {expertiseAreas[areaKey]?.title || ''}
          </button>
        ))}
      </div>

      {/* Radar chart display */}
      <div className="p-4 bg-transparent">
        <h2
          className="text-xl font-bold mb-2 text-center"
          style={{ 
            color: expertiseAreas[activeArea]?.color || '#FFFFFF',
            marginTop: '-1rem' // Adjust margin-top to move title upwards
          }}
        >
          {expertiseAreas[activeArea]?.title || ''}
        </h2>
        {renderRadarChart()}
      </div>
    </div>
  );
};

export default DynamicExpertiseDashboard;

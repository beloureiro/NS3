import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Mail, Phone, Linkedin, MessageCircle, Wrench } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';
import logo from './assets/rsz_1design_inmotion_181818.png';
import ErrorPage from './ErrorPage';
import DecisionHelper from './QuickTools/DecisionHelper';

const DynamicExpertiseDashboard = () => {
  const [activeArea, setActiveArea] = useState('businessManagement');
  const [animateData, setAnimateData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const expertiseAreas = useMemo(() => ({
    businessManagement: {
      title: "Business Management",
      color: "#ADFF2F",
      skills: [
        { name: "Operational Management", value: 90 },
        { name: "Process Improvement", value: 85 },
        { name: "Strategic Planning", value: 75 },
        { name: "Financial Analysis", value: 75 },
        { name: "Project Management", value: 85 },
        { name: "Customer Satisfaction", value: 80 }
      ]
    },
    dataAnalysis: {
      title: "Data Analysis & Technology",
      color: "#4ECDC4",
      skills: [
        { name: "Business Intelligence", value: 85 },
        { name: "Microsoft Power BI", value: 95 },
        { name: "Data Modeling", value: 90 },
        { name: "Python Programming", value: 75 },
        { name: "Advanced Excel", value: 75 },
        { name: "Artificial Intelligence", value: 85 }
      ]
    },
    consultingTeaching: {
      title: "Consulting & Teaching",
      color: "#FFA62B",
      skills: [
        { name: "Business Consulting", value: 90 },
        { name: "Problem-Solving Training", value: 95 },
        { name: "Financial Training", value: 80 },
        { name: "Lean Process Management", value: 75 },
        { name: "Strategic Planning", value: 80 },
        { name: "Solution Development", value: 85 }
      ]
    },
    designInnovation: {
      title: "Design & Innovation",
      color: "#FF6B6B",
      skills: [
        { name: "Design", value: 85 },
        { name: "Innovation", value: 90 },
        { name: "Creativity", value: 80 },
        { name: "Product Development", value: 75 },
        { name: "Innovative Solutions", value: 85 }
      ]
    },
    healthLeadership: {
      title: "Health Leadership",
      color: "#1E90FF",
      skills: [
        { name: "Leadership", value: 90 },
        { name: "Inclusion & Diversity", value: 95 },
        { name: "Emotional Intelligence", value: 90 },
        { name: "Wellness Programs", value: 75 },
        { name: "Health & Safety Policies", value: 85 }
      ]
    }
  }), []);

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

const QuickTools = () => {
  const tools = [
    { name: "Decision Helper", path: "/decision-helper" },
    { name: "Tool 2", path: "/tool2" },
    { name: "Tool 3", path: "/tool3" },
    { name: "Tool 4", path: "/tool4" },
    { name: "Tool 5", path: "/tool5" },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6 transition-all duration-300">
      <h3 className="text-lg font-semibold mb-3">Quick Tools</h3>
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

function App() {
  const [showTools, setShowTools] = useState(false);

  return (
    <Router>
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>InMotion - Consulting</title>
          <meta name="description" content="Your Daily Toolbox for Business Excellence" />
        </Helmet>
        <div className="w-full max-w-4xl text-center">
          <Routes>
            <Route path="/" element={
              <>
                <h1 className="text-4xl font-bold mb-2">Solution in Business Management</h1>
                
                <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
                  <img src={logo} alt="InMotion logo" className="mx-auto" />
                  <p className="mt-1 text-gray-400">Your Daily Toolbox for Business Excellence</p>
                </div>
                
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold mb-2">Our Expertise</h2>
                  <p className="leading-relaxed">
                    Explore our dynamic range of skills across key business domains. Our expertise is 
                    tailored to elevate your business performance through innovative solutions and 
                    strategic insights.
                  </p>
                </div>
                
                <DynamicExpertiseDashboard />
                
                <div className="mt-6 mb-6">
                  <button
                    onClick={() => setShowTools(!showTools)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-1 px-3 rounded inline-flex items-center transition-colors duration-300"
                  >
                    <Wrench className="mr-1" size={16} />
                    <span>Quick Tools</span>
                  </button>
                </div>

                {showTools && <QuickTools />}
                
                <div className="mt-4">
                  <h2 className="text-2xl font-semibold mb-2">Transform Your Business Today</h2>
                  <div className="flex justify-center space-x-6">
                    <a href="mailto:bc@inmotion.today" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                      <Mail size={24} />
                    </a>
                    <a href="tel:+351915542701" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                      <Phone size={24} />
                    </a>
                    <a href="https://www.linkedin.com/company/inmotionc" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                      <Linkedin size={24} />
                    </a>
                    <a href="https://wa.me/351915542701" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
                      <MessageCircle size={24} />
                    </a>
                  </div>
                </div>
              </>
            } />
            <Route path="/decision-helper" element={<DecisionHelper />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
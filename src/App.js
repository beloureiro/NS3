import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import './index.css';
import logo from './assets/rsz_1design_inmotion_181818.png';

const DynamicExpertiseDashboard = () => {
  const [activeArea, setActiveArea] = useState('businessManagement');
  const [animateData, setAnimateData] = useState([]);

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
        { name: "Business Intelligence (BI)", value: 85 },
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
    setAnimateData([]);
    const timer = setTimeout(() => {
      setAnimateData(expertiseAreas[activeArea].skills);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeArea, expertiseAreas]);

  const renderRadarChart = () => (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={animateData}>
        <PolarGrid stroke="#000000" />
        <PolarAngleAxis
          dataKey="name"
          stroke="#ffffff"
          tick={{ fontSize: 14, wordWrap: 'break-word', whiteSpace: 'pre-wrap', textAlign: 'center' }}
          tickFormatter={(value) => {
            const words = value.split(' ');
            if (words.length > 1) {
              return `${words[0]}\n${words.slice(1).join(' ')}`;
            }
            return value;
          }}
        />
        <PolarRadiusAxis angle={55} domain={[0, 100]} stroke="#4ade80" />
        <Radar name={expertiseAreas[activeArea].title} dataKey="value" stroke={expertiseAreas[activeArea].color} fill={expertiseAreas[activeArea].color} fillOpacity={0.3} />
      </RadarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-xl"> {/* Aqui ajustamos a cor de fundo */}
      <div className="flex flex-wrap bg-gray-800"> {/* Aqui ajustamos a cor de fundo dos botões */}
        {Object.keys(expertiseAreas).map(areaKey => (
          <button
            key={areaKey}
            onClick={() => setActiveArea(areaKey)}
            className={`flex-1 py-3 px-2 text-sm font-medium transition-all duration-300 ${
              activeArea === areaKey 
                ? `bg-${expertiseAreas[activeArea].color} text-white`
                : 'bg-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {expertiseAreas[areaKey].title}
          </button>
        ))}
      </div>
      <div className="p-6 bg-gray-800"> {/* Aqui ajustamos a cor de fundo do gráfico */}
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: expertiseAreas[activeArea].color }}>
          {expertiseAreas[activeArea].title}
        </h2>
        {renderRadarChart()}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>InMotion - Consulting</title>
        <meta name="description" content="Your Daily Toolbox for Business Excellence" />
      </Helmet>
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-4">Solution in Business Management</h1>
        
        <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
          <img src={logo} alt="InMotion logo" className="mx-auto" />
          <p className="mt-2 text-gray-400">Your Daily Toolbox for Business Excellence</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Expertise</h2>
          <p className="leading-relaxed">
            Explore our dynamic range of skills across key business domains. Our expertise é 
            tailored to elevate your business performance through innovative solutions and 
            strategic insights.
          </p>
        </div>
        
        <DynamicExpertiseDashboard />
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Transform Your Business Today</h2>
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
      </div>
    </div>
  );
}

export default App;

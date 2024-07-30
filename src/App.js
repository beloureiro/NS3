import React, { useState, useEffect, useMemo } from 'react'; // Importa bibliotecas e hooks do React.
import { Helmet } from 'react-helmet'; // Importa o Helmet para manipulação do head do documento.
import { Mail, Phone, Linkedin, MessageCircle } from 'lucide-react'; // Importa ícones da biblioteca lucide-react.
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'; // Importa componentes do Recharts para criar gráficos.
import './index.css'; // Importa o arquivo de estilos CSS.
import logo from './assets/rsz_1design_inmotion_181818.png'; // Importa o logo da aplicação.

const DynamicExpertiseDashboard = () => { // Define um componente funcional chamado DynamicExpertiseDashboard.
  const [activeArea, setActiveArea] = useState('businessManagement'); // Estado para controlar a área de expertise ativa.
  const [animateData, setAnimateData] = useState([]); // Estado para controlar os dados do gráfico.
  const [isMobile, setIsMobile] = useState(false); // Estado para verificar se o dispositivo é mobile.

  // Define as áreas de expertise e suas habilidades usando useMemo para otimização.
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
  }), []); // A lista de áreas de expertise é definida uma vez e memorizada.

  useEffect(() => { // useEffect para verificar se o dispositivo é mobile.
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Verifica se a largura da janela é menor ou igual a 768px.
    };

    checkMobile(); // Chama a função checkMobile quando o componente é montado.
    window.addEventListener('resize', checkMobile); // Adiciona um listener para o evento de redimensionamento da janela.

    return () => window.removeEventListener('resize', checkMobile); // Remove o listener quando o componente é desmontado.
  }, []); // Executa o efeito apenas uma vez quando o componente é montado.

  useEffect(() => { // useEffect para animar os dados do gráfico.
    setAnimateData([]); // Reseta os dados do gráfico.
    const timer = setTimeout(() => {
      setAnimateData(expertiseAreas[activeArea]?.skills || []); // Atualiza os dados do gráfico com base na área ativa após um pequeno atraso.
    }, 50);
    return () => clearTimeout(timer); // Limpa o timeout quando o componente é desmontado ou o activeArea muda.
  }, [activeArea, expertiseAreas]); // Executa o efeito quando activeArea ou expertiseAreas muda.

  const renderRadarChart = () => { // Função para renderizar o gráfico de radar.
    const desktopConfig = { // Configurações para desktop.
      extraRadius: 0,
      adjustmentFactor: 0.5,
      horizontalOffset: 0,
      verticalOffset: 0,
      fontSize: 15,
      lineHeight: 20
    };

    const mobileConfig = { // Configurações para mobile.
      extraRadius: 20,
      adjustmentFactor: 0.3,
      horizontalOffset: 0,
      verticalOffset: 0,
      fontSize: 12,
      lineHeight: 15
    };

    const config = isMobile ? mobileConfig : desktopConfig; // Seleciona a configuração com base no tipo de dispositivo.

    const calculateExtraRadius = (angle) => { // Função para calcular o raio extra com base no ângulo.
      const normalizedAngle = Math.abs((angle % 180) - 0) / 90;
      return config.extraRadius * (1 - config.adjustmentFactor * normalizedAngle);
    };

    return (
      <ResponsiveContainer width="100%" height={400}> {/* Contêiner responsivo para o gráfico */}
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={animateData}> {/* Definição do gráfico de radar */}
          <PolarGrid stroke="#374151" /> {/* Grade polar */}
          <PolarAngleAxis
            dataKey="name"
            stroke="#374151"
            tick={(props) => { // Customização dos rótulos dos eixos angulares.
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
          <PolarRadiusAxis angle={61} domain={[0, 100]} stroke="#4ade80" /> {/* Eixo radial */}
          <Radar 
            name={expertiseAreas[activeArea]?.title || ''} 
            dataKey="value" 
            stroke={expertiseAreas[activeArea]?.color || '#FFFFFF'} 
            fill={expertiseAreas[activeArea]?.color || '#FFFFFF'} 
            fillOpacity={0.1} 
          /> {/* Definição do radar */}
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-xl"> {/* Contêiner principal */}
      <div className="flex flex-wrap bg-gray-800"> {/* Contêiner dos botões */}
        {Object.keys(expertiseAreas).map(areaKey => ( // Itera sobre as áreas de expertise para criar botões.
          <button
            key={areaKey}
            onClick={() => setActiveArea(areaKey)} // Define a área ativa ao clicar no botão.
            className={`flex-1 py-2 px-2 text-sm font-medium transition-all duration-300 ${
              activeArea === areaKey 
                ? `bg-${expertiseAreas[areaKey]?.color || 'gray-500'} text-white`
                : 'bg-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {expertiseAreas[areaKey]?.title || ''} {/* Título da área */}
          </button>
        ))}
      </div>
      <div className="p-4 bg-gray-800"> {/* Contêiner do gráfico */}
        <h2 className="text-xl font-bold mb-2 text-center" style={{ color: expertiseAreas[activeArea]?.color || '#FFFFFF' }}>
          {expertiseAreas[activeArea]?.title || ''} {/* Título da área ativa */}
        </h2>
        {renderRadarChart()} {/* Renderiza o gráfico de radar */}
      </div>
    </div>
  );
};

function App() { // Componente principal do aplicativo.
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4"> {/* Contêiner principal */}
      <Helmet> {/* Manipulação do head do documento */}
        <title>InMotion - Consulting</title>
        <meta name="description" content="Your Daily Toolbox for Business Excellence" />
      </Helmet>
      <div className="w-full max-w-4xl text-center"> {/* Contêiner do conteúdo */}
        <h1 className="text-4xl font-bold mb-2">Solution in Business Management</h1> {/* Título principal */}
        
        <div className="mb-4 transform hover:scale-105 transition-transform duration-300"> {/* Contêiner do logo */}
          <img src={logo} alt="InMotion logo" className="mx-auto" /> {/* Imagem do logo */}
          <p className="mt-1 text-gray-400">Your Daily Toolbox for Business Excellence</p> {/* Descrição */}
        </div>
        
        <div className="mb-4"> {/* Contêiner da seção "Our Expertise" */}
          <h2 className="text-2xl font-semibold mb-2">Our Expertise</h2> {/* Título da seção */}
          <p className="leading-relaxed">
            Explore our dynamic range of skills across key business domains. Our expertise is 
            tailored to elevate your business performance through innovative solutions and 
            strategic insights.
          </p> {/* Descrição da seção */}
        </div>
        
        <DynamicExpertiseDashboard /> {/* Componente do dashboard de expertise */}
        
        <div className="mt-4"> {/* Contêiner da seção de contatos */}
          <h2 className="text-2xl font-semibold mb-2">Transform Your Business Today</h2> {/* Título da seção */}
          <div className="flex justify-center space-x-6"> {/* Contêiner dos ícones de contato */}
            <a href="mailto:bc@inmotion.today" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
              <Mail size={24} /> {/* Ícone de email */}
            </a>
            <a href="tel:+351915542701" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
              <Phone size={24} /> {/* Ícone de telefone */}
            </a>
            <a href="https://www.linkedin.com/company/inmotionc" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
              <Linkedin size={24} /> {/* Ícone do LinkedIn */}
            </a>
            <a href="https://wa.me/351915542701" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
              <MessageCircle size={24} /> {/* Ícone do WhatsApp */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; // Exporta o componente principal.

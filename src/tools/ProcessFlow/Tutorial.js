import React, { useState } from 'react'; // Adicione useState
import { translations } from './utils';
import Timeline from './Timeline';
import { Info } from 'lucide-react'; // Certifique-se de ter o pacote lucide-react instalado

const Tutorial = ({ language, isOpen, toggleTutorial }) => {
  const [isButtonVisible, setButtonVisible] = useState(true); // Estado para controlar a visibilidade do botão
  const t = translations[language] || {}; // Fallback para evitar erro

  const steps = [
    { title: t.tutorialStep1 || "Default Step 1" },
    { title: t.tutorialStep2 || "Default Step 2" },
    { title: t.tutorialStep3 || "Default Step 3" },
    { title: t.tutorialStep4 || "Default Step 4" }, // Usando a tradução correta
  ];

  const handleButtonClick = () => {
    toggleTutorial(); // Chama a função para alternar a visibilidade
    setButtonVisible(false); // Oculta o botão ao clicar
  };

  return (
    <div className="relative mb-4">
      {isButtonVisible && ( // Renderiza o botão apenas se estiver visível
        <button
          onClick={handleButtonClick}
          className="absolute top-4 right-4 flex items-center bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition"
          title="Toggle Tutorial"
        >
          <Info className="h-5 w-5 mr-1" />
          <span className="text-sm md:text-base">Tutorial</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-[#1a1a1a] text-white p-4 rounded-lg shadow-lg mt-2">
          <Timeline steps={steps} />
        </div>
      )}
    </div>
  );
};

export default Tutorial;

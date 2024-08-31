import React from 'react';

const Timeline = ({ steps }) => {
  return (
    <div className="relative flex items-start flex-col md:flex-row"> {/* Flex para responsividade */}
      <div className="absolute left-4 top-0 h-full border-l-2 border-gray-300 z-0 hidden md:block"></div> {/* Oculta a linha em telas menores */}
      <div className="flex flex-col items-start z-10 w-full"> {/* Largura total para responsividade */}
        {steps.map((step, index) => (
          <div key={index} className="flex items-center mb-4 relative"> 
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm hidden md:flex" style={{ aspectRatio: '1 / 1' }}>
              {index + 1}
            </div>
            <div className="ml-4"> 
              <h3 className="text-sm md:text-lg font-semibold">{step.title}</h3>
              <p className="text-xs md:text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;

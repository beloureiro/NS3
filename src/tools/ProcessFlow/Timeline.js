import React from 'react';

const Timeline = ({ steps }) => {
  return (
    <div className="flex flex-col relative">
      {/* Linha vertical da timeline */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white"></div>

      {steps.map((step, index) => (
        <div key={index} className="flex items-start mb-8 relative">
          {/* Círculo numerado */}
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm relative z-10">
            {index + 1}
          </div>

          {/* Texto ao lado do círculo */}
          <div className="ml-12">
            <h3 className="text-sm md:text-lg font-semibold">{step.title}</h3>
            <p className="text-xs md:text-sm">{step.description}</p>
          </div>

          {/* Linha que conecta os círculos */}
          {index < steps.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-white"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;

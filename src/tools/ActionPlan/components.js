import React from 'react';

// Componente de cartão reutilizável que pode ser usado como um contêiner estilizado.
// Recebe os filhos (children) para renderizar dentro do cartão e uma classe CSS opcional (className) para personalização adicional.
export const Card = ({ children, className }) => (
  <div className={`bg-[#1a1a1a] border border-[#333333] rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

// Componente para o cabeçalho do cartão, que adiciona padding e uma borda inferior para separar do conteúdo do cartão.
// Recebe os filhos (children) para renderizar dentro do cabeçalho.
export const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-[#333333]">
    {children}
  </div>
);

// Componente para o conteúdo do cartão, que adiciona padding ao redor dos elementos dentro do cartão.
// Recebe os filhos (children) para renderizar dentro do conteúdo.
export const CardContent = ({ children }) => (
  <div className="p-4">
    {children}
  </div>
);

// Componente para o título do cartão, estilizado com uma fonte grande e negrito.
// Recebe os filhos (children), que geralmente serão o texto do título.
export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-[#f1f5f9]">
    {children}
  </h2>
);

// Componente de input reutilizável, que representa um campo de entrada de texto.
// Todos os atributos (props) do input são passados diretamente para o elemento input HTML.
// Estilizado para ter uma aparência consistente em todo o projeto.
export const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full bg-[#111111] text-gray-300 border border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md p-2"
  />
);

// Componente de input de data reutilizável, semelhante ao componente Input, mas com o tipo de input definido como 'date'.
// Todos os atributos (props) do input são passados diretamente para o elemento input HTML.
export const DateInput = ({ ...props }) => (
  <input
    {...props}
    type="date"
    className="w-full bg-[#111111] text-gray-300 border border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md p-2"
  />
);

// Componente de botão reutilizável, com suporte para um estado 'selecionado'.
// Quando o botão está selecionado, ele muda de cor para indicar ao usuário.
// Recebe os filhos (children) para renderizar dentro do botão e quaisquer outros atributos (props) que serão passados para o botão HTML.
export const Button = ({ children, selected, ...props }) => (
  <button
    {...props}
    className={`bg-[#374151] hover:bg-[#00864c] text-white font-medium py-2 px-4 rounded transition-colors duration-300 flex items-center ${
      selected ? 'bg-[#00ff9d] text-black' : ''
    }`}
  >
    {children}
  </button>
);

// Componente de linha do tempo (Timeline), que exibe uma série de círculos representando o progresso através das perguntas.
// O círculo muda de cor quando a pergunta correspondente foi alcançada ou superada.
// - currentQuestion: índice da pergunta atual, usado para determinar o progresso.
// - questions: uma lista de perguntas (ou placeholders), usada para gerar os círculos.
export const Timeline = ({ currentQuestion, questions }) => (
  <div className="flex justify-between mb-4">
    {questions.map((_, index) => (
      <div
        key={index}
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          index <= currentQuestion ? 'bg-[#00ff9d] text-black' : 'bg-gray-600 text-white'
        }`}
      >
        {index + 1}
      </div>
    ))}
  </div>
);

// Componente de tooltip (dica de ferramenta) personalizado, usado para exibir informações detalhadas quando o usuário passa o mouse sobre um elemento gráfico.
// Só é mostrado quando ativo (active) e quando há dados para exibir (payload).
// A tooltip exibe informações sobre 'Days to Complete', 'Urgency', e 'Importance' de um item.
export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#1a1a1a', border: '1px solid #00ff9d', padding: '10px', borderRadius: '5px' }}>
        {/* Exibe o nome do item */}
        <p className="label" style={{ color: '#00ff9d' }}>{`${data.name}`}</p>
        {/* Exibe o número de dias para completar */}
        <p style={{ color: '#fff' }}>{`Days to Complete: ${data.daysToComplete}`}</p>
        {/* Exibe a urgência do item */}
        <p style={{ color: '#fff' }}>{`Urgency: ${data.urgency}`}</p>
        {/* Exibe a importância do item */}
        <p style={{ color: '#fff' }}>{`Importance: ${data.importance}`}</p>
      </div>
    );
  }
  return null; // Retorna null se a tooltip não estiver ativa ou não houver dados.
};

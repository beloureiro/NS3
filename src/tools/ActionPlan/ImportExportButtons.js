// ImportExportButtons.js

// Importa o React, uma biblioteca JavaScript usada para construir interfaces de usuário.
import React from 'react';

// Importa o componente Button de um arquivo local, que provavelmente é um botão estilizado de acordo com o design do projeto.
import { Button } from './components';

// Importa os ícones de download e upload da biblioteca 'lucide-react', que são usados para ilustrar os botões de exportar e importar.
import { Download, Upload } from 'lucide-react';

// Define um componente funcional React chamado ImportExportButtons.
// Este componente aceita algumas propriedades: onExport, onImport, t e className.
// - onExport: uma função que será executada quando o botão de exportar for clicado.
// - onImport: uma função que será executada quando o botão de importar for clicado.
// - t: um objeto de tradução, usado para definir os textos dos botões.
// - className: uma string opcional para adicionar classes CSS extras ao componente principal.
const ImportExportButtons = ({ onExport, onImport, t, className }) => {
  return (
    // Retorna um contêiner <div> que organiza os botões em uma linha, centralizados e com espaço entre eles.
    // `className` é utilizado para permitir que classes CSS adicionais sejam aplicadas externamente.
    <div className={`flex justify-center space-x-2 mb-4 ${className}`}>
      
      {/* Primeiro botão: botão de exportar */}
      <Button
        onClick={onExport} // Chama a função onExport quando o botão é clicado.
        className="bg-[#374151] hover:bg-[#00864c] text-white flex items-center justify-center py-1.5 px-3 transition-colors duration-300" // Define a aparência e o comportamento do botão.
      >
        {/* Ícone de download antes do texto */}
        <Download className="mr-1 h-4 w-4 inline-block align-middle" />
        {/* Texto do botão, que é passado através da propriedade t.export */}
        <span className="align-middle">{t.export}</span>
      </Button>

      {/* Segundo botão: botão de importar */}
      <Button
        onClick={onImport} // Chama a função onImport quando o botão é clicado.
        className="bg-[#374151] hover:bg-[#00864c] text-white flex items-center justify-center py-1.5 px-3 transition-colors duration-300" // Define a aparência e o comportamento do botão.
      >
        {/* Ícone de upload antes do texto */}
        <Upload className="mr-1 h-4 w-4 inline-block align-middle" />
        {/* Texto do botão, que é passado através da propriedade t.import */}
        <span className="align-middle">{t.import}</span>
      </Button>
    </div>
  );
};

// Exporta o componente ImportExportButtons para que ele possa ser usado em outros arquivos do projeto.
export default ImportExportButtons;

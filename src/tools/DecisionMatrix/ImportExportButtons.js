import React from 'react';
import { Button } from './HelperComponents'; // Importa o componente de botão personalizado
import { Download, Upload } from 'lucide-react'; // Importa os ícones de download e upload da biblioteca 'lucide-react'
import { translations } from './translation'; // Importa as traduções de texto

// Componente funcional ImportExportButtons, que renderiza dois botões para exportar e importar dados.
// Recebe as seguintes props:
// - onExport: função a ser chamada quando o botão de exportar for clicado
// - onImport: função a ser chamada quando o botão de importar for clicado
// - language: string que define o idioma atual (usado para selecionar a tradução correta)
// - className: string opcional para adicionar classes CSS adicionais ao contêiner dos botões
const ImportExportButtons = ({ onExport, onImport, language, className }) => {
  // Seleciona o conjunto de traduções apropriado com base no idioma atual
  const t = translations[language];

  return (
    // Contêiner <div> para os botões, com classes CSS para centralizar os botões e adicionar espaçamento entre eles
    <div className={`flex justify-center space-x-2 mb-4 ${className}`}>
      
      {/* Botão de exportação */}
      <Button
        onClick={onExport} // Chama a função onExport passada como prop quando o botão é clicado
        className="bg-[#0a0a0a] hover:bg-[#00864c] text-white flex items-center justify-center py-1.5 px-3" // Estilização do botão
      >
        {/* Ícone de download */}
        <Download className="mr-1 h-4 w-4 inline-block align-middle" />
        {/* Texto do botão, definido pela tradução selecionada */}
        <span className="align-middle">{t.export}</span>
      </Button>
      
      {/* Botão de importação */}
      <Button
        onClick={onImport}  // Chama a função onImport passada como prop quando o botão é clicado
        className="bg-[#0a0a0a] hover:bg-[#00864c] text-white flex items-center justify-center py-1.5 px-3" // Estilização do botão
      >
        {/* Ícone de upload */}
        <Upload className="mr-1 h-4 w-4 inline-block align-middle" />
        {/* Texto do botão, definido pela tradução selecionada */}
        <span className="align-middle">{t.import}</span>
      </Button>
    </div>
  );
};

export default ImportExportButtons; // Exporta o componente para uso em outras partes da aplicação

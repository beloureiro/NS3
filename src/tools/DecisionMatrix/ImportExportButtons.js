import React from 'react';
import { Button } from './HelperComponents';
import { Download, Upload } from 'lucide-react';
import { translations } from './translation';

const ImportExportButtons = ({ onExport, onImport, language, className }) => {
  const t = translations[language];

  return (
    <div className={`flex justify-center space-x-2 mb-4 ${className}`}>
      <Button
        onClick={onExport}
        className="bg-[#0a0a0a] hover:bg-[#00864c] text-white flex items-center justify-center py-1.5 px-3"
      >
        <Download className="mr-1 h-4 w-4 inline-block align-middle" />
        <span className="align-middle">{t.export}</span>
      </Button>
      <Button
        onClick={onImport}  // Certifique-se de que isso está correto
        className="bg-[#0a0a0a] hover:bg-[#00864c] text-white flex items-center justify-center py-1.5 px-3"
      >
        <Upload className="mr-1 h-4 w-4 inline-block align-middle" />
        <span className="align-middle">{t.import}</span>
      </Button>
    </div>
  );
};

export default ImportExportButtons;
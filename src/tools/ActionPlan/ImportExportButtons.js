// ImportExportButtons.js
import React from 'react';
import { Button } from './components';
import { Download, Upload } from 'lucide-react';

const ImportExportButtons = ({ onExport, onImport, t, className }) => {
  return (
    <div className={`flex justify-center space-x-2 mb-4 ${className}`}>
      <Button
        onClick={onExport}
        className="bg-[#374151] hover:bg-[#00864c] text-white flex items-center justify-center py-1.5 px-3 transition-colors duration-300"
      >
        <Download className="mr-1 h-4 w-4 inline-block align-middle" />
        <span className="align-middle">{t.export}</span>
      </Button>
      <Button
        onClick={onImport}
        className="bg-[#374151] hover:bg-[#00864c] text-white flex items-center justify-center py-1.5 px-3 transition-colors duration-300"
      >
        <Upload className="mr-1 h-4 w-4 inline-block align-middle" />
        <span className="align-middle">{t.import}</span>
      </Button>
    </div>
  );
};

export default ImportExportButtons;
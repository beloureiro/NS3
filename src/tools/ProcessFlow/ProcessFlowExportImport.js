// ProcessFlowExportImport.js

export const exportProcessFlow = (processes, title, description, t) => {
    const data = {
      processes,
      title,
      description
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Criar nome do arquivo com data e hora
    const now = new Date();
    const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeString = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
    const fileName = `InMotion-ProcessFlowBuilder-${dateString}-${timeString}.json`;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  export const importProcessFlow = (event, setProcesses, setTitle, setDescription, t) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
  
    if (file.type !== 'application/json') {
      alert(t.fileNotSupported);
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.processes && Array.isArray(data.processes)) {
          setProcesses(data.processes);
        }
        if (data.title) {
          setTitle(data.title);
        }
        if (data.description) {
          setDescription(data.description);
        }
        alert(t.importSuccess);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert(t.importError);
      }
    };
    reader.readAsText(file);
  };
  
  export const handleImportClick = (fileInputRef) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
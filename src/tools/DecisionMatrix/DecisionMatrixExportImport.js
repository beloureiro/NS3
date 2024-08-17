// DecisionMatrixExportImport.js

export const exportDecisionProcess = (alternatives, criteria, decision, t) => {
    const data = {
        alternatives,
        criteria,
        decision,
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Criar nome do arquivo com data e hora
    const now = new Date();
    const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeString = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
    const fileName = `InMotion-DecisionMatrix-${dateString}-${timeString}.json`;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Mensagem de sucesso removida
    // alert(t.exportSuccess);
};

export const importDecisionProcess = (event, setAlternatives, setCriteria, setDecision, t) => {
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
            if (data.alternatives && Array.isArray(data.alternatives)) {
                setAlternatives(data.alternatives);
            }
            if (data.criteria && Array.isArray(data.criteria)) {
                setCriteria(data.criteria);
            }
            setDecision(data.decision || null);
            alert(t.importSuccess);
        } catch (error) {
            console.error('Error parsing JSON:', error);
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

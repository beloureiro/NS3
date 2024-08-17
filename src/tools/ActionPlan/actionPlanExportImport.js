// actionPlanExportImport.js

export const exportActionPlan = (plans, currentPlan, currentQuestion, t) => {
    const data = {
        plans,
        currentPlan,
        currentQuestion,
    };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const now = new Date();
    const dateString = now.toISOString().split('T')[0];
    const timeString = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    const fileName = `InMotion-ActionPlan-${dateString}-${timeString}.json`;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const importActionPlan = (event, setPlans, setCurrentPlan, setCurrentQuestion, t) => {
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
            if (data.plans && Array.isArray(data.plans)) {
                setPlans(data.plans);
            }
            if (typeof data.currentPlan === 'number') {
                setCurrentPlan(data.currentPlan);
            }
            if (typeof data.currentQuestion === 'number') {
                setCurrentQuestion(data.currentQuestion);
            }
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
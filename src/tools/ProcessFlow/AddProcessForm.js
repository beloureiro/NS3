import React, { useState } from 'react';
import { getEligibleParents } from './utils';

const AddProcessForm = ({ processes, currentLevel, setCurrentLevel, addProcess, t }) => {
  const [processName, setProcessName] = useState('');
  const [parentProcess, setParentProcess] = useState('');
  const [error, setError] = useState('');

  const handleAddProcess = () => {
    setError('');
    if (processName.trim() === '') {
      setError('Process name cannot be empty.');
      return;
    }
    
    if (currentLevel !== '1' && !parentProcess) {
      setError('Please select a parent process.');
      return;
    }
    
    addProcess(processName, parentProcess);
    
    setProcessName('');
    setParentProcess('');
  };

  return (
    <div className="w-full bg-gray text-white ">
      <div className="mb-4">
        <select
          value={currentLevel}
          onChange={(e) => {
            setCurrentLevel(e.target.value);
            setParentProcess('');
            setError('');
          }}
          className="w-full bg-black border border-green-700 rounded-lg text-white p-2 "
        >
          <option value="1">1. Business Process (Macroprocess)</option>
          <option value="2">2. Process</option>
          <option value="3">3. Sub-Process</option>
          <option value="4">4. Activity</option>
          <option value="5">5. Task</option>
        </select>
      </div>
      {currentLevel !== '1' && (
        <div className="mb-4">
          <select
            value={parentProcess}
            onChange={(e) => setParentProcess(e.target.value)}
            className="w-full bg-black border border-green-700 text-white p-2 rounded mb-4"
          >
            <option value="">{t.selectParent}</option>
            {getEligibleParents(processes, currentLevel).map((process, index) => (
              <option key={index} value={process.id}>{process.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className="flex mb-4">
        <input
          value={processName}
          onChange={(e) => setProcessName(e.target.value)}
          placeholder={t.placeholder}
          className="flex-1 bg-black border border-green-900 text-white p-2 "
        />
        <button
          onClick={handleAddProcess}
          className="bg-green-700 hover:bg-green-500 text-white p-2 rounded"
        >
          {t.addProcess}
        </button>
      </div>
      {error && (
        <div className="mb-4 bg-red-900 border border-red-700 text-white p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddProcessForm;
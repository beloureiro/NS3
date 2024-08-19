import React, { useState } from 'react';
import { getEligibleParents } from './utils';

// Componente AddProcessForm: Formulário para adicionar novos processos ou tarefas.
// Props:
// - processes: lista de processos existentes
// - currentLevel: nível atual no qual o novo processo será adicionado
// - setCurrentLevel: função para atualizar o nível atual
// - addProcess: função para adicionar um novo processo
// - t: objeto de traduções para suporte multilíngue
const AddProcessForm = ({ processes, currentLevel, setCurrentLevel, addProcess, t }) => {
  // Estados para armazenar o nome do processo, o processo pai selecionado, e possíveis erros
  const [processName, setProcessName] = useState('');
  const [parentProcess, setParentProcess] = useState('');
  const [error, setError] = useState('');

  // Função para lidar com a adição de um novo processo
  const handleAddProcess = () => {
    setError(''); // Reseta o erro antes de qualquer validação

    // Verifica se o nome do processo não está vazio
    if (processName.trim() === '') {
      setError('Process name cannot be empty.'); // Define uma mensagem de erro
      return;
    }
    
    // Se o nível atual não for o nível 1 (Macroprocesso), verifica se um processo pai foi selecionado
    if (currentLevel !== '1' && !parentProcess) {
      setError('Please select a parent process.'); // Define uma mensagem de erro
      return;
    }
    
    // Adiciona o processo utilizando a função addProcess
    addProcess(processName, parentProcess);
    
    // Reseta os campos do formulário após adicionar o processo
    setProcessName('');
    setParentProcess('');
  };

  return (
    <div className="w-full bg-gray text-white">
      {/* Seleção do nível do processo */}
      <div className="mb-4">
        <select
          value={currentLevel}
          onChange={(e) => {
            setCurrentLevel(e.target.value); // Atualiza o nível atual
            setParentProcess(''); // Reseta o processo pai quando o nível muda
            setError(''); // Reseta os erros quando o nível muda
          }}
          className="w-full bg-black border border-green-700 rounded-lg text-white p-2"
        >
          <option value="1">1. Business Process (Macroprocess)</option>
          <option value="2">2. Process</option>
          <option value="3">3. Sub-Process</option>
          <option value="4">4. Activity</option>
          <option value="5">5. Task</option>
        </select>
      </div>
      
      {/* Seleção do processo pai (aparece apenas se o nível atual não for 1) */}
      {currentLevel !== '1' && (
        <div className="mb-4">
          <select
            value={parentProcess}
            onChange={(e) => setParentProcess(e.target.value)} // Atualiza o processo pai selecionado
            className="w-full bg-black border border-green-700 text-white p-2 rounded mb-4"
          >
            <option value="">{t.selectParent}</option> {/* Placeholder para selecionar o processo pai */}
            {/* Mapeia e exibe os processos elegíveis como pais */}
            {getEligibleParents(processes, currentLevel).map((process, index) => (
              <option key={index} value={process.id}>{process.name}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Campo de entrada para o nome do processo e botão para adicionar */}
      <div className="flex mb-4">
        <input
          value={processName}
          onChange={(e) => setProcessName(e.target.value)} // Atualiza o nome do processo
          placeholder={t.placeholder} // Placeholder baseado na tradução
          className="flex-1 bg-black border border-green-900 text-white p-2"
        />
        <button
          onClick={handleAddProcess} // Chama a função handleAddProcess ao clicar
          className="bg-green-700 hover:bg-green-500 text-white p-2 rounded"
        >
          {t.addProcess} {/* Texto do botão baseado na tradução */}
        </button>
      </div>

      {/* Exibe mensagens de erro, se houver */}
      {error && (
        <div className="mb-4 bg-red-900 border border-red-700 text-white p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddProcessForm; // Exporta o componente para uso em outras partes da aplicação

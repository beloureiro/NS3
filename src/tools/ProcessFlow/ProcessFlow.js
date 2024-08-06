import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Edit2, FlowChart } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ProcessBox = ({ level, name, children }) => {
  const getStyle = () => {
    switch(level) {
      case '1': return 'bg-green-700';
      case '2': return 'bg-green-600';
      case '3': return 'bg-green-500';
      case '4': return 'bg-green-400';
      case '5': return 'bg-green-300';
      default: return 'bg-green-200';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${getStyle()} text-white p-3 rounded min-w-[150px] text-center shadow-md backdrop-blur-sm bg-opacity-80 mb-2`}>
        {name}
      </div>
      {children}
    </div>
  );
};

const Connector = ({ direction = 'right' }) => (
  <div className={`flex justify-center ${direction === 'down' ? 'h-8 w-0.5' : 'w-8 h-0.5'} bg-green-400`}></div>
);

const ProcessLevel = ({ processes, level }) => (
  <div className={`flex ${['4', '5'].includes(level) ? 'flex-col' : 'flex-row'} items-start gap-4`}>
    {processes.map((process, index) => (
      <React.Fragment key={index}>
        <ProcessBox level={level} name={process.name}>
          {process.children && process.children.length > 0 && (
            <>
              <Connector direction={['4', '5'].includes(level) ? 'down' : 'right'} />
              <ProcessLevel processes={process.children} level={(parseInt(level) + 1).toString()} />
            </>
          )}
        </ProcessBox>
        {index < processes.length - 1 && !['4', '5'].includes(level) && <Connector direction="right" />}
      </React.Fragment>
    ))}
  </div>
);

const ProcessFlowDiagramApp = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleSet, setIsTitleSet] = useState(false);
  const [processes, setProcesses] = useState([]);
  const [currentLevel, setCurrentLevel] = useState('1');
  const [processName, setProcessName] = useState('');
  const [parentProcess, setParentProcess] = useState('');
  const [error, setError] = useState('');

  const setProcessTitle = () => {
    if (title.trim()) {
      setIsTitleSet(true);
    }
  };

  const editTitle = () => {
    setIsTitleSet(false);
  };

  const addProcess = () => {
    setError('');
    if (processName.trim() === '') {
      setError('Process name cannot be empty.');
      return;
    }
    
    const newProcess = { level: currentLevel, name: processName, children: [] };
    
    if (currentLevel === '1') {
      setProcesses([...processes, newProcess]);
    } else {
      if (!parentProcess) {
        setError('Please select a parent process.');
        return;
      }
      
      const updatedProcesses = [...processes];
      let success = false;
      
      const addToParent = (items) => {
        for (let item of items) {
          if (item.name === parentProcess) {
            if (parseInt(item.level) !== parseInt(currentLevel) - 1) {
              setError('Invalid parent process selected for this level.');
              return false;
            }
            item.children.push(newProcess);
            return true;
          }
          if (item.children && addToParent(item.children)) {
            return true;
          }
        }
        return false;
      };
      
      success = addToParent(updatedProcesses);
      
      if (success) {
        setProcesses(updatedProcesses);
      } else if (!error) {
        setError('Failed to add process. Please check the hierarchy.');
      }
    }
    
    setProcessName('');
    setParentProcess('');
  };

  const flattenProcesses = (processes) => {
    return processes.reduce((acc, process) => {
      acc.push(process);
      if (process.children) {
        acc.push(...flattenProcesses(process.children));
      }
      return acc;
    }, []);
  };

  const getEligibleParents = () => {
    const currentLevelInt = parseInt(currentLevel);
    return flattenProcesses(processes).filter(p => {
      const parentLevel = parseInt(p.level);
      return parentLevel === currentLevelInt - 1;
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-green-400 flex items-center justify-center">
          <FlowChart className="mr-2" /> Process Flow Diagram Builder
        </h1>
        <p className="text-gray-400 mb-8 italic text-center">Visualize your business processes with ease</p>
        
        {!isTitleSet ? (
          <Card className="bg-gray-800 bg-opacity-50 border-gray-700 backdrop-blur-sm mb-6">
            <CardHeader className="border-b border-gray-700">
              <h2 className="text-2xl font-semibold text-green-300">Name your process</h2>
            </CardHeader>
            <CardContent>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter process title"
                className="bg-gray-700 bg-opacity-50 border-gray-600 text-white mb-4"
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter process description (optional)"
                className="bg-gray-700 bg-opacity-50 border-gray-600 text-white mb-4"
              />
              <Button onClick={setProcessTitle} className="bg-green-600 hover:bg-green-700 text-white">
                Set Title
              </Button>
            </CardContent>
          </Card>
        ) : null}

        <Card className="bg-gray-800 bg-opacity-50 border-gray-700 backdrop-blur-sm mb-6">
          <CardHeader className="border-b border-gray-700">
            <h2 className="text-2xl font-semibold text-green-300">Add Process Steps</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4">
              <Select value={currentLevel} onValueChange={(value) => {
                setCurrentLevel(value);
                setParentProcess('');
                setError('');
              }}>
                <SelectTrigger className="bg-gray-700 bg-opacity-50 border-gray-600 text-white">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="1">1. Business Process (Macroprocess)</SelectItem>
                  <SelectItem value="2">2. Process</SelectItem>
                  <SelectItem value="3">3. Sub-Process</SelectItem>
                  <SelectItem value="4">4. Activity</SelectItem>
                  <SelectItem value="5">5. Task</SelectItem>
                </SelectContent>
              </Select>
              
              {currentLevel !== '1' && (
                <Select value={parentProcess} onValueChange={setParentProcess}>
                  <SelectTrigger className="bg-gray-700 bg-opacity-50 border-gray-600 text-white">
                    <SelectValue placeholder="Select parent process" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {getEligibleParents().map((process, index) => (
                      <SelectItem key={index} value={process.name}>{process.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              <div className="flex gap-2">
                <Input
                  value={processName}
                  onChange={(e) => setProcessName(e.target.value)}
                  placeholder="Enter process name"
                  className="bg-gray-700 bg-opacity-50 border-gray-600 text-white flex-grow"
                />
                <Button onClick={addProcess} className="bg-green-600 hover:bg-green-700 text-white" disabled={currentLevel !== '1' && !parentProcess}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add
                </Button>
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900 bg-opacity-50 border-red-700 text-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 bg-opacity-50 border-gray-700 backdrop-blur-sm">
          {isTitleSet && (
            <CardHeader className="border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <FlowChart className="mr-2 text-green-400" />
                <h2 className="text-2xl font-semibold text-green-300">{title}</h2>
              </div>
              <Button onClick={editTitle} variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                <Edit2 className="h-4 w-4 mr-2" /> Edit
              </Button>
            </CardHeader>
          )}
          <CardContent className="overflow-x-auto p-8">
            <div className="flex justify-center">
              <ProcessLevel processes={processes} level="1" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProcessFlowDiagramApp;
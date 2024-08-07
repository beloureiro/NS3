import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Globe, Check, RotateCcw, PlusCircle, AlertCircle, Trash2 } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, ReferenceArea } from 'recharts';

const Card = ({ children, className }) => (
  <div className={`bg-[#1a1a1a] border border-[#333333] rounded-lg shadow-lg ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => <div className="p-4 border-b border-[#333333]">{children}</div>;
const CardContent = ({ children }) => <div className="p-4">{children}</div>;
//const CardFooter = ({ children }) => <div className="p-4 border-t border-[#333333]">{children}</div>;
const CardTitle = ({ children }) => <h2 className="text-xl font-bold text-[#f1f5f9]">{children}</h2>;

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full bg-[#111111] text-gray-300 border border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md p-2"
  />
);

const DateInput = ({ ...props }) => (
  <input
    {...props}
    type="date"
    className="w-full bg-[#111111] text-gray-300 border border-[#333333] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md p-2"
  />
);

const Button = ({ children, selected, ...props }) => (
  <button
    {...props}
    className={`bg-[#374151] hover:bg-[#00864c] text-white font-medium py-2 px-4 rounded transition-colors duration-300 flex items-center ${
      selected ? 'bg-[#00ff9d] text-black' : ''
    }`}
  >
    {children}
  </button>
);

const Timeline = ({ currentQuestion, questions }) => (
  <div className="flex justify-between mb-4">
    {questions.map((_, index) => (
      <div
        key={index}
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          index <= currentQuestion ? 'bg-[#00ff9d] text-black' : 'bg-gray-600 text-white'
        }`}
      >
        {index + 1}
      </div>
    ))}
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#1a1a1a', border: '1px solid #00ff9d', padding: '10px', borderRadius: '5px' }}>
        <p className="label" style={{ color: '#00ff9d' }}>{`${data.name}`}</p>
        <p style={{ color: '#fff' }}>{`Urgency: ${data.urgency}`}</p>
        <p style={{ color: '#fff' }}>{`Importance: ${data.importance}`}</p>
        <p style={{ color: '#fff' }}>{`Days to Complete: ${data.daysToComplete}`}</p>
      </div>
    );
  }
  return null;
};

const ActionPlanChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="urgency" type="number" domain={[0, 6]} ticks={[1, 3, 5]} />
        <YAxis dataKey="importance" type="number" domain={[0, 6]} ticks={[1, 3, 5]} />
        <ZAxis dataKey="z" range={[100, 500]} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceArea x1={0} x2={2} y1={0} y2={2} fill="rgba(255, 0, 0, 0.1)" />
        <ReferenceArea x1={0} x2={2} y1={2} y2={4} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={0} x2={2} y1={4} y2={6} fill="rgba(0, 255, 0, 0.1)" />
        <ReferenceArea x1={2} x2={4} y1={0} y2={2} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={2} x2={4} y1={2} y2={4} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={2} x2={4} y1={4} y2={6} fill="rgba(0, 255, 0, 0.1)" />
        <ReferenceArea x1={4} x2={6} y1={0} y2={2} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={4} x2={6} y1={2} y2={4} fill="rgba(255, 255, 0, 0.1)" />
        <ReferenceArea x1={4} x2={6} y1={4} y2={6} fill="rgba(0, 255, 0, 0.1)" />
        <Scatter dataKey="importance" fill="#00ff9d">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill="#00ff9d">
              <text x={entry.x} y={entry.y} dy={-10} fill="#ffffff" fontSize={14} textAnchor="middle">
                {entry.z}
              </text>
            </Cell>
          ))}
        </Scatter>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

const translations = {
  en: {
    title: "Action Plan",
    subtitle: "Plan your actions in a structured and efficient way",
    questions: [
      { key: 'what', question: 'What will be done?' },
      { key: 'why', question: 'Why will it be done?' },
      { key: 'where', question: 'Where will it be done?' },
      { key: 'when', question: 'When will it be done?' },
      { key: 'who', question: 'Who will do it?' },
      { key: 'how', question: 'How will it be done?' },
      { key: 'howMuch', question: 'How much will it cost?' },
      { key: 'urgency', question: 'How urgent is it?' },
      { key: 'importance', question: 'How important is it?' }
    ],
    previous: "Previous",
    next: "Next",
    addNewAction: "Add New Action",
    complete: "Complete",
    restart: "Restart",
    actionPlan: "Action Plan",
    backToHome: "Back to home",
    totalActions: "Total Actions",
    actionOverview: "Action Overview",
    urgency: "Urgency",
    importance: "Importance",
    urgencyLevels: ['Low', 'Medium', 'High'],
    importanceLevels: ['Low', 'Medium', 'High'],
    fieldRequired: "This field is required",
    invalidDate: "Please enter a valid future date"
  },
  pt: {
    title: "Plano de Ação",
    subtitle: "Planeje suas ações de forma estruturada e eficiente",
    questions: [
      { key: 'what', question: 'O que será feito?' },
      { key: 'why', question: 'Por que será feito?' },
      { key: 'where', question: 'Onde será feito?' },
      { key: 'when', question: 'Quando será feito?' },
      { key: 'who', question: 'Quem fará?' },
      { key: 'how', question: 'Como será feito?' },
      { key: 'howMuch', question: 'Quanto custará?' },
      { key: 'urgency', question: 'Qual a urgência?' },
      { key: 'importance', question: 'Qual a importância?' }
    ],
    previous: "Anterior",
    next: "Próxima",
    addNewAction: "Adicionar Nova Ação",
    complete: "Concluir",
    restart: "Recomeçar",
    actionPlan: "Plano de Ação",
    backToHome: "Voltar para a página inicial",
    totalActions: "Total de Ações",
    actionOverview: "Visão Geral das Ações",
    urgency: "Urgência",
    importance: "Importância",
    urgencyLevels: ['Baixa', 'Média', 'Alta'],
    importanceLevels: ['Baixa', 'Média', 'Alta'],
    fieldRequired: "Este campo é obrigatório",
    invalidDate: "Por favor, insira uma data futura válida"
  }
};

const ActionPlanApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [plans, setPlans] = useState([{
    what: '', why: '', where: '', when: '', who: '', how: '', howMuch: '',
    urgency: 5, importance: 5
  }]);
  const [currentPlan, setCurrentPlan] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [language, setLanguage] = useState('en');
  const [errors, setErrors] = useState({});

  const t = translations[language];

  const handleInputChange = (key, value) => {
    const updatedPlans = [...plans];
    updatedPlans[currentPlan] = {
      ...updatedPlans[currentPlan],
      [key]: value
    };
    setPlans(updatedPlans);
    
    if (errors[key]) {
      setErrors(prev => ({...prev, [key]: ''}));
    }
  };

  const validateField = (key, value) => {
    if (key === 'what' && !value.trim()) {
      return t.fieldRequired;
    }
    if (key === 'when') {
      const inputDate = new Date(value);
      const today = new Date();
      if (isNaN(inputDate.getTime()) || inputDate <= today) {
        return t.invalidDate;
      }
    }
    return '';
  };

  const handleNext = () => {
    const currentKey = t.questions[currentQuestion].key;
    const error = validateField(currentKey, plans[currentPlan][currentKey]);
    
    if (error) {
      setErrors(prev => ({...prev, [currentKey]: error}));
      return;
    }

    if (currentQuestion < t.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const addNewPlan = () => {
    const currentPlanData = plans[currentPlan];
    if (!currentPlanData.what.trim() || !currentPlanData.when.trim()) {
      setErrors({
        what: !currentPlanData.what.trim() ? t.fieldRequired : '',
        when: !currentPlanData.when.trim() ? t.fieldRequired : '',
      });
      return;
    }

    setPlans([...plans, {
      what: '', why: '', where: '', when: '', who: '', how: '', howMuch: '',
      urgency: 5, importance: 5
    }]);
    setCurrentPlan(plans.length);
    setCurrentQuestion(0);
    setIsComplete(false);
    setErrors({});
  };

  const handleRestart = () => {
    setPlans([{
      what: '', why: '', where: '', when: '', who: '', how: '', howMuch: '',
      urgency: 5, importance: 5
    }]);
    setCurrentPlan(0);
    setCurrentQuestion(0);
    setIsComplete(false);
    setErrors({});
  };

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'pt' : 'en');
  };

  const deletePlan = (indexToRemove) => {
    const updatedPlans = plans.filter((_, index) => index !== indexToRemove);
    setPlans(updatedPlans);
    if (currentPlan >= updatedPlans.length) {
      setCurrentPlan(Math.max(0, updatedPlans.length - 1));
    }
    if (updatedPlans.length === 0) {
      setPlans([{
        what: '', why: '', where: '', when: '', who: '', how: '', howMuch: '',
        urgency: 5, importance: 5
      }]);
      setCurrentPlan(0);
      setCurrentQuestion(0);
      setIsComplete(false);
    }
  };

  const getChartData = () => {
    const today = new Date();
    return plans
      .filter(plan => plan.when && plan.what)
      .map((plan, index) => {
        const endDate = new Date(plan.when);
        const daysToComplete = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
        return {
          name: plan.what || `${t.action} ${index + 1}`,
          urgency: plan.urgency,
          importance: plan.importance,
          daysToComplete: daysToComplete,
          z: index + 1
        };
      });
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="text-[#00ff9d] hover:underline flex items-center">
            <ChevronLeft className="mr-2 text-[#00ff9d]" /> {t.backToHome}
          </Link>
          <h1 className="text-3xl font-bold text-[#f1f5f9] text-center flex-grow">{t.title}</h1>
          <Button onClick={toggleLanguage}>
            <Globe className="mr-2" /> {language === 'en' ? 'PT' : 'EN'}
          </Button>
        </div>
        <p className="text-lg text-[#f1f5f9] italic text-center mb-8">{t.subtitle}</p>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t.questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <Timeline currentQuestion={currentQuestion} questions={t.questions} />
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {t.questions[currentQuestion].key === 'when' ? (
                <DateInput
                  value={plans[currentPlan][t.questions[currentQuestion].key]}
                  onChange={(e) => handleInputChange(t.questions[currentQuestion].key, e.target.value)}
                />
              ) : t.questions[currentQuestion].key === 'urgency' || t.questions[currentQuestion].key === 'importance' ? (
                <div className="flex justify-center space-x-2">
                  {t.questions[currentQuestion].key === 'urgency' && t.urgencyLevels.map((level, index) => (
                    <Button
                      key={index}
                      selected={plans[currentPlan][t.questions[currentQuestion].key] === (index + 1) * 2 - 1}
                      onClick={() => handleInputChange(t.questions[currentQuestion].key, (index + 1) * 2 - 1)}
                    >
                      {level}
                    </Button>
                  ))}
                  {t.questions[currentQuestion].key === 'importance' && t.importanceLevels.map((level, index) => (
                    <Button
                      key={index}
                      selected={plans[currentPlan][t.questions[currentQuestion].key] === (index + 1) * 2 - 1}
                      onClick={() => handleInputChange(t.questions[currentQuestion].key, (index + 1) * 2 - 1)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              ) : (
                <Input
                  type="text"
                  value={plans[currentPlan][t.questions[currentQuestion].key]}
                  onChange={(e) => handleInputChange(t.questions[currentQuestion].key, e.target.value)}
                  placeholder="Digite sua resposta..."
                />
              )}
              {errors[t.questions[currentQuestion].key] && (
                <p className="text-red-500 mt-2 flex items-center">
                  <AlertCircle className="mr-2" size={16} />
                  {errors[t.questions[currentQuestion].key]}
                </p>
              )}
              <div className="flex justify-between mt-4">
                <Button onClick={handlePrevious} disabled={currentQuestion === 0}>{t.previous}</Button>
                <div className="flex space-x-2">
                  <Button onClick={addNewPlan}>
                    <PlusCircle className="mr-2" /> {t.addNewAction}
                  </Button>
                  {isComplete ? (
                    <Button onClick={handleRestart}>
                      <RotateCcw className="mr-2" /> {t.restart}
                    </Button>
                  ) : (
                    <Button onClick={handleNext}>
                      {currentQuestion === t.questions.length - 1 ? <Check className="mr-2" /> : null}
                      {currentQuestion === t.questions.length - 1 ? t.complete : t.next}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t.actionPlan}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 border-b border-gray-700">Ação #</th>
                    {t.questions.map((q) => (
                      <th key={q.key} className="text-left py-2 px-4 border-b border-gray-700">
                        {q.key.charAt(0).toUpperCase() + q.key.slice(1)}
                      </th>
                    ))}
                    <th className="text-left py-2 px-4 border-b border-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <td className="py-2 px-4 border-b border-gray-700">{index + 1}</td>
                      {t.questions.map((q) => (
                        <td key={q.key} className="py-2 px-4 border-b border-gray-700">{plan[q.key]}</td>
                      ))}
                      <td className="py-2 px-4 border-b border-gray-700">
                        <Button onClick={() => deletePlan(index)} className="bg-red-600 hover:bg-red-700">
                          <Trash2 className="mr-2" /> Delete
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t.actionOverview}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t.totalActions}: {plans.length}</p>
            <div className="h-96">
              <ActionPlanChart data={getChartData()} />
            </div>
            <div className="flex justify-center mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t.urgency}</h3>
                  <ul>
                    {t.urgencyLevels.map((level, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-4 h-4 bg-[#00ff9d] opacity-30 mr-2"></span>
                        {level}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t.importance}</h3>
                  <ul>
                    {t.importanceLevels.map((level, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-4 h-4 bg-[#00ff9d] opacity-30 mr-2"></span>
                        {level}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActionPlanApp;

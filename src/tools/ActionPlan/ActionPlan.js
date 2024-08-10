import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Globe, Check, RotateCcw, PlusCircle, AlertCircle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardTitle, Input, DateInput, Button, Timeline } from './components';
import QuadrantChart from './QuadrantChart'; // Importação do novo componente QuadrantChart
import translations from './translations';

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
      .filter(plan => plan.when && plan.what && plan.urgency !== undefined && plan.importance !== undefined)
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
                  placeholder={t.inputPlaceholder}
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
              <QuadrantChart actions={getChartData()} />
            </div>
            <p className="mt-4 text-center text-gray-400">{t.chartDescription}</p>
            <Legend />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Legend = () => (
  <div className="flex justify-center mt-4">
    <div className="flex items-center mr-4">
      <div className="w-4 h-4 mr-2" style={{ backgroundColor: '#ff6347', opacity: '0.6' }}></div>
      <span className="text-white">Urgency 1, Importance 1</span>
    </div>
    <div className="flex items-center mr-4">
      <div className="w-4 h-4 mr-2" style={{ backgroundColor: '#ffd700', opacity: '0.6' }}></div>
      <span className="text-white">Other</span>
    </div>
    <div className="flex items-center">
      <div className="w-4 h-4 mr-2" style={{ backgroundColor: '#98fb98', opacity: '0.6' }}></div>
      <span className="text-white">Urgency 5, Importance 5</span>
    </div>
  </div>
);


export default ActionPlanApp;

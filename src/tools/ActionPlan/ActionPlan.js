import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Globe, Check, RotateCcw, PlusCircle, AlertCircle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardTitle, Input, DateInput, Button, Timeline, ActionPlanChart } from './components';
import translations from './translations';

const ActionPlanApp = () => {
  // Gerencia o estado da questão atual, plano atual, se o plano está completo, o idioma e os erros.
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [plans, setPlans] = useState([{
    what: '', why: '', where: '', when: '', who: '', how: '', howMuch: '',
    urgency: 5, importance: 5
  }]);
  const [currentPlan, setCurrentPlan] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [language, setLanguage] = useState('en');
  const [errors, setErrors] = useState({});

  // Obtém as traduções com base no idioma selecionado.
  const t = translations[language];

  // Atualiza o estado do plano com base na entrada do usuário e limpa os erros correspondentes.
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

  // Valida os campos obrigatórios e garante que as datas inseridas sejam válidas.
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

  // Navega para a próxima pergunta, validando o campo atual antes de continuar.
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

  // Retorna à pergunta anterior.
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Adiciona um novo plano à lista e reinicia o formulário.
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

  // Reinicia o plano de ação atual.
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

  // Alterna entre os idiomas.
  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'pt' : 'en');
  };

  // Exclui um plano específico da lista.
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

  // Prepara os dados para serem exibidos no gráfico.
  const getChartData = () => {
    const today = new Date();
    return plans
      .filter(plan => plan.when && plan.what)
      .map((plan, index) => {
        const endDate = new Date(plan.when);
        const daysToComplete = Math.max(0, Math.ceil((endDate - today) / (1000 * 600 * 60 * 24)));
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
    // Estrutura principal do aplicativo com diversos componentes filhos para exibir e interagir com os dados.
    <div className="min-h-screen bg-black text-gray-300 p-4 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho do aplicativo com título e opção de alternância de idioma */}
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

        {/* Card principal onde as perguntas e entradas são exibidas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t.questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Linha do tempo mostrando o progresso através das perguntas */}
            <Timeline currentQuestion={currentQuestion} questions={t.questions} />
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Renderiza diferentes tipos de entrada com base na pergunta atual */}
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
              {/* Exibe mensagem de erro se houver */}
              {errors[t.questions[currentQuestion].key] && (
                <p className="text-red-500 mt-2 flex items-center">
                  <AlertCircle className="mr-2" size={16} />
                  {errors[t.questions[currentQuestion].key]}
                </p>
              )}
              {/* Botões para navegar entre perguntas, adicionar novos planos ou reiniciar */}
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

        {/* Card para exibir a tabela com todas as ações planejadas */}
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

        {/* Card que exibe o gráfico de resumo das ações planejadas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t.actionOverview}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t.totalActions}: {plans.length}</p>
            <div className="h-96">
              <ActionPlanChart data={getChartData()} />
            </div>
            <p className="mt-4 text-center text-gray-400">{t.chartDescription}</p>
            <Legend />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Componente Legend mostra a legenda do gráfico com as cores e seus significados.
const Legend = () => (
  <div className="flex justify-center mt-4">
    <div className="flex items-center mr-4">
      <div className="w-4 h-4 bg-red-500 mr-2"></div>
      <span className="text-white">Urgency 1, Importance 1</span>
    </div>
    <div className="flex items-center mr-4">
      <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
      <span className="text-white">Other</span>
    </div>
    <div className="flex items-center">
      <div className="w-4 h-4 bg-green-500 mr-2"></div>
      <span className="text-white">Urgency 5, Importance 5</span>
    </div>
  </div>
);

export default ActionPlanApp;

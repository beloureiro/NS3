import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  PlusCircle,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Input,
  DateInput,
  Button,
  Timeline,
} from "./components";
import QuadrantChart from "./QuadrantChart";
import translations from "./translations";
import ImportExportButtons from "./ImportExportButtons";
import {
  exportActionPlan,
  importActionPlan,
  handleImportClick,
} from "./actionPlanExportImport";
import ContactSection from "../../AppComponents/ContactSection";

const ActionPlanApp = ({ language }) => {
  // Estado para controlar a pergunta atual, o plano de ação, a linguagem e erros de validação
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [plans, setPlans] = useState([
    {
      what: "",
      why: "",
      where: "",
      when: "",
      who: "",
      how: "",
      howMuch: "",
      urgency: 5,
      importance: 5,
    },
  ]);
  const [currentPlan, setCurrentPlan] = useState(0);
  const [errors, setErrors] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [chartKey, setChartKey] = useState(0); // Estado para forçar a atualização do gráfico
  const fileInputRef = useRef(null);

  // Traduções de acordo com o idioma selecionado
  const t = translations[language];

  // Função para lidar com a mudança de valor nos campos de entrada
  const handleInputChange = (key, value) => {
    const updatedPlans = [...plans];
    updatedPlans[currentPlan] = {
      ...updatedPlans[currentPlan],
      [key]: value,
    };
    setPlans(updatedPlans);

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  // Função para validar os campos de entrada
  const validateField = (key, value) => {
    if (key === "what" && !value.trim()) {
      return t.fieldRequired;
    }
    if (key === "when") {
      const inputDate = new Date(value);
      const today = new Date();
      if (isNaN(inputDate.getTime()) || inputDate <= today) {
        return t.invalidDate;
      }
    }
    return "";
  };

  // Função para avançar para a próxima pergunta ou adicionar um novo plano de ação
  const handleNext = () => {
    const currentKey = t.questions[currentQuestion].key;
    const error = validateField(currentKey, plans[currentPlan][currentKey]);

    if (error) {
      setErrors((prev) => ({ ...prev, [currentKey]: error }));
      return;
    }

    if (currentQuestion < t.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      addNewPlan();
    }
  };

  // Função para voltar para a pergunta anterior
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Função para adicionar um novo plano de ação
  const addNewPlan = () => {
    const currentPlanData = plans[currentPlan];
    if (!currentPlanData.what.trim() || !currentPlanData.when.trim()) {
      setErrors({
        what: !currentPlanData.what.trim() ? t.fieldRequired : "",
        when: !currentPlanData.when.trim() ? t.fieldRequired : "",
      });
      return;
    }

    setPlans([
      ...plans,
      {
        what: "",
        why: "",
        where: "",
        when: "",
        who: "",
        how: "",
        howMuch: "",
        urgency: 5,
        importance: 5,
      },
    ]);
    setCurrentPlan(plans.length);
    setCurrentQuestion(0);
    setErrors({});
  };

  // Função para deletar um plano de ação específico
  const deletePlan = (indexToRemove) => {
    const updatedPlans = plans.filter((_, index) => index !== indexToRemove);
    setPlans(updatedPlans);
    if (currentPlan >= updatedPlans.length) {
      setCurrentPlan(Math.max(0, updatedPlans.length - 1));
    }
    if (updatedPlans.length === 0) {
      setPlans([
        {
          what: "",
          why: "",
          where: "",
          when: "",
          who: "",
          how: "",
          howMuch: "",
          urgency: 5,
          importance: 5,
        },
      ]);
      setCurrentPlan(0);
      setCurrentQuestion(0);
    }
  };

  // Função para habilitar a edição de um campo específico
  const handleDoubleClick = (index, field) => {
    setEditingField({ index, field });
  };

  // Função para salvar as edições feitas em um campo
  const handleEditSave = (e, index, field) => {
    const value = e.target.value;
    const updatedPlans = [...plans];

    if (field === "urgency" || field === "importance") {
      updatedPlans[index][field] = parseInt(value, 10);
    } else {
      updatedPlans[index][field] = value;
    }

    setPlans(updatedPlans);
    setEditingField(null);

    // Força a atualização do gráfico
    setChartKey((prevKey) => prevKey + 1);
  };

  // Função para preparar os dados do gráfico com base nos planos de ação
  const getChartData = () => {
    const today = new Date();
    return plans
      .filter(
        (plan) =>
          plan.when &&
          plan.what &&
          plan.urgency !== undefined &&
          plan.importance !== undefined
      )
      .map((plan, index) => {
        const endDate = new Date(plan.when);
        const daysToComplete = Math.max(
          0,
          Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
        );
        return {
          name: plan.what || `${t.action} ${index + 1}`,
          urgency: plan.urgency,
          importance: plan.importance,
          daysToComplete: daysToComplete,
          z: index + 1,
        };
      });
  };

  // Função para exportar o plano de ação
  const handleExport = () => {
    console.log("Export button clicked"); // Para debug
    exportActionPlan(plans, currentPlan, currentQuestion, t);
  };

  // Função para importar o plano de ação
  const handleImport = (event) => {
    console.log("Import button clicked"); // Para debug
    importActionPlan(event, setPlans, setCurrentPlan, setCurrentQuestion, t);
  };

  return (
    <div className="w-full bg-black min-h-screen p-6 text-gray-300 font-sans antialiased">
      {/* Wrapper div with max-width and center alignment */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#00ff9d] text-center mb-4">{t.title}</h1>
        <p className="text-lg text-[#f1f5f9] italic text-center mb-8">
          {t.subtitle}
        </p>
        {/* Botões de Importação e Exportação */}
        <ImportExportButtons
          onExport={handleExport}
          onImport={() => handleImportClick(fileInputRef)}
          t={t}
          className="mt-4"
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImport}
          accept=".json"
        />
        {/* Conteúdo principal */}
        <main className="space-y-8">
          {/* Seção de entrada */}
          <Card>
            <CardHeader>
              <CardTitle>{t.questions[currentQuestion].question}</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline
                currentQuestion={currentQuestion}
                questions={t.questions}
              />
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {t.questions[currentQuestion].key === "when" ? (
                  <DateInput
                    value={plans[currentPlan][t.questions[currentQuestion].key]}
                    onChange={(e) =>
                      handleInputChange(
                        t.questions[currentQuestion].key,
                        e.target.value
                      )
                    }
                  />
                ) : t.questions[currentQuestion].key === "urgency" ||
                  t.questions[currentQuestion].key === "importance" ? (
                  <div className="flex flex-wrap justify-center gap-2">
                    {t.questions[currentQuestion].key === "urgency" &&
                      t.urgencyLevels.map((level, index) => (
                        <Button
                          key={index}
                          selected={
                            plans[currentPlan][
                              t.questions[currentQuestion].key
                            ] ===
                            (index + 1) * 2 - 1
                          }
                          onClick={() =>
                            handleInputChange(
                              t.questions[currentQuestion].key,
                              (index + 1) * 2 - 1
                            )
                          }
                        >
                          {level}
                        </Button>
                      ))}
                    {t.questions[currentQuestion].key === "importance" &&
                      t.importanceLevels.map((level, index) => (
                        <Button
                          key={index}
                          selected={
                            plans[currentPlan][
                              t.questions[currentQuestion].key
                            ] ===
                            (index + 1) * 2 - 1
                          }
                          onClick={() =>
                            handleInputChange(
                              t.questions[currentQuestion].key,
                              (index + 1) * 2 - 1
                            )
                          }
                        >
                          {level}
                        </Button>
                      ))}
                  </div>
                ) : (
                  <Input
                    type="text"
                    value={plans[currentPlan][t.questions[currentQuestion].key]}
                    onChange={(e) =>
                      handleInputChange(
                        t.questions[currentQuestion].key,
                        e.target.value
                      )
                    }
                    placeholder={t.inputPlaceholder}
                  />
                )}
                {errors[t.questions[currentQuestion].key] && (
                  <p className="text-red-500 mt-2 flex items-center">
                    <AlertCircle className="mr-2" size={16} />
                    {errors[t.questions[currentQuestion].key]}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    {t.previous}
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={addNewPlan}>
                      <PlusCircle className="mr-2" /> {t.addNewAction}
                    </Button>
                    {currentQuestion === t.questions.length - 1 ? (
                      <Button onClick={handleNext}>
                        <Check className="mr-2" /> {t.complete}
                      </Button>
                    ) : (
                      <Button onClick={handleNext}>{t.next}</Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>

          {/* Action Plan (Tabela) - Movida para cima */}
          <Card>
            <CardHeader>
              <CardTitle>{t.actionPlan}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-4 border-b border-gray-700">
                        Ação #
                      </th>
                      {t.questions.map((q) => (
                        <th
                          key={q.key}
                          className="text-left py-2 px-4 border-b border-gray-700"
                        >
                          {q.key.charAt(0).toUpperCase() + q.key.slice(1)}
                        </th>
                      ))}
                      <th className="text-left py-2 px-4 border-b border-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-gray-700">
                          {index + 1}
                        </td>
                        {t.questions.map((q) => (
                          <td
                            key={q.key}
                            className="py-2 px-4 border-b border-gray-700"
                            onDoubleClick={() => handleDoubleClick(index, q.key)}
                          >
                            {editingField &&
                            editingField.index === index &&
                            editingField.field === q.key ? (
                              q.key === "urgency" || q.key === "importance" ? (
                                <select
                                  defaultValue={plan[q.key]}
                                  onBlur={(e) => handleEditSave(e, index, q.key)}
                                  onChange={(e) =>
                                    handleEditSave(e, index, q.key)
                                  }
                                  autoFocus
                                  className="bg-[#111111] text-gray-300 border border-[#00ff9d] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md p-1 w-full"
                                >
                                  {[1, 3, 5].map((value) => (
                                    <option
                                      key={value}
                                      value={value}
                                      style={{
                                        color: "white",
                                        backgroundColor: "#1a1a1a",
                                      }}
                                    >
                                      {value === 1
                                        ? t.low
                                        : value === 3
                                        ? t.medium
                                        : t.high}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={q.key === "when" ? "date" : "text"}
                                  defaultValue={plan[q.key]}
                                  onBlur={(e) => handleEditSave(e, index, q.key)}
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter")
                                      handleEditSave(e, index, q.key);
                                  }}
                                  autoFocus
                                  className="bg-[#111111] text-gray-300 border border-[#00ff9d] focus:border-[#00ff9d] focus:ring-[#00ff9d] rounded-md p-1 w-full"
                                />
                              )
                            ) : (
                              plan[q.key]
                            )}
                          </td>
                        ))}
                        <td className="py-2 px-4 border-b border-gray-700">
                          <button
                            onClick={() => deletePlan(index)}
                            className="bg-red-500 hover:bg-red-700 text-white rounded-full p-1 transition-colors duration-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Action Overview (Gráfico) - Movido para baixo */}
          <Card>
            <CardHeader>
              <CardTitle>{t.actionOverview}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                {t.totalActions}: {plans.length}
              </p>
              <div className="h-[400px] w-full">
                <QuadrantChart actions={getChartData()} key={chartKey} />
              </div>
              <p className="mt-4 text-center text-gray-400">
                {t.chartDescription}
              </p>
              <Legend />
            </CardContent>
          </Card>
        </main>
        <ContactSection /> {/* Moved ContactSection to the end */}
      </div>
    </div>
  );
};

// Componente de legenda para o gráfico
const Legend = () => (
  <div className="flex flex-wrap justify-center mt-4 gap-4">
    <div className="flex items-center">
      <div
        className="w-4 h-4 mr-2"
        style={{ backgroundColor: "#ff6347", opacity: "0.6" }}
      ></div>
      <span className="text-white">Urgency 1, Importance 1</span>
    </div>
    <div className="flex items-center">
      <div
        className="w-4 h-4 mr-2"
        style={{ backgroundColor: "#ffd700", opacity: "0.6" }}
      ></div>
      <span className="text-white">Other</span>
    </div>
    <div className="flex items-center">
      <div
        className="w-4 h-4 mr-2"
        style={{ backgroundColor: "#98fb98", opacity: "0.6" }}
      ></div>
      <span className="text-white">Urgency 5, Importance 5</span>
    </div>
  </div>
);

export default ActionPlanApp;

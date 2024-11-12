import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import translations from "./translations";

const QuickTools = ({ language }) => {
  const t = translations[language].quickTools;

  const tools = [
    { name: t.processFlow, path: "/process-flow", phrase: t.phraseProcessFlow },
    {
      name: t.decisionHelper,
      path: "/decision-helper",
      phrase: t.phraseDecisionMatrix,
    },
    { name: t.actionPlan, path: "/5w2h", phrase: t.phraseActionPlan },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="bg-gray-800 p-4 rounded-lg mb-6 text-center max-w-md mx-auto" // Added max-w-md and mx-auto
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.ul className="space-y-2">
        {tools.map((tool, index) => (
          <motion.li
            key={index}
            className="flex flex-col sm:flex-row items-center justify-center text-sm"
            variants={itemVariants}
          >
            <div className="flex items-center mb-1 sm:mb-0">
              <span className="text-green-400 mr-2">{index + 1}.</span>
              <Link to={tool.path} className="text-green-400 hover:underline">
                {tool.name}
              </Link>
            </div>
            <span className="text-white sm:ml-2">- {tool.phrase}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default QuickTools;

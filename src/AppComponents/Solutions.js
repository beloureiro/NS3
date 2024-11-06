import React from "react";
import { Link } from "react-router-dom";
import translations from "./translations";

const Solutions = ({ language }) => {
  const t = translations[language].solutions;

  const solutions = [
    {
      name: "AICare",
      description: t.aicare.description,
      path: "https://ai-cac.streamlit.app/", // External link
      titleColor: "#1ba8f0",
    },
    {
      name: "InProcess",
      description: t.inprocess.description,
      path: "/inprocess", // Internal link
      titleColor: "#00ff9d",
    },
    {
      name: "4Menu",
      description: t.fourMenu.description,
      path: "/4menu",
      titleColor: "#FF6B6B",
    },
    {
      name: "Rex",
      description: t.rex.description,
      path: "/rex",
      titleColor: "#ffff08",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {solutions.map((solution, index) =>
        solution.path.startsWith("http") ? (
          <a
            key={index}
            href={solution.path}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: solution.titleColor }}
            >
              {solution.name}
            </h3>
            <p className="text-gray-300">{solution.description}</p>
          </a>
        ) : (
          <Link
            key={index}
            to={solution.path}
            className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: solution.titleColor }}
            >
              {solution.name}
            </h3>
            <p className="text-gray-300">{solution.description}</p>
          </Link>
        )
      )}
    </div>
  );
};

export default Solutions;

import React from "react";
import { Link } from "react-router-dom";
import translations from "./translations";

// Functional component that takes 'language' as a prop
const Solutions = ({ language }) => {
  // Access the translations for the given language
  const t = translations[language].solutions;

  // Array of solution objects with their respective properties
  const solutions = [
    {
      name: "AICare",
      description: t.aicare.description, // Description from translations
      path: "https://ai-cac.streamlit.app/", // External link
      titleColor: "#1ba8f0", // Title color
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

  // JSX to render the solutions
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto"
      style={{ maxWidth: "850px" }} // Adjust the maximum width of the container
    >
      {solutions.map((solution, index) =>
        // Check if the path is an external link
        solution.path.startsWith("http") ? (
          <a
            key={index}
            href={solution.path}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            // Set minHeight and maxHeight to control the height of the card
            style={{
              minHeight: "100px",
              maxHeight: "150px",
              width: "100%",
              padding: "10px",
            }}
          >
            <h3
              className="text-lg font-bold mb-2"
              style={{ color: solution.titleColor }} // Adjust the title color
            >
              {solution.name}
            </h3>
            <p className="text-gray-300">{solution.description}</p>
          </a>
        ) : (
          // Internal link using React Router's Link component
          <Link
            key={index}
            to={solution.path}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            // Set minHeight and maxHeight to control the height of the card
            style={{
              minHeight: "100px",
              maxHeight: "150px",
              width: "100%",
              padding: "10px",
            }}
          >
            <h3
              className="text-lg font-bold mb-2"
              style={{ color: solution.titleColor }} // Adjust the title color
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

import React from "react";
import { Helmet } from "react-helmet";
import { useLocation, Link } from "react-router-dom";
import translations from "./translations";
import { ChevronLeft, Globe } from "lucide-react"; // Import icons

const PageHeader = ({ language, setLanguage, logo }) => {
  const location = useLocation();
  const isHomePage =
    location.pathname === "/NS3" ||
    location.pathname === "/NS3/" ||
    location.pathname === "/" ||
    location.pathname === "";
  const t = translations[language];

  // Hide header on the homepage
  if (isHomePage) return null;

  return (
    <>
      {/* Helmet component to set the page title and meta description */}
      <Helmet>
        <title>InMotion - Consulting</title>
        <meta name="description" content={t.description} />
      </Helmet>

      {/* Main container for the header content with negative top margin to pull it upwards */}
      <div className="w-full p-4 -mt-6">
        {" "}
        {/* Added -mt-6 to move the entire header up */}
        {/* Flex container to arrange elements horizontally with space between */}
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto px-12">
          {/* Back link with a left arrow icon, leading to the homepage */}
          <Link
            to="/"
            className="text-[#00ff9d] hover:underline flex items-center w-24"
          >
            <ChevronLeft className="mr-2" /> {t.back}
          </Link>

          {/* Center section for the title, logo, and subtitles */}
          <div className="flex flex-col items-center">
            {/* Main title */}
            <h1 className="text-3xl font-bold mb-6">{t.title}</h1>

            {/* Logo with animation on hover */}
            <img
              src={logo}
              alt="InMotion Logo"
              className="h-15 transform transition-transform duration-300 hover:scale-110"
            />

            {/* Subtitle */}
            <div className="text-lg text-gray-400 mt-6">
              Your Daily Toolbox for Business Excellence
            </div>

            {/* Secondary subtitle (if any additional text is needed) */}
            <h2 className="text-xl">{t.subtitle}</h2>
          </div>

          {/* Language switcher button, changes language on click */}
          <button
            onClick={() => setLanguage((lang) => (lang === "en" ? "pt" : "en"))}
            className="flex items-center bg-gray-800 px-3 py-2 rounded hover:bg-[#00ff9d] hover:text-black transition-colors w-24"
          >
            <Globe className="mr-2" /> {language.toUpperCase()}
          </button>
        </div>
      </div>
    </>
  );
};

export default PageHeader;

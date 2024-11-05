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

  if (isHomePage) return null;

  return (
    <>
      <Helmet>
        <title>InMotion - Consulting</title>
        <meta name="description" content={t.description} />
      </Helmet>

      <div className="w-full p-4">
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto px-12">
          <Link
            to="/"
            className="text-[#00ff9d] hover:underline flex items-center w-24"
          >
            <ChevronLeft className="mr-2" /> {t.back}
          </Link>

          <div className="flex flex-col items-center">
            {/* Título principal - ajuste o tamanho da fonte em text-3xl e o espaçamento em mb-6 */}
            <h1 className="text-3xl font-bold mb-6">{t.title}</h1>

            {/* Logo - ajuste:
              - h-16: altura da imagem (h-12, h-16, h-20, etc)
              - hover:scale-110: quanto aumenta no hover (110 = 10%, 120 = 20%, etc)
              - duration-300: velocidade da animação (em millisegundos) */}
            <img
              src={logo}
              alt="InMotion Logo"
              className="h-15 transform transition-transform duration-300 hover:scale-110"
            />

            {/* Subtítulo - ajuste o tamanho da fonte em text-lg e o espaçamento em mt-6 */}
            <div className="text-lg text-white-600 mt-6">
              Your Daily Toolbox for Business Excellence
            </div>

            {/* Subtítulo 2 - ajuste o tamanho da fonte em text-xl */}
            <h2 className="text-xl">{t.subtitle}</h2>
          </div>

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

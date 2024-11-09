// src/AppComponents/Footer.js

import React from 'react';
import translations from './translations';

function Footer({ language }) {
  const t = translations[language] || translations['en'];

  return (
    <footer className="w-full text-center py-2 -mt-4 text-gray-500">
      <p>{t.footerText}</p>
    </footer>
  );
}

export default Footer;

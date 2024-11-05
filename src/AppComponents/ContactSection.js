import React from "react";
import { Mail, Phone, Linkedin, MessageCircle } from "lucide-react";

const ContactSection = ({ title }) => {
  return (
    <div className="mt-2 mb-2">
      {title && (
        <h2 className="text-2xl font-semibold mb-2 text-center">{title}</h2>
      )}
      <div className="flex justify-center space-x-6">
        <a
          href="mailto:bc@inmotion.today"
          className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110"
        >
          <Mail size={24} />
        </a>
        <a
          href="tel:+351915542701"
          className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110"
        >
          <Phone size={24} />
        </a>
        <a
          href="https://www.linkedin.com/company/inmotionc"
          className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://wa.me/351915542701"
          className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </div>
  );
};

export default ContactSection;

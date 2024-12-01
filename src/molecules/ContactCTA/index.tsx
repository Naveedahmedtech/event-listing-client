import React from 'react';
import Button from '@/atoms/Button';
import { FaEnvelope } from 'react-icons/fa'; // Using a mail icon for better visual appeal

interface ContactCTAProps {
  onContactClick: () => void;
}

const ContactCTA: React.FC<ContactCTAProps> = ({ onContactClick }) => {
  return (
    <div className="text-center py-12 px-6 bg-surface text-text rounded-xl shadow-lg space-y-6">
      <h3 className="text-3xl font-semibold">Get In Touch with Us</h3>
      <p className="text-lg max-w-xl mx-auto text-textSecondary">
        Have questions or want to learn more about our services? Reach out to us today! Our team is ready to assist you in discovering the best events.
      </p>
      <Button
        onClick={onContactClick}
        className="flex items-center justify-center px-8 py-3 text-lg bg-primary text-white font-bold rounded-lg hover:bg-primaryHover transform hover:scale-105 transition-all"
      >
        <FaEnvelope className="mr-3" />
        Contact Us
      </Button>
    </div>
  );
};

export default ContactCTA;

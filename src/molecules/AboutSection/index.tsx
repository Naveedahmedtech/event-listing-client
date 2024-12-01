// src/molecules/AboutSection.tsx
import React from 'react';

interface AboutSectionProps {
  title: string;
  content: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ title, content }) => {
  return (
    <section className="bg-surface rounded-xl shadow-lg p-8 space-y-6 hover:shadow-2xl transition-all duration-300">
      <h2 className="text-3xl font-semibold text-textPrimary">{title}</h2>
      <p className="text-lg text-textSecondary">{content}</p>
    </section>
  );
};

export default AboutSection;

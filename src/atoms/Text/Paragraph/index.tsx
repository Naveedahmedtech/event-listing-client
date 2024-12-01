import React from 'react';

interface ParagraphProps {
  children: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  return <p className="text-textSecondary text-base leading-relaxed">{children}</p>;
};

export default Paragraph;

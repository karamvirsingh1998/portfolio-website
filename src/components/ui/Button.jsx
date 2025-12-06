import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    secondary: 'bg-gray-500 hover:bg-gray-600',
    outline: 'border-2 border-blue-500 hover:bg-blue-500/10',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-2 rounded-full font-semibold transition-colors ${variants[variant]}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;

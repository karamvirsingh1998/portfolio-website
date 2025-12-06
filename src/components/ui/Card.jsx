import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
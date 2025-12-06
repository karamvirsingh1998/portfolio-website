import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => (
  <div className="h-screen flex items-center justify-center bg-gray-900">
    <motion.div
      className="text-4xl text-blue-500 font-bold"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    >
      Portfolio
    </motion.div>
  </div>
);

export default LoadingScreen;
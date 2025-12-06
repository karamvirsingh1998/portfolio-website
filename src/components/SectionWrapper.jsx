import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, id, isHero = false }) => {
  const sectionRef = useRef(null);

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      // Keep relative positioning but remove min-height constraint
      className={`relative ${isHero ? 'bg-transparent' : 'bg-gray-900'}`}
      // Reduced padding for better spacing
      style={{ 
        paddingTop: isHero ? 0 : "80px",
        paddingBottom: "2rem"
      }}
    >
      {/* Decorative background elements - only shown for Hero section */}
      {isHero && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orb */}
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23FFFFFF' fill-opacity='0.05'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
      )}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default SectionWrapper;
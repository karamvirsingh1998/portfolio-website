import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const Header = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'hero',
      label: 'Home',
      icon: <LucideIcons.Home size={20} />,
      gradient: 'from-violet-600 to-indigo-600'
    },
    {
      id: 'about',
      label: 'About',
      icon: <LucideIcons.User size={20} />,
      gradient: 'from-indigo-600 to-blue-600'
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: <LucideIcons.Code2 size={20} />,
      gradient: 'from-cyan-600 to-teal-600'
    },
    {
      id: 'citations',
      label: 'Citations',
      icon: <LucideIcons.BookOpen size={20} />,
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <LucideIcons.Briefcase size={20} />,
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'research',
      label: 'Research',
      icon: <LucideIcons.GraduationCap size={20} />,
      gradient: 'from-teal-600 to-green-600'
    },
    {
      id: 'ideas',
      label: 'Ideas',
      icon: <LucideIcons.Lightbulb size={20} />,
      gradient: 'from-yellow-600 to-orange-600'
    },
    {
      id: 'interests',
      label: 'Interests',
      icon: <LucideIcons.Heart size={20} />,
      gradient: 'from-emerald-600 to-yellow-600'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <LucideIcons.Mail size={20} />,
      gradient: 'from-orange-600 to-red-600'
    }
  ];

  // Updated navigation handler with improved scroll behavior
  const handleNavClick = (id) => {
      const element = document.getElementById(id);
      if (element) {
          // Get the header height
          const headerHeight = document.querySelector('header')?.offsetHeight || 80;
          // Get the element's position
          const elementPosition = element.offsetTop;
          // Scroll to the element with an offset for the header
          window.scrollTo({
              top: elementPosition - headerHeight - 20, // Added extra 20px for breathing room
              behavior: 'smooth'
              });
          setActiveSection(id);
          setIsMobileMenuOpen(false);
          }
      };

  const NavItem = ({ item, index }) => {
    const isActive = activeSection === item.id;

    return (
      <motion.button
        onClick={() => handleNavClick(item.id)}
        className={`relative overflow-hidden rounded-xl
          ${isActive ? 'text-white' : 'text-gray-300'}
          hover:text-white transition-colors duration-300`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="relative px-4 py-2 flex items-center gap-2 z-10">
          {/* Icon with rotation animation */}
          <motion.span
            animate={{ rotate: isActive ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-current"
          >
            {item.icon}
          </motion.span>

          {/* Label */}
          <span className="font-medium">{item.label}</span>

          {/* Hover and active background */}
          <motion.div
            className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-r ${item.gradient}
              opacity-0 hover:opacity-100 transition-opacity duration-300
              ${isActive ? 'opacity-100' : ''}`}
            layoutId={`background-${item.id}`}
          />
        </div>
      </motion.button>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LucideIcons.Code size={32} className="text-blue-500" />
            Portfolio
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <NavItem key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <LucideIcons.X size={24} />
            ) : (
              <LucideIcons.Menu size={24} />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-2 pb-4">
                {navItems.map((item, index) => (
                  <NavItem key={item.id} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
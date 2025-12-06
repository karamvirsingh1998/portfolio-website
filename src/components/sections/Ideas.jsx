import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle, BarChart, MessageCircle, Briefcase, Zap,
  Lightbulb, Sparkles, ArrowRight, X, ChevronLeft, ChevronRight
} from 'lucide-react';

const Ideas = () => {
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Ideas with enhanced data
  const ideas = [
    {
      id: 1,
      title: "Support Ticket Automation",
      description: "An intelligent system that automates support ticket resolution using data from previously solved tickets in the same domain.",
      category: "Enterprise AI",
      status: "Concept Phase",
      statusColor: "emerald",
      icon: <HelpCircle size={32} />,
      details: [
        "Analyzes patterns in previously resolved tickets to build a knowledge base",
        "Automatically resolves common issues without human intervention",
        "Escalates to human agents when confidence is low or when novel issues arise",
        "Ensures accurate responses with reliability verification",
        "Integrates with existing ticketing systems like Zendesk, Intercom, and Freshdesk"
      ],
      challenge: "Ensuring high accuracy while maintaining transparency about AI vs. human responses",
      potentialImpact: "Can reduce support workload by 60-70% while maintaining high customer satisfaction",
      implementation: "Requires RAG architecture, fine-tuned LLMs on domain-specific data, and integration APIs"
    },
    {
      id: 2,
      title: "Investment Portfolio Advisor",
      description: "A personalized financial tool that recommends optimal investment allocations based on user goals, risk tolerance, and market conditions.",
      category: "FinTech",
      status: "Research Phase",
      statusColor: "blue",
      icon: <BarChart size={32} />,
      details: [
        "Users input investment amount and financial goals",
        "System analyzes current market trends and historical performance",
        "Provides diversified investment recommendations across different asset classes",
        "Considers tax implications and fee structures",
        "Regularly rebalances portfolio based on market changes and goal progress"
      ],
      challenge: "Balancing algorithmic recommendations with regulatory compliance and risk disclosure",
      potentialImpact: "Democratizes financial advice and portfolio management for everyday investors",
      implementation: "Combines financial modeling, market data APIs, and personalization algorithms"
    },
    {
      id: 3,
      title: "WhatsApp Intelligence Assistant",
      description: "An AI-powered assistant integrated with WhatsApp that helps users search conversation history, find information, and connect with relevant contacts.",
      category: "Conversational AI",
      status: "Idea Validation",
      statusColor: "amber",
      icon: <MessageCircle size={32} />,
      details: [
        "Identifies contacts who can help with specific problems or questions",
        "Searches past messages to find relevant information quickly",
        "Analyzes conversation patterns to suggest relevant connections",
        "Maintains privacy by processing data locally when possible",
        "Integrates with both personal and business WhatsApp accounts"
      ],
      challenge: "Balancing privacy concerns with functionality and WhatsApp's API limitations",
      potentialImpact: "Transforms WhatsApp from a simple messaging app to a knowledge management tool",
      implementation: "Requires WhatsApp Business API, NLP for message understanding, and secure data handling"
    },
    {
      id: 4,
      title: "ML-Driven Contract Analyzer",
      description: "An intelligent system that automatically reviews legal contracts, highlighting potential issues and suggesting improvements.",
      category: "Legal Tech",
      status: "Early Planning",
      statusColor: "purple",
      icon: <Briefcase size={32} />,
      details: [
        "Scans contracts to identify problematic clauses or missing elements",
        "Compares against best practices and industry standards",
        "Provides risk assessment based on historical legal precedents",
        "Generates plain-language summaries of complex legal documents",
        "Adapts to different contract types and jurisdictions"
      ],
      challenge: "Ensuring legal accuracy while handling diverse document formats and legal frameworks",
      potentialImpact: "Could save thousands of billable hours and reduce legal risks for businesses",
      implementation: "Combines NLP, document understanding, and legal knowledge bases"
    },
    {
      id: 5,
      title: "Voice-First Developer Assistant",
      description: "A voice-controlled AI assistant specialized in helping developers write, debug, and optimize code through natural conversation.",
      category: "Developer Tools",
      status: "Vision Stage",
      statusColor: "pink",
      icon: <Zap size={32} />,
      details: [
        "Allows hands-free coding through voice commands and dictation",
        "Provides context-aware code suggestions and explanations",
        "Helps debug by analyzing error messages and suggesting fixes",
        "Integrates with IDEs and version control systems",
        "Adapts to individual coding style and preferences over time"
      ],
      challenge: "Creating a natural voice interface for the highly technical and precise domain of programming",
      potentialImpact: "Could transform developer workflows and make coding more accessible",
      implementation: "Requires advanced ASR, code generation models, and IDE integration capabilities"
    }
  ];

  // Navigate between ideas
  const navigateIdeas = (direction) => {
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return ideas.length - 1;
      if (newIndex >= ideas.length) return 0;
      return newIndex;
    });
  };

  // Get color scheme based on idea status
  const getColorScheme = (color) => {
    const colorSchemes = {
      emerald: {
        primary: "#10b981",
        secondary: "#065f46",
        bg: "rgba(16, 185, 129, 0.2)",
        border: "rgba(16, 185, 129, 0.3)",
        gradient: "from-emerald-500 to-teal-600"
      },
      blue: {
        primary: "#3b82f6",
        secondary: "#1e40af",
        bg: "rgba(59, 130, 246, 0.2)",
        border: "rgba(59, 130, 246, 0.3)",
        gradient: "from-blue-500 to-indigo-600"
      },
      amber: {
        primary: "#f59e0b",
        secondary: "#b45309",
        bg: "rgba(245, 158, 11, 0.2)",
        border: "rgba(245, 158, 11, 0.3)",
        gradient: "from-amber-500 to-yellow-600"
      },
      purple: {
        primary: "#8b5cf6",
        secondary: "#5b21b6",
        bg: "rgba(139, 92, 246, 0.2)",
        border: "rgba(139, 92, 246, 0.3)",
        gradient: "from-purple-500 to-indigo-600"
      },
      pink: {
        primary: "#ec4899",
        secondary: "#9d174d",
        bg: "rgba(236, 72, 153, 0.2)",
        border: "rgba(236, 72, 153, 0.3)",
        gradient: "from-pink-500 to-rose-600"
      }
    };
    
    return colorSchemes[color] || colorSchemes.blue;
  };

  // Generate CSS classes based on color scheme
  const getCategoryClasses = (color) => {
    const colorMap = {
      emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      pink: "bg-pink-500/20 text-pink-400 border-pink-500/30"
    };
    
    return colorMap[color] || colorMap.blue;
  };

  const getIconContainerClass = (color) => {
    const colorMap = {
      emerald: "bg-emerald-500/20 text-emerald-400",
      blue: "bg-blue-500/20 text-blue-400", 
      amber: "bg-amber-500/20 text-amber-400",
      purple: "bg-purple-500/20 text-purple-400",
      pink: "bg-pink-500/20 text-pink-400"
    };
    
    return colorMap[color] || colorMap.blue;
  };

  const getButtonGradient = (color) => {
    const colorMap = {
      emerald: "bg-gradient-to-r from-emerald-500 to-teal-600",
      blue: "bg-gradient-to-r from-blue-500 to-indigo-600",
      amber: "bg-gradient-to-r from-amber-500 to-yellow-600",
      purple: "bg-gradient-to-r from-purple-500 to-indigo-600",
      pink: "bg-gradient-to-r from-pink-500 to-rose-600"
    };
    
    return colorMap[color] || colorMap.blue;
  };

  // Visual elements for mathematical aesthetics
  // More minimal mathematical background elements
const MathematicalBackgroundElements = () => {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Simpler grid background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-gray-900/0 to-gray-900/0"></div>
        </div>
        
        {/* Fewer mathematical formula decorations */}
        <div className="absolute bottom-6 left-6 text-blue-500/30 font-mono text-xs z-0 hidden md:block">
          f(z) = z² + c
        </div>
        <div className="absolute top-10 right-6 text-indigo-500/30 font-mono text-xs z-0 hidden md:block">
          ∇²ψ = i∂ψ/∂t
        </div>
        
        {/* Smaller tech decoration icons */}
        <Lightbulb className="absolute top-20 left-10 text-amber-500/10" size={80} strokeWidth={1} />
        <Sparkles className="absolute bottom-20 right-10 text-indigo-500/10" size={60} strokeWidth={1} />
      </div>
    );
  };

  // Current idea display
  const currentIdea = ideas[currentIndex];
  const colors = getColorScheme(currentIdea.statusColor);

  return (
    <section className="relative py-10 md:py-16 bg-gray-900 overflow-hidden">
      <MathematicalBackgroundElements />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 inline-block mb-2">
            Innovation Vector Space
          </h2>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Exploring technologies at the intersection of imagination and possibility
          </p>
        </div>
        
        {/* Main idea display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 items-center">
          {/* Navigation for mobile - more compact */}
          <div className="flex justify-between items-center lg:hidden mb-3">
            <button 
              onClick={() => navigateIdeas(-1)}
              className="p-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-300 hover:bg-gray-700 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => navigateIdeas(1)}
              className="p-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-gray-300 hover:bg-gray-700 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Previous idea (desktop) - more compact */}
          <div className="hidden lg:flex justify-center">
            <button
              onClick={() => navigateIdeas(-1)} 
              className="flex flex-col items-center p-3 rounded-lg bg-gray-800/40 border border-gray-700/40 backdrop-blur-sm hover:bg-gray-800/80 transition-all max-w-xs"
            >
              <ChevronLeft size={24} className="text-gray-400 mb-1" />
              <div className="text-center">
                <p className="text-gray-400 text-xs">Previous</p>
                <h4 className="text-sm font-medium text-gray-300">
                  {ideas[(currentIndex - 1 + ideas.length) % ideas.length].title}
                </h4>
              </div>
            </button>
          </div>
          
          {/* Current idea card */}
          <motion.div 
            key={currentIdea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-xl"
          >
            {/* Card header with gradient based on idea color */}
            <div className={`h-3 w-full bg-gradient-to-r ${colors.gradient}`}></div>
            
            <div className="p-4">
              {/* Icon and title - more compact layout */}
              <div className="flex items-center mb-3">
                <div className={`rounded-lg p-3 mr-3 ${getIconContainerClass(currentIdea.statusColor)}`}>
                  {currentIdea.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">{currentIdea.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryClasses(currentIdea.statusColor)}`}>
                      {currentIdea.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryClasses(currentIdea.statusColor)}`}>
                      {currentIdea.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Description - smaller text and margin */}
              <p className="text-gray-300 text-sm mb-4">{currentIdea.description}</p>
              
              {/* Key points preview - more compact */}
              <div className="mb-4">
                <h4 className="text-base font-semibold text-blue-400 mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {currentIdea.details.slice(0, 2).map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span className="text-gray-300 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* View Details button */}
              <button
                onClick={() => setSelectedIdea(currentIdea)}
                className={`w-full mt-2 px-3 py-2 ${getButtonGradient(currentIdea.statusColor)} text-white rounded-lg text-sm font-medium flex items-center justify-center`}
              >
                <span>View Details</span>
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </motion.div>
          
          {/* Next idea (desktop) - more compact */}
          <div className="hidden lg:flex justify-center">
            <button
              onClick={() => navigateIdeas(1)} 
              className="flex flex-col items-center p-3 rounded-lg bg-gray-800/40 border border-gray-700/40 backdrop-blur-sm hover:bg-gray-800/80 transition-all max-w-xs"
            >
              <ChevronRight size={24} className="text-gray-400 mb-1" />
              <div className="text-center">
                <p className="text-gray-400 text-xs">Next</p>
                <h4 className="text-sm font-medium text-gray-300">
                  {ideas[(currentIndex + 1) % ideas.length].title}
                </h4>
              </div>
            </button>
          </div>
        </div>
        
        {/* Dots navigation - more compact */}
        <div className="flex justify-center mt-4">
          {ideas.map((idea, index) => (
            <button
              key={idea.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 mx-1 rounded-full transition-all ${
                index === currentIndex 
                  ? `bg-${currentIdea.statusColor}-500` 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to idea ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Have an idea CTA - more compact */}
        <div className="mt-10 text-center">
          <div className="inline-block p-4 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-600/10 border border-indigo-500/20 backdrop-blur-sm">
            <Lightbulb className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-white mb-1">Have an innovative idea?</h3>
            <p className="text-sm text-gray-300 mb-3">Let's collaborate on your next breakthrough</p>
            <a
              href="#contact"
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium inline-flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Discuss Your Idea
            </a>
          </div>
        </div>
      </div>
      
      {/* Modal for Detailed View */}
      <AnimatePresence>
        {selectedIdea && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIdea(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with gradient */}
              <div className={`h-2 w-full bg-gradient-to-r ${getButtonGradient(selectedIdea.statusColor)}`}></div>
              
              <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-5 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${getIconContainerClass(selectedIdea.statusColor)}`}>
                    {selectedIdea.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedIdea.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedIdea(null)}
                  className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/50"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content - more compact */}
              <div className="p-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryClasses(selectedIdea.statusColor)}`}>
                    {selectedIdea.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryClasses(selectedIdea.statusColor)}`}>
                    {selectedIdea.status}
                  </span>
                </div>

                <p className="text-gray-300 mb-4 text-base">{selectedIdea.description}</p>

                {/* Key features - more compact */}
                <div className="mb-4 bg-gray-700/30 p-3 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {selectedIdea.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className={`text-${selectedIdea.statusColor}-400 mr-2 mt-0.5`}>•</span>
                        <span className="text-gray-300 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Implementation details - more compact grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-700/30 p-3 rounded-lg">
                    <h4 className="text-white font-medium text-sm mb-1">
                      Challenge
                    </h4>
                    <p className="text-gray-300 text-xs">{selectedIdea.challenge}</p>
                  </div>
                  <div className="bg-gray-700/30 p-3 rounded-lg">
                    <h4 className="text-white font-medium text-sm mb-1">
                      Potential Impact
                    </h4>
                    <p className="text-gray-300 text-xs">{selectedIdea.potentialImpact}</p>
                  </div>
                  <div className="bg-gray-700/30 p-3 rounded-lg">
                    <h4 className="text-white font-medium text-sm mb-1">
                      Implementation
                    </h4>
                    <p className="text-gray-300 text-xs">{selectedIdea.implementation}</p>
                  </div>
                </div>

                {/* CTA Button - more compact */}
                <div className="mt-4 text-center">
                  <a
                    href="#contact"
                    onClick={() => setSelectedIdea(null)}
                    className={`px-4 py-2 ${getButtonGradient(selectedIdea.statusColor)} text-white rounded-lg text-sm font-medium inline-flex items-center transition-transform hover:scale-105`}
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5" />
                    Discuss This Idea
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Ideas;
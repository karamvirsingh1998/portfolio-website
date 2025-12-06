// src/components/sections/Hero.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";

// Simplified neural network background
const NeuralNetworkBackground = () => {
  const [points, setPoints] = useState([]);
  const [connections, setConnections] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    
    // Create fewer points for better performance
    const pointCount = Math.min(Math.floor((width * height) / 20000), 40);
    const newPoints = Array.from({ length: pointCount }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 2,
      color: i % 5 === 0 
        ? "rgba(100, 200, 255, 0.8)" 
        : "rgba(100, 150, 255, 0.5)",
    }));
    
    setPoints(newPoints);

    // Create fewer connections
    const newConnections = [];
    const connectionDistance = Math.min(width, height) * 0.12;

    for (let i = 0; i < newPoints.length; i++) {
      for (let j = i + 1; j < newPoints.length; j++) {
        const dx = newPoints[i].x - newPoints[j].x;
        const dy = newPoints[i].y - newPoints[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          newConnections.push({
            id: `${i}-${j}`,
            pointA: i,
            pointB: j,
            opacity: Math.max(0.05, 1 - distance / connectionDistance),
          });
        }
      }
    }

    setConnections(newConnections);

    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        // Recalculate on resize, but less frequently
        const pointCount = Math.min(Math.floor((width * height) / 20000), 40);
        const newPoints = Array.from({ length: pointCount }, (_, i) => ({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 2,
          color: i % 5 === 0 
            ? "rgba(100, 200, 255, 0.8)" 
            : "rgba(100, 150, 255, 0.5)",
        }));
        
        setPoints(newPoints);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* SVG for connections */}
      <svg width="100%" height="100%" className="absolute inset-0">
        {connections.map((conn) => {
          if (points.length <= conn.pointA || points.length <= conn.pointB)
            return null;
          const pointA = points[conn.pointA];
          const pointB = points[conn.pointB];

          return (
            <line
              key={conn.id}
              x1={pointA.x}
              y1={pointA.y}
              x2={pointB.x}
              y2={pointB.y}
              stroke="rgba(120, 170, 255, 0.15)"
              strokeWidth={0.5}
              opacity={conn.opacity}
            />
          );
        })}
      </svg>

      {/* Points/nodes */}
      {points.map((point) => (
        <motion.div
          key={point.id}
          className="absolute rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: point.size,
            height: point.size,
            backgroundColor: point.color,
          }}
          animate={{
            x: [0, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * 30 - 15, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              duration: 15 + Math.random() * 10,
              repeatType: "reverse",
            },
            y: {
              repeat: Infinity,
              duration: 15 + Math.random() * 10,
              repeatType: "reverse",
            },
          }}
        />
      ))}
    </div>
  );
};

// AI Assistant with simplified logic
const AIAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  
  // Predefined responses
  const RESPONSES = {
    default: "I'm Karamvir's AI assistant. How can I help you learn more about his experience in AI engineering, language models, and voice technology?",
    experience: "Karamvir has 4+ years of experience in AI and ML. He's worked on production-grade systems that have saved companies over $1.5M through automation and improved accuracy.",
    llm: "Karamvir is an expert in Large Language Models (LLMs). He has worked on fine-tuning models, building retrieval-augmented generation systems, and ensuring factuality in AI outputs.",
    skills: "Karamvir's technical skills include LLMs, RAG, LoRA, PEFT, Multimodal AI, TTS, ASR, Transformers, Kubernetes, AWS, GCP, Python, C++, and FastAPI.",
    education: "Karamvir graduated from NIT Jalandhar with an 8.86 CGPA. He's also taken specialized courses in machine learning and NLP throughout his career.",
    mentorship: "Karamvir offers 1:1 mentorship sessions via Topmate. You can book a session to discuss AI career advice, LLM techniques, and technical challenges."
  };
  
  const suggestedQuestions = [
    "What's Karamvir's expertise?",
    "Tell me about his experience",
    "What are his technical skills?",
    "What is his education?",
    "Does he offer mentorship?"
  ];
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    
    if (!isChatOpen && messages.length === 0) {
      setMessages([
        { role: "assistant", content: RESPONSES.default }
      ]);
    }
  };
  
  const handleSendMessage = (messageText = inputMessage) => {
    if (!messageText.trim()) return;
    
    setMessages([...messages, { role: "user", content: messageText }]);
    setInputMessage("");
    setIsTyping(true);
    
    // Simplified response logic
    setTimeout(() => {
      let response = RESPONSES.default;
      
      const lowerMessage = messageText.toLowerCase();
      if (lowerMessage.includes("experience") || lowerMessage.includes("work")) {
        response = RESPONSES.experience;
      } else if (lowerMessage.includes("llm") || lowerMessage.includes("language")) {
        response = RESPONSES.llm;
      } else if (lowerMessage.includes("skill") || lowerMessage.includes("tech")) {
        response = RESPONSES.skills;
      } else if (lowerMessage.includes("education") || lowerMessage.includes("study")) {
        response = RESPONSES.education;
      } else if (lowerMessage.includes("mentor") || lowerMessage.includes("topmate") || lowerMessage.includes("session") || lowerMessage.includes("1:1")) {
        response = RESPONSES.mentorship;
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800);
  };
  
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
      >
        {isChatOpen ? (
          <LucideIcons.X size={22} />
        ) : (
          <LucideIcons.MessageCircle size={22} />
        )}
      </motion.button>
      
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-80 h-96 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 text-white">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                  <LucideIcons.Bot size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Karamvir's AI Assistant</h3>
                  <p className="text-xs opacity-80">Ask about my background</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-2 text-sm ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-200 rounded-lg p-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "600ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef}></div>
            </div>

            {/* Suggested Questions */}
            <div className="px-2 pt-2">
              <div className="flex flex-wrap gap-1">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="px-2 py-1 bg-gray-700 text-white text-xs rounded-full whitespace-nowrap hover:bg-blue-600 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-2 border-t border-gray-700 mt-2">
              <div className="flex">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-800 text-white text-sm rounded-l-lg px-3 py-2 outline-none"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className={`text-white px-3 py-2 rounded-r-lg ${
                    !inputMessage.trim() || isTyping
                      ? "bg-blue-600/50 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <LucideIcons.Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  // State for dynamic traits with simplified animation
  const [currentTraitIndex, setCurrentTraitIndex] = useState(0);
  const traits = [

    "Building AI that solves real problems",
    "4 years of AI - ML - GEN AI experience",
    "Building MultiRouter Agents",
    "Published AI researcher",
    "AI Mentorship via Topmate"
  ];
  const testimonials = [
    {
      text: "Karamvir demonstrated exceptional technical expertise and a talent for solving complex problems",
      author: "Pavitar Singh",
      role: "CEO (UnifyApps)"
    },
    {
      text: "He is not just a participant in projects but a driving force behind them.",
      author: "Yogin Patel",
      role: "Head of AI (Sprinklr)"
    },
    {
      text: "Karamvir is an exceptional talent. He has always surprised me",
      author: "Sachin Bhardwaj",
      role: "Head of AI (UnifyApps)"
    },
    {
      text: "His dedication made him a critical part of our success.",
      author: "Elisabetta Carta",
      role: "PM (Sprinklr)"
    },
    {
      text: "One thing I adore about him was his ability to quickly experiment and iterate.",
      author: "Aayush Kubba",
      role: "Director (Voice AI), Sprinklr"
    },
    {
      text: "No challenge is too big; he approaches every task with a determined attitude.",
      author: "Navaneshwar Reddy", 
      role: "Director (UnifyApps)"
    }
  ];

  // Simplified navigation with fewer animations
  const navItems = [
    {
      id: "about",
      name: "About",
      icon: <LucideIcons.User size={30} />,
      color: "blue-600",
      background: "bg-blue-900/30",
    },
    {
      id: "projects",
      name: "Projects",
      icon: <LucideIcons.Briefcase size={30} />,
      color: "green-600",
      background: "bg-green-900/30",
    },
    {
      id: "skills",
      name: "Skills",
      icon: <LucideIcons.Code2 size={30} />,
      color: "yellow-600",
      background: "bg-yellow-900/30",
    },
    {
      id: "research",
      name: "Research",
      icon: <LucideIcons.GraduationCap size={30} />,
      color: "purple-600",
      background: "bg-purple-900/30",
    },
    {
      id: "citations",
      name: "Citations",
      icon: <LucideIcons.FileText size={30} />,
      color: "cyan-600",
      background: "bg-cyan-900/30",
      highlight: true, // Enable highlight for citations
      badge: "3", // Show citation count as a badge
    },
    {
      id: "ideas",
      name: "Ideas",
      icon: <LucideIcons.Lightbulb size={30} />,
      color: "amber-600",
      background: "bg-amber-900/30",
    },
    {
      id: "interests", 
      name: "Interests",
      icon: <LucideIcons.Heart size={30} />,
      color: "pink-600",
      background: "bg-pink-900/30",
    },
    {
      id: "contact",
      name: "Contact",
      icon: <LucideIcons.Mail size={30} />,
      color: "indigo-600",
      background: "bg-indigo-900/30",
    },
  ];
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  // Combined array with shuffled items
  const combinedItems = shuffleArray([
    ...traits.map(trait => ({ type: 'trait', content: trait })),
    ...testimonials.map(testimonial => ({ type: 'testimonial', content: testimonial }))
  ]);

  // Rotate through traits and testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTraitIndex((prev) => {
        // Generate a random index that's different from the current one
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * combinedItems.length);
        } while (nextIndex === prev && combinedItems.length > 1);
        
        return nextIndex;
      });
    }, 4000); // Display time se t to 6 seconds
    
    return () => clearInterval(interval);
  }, [combinedItems.length]);

  // Rotate through traits
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTraitIndex((prev) => (prev + 1) % traits.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [traits.length]);

  // Resume download handler
  const handleDownloadResume = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = '/karamvirResume.pdf';
    link.download = 'Karamvir_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Navigation handler with scroll
  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="h-screen w-full flex items-stretch overflow-hidden bg-gray-900"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <NeuralNetworkBackground />
        <div className="absolute inset-0 bg-grid-white/[0.01]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23FFFFFF' fill-opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}></div>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Left Section - Profile */}
      <div className="w-[40%] h-full flex flex-col p-8 relative z-10">
        <div className="flex flex-col justify-center h-full">
          {/* Profile Photo - Simplified */}
          <div className="flex items-center justify-center mt-12 relative">
            <motion.div
              className="w-full max-w-md aspect-square rounded-lg border-4 border-blue-500 overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/images/profile.jpeg"
                alt="Karamvir Singh"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400?text=Karamvir+Singh";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 to-purple-600/0 mix-blend-overlay"></div>
            </motion.div>
          </div>

          {/* About Section - Simplified */}
          <div className="flex flex-col justify-center text-center relative z-10 mt-8">
            <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>

            {/* Name with gradient text */}
            <motion.h1 
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Karamvir Singh
            </motion.h1>

            {/* Job title */}
            <motion.p 
              className="text-2xl text-gray-300 font-medium mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Staff AI Engineer
            </motion.p>

            {/* Dynamic trait with simplified animation */}
            <div className="h-24 mt-3 mb-4">
            <AnimatePresence mode="wait">
                {combinedItems[currentTraitIndex].type === 'trait' ? (
                  <motion.div
                    key={`trait-${currentTraitIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-3 rounded-lg border border-blue-500/30 shadow-lg max-w-md mx-auto flex items-center justify-center h-full"
                  >
                    <p className="text-lg text-gray-300 italic">
                      {combinedItems[currentTraitIndex].content}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`testimonial-${currentTraitIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-3 rounded-lg border border-blue-500/30 shadow-lg max-w-md mx-auto"
                  >
                    <motion.p 
                      className="text-sm text-gray-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      "{combinedItems[currentTraitIndex].content.text}"
                    </motion.p>
                    <motion.div 
                      className="mt-2 text-right"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <p className="text-xs font-bold text-blue-400">{combinedItems[currentTraitIndex].content.author}</p>
                      <p className="text-xs text-gray-400">{combinedItems[currentTraitIndex].content.role}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Core achievements - static for simplicity */}
            <div className="flex justify-center space-x-6 my-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">15+</div>
                <div className="text-sm text-gray-400">AI Systems</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">92%</div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">$1.5M+</div>
                <div className="text-sm text-gray-400">Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">3</div>
                <div className="text-sm text-gray-400">Publications</div>
              </div>
            </div>

            {/* Social links with simplified hover effects - UPDATED with Topmate */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center space-x-6 my-4"
            >
              <a
                href="https://github.com/karamvirsingh1998"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                <LucideIcons.Github size={26} />
              </a>
              <a
                href="https://www.linkedin.com/in/karamvir-singh-842838177/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <LucideIcons.Linkedin size={26} />
              </a>
              <a
                href="https://x.com/its_karamvir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Twitter Profile"
              >
                <LucideIcons.Twitter size={26} />
              </a>
              <a
                href="https://topmate.io/karamvir_hapal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Topmate Mentorship"
                title="Book a 1:1 mentorship session"
              >
                <LucideIcons.Calendar size={26} />
              </a>
            </motion.div>

            {/* Call-to-action buttons with mentorship option */}
            <div className="flex justify-center space-x-3 mt-4">
              {/* Download Resume Button */}
              <motion.button
                onClick={handleDownloadResume}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium text-sm flex items-center"
              >
                <LucideIcons.Download size={16} className="mr-2" />
                <span>Resume</span>
              </motion.button>
              
              {/* Topmate Button */}
              <motion.a
                href="https://topmate.io/karamvir_hapal"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium text-sm flex items-center"
              >
                <LucideIcons.Users size={16} className="mr-2" />
                <span>Book Mentorship</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Simplified Navigation */}
      <div className="w-[60%] h-full bg-gradient-to-r from-gray-900 to-gray-800 p-8 flex items-center">
        <div className="w-full mx-auto max-w-3xl">
        <div className="grid grid-cols-4 gap-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  boxShadow: item.highlight ? ["0px 0px 0px rgba(6, 182, 212, 0)", "0px 0px 20px rgba(6, 182, 212, 0.7)", "0px 0px 0px rgba(6, 182, 212, 0)"] : "none",
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.1 * index,
                  boxShadow: {
                    repeat: Infinity,
                    duration: 2,
                  } 
                }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => handleNavClick(item.id)}
                className="cursor-pointer relative"
              >
                {/* Badge for citation count */}
                {item.badge && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center z-10 animate-pulse">
                    <span className="text-white text-xs font-bold">{item.badge}</span>
                  </div>
                )}
                
                <div
                  className={`p-6 aspect-square rounded-lg ${item.background} border-2 ${item.highlight ? 'border-cyan-400' : `border-${item.color}`} ${item.highlight ? 'shadow-lg shadow-cyan-400/20' : ''} flex flex-col items-center justify-center gap-3 relative overflow-hidden`}
                >
                  {/* Subtle animation for the highlighted item */}
                  {item.highlight && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  
                  <div className="text-white relative z-10">{item.icon}</div>
                  <div className={`text-white text-lg font-medium relative z-10 ${item.highlight ? 'font-bold' : ''}`}>{item.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Key skills section */}
          <motion.div 
            className="mt-8 bg-gray-800/50 p-6 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 className="text-xl text-white font-medium mb-4">Key Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {["AI Agents", "RAG", "Multi Agentic Framework", "LLM Finetuning", "PEFT", "TTS", "ASR", "Kubernetes", "AWS", "GCP", "Python"].map((skill) => (
                <span key={skill} className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </section>
  );
};

export default Hero;
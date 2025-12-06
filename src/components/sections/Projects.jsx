import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Home, ChevronLeft, ChevronRight, Code, Search, X, Filter, Tag, ExternalLink, Eye, Zap } from 'lucide-react';

// Project data remains the same
// const projectsData = [
//   {
//     id: 1,
//     title: 'MultiModal AI-Agentic Framework',
//     company: 'UnifyApps',
//     category: 'ai-agents',
//     description: 'Architected a comprehensive framework integrating transformer-based models for cross-modal text, speech, and vision processing. The system successfully deployed across 10+ clients, seamlessly integrating their complex workflows.',
//     impact: [
//       'Achieved 1M+ in annual cost savings',
//       '30% reduction in processing times',
//       'Streamlined operations across multiple departments'
//     ],
//     technologies: ['LLMs', 'Transformers', 'MultiModal AI', 'Agentic Systems', 'RAG'],
//     image: '/projects/project.png'
//   },
//   // Other projects...
// ];
const projectsData = [
  {
    id: 1,
    title: 'MultiModal AI-Agentic Framework',
    company: 'UnifyApps',
    category: 'ai-agents',
    description: 'Architected a comprehensive framework integrating transformer-based models for cross-modal text, speech, and vision processing. The system successfully deployed across 10+ clients, seamlessly integrating their complex workflows.',
    impact: [
      'Achieved 1M+ in annual cost savings',
      '30% reduction in processing times',
      'Streamlined operations across multiple departments'
    ],
    technologies: ['LLMs', 'Transformers', 'MultiModal AI', 'Agentic Systems', 'RAG'],
    image: '/projects/project.png'
  },
  {
    id: 2,
    title: 'Voice-Enabled FAQ Chatbot',
    company: 'UnifyApps',
    category: 'voice-tech',
    description: 'Built an advanced voice-enabled FAQ chatbot with custom LLMs, RAG, ASR, and Query Refinement capabilities.',
    impact: [
      'Serving 50K+ monthly interactions',
      'Reduced customer support calls by 45%',
      'Improved user satisfaction ratings by 35%'
    ],
    technologies: ['ASR', 'TTS', 'LLMs', 'RAG', 'Query Refinement'],
    image: '/projects/project_2.png'
  },
  {
    id: 3,
    title: 'Business Analytics Tool',
    company: 'UnifyApps',
    category: 'analytics',
    description: 'Engineered a sophisticated Business Analytics Tool utilizing Text-to-SQL models with domain-specific LLMs.',
    impact: [
      '92% accuracy on complex queries',
      'Support for multiple database schemas',
      'Reduced report generation time by 75%'
    ],
    technologies: ['Text-to-SQL', 'Domain-specific LLMs', 'Semantic Parsing'],
    image: '/projects/project_2.png'
  },
  {
    id: 4,
    title: 'LLM Adapter Optimization',
    company: 'UnifyApps',
    category: 'ai-agents',
    description: 'Optimized distributed training workflows using LORA (Low-Rank Adaptation).',
    impact: [
      '15+ models served through adapters',
      '10+ fine-tuned models on shared GPUs',
      'Reduced serving costs by over 80%'
    ],
    technologies: ['LORA', 'LoRAX', 'Distributed Training', 'Model Quantization'],
    image: '/projects/project_2.png'
  },
  {
    id: 5,
    title: 'Conversational AI Ecosystem',
    company: 'Sprinklr',
    category: 'voice-tech',
    description: 'Architected a comprehensive Conversational AI ecosystem integrating voicebot, chatbot, and real-time speech analysis.',
    impact: [
      'Achieved 50% call deflection rate',
      '50% reduction in call agent workforce',
      'Improved first-call resolution by 40%'
    ],
    technologies: ['ASR', 'TTS', 'LLM', 'Wav2vec2', 'Whisper'],
    image: '/projects/project_2.png'
  },
  {
    id: 6,
    title: 'High-Performance Inference System',
    company: 'Sprinklr',
    category: 'ai-agents',
    description: 'Refined system performance to handle 1500 RPS via model quantization, batching, and distributed inference.',
    impact: [
      '1500 RPS throughput capacity',
      'Maintained high accuracy despite optimization',
      'Reduced infrastructure costs by 60%'
    ],
    technologies: ['Model Quantization', 'Batching', 'Distributed Inference'],
    image: '/projects/project_2.png'
  },
  {
    id: 7,
    title: 'Advanced TTS System',
    company: 'Sprinklr',
    category: 'voice-tech',
    description: 'Built an advanced Text-to-Speech system using VITS architecture with natural-sounding voice synthesis. This system provided human-like voice interactions for various client applications.',
    impact: [
      'Average MOS 4.6 (out of 5)',
      'Supported 12 languages and 30+ voices',
      'Reduced latency by 40% compared to previous system'
    ],
    technologies: ['VITS Architecture', 'Neural TTS', 'Voice Synthesis', 'Multi-lingual Support'],
    image: '/projects/project_2.png'
  },
  {
    id: 8,
    title: 'AI Support Bot',
    company: 'HighLevel',
    category: 'ai-agents',
    description: 'Worked with the Support Team on developing an ASK AI Support Bot for the entire platform to resolve queries of all agencies and sub-accounts. This system provided instant, accurate responses to customer questions.',
    impact: [
      '91% Relevancy rate',
      '94% Grounding accuracy',
      'Released successful Beta Version'
    ],
    technologies: ['LLMs', 'RAG', 'Query Understanding', 'Context Awareness'],
    image: '/projects/project_2.png'
  },
  {
    id: 9,
    title: 'Multi-Agent Routing System',
    company: 'HighLevel',
    category: 'ai-agents',
    description: 'Working with Conversations Team on revamping the agentic flows for Bots Across Vertical Domain utilizing Multi-Agent Routing. This intelligent routing system directs queries to the appropriate specialized agents.',
    impact: [
      'Improved overall accuracy from 75% to 92%',
      'Reduced response time by 65%',
      'Handling 20+ specialized domains'
    ],
    technologies: ['Multi-Agent Systems', 'Routing Algorithms', 'Intent Classification', 'Domain Specialization'],
    image: '/projects/project_2.png'
  },
  {
    id: 10,
    title: 'Content Generation Co-pilot',
    company: 'HighLevel',
    category: 'ai-agents',
    description: 'Working with Content Team to build Highly Co-pilot for generating Content Across Multiple Domains. This tool assists content creators with intelligent suggestions and automated content generation.',
    impact: [
      'Consolidated multiple platform integrations',
      'Reduced content creation time by 70%',
      'Supporting 15+ content verticals'
    ],
    technologies: ['LLMs', 'Content Generation', 'Domain Adaptation', 'Co-pilot Architecture'],
    image: '/projects/project_2.png',
  }
];

// Categories data with AI-themed icons
const categories = [
  { id: 'all', label: 'All Projects', icon: <Home className="w-4 h-4" /> },
  { id: 'ai-agents', label: 'AI Agents', icon: <Code className="w-4 h-4" /> },
  { id: 'voice-tech', label: 'Voice Tech', icon: <ExternalLink className="w-4 h-4" /> },
  { id: 'analytics', label: 'Analytics', icon: <Tag className="w-4 h-4" /> }
];

const NeuralNode = ({ project, isActive, onClick }) => {
  const category = project.category;
  const colorMap = {
    'ai-agents': '#4f46e5',
    'voice-tech': '#10b981',
    'analytics': '#f59e0b'
  };
  const color = colorMap[category] || '#3b82f6';

  return (
    <div 
      className={`neural-node cursor-pointer ${isActive ? 'active' : ''}`}
      style={{ '--node-color': color }}
      onClick={onClick}
    >
      <div className="node-content">
        <div className="node-header">
          <h3 className="node-title">{project.title}</h3>
          <span className="node-company">{project.company}</span>
        </div>
        <div className="node-tech">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Refs for animations
  const neuralNetRef = useRef(null);
  const nodeRefs = useRef({});
  
  // Filter projects based on category and search
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      // Category filter
      const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
      
      // Search filter
      const searchLower = searchQuery.toLowerCase().trim();
      const searchMatch = !searchLower ||
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchLower));
      
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  // Set first project as active when filtered list changes
  useEffect(() => {
    if (filteredProjects.length > 0) {
      if (!activeProject || !filteredProjects.includes(activeProject)) {
        setActiveProject(filteredProjects[0]);
      }
    } else {
      setActiveProject(null);
    }
  }, [filteredProjects]);

  // Draw neural connections
  useEffect(() => {
    if (!neuralNetRef.current || Object.keys(nodeRefs.current).length === 0) return;
    
    const canvas = neuralNetRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Draw connections
    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set line style
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;

      // Draw connections from active project to others
      if (activeProject && nodeRefs.current[activeProject.id]) {
        const activeNode = nodeRefs.current[activeProject.id];
        if (!activeNode) return;
        
        const activeRect = activeNode.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        
        const startX = activeRect.left + activeRect.width / 2 - canvasRect.left;
        const startY = activeRect.top + activeRect.height / 2 - canvasRect.top;
        
        // Connect to other nodes
        filteredProjects.forEach(project => {
          if (project.id === activeProject.id) return;
          
          const targetNode = nodeRefs.current[project.id];
          if (!targetNode) return;
          
          const targetRect = targetNode.getBoundingClientRect();
          const endX = targetRect.left + targetRect.width / 2 - canvasRect.left;
          const endY = targetRect.top + targetRect.height / 2 - canvasRect.top;
          
          // Draw line with animated effect
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          
          // Data-flow animation
          const now = Date.now() / 1000;
          const frequency = 0.5; // Data packets per second
          const speed = 1.5; // Animation speed
          
          // Draw segmented line for data flow effect
          const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
          const segments = 20;
          const segmentLength = distance / segments;
          
          for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const x = startX + (endX - startX) * t;
            const y = startY + (endY - startY) * t;
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            
            // Add data packet animation
            const phaseShift = (project.id * 0.1) % 1; // Different phase for each connection
            const animProgress = ((now * speed + phaseShift) * frequency) % 1;
            
            if (Math.abs(t - animProgress) < 0.05) {
              // Data packet
              ctx.save();
              ctx.fillStyle = project.category === 'ai-agents' ? '#4f46e5' : 
                              project.category === 'voice-tech' ? '#10b981' : 
                              project.category === 'analytics' ? '#f59e0b' : '#3b82f6';
              ctx.beginPath();
              ctx.arc(x, y, 3, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
          
          ctx.stroke();
        });
      }
      
      requestAnimationFrame(drawConnections);
    };
    
    const animFrame = requestAnimationFrame(drawConnections);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animFrame);
    };
  }, [filteredProjects, activeProject]);

  // Clear search handler
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Reset filters handler
  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  return (
    <section id="projects" className="py-12 bg-gray-900 relative overflow-hidden">
      {/* AI-themed background patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-purple-600/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with AI theme */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white inline-flex items-center gap-2 justify-center">
            <span className="text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2H2v10h10V2zM22 2h-8v10h8V2zM12 14H2v8h10v-8zM22 14h-8v8h8v-8z"/>
              </svg>
            </span>
            Project Network
          </h2>
          <p className="text-gray-400 mt-1">Explore the neural network of my AI engineering projects</p>
        </div>

        {/* Interactive search and filter interface */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {/* Toggle buttons for categories */}
          <div className="flex overflow-x-auto hide-scrollbar py-1 max-w-full">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              >
                {React.cloneElement(category.icon, { 
                  size: 16, 
                  className: "inline-block mr-1.5" 
                })}
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Expandable search */}
          <div className={`search-container ${isSearchExpanded ? 'expanded' : ''}`}>
            <button 
              className="search-toggle"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            >
              <Search size={16} />
            </button>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button onClick={handleClearSearch} className="search-clear">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="neural-network-container relative">
            {/* Canvas for neural connections */}
            <canvas 
              ref={neuralNetRef} 
              className="absolute inset-0 w-full h-full" 
            />
            
            <div className="mb-8">
            {/* Featured project display in AI-display format */}
            {activeProject && (
              <div className="ai-display-panel mb-8">
                <div className="display-header">
                  <div className="flex items-center">
                    <span className="status-indicator"></span>
                    <h3 className="text-white text-lg font-bold truncate">
                      {activeProject.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-300 bg-blue-900/30 px-2 py-0.5 rounded">
                      {activeProject.company}
                    </span>
                    <button 
                      className="expand-btn"
                      onClick={() => setShowProjectDetails(true)}
                      title="View full details"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="display-content">
                  <div className="data-section">
                    <div className="data-header">
                      <Code size={14} className="text-blue-400" />
                      <span>Project Overview</span>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {activeProject.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="data-section">
                      <div className="data-header">
                        <Zap size={14} className="text-green-400" />
                        <span>Key Impact</span>
                      </div>
                      <ul className="impact-list">
                        {activeProject.impact.map((item, idx) => (
                          <li key={idx} className="impact-item">
                            <span className="impact-bullet"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="data-section">
                      <div className="data-header">
                        <Tag size={14} className="text-purple-400" />
                        <span>Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {activeProject.technologies.map(tech => (
                          <span key={tech} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-navigation">
                    <button 
                      onClick={() => {
                        const currentIndex = filteredProjects.findIndex(p => p.id === activeProject.id);
                        const prevIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;
                        setActiveProject(filteredProjects[prevIndex]);
                      }}
                      className="nav-button"
                    >
                      <ChevronLeft size={16} />
                      <span>Previous</span>
                    </button>
                    
                    <div className="text-xs text-gray-500">
                      {filteredProjects.findIndex(p => p.id === activeProject.id) + 1} / {filteredProjects.length}
                    </div>
                    
                    <button 
                      onClick={() => {
                        const currentIndex = filteredProjects.findIndex(p => p.id === activeProject.id);
                        const nextIndex = currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1;
                        setActiveProject(filteredProjects[nextIndex]);
                      }}
                      className="nav-button"
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Neural network project grid */}
            <div className="neural-nodes-wrapper">
              <div className="neural-nodes-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProjects.map(project => (
                  <div 
                    key={project.id}
                    ref={el => nodeRefs.current[project.id] = el}
                  >
                    <NeuralNode 
                      project={project}
                      isActive={activeProject && activeProject.id === project.id}
                      onClick={() => setActiveProject(project)}
                    />
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        ) : (
          // No results state with AI-themed empty state
          <div className="ai-empty-state">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 15h8M9 9h.01M15 9h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">No matching projects found</h3>
            <p className="text-gray-400 mb-4">The neural network couldn't identify any projects matching your criteria</p>
            <button
              onClick={handleResetFilters}
              className="reset-btn"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Full project details modal with AI theme */}
      {showProjectDetails && activeProject && (
        <div 
          className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowProjectDetails(false)}
        >
          <div 
            className="ai-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-design-elements">
              <div className="design-circle left-top"></div>
              <div className="design-circle right-bottom"></div>
              <div className="design-line"></div>
            </div>
            
            <div className="modal-header">
              <div className="header-left">
                <div className="modal-id">
                  PROJECT ID: {activeProject.id.toString().padStart(2, '0')}
                </div>
                <h2 className="modal-title">{activeProject.title}</h2>
                <div className="modal-company">{activeProject.company}</div>
              </div>
              
              <button 
                onClick={() => setShowProjectDetails(false)} 
                className="modal-close"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="modal-section">
                <h3 className="section-title">
                  <span className="section-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                      <line x1="7" y1="2" x2="7" y2="22"></line>
                      <line x1="17" y1="2" x2="17" y2="22"></line>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <line x1="2" y1="7" x2="7" y2="7"></line>
                      <line x1="2" y1="17" x2="7" y2="17"></line>
                      <line x1="17" y1="17" x2="22" y2="17"></line>
                      <line x1="17" y1="7" x2="22" y2="7"></line>
                    </svg>
                  </span>
                  Project Overview
                </h3>
                <p className="section-text">{activeProject.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="modal-section">
                  <h3 className="section-title">
                    <span className="section-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                    Key Impact
                  </h3>
                  <ul className="modal-list">
                    {activeProject.impact.map((item, idx) => (
                      <li key={idx}>
                        <span className="list-bullet"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-section">
                  <h3 className="section-title">
                    <span className="section-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </span>
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.technologies.map(tech => (
                      <span key={tech} className="modal-tech">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal navigation */}
            <div className="modal-footer">
              <button 
                onClick={() => {
                  const currentIndex = filteredProjects.findIndex(p => p.id === activeProject.id);
                  const prevIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;
                  setActiveProject(filteredProjects[prevIndex]);
                }}
                className="modal-nav-btn"
              >
                <ChevronLeft size={16} />
                <span>Previous Project</span>
              </button>
              
              <button 
                onClick={() => {
                  const currentIndex = filteredProjects.findIndex(p => p.id === activeProject.id);
                  const nextIndex = currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1;
                  setActiveProject(filteredProjects[nextIndex]);
                }}
                className="modal-nav-btn"
              >
                <span>Next Project</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI-themed CSS styles */}
      <style jsx>{`
        /* AI Grid Pattern Background */
        .bg-grid-pattern {
          background-size: 20px 20px;
          background-image: 
            linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
        }
        
        /* Hide scrollbar but keep functionality */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Category buttons */
        .category-btn {
          position: relative;
          padding: 0.5rem 0.75rem;
          margin-right: 0.5rem;
          background-color: rgba(31, 41, 55, 0.5);
          color: #e5e7eb;
          border-radius: 0.25rem;
          border: 1px solid rgba(75, 85, 99, 0.3);
          transition: all 0.2s;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
        .category-btn::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.3s ease;
        }
        .category-btn:hover::after {
          width: 100%;
        }
        .category-btn.active {
          background-color: rgba(37, 99, 235, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
          color: white;
        }
        .category-btn.active::after {
          width: 100%;
        }
        
        /* Search container with expand/collapse */
        .search-container {
          position: relative;
          display: flex;
          align-items: center;
          background-color: rgba(31, 41, 55, 0.5);
          border-radius: 0.25rem;
          border: 1px solid rgba(75, 85, 99, 0.3);
          overflow: hidden;
          transition: all 0.3s ease;
          width: 36px;
        }
        .search-container.expanded {
          width: 200px;
        }
        .search-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          color: #e5e7eb;
          flex-shrink: 0;
        }
        .search-input-wrapper {
          overflow: hidden;
          width: 0;
          transition: width 0.3s ease;
        }
        .search-container.expanded .search-input-wrapper {
          width: 164px;
        }
        .search-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          padding: 0 0.5rem;
          font-size: 0.875rem;
        }
        .search-clear {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          transition: color 0.2s;
        }
        .search-clear:hover {
          color: white;
        }
        
        /* Neural network container */
        .neural-network-container {
          min-height: 60vh;
          position: relative;
        }
        
        /* Neural nodes */
        .neural-nodes-wrapper {
          position: relative;
        }
        .neural-nodes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 1rem;
        }
        .neural-node {
          background-color: rgba(31, 41, 55, 0.7);
          border: 1px solid rgba(75, 85, 99, 0.3);
          border-radius: 0.5rem;
          padding: 0.75rem;
          transition: all 0.2s ease;
          position: relative;
          height: 100%;
        }
        .neural-node::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, var(--node-color) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          border-radius: 0.5rem;
        }
        .neural-node:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: var(--node-color);
        }
        .neural-node:hover::before {
          opacity: 0.1;
        }
        .neural-node.active {
          background-color: rgba(59, 130, 246, 0.15);
          border-color: var(--node-color);
          box-shadow: 0 0 15px rgba(var(--node-color), 0.3);
        }
        .neural-node.active::before {
          opacity: 0.15;
        }
        .node-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .node-header {
          margin-bottom: 0.5rem;
        }
        .node-title {
          font-weight: 600;
          color: white;
          font-size: 0.875rem;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .node-company {
          font-size: 0.75rem;
          color: #9ca3af;
        }
        .node-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
          margin-top: auto;
        }
        .tech-tag {
          font-size: 0.6875rem;
          padding: 0.125rem 0.375rem;
          background-color: rgba(59, 130, 246, 0.15);
          color: #93c5fd;
          border-radius: 0.25rem;
          white-space: nowrap;
        }
        
        /* AI Display Panel */
        .ai-display-panel {
          background-color: rgba(17, 24, 39, 0.7);
          border: 1px solid rgba(55, 65, 81, 0.5);
          border-radius: 0.5rem;
          overflow: hidden;
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .display-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(55, 65, 81, 0.5);
          background-color: rgba(17, 24, 39, 0.7);
        }
        .status-indicator {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          margin-right: 0.75rem;
          position: relative;
          box-shadow: 0 0 10px #10b981;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        .expand-btn {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(37, 99, 235, 0.2);
          color: #93c5fd;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .expand-btn:hover {
          background-color: rgba(37, 99, 235, 0.3);
          transform: scale(1.05);
        }
        .display-content {
          padding: 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .data-section {
          margin-bottom: 1rem;
        }
        .data-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }
        .impact-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .impact-item {
          display: flex;
          align-items: flex-start;
          font-size: 0.75rem;
          color: #d1d5db;
          margin-bottom: 0.25rem;
          line-height: 1.4;
        }
        .impact-bullet {
          width: 4px;
          height: 4px;
          background-color: #3b82f6;
          border-radius: 50%;
          margin-right: 0.5rem;
          margin-top: 0.45rem;
          flex-shrink: 0;
        }
        .tech-badge {
          font-size: 0.6875rem;
          padding: 0.125rem 0.375rem;
          background-color: rgba(139, 92, 246, 0.15);
          color: #c4b5fd;
          border-radius: 0.25rem;
          white-space: nowrap;
        }
        .project-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.75rem;
          margin-top: auto;
          border-top: 1px dashed rgba(75, 85, 99, 0.3);
        }
        .nav-button {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: #9ca3af;
          transition: color 0.2s;
        }
        .nav-button:hover {
          color: white;
        }
        
        /* Empty state */
        .ai-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          background-color: rgba(17, 24, 39, 0.6);
          border: 1px dashed rgba(75, 85, 99, 0.5);
          border-radius: 0.5rem;
          text-align: center;
          max-width: 24rem;
          margin: 0 auto;
        }
        .empty-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background-color: rgba(37, 99, 235, 0.1);
          color: #93c5fd;
          border-radius: 50%;
          margin-bottom: 1rem;
        }
        .reset-btn {
          padding: 0.5rem 1rem;
          background-color: rgba(37, 99, 235, 0.2);
          color: white;
          border-radius: 0.25rem;
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.2s;
        }
        .reset-btn:hover {
          background-color: rgba(37, 99, 235, 0.3);
          border-color: rgba(59, 130, 246, 0.5);
        }
        
        /* AI-themed Modal */
        .ai-modal {
          width: 100%;
          max-width: 48rem;
          max-height: 85vh;
          background-color: rgba(17, 24, 39, 0.95);
          border-radius: 0.75rem;
          border: 1px solid rgba(55, 65, 81, 0.5);
          overflow: hidden;
          position: relative;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
        }
        .modal-design-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .design-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }
        .design-circle.left-top {
          width: 300px;
          height: 300px;
          top: -150px;
          left: -150px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%);
        }
        .design-circle.right-bottom {
          width: 250px;
          height: 250px;
          bottom: -125px;
          right: -125px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%);
        }
        .design-line {
          position: absolute;
          top: 0;
          left: 30%;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.3), transparent);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.25rem;
          border-bottom: 1px solid rgba(55, 65, 81, 0.5);
        }
        .header-left {
          display: flex;
          flex-direction: column;
        }
        .modal-id {
          font-size: 0.625rem;
          color: #6b7280;
          font-family: monospace;
          margin-bottom: 0.25rem;
        }
        .modal-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
        }
        .modal-company {
          font-size: 0.75rem;
          color: #3b82f6;
        }
        .modal-close {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(55, 65, 81, 0.5);
          color: #9ca3af;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .modal-close:hover {
          background-color: rgba(220, 38, 38, 0.3);
          color: white;
        }
        .modal-content {
          padding: 1.25rem;
          flex: 1;
          overflow-y: auto;
        }
        .modal-section {
          margin-bottom: 1.25rem;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #93c5fd;
          margin-bottom: 0.75rem;
          letter-spacing: 0.025em;
        }
        .section-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background-color: rgba(37, 99, 235, 0.2);
          border-radius: 4px;
        }
        .section-text {
          font-size: 0.875rem;
          color: #e5e7eb;
          line-height: 1.6;
        }
        .modal-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .modal-list li {
          display: flex;
          align-items: flex-start;
          font-size: 0.875rem;
          color: #e5e7eb;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .list-bullet {
          width: 6px;
          height: 6px;
          background-color: #3b82f6;
          border-radius: 50%;
          margin-right: 0.75rem;
          margin-top: 0.45rem;
          flex-shrink: 0;
        }
        .modal-tech {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          background-color: rgba(139, 92, 246, 0.15);
          color: #c4b5fd;
          border-radius: 0.25rem;
          white-space: nowrap;
        }
        .modal-footer {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          border-top: 1px solid rgba(55, 65, 81, 0.5);
          background-color: rgba(17, 24, 39, 0.8);
        }
        .modal-nav-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: #9ca3af;
          padding: 0.375rem 0.75rem;
          border-radius: 0.25rem;
          transition: all 0.2s;
        }
        .modal-nav-btn:hover {
          background-color: rgba(55, 65, 81, 0.5);
          color: white;
        }
      `}</style>
    </section>
  );
};

export default Projects;
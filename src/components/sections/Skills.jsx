import React, { useState, useEffect, useRef } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);

  // Skill categories - consolidated with better organization
  const skillCategories = [
    {
      id: 'programming',
      title: 'Programming',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      color: '#3b82f6',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'C++', level: 85 }
      ]
    },
    {
      id: 'ai-agents',
      title: 'AI Agents',
      icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.582 2.13l1.89.68a2.25 2.25 0 011.628 2.165c0 1.137-.84 2.098-1.958 2.192a48.424 48.424 0 01-12.884 0c-1.119-.094-1.958-1.055-1.958-2.192a2.25 2.25 0 011.628-2.165l1.89-.68a2.25 2.25 0 001.582-2.13V3.104M9 14.5h6m-3-3L9 14.5m0 0L3 14.5M9 14.5l3-3',
      color: '#8b5cf6',
      skills: [
        { name: 'Multi-Agent Orchestration', level: 92 },
        { name: 'Agent Evaluations', level: 90 },
        { name: 'Tool-Augmented Agents', level: 88 }
      ]
    },
    {
      id: 'llms',
      title: 'LLMs',
      icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25',
      color: '#ec4899',
      skills: [
        { name: 'Retrieval Augmented Generation', level: 95 },
        { name: 'LLM Fine-tuning (Lora, Peft)', level: 90 },
        { name: 'LLM Optimization (MLC, Lorax)', level: 85 },
        { name: 'Responsible AI', level: 88 },
        { name: 'Prompt Engineering', level: 95 },
        { name: 'Vision LLMs', level: 82 }
      ]
    },
    {
      id: 'voice',
      title: 'Voice',
      icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z',
      color: '#10b981',
      skills: [
        { name: 'Automatic Speech Recognition', level: 88 },
        { name: 'Text-to-Speech', level: 85 },
        { name: 'Language Models', level: 92 }
      ]
    },
    {
      id: 'general',
      title: 'General',
      icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
      color: '#f59e0b',
      skills: [
        { name: 'Transformers', level: 90 },
        { name: 'Classical ML', level: 85 },
        { name: 'Deep Learning & NLP', level: 92 },
        { name: 'Operating Systems', level: 80 },
        { name: 'OOPs', level: 85 },
        { name: 'ML System Design', level: 90 }
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z',
      color: '#06b6d4',
      skills: [
        { name: 'CI/CD Pipelines', level: 85 },
        { name: 'Kubernetes', level: 80 },
        { name: 'FastAPI', level: 90 },
        { name: 'Docker', level: 85 },
        { name: 'Amazon Web Services (AWS)', level: 88 },
        { name: 'Google Cloud Platform (GCP)', level: 82 }
      ]
    }
  ];

  // Generate all skills array
  const allSkills = skillCategories.flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      categoryId: category.id,
      categoryColor: category.color
    }))
  );

  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.categoryId === activeCategory);

  // Neural network animation - optimized with memoization and reduced calculations
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size - optimized to reduce reflows
    const setCanvasSize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();
    
    // Throttle resize handler for better performance
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 100);
    };
    
    window.addEventListener('resize', handleResize);

    // Generate nodes - optimized to reduce calculations
    const generateNodes = () => {
      const nodes = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.7;

      filteredSkills.forEach((skill, index) => {
        const angle = (index / filteredSkills.length) * Math.PI * 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        nodes.push({
          id: skill.name,
          x, y,
          targetX: x,
          targetY: y,
          radius: 4 + (skill.level / 20), // Reduced size for better performance
          color: skill.categoryColor,
          isHovered: skill.name === hoveredSkill,
          categoryId: skill.categoryId
        });
      });

      // Add central hub node
      nodes.push({
        id: 'hub',
        x: centerX,
        y: centerY,
        targetX: centerX,
        targetY: centerY,
        radius: 12,
        color: '#f0f0f0',
        isHovered: false,
        isPulsing: true
      });

      return nodes;
    };

    // Generate connections - optimized to create fewer connections
    const generateConnections = (nodes) => {
      const connections = [];
      const hubNode = nodes.find(n => n.id === 'hub');
      
      if (!hubNode) return connections;

      // Connect all nodes to hub
      nodes.forEach(node => {
        if (node.id !== 'hub') {
          connections.push({
            source: hubNode,
            target: node,
            isActive: node.isHovered || node.categoryId === activeCategory || activeCategory === 'all'
          });
        }
      });

      // Connect nodes of same category - only connect to nearest neighbors to reduce total connections
      const nodesByCategory = {};
      nodes.forEach(node => {
        if (node.id !== 'hub') {
          if (!nodesByCategory[node.categoryId]) nodesByCategory[node.categoryId] = [];
          nodesByCategory[node.categoryId].push(node);
        }
      });
      
      Object.values(nodesByCategory).forEach(categoryNodes => {
        if (categoryNodes.length < 2) return;
        
        // Connect each node to at most 2 other nodes in the same category
        categoryNodes.forEach((node, index) => {
          const nextNode = categoryNodes[(index + 1) % categoryNodes.length];
          connections.push({
            source: node,
            target: nextNode,
            isActive: node.isHovered || nextNode.isHovered || node.categoryId === activeCategory || activeCategory === 'all'
          });
        });
      });

      return connections;
    };

    // Draw network - optimized rendering
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Batch similar operations for better performance
      // Draw connections
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      
      connectionsRef.current.forEach(connection => {
        if (!connection.isActive) return;
        
        ctx.beginPath();
        ctx.moveTo(connection.source.x, connection.source.y);
        ctx.lineTo(connection.target.x, connection.target.y);
        ctx.stroke();
      });
      
      // Draw highlighted connections
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      
      connectionsRef.current.forEach(connection => {
        if (!connection.isActive || !(connection.target.isHovered || connection.source.isHovered)) return;
        
        ctx.beginPath();
        ctx.moveTo(connection.source.x, connection.source.y);
        ctx.lineTo(connection.target.x, connection.target.y);
        ctx.stroke();
      });

      // Draw nodes - standard nodes first
      nodesRef.current.forEach(node => {
        if (node.isHovered || node.isPulsing) return; // Skip special nodes, draw them later
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });
      
      // Draw special nodes (hovered or pulsing) with effects
      nodesRef.current.forEach(node => {
        if (!node.isHovered && !node.isPulsing) return;
        
        const pulseSize = node.isPulsing 
          ? 3 + Math.sin(Date.now() * 0.003) 
          : 5;
          
        // Glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulseSize, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          node.x, node.y, node.radius - 1,
          node.x, node.y, node.radius + pulseSize
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Actual node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.isHovered ? '#ffffff' : node.color;
        ctx.fill();
      });
    };

    // Optimized animation loop with reduced movement
    const animate = () => {
      // Apply subtle movement to nodes
      nodesRef.current.forEach(node => {
        // Only move by small amounts to improve performance
        const moveX = (Math.random() - 0.5) * 0.3;
        const moveY = (Math.random() - 0.5) * 0.3;
        
        // Ensure nodes don't drift too far from target
        if (Math.abs(node.x - node.targetX) > 5 || Math.abs(node.y - node.targetY) > 5) {
          node.x += (node.targetX - node.x) * 0.05;
          node.y += (node.targetY - node.y) * 0.05;
        } else {
          node.x += moveX;
          node.y += moveY;
        }
      });

      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    nodesRef.current = generateNodes();
    connectionsRef.current = generateConnections(nodesRef.current);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [filteredSkills, activeCategory, hoveredSkill]);

  return (
    <section id="skills" className="relative py-12 bg-gray-900 overflow-hidden">
      {/* Neural network background */}
      <div ref={containerRef} className="absolute inset-0 opacity-20">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      
      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4">
        {/* Section header - streamlined with reduced vertical space */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
            Skills & Expertise
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto my-3"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Comprehensive toolkit of technical capabilities developed over years of AI engineering
          </p>
        </div>

        {/* Category Navigation - compact, horizontally scrollable on mobile */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 hide-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
              style={{ '--color': '#6366f1' }}
            >
              All Skills
            </button>

            {skillCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                style={{ '--color': category.color }}
              >
                <svg className="w-3.5 h-3.5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                </svg>
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid - support for up to 4 columns on larger screens */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {filteredSkills.map((skill) => {
            const category = skillCategories.find(cat => cat.id === skill.categoryId);
            
            return (
              <div 
                key={skill.name}
                className="skill-card"
                style={{ '--accent-color': skill.categoryColor }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-semibold text-white">{skill.name}</h3>
                  <div className="skill-tag" style={{ color: category.color }}>
                    <svg className="w-3 h-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                    </svg>
                    <span className="text-xs">{category.title}</span>
                  </div>
                </div>
                
                <div className="skill-bar-container">
                  <div 
                    className="skill-bar" 
                    style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${skill.categoryColor}, ${skill.categoryColor}80)` }}
                  ></div>
                  <span className="skill-percentage" style={{ color: skill.categoryColor }}>{skill.level}%</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Category Details - Shown only when a specific category is selected */}
        {activeCategory !== 'all' && (
          <div className="mt-8 bg-gray-800/60 backdrop-blur-sm rounded-lg p-5 border border-gray-700 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-2 text-white flex items-center">
              <svg className="w-5 h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: skillCategories.find(c => c.id === activeCategory)?.color }}>
                <path strokeLinecap="round" strokeLinejoin="round" d={skillCategories.find(c => c.id === activeCategory)?.icon} />
              </svg>
              {skillCategories.find(c => c.id === activeCategory)?.title} Expertise
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              {activeCategory === 'programming' && "Proficient in multiple programming languages with a focus on performance optimization and clean code architecture."}
              {activeCategory === 'ai-agents' && "Specialized in developing and orchestrating AI agents that can work together to solve complex problems and automate intricate workflows."}
              {activeCategory === 'llms' && "Expert in large language model implementations, from fine-tuning for specialized tasks to deploying optimized models in production environments."}
              {activeCategory === 'voice' && "Developed advanced voice technologies that enable seamless human-computer interaction through natural language processing."}
              {activeCategory === 'general' && "Strong foundation in theoretical and practical aspects of machine learning and AI systems design."}
              {activeCategory === 'infrastructure' && "Experienced in building robust, scalable infrastructure for deploying and managing AI systems in cloud environments."}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skillCategories.find(c => c.id === activeCategory)?.skills.map(skill => (
                <span 
                  key={skill.name} 
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{ 
                    backgroundColor: `${skillCategories.find(c => c.id === activeCategory)?.color}20`,
                    color: skillCategories.find(c => c.id === activeCategory)?.color
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Streamlined CSS */}
      <style jsx>{`
        /* Hide scrollbar but allow scrolling */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Category buttons */
        .category-btn {
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          color: #e5e7eb;
          background-color: rgba(31, 41, 55, 0.5);
          border: 1px solid rgba(75, 85, 99, 0.3);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        
        .category-btn:hover {
          background-color: rgba(55, 65, 81, 0.5);
          border-color: rgba(75, 85, 99, 0.5);
        }
        
        .category-btn.active {
          background-color: var(--color);
          border-color: var(--color);
          color: white;
          box-shadow: 0 0 10px var(--color);
        }
        
        /* Skill cards */
        .skill-card {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 0.5rem;
          padding: 0.75rem;
          border: 1px solid rgba(75, 85, 99, 0.3);
          position: relative;
          overflow: hidden;
          transition: all 0.2s ease;
        }
        
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: var(--accent-color);
          transition: all 0.2s ease;
        }
        
        .skill-card:hover {
          border-color: var(--accent-color);
          transform: translateY(-2px);
        }
        
        .skill-card:hover::before {
          width: 5px;
        }
        
        /* Skill tag */
        .skill-tag {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.125rem 0.375rem;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 1rem;
        }
        
        /* Skill bar */
        .skill-bar-container {
          height: 6px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }
        
        .skill-bar {
          height: 100%;
          border-radius: 3px;
          transition: width 0.8s ease-out;
        }
        
        .skill-percentage {
          position: absolute;
          right: 0;
          top: -1.25rem;
          font-size: 0.75rem;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
};

export default Skills;
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, ExternalLink, Filter, ArrowRight, Home, Search, Calendar, Clock, Award, Bookmark, ChevronRight, X } from 'lucide-react';

const KnowledgeSharing = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const canvasRef = useRef(null);
  
  // Combined data for all items
  const items = [
    // Publication
    {
      id: 1,
      type: 'publication',
      title: "Advancing Educational Insights: Explainable AI Models for Informed Decision Making",
      source: "International Journal of Research in Applied Science & Engineering Technology",
      date: "2023",
      description: "This research explores how explainable AI models can enhance educational decision-making processes by providing transparent insights and interpretable outcomes.",
      link: "https://www.ijraset.com/best-journal/advancing-educational-insights-explainable-ai-models-for-informed-decision-making",
      image: "/citations/paper1.png",
      tags: ["Explainable AI", "Education", "Decision Making"]
    },
    // Blogs
    {
      id: 2,
      type: 'blog',
      title: "Encoding vs Embedding Models: Both Output Numbers, Different Stories",
      source: "Medium",
      date: "Jan 15, 2025",
      description: "An in-depth exploration of the fundamental differences between encoding and embedding models in AI, clarifying how these seemingly similar processes serve vastly different purposes.",
      link: "https://medium.com/@karamvirhapal/encoding-vs-embedding-models-both-output-numbers-different-stories-5c85eced1801",
      image: "/citations/medium1.png",
      readTime: "8 min read",
      tags: ["AI", "Machine Learning", "NLP"]
    },
    {
      id: 3,
      type: 'blog',
      title: "Langflow vs LangGraph: A Comprehensive Guide to AI Application Development",
      source: "Medium",
      date: "Nov 20, 2024",
      description: "A detailed comparison between Langflow and LangGraph, two powerful frameworks for developing AI applications, highlighting their strengths, weaknesses, and ideal use cases.",
      link: "https://medium.com/@karamvirhapal/langflow-vs-langgraph-a-comprehensive-guide-to-ai-application-development-aca306bb5c31",
      image: "/citations/medium2.png",
      readTime: "10 min read",
      tags: ["Langflow", "LangGraph", "AI Development"]
    },
    // Courses
    {
      id: 4,
      type: 'course',
      title: "Deep Learning Specialization",
      source: "Coursera",
      instructor: "Andrew Ng",
      date: "2022",
      description: "Comprehensive specialization covering neural networks, deep learning, structuring ML projects, CNNs, and sequence models.",
      link: "https://www.coursera.org/account/accomplishments/specialization/certificate/FDDJVR77JGD7",
      image: "/citations/coursera.png",
      tags: ["Neural Networks", "Deep Learning", "CNN", "RNN", "TensorFlow"]
    },
    {
      id: 5,
      type: 'course',
      title: "Problem Solving Certificate",
      source: "HackerRank",
      date: "2020",
      description: "Certificate validating intermediate-level problem-solving skills in algorithms, data structures, and computational thinking.",
      link: "https://www.hackerrank.com/certificates/7f86be3fe508",
      image: "/citations/hackerrank.png",
      tags: ["Algorithms", "Data Structures", "Problem Solving"]
    },
    {
      id: 6,
      type: 'course',
      title: "Machine Learning A-Z",
      source: "Udemy",
      instructor: "Kirill Eremenko & Hadelin de Ponteves",
      date: "2019",
      description: "Comprehensive course covering all aspects of machine learning including regression, classification, clustering, and reinforcement learning.",
      link: "https://www.udemy.com/certificate/UC-L5MS4F1J/",
      image: "/citations/udemy.png",
      tags: ["Machine Learning", "Regression", "Classification", "Python"]
    }
  ];

  // Filter and search items
  const filteredItems = items
    .filter(item => filter === 'all' || item.type === filter)
    .filter(item => 
      searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  
  // Type-specific styling
  const getTypeStyles = (type) => {
    switch(type) {
      case 'publication':
        return {
          color: '#3b82f6',
          icon: <BookOpen className="w-5 h-5" />,
          bgPattern: 'radial-gradient(circle, #3b82f620 1px, transparent 1px)',
          label: 'Publication'
        };
      case 'blog':
        return {
          color: '#8b5cf6',
          icon: <Bookmark className="w-5 h-5" />,
          bgPattern: 'linear-gradient(45deg, #8b5cf610 25%, transparent 25%, transparent 50%, #8b5cf610 50%, #8b5cf610 75%, transparent 75%, transparent)',
          label: 'Blog Post'
        };
      case 'course':
        return {
          color: '#10b981',
          icon: <Award className="w-5 h-5" />,
          bgPattern: 'linear-gradient(90deg, #10b98110 1px, transparent 1px), linear-gradient(0deg, #10b98110 1px, transparent 1px)',
          label: 'Certificate'
        };
      default:
        return {
          color: '#9ca3af',
          icon: <Bookmark className="w-5 h-5" />,
          bgPattern: 'none',
          label: 'Resource'
        };
    }
  };
  
  // Draw connections animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Animation variables
    const particles = [];
    const particleCount = 100;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 0.5,
        color: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#10b981',
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      });
      
      // Draw connections
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.3;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(draw);
    };
    
    const animFrame = requestAnimationFrame(draw);
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section id="publications" className="py-12 bg-gray-900 relative overflow-hidden">
      {/* Animated neural network background */}
      <div className="absolute inset-0 opacity-30">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/90"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Compact header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
            Knowledge Base
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-2"></div>
        </div>

        {/* Filter & Search */}
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-800">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {['all', 'publication', 'blog', 'course'].map((type) => {
              const isActive = filter === type;
              const styles = type !== 'all' ? getTypeStyles(type) : {
                color: '#6366f1',
                icon: <Filter className="w-5 h-5" />,
                label: 'All'
              };
              
              return (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`filter-btn ${isActive ? 'active' : ''}`}
                  style={{ '--color': styles.color }}
                >
                  <div className="filter-icon" style={{ backgroundColor: `${styles.color}20` }}>
                    {styles.icon}
                  </div>
                  <span>{styles.label}</span>
                </button>
              );
            })}
          </div>
          
          {showSearch ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 pl-9 pr-9 py-2 rounded-full bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-300"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <button
                onClick={() => {
                  setSearchTerm('');
                  setShowSearch(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-gray-800"
            >
              <Search className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Visual card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const styles = getTypeStyles(item.type);
            const isSelected = selectedItem === item.id;
            
            return (
              <div
                key={item.id}
                className={`knowledge-card group ${isSelected ? 'selected' : ''}`}
                style={{ '--card-color': styles.color }}
                onClick={() => setSelectedItem(isSelected ? null : item.id)}
              >
                {/* Card top with image and overlay */}
                <div className="card-image-container">
                  <div className="card-image-overlay" style={{ backgroundColor: styles.color }}></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/400x200?text=${item.type}`;
                    }}
                  />
                  
                  {/* Type indicator */}
                  <div className="card-badge" style={{ backgroundColor: styles.color }}>
                    {styles.icon}
                    <span className="card-badge-text">{styles.label}</span>
                  </div>
                </div>
                
                {/* Card content */}
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  
                  <div className="card-meta">
                    <span>{item.source}</span>
                    <span className="meta-divider">•</span>
                    <span>{item.date}</span>
                    {item.readTime && (
                      <>
                        <span className="meta-divider">•</span>
                        <span>{item.readTime}</span>
                      </>
                    )}
                  </div>
                  
                  {/* Description - only shown when selected */}
                  <div className={`card-description ${isSelected ? 'expanded' : ''}`}>
                    <p>{item.description}</p>
                    
                    {/* Tags */}
                    <div className="card-tags">
                      {item.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="card-tag"
                          style={{ 
                            backgroundColor: `${styles.color}15`,
                            color: styles.color,
                            borderColor: `${styles.color}30`
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* View button */}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-button"
                      onClick={(e) => e.stopPropagation()}
                      style={{ 
                        backgroundColor: styles.color,
                        boxShadow: `0 4px 14px ${styles.color}40`
                      }}
                    >
                      <span>View {item.type}</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                
                {/* Expand indicator */}
                <div className="card-expand-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3>No results found</h3>
            <p>Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
                setShowSearch(false);
              }}
            >
              Reset filters
            </button>
          </div>
        )}
        
        {/* View more link */}
        <div className="text-center mt-8">
          <a
            href="https://medium.com/@karamvirhapal"
            target="_blank"
            rel="noopener noreferrer"
            className="view-more-link"
          >
            <span>View more on Medium</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Filter buttons */
        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 12px;
          background-color: rgba(31, 41, 55, 0.4);
          color: #e5e7eb;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .filter-btn::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--color);
          transition: width 0.3s ease;
        }
        
        .filter-btn:hover::after {
          width: 100%;
        }
        
        .filter-btn.active {
          background-color: rgba(var(--color), 0.1);
          color: white;
        }
        
        .filter-btn.active::after {
          width: 100%;
        }
        
        .filter-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          color: var(--color);
        }
        
        /* Knowledge cards */
        .knowledge-card {
          position: relative;
          border-radius: 16px;
          background-color: rgba(31, 41, 55, 0.6);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          cursor: pointer;
          border: 1px solid rgba(75, 85, 99, 0.3);
          height: 260px;
        }
        
        .knowledge-card.selected {
          height: 480px;
          border-color: var(--card-color);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 15px rgba(var(--card-color), 0.1);
        }
        
        .knowledge-card:hover {
          transform: translateY(-5px);
          border-color: var(--card-color);
        }
        
        .card-image-container {
          position: relative;
          height: 140px;
          overflow: hidden;
        }
        
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .knowledge-card:hover .card-image {
          transform: scale(1.05);
        }
        
        .card-image-overlay {
          position: absolute;
          inset: 0;
          background-color: var(--card-color);
          opacity: 0.2;
          transition: opacity 0.3s ease;
        }
        
        .knowledge-card:hover .card-image-overlay {
          opacity: 0.3;
        }
        
        .card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 12px;
          color: white;
          font-weight: 500;
          font-size: 14px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .card-badge-text {
          display: none;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        
        .knowledge-card:hover .card-badge-text {
          display: inline;
          opacity: 1;
          transform: translateX(0);
        }
        
        .card-content {
          padding: 16px;
        }
        
        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
          transition: color 0.3s ease;
        }
        
        .knowledge-card:hover .card-title {
          color: var(--card-color);
        }
        
        .card-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          font-size: 12px;
          color: #9ca3af;
        }
        
        .meta-divider {
          color: #4b5563;
        }
        
        .card-description {
          margin-top: 16px;
          height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        
        .card-description.expanded {
          height: auto;
          opacity: 1;
        }
        
        .card-description p {
          font-size: 14px;
          color: #d1d5db;
          margin-bottom: 16px;
          line-height: 1.6;
        }
        
        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        
        .card-tag {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid;
        }
        
        .card-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .card-button:hover {
          transform: translateY(-2px);
        }
        
        .card-expand-icon {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%) rotate(0deg);
          color: #9ca3af;
          transition: all 0.3s ease;
        }
        
        .knowledge-card.selected .card-expand-icon {
          transform: translateX(-50%) rotate(180deg);
        }
        
        /* Empty state */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px;
          text-align: center;
          background-color: rgba(31, 41, 55, 0.4);
          border-radius: 16px;
          border: 1px dashed rgba(75, 85, 99, 0.5);
        }
        
        .empty-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background-color: rgba(55, 65, 81, 0.5);
          border-radius: 50%;
          margin-bottom: 16px;
        }
        
        .empty-state h3 {
          font-size: 18px;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
        }
        
        .empty-state p {
          color: #9ca3af;
          margin-bottom: 20px;
        }
        
        .empty-state button {
          padding: 8px 16px;
          border-radius: 8px;
          background-color: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }
        
        .empty-state button:hover {
          background-color: rgba(59, 130, 246, 0.3);
        }
        
        /* View more link */
        .view-more-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
          border-radius: 8px;
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }
        
        .view-more-link:hover {
          background-color: rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};

export default KnowledgeSharing;
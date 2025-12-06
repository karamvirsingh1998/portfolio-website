import React, { useState, useEffect, useRef } from 'react';
import { Home, Linkedin, ExternalLink, X, Zap, Briefcase, Award, MessageCircle } from 'lucide-react';

const Citations = () => {
  // This variable controls the quote styling - ADDED
  const quoteStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    fontFamily: '"Georgia", serif', // More elegant font for quotes
    color: '#f0f0ff', // Slightly blue-tinted white
    fontStyle: 'italic',
    textShadow: '0 1px 2px rgba(0,0,0,0.2)' // Subtle shadow for better readability
  };
  // States
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [filterTag, setFilterTag] = useState('all');
  const [isQuoteAnimating, setIsQuoteAnimating] = useState(false);
  const quoteRef = useRef(null);
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  // Enhanced citation data with additional metadata and alternative images
  const citations = [
    {
      id: 1,
      image: '/citations/pavitar.png',
      altImage: '/citations/alt/pavitar-alt.png', // Alternative image for icon
      name: 'Pavitar Singh',
      role: 'Founder and CEO (Unifyapps) , Ex-CTO (Sprinklr)',
      linkedIn: 'http://linkedin.com/in/pavitar/',
      company: 'Unifyapps',
      previousCompany: 'Sprinklr',
      tags: ['leadership', 'ai-strategy', 'engineering'],
      highlightQuote: "I had worked with Karamvir during his tenure as Lead AI Engineer at UnifyApps. While I didn't manage Karamvir directly, I witnessed how he played a key role in driving forward our AI initiatives and turning strategic ideas into tangible results. His ability to understand and execute the company's broader vision was invaluable.Karamvir demonstrated exceptional technical expertise and a talent for solving complex problems. He was instrumental in developing innovative AI solutions that aligned seamlessly with our business goals. His dedication, collaborative spirit, and proactive approach made him a critical part of our success, helping to push the boundaries of what we could achieve with AI.I have no doubt that Karamvir will continue to thrive and deliver impactful results in any future endeavor. He would be a tremendous asset to any team",
      relationship: "CEO"
    },
    {
      id: 2,
      image: '/citations/yogin.png',
      altImage: '/citations/alt/yogin-alt.png',
      name: 'Yogin Patel',
      role: 'Head of AI (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/yogin-patel-4ba55321/',
      company: 'Sprinklr',
      tags: ['ai-research', 'leadership', 'nlp'],
      highlightQuote: "I am delighted to recommend Karamvir, a standout member of our team whose leadership and ownership are evident in every facet of our operations. Karamvir's commitment to excellence is showcased in his pivotal role in developing Voice AI models, a key project that has significantly advanced our technological capabilities. His ability to lead this complex initiative demonstrates his deep technical expertise.Karamvir is inherently involved in all our projects, directly or indirectly. Either influencing outcomes with his leadership and expertise, or his approachability further amplifies his impact, as team members from various projects consistently seek his advice, trusting his guidance and benefiting from his insights. This unique blend of involvement and influence highlights his integral role in our success.Any organization would benefit immensely from Karamvir's dedication and leadership. He is not just a participant in projects but a driving force behind them, ensuring that each one not only reaches but surpasses our goals. Karamvir's contributions have not only propelled our projects to new heights but have also set a standard of excellence within our team.",
      relationship: "Manager"
    },
    {
      id: 3,
      image: '/citations/sachin.png',
      altImage: '/citations/alt/sachin-alt.png',
      name: 'Sachin Bhardwaj',
      role: 'Head of AI (UnifyApps)',
      linkedIn: 'https://www.linkedin.com/in/sachin-bharadwaj-3518881/',
      company: 'UnifyApps',
      tags: ['ai-agents', 'leadership', 'innovation'],
      highlightQuote: "Karamvir is an exceptional talent. He has always surprised me and surpassed my expectations. He thrives on challenges which brings the best out of him. A complete team player and true engineer at heart. He has unique ability to quickly come up with prototype and then meticulously plan the complete development. As is always the case with talented people, change is inevitable. I hope we again develop something together in near future. Wishing you all the best!!",
      relationship: "Manager"
    },
    {
      id: 4,
      image: '/citations/aayush.png',
      altImage: '/citations/alt/aayush-alt.png',
      name: 'Aayush Kubba',
      role: 'Senior Director Data Science (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/aayushkubba/',
      company: 'Sprinklr',
      tags: ['data-science', 'machine-learning', 'mentorship'],
      highlightQuote: "Karamvir was a great asset to our team. One thing i adore about him was his ability to quickly experiment and iterate to solve business use-cases",
      relationship: "Manager"
    },
    {
      id: 5,
      image: '/citations/eli.png',
      altImage: '/citations/alt/eli-alt.png',
      name: 'Elisabetta Carta',
      role: 'Senior Product Manager AI (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/elisabetta-carta/',
      company: 'Sprinklr',
      tags: ['product', 'ai-strategy', 'user-experience'],
      highlightQuote: "I have had the pleasure of working closely with Karamvir for 3 years on multiple CCaaS speech tech projects across 5 international languages for our global customers. Karamvir is one of the most meticulous and punctual Engineers I've ever collaborated with. His in-depth technical expertise, his dedication and his polite and enjoyable personality make him a great asset.",
      relationship: "Colleague"
    },
    {
      id: 6,
      image: '/citations/navaneshwar.png',
      altImage: '/citations/alt/navaneshwar-alt.png',
      name: 'Navaneshwar Reddy',
      role: 'Director of Engineering (UnifyApps)',
      linkedIn: 'https://www.linkedin.com/in/navaneshwar-reddy/',
      company: 'UnifyApps',
      tags: ['engineering', 'architecture', 'leadership'],
      highlightQuote: "I've had the pleasure of working closely with karamvir and I can confidently say that he is an exceptional AI Engineer. He has a solid understanding of AI concepts and consistently demonstrates an eagerness to explore new ideas and technologies. What sets him apart is his problem-solving mindset. No challenge is too big; he approaches every task with a determined and analytical attitude, often uncovering creative and efficient solutions. Beyond technical skills, he is hardworking, curious, and always willing to learn.I have no doubt that he will continue to excel in any role that demands innovation, dedication, and expertise in AI.",
      relationship: "Colleague"
    },
    {
      id: 7,
      image: '/citations/akshat.png',
      altImage: '/citations/alt/akshat-alt.png',
      name: 'Akshat Goyal',
      role: 'Director of Product Management (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/goyalakshat28/',
      company: 'Sprinklr',
      tags: ['product', 'strategy', 'innovation'],
      highlightQuote: "Karamvir have been a very important member of our Voice AI team at Sprinklr. Me and my team have worked with Karamvir on some of the complex & toughest client asks and I can confidently say that his dedication towards client commitments & delight is unmatched.",
      relationship: "Colleague"
    },
    {
      id: 8,
      image: '/citations/krit.png',
      altImage: '/citations/alt/krit-alt.png',
      name: 'Krit Patel',
      role: 'Associate Director of Engineering (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/krit-patel-061731171/',
      company: 'Sprinklr',
      tags: ['engineering', 'mentorship', 'technical-leadership'],
      highlightQuote: "I had the pleasure of working closely with karamvir in the Voice AI team, where he was one of the first members. karamvir is incredibly hardworking, always bringing innovative ideas to the table to tackle problems head-on. He's a supportive team player,ready to jump into any project and lend a hand. His dedication and problem-solving mentality make him a valuable asset to any team.",
      relationship: "Colleague"
    },
    {
      id: 9,
      image: '/citations/manoj.png',
      altImage: '/citations/alt/manoj-alt.png',
      name: 'Manoj Kumar',
      role: 'Head India Operations (Kryptoblocks)',
      linkedIn: 'https://www.linkedin.com/in/manoj-kumar-kayastha/',
      company: 'Kryptoblocks',
      tags: ['operations', 'leadership', 'strategy'],
      highlightQuote: "Karamvir Singh has worked for us as Intern at XpertReview software Solutions. He is very knowledgeable, articulate and pleasure to work with. He has very good understanding of the problem provided to him and take it forward for solution without much guidance. He has really an exceptional coding skill as well. It's my pleasure to recommend him for his future endeavor. ",
      relationship: "Colleague"
    }
  ];

  // Extract all unique tags for filtering
  const allTags = ['all', ...new Set(citations.flatMap(citation => citation.tags))];

  // Filter citations based on selected tag
  const filteredCitations = filterTag === 'all' 
    ? citations 
    : citations.filter(citation => citation.tags.includes(filterTag));

  // Functions for modal
  const openImageModal = (citation) => {
    setSelectedImage(citation);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Also set this citation as the active testimonial to show its quote
    handleSelectTestimonial(citation);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const handleModalClick = (e) => {
    if (e.target.id === 'imageModal') {
      closeImageModal();
    }
  };

  // Handle testimonial selection with animation
  const handleSelectTestimonial = (citation) => {
    if (isQuoteAnimating) return;
    
    setIsQuoteAnimating(true);
    
    // If already selected, don't deselect - just keep it
    if (activeTestimonial && activeTestimonial.id === citation.id) {
      setIsQuoteAnimating(false);
      return;
    }
    
    // Animate out current quote if there is one
    if (activeTestimonial) {
      setActiveTestimonial(null);
      setTimeout(() => {
        setActiveTestimonial(citation);
        setTimeout(() => {
          setIsQuoteAnimating(false);
        }, 200);
      }, 100);
    } else {
      // No current quote, just animate in
      setActiveTestimonial(citation);
      setTimeout(() => {
        setIsQuoteAnimating(false);
      }, 100);
    }
    
    // Scroll quote into view on mobile
    if (window.innerWidth < 768 && quoteRef.current) {
      setTimeout(() => {
        quoteRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  // Auto cycle through testimonials - enhanced to work without user intervention
  useEffect(() => {
    // Start auto-cycling immediately when component mounts
    if (!activeTestimonial && filteredCitations.length > 0) {
      const timer = setTimeout(() => {
        handleSelectTestimonial(filteredCitations[0]);
      }, 100); // Start first one quickly
      return () => clearTimeout(timer);
    }
    
    // Continue cycling through testimonials
    if (!isQuoteAnimating && filteredCitations.length > 1) {
      const timer = setTimeout(() => {
        const currentIndex = activeTestimonial 
          ? filteredCitations.findIndex(c => c.id === activeTestimonial.id)
          : -1;
        const nextIndex = (currentIndex + 1) % filteredCitations.length;
        handleSelectTestimonial(filteredCitations[nextIndex]);
      }, 8000); // Change testimonial every 8 seconds
      return () => clearTimeout(timer);
    }
  }, [activeTestimonial, filteredCitations, isQuoteAnimating]);

  // Reset active testimonial when filter changes
  useEffect(() => {
    setActiveTestimonial(null);
  }, [filterTag]);

  return (
    <section id="testimonials" className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background with subtle network pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDRjMCAyLjIxIDEuNzkgNCA0IDRzNC0xLjc5IDQtNHptMjAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0tNDAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0yMC0yMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0yMCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0YzAgMi4yMSAxLjc5IDQgNCA0czQtMS43OSA0LTR6bS00MCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0YzAgMi4yMSAxLjc5IDQgNCA0czQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header with animated gradient - REDUCED SIZE */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block mb-3 gradient-animate">
            Testimonials
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Endorsements from professionals who have experienced the impact of my work
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full glow-line"></div>
        </div>

        {/* Tag filters - MADE MORE COMPACT */}
        <div className="flex justify-center flex-wrap gap-1 mb-5 mt-1">
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                filterTag === tag 
                  ? 'bg-[#6366f1] text-white' 
                  : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tag === 'all' ? 'All' : tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Main content with quote and grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Animated quote section - INCREASED VERTICAL HEIGHT ONLY */}
          <div className="lg:col-span-1 order-2 lg:order-1" ref={quoteRef}>
            <div className="sticky top-20">
              <div className={`quote-container ${activeTestimonial ? 'has-quote' : ''}`}>
                {activeTestimonial && (
                  <div className="quote-content">
                    <div className="quote-mark top-mark">❝</div>
                    <p className="quote-text" style={quoteStyle}>{activeTestimonial.highlightQuote}</p>
                    <div className="quote-mark bottom-mark">❞</div>
                    
                    <div className="citation-details">
                      <div className="avatar-container">
                        <img 
                          src={activeTestimonial.altImage} 
                          alt={activeTestimonial.name}
                          className="avatar-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/60?text=Profile';
                          }}
                        />
                      </div>
                      
                      <div className="citation-text">
                        <h3 className="citation-name">{activeTestimonial.name}</h3>
                        <p className="citation-role">{activeTestimonial.role}</p>
                        
                        <div className="citation-company">
                          <span className="company-badge">{activeTestimonial.company}</span>
                          {activeTestimonial.previousCompany && (
                            <span className="prev-company-badge">Ex-{activeTestimonial.previousCompany}</span>
                          )}
                        </div>
                        
                        <a
                          href={activeTestimonial.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="linkedin-link"
                        >
                          <Linkedin size={12} className="mr-1" />
                          <span>View Profile</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                {!activeTestimonial && (
                  <div className="empty-quote">
                    <MessageCircle size={30} className="text-gray-600 mb-2" />
                    <p>Loading testimonials...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Image grid layout - KEPT ORIGINAL WIDTH */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {filteredCitations.map((citation) => (
                <div 
                  key={citation.id}
                  className={`testimonial-card ${activeTestimonial && activeTestimonial.id === citation.id ? 'active' : ''}`}
                  onClick={() => openImageModal(citation)}
                >
                  <div className="image-container">
                    <img
                      src={citation.image}
                      alt={`Testimonial from ${citation.name}`}
                      className="testimonial-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150?text=Profile';
                      }}
                    />
                    
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <div className="overlay-icon">
                          <MessageCircle size={16} />
                        </div>
                        <p className="overlay-text">View</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <h4 className="card-name">{citation.name}</h4>
                    <p className="card-role">{citation.company}</p>
                    
                    <div className="card-actions">
                      <a
                        href={citation.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="sr-only">LinkedIn Profile</span>
                        <Linkedin size={12} />
                      </a>
                    </div>
                  </div>
                  
                  {/* Relationship indicator - UPDATED TO USE ALTERNATIVE IMAGES */}
                  <div className="relationship-indicator">
                    <img 
                      src={citation.altImage} 
                      alt={`${citation.name} icon`} 
                      className="relationship-icon"
                      onError={(e) => {
                        e.target.onerror = null;
                        // Fallback to default indicators if alt image fails to load
                        if (citation.relationship === "Manager") {
                          e.target.outerHTML = '<span title="Manager">M</span>';
                        } else {
                          e.target.outerHTML = '<span title="Colleague">C</span>';
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Statistics section - MADE COMPACT */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="stat-card">
            <div className="stat-icon">
              <Award size={18} />
            </div>
            <div className="stat-value">{citations.length}</div>
            <div className="stat-label">Endorsements</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Briefcase size={18} />
            </div>
            <div className="stat-value">{[...new Set(citations.map(c => c.company))].length}</div>
            <div className="stat-label">Companies</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Zap size={18} />
            </div>
            <div className="stat-value">{allTags.length - 1}</div>
            <div className="stat-label">Skill Areas</div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal with quote - REDESIGNED TO MATCH SCREENSHOT */}
      {selectedImage && (
        <div
          id="imageModal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827] modal-container"
          onClick={handleModalClick}
        >
          <div className="relative max-w-6xl w-full h-full bg-[#111827] overflow-hidden modal-content flex flex-col">
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-20 bg-transparent p-2 text-white hover:text-gray-300 transition-colors duration-300"
              aria-label="Close"
            >
              <X size={28} />
            </button>

            {/* Header with name and role */}
            <div className="p-8 pb-4">
              <h2 className="text-3xl font-bold text-white mb-2">{selectedImage.name}</h2>
              <p className="text-gray-300 text-xl">{selectedImage.role}</p>
              
              {/* Company badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-[#1d2c4d] text-[#6b8acd] rounded-full text-sm">
                  {selectedImage.company}
                </span>
                {selectedImage.previousCompany && (
                  <span className="px-3 py-1 bg-[#2d204c] text-[#a989e7] rounded-full text-sm">
                    Ex-{selectedImage.previousCompany}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row px-8 py-4 flex-grow overflow-hidden">
              {/* Left side - LinkedIn post image (clickable to expand) */}
              <div className="w-full md:w-1/2 p-2 flex items-start">
                <div 
                  className="linkedin-post-container cursor-zoom-in"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle full-screen image view
                    const container = e.currentTarget;
                    container.classList.toggle('fullscreen');
                  }}
                >
                  <img
                    src={selectedImage.image}
                    alt={`Testimonial from ${selectedImage.name}`}
                    className="w-full h-auto rounded-lg shadow-lg border border-gray-700"
                  />
                </div>
              </div>
              
              {/* Right side - Quote text */}
              <div className="w-full md:w-1/2 p-2 flex flex-col">
                <div className="quote-modal-container bg-[#111827] rounded-lg overflow-hidden flex-grow">
                  <p 
                    className="text-xl text-white leading-relaxed p-6" 
                    style={{
                      fontFamily: '"Georgia", serif',
                      fontStyle: 'italic',
                      color: '#f0f0ff'
                    }}
                  >
                    {selectedImage.highlightQuote}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer with LinkedIn link and tags */}
            <div className="p-8 pt-4">
              <a
                href={selectedImage.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#70a5fd] hover:text-[#90b8fe] mb-6"
              >
                <Linkedin size={20} className="mr-2" />
                <span>View LinkedIn Profile</span>
              </a>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedImage.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm">
                    {tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for the modal */}
      <style jsx>{`
        /* Modal styling */
        .modal-container {
          animation: fadeIn 0.3s ease;
          overflow-y: auto;
        }
        
        .modal-content {
          animation: scaleIn 0.3s ease;
        }
        
        .linkedin-post-container {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .linkedin-post-container.fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 100;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .linkedin-post-container.fullscreen img {
          max-height: 90vh;
          max-width: 90vw;
          width: auto;
          height: auto;
          object-fit: contain;
        }
        
        .quote-modal-container {
          height: 100%;
          overflow-y: auto;
          border-left: 4px solid rgba(139, 92, 246, 0.3);
        }
        
        .quote-modal-container::-webkit-scrollbar {
          width: 5px;
        }
        
        .quote-modal-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .quote-modal-container::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 10px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @media (max-width: 768px) {
          .modal-content {
            flex-direction: column;
          }
        }
      `}</style>

      {/* Optimized CSS with reduced heights and paddings */}
      <style jsx>{`
        /* Animated gradient text */
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Glowing underline */
        .glow-line {
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 5px rgba(139, 92, 246, 0.5);
        }
        
        .glow-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          100% { left: 100%; }
        }
        
        /* Quote container */
        .quote-container {
          min-height: 400px; /* INCREASED vertical height only */
          background: rgba(17, 24, 39, 0.85); /* DARKER background to match screenshot */
          backdrop-filter: blur(8px);
          border-radius: 12px;
          border: 1px solid rgba(59, 130, 246, 0.1); /* Subtle blue border */
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s ease;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .quote-container.has-quote {
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 5px 15px rgba(139, 92, 246, 0.1);
        }
        
        .quote-content {
          position: relative;
          width: 100%;
          animation: fadeInUp 0.5s ease;
        }
        
        .empty-quote {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #94a3b8;
          font-style: italic;
          opacity: 0.7;
        }
        
        .quote-mark {
          font-size: 5rem; /* INCREASED size for more impact */
          line-height: 1;
          color: rgba(59, 130, 246, 0.15); /* Blue tint to match the theme */
          position: absolute;
          font-family: 'Georgia', serif;
        }
        
        .top-mark {
          top: -2.5rem;
          left: -1rem;
        }
        
        .bottom-mark {
          bottom: -4rem;
          right: -1rem;
        }
        
        .quote-text {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          text-align: left;
          max-height: 300px; /* INCREASED for more visible text */
          overflow-y: auto;
          padding-right: 0.5rem;
        }
        
        /* Custom scrollbar for quote text */
        .quote-text::-webkit-scrollbar {
          width: 4px;
        }
        
        .quote-text::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .quote-text::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        
        .quote-text::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
        
        /* Citation details */
        .citation-details {
          display: flex;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(59, 130, 246, 0.2); /* Blue-tinted border */
        }
        
        .avatar-container {
          width: 50px; /* REDUCED from 70px */
          height: 50px; /* REDUCED from 70px */
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(139, 92, 246, 0.5); /* REDUCED from 3px */
          flex-shrink: 0;
          margin-right: 0.75rem; /* REDUCED from 1rem */
        }
        
        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .citation-text {
          flex: 1;
        }
        
        .citation-name {
          font-size: 1rem; /* REDUCED from 1.1rem */
          font-weight: 600;
          color: white;
          margin-bottom: 0.15rem; /* REDUCED from 0.25rem */
        }
        
        .citation-role {
          font-size: 0.75rem; /* REDUCED from 0.85rem */
          color: #94a3b8;
          margin-bottom: 0.35rem; /* REDUCED from 0.5rem */
        }
        
        .citation-company {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem; /* REDUCED from 0.5rem */
          margin-bottom: 0.35rem; /* REDUCED from 0.5rem */
        }
        
        .company-badge {
          display: inline-block;
          padding: 0.1rem 0.4rem; /* REDUCED from 0.15rem 0.6rem */
          background: rgba(59, 130, 246, 0.2);
          color: #93c5fd;
          border-radius: 20px;
          font-size: 0.65rem; /* REDUCED from 0.75rem */
        }
        
        .prev-company-badge {
          display: inline-block;
          padding: 0.1rem 0.4rem; /* REDUCED from 0.15rem 0.6rem */
          background: rgba(139, 92, 246, 0.2);
          color: #c4b5fd;
          border-radius: 20px;
          font-size: 0.65rem; /* REDUCED from 0.75rem */
        }
        
        .linkedin-link {
          display: inline-flex;
          align-items: center;
          color: #60a5fa;
          font-size: 0.65rem; /* REDUCED from 0.75rem */
          transition: color 0.3s ease;
        }
        
        .linkedin-link:hover {
          color: #93c5fd;
          text-decoration: underline;
        }
        
        .tags-container {
          display: none; /* REMOVED to save space */
        }
        
        /* Testimonial cards in the grid */
        .testimonial-card {
          position: relative;
          background: rgba(30, 41, 59, 0.7);
          border-radius: 8px; /* REDUCED from 12px */
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid transparent; /* REDUCED from 2px */
        }
        
        .testimonial-card:hover {
          transform: translateY(-3px); /* REDUCED from -5px */
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* REDUCED shadow */
        }
        
        .testimonial-card.active {
          border-color: rgba(139, 92, 246, 0.7);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.3); /* REDUCED shadow */
        }
        
        .image-container {
          position: relative;
          height: 120px; /* REDUCED from 200px */
          overflow: hidden;
          background: #1f2937;
        }
        
        .testimonial-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.5s ease;
        }
        
        .testimonial-card:hover .testimonial-image {
          transform: scale(1.05);
        }
        
        .image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .testimonial-card:hover .image-overlay {
          opacity: 1;
        }
        
        .overlay-content {
          text-align: center;
          transform: translateY(10px);
          transition: transform 0.3s ease;
        }
        
        .testimonial-card:hover .overlay-content {
          transform: translateY(0);
        }
        
        .overlay-icon {
          background: rgba(139, 92, 246, 0.3);
          width: 30px; /* REDUCED from 40px */
          height: 30px; /* REDUCED from 40px */
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.35rem; /* REDUCED from 0.5rem */
          color: white;
        }
        
        .overlay-text {
          color: white;
          font-size: 0.75rem; /* REDUCED from 0.875rem */
        }
        
        .card-footer {
          padding: 0.5rem; /* REDUCED from 1rem */
        }
        
        .card-name {
          font-size: 0.85rem; /* REDUCED from 1rem */
          font-weight: 600;
          color: white;
          margin-bottom: 0.15rem; /* REDUCED from 0.25rem */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .card-role {
          font-size: 0.75rem; /* REDUCED from 0.875rem */
          color: #94a3b8;
          margin-bottom: 0.5rem; /* REDUCED from 0.75rem */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .card-actions {
          display: flex;
          justify-content: flex-end;
        }
        
        .view-full-btn,
        .linkedin-btn {
          width: 22px; /* REDUCED from 30px */
          height: 22px; /* REDUCED from 30px */
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .view-full-btn {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
        }
        
        .view-full-btn:hover {
          background: rgba(59, 130, 246, 0.4);
        }
        
        .linkedin-btn {
          background: rgba(10, 102, 194, 0.2);
          color: #0a66c2;
        }
        
        .linkedin-btn:hover {
          background: rgba(10, 102, 194, 0.4);
        }
        
        /* Relationship indicator - UPDATED for alternative images */
        .relationship-indicator {
          position: absolute;
          top: 5px; /* REDUCED from 10px */
          right: 5px; /* REDUCED from 10px */
          width: 24px; /* REDUCED from 32px */
          height: 24px; /* REDUCED from 32px */
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.5); /* REDUCED from 2px */
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3); /* REDUCED shadow */
          z-index: 10;
        }
        
        .relationship-icon {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .relationship-indicator span[title="Manager"] {
          background: rgba(239, 68, 68, 0.8);
          color: white;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.7rem; /* ADDED smaller font */
        }
        
        .relationship-indicator span[title="Colleague"] {
          background: rgba(59, 130, 246, 0.8);
          color: white;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.7rem; /* ADDED smaller font */
        }
        
        /* Statistics cards - REMOVED */
        .stat-card, .stat-icon, .stat-value, .stat-label {
          display: none;
        }
        
        /* Enhanced Modal Styling */
        .modal-container {
          animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
          animation: scaleIn 0.3s ease;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }
        
        .modal-image-container {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: rgba(17, 24, 39, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem; /* REDUCED from 1rem */
        }
        
        .modal-image-container img {
          max-width: 100%;
          max-height: 60vh; /* REDUCED from 70vh */
          object-fit: contain;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* REDUCED shadow */
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .modal-quote-container {
          background: rgba(17, 24, 39, 0.95);
          padding: 1.25rem; /* REDUCED from 2rem */
          overflow-y: auto;
          max-height: 60vh; /* REDUCED from 70vh */
        }
        
        .modal-quote-content {
          position: relative;
        }
        
        .modal-quote-name {
          font-size: 1.25rem; /* REDUCED from 1.5rem */
          font-weight: 700;
          color: white;
          margin-bottom: 0.35rem; /* REDUCED from 0.5rem */
        }
        
        .modal-quote-role {
          font-size: 0.9rem; /* REDUCED from 1rem */
          color: #94a3b8;
          margin-bottom: 0.75rem; /* REDUCED from 1rem */
        }
        
        .modal-quote-company {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem; /* REDUCED from 0.5rem */
          margin-bottom: 1rem; /* REDUCED from 1.5rem */
        }
        
        .modal-quote-text {
          position: relative;
          font-size: 0.95rem; /* REDUCED from 1.1rem */
          line-height: 1.6; /* REDUCED from 1.8 */
          color: white;
          background: rgba(30, 41, 59, 0.5);
          border-radius: 10px; /* REDUCED from 12px */
          padding: 1.5rem; /* REDUCED from 2rem */
          margin: 1.5rem 0; /* REDUCED from 2rem */
          font-style: italic;
          max-height: 200px; /* REDUCED from 300px */
          overflow-y: auto;
        }
        
        .modal-quote-footer {
          display: flex;
          flex-direction: column;
          gap: 0.75rem; /* REDUCED from 1rem */
          margin-top: 0.75rem; /* REDUCED from 1rem */
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1rem; /* REDUCED from 1.5rem */
        }
        
        .modal-linkedin-link {
          display: inline-flex;
          align-items: center;
          color: #60a5fa;
          font-size: 0.8rem; /* REDUCED from 0.9rem */
          padding: 0.35rem 0.75rem; /* REDUCED from 0.5rem 1rem */
          border-radius: 8px;
          background: rgba(59, 130, 246, 0.1);
          transition: all 0.3s ease;
          width: fit-content;
        }
        
        .modal-linkedin-link:hover {
          background: rgba(59, 130, 246, 0.2);
          color: #93c5fd;
        }
        
        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem; /* REDUCED from 0.5rem */
        }
        
        .modal-tag {
          padding: 0.2rem 0.6rem; /* REDUCED from 0.25rem 0.75rem */
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 20px;
          font-size: 0.7rem; /* REDUCED from 0.75rem */
          color: #c4b5fd;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .quote-container {
            min-height: 180px; /* REDUCED from 200px */
            margin-bottom: 1.5rem; /* REDUCED from 2rem */
          }
          
          .quote-text {
            font-size: 0.9rem; /* REDUCED from 1rem */
            max-height: 160px; /* LIMIT height for mobile */
          }
          
          .citation-details {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .avatar-container {
            margin-right: 0;
            margin-bottom: 0.75rem; /* REDUCED from 1rem */
          }
          
          .modal-content {
            grid-template-columns: 1fr;
          }
          
          .modal-image-container {
            max-height: 35vh; /* REDUCED from 40vh */
          }
          
          .modal-quote-container {
            max-height: 45vh; /* REDUCED from 50vh */
          }
        }
          `}</style>
    </section>
  );
};

export default Citations;
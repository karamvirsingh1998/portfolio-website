// src/App.jsx with direct scroll control and mobile warning
import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/layout/LoadingScreen';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import ResearchPapers from './components/sections/BloggingPublications';
import Interests from './components/sections/Interests';
import Citations from './components/sections/Citations';
import Ideas from './components/sections/Ideas';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    // Check if desktop mode was requested
    const desktopRequested = sessionStorage.getItem('forceDesktopMode') === 'true' || 
                            window.location.search.includes('desktop=1');
    
    // Set viewport for desktop mode if requested
    if (desktopRequested) {
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.content = 'width=1280';
      } else {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=1280';
        document.head.appendChild(meta);
      }
      
      // If the user has forced desktop mode, don't show the mobile warning
      setIsMobile(false);
      return;
    }
    
    // Otherwise check screen size as usual
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Common breakpoint for mobile devices
    };
    
    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Function to handle navigation between sections
  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId);

    // Wait for state update and then scroll
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        // Get header height
        const headerHeight = 80; // Fixed header height

        // Scroll to the section with explicit offset
        window.scrollTo({
          top: section.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    }, 10);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle initial hash navigation when page loads
  useEffect(() => {
    if (!isLoading) {
      // Get section ID from hash or default to hero
      const hash = window.location.hash.replace('#', '') || 'hero';

      // Set active section without scrolling
      setActiveSection(hash);

      // Scroll to section after a brief delay
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          const headerHeight = 80;
          window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: 'auto' // Use auto for immediate positioning
          });
        }
      }, 200);
    }
  }, [isLoading]);

// Enhanced Mobile Warning Component with animated citation quotes in background
const MobileWarning = () => {
  // Function to set desktop viewport and force reload
  const openDesktopMode = () => {
    sessionStorage.setItem('forceDesktopMode', 'true');
    window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + 'desktop=1';
  };
  
  // Function to navigate directly to citations section
  const navigateToCitations = () => {
    sessionStorage.setItem('forceDesktopMode', 'true');
    window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + 'desktop=1#citations';
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Dark overlay with reduced opacity */}
      <div className="absolute inset-0 bg-gray-900/70"></div>
      
      {/* Animated background quotes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlays for better readability */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm z-0"></div>
        
        {/* First quote - slow animation from right to left */}
        <div className="absolute top-1/4 -right-full w-full max-w-md animate-quote-1">
          <div className="p-4 bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-lg text-blue-200 italic">"Karamvir demonstrated exceptional technical expertise and a talent for solving complex problems."</p>
            <p className="text-sm text-blue-300 mt-2">— Pavitar Singh, Founder and CEO (UnifyApps)</p>
          </div>
        </div>
        
        {/* Second quote - slow animation from left to right */}
        <div className="absolute top-1/2 -left-full w-full max-w-md animate-quote-2">
          <div className="p-4 bg-purple-900/20 border-l-4 border-purple-500 rounded">
            <p className="text-lg text-purple-200 italic">"He is not just a participant in projects but a driving force behind them."</p>
            <p className="text-sm text-purple-300 mt-2">— Yogin Patel, Head of AI (Sprinklr)</p>
          </div>
        </div>
        
        {/* Third quote - slow animation from bottom to top */}
        <div className="absolute -bottom-full left-1/4 w-full max-w-md animate-quote-3">
          <div className="p-4 bg-indigo-900/20 border-l-4 border-indigo-500 rounded">
            <p className="text-lg text-indigo-200 italic">"Karamvir is an exceptional talent. He has always surprised me and surpassed my expectations."</p>
            <p className="text-sm text-indigo-300 mt-2">— Sachin Bhardwaj, Head of AI (UnifyApps)</p>
          </div>
        </div>
        
        {/* Fourth quote - slow animation from top to bottom */}
        <div className="absolute -top-full right-1/4 w-full max-w-md animate-quote-4">
          <div className="p-4 bg-cyan-900/20 border-l-4 border-cyan-500 rounded">
            <p className="text-lg text-cyan-200 italic">"His dedication, collaborative spirit, and proactive approach made him a critical part of our success."</p>
            <p className="text-sm text-cyan-300 mt-2">— Elisabetta Carta, Senior Product Manager AI (Sprinklr)</p>
          </div>
        </div>
      </div>
      
      {/* Foreground CTA card */}
      <div className="relative z-20 w-11/12 max-w-xs mx-auto bg-gray-900/80 backdrop-blur-xl rounded-xl border border-blue-500/30 shadow-xl">
        {/* Icon */}
        <div className="flex justify-center mt-4">
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <div className="p-5 pt-2 text-center">
          <h2 className="text-xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Unlock Full Experience</h2>
          
          <p className="text-sm text-blue-200 mb-1">See Karamvir's Professional Journey</p>
          <p className="text-xs text-gray-300 mb-3">View endorsements from industry leaders</p>
          
          {/* CTA button */}
          <button 
            className="w-full mt-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-bold text-sm text-white shadow-md transition-all duration-300"
            onClick={openDesktopMode}
          >
            <span className="flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              View on Desktop
            </span>
          </button>
          
          <div className="h-4"></div> {/* Bottom spacing */}
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes quote1 {
          0%, 100% { transform: translateX(100%); opacity: 0; }
          25%, 75% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes quote2 {
          0%, 25%, 100% { transform: translateX(-100%); opacity: 0; }
          50%, 75% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes quote3 {
          0%, 50%, 100% { transform: translateY(100%); opacity: 0; }
          75%, 85% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes quote4 {
          0%, 75%, 100% { transform: translateY(-100%); opacity: 0; }
          85%, 95% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-quote-1 {
          animation: quote1 20s infinite ease-in-out;
        }
        
        .animate-quote-2 {
          animation: quote2 20s infinite ease-in-out;
        }
        
        .animate-quote-3 {
          animation: quote3 20s infinite ease-in-out;
        }
        
        .animate-quote-4 {
          animation: quote4 20s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {isMobile && <MobileWarning />}
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Navigation Header - Pass navigation function */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
              <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  {/* Logo */}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToSection('hero');
                    }}
                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    Portfolio
                  </a>

                  {/* Desktop Navigation */}
                  <div className="hidden md:flex items-center gap-6">
                    {['Home', 'About', 'Projects', 'Skills', 'Research', 'Citations','Interests', 'Ideas', 'Contact'].map((item) => {
                      const sectionId = item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase();
                      return (
                        <button
                          key={sectionId}
                          onClick={() => navigateToSection(sectionId)}
                          className={`px-3 py-2 rounded-lg font-medium ${
                            activeSection === sectionId
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  {/* Mobile menu button */}
                  <button className="md:hidden p-2 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </nav>
            </header>

            {/* Content Sections with fixed top padding */}
            <div id="hero">
              <Hero navigateToSection={navigateToSection} />
            </div>

            <div id="about">
              <About navigateToSection={navigateToSection} />
            </div>

            <div id="skills">
              <Skills navigateToSection={navigateToSection} />
            </div>

            <div id="citations" >
              <Citations navigateToSection={navigateToSection} />
            </div>

            <div id="projects">
              <Projects navigateToSection={navigateToSection} />
            </div>

            <div id="research">
              <ResearchPapers navigateToSection={navigateToSection} />
            </div>

            <div id="ideas">
              <Ideas navigateToSection={navigateToSection} />
            </div>

            <div id="interests">
              <Interests navigateToSection={navigateToSection} />
            </div>

            <div id="contact">
              <Contact navigateToSection={navigateToSection} />
            </div>

            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default App;
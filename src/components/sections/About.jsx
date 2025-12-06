import React, { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('journey');

  const tabs = [
    { id: 'journey', label: 'My Journey' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'philosophy', label: 'Philosophy' }
  ];

  return (
    <section id="about" className="relative py-16 overflow-hidden bg-gray-900">
      {/* Simplified background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-blue-900/30">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMzAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDRjMCAyLjIxIDEuNzkgNCA0IDRzNC0xLjc5IDQtNHptMjAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0tNDAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0yMC0yMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0yMCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0YzAgMi4yMSAxLjc5IDQgNCA0czQtMS43OSA0LTR6bS00MCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0YzAgMi4yMSAxLjc5IDQgNCA0czQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>
      
      {/* Floating elements (reduced quantity) */}
      <div className="absolute top-20 right-1/4 w-48 h-48 rounded-full bg-blue-600/10 animate-float"></div>
      <div className="absolute bottom-40 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 animate-float-delay"></div>

      <div className="container relative z-10 mx-auto px-4">
        {/* More compact header */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-glow inline-block">About Me</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-3 rounded-full"></div>
          <p className="mt-3 text-lg text-gray-300 max-w-2xl mx-auto">Pioneering AI solutions that transform business processes</p>
        </div>

        {/* Modern, compact tab design */}
        <div className="flex justify-center mb-8 z-20 relative">
          <div className="p-0.5 bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden">
            <div className="flex relative">
              {activeTab && (
                <div 
                  className="absolute inset-0 m-0.5 -z-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-all duration-300"
                  style={{
                    left: `${tabs.findIndex(t => t.id === activeTab) * 33.33}%`,
                    width: '33.33%',
                  }}
                ></div>
              )}
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content card with cleaner design */}
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-sm"></div>
          <div className="relative bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            {/* Content container */}
            <div className="relative z-10">
              {activeTab === 'journey' && (
                <div className="journey-grid">
                  {/* Simplified timeline with essential content */}
                  <div className="relative space-y-10 pl-6 md:pl-8">
                    {/* Vertical line connecting timeline */}
                    <div className="absolute left-0 top-6 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 md:left-1.5"></div>
                    
                    <div className="relative">
                      <div className="absolute left-0 top-1 w-3 h-3 -ml-1.5 rounded-full bg-blue-500 md:w-4 md:h-4 md:-ml-2"></div>
                      <div className="ml-6 md:ml-8">
                        <h3 className="text-xl font-bold text-white mb-2">AI-Driven Career Path</h3>
                        <p className="text-gray-300 leading-relaxed">
                          With a foundation from NIT Jalandhar in Electronics & Communication, I've specialized in AI and language technologies. Starting with NLP chatbots at XpertReview and BlitzJobs, I advanced to building AI systems at Sprinklr, developing conversational AI ecosystems with 50% call deflection rates.
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-0 top-1 w-3 h-3 -ml-1.5 rounded-full bg-purple-500 md:w-4 md:h-4 md:-ml-2"></div>
                      <div className="ml-6 md:ml-8">
                        <h3 className="text-xl font-bold text-white mb-2">AI Innovation Leader</h3>
                        <p className="text-gray-300 leading-relaxed">
                          At UnifyApps, I pioneered a MultiModal AI-Agentic Framework integrating complex workflows across 10+ clients, resulting in millions in cost savings. Now at HighLevel, I'm pushing boundaries with AI support bots and conversational agents, improving accuracy metrics and transforming content generation workflows.
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-0 top-1 w-3 h-3 -ml-1.5 rounded-full bg-indigo-500 md:w-4 md:h-4 md:-ml-2"></div>
                      <div className="ml-6 md:ml-8">
                        <h3 className="text-xl font-bold text-white mb-2">Research Contributor</h3>
                        <p className="text-gray-300 leading-relaxed">
                          I've contributed to the academic field with research on Explainable AI in education, published in the International Journal of Research in Applied Science & Engineering Technology, advancing the theoretical foundations that make these innovations possible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'expertise' && (
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Expertise cards with cleaner design */}
                  <div className="space-y-6">
                    <div className="expertise-card group">
                      <div className="flex items-start p-5 gap-4">
                        <div className="icon-container bg-blue-500/10 group-hover:bg-blue-500/20 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-blue-400 mb-3">AI Agents & LLMs</h3>
                          <ul className="space-y-2">
                            <li className="text-gray-300 flex items-center text-sm">
                              <span className="mr-2 text-blue-400">•</span>
                              <span>Multi-Agent Orchestration & Evaluation</span>
                            </li>
                            <li className="text-gray-300 flex items-center text-sm">
                              <span className="mr-2 text-blue-400">•</span>
                              <span>RAG & LLM Fine-tuning (LoRA, PEFT)</span>
                            </li>
                            <li className="text-gray-300 flex items-center text-sm">
                              <span className="mr-2 text-blue-400">•</span>
                              <span>Vision & Multimodal LLMs</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="expertise-card group">
                      <div className="flex items-start p-5 gap-4">
                        <div className="icon-container bg-purple-500/10 group-hover:bg-purple-500/20 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-purple-400 mb-3">Voice Technologies</h3>
                          <ul className="space-y-2">
                            <li className="text-gray-300 flex items-center text-sm">
                              <span className="mr-2 text-purple-400">•</span>
                              <span>ASR (Wav2vec2, Whisper)</span>
                            </li>
                            <li className="text-gray-300 flex items-center text-sm">
                              <span className="mr-2 text-purple-400">•</span>
                              <span>TTS with VITS architecture</span>
                            </li>
                            <li className="text-gray-300 flex items-center text-sm">
                              <span className="mr-2 text-purple-400">•</span>
                              <span>Classical ML and Statistics</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="expertise-card group">
                      <div className="flex items-start p-5 gap-4">
                        <div className="icon-container bg-indigo-500/10 group-hover:bg-indigo-500/20 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-indigo-400 mb-3">ML & Infrastructure</h3>
                          <ul className="space-y-2">
                            <li className="text-gray-300 flex items-center text-sm">
                              <span className="mr-2 text-indigo-400">•</span>
                              <span>Transformers & Deep Learning</span>
                            </li>
                            <li className="text-gray-300 flex items-center text-sm">
                              <span className="mr-2 text-indigo-400">•</span>
                              <span>Model Quantization & Optimization</span>
                            </li>
                            <li className="text-gray-300 flex items-center text-sm">
                              <span className="mr-2 text-indigo-400">•</span>
                              <span>LORAX Inference Optimization </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="expertise-card group">
                      <div className="flex items-start p-5 gap-4">
                        <div className="icon-container bg-green-500/10 group-hover:bg-green-500/20 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-green-400 mb-3">Cloud & DevOps</h3>
                          <ul className="space-y-2">
                            <li className="text-gray-300 flex items-center text-sm">
                              <span className="mr-2 text-green-400">•</span>
                              <span>AWS & GCP Cloud Platforms</span>
                            </li>
                            <li className="text-gray-300 flex items-center text-sm">
                              <span className="mr-2 text-green-400">•</span>
                              <span>Kubernetes & Docker</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'philosophy' && (
                <div>
                  {/* Innovative philosophy layout with cards in circular arrangement */}
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="philosophy-card">
                      <div className="p-5">
                        <div className="icon-wrapper">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="title">Solving Real Problems</h3>
                        <p className="description">
                          I believe AI should solve tangible problems. My work delivers measurable impact—reducing operational costs by 80% through model optimization and increasing accuracy from 75% to 92% in agent workflows.
                        </p>
                      </div>
                    </div>

                    <div className="philosophy-card">
                      <div className="p-5">
                        <div className="icon-wrapper">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                        </div>
                        <h3 className="title">Responsible AI Advocacy</h3>
                        <p className="description">
                          I'm committed to responsible AI development—building systems that are powerful, ethical, transparent, and fair, as demonstrated by my research in explainable AI for education.
                        </p>
                      </div>
                    </div>

                    <div className="philosophy-card">
                      <div className="p-5">
                        <div className="icon-wrapper">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="title">Continuous Innovation</h3>
                        <p className="description">
                          I thrive at the cutting edge of AI—optimizing LLMs with LoRA and PEFT, orchestrating multi-agent systems for complex workflows, and constantly pushing boundaries.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats section with a unique interactive design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { value: '8.86', label: 'CGPA', color: 'blue' },
            { value: '94%', label: 'High School', color: 'purple' },
            { value: '92%', label: 'Agent Accuracy', color: 'indigo' },
            { value: '1M+', label: 'Cost Savings', color: 'green' }
          ].map((stat, index) => (
            <div key={index} className={`stat-card stat-${stat.color}`}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Simplified call-to-action button */}
        <div className="flex justify-center mt-10">
          <a href="#contact" className="cta-button">
            <span>Let's Connect</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* CSS for all custom animations and styles - streamlined */}
      <style jsx>{`
        /* Core Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        /* Animations */
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 7s ease-in-out infinite 1s; }
        
        /* Utility Classes */
        .drop-shadow-glow { filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.3)); }
        
        /* Card Styling */
        .expertise-card {
          background: rgba(17, 24, 39, 0.7);
          border-radius: 12px;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
          overflow: hidden;
        }
        .expertise-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        .expertise-card.group:hover {
          border-left-color: currentColor;
        }
        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        /* Philosophy Card Styling */
        .philosophy-card {
          background: rgba(17, 24, 39, 0.7);
          border-radius: 12px;
          transition: all 0.3s ease;
          height: 100%;
          position: relative;
          overflow: hidden;
          border-top: 3px solid transparent;
        }
        .philosophy-card:nth-child(1) { border-top-color: #3b82f6; }
        .philosophy-card:nth-child(2) { border-top-color: #8b5cf6; }
        .philosophy-card:nth-child(3) { border-top-color: #6366f1; }
        .philosophy-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.1);
          margin-bottom: 16px;
        }
        .philosophy-card:nth-child(1) .icon-wrapper { background: rgba(59, 130, 246, 0.1); }
        .philosophy-card:nth-child(2) .icon-wrapper { background: rgba(139, 92, 246, 0.1); }
        .philosophy-card:nth-child(3) .icon-wrapper { background: rgba(99, 102, 241, 0.1); }
        .icon {
          width: 24px;
          height: 24px;
          color: #60a5fa;
        }
        .philosophy-card:nth-child(1) .icon { color: #60a5fa; }
        .philosophy-card:nth-child(2) .icon { color: #a78bfa; }
        .philosophy-card:nth-child(3) .icon { color: #818cf8; }
        .title {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }
        .description {
          color: #d1d5db;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        /* Stat Cards */
        .stat-card {
          background: rgba(17, 24, 39, 0.7);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .stat-card:hover {
          transform: translateY(-3px);
        }
        .stat-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          width: 0;
          transition: width 0.4s ease;
        }
        .stat-card:hover::after {
          width: 100%;
        }
        .stat-blue::after { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
        .stat-purple::after { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
        .stat-indigo::after { background: linear-gradient(90deg, #6366f1, #818cf8); }
        .stat-green::after { background: linear-gradient(90deg, #10b981, #34d399); }
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .stat-blue .stat-value { color: #60a5fa; }
        .stat-purple .stat-value { color: #a78bfa; }
        .stat-indigo .stat-value { color: #818cf8; }
        .stat-green .stat-value { color: #34d399; }
        .stat-label {
          color: #d1d5db;
          font-size: 0.875rem;
        }
        
        /* CTA Button */
        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          color: white;
          font-weight: 600;
          border-radius: 50px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(139, 92, 246, 0.4);
        }
      `}</style>
    </section>
  );
};

export default About;
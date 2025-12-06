import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Twitter, Calendar, Send, MessageSquare, CheckCircle, AlertCircle, Coffee, Sparkles, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('message');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.emailjs.init("cDhy7XFq4iYlx6Hv9");
    };

    return () => {
      try {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      } catch (error) {
        console.error('Error removing EmailJS script:', error);
      }
    };
  }, []);

  // Load Calendly script with improved error handling
  useEffect(() => {
    // Check if Calendly script is already loaded
    if (window.Calendly) {
      setCalendlyLoaded(true);
      return;
    }
    
    const calendlyScript = document.createElement('script');
    calendlyScript.src = 'https://assets.calendly.com/assets/external/widget.js';
    calendlyScript.async = true;
    
    calendlyScript.onload = () => {
      console.log('Calendly script loaded successfully');
      setCalendlyLoaded(true);
    };
    
    calendlyScript.onerror = (error) => {
      console.error('Error loading Calendly script:', error);
    };
    
    // Add to head instead of body for better script loading
    document.head.appendChild(calendlyScript);

    return () => {
      try {
        if (document.head.contains(calendlyScript)) {
          document.head.removeChild(calendlyScript);
        }
      } catch (error) {
        console.error('Error removing Calendly script:', error);
      }
    };
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Form submission with EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      };

      const response = await window.emailjs.send(
        'service_fzddzds',
        'template_274fpax',
        templateParams
      );

      if (response.status === 200) {
        setFormStatus({
          submitted: true,
          success: true,
          message: "Message sent! I'll get back to you very soon."
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: "Sorry, there was an error sending your message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calendly appointment scheduling - simplified direct implementation
  const openCalendly = () => {
    // Open Calendly URL directly in a new tab as a reliable fallback
    window.open('https://calendly.com/karamvirh71/new-meeting', '_blank');
  };

  // Calendar appointment types - simplified to single 30-minute option with different purposes
  const appointmentTypes = [
    { id: 1, name: 'Quick Chat', emoji: '⚡', description: 'A brief introduction to discuss your needs' },
    { id: 2, name: 'Project Discussion', emoji: '🔍', description: 'Explore your project requirements in detail' },
    { id: 3, name: 'Strategy Session', emoji: '🚀', description: 'Deep dive into planning and execution' },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-pink-500/10 blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
            <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-blue-400 font-medium text-sm">Let's create something amazing together</span>
          </div>
          <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a project in mind or want to explore collaboration opportunities?
            I'm just a message away.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-6">
            {/* Left sidebar - Contact info */}
            <div className="md:col-span-2">
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-700/50 shadow-xl h-full transform transition-all hover:shadow-blue-900/20 hover:border-gray-600/60">
                <div className="p-7">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="relative">
                      Connect With Me
                      <span className="absolute bottom-0 left-0 h-1 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                    </span>
                  </h3>

                  {/* Contact details with hover effects */}
                  <div className="space-y-4 mb-8">
                    <a
                      href="mailto:karamvirh71@gmail.com"
                      className="group flex items-center p-4 bg-gray-900/60 rounded-2xl hover:bg-gradient-to-r hover:from-blue-900/40 hover:to-blue-800/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4 group-hover:bg-blue-600/40 transition-all duration-300 group-hover:scale-110">
                        <Mail className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300">Email</div>
                        <div className="text-white font-medium">karamvirh71@gmail.com</div>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/+918283880452"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-gray-900/60 rounded-2xl hover:bg-gradient-to-r hover:from-green-900/40 hover:to-green-800/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center mr-4 group-hover:bg-green-600/40 transition-all duration-300 group-hover:scale-110">
                        <Phone className="w-5 h-5 text-green-400 group-hover:text-green-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300">WhatsApp</div>
                        <div className="text-white font-medium">+91 8283880452</div>
                      </div>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/karamvir-singh-842838177/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-gray-900/60 rounded-2xl hover:bg-gradient-to-r hover:from-blue-900/40 hover:to-blue-800/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4 group-hover:bg-blue-600/40 transition-all duration-300 group-hover:scale-110">
                        <Linkedin className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300">LinkedIn</div>
                        <div className="text-white font-medium">karamvir-singh</div>
                      </div>
                    </a>

                    <a
                      href="https://x.com/its_karamvir"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-gray-900/60 rounded-2xl hover:bg-gradient-to-r hover:from-sky-900/40 hover:to-sky-800/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-sky-900/30 flex items-center justify-center mr-4 group-hover:bg-sky-600/40 transition-all duration-300 group-hover:scale-110">
                        <Twitter className="w-5 h-5 text-sky-400 group-hover:text-sky-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300">Twitter</div>
                        <div className="text-white font-medium">@its_karamvir</div>
                      </div>
                    </a>
                    <a
                      href="https://topmate.io/karamvir_hapal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 bg-gray-900/60 rounded-2xl hover:bg-gradient-to-r hover:from-sky-900/40 hover:to-sky-800/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-sky-900/30 flex items-center justify-center mr-4 group-hover:bg-sky-600/40 transition-all duration-300 group-hover:scale-110">
                        <Calendar className="w-5 h-5 text-sky-400 group-hover:text-sky-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300">TopMate</div>
                        <div className="text-white font-medium">karamvir_hapal</div>
                      </div>
                    </a>
                  </div>

                  {/* Buy me a coffee with improved design */}
                  <div className="mt-8">
                    <div className="bg-gradient-to-br from-amber-500/20 to-amber-700/10 rounded-2xl p-6 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/30 transition-all">
                      <div className="absolute -bottom-14 -right-14 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                      <div className="flex items-center mb-4">
                        <Coffee className="w-6 h-6 text-amber-400 mr-3" />
                        <h4 className="text-lg font-bold text-white">Support My Work</h4>
                      </div>
                      <p className="text-gray-300 text-sm mb-4 relative z-10">
                        If you found my work helpful and want to support my future projects, consider buying me a coffee!
                      </p>
                      <a
                        href="https://buymeacoffee.com/karamvirh7q"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg transition-all text-sm font-medium relative z-10 group-hover:shadow-lg"
                      >
                        <Coffee className="w-4 h-4 mr-2" />
                        Buy me a coffee
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section - Contact form / Meeting scheduler */}
            <div className="md:col-span-3">
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-700/50 shadow-xl h-full transform transition-all hover:shadow-purple-900/20 hover:border-gray-600/60">
                {/* Improved animated tabs */}
                <div className="flex border-b border-gray-700/60 relative">
                  <button
                    className={`flex-1 py-4 font-medium flex justify-center items-center transition-all ${
                      activeTab === 'message'
                        ? 'text-blue-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('message')}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                  <button
                    className={`flex-1 py-4 font-medium flex justify-center items-center transition-all ${
                      activeTab === 'schedule'
                        ? 'text-purple-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('schedule')}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Meeting
                  </button>
                  
                  {/* Animated indicator */}
                  <div 
                    className={`absolute bottom-0 h-0.5 bg-gradient-to-r transition-all duration-300 ease-in-out ${
                      activeTab === 'message' 
                        ? 'from-blue-500 to-blue-400 left-0 w-1/2' 
                        : 'from-purple-500 to-purple-400 left-1/2 w-1/2'
                    }`}
                  ></div>
                </div>

                <div className="p-7">
                  {/* Message Form with improved UI */}
                  {activeTab === 'message' && (
                    <div>
                      {formStatus.submitted ? (
                        <div className={`rounded-xl p-5 mb-6 flex items-start ${
                          formStatus.success ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
                        }`}>
                          {formStatus.success ? (
                            <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" />
                          )}
                          <p className={formStatus.success ? 'text-green-300' : 'text-red-300'}>
                            {formStatus.message}
                          </p>
                        </div>
                      ) : null}

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="group">
                            <label htmlFor="name" className="block text-white font-medium mb-2">Your Name</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all group-hover:border-gray-600"
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div className="group">
                            <label htmlFor="email" className="block text-white font-medium mb-2">Your Email</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all group-hover:border-gray-600"
                              placeholder="john@example.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="group">
                          <label htmlFor="subject" className="block text-white font-medium mb-2">Subject</label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all group-hover:border-gray-600"
                            placeholder="Project Collaboration"
                            required
                          />
                        </div>

                        <div className="group">
                          <label htmlFor="message" className="block text-white font-medium mb-2">Your Message</label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white resize-none transition-all group-hover:border-gray-600"
                            placeholder="Hello, I'd like to discuss a potential project..."
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-4 px-6 rounded-xl font-medium text-white flex items-center justify-center transition-all shadow-lg ${
                            isSubmitting
                              ? 'bg-blue-900/50 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 hover:shadow-blue-900/30'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Schedule Meeting with Calendly integration */}
                  {activeTab === 'schedule' && (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                          <span>Schedule a Meeting</span>
                        </h3>
                        <p className="text-gray-300">
                          Select your preferred meeting type below to book a time on my calendar.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        {appointmentTypes.map((type) => (
                          <div
                            key={type.id}
                            className="bg-gray-900/60 rounded-xl border border-gray-700/70 p-5 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-900/10 flex flex-col"
                          >
                            <div className="flex items-center mb-2">
                              <span className="text-2xl mr-2">{type.emoji}</span>
                              <h4 className="text-white font-semibold">{type.name}</h4>
                            </div>
                            <p className="text-gray-300 text-sm mb-3">{type.description}</p>
                            <p className="text-purple-400 text-sm mb-4">30 Minutes</p>
                            <button
                              onClick={() => openCalendly()}
                              className="mt-auto py-2.5 px-4 bg-purple-600/30 hover:bg-purple-600/50 text-white rounded-lg transition-all text-sm font-medium flex items-center justify-center hover:shadow-md"
                              type="button"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Book Meeting
                            </button>
                          </div>
                        ))}
                      </div>

                      {!calendlyLoaded && (
                        <div className="text-center p-6">
                          <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                          <p className="text-gray-300">Loading calendar...</p>
                        </div>
                      )}
                      
                       <div className="mt-5 pt-5 border-t border-purple-500/20">
                          <p className="text-gray-300 text-sm mb-3">
                            Can't find a suitable time? Feel free to send me a message with your preferred dates and times, and I'll accommodate your schedule if possible.
                          </p>
                          <button 
                            onClick={() => setActiveTab('message')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm font-medium"
                            type="button"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Message
                          </button>
                        </div>
                      
                      {/* Fallback direct link to Calendly if the widget doesn't work */}
                      <div className="mt-6 text-center hidden">
                        <p className="text-gray-300 mb-3">If the booking buttons don't work, you can access my calendar directly:</p>
                        <a 
                          href="https://calendly.com/karamvirh71/new-meeting" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all text-sm font-medium"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Open Calendly
                        </a>
                      </div>
                      
                      {/* Alternative: simplified Calendly integration */}
                    
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
import React, { useState, useEffect, useRef } from 'react';
import { Home, Map, BookOpen, Code, Music, ChevronLeft, ChevronRight, Maximize2, X, Sun, Moon } from 'lucide-react';

const Interests = () => {
  const [activeTab, setActiveTab] = useState('travel');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [theme, setTheme] = useState('dark');
  const scrollContainerRef = useRef(null);

  // Interest categories
  const interestCategories = [
    {
      id: 'travel',
      title: 'Travel Adventures',
      icon: <Map className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500',
      description: 'Exploring new places, experiencing different cultures and creating unforgettable memories.'
    },
    {
      id: 'reading',
      title: 'Reading',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500',
      description: 'Expanding my knowledge and perspective through books across various genres.'
    },
    {
      id: 'coding',
      title: 'Coding',
      icon: <Code className="w-5 h-5" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500',
      description: "Building innovative solutions and pushing the boundaries of what is possible with code."
    },
    {
      id: 'music',
      title: 'Guitar',
      icon: <Music className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500',
      description: 'Learning to play guitar and exploring the joy of creating music.'
    }
  ];

  // Content for each interest
  const interestContent = {
    travel: {
      destinations: [
        {
          name: 'Dubai',
          image: '/interests/dubai.jpeg',
          description: 'Exploring the blend of modern architecture and rich cultural heritage in Dubai.'
        },
        {
          name: 'Singapore',
          image: '/interests/singapore.jpeg',
          description: 'Experiencing the perfect harmony of nature and urban development in Singapore.'
        },
        {
          name: 'Spiti Valley',
          image: '/interests/spiti.jpeg',
          description: 'Discovering the untouched beauty and serenity of Spiti Valley.'
        },
        {
          name: 'Manali',
          image: '/interests/manali.jpeg',
          description: 'Enjoying the breathtaking mountain views and adventure sports in Manali.'
        },
        {
          name: 'Hyderabad',
          image: '/interests/hyderabad.jpeg',
          description: 'Savoring the historic charm and culinary delights of Hyderabad.'
        },
        {
          name: 'Delhi',
          image: '/interests/delhi.jpeg',
          description: 'Exploring the blend of heritage and modernity in Delhi.'
        },
        {
          name: 'Gurgaon',
          image: '/interests/gurgaon.jpeg',
          description: 'Experiencing the dynamic urban lifestyle and tech culture of Gurgaon.'
        },
        {
          name: 'Ladakh',
          image: '/interests/ladakh.jpeg',
          description: 'Witnessing the majestic landscapes and pristine beauty of Ladakh.'
        },
        {
          name: 'Goa',
          image: '/interests/goa.jpeg',
          description: 'Relaxing on the beautiful beaches and enjoying the vibrant culture of Goa.'
        }
      ]
    },
    reading: {
      books: [
        {
          title: 'Rich Dad Poor Dad',
          author: 'Robert Kiyosaki',
          image: '/interests/richdad.png',
          description: 'A personal finance classic that challenges conventional wisdom about money and investing.'
        },
        {
          title: 'The Art of War',
          author: 'Sun Tzu',
          image: '/interests/artofwar.png',
          description: 'Ancient Chinese military treatise with timeless strategic wisdom applicable to various aspects of life.'
        },
        {
          title: 'Seven Habits of Highly Effective People',
          author: 'Stephen R. Covey',
          image: '/interests/sevenhabits.png',
          description: 'Powerful lessons in personal change and principles for effectiveness in life and business.'
        },
        {
          title: 'Harry Potter Series',
          author: 'J.K. Rowling',
          image: '/interests/harrypotter.png',
          description: 'The magical journey of Harry Potter and his friends that captivated millions worldwide.'
        },
        {
          title: 'The Girl in Room 105',
          author: 'Chetan Bhagat',
          image: '/interests/girlinroom.png',
          description: 'An unlove story that combines mystery, intrigue, and contemporary Indian society.'
        }
      ]
    },
    coding: {
      projects: [
        {
          title: 'AI Projects',
          image: '/interests/aiprojects.jpg',
          description: 'Building and experimenting with various AI models and applications.'
        },
        {
          title: 'Web Development',
          image: '/interests/webdev.jpg',
          description: 'Creating responsive and interactive web applications using modern frameworks.'
        },
        {
          title: 'Competitive Programming',
          image: '/interests/competitive.jpg',
          description: 'Solving algorithmic challenges to sharpen problem-solving skills.'
        }
      ]
    },
    music: {
      journey: {
        image: '/interests/guitar.jpg',
        description: 'Recently embarked on a musical journey, learning to play the guitar. Exploring various styles and techniques, from basic chords to more complex arrangements. Music provides a creative outlet and balance to my technical pursuits.'
      }
    }
  };

  // Get current active category
  const activeCategory = interestCategories.find(cat => cat.id === activeTab);

  // Get current items
  const getCurrentItems = () => {
    switch (activeTab) {
      case 'travel': return interestContent.travel.destinations;
      case 'reading': return interestContent.reading.books;
      case 'coding': return interestContent.coding.projects;
      default: return [];
    }
  };

  const currentItems = getCurrentItems();

  // Navigation for scrollable container
  const scrollToItem = (index) => {
    setCurrentImageIndex(index);
    
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const items = container.querySelectorAll('.item-card');
      
      if (items[index]) {
        const scrollPosition = items[index].offsetLeft - container.offsetLeft;
        container.scrollTo({
          left: scrollPosition - container.clientWidth / 2 + items[index].clientWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  };

  // Toggle fullscreen image view
  const toggleFullscreen = (imgSrc) => {
    setFullscreenImage(fullscreenImage === imgSrc ? null : imgSrc);
  };

  // Handle key events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && fullscreenImage) {
        setFullscreenImage(null);
      } else if (e.key === 'ArrowLeft' && activeTab !== 'music' && currentItems.length > 1) {
        scrollToItem((currentImageIndex - 1 + currentItems.length) % currentItems.length);
      } else if (e.key === 'ArrowRight' && activeTab !== 'music' && currentItems.length > 1) {
        scrollToItem((currentImageIndex + 1) % currentItems.length);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage, currentImageIndex, activeTab, currentItems]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Theme classes
  const themeClasses = {
    background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100',
    surface: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    text: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textMuted: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    surfaceHover: theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
  };

  return (
    <section id="interests" className={`py-16 ${themeClasses.background} transition-colors duration-500 min-h-screen`}>
      {/* Header navigation */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center">
          <a
            href="#hero"
            className={`flex items-center px-4 py-2 rounded-full ${themeClasses.surface} ${themeClasses.text} ${themeClasses.surfaceHover} transition-all duration-300 border ${themeClasses.border}`}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Interests & Passions
          </h1>
          
          <button 
            onClick={toggleTheme}
            className={`p-3 rounded-full ${themeClasses.surface} ${themeClasses.text} ${themeClasses.surfaceHover} transition-all duration-300 border ${themeClasses.border}`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* 3D Rotating Category Selector */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center perspective relative h-24 mb-8">
            {interestCategories.map((category, index) => {
              const isActive = activeTab === category.id;
              const position = index - interestCategories.findIndex(cat => cat.id === activeTab);
              
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id);
                    setCurrentImageIndex(0);
                  }}
                  className={`absolute top-0 left-0 right-0 mx-auto w-64 px-6 py-4 rounded-xl border transition-all duration-500 transform ${isActive ? 'z-10 scale-100 opacity-100' : 'opacity-70 scale-90 cursor-pointer'} 
                    ${position === -1 ? '-translate-x-full -rotate-y-30' : 
                      position === 1 ? 'translate-x-full rotate-y-30' :
                      position < -1 ? '-translate-x-2/3 opacity-0 -rotate-y-45' :
                      position > 1 ? 'translate-x-2/3 opacity-0 rotate-y-45' : ''}
                    ${themeClasses.surface} ${themeClasses.border}
                    ${isActive ? `${category.borderColor} shadow-lg shadow-${category.color.split('-')[1]}/20` : ''}
                  `}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="flex items-center">
                    <div className={`mr-3 p-2 rounded-full bg-gradient-to-br ${category.color}`}>
                      {React.cloneElement(category.icon, { className: 'text-white' })}
                    </div>
                    <div className="text-left">
                      <div className={`font-bold ${themeClasses.text}`}>{category.title}</div>
                      {isActive && (
                        <div className={`text-xs mt-1 ${themeClasses.textMuted}`}>{category.description}</div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'music' ? (
            // Music content - Special layout
            <div className={`${themeClasses.surface} rounded-2xl overflow-hidden border ${themeClasses.border} shadow-xl p-8 flex flex-col md:flex-row gap-8 items-center`}>
              <div className="md:w-1/2 relative group">
                <div className="relative rounded-lg overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent z-10"></div>
                  <img
                    src={interestContent.music.journey.image}
                    alt="Guitar journey"
                    className="w-full object-cover aspect-video"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/600x400?text=Guitar+Journey";
                    }}
                  />
                  <button
                    onClick={() => toggleFullscreen(interestContent.music.journey.image)}
                    className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-purple-600 transition-colors z-20"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className={`text-2xl md:text-3xl font-bold ${themeClasses.text} mb-6`}>My Musical Journey</h3>
                <div className={`${themeClasses.textMuted} leading-relaxed space-y-4`}>
                  <p>{interestContent.music.journey.description}</p>
                  <div className="pt-4">
                    <div className={`inline-block px-4 py-2 rounded-full text-sm ${themeClasses.surface} border ${themeClasses.border}`}>
                      Currently Learning: Acoustic Guitar
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Other content - Horizontal scroll gallery
            <div className="space-y-8">
              {/* Scrollable content area */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {currentItems.map((item, index) => {
                  const itemName = item.name || item.title;
                  const isActive = index === currentImageIndex;
                  
                  return (
                    <div 
                      key={index}
                      className={`item-card flex-shrink-0 w-80 mx-4 snap-center transition-all duration-500 transform
                        ${isActive ? 'scale-100' : 'scale-95 opacity-80'}
                      `}
                      onClick={() => scrollToItem(index)}
                    >
                      <div className={`h-full rounded-2xl overflow-hidden border ${themeClasses.border} ${themeClasses.surface} shadow-xl 
                        ${isActive ? `ring-2 ${activeCategory.borderColor} shadow-lg shadow-${activeCategory.color.split('-')[1]}/20` : ''}
                      `}>
                        <div className="relative">
                          <div className="h-48 relative overflow-hidden group">
                            <div className={`absolute inset-0 bg-gradient-to-tr ${activeCategory.color}/10 to-transparent z-10 
                              group-hover:opacity-0 transition-opacity`}></div>
                            <img
                              src={item.image}
                              alt={itemName}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://via.placeholder.com/400x300?text=${itemName}`;
                              }}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFullscreen(item.image);
                              }}
                              className="absolute bottom-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-blue-600 transition-colors z-10 opacity-0 group-hover:opacity-100"
                            >
                              <Maximize2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className={`text-lg font-bold ${themeClasses.text}`}>{itemName}</h3>
                            {activeTab === 'reading' && (
                              <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-500">
                                {item.author}
                              </span>
                            )}
                          </div>
                          <p className={`${themeClasses.textMuted} text-sm`}>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Navigation controls */}
              <div className="flex justify-center items-center gap-8">
                <button
                  onClick={() => scrollToItem((currentImageIndex - 1 + currentItems.length) % currentItems.length)}
                  className={`p-3 rounded-full ${themeClasses.surface} ${themeClasses.border} ${themeClasses.text} hover:bg-gradient-to-r ${activeCategory.color} hover:text-white transition-all duration-300`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-2">
                  {currentItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToItem(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? `bg-gradient-to-r ${activeCategory.color}`
                          : `${themeClasses.surface} ${themeClasses.border}`
                      }`}
                      aria-label={`Go to item ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => scrollToItem((currentImageIndex + 1) % currentItems.length)}
                  className={`p-3 rounded-full ${themeClasses.surface} ${themeClasses.border} ${themeClasses.text} hover:bg-gradient-to-r ${activeCategory.color} hover:text-white transition-all duration-300`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
          
          {/* Interest indicators for all categories */}
          <div className="mt-12 pt-6 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {interestCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id);
                    setCurrentImageIndex(0);
                  }}
                  className={`p-4 rounded-xl ${category.bgColor} border transition-all duration-300
                    ${activeTab === category.id 
                      ? `${category.borderColor} border-2` 
                      : `${themeClasses.border} opacity-70 hover:opacity-100`}
                  `}
                >
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${category.color} mr-3`}>
                      {React.cloneElement(category.icon, { className: 'text-white' })}
                    </div>
                    <h3 className={`font-bold ${themeClasses.text}`}>{category.title}</h3>
                  </div>
                  <div className="text-xs text-left ml-2 pl-2 border-l-2 border-gray-700">
                    {category.id === 'travel' && (
                      <p className={themeClasses.textMuted}>{interestContent.travel.destinations.length} destinations</p>
                    )}
                    {category.id === 'reading' && (
                      <p className={themeClasses.textMuted}>{interestContent.reading.books.length} books</p>
                    )}
                    {category.id === 'coding' && (
                      <p className={themeClasses.textMuted}>{interestContent.coding.projects.length} projects</p>
                    )}
                    {category.id === 'music' && (
                      <p className={themeClasses.textMuted}>Musical journey</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Fullscreen image viewer */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-screen-xl max-h-screen w-full h-full flex items-center justify-center">
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-screen object-contain"
            />
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-red-600 p-3 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* CSS for custom classes */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        
        .rotate-y-30 {
          transform: rotateY(30deg);
        }
        
        .-rotate-y-30 {
          transform: rotateY(-30deg);
        }
        
        .rotate-y-45 {
          transform: rotateY(45deg);
        }
        
        .-rotate-y-45 {
          transform: rotateY(-45deg);
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Interests;
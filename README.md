# 🚀 Portfolio Website

A modern, responsive personal portfolio website built with React, showcasing my skills, projects, publications, and professional journey.

[![Live Demo](https://img.shields.io/badge/demo-live-success.svg)](https://github.com/karamvirsingh1998/portfolio-website)
[![License](https://img.shields.io/badge/License-All_Rights_Reserved-red.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC.svg)](https://tailwindcss.com/)

> ⚠️ **NOTICE**: This repository is for **VIEWING PURPOSES ONLY**. All rights reserved. See [LICENSE](LICENSE) for details.

## ✨ Features

- **🎨 Modern UI/UX** - Clean, professional design with smooth animations
- **📱 Fully Responsive** - Optimized for all device sizes (mobile, tablet, desktop)
- **⚡ Fast Performance** - Built with Vite for lightning-fast load times
- **🎭 Smooth Animations** - Powered by Framer Motion for engaging user experience
- **📧 Contact Form** - Integrated EmailJS for direct communication
- **🎯 Intersection Observer** - Lazy loading and scroll-based animations
- **📊 Analytics Ready** - Vercel Analytics and Speed Insights integration
- **🌐 SEO Optimized** - Structured for search engine visibility
- **♿ Accessible** - WCAG compliant with semantic HTML

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.2** - Modern UI library with hooks
- **Vite 4.x** - Next-generation frontend tooling
- **JavaScript (ES6+)** - Modern JavaScript features

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **Autoprefixer** - Automatic vendor prefixing

### Animation & Interactivity
- **Framer Motion 10.x** - Production-ready motion library
- **Three.js** - 3D graphics and visualizations
- **D3.js** - Data-driven visualizations
- **Lucide React** - Beautiful, consistent icons

### Integration & Services
- **EmailJS** - Email service for contact form
- **Google Generative AI** - AI-powered features
- **Vercel Analytics** - Web analytics
- **Vercel Speed Insights** - Performance monitoring

## 📂 Project Structure

```
portfolio-website/
├── public/                      # Static assets
│   ├── citations/              # Publication and citation images
│   │   ├── alt/               # Alternative citation images
│   │   ├── aayush.png
│   │   ├── coursera.png
│   │   ├── hackerrank.png
│   │   └── ...
│   ├── images/                # Profile and general images
│   │   └── profile.jpeg
│   ├── interests/             # Travel and hobby images
│   │   ├── ladakh.jpeg
│   │   ├── dubai.jpeg
│   │   └── ...
│   ├── projects/              # Project screenshots
│   │   ├── project.png
│   │   └── project_2.png
│   └── karamvirResume.pdf     # Resume PDF
│
├── src/                        # Source files
│   ├── components/            # React components
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── LoadingScreen.jsx
│   │   ├── sections/         # Page sections
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── BloggingPublications.jsx
│   │   │   ├── Citations.jsx
│   │   │   ├── Interests.jsx
│   │   │   ├── Ideas.jsx
│   │   │   └── Contact.jsx
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── ProgressBar.jsx
│   │   └── SectionWrapper.jsx
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useIntersectionObserver.js
│   │
│   ├── utils/                 # Utility functions
│   │   ├── constants.js      # Constants and data
│   │   └── animations.js     # Animation configurations
│   │
│   ├── styles/               # Global styles
│   │   └── globals.css
│   │
│   ├── App.jsx               # Main App component
│   └── main.jsx              # Entry point
│
├── index.html                 # HTML template
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── package.json              # Dependencies
└── .gitignore               # Git ignore rules
```

## ⚠️ Important Notice

**This repository is provided for VIEWING PURPOSES ONLY.**

- ❌ **DO NOT** clone, copy, or use this code for your own projects
- ❌ **DO NOT** fork or redistribute this code
- ✅ **You MAY** view the code to see implementation examples
- ✅ **You MAY** use this as a reference for learning purposes

**All code is copyrighted and proprietary.** See [LICENSE](LICENSE) for full terms.

---

## 🚀 Getting Started (For Authorized Use Only)

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** or **pnpm**

### Installation

> ⚠️ **Note**: Only the repository owner is authorized to run this code.

1. **Clone the repository** (Authorized personnel only)
   ```bash
   git clone https://github.com/karamvirsingh1998/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the `src` directory (if not already present) and add your configuration:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_GOOGLE_AI_API_KEY=your_google_ai_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📑 Sections Overview

### 🏠 Hero Section
- Eye-catching introduction
- Professional tagline
- Call-to-action buttons

### 👨‍💻 About Section
- Professional background
- Career journey
- Core competencies

### 🎯 Skills Section
- Technical skills with proficiency levels
- Interactive progress bars
- Technology stack visualization

### 🚀 Projects Section
- Featured projects with descriptions
- Project images and demos
- Technology tags

### 📝 Blogging & Publications
- Medium articles
- Research papers
- Technical blog posts

### 🏆 Citations & Testimonials
- Professional recommendations
- Course certifications (Coursera, Udemy, HackerRank)
- Colleague testimonials

### 🎨 Interests Section
- Travel experiences (Dubai, Ladakh, Goa, Singapore, etc.)
- Hobbies and personal interests
- Books and learning

### 💬 Contact Section
- Contact form with EmailJS integration
- Social media links
- Professional networks

## 🎨 Customization

### Update Personal Information

Edit the constants in `src/utils/constants.js` to update:
- Personal details
- Skills and proficiency levels
- Projects information
- Social media links
- Contact information

### Modify Styling

- **Colors**: Update `tailwind.config.js` for theme colors
- **Fonts**: Modify `src/styles/globals.css` for typography
- **Animations**: Adjust `src/utils/animations.js` for motion settings

### Add New Sections

1. Create a new component in `src/components/sections/`
2. Import and add it to `App.jsx`
3. Wrap with `SectionWrapper` for consistent styling

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite configuration
4. Deploy! 🚀

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to [Netlify](https://netlify.com)

### GitHub Pages

```bash
npm install gh-pages --save-dev
```

Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Deploy:
```bash
npm run deploy
```

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🌟 Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions

### Performance Optimization
- Code splitting
- Lazy loading images
- Optimized bundle size
- Vite's lightning-fast HMR

### Accessibility
- Semantic HTML5
- ARIA labels
- Keyboard navigation
- Screen reader support

## 📸 Screenshots

*Coming soon - Add your portfolio screenshots here*

## 🤝 Contributing

**This is a personal portfolio project and is NOT open for contributions.**

If you find any issues or have questions about the implementation, feel free to open an issue for discussion purposes only.

## 📝 License & Copyright

**Copyright © 2025 Karamvir Singh. All Rights Reserved.**

This code is proprietary and confidential. See [LICENSE](LICENSE) file for complete terms.

**This repository is for DEMONSTRATION and VIEWING purposes only.**

### What this means:
- ✅ You can view the source code
- ✅ You can learn from the implementation
- ❌ You cannot use, copy, modify, or distribute this code
- ❌ You cannot fork this repository for your own use
- ❌ You cannot use this code in any of your projects

**For any permissions or inquiries, please contact the repository owner.**

## 👤 Author

**Karamvir Singh**

- GitHub: [@karamvirsingh1998](https://github.com/karamvirsingh1998)
- LinkedIn: [Add your LinkedIn URL]
- Email: [Add your email]
- Portfolio: [Add your live portfolio URL]

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [EmailJS](https://www.emailjs.com/) - Email service
- [Lucide](https://lucide.dev/) - Icon library

## 📊 Project Stats

- **Total Components**: 20+
- **Total Lines**: 10,000+
- **Dependencies**: 12
- **Dev Dependencies**: 4

---

⭐ **Star this repository if you find it helpful!**

Made with ❤️ by Karamvir Singh


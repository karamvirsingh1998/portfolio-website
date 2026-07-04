export const LABS_PROJECTS = [
  {
    id: 'novella',
    title: 'Novella',
    company: 'Karamvir AI Labs',
    tagline: 'AI illustrated storyboards',
    description:
      'Turn a premise into a multi-panel comic. GPT writes the script, OpenAI illustrates every scene.',
    href: '/novella',
    external: false,
    status: 'live',
    impact: ['Multi-panel story generation', 'GPT + image models', 'Save & browse library'],
    technologies: ['React', 'Express', 'OpenAI', 'SQLite'],
    accent: 'from-blue-500 to-purple-600',
  },
  {
    id: 'hetu',
    title: 'Hetu Health',
    company: 'Karamvir AI Labs',
    tagline: 'AI health companion on Telegram',
    description:
      'Conversational wellness bot powered by LLMs. Ask questions, get guidance, and track health goals in chat.',
    href: 'https://t.me/hetu_health_bot',
    external: true,
    status: 'beta',
    impact: ['LLM-powered chat', 'Telegram-native UX', 'Wellness Q&A'],
    technologies: ['Python', 'OpenAI', 'Telegram'],
    accent: 'from-violet-500 to-purple-600',
  },
];

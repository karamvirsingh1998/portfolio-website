import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FlaskConical } from 'lucide-react';
import { LABS_PROJECTS } from '../../data/labs';

const STATUS_STYLES = {
  live: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  beta: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

function LabCard({ project }) {
  const Tag = 'a';
  const linkProps = project.external
    ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: project.href };

  return (
    <motion.div whileHover={{ y: -6 }} className="h-full">
      <Tag
        {...linkProps}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/60 shadow-lg backdrop-blur-sm transition-colors hover:border-gray-600"
      >
        <div className={`h-1.5 bg-gradient-to-r ${project.accent}`} />
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-gray-400">{project.company}</p>
              <h3 className="mt-1 text-xl font-bold text-white">{project.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{project.tagline}</p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[project.status] || STATUS_STYLES.beta}`}
            >
              {project.status}
            </span>
          </div>

          <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-300">
            {project.description}
          </p>

          <ul className="mb-4 space-y-1.5">
            {project.impact.slice(0, 2).map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                <span className="h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-gray-700/60 px-2 py-0.5 text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="flex items-center gap-1 text-sm font-medium text-blue-400 transition-colors group-hover:text-blue-300">
            Open project
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </p>
        </div>
      </Tag>
    </motion.div>
  );
}

export default function Labs() {
  return (
    <section id="labs" className="relative overflow-hidden bg-gray-900 py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-900/20" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-blue-400">
            <FlaskConical size={18} />
            06 — Labs
          </div>
          <h2 className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-5xl font-bold text-transparent">
            Karamvir AI Labs
          </h2>
          <div className="mx-auto mt-3 h-1 w-32 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-300">
            Side projects and experiments — creative tools, agents, and product prototypes built
            with LLMs.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LABS_PROJECTS.map((project) => (
            <LabCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

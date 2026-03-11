'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projectApi } from '@/lib/api';
import { Project } from '@/types';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectApi.getFeatured();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="spinner" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="gradient-text">Featured Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A curated selection of my best projects showcasing creativity, 
            technical skill, and artistic vision.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/gallery" className="cursor-pointer">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center gap-2"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

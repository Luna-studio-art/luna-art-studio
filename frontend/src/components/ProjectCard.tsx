'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Project } from '@/types';
import { getCategoryColor } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const gradientClass = getCategoryColor(project.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="card group cursor-pointer"
    >
      <Link href={`/project/${project.slug}`}>
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.thumbnail?.url || project.images?.[0]?.url || '/placeholder.jpg'}
            alt={project.thumbnail?.alt || project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${gradientClass} text-white`}>
            {project.category}
          </div>

          {/* Play Icon for Videos */}
          {project.category === 'Video Projects' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircle className="w-16 h-16 text-white" />
            </div>
          )}

          {/* Hover Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

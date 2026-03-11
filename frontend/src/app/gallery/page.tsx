'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, Search } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { projectApi } from '@/lib/api';
import { Project } from '@/types';

const categories = [
  'All',
  'Fursuit Models',
  'Fursuit Accessories',
  'Digital Art',
  '2D & 3D',
  'Video Projects',
];

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectApi.getAll({ limit: 50 });
        setProjects(data.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchQuery]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      router.push('/gallery');
    } else {
      router.push(`/gallery?category=${encodeURIComponent(category)}`);
    }
  }, [router]);

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my complete collection of artwork, from fursuit models to 
            digital illustrations and 3D creations.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative md:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-full md:w-64"
            />
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-gray-400 text-sm"
        >
          Showing {filteredProjects.length} of {projects.length} projects
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner" />
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="masonry-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg mb-4">No projects found</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="btn-primary cursor-pointer"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

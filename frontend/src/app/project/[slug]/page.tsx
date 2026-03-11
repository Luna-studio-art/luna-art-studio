'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Eye, Tag, Box, Video } from 'lucide-react';
import Lightbox from '@/components/Lightbox';
import { projectApi } from '@/lib/api';
import { Project } from '@/types';
import { getCategoryColor, formatDate } from '@/lib/utils';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const data = await projectApi.getBySlug(params.slug as string);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.slug) {
      fetchProject();
    }
  }, [params.slug]);

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const previousImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev < (project?.images.length || 1) - 1 ? prev + 1 : prev));
  }, [project?.images.length]);

  if (isLoading) {
    return (
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="spinner" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">
            The project you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/gallery" className="btn-primary inline-block cursor-pointer">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const gradientClass = getCategoryColor(project.category);
  const allImages = project.images.length > 0 ? project.images : [project.thumbnail];

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        {/* Title & Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${gradientClass} text-white mb-4`}>
            {project.category}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-400">{project.description}</p>
        </motion.div>

        {/* Main Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {project.videoUrl ? (
            <div className="aspect-video rounded-2xl overflow-hidden bg-black/50">
              <iframe
                src={project.videoUrl}
                title={project.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ) : allImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allImages.slice(0, 4).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => openLightbox(index)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer group ${
                    index === 0 && allImages.length > 1 ? 'md:col-span-2 aspect-video' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          ) : null}
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {/* Tools Used */}
          <div className="card p-6">
            <Box className="w-6 h-6 text-purple-400 mb-4" />
            <h3 className="font-bold mb-3">Tools Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="card p-6">
            <Tag className="w-6 h-6 text-blue-400 mb-4" />
            <h3 className="font-bold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="card p-6">
            <Eye className="w-6 h-6 text-pink-400 mb-4" />
            <h3 className="font-bold mb-3">Project Stats</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Created {formatDate(project.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {project.views} views
              </div>
              {project.category === 'Video Projects' && (
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Video Project
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Long Description */}
        {project.longDescription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {project.longDescription}
            </p>
          </motion.div>
        )}

        {/* Creative Process */}
        {project.process && project.process.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Creative Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="card p-6"
                >
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-bold mb-2">{step.step}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-between items-center"
        >
          <Link
            href="/gallery"
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Back to Gallery
          </Link>
          <Link
            href="/contact"
            className="btn-primary cursor-pointer"
          >
            Start a Similar Project
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={allImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onPrevious={previousImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}

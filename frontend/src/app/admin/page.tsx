'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { projectApi, uploadApi } from '@/lib/api';
import { Project } from '@/types';
import {
  Plus, Edit, Trash2, LogOut, Image as ImageIcon,
  X, Save, Upload, Eye, Palette, Box, Sparkles
} from 'lucide-react';

const categories = [
  'Fursuit Models',
  'Fursuit Accessories',
  'Digital Art',
  '2D & 3D',
  'Video Projects',
];

const categoryIcons: Record<string, React.ElementType> = {
  'Fursuit Models': Palette,
  'Fursuit Accessories': Sparkles,
  'Digital Art': ImageIcon,
  '2D & 3D': Box,
  'Video Projects': Box,
};

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, logout, admin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Digital Art',
    featured: false,
  });

  const [images, setImages] = useState<{ url: string; alt: string }[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }
    fetchProjects();
  }, [isAuthenticated, router]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectApi.getAll({ limit: 100 });
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const openNewProjectModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Digital Art',
      featured: false,
    });
    setImages([]);
    setShowModal(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      featured: project.featured,
    });
    setImages(project.images.length > 0 ? project.images : [project.thumbnail]);
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadedImages = await uploadApi.images(Array.from(files));
      setImages(prev => [...prev, ...uploadedImages.map(img => ({ url: img.url, alt: '' }))]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Make sure Cloudinary is configured.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || images.length === 0) {
      alert('Please add a title and at least one image');
      return;
    }

    try {
      const projectData = {
        ...formData,
        thumbnail: images[0],
        images: images,
      };

      if (editingProject) {
        await projectApi.update(editingProject._id, projectData);
      } else {
        await projectApi.create(projectData);
      }

      setShowModal(false);
      fetchProjects();
    } catch (error: any) {
      console.error('Error saving project:', error);
      const errorMsg = error?.response?.data?.message || 'Failed to save project';
      alert('Error: ' + errorMsg);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectApi.delete(id);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Admin Header - Simplified */}
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text hidden sm:inline">ArtStudio</span>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:inline"
              >
                View Site
              </Link>
              <button
                onClick={openNewProjectModal}
                className="btn-primary flex items-center gap-2 cursor-pointer pointer-events-auto whitespace-nowrap text-sm py-2 px-4"
                type="button"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Project</span>
                <span className="sm:hidden">New</span>
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer pointer-events-auto"
                type="button"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">Welcome back, {admin?.name}</p>
          </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8"
        >
          {[
            { label: 'Total Projects', value: projects.length, icon: ImageIcon },
            { label: 'Featured', value: projects.filter(p => p.featured).length, icon: Sparkles },
            { label: 'Fursuits', value: projects.filter(p => p.category === 'Fursuit Models' || p.category === 'Fursuit Accessories').length, icon: Palette },
            { label: '2D & 3D', value: projects.filter(p => p.category === '2D & 3D' || p.category === 'Digital Art').length, icon: Box },
          ].map((stat, index) => (
            <div key={stat.label} className="card p-4 sm:p-6">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Projects Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card overflow-hidden"
        >
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold">All Projects</h2>
            <button
              onClick={openNewProjectModal}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add New</span>
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="spinner" />
            </div>
          ) : projects.length === 0 ? (
            <div className="p-8 sm:p-12 text-center text-gray-400">
              <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
              <p className="mb-4 text-sm sm:text-base">No projects yet</p>
              <button onClick={openNewProjectModal} className="btn-primary cursor-pointer text-sm sm:text-base">
                Create Your First Project
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 whitespace-nowrap">Project</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 whitespace-nowrap">Category</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 whitespace-nowrap">Status</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-400 whitespace-nowrap">Views</th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs sm:text-sm font-medium text-gray-400 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => {
                    const CategoryIcon = categoryIcons[project.category] || ImageIcon;
                    return (
                      <tr key={project._id} className="border-t border-white/5 hover:bg-white/5">
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={project.thumbnail?.url || project.images?.[0]?.url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-sm sm:text-base truncate">{project.title}</div>
                              <div className="text-xs sm:text-sm text-gray-400">{project.views} views</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="w-4 h-4 text-purple-400" />
                            <span className="text-sm">{project.category}</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                            project.featured
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {project.featured ? 'Featured' : 'Published'}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-gray-400 text-sm">{project.views}</td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center justify-end gap-1 sm:gap-2">
                            <button
                              onClick={() => router.push(`/project/${project.slug}`)}
                              className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openEditModal(project)}
                              className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(project._id)}
                              className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            style={{ zIndex: 99999 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="card w-full max-w-3xl max-h-[90vh] overflow-y-auto relative bg-[#1a1a1a]"
              style={{ zIndex: 100000 }}
            >
              <div className="sticky top-0 bg-[#1a1a1a] p-6 border-b border-white/10 flex items-center justify-between" style={{ zIndex: 100001 }}>
                <h2 className="text-2xl font-bold">
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="Project title"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="input-field"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium mb-2">Images *</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-purple-500/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-400 mb-2">
                        {isUploading ? 'Uploading...' : 'Click to upload images'}
                      </p>
                      <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 50MB</p>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                          <img src={img.url} alt={img.alt || 'Preview'} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 rounded bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-purple-500 text-xs rounded">
                              Thumbnail
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-5 h-5 rounded bg-white/10 border-white/20"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-5 h-5" />
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}

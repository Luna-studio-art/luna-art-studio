'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Box, Palette, Sparkles, Layers, Zap } from 'lucide-react';

const processSteps = [
  {
    icon: PenTool,
    title: 'Concept & Sketch',
    description: 'Every creation begins with an idea. I sketch initial concepts, explore different directions, and refine the vision.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Box,
    title: '3D Sculpting',
    description: 'Using industry-standard tools like Blender and ZBrush, I bring the concept to life in three dimensions.',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Palette,
    title: 'Texturing & Materials',
    description: 'Adding realistic textures, materials, and colors that bring depth and personality to the creation.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Layers,
    title: 'Assembly & Details',
    description: 'For physical pieces like fursuits, this involves careful construction, sewing, and adding intricate details.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Sparkles,
    title: 'Lighting & Effects',
    description: 'Adding the magic touch with lighting, special effects, and finishing touches that make the piece shine.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Final Delivery',
    description: 'Quality checks, final renders or photography, and delivery of the completed masterpiece to the client.',
    color: 'from-indigo-500 to-purple-500',
  },
];

export default function CreativeProcess() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
            Workflow
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="gradient-text">Creative Process</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From initial concept to final masterpiece, every project follows a 
            meticulous process that ensures quality and creativity.
          </p>
        </motion.div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card p-6 relative group"
            >
              {/* Connection Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent" />
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-7 h-7 text-white" />
              </div>

              {/* Step Number */}
              <div className="absolute top-4 right-4 text-5xl font-bold text-white/5">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

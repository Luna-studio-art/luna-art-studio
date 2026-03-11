'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background - Optimized */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs - Performance optimized */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 -left-1/4 w-[clamp(200px,40vw,400px)] h-[clamp(200px,40vw,400px)] bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 -right-1/4 w-[clamp(200px,40vw,400px)] h-[clamp(200px,40vw,400px)] bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(300px,60vw,600px)] h-[clamp(300px,60vw,600px)] bg-pink-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124, 58, 237, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 58, 237, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        {/* Badge - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8"
        >
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs sm:text-sm text-gray-300">Available for Commissions</span>
        </motion.div>

        {/* Main Heading - Responsive */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6"
        >
          <span className="block">Digital Art</span>
          <span className="gradient-text">Brought to Life</span>
        </motion.h1>

        {/* Tagline - Responsive */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          Creating stunning fursuit models, digital art, 3D creations, and visual experiences
          that captivate and inspire.
        </motion.p>

        {/* CTA Buttons - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link href="/gallery" className="cursor-pointer w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base"
            >
              View Portfolio
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </Link>
          <Link href="/contact" className="cursor-pointer w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 border-t border-white/10"
        >
          {[
            { value: '80+', label: 'Projects' },
            { value: '50+', label: 'Clients' },
            { value: '5+', label: 'Years' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Responsive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5 sm:p-2"
        >
          <motion.div className="w-1 h-1.5 sm:w-1.5 sm:h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

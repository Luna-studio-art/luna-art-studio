'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Palette } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f0f0f]/95 backdrop-blur-md shadow-lg shadow-purple-500/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center"
              >
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.div>
              <span className="text-base sm:text-lg md:text-xl font-bold gradient-text hidden xs:inline-block">ArtStudio</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-sm font-medium hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-sm font-medium"
              >
                Admin
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-[999] md:hidden bg-[#0f0f0f]"
            style={{ top: '64px' }}
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium py-3 px-4 rounded-lg border-b border-white/10 hover:bg-white/5 hover:text-purple-400 transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/admin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium py-3 px-4 rounded-lg border-b border-white/10 hover:bg-white/5 hover:text-purple-400 transition-all"
              >
                Admin Panel
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palette, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/lumacooper09/', label: 'Instagram' },
  { icon: Mail, href: 'mailto:kr077279@gmail.com', label: 'Email' },
];

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
];

const categories = ['Fursuit Models', 'Fursuit Accessories', 'Digital Art', '2D & 3D', 'Video Projects'];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 mb-4 cursor-pointer">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-base sm:text-xl font-bold gradient-text">ArtStudio</span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 max-w-md">
              Creating stunning digital art, fursuit models, 3D creations, and visual
              experiences that captivate and inspire audiences worldwide.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm sm:text-base mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-xs sm:text-sm cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-sm sm:text-base mb-3 sm:mb-4">Categories</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/gallery?category=${encodeURIComponent(cat)}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-xs sm:text-sm cursor-pointer"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Luna ArtStudio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

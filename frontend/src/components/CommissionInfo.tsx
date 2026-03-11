'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const commissionServices = [
  {
    title: 'Fursuit Models',
    price: 'Starting at $2,500',
    description: 'Full custom fursuits with premium materials, LED options, and intricate details.',
    features: [
      'Full body or partial suits',
      'Custom character design',
      'LED integration available',
      'Premium faux fur materials',
      '3-4 month production time',
    ],
    popular: true,
  },
  {
    title: 'Character Design',
    price: 'Starting at $200',
    description: 'Professional character designs for games, animations, or personal projects.',
    features: [
      'Multiple concept sketches',
      'Turnaround sheets',
      'Expression sheets',
      'Commercial use license',
      '2-3 week delivery',
    ],
    popular: false,
  },
  {
    title: '3D Creatures',
    price: '$400-$500',
    description: 'High-quality 3D models ready for games, animation, or 3D printing.',
    features: [
      'High-poly sculpting',
      'PBR textures',
      'Rigging available',
      'Multiple file formats',
      '2-4 week delivery',
    ],
    popular: false,
  },
  {
    title: 'Digital Artwork',
    price: 'Starting at $150',
    description: 'Stunning digital illustrations for any purpose, from portraits to full scenes.',
    features: [
      'High resolution files',
      'Multiple revisions',
      'Commercial use available',
      'Print-ready formats',
      '1-2 week delivery',
    ],
    popular: false,
  },
];

export default function CommissionInfo() {
  return (
    <section className="py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-pink-400 text-sm font-medium tracking-wider uppercase">
            Commissions
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            <span className="gradient-text">Available for Hire</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transform your ideas into reality. I offer custom commissions for 
            fursuits, digital art, 3D models, and more.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commissionServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`card p-6 relative ${
                service.popular ? 'border-purple-500/50 glow-purple' : ''
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}

              {/* Content */}
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <div className="text-purple-400 font-semibold mb-3">{service.price}</div>
              <p className="text-gray-400 text-sm mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="/contact"
                className="block w-full py-3 text-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-sm font-medium cursor-pointer"
              >
                Request Quote
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

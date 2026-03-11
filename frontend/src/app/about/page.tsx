'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { authApi } from '@/lib/api';
import { Admin, Skill } from '@/types';
import { Instagram, Twitter, Youtube, Globe, Award, BookOpen, Briefcase } from 'lucide-react';

const socialIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  website: Globe,
};

export default function AboutPage() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await authApi.getMe();
        setAdmin(data);
      } catch (error) {
        // If not authenticated, use default data
        setAdmin({
          _id: 'default',
          email: 'admin@artstudio.com',
          name: 'ArtStudio',
          role: 'super-admin',
          bio: 'Professional digital artist with a passion for creating immersive visual experiences. Specializing in fursuit models, digital art, and 3D creations that push the boundaries of creativity.',
          socialLinks: {
            instagram: 'https://instagram.com',
            twitter: 'https://twitter.com',
            youtube: 'https://youtube.com',
            artstation: 'https://artstation.com',
          },
          skills: [
            { name: 'Digital Painting', level: 95 },
            { name: '3D Modeling', level: 90 },
            { name: 'Fursuit Making', level: 92 },
            { name: 'Animation', level: 85 },
            { name: 'Video Editing', level: 80 },
          ],
          experience: [
            {
              title: 'Freelance Digital Artist',
              company: 'Self-Employed',
              startDate: '2020-01-01',
              current: true,
              description: 'Creating custom fursuits, digital art commissions, and 3D models for clients worldwide.',
            },
          ],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmin();
  }, []);

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

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">About Luna</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get to know the artist behind the creations
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">{admin?.name}</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              {admin?.bio || 'Professional digital artist passionate about creating stunning visual experiences.'}
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              {Object.entries(admin?.socialLinks || {}).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                if (!url || !Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Award, label: 'Projects', value: '80+' },
                { icon: BookOpen, label: 'Experience', value: '5+ Years' },
                { icon: Briefcase, label: 'Clients', value: '50+' },
              ].map((stat) => (
                <div key={stat.label} className="card p-4 text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {admin?.skills?.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex justify-between mb-3">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
          <div className="space-y-6">
            {admin?.experience?.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-2xl" />
                <div className="pl-4">
                  <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                  <div className="text-purple-400 text-sm mb-3">{exp.company}</div>
                  <p className="text-gray-300">{exp.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    {exp.current ? ' - Present' : ` - ${new Date(exp.endDate!).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

import React from 'react';
import { Users, BookOpen, Heart, Target } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with writers and readers from around the world. Share your stories and discover new perspectives.'
    },
    {
      icon: BookOpen,
      title: 'Quality Content',
      description: 'We believe in the power of well-crafted stories. Our platform encourages thoughtful, engaging content.'
    },
    {
      icon: Heart,
      title: 'Passion for Writing',
      description: 'Whether you\'re a seasoned writer or just starting, BlogSpace provides the tools and community to grow.'
    },
    {
      icon: Target,
      title: 'Your Voice Matters',
      description: 'Every story has value. We provide a platform where your unique voice can be heard and appreciated.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About BlogSpace
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          BlogSpace is a modern blogging platform designed for writers who want to share their stories 
          with the world. We believe that everyone has a story worth telling, and we're here to help you tell it.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div className="bg-blue-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          At BlogSpace, we're committed to creating a platform where writers can flourish and readers can discover 
          amazing content. We believe in the democratization of publishing and the power of community-driven content. 
          Our goal is to provide the tools, audience, and support that writers need to share their unique perspectives 
          with the world.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
        <div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
          <div className="text-gray-600 dark:text-gray-300">Active Writers</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2.5K</div>
          <div className="text-gray-600 dark:text-gray-300">Published Posts</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10K+</div>
          <div className="text-gray-600 dark:text-gray-300">Monthly Readers</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">25+</div>
          <div className="text-gray-600 dark:text-gray-300">Countries</div>
        </div>
      </div>
    </div>
  );
};

export default About;
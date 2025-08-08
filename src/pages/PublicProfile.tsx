import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, ArrowLeft, BookOpen } from 'lucide-react';
import { Blog } from '../types';
import { useBlog } from '../contexts/BlogContext';
import BlogCard from '../components/BlogCard';
import Loader from '../components/Loader';

const PublicProfile: React.FC = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const { blogs, loading } = useBlog();
  const [authorBlogs, setAuthorBlogs] = useState<Blog[]>([]);
  const [authorName, setAuthorName] = useState<string>('');

  useEffect(() => {
    if (blogs.length > 0 && authorId) {
      const filteredBlogs = blogs.filter(blog => blog.authorId === authorId);
      setAuthorBlogs(filteredBlogs);
      if (filteredBlogs.length > 0) {
        setAuthorName(filteredBlogs[0].authorName);
      }
    }
  }, [blogs, authorId]);

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loader size="large" className="h-64" />
      </div>
    );
  }

  if (!authorId || authorBlogs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Author not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The author you're looking for doesn't exist or hasn't published any posts yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Navigation */}
      <Link
        to="/"
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
          <div className="absolute -bottom-16 left-8">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt={authorName}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
          </div>
        </div>

        <div className="pt-20 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {authorName}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Writer and content creator
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-1">
                <BookOpen size={16} />
                <span>{authorBlogs.length} Posts</span>
              </div>
              {authorBlogs.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>Joined {formatJoinDate(authorBlogs[0].$createdAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Author's Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Posts by {authorName}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authorBlogs.map((blog) => (
            <BlogCard key={blog.$id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
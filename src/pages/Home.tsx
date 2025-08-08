import React, { useState, useEffect } from 'react';
import { sampleBlogs } from '../data/sampleData';
import BlogCard from '../components/BlogCard';
import Loader from '../components/Loader';
import { Search, PenTool, Plus } from 'lucide-react';
import { Blog } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router';
import { useBlog } from '../contexts/BlogContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { blogs, loading } = useBlog()
  // const [blogs, setBlogs] = useState<Blog[]>([]);
  // const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  // useEffect(() => {
  //   // Simulate API call
  //   setTimeout(() => {
  //     setBlogs(sampleBlogs);
  //     setFilteredBlogs(sampleBlogs);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Loader size="large" className="h-64" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to <span className="text-blue-600 dark:text-blue-400">BlogSpace</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover amazing stories, insights, and ideas from our community of writers.
          Share your thoughts and connect with like-minded individuals.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-12">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Call to Action for Authenticated Users */}
      {user && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 mb-12 text-center border border-blue-100 dark:border-blue-800">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Ready to Share Your Story?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join our community of writers and share your unique perspective with the world.
              Your voice matters, and we can't wait to hear what you have to say.
            </p>
            <Link
              to="/new-blog"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              <span>Write Your First Post</span>
            </Link>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {searchTerm ? `Search Results (${filteredBlogs.length})` : 'Latest Posts'}
        </h2>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchTerm ? 'No blogs found matching your search.' : 'No blogs available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.$id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
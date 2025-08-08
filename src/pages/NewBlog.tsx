import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../components/Loader';
import { createBlogPost } from '../lib/database1';
import { useBlog } from '../contexts/BlogContext';

const NewBlog: React.FC = () => {
  const { user } = useAuth();
  const { setBlogs } = useBlog()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    excerpt: ''
  });
  const [isPreview, setIsPreview] = useState(false);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Please log in to create a new blog post.</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const date = new Date(); // Or any other date object
    const formatter = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const formattedDate = formatter.format(date);

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in the title and content');
      return;
    }

    setLoading(true);

    try {
      const newBlog = await createBlogPost(
        formData.title,
        formData.content,
        formData.tags.split(",").map(tag => tag.trim()),
        user.$id,
        user.name,
        formattedDate,
        ''
      );
      
      // Update the blogs list with the new blog
      setBlogs(prev => [newBlog, ...prev]);
      
      alert('Blog post created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateExcerpt = (content: string) => {
    return content.substring(0, 150) + (content.length > 150 ? '...' : '');
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isPreview ? 'Preview Post' : 'Create New Post'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {isPreview ? 'Review your post before publishing' : 'Share your thoughts with the world'}
        </p>
      </div>

      {!isPreview ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl"
                  placeholder="Enter your blog title..."
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={20}
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Start writing your blog post..."
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setIsPreview(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  >
                    <Eye size={20} />
                    <span>Preview</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? <Loader size="small" /> : <Save size={20} />}
                    <span>{loading ? 'Publishing...' : 'Publish Post'}</span>
                  </button>
                </div>
              </div>

              {/* Metadata */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Post Details</h3>
                <div className="space-y-4">
                  {/* Excerpt */}
                  <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      rows={3}
                      value={formData.excerpt || generateExcerpt(formData.content)}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Brief description of your post..."
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="React, JavaScript, Web Development"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Separate tags with commas
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Statistics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Word Count:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formData.content.split(' ').filter(word => word.length > 0).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Read Time:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ~{estimateReadTime(formData.content)} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          {/* Preview Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsPreview(false)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ArrowLeft size={20} />
              <span>Back to Editor</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? <Loader size="small" /> : <Save size={20} />}
              <span>{loading ? 'Publishing...' : 'Publish Post'}</span>
            </button>
          </div>

          {/* Preview Content */}
          <div className="max-w-4xl mx-auto">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {formData.title || 'Untitled Post'}
              </h1>

              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-8">
                <div className="flex items-center space-x-2">
                  <img
                    src={'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
                <span>•</span>
                <span>{new Date().toLocaleDateString()}</span>
                <span>•</span>
                <span>{estimateReadTime(formData.content)} min read</span>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {formData.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {formData.tags && (
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {formData.tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewBlog;